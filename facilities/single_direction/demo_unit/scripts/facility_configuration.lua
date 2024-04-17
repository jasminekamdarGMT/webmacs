PFRP_TEMP = 131
BLOWER_IDS = {'01','02'}
ZONE_IDS = {'01','02'}
ZONE_PROBE_IDS = {''}
ZONE_LOG_COLUMNS = {'Temperature A', 'Head-Space Temp'}

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "30"
  settings["FacilityName"] = "DEAD GUY DUTY"
  settings["BlowerGain"] = "1"
  settings["BlowerIntegral"] = "1.5"
  settings["BlowerDerivative"] = "0"
  settings["BlowerDerivativeTime"] = "2"
  settings["BlowerRate"] = "1"
  settings["BlowerCycleOnTime"] = "3"
  settings["BlowerCycleOffTime"] = "10"
  settings["Blower01TempSetPoint"] = "135"
  settings["Blower02TempSetPoint"] = "135"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
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
    logInsert(log_values, reg[temp_prefix .. 'avgtemp'])
  end
  if reg['headspace'..zone_id..'logtemp'] and reg['headspace'..zone_id..'temp'] ~= nil and reg['headspace'..zone_id..'temp'] > 0 then
    logInsert(log_values, reg['headspace'..zone_id..'temp'])
  else
    logInsert(log_values, 0)
  end
  return log_values
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

function updateBlowers()
  for i,blwr_id in ipairs(BLOWER_IDS) do
    blowerOnOffTempControl(
      _G['BLOWER_'..blwr_id],
      'blower'..blwr_id,
      tempAvgForZones({blwr_id}, ZONE_PROBE_IDS),
      SETTINGS['Blower'..blwr_id..'TempSetPoint'],
      zonesOnline({blwr_id}),
      SETTINGS["MinVFDSpeed"],
      SETTINGS["MaxVFDSpeed"]
    )
  end
end

function updateDampers()
  -- nothing to do here
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
