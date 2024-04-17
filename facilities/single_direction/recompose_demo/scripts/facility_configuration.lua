PFRP_TEMP = 131
BLOWER_IDS = {'01', '02'}
ZONE_IDS = {'01'}
ZONE_PROBE_IDS = {'A', 'B', 'C'}
ZONE_LOG_COLUMNS = {'Temperature A', 'Temperature B', 'Temperature C', 'Head-Space Temp', 'Drum Rotation'}
WIRELESS_POINT_FAILURES = {}
WIRELESS_POINT_FAILURES["Zone01ProbeAPointID"] = 0
WIRELESS_POINT_FAILURES["Zone01ProbeBPointID"] = 0
WIRELESS_POINT_FAILURES["Zone01ProbeCPointID"] = 0

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = '192.168.1.55'
  settings["DataLoggingRate"] = "360"
  settings["FacilityName"] = "RECOMPOSE DEMO"
  settings["BlowerGain"] = "1"
  settings["BlowerIntegral"] = "1.5"
  settings["BlowerDerivative"] = "0"
  settings["BlowerDerivativeTime"] = "2"
  settings["BlowerRate"] = "2"
  settings["BlowerCycleOnTime"] = "55"
  settings["BlowerCycleOffTime"] = "5"
  settings["Blower01TempSetPoint"] = "60"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["Zone01ProbeAPointID"] = ""
  settings["Zone01ProbeBPointID"] = ""
  settings["Zone01ProbeCPointID"] = ""
  settings["DamperRate"] = "1"
  settings["DrumLimitSwitchIgnoreTime"] = "60"
  settings["DrumPistonExtensionCycleTime"] = "8"
  settings["DrumPistonRetractionCycleTime"] = "2"
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
    logInsert(log_values, reg[temp_prefix .. 'avgtemp'])
  end
  if reg['headspace'..zone_id..'logtemp'] and reg['headspace'..zone_id..'temp'] ~= nil and reg['headspace'..zone_id..'temp'] > 0 then
    logInsert(log_values, reg['headspace'..zone_id..'temp'])
  else
    logInsert(log_values, 0)
  end
  if reg['drum'..zone_id..'rotationls'] ~= nil and reg['drum'..zone_id..'rotationls'] > 0 then
    logInsert(log_values, reg['drum'..zone_id..'rotationls'] * 100)
  else
    logInsert(log_values, 0)
  end
  if valid_temps == true or reg['drum'..zone_id..'rotationls'] == 1 then
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

function zonesOnline(zone_ids)
  local online_count = 0
  for i, zone_id in ipairs(zone_ids) do
    if reg['zone'..zone_id..'control'] == 1 then
      online_count = online_count + 1
    end
  end
  return online_count
end

function drumRotationControl(zn_id)
  if io['drum'..zn_id..'limitswitch'] == 0 then
    reg['drum'..zn_id..'ignorels'] = 0
    reg['drum'..zn_id..'logrotation'] = 1
  end
  if io['drum'..zn_id..'limitswitch'] == 1 and tonumber(reg['drum'..zn_id..'ignorels']) == 0 then
    io['drum'..zn_id..'pistonout'] = 0
    io['drum'..zn_id..'pistonin'] = 0
    reg['drum'..zn_id..'control'] = 0
    reg['drum'..zn_id..'rotationls'] = 1
    if reg['drum'..zn_id..'logrotation'] == 1 then
      printData(_G['ZONE_'..zn_id]["file_name"], zoneLogValues(zn_id, ZONE_PROBE_IDS), zn_id)
      reg['drum'..zn_id..'logrotation'] = 0
    end
    reg['drum'..zn_id..'rotationls'] = 0
  end
  if reg['drum'..zn_id..'control'] == 0 then
    reg['drum'..zn_id..'pistoncycle'] = 0
    io['drum'..zn_id..'pistonout'] = 0
    io['drum'..zn_id..'pistonin'] = 0
    reg['drum'..zn_id..'ignorels'] = tonumber(SETTINGS['DrumLimitSwitchIgnoreTime'])
  elseif reg['drum'..zn_id..'control'] == 1 then
    if io['drum'..zn_id..'limitswitch'] == 1 and tonumber(reg['drum'..zn_id..'ignorels']) > 0 then
      reg['drum'..zn_id..'ignorels'] = tonumber(reg['drum'..zn_id..'ignorels']) - 1
    end
    if reg['drum'..zn_id..'pistoncycle'] == 0 then
      if io['drum'..zn_id..'pistonout'] == 0 and io['drum'..zn_id..'pistonin'] == 0 and reg['drum'..zn_id..'pistonld'] == 0 then
        io['drum'..zn_id..'pistonout'] = 0
        io['drum'..zn_id..'pistonin'] = 1
      elseif io['drum'..zn_id..'pistonout'] == 1 then
        io['drum'..zn_id..'pistonout'] = 0
        io['drum'..zn_id..'pistonin'] = 1
      else
        io['drum'..zn_id..'pistonout'] = 1
        io['drum'..zn_id..'pistonin'] = 0
      end
      if io['drum'..zn_id..'pistonout'] == 1 then
        reg['drum'..zn_id..'pistoncycle'] = tonumber(SETTINGS['DrumPistonExtensionCycleTime'])
      else
        reg['drum'..zn_id..'pistoncycle'] = tonumber(SETTINGS['DrumPistonRetractionCycleTime'])
      end
      reg['drum'..zn_id..'pistonld'] = io['drum'..zn_id..'pistonout']
    end
  end
end

function updateBlowers()
  blowerOnOffTempControl(
    BLOWER_01,
    'blower01',
    tempAvgForZones(ZONE_IDS,ZONE_PROBE_IDS),
    SETTINGS['Blower01TempSetPoint'],
    zonesOnline(ZONE_IDS),
    SETTINGS["MinVFDSpeed"],
    SETTINGS["MaxVFDSpeed"]
  )
  if io['blower01run'] == 1 then
    io['blower02run'] = 1
  else
    autoBlowerSpeedControl('blower02', zonesOnline(ZONE_IDS))
    updateBlowerRunValue('blower02', reg['blower02control'])
  end
end

function updateDampers()
  for i,zn_id in pairs(ZONE_IDS) do
    drumRotationControl(zn_id)
  end
end

function updateZones()
  for i,zn_id in ipairs(ZONE_IDS) do
    updateZone(_G['ZONE_'..zn_id],zn_id,ZONE_PROBE_IDS)
    if tonumber(reg['headspace'..zn_id..'logtemp']) == 1 then
      if io['headspace'..zn_id..'probe'] ~= nil and io['headspace'..zn_id..'probe'] > 0 then
        if reg['headspace'..zn_id..'temp'] == nil or reg['headspace'..zn_id..'temp'] == 0 then
          reg['headspace'..zn_id..'temp'] = io['headspace'..zn_id..'probe']
          printData(_G['ZONE_'..zn_id]["file_name"], zoneLogValues(zn_id, ZONE_PROBE_IDS), zn_id)
        else
          reg['headspace'..zn_id..'temp'] = io['headspace'..zn_id..'probe']
        end
      else
        reg['headspace'..zn_id..'temp'] = 0
      end
    end
  end
end

function updateAlarms()
  zoneTempAlarm(ZONE_01, '01', ZONE_PROBE_IDS)
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
