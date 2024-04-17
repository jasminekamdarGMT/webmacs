function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PFRP_TEMP = 131
  
  BLOWER_IDS = uid(6)
  ZONE_IDS = uid(6)
  ZONE_PROBE_IDS = {''}
  ZONE_LOG_COLUMNS = {'Temperature A'}
  for i, blower_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(blower_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    -- init zone
    initZone(zone_id)
  end
end

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "Creekside Soils"
  settings["BlowerRate"] = "10"
  settings["BlowerCycleOnTime"] = "55"
  settings["BlowerCycleOffTime"] = "5"
  settings["Regime1TempSetPoint"] = "131"
  settings["Regime2TempSetPoint"] = "144"
  settings["Regime3TempSetPoint"] = "134"
  settings["Regime1Duration"] = "5"
  settings["Regime2Duration"] = "7"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  settings["DamperRate"] = "10"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings["BlowerGain"] = "0.5"
  settings["BlowerIntegral"] = "1"
  settings["BlowerDerivative"] = "0.1"
  settings["BlowerDerivativeTime"] = "2"
  settings["DamperGain"] = "0.5"
  settings["DamperIntegral"] = "1"
  settings["DamperDerivative"] = "0.3"
  settings["DamperDerivativeTime"] = "2"
  settings["MinDamperValue"] = "6"
  return settings
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
  if valid_temps == true then
    return log_values
  else
    return nil
  end
end

function updateLastValidTemps()
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, {''})) do
      updateLVTemp(temp_prefix)
    end
  end
end

function updateTempAverages()
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, {''})) do
      updateTempAverage(temp_prefix)
    end
  end
end

function updateAverages()
  updateTempAverages()
end

function setpointForZone(zone_id)
  if reg['zone'..zone_id..'regime'] == 3 then
    return SETTINGS['Regime3TempSetPoint']
  elseif reg['zone'..zone_id..'regime'] == 2 then
    return SETTINGS['Regime2TempSetPoint']
  else
    return SETTINGS['Regime1TempSetPoint']
  end
end

function totalZonesOnline(zone_ids)
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
    local zn_id = blwr_id
    local control_temp = tempAvgForZones({zn_id}, ZONE_PROBE_IDS)
    if reg['zone'..zn_id..'regime'] == 2 then
      control_temp = minTempForZones({zn_id},ZONE_PROBE_IDS)
    end
    blowerOnOffTempControl(
      _G['BLOWER_'..blwr_id],
      'blower'..blwr_id,
      tempAvgForZones({blwr_id}, ZONE_PROBE_IDS),
      setpointForZone(blwr_id),
      totalZonesOnline({blwr_id})
    )
  end
end

function regimeProgression(zone_id)
  local zone_prefix = "zone"..zone_id
  if SETTINGS["Regime1Duration"] then
    if reg[zone_prefix.."regtimer"] == 0 and reg[zone_prefix..'regime'] < 3 then
      if reg[zone_prefix..'regime'] == 1 then
        reg[zone_prefix..'regime'] = reg[zone_prefix..'regime'] + 1
      elseif reg[zone_prefix..'regime'] == 2 then
        if reg[zone_prefix.."pfrptime"] >= 4320 then
          reg[zone_prefix..'regime'] = 3
        end
      end
    end
  end
end

function updateDampers()
  -- nothing to do here
end

function updateZones()
  for i,zn_id in ipairs(ZONE_IDS) do
    updateZone(_G['ZONE_'..zn_id], zn_id, ZONE_PROBE_IDS)
  end
end

function updateAlarms()
  for i,zn_id in ipairs(ZONE_IDS) do
    zoneTempAlarm(_G['ZONE_'..zn_id], zn_id, ZONE_PROBE_IDS)
  end
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
