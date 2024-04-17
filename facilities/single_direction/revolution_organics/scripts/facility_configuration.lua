function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PFRP_TEMP = 55
  BLOWER_IDS = uid(7)
  BLOWER_GROUP_ZONE_IDS = {}
  BLOWER_GROUP_ZONE_IDS['01'] = uid(1,2)
  BLOWER_GROUP_ZONE_IDS['02'] = uid(3,4)
  BLOWER_GROUP_ZONE_IDS['03'] = uid(5,6)
  BLOWER_GROUP_ZONE_IDS['04'] = uid(7,8)
  BLOWER_GROUP_ZONE_IDS['05'] = uid(9,10)
  BLOWER_GROUP_ZONE_IDS['06'] = uid(11,12)
  BLOWER_GROUP_ZONE_IDS['07'] = uid(13,14)
  ZONE_IDS = uid(14)
  ZONE_PROBE_IDS = {'A', 'B'}
  ZONE_LOG_COLUMNS = {'Temperature A','Temperature B','Damper','PFRP Time'}
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
  settings["FacilityName"] = "REVOLUTION ORGANICS"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings["BlowerRate"] = "2"
  settings["BlowerCycleOnTime"] = "55"
  settings["BlowerCycleOffTime"] = "5"
  settings["Blower01TempSetPoint"] = "60"
  settings["Blower02TempSetPoint"] = "60"
  settings["Blower03TempSetPoint"] = "60"
  settings["Blower04TempSetPoint"] = "60"
  settings["Blower05TempSetPoint"] = "60"
  settings["Blower06TempSetPoint"] = "60"
  settings["Blower07TempSetPoint"] = "60"
  settings["DamperGain"] = "1"
  settings["DamperIntegral"] = "1"
  settings["DamperDerivative"] = "0.3"
  settings["DamperDerivativeTime"] = "10"
  settings["DamperRate"] = "10"
  settings["MinDamperValue"] = "6"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  return settings
end

function zoneLogValues(zone_id, probe_ids)
  local log_values = {}
  local valid_temps = false
  for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, probe_ids)) do
    if reg[temp_prefix..'avgtemp'] > 0 then
      valid_temps = true
    end
    logInsert(log_values, reg[temp_prefix..'avgtemp'])
  end
  logInsert(log_values, reg['zone'..zone_id..'avgdamper'])
  logInsert(log_values,reg['zone'..zone_id..'pfrptime'])
  if valid_temps == true then
    resetAverage('zone'..zone_id..'avgdamper')
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

function damperAverageForZones(first_zone_id, second_zone_id)
  if ioAppearsValid('damper'..first_zone_id..'position') and ioAppearsValid('damper'..second_zone_id..'position') then
    if io['damper'..first_zone_id..'position'] > 0 then
      if io['damper'..second_zone_id..'position'] > 0 then
        return (io['damper'..first_zone_id..'position'] + io['damper'..second_zone_id..'position']) / 2
      else
        return io['damper'..first_zone_id..'position']
      end
    else
      return io['damper'..second_zone_id..'position']
    end
  else
    return 0
  end
end

function spForZone(zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BLOWER_GROUP_ZONE_IDS[blower]) do
      if zone == zn_id then
        return SETTINGS['Blower'..blower..'TempSetPoint']
      end
    end
  end
end

function updateBlowers()
  blowerDirectControl('blower01', damperAverageForZones('01', '02'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  blowerDirectControl('blower02', damperAverageForZones('03', '04'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  blowerDirectControl('blower03', damperAverageForZones('05', '06'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  blowerDirectControl('blower04', damperAverageForZones('07', '08'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  blowerDirectControl('blower05', damperAverageForZones('09', '10'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  blowerDirectControl('blower06', damperAverageForZones('11', '12'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  blowerDirectControl('blower07', damperAverageForZones('13', '14'), SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
end

function updateDampers()
  for i,zn_id in ipairs(ZONE_IDS) do
    damperControl(_G['DAMPER_'..zn_id], zn_id, tempAvgForZones({zn_id}, ZONE_PROBE_IDS), spForZone(zn_id))
  end
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
  for i,blwr_id in ipairs(BLOWER_IDS) do
    blowerFaultAlarm(_G['BLOWER_'..blwr_id],blwr_id,'Blower '..tonumber(blwr_id))
  end
end

if not luatest_running then
  while init_complete ~= true do
    sleep(1000)
  end
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
