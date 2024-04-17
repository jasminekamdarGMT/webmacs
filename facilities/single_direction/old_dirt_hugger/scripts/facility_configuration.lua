PFRP_TEMP = 131
BLOWER_IDS = {'01', '02'}
ZONE_IDS = {'01', '02'}
ZONE_PROBE_IDS = {'A', 'B'}
ZONE_LOG_COLUMNS = {'Temperature A', 'Temperature B'}
WIRELESS_POINT_FAILURES = {}
WIRELESS_POINT_FAILURES["Zone01ProbeAPointID"] = 0
WIRELESS_POINT_FAILURES["Zone01ProbeBPointID"] = 0
WIRELESS_POINT_FAILURES["Zone02ProbeAPointID"] = 0
WIRELESS_POINT_FAILURES["Zone02ProbeBPointID"] = 0

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = '192.168.1.55'
  settings["DataLoggingRate"] = "360"
  settings["FacilityName"] = "DIRT HUGGER"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings["BlowerGain"] = "1"
  settings["BlowerIntegral"] = "1.5"
  settings["BlowerDerivative"] = "0"
  settings["BlowerDerivativeTime"] = "2"
  settings["BlowerRate"] = "2"
  settings["BlowerCycleOnTime"] = "55"
  settings["BlowerCycleOffTime"] = "5"
  settings["Regime1TempSetPoint"] = "131"
  settings["Regime2TempSetPoint"] = "144"
  settings["Regime3TempSetPoint"] = "134"
  settings["Regime1Duration"] = "5"
  settings["Regime2Duration"] = "7"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["Zone01ProbeAPointID"] = ""
  settings["Zone01ProbeBPointID"] = ""
  settings["Zone02ProbeAPointID"] = ""
  settings["Zone02ProbeBPointID"] = ""
  settings["DamperGain"] = "1"
  settings["DamperIntegral"] = "1"
  settings["DamperDerivative"] = "0.3"
  settings["DamperDerivativeTime"] = "10"
  settings["DamperRate"] = "10"
  return settings
end

function initValues()
  for i, blower_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(blower_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    -- init zone & damper values
    initZone(zone_id)
  end
end

function zoneLogValues(zone_id, probe_ids)
  local log_values = {}
  local valid_temps = false
  for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, probe_ids)) do
    if reg[temp_prefix .. 'avgtemp'] > 0 then
      valid_temps = true
    end
    table.insert(log_values, reg[temp_prefix .. 'avgtemp'])
  end
  if valid_temps == true then
    resetAverage('zone' .. zone_id .. 'avgdamper')
    return log_values
  else
    return nil
  end
end

function updateLastValidTemps()
  local wireless_data = retrieveWirelessSensorData()
  for i, zone_id in ipairs(ZONE_IDS) do
    local lv_temp = 0
    for n, probe_id in ipairs(ZONE_PROBE_IDS) do
      local settingName = 'Zone'..zone_id..'Probe'..probe_id..'PointID'
      local regPrefix = 'zone'..zone_id..'p'..probe_id
      if SETTINGS[settingName] ~= nil and wireless_data[SETTINGS[settingName]] ~= nil then
        updateLVTemp(regPrefix, wireless_data[SETTINGS[settingName]])
        WIRELESS_POINT_FAILURES[settingName] = 0
      else
        WIRELESS_POINT_FAILURES[settingName] = WIRELESS_POINT_FAILURES[settingName] + 1
        if WIRELESS_POINT_FAILURES[settingName] >= 5 then
          updateLVTemp(regPrefix, 0)
        end
      end
    end
  end
end

function updateTempAverages()
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix, reg[temp_prefix..'lvtemp'])
    end
  end
end

function updateAverages()
  updateTempAverages()
end

function spForZone(zone_id)
  if reg['zone'..zone_id..'regime'] == 3 then
    return SETTINGS['Regime3TempSetPoint']
  elseif reg['zone'..zone_id..'regime'] == 2 then
    return SETTINGS['Regime2TempSetPoint']
  else
    return SETTINGS['Regime1TempSetPoint']
  end
end

function zonesOnline(zone_ids)
  local online_count = 0
  for i, zone_id in ipairs(zone_ids) do
    if reg['zone'..zone_id..'control'] == 1 then
      online_count = online_count + 1
    end
  end
  return online_count
end

function customPumpControl(pump_id)
  if reg['pump'..pump_id..'speed'] == 1 then
    io['pump'..pump_id..'run'] = 1
    io['pump'..pump_id..'speed1'] = 1
    io['pump'..pump_id..'speed2'] = 0
  elseif reg['pump'..pump_id..'speed'] == 2 then
    io['pump'..pump_id..'run'] = 1
    io['pump'..pump_id..'speed1'] = 0
    io['pump'..pump_id..'speed2'] = 1
  elseif reg['pump'..pump_id..'speed'] == 3 then
    io['pump'..pump_id..'run'] = 1
    io['pump'..pump_id..'speed1'] = 1
    io['pump'..pump_id..'speed2'] = 1
  else
    io['pump'..pump_id..'run'] = 0
    io['pump'..pump_id..'speed1'] = 0
    io['pump'..pump_id..'speed2'] = 0
  end
end

function updateBlowers()
  blowerTempControl(BLOWER_01, 'blower01', tempAvgForZones({'01'}, ZONE_PROBE_IDS), spForZone('01'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  blowerTempControl(BLOWER_02, 'blower02', tempAvgForZones({'02'}, ZONE_PROBE_IDS), spForZone('02'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
end

function updateDampers()
  customPumpControl('01')
  customPumpControl('02')
end

function updateZones()
  updateZone(ZONE_01, '01', ZONE_PROBE_IDS)
  updateZone(ZONE_02, '02', ZONE_PROBE_IDS)
  io['zone01onindicator'] = reg['zone01control']
  io['zone02onindicator'] = reg['zone02control']
end

function updateAlarms()
  zoneTempAlarm(ZONE_01, '01', ZONE_PROBE_IDS)
  zoneTempAlarm(ZONE_02, '02', ZONE_PROBE_IDS)

  blowerFaultAlarm(BLOWER_01, '01', 'Blower 1')
  blowerFaultAlarm(BLOWER_02, '02', 'Blower 2')
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
