local str__blower = 'blower'

PFRP_TEMP = 131
BLOWER_IDS = {'01','02','03','04'}
BLWR_GRP_ZONE_IDS = {}
BLWR_GRP_ZONE_IDS['01'] = {'01','02','03','04'}
BLWR_GRP_ZONE_IDS['02'] = {'05','06','07','08'}
BLWR_GRP_ZONE_IDS['03'] = {'13','14','15','16'}
BLWR_GRP_ZONE_IDS['04'] = {'09','10','11','12'}
ZONE_IDS = {'01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16'}
ZONE_PROBE_IDS = {'A','B'}
ZONE_LOG_COLUMNS = {'Temperature A','Temperature B','Damper','Aeration Direction','Blower Speed','Biofilter Temperature','Exhaust Temperature'}
for i,zn_id in ipairs(ZONE_IDS) do
  WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 0
  WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeBPointID"] = 0
end
for i,blwr_id in ipairs(BLOWER_IDS) do
  WIRELESS_POINT_FAILURES["Biofilter"..blwr_id.."ProbePointID"] = 0
end

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = '192.168.5.26'
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "GRIMMS FUEL EXPANSION"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings["PosDirPressureSetpointMin"] = "4"
  settings["PosDirPressureSetpointMax"] = "8"
  settings["NegDirPressureSetpointMin"] = "8"
  settings["NegDirPressureSetpointMax"] = "14"
  settings["PressureSetpointHotZoneTrigger"] = "50"
  settings["PressureSetpointColdZoneTrigger"] = "50"
  settings["PressureSetpointChangeTimer"] = "5"
  settings["PressureSetpointChangeInterval"] = "2"
  settings["BlowerGain"] = "1"
  settings["BlowerIntegral"] = "1.5"
  settings["BlowerDerivative"] = "0"
  settings["BlowerDerivativeTime"] = "2"
  settings["BlowerRate"] = "2"
  settings["BlowerCycleNegativeTime"] = "40"
  settings["BlowerCyclePositiveTime"] = "40"
  settings["BiofilterForcePositiveTemperature"] = "80"
  settings["Regime1TempSetPoint"] = "131"
  settings["Regime2TempSetPoint"] = "144"
  settings["Regime3TempSetPoint"] = "134"
  settings["Regime1Duration"] = "5"
  settings["Regime2Duration"] = "7"
  settings["DamperGain"] = "1"
  settings["DamperIntegral"] = "1"
  settings["DamperDerivative"] = "0.3"
  settings["DamperDerivativeTime"] = "10"
  settings["DamperRate"] = "10"
  settings["MinDamperValue"] = "6"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["WirelessSensorAgeAlarm"] = "10"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  for i,zn_id in ipairs(ZONE_IDS) do
    settings["Zone"..zn_id.."ProbeAPointID"] = "0"
    settings["Zone"..zn_id.."ProbeBPointID"] = "0"
  end
  for i,blwr_id in ipairs(BLOWER_IDS) do
    settings['Mister'..blwr_id..'PosTempSetPoint'] = "100"
    settings['Mister'..blwr_id..'NegHighTempSetPoint'] = "104"
    settings['Mister'..blwr_id..'NegLowTempSetPoint'] = "95"
    settings["Biofilter"..blwr_id.."ProbePointID"] = "0"
  end
  return settings
end

function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  for i,blwr_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(blwr_id)
  end
  for i,zn_id in ipairs(ZONE_IDS) do
    -- init zone & damper values
    initZone(zn_id)
    initDamper(zn_id)
  end
end

function blowerLogValues(log_values,zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BLWR_GRP_ZONE_IDS[blower]) do
        if zone == zn_id then
            logInsert(log_values,io[str__blower..blower..'revdamper'] * 10)
            logInsert(log_values,reg[str__blower..blower..'value'])
            logInsert(log_values,reg['biofilter'..blower..'avgtemp'])
            logInsert(log_values,reg['exhaust'..blower..'avgtemp'])
        end
    end
  end
end

function zoneLogValues(zn_id,probe_ids)
  local log_values = {}
  local valid_temps = false
  for n,temp_prefix in ipairs(getTempPrefixes('zone',zn_id,probe_ids)) do
    if reg[temp_prefix..'avgtemp'] > 0 then
      valid_temps = true
    end
    logInsert(log_values,reg[temp_prefix..'avgtemp'])
  end
  logInsert(log_values,reg['zone'..zn_id..'avgdamper'])
  blowerLogValues(log_values,zn_id)
  if valid_temps == true then
    resetAverage('zone'..zn_id..'avgdamper')
  end
  return log_values
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
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateLVTemp('exhaust'..blwr_id)
    updateLVTemp('premister'..blwr_id)
    local settingName = 'Biofilter'..blwr_id..'ProbePointID'
    local regPrefix = 'biofilter'..blwr_id
    updateWirelessTemps(settingName,regPrefix,wireless_data)
  end
end

function updateTempAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zn_id,ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix,reg[temp_prefix..'lvtemp'])
    end
  end
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateTempAverage('exhaust'..blwr_id,reg['exhaust'..blwr_id..'lvtemp'])
    updateTempAverage('biofilter'..blwr_id,reg['biofilter'..blwr_id..'lvtemp'])
  end
end

function updateDamperAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    local damper_id = zn_id
    updateDamperAverage(zn_id,damper_id)
  end
end

function updateAverages()
  updateTempAverages()
  updateDamperAverages()
end

function spForZone(zn_id)
  if reg['zone'..zn_id..'regime'] == 3 then
    return SETTINGS['Regime3TempSetPoint']
  elseif reg['zone'..zn_id..'regime'] == 2 then
    return SETTINGS['Regime2TempSetPoint']
  else
    return SETTINGS['Regime1TempSetPoint']
  end
end

function zonesOnline(zn_ids)
  local online_count = 0
  for i,zn_id in ipairs(zn_ids) do
    if reg['zone'..zn_id..'control'] == 1 then
      online_count = online_count + 1
    end
  end
  return online_count
end

function updateBlowers()
  for i,bl_id in ipairs(BLOWER_IDS) do
    local load_zone_active = false
    for i,zn_id in ipairs(BLWR_GRP_ZONE_IDS[bl_id]) do
        if reg['loadzone'..zn_id..'active'] == 1 then
          load_zone_active = true
          reg[str__blower..bl_id.."revoverride"] = 1
          reg[str__blower..bl_id..'direction'] = 1
          reg[str__blower..bl_id.."override"] = 1
          reg[str__blower..bl_id.."control"] = 1
        end
    end
    blowerDirectionControl(str__blower..bl_id,reg['biofilter'..bl_id..'lvtemp'],SETTINGS["BiofilterForcePositiveTemperature"],zonesOnline(BLWR_GRP_ZONE_IDS[bl_id]))
    if load_zone_active and reg[str__blower..bl_id..'idletimer'] == 0 then
      if io[str__blower..bl_id.."revdamper"] == 1 then
        local max_speed = 100
        io[str__blower..bl_id.."speed"] = max_speed
        reg[str__blower..bl_id.."value"] = max_speed
      end
    end
    if reg[str__blower..bl_id..'idletimer'] == 0 then
      updateDuctPressureSetpoint(bl_id,BLWR_GRP_ZONE_IDS[bl_id],ZONE_PROBE_IDS,true)
    end
    blowerPressureControl(
      _G['BLOWER_'..bl_id],
      str__blower..bl_id,
      reg['duct'..bl_id..'pressureavg'],
      reg['duct'..bl_id..'pressuresp'],
      zonesOnline(BLWR_GRP_ZONE_IDS[bl_id]),
      SETTINGS["MinVFDSpeed"],
      SETTINGS["MaxVFDSpeed"]
    )
  end
  updateMisters()
end

function updateMisters()
  for i,blwr_id in ipairs(BLOWER_IDS) do
    if io[str__blower..blwr_id..'run'] == 1 and reg[str__blower..blwr_id..'idletimer'] == 0 then
      if reg[str__blower..blwr_id..'direction'] == 1 then
        if reg['premister'..blwr_id..'lvtemp'] >= tonumber(SETTINGS['Mister'..blwr_id..'Pos'..'TempSetPoint']) then
          io['duct'..blwr_id..'mister'] = 1
        else
          io['duct'..blwr_id..'mister'] = 0
        end
      else
        if reg['biofilter'..blwr_id..'lvtemp'] ~= nil and reg['biofilter'..blwr_id..'lvtemp'] >= tonumber(SETTINGS['Mister'..blwr_id..'NegHigh'..'TempSetPoint']) then
          io['duct'..blwr_id..'mister'] = 1
        elseif reg['biofilter'..blwr_id..'lvtemp'] ~= nil and reg['biofilter'..blwr_id..'lvtemp'] <= tonumber(SETTINGS['Mister'..blwr_id..'NegLow'..'TempSetPoint']) then
          io['duct'..blwr_id..'mister'] = 0
        end
      end
    else
      io['duct'..blwr_id..'mister'] = 0
    end
  end
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
  for i,zn_id in ipairs(ZONE_IDS) do
    updateZone(_G['ZONE_'..zn_id],zn_id,ZONE_PROBE_IDS)
  end
  updateAlarms()
end

function updateAlarms()
  for i,zn_id in ipairs(ZONE_IDS) do
    zoneTempAlarm(_G['ZONE_'..zn_id],zn_id,ZONE_PROBE_IDS)
    wirelessSensorAgeAlarm(_G['ZONE_'..zn_id], 'zone', zn_id, ZONE_PROBE_IDS)
  end

  for i,blwr_id in ipairs(BLOWER_IDS) do
    blowerFaultAlarm(_G['BLOWER_'..blwr_id],blwr_id,'Blower '..tonumber(blwr_id))
    wirelessSensorAgeAlarm(_G['BLOWER_'..blwr_id],'premister',blwr_id,{''})
    wirelessSensorAgeAlarm(_G['BLOWER_'..blwr_id],'exhaust',blwr_id,{''})
    wirelessSensorAgeAlarm(_G['BLOWER_'..blwr_id],'biofilter',blwr_id,{''})
  end
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS['BlowerRate'])
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit,true)
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
