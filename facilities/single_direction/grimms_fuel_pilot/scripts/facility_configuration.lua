PFRP_TEMP = 131
ZONE_IDS = {'01', '02', '03'}
ZONE_PROBE_IDS = {''}
ZONE_LOG_COLUMNS = {'Temperature', 'Damper'}

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "360"
  settings["FacilityName"] = "GRIMMS FUEL PILOT"
  settings["Regime1TempSetPoint"] = "131"
  settings["Regime2TempSetPoint"] = "144"
  settings["Regime3TempSetPoint"] = "134"
  settings["Regime1Duration"] = "5"
  settings["Regime2Duration"] = "7"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["MinDamperValue"] = "6"
  settings["DamperGain"] = "1"
  settings["DamperIntegral"] = "1"
  settings["DamperDerivative"] = "0.3"
  settings["DamperDerivativeTime"] = "10"
  settings["DamperRate"] = "10"
  return settings
end

function initValues()
  for i, zone_id in ipairs(ZONE_IDS) do
    -- init zone & damper values
    initZone(zone_id)
    initDamper(zone_id)
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
  table.insert(log_values, reg['zone' .. zone_id .. 'avgdamper'])
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

function updateDamperAverages()
  for i, zone_id in ipairs(ZONE_IDS) do
    local damper_id = zone_id
    updateDamperAverage(zone_id, damper_id)
  end
end

function updateTempAverages()
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix)
    end
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

function updateBlowers()
  return
end

function updateDampers()
  for i,zn_id in ipairs(ZONE_IDS) do
    local control_temp = tempAvgForZones({zn_id}, ZONE_PROBE_IDS)
    if reg['zone'..zn_id..'regime'] == 2 then
      control_temp = minTempForZones({zn_id},ZONE_PROBE_IDS)
    end
    damperControl(_G['DAMPER_'..zn_id], zn_id, control_temp, spForZone(zn_id))
  end
end

function updateZones()
  updateZone(ZONE_01, '01', ZONE_PROBE_IDS)
  updateZone(ZONE_02, '02', ZONE_PROBE_IDS)
  updateZone(ZONE_03, '03', ZONE_PROBE_IDS)
end

function updateAlarms()
  zoneTempAlarm(ZONE_01, '01', ZONE_PROBE_IDS)
  zoneTempAlarm(ZONE_02, '02', ZONE_PROBE_IDS)
  zoneTempAlarm(ZONE_03, '03', ZONE_PROBE_IDS)
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
