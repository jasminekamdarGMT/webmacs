function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  BLOWER_IDS = uid(1)
  ZONE_IDS = uid(1)
  PFRP_TEMP = 131
  ZONE_PROBE_IDS = {'A'}
  WIRELESS_POINT_FAILURES = {}
  for i,zn_id in ipairs(ZONE_IDS) do
    WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 0
  end
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
  settings["WirelessBaseStationIP"] = '192.168.1.55'
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "Pre-Engineered Wireless"
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
  settings["WirelessSensorAgeAlarm"] = "10"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  settings["DamperRate"] = "10"
  for i,zn_id in ipairs(ZONE_IDS) do
    settings["Zone"..zn_id.."ProbeAPointID"] = "0"
  end
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
  local wireless_data = retrieveWirelessSensorDataTCP()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,probe_id in ipairs(ZONE_PROBE_IDS) do
      local settingName = 'Zone'..zn_id..'Probe'..probe_id..'PointID'
      local regPrefix = 'zone'..zn_id..'p'..probe_id
      updateWirelessTemps(settingName,regPrefix,wireless_data)
    end
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, ZONE_PROBE_IDS)) do
      updateLVTemp(temp_prefix)
    end
  end
end

function updateTempAverages()
  for i, zone_id in ipairs(ZONE_IDS) do
    for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix,reg[temp_prefix..'lvtemp'])
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
    blowerOnOffTempControl(
      _G['BLOWER_'..blwr_id],
      'blower'..blwr_id,
      tempAvgForZones({blwr_id}, ZONE_PROBE_IDS),
      setpointForZone(blwr_id),
      totalZonesOnline({blwr_id})
    )
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
    wirelessSensorAgeAlarm(_G['ZONE_'..zn_id], 'zone', zn_id, ZONE_PROBE_IDS)
  end
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
