function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PFRP_TEMP = 131
  PFRP_AGGREGATE = 'min'
  BLOWER_IDS = uid(1)
  ZONE_IDS = uid(9)
  ZONE_PROBE_IDS = {'A','B'}
  BLWR_GRP_ZONE_IDS = {}
  BLWR_GRP_ZONE_IDS['01'] = uid(9)
  ZONE_LOG_COLUMNS = {'Temperature A', 'Temperature B', 'Damper', 'Duct Pressure', 'Blower Speed', 'PFRP Time'}
  for i, blower_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(blower_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    -- init zone & damper values
    initZone(zone_id)
    initDamper(zone_id)
  end
end

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "BILLINGS"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings["PressureSetpointMin"] = "4"
  settings["PressureSetpointMax"] = "8"
  settings["PressureSetpointHotZoneTrigger"] = "50"
  settings["PressureSetpointColdZoneTrigger"] = "50"
  settings["PressureSetpointChangeTimer"] = "5"
  settings["PressureSetpointChangeInterval"] = "2"
  settings["BlowerGain"] = "0.5"
  settings["BlowerIntegral"] = "1"
  settings["BlowerDerivative"] = "0.1"
  settings["BlowerDerivativeTime"] = "2"
  settings["BlowerRate"] = "15"
  settings["BlowerCycleOnTime"] = "55"
  settings["BlowerCycleOffTime"] = "5"
  settings["Regime1TempSetPoint"] = "131"
  settings["Regime2TempSetPoint"] = "144"
  settings["Regime3TempSetPoint"] = "134"
  settings["Regime1Duration"] = "5"
  settings["Regime2Duration"] = "7"
  settings["DamperGain"] = "0.5"
  settings["DamperIntegral"] = "1"
  settings["DamperDerivative"] = "0.3"
  settings["DamperDerivativeTime"] = "2"
  settings["DamperRate"] = "60"
  settings["MinDamperValue"] = "6"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  return settings
end

function blowerLogValues(log_values,zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BLWR_GRP_ZONE_IDS[blower]) do
        if zone == zn_id then
            logInsert(log_values,reg['duct'..blower..'pressureavg'])
            logInsert(log_values,reg['blower'..blower..'value'])
        end
    end
  end
end

function zoneLogValues(zone_id, probe_ids)
  local log_values = {}
  local valid_temps = false
  for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, probe_ids)) do
    if reg[temp_prefix .. 'avgtemp'] > 0 then
      valid_temps = true
    end
    logInsert(log_values, reg[temp_prefix .. 'avgtemp'])
  end
  logInsert(log_values, reg['zone' .. zone_id .. 'avgdamper'])
  blowerLogValues(log_values,zone_id)
  logInsert(log_values,reg['zone'..zone_id.."pfrptime"])
  if valid_temps == true then
    resetAverage('zone' .. zone_id .. 'avgdamper')
    return log_values
  else
    return nil
  end
end

function updateLastValidTemps()
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, ZONE_PROBE_IDS)) do
      updateLVTemp(temp_prefix)
    end
  end
end

function updateTempAverages()
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix)
    end
  end
end

function updateDamperAverages()
  for i, zone_id in ipairs(ZONE_IDS) do
    local damper_id = zone_id
    updateDamperAverage(zone_id, damper_id)
  end
end

function updateAverages()
  updateTempAverages()
  updateDamperAverages()
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

function updateBlowers()
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureSetpoint(blwr_id, BLWR_GRP_ZONE_IDS[blwr_id], ZONE_PROBE_IDS)
    blowerPressureControl(
      _G['BLOWER_'..blwr_id],
      'blower'..blwr_id,
      reg['duct'..blwr_id..'pressureavg'],
      reg['duct'..blwr_id..'pressuresp'],
      zonesOnline(BLWR_GRP_ZONE_IDS[blwr_id]),
      SETTINGS["MinVFDSpeed"],
      SETTINGS["MaxVFDSpeed"]
    )
  end
end

function updateDampers()
  for i,zn_id in ipairs(ZONE_IDS) do
    local dmpr_id = zn_id
    local control_temp = tempAvgForZones({zn_id},ZONE_PROBE_IDS)
    if reg["zone"..zn_id.."regime"] == 2 then
      control_temp = minTempForZones({zn_id},ZONE_PROBE_IDS)
    end
    damperControl(_G["DAMPER_"..dmpr_id],dmpr_id,control_temp,spForZone(zn_id))
  end
end

function updateZones()
  for i,zn_id in ipairs(ZONE_IDS) do
    updateZone(_G['ZONE_'..zn_id], zn_id, ZONE_PROBE_IDS)
  end
  updateAlarms()
end

function updateAlarms()
  for i,zn_id in ipairs(ZONE_IDS) do
    zoneTempAlarm(_G['ZONE_'..zn_id], zn_id, ZONE_PROBE_IDS)
  end

  blowerFaultAlarm(BLOWER_01, '01', 'Blower 01')
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS["BlowerRate"])
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit)
  end
end

if not luatest_running then
  while init_complete ~= true do
    sleep(1000)
  end
  while init_complete do
    sleep(1000)
    updateDuctPressureAverages()
  end
end
