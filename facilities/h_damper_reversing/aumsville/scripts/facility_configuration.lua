local str__BLOWER_,
str__Blower,
str__blower,
str__duct,
str__Pressure,
str__PosDirPressure,
str__NegDirPressure,
str__pressure,
str__pressuresp,
str__pospressure,
str__negpressure,
str__pospressuresp,
str__negpressuresp,
str__pospressureavg,
str__negpressureavg,
str__control,
str__direction,
str__DAMPER_,
str__Damper,
str__damper,
str__avgdamper,
str__ZONE_,
str__Zone,
str__zone,
str__Regime,
str__regime,
str__Mister,
str__mister,
str__mistertimer,
str__Biofilter,
str__biofilter,
str__idletimer,
str__revdamper,
str__exhaust,
str__premister,
str__lvtemp,
str__avgtemp,
str__ProbeAPointID,
str__ProbeBPointID,
str__ProbePointID,
str__TempSetPoint,
str__BiofilterForcePositiveTemperature =
'BLOWER_',
'Blower',
'blower',
'duct',
'Pressure',
'PosDirPressure',
'NegDirPressure',
'pressure',
'pressuresp',
'pospressure',
'negpressure',
'pospressuresp',
'negpressuresp',
'pospressureavg',
'negpressureavg',
'control',
'direction',
'DAMPER_',
'Damper',
'damper',
'avgdamper',
'ZONE_',
'Zone',
'zone',
'Regime',
'regime',
'Mister',
'mister',
'mistertimer',
'Biofilter',
'biofilter',
'idletimer',
'revdamper',
'exhaust',
'premister',
'lvtemp',
'avgtemp',
'ProbeAPointID',
'ProbeBPointID',
'ProbePointID',
'TempSetPoint',
"BiofilterForcePositiveTemperature"

function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PFRP_TEMP = 131
  INCLUDE_INVALID_TEMPS = true
  BIOFILTER_PROBE_IDS = {''}
  BLOWER_IDS = uid(2)
  BLOWER_GROUP_ZONE_IDS,BLOWER_LABELS = {},{}
  BLOWER_GROUP_ZONE_IDS['01'] = uid(5,10)
  BLOWER_GROUP_ZONE_IDS['02'] = uid(17,22)
  BLOWER_LABELS = {['01']='P1',['02']='S1'}
  ZONE_IDS = {'05','06','07','08','09','10','17','18','19','20','21','22'}
  ZONE_LABELS = {
    ['05']='P5',['06']='P6',['07']='P7',['08']='P8',['09']='P9',['10']='P10',
    ['17']='S5',['18']='S6',['19']='S7',['20']='S8',['21']='S9',['22']='S10'
  }
  ZONE_PROBE_IDS = {'A','B'}
  ZONE_LOG_COLUMNS = {'Temperature A','Temperature B','Damper','Aeration Direction','Blower Speed','Biofilter Temperature','Exhaust Temperature'}
  for i,bl_id in ipairs(BLOWER_IDS) do
    WIRELESS_POINT_FAILURES[str__Biofilter..bl_id..str__ProbePointID] = 0
    -- init blower values
    initBlower(bl_id)
  end
  for i,zn_id in ipairs(ZONE_IDS) do
    WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeAPointID] = 0
    WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeBPointID] = 0
    -- init zone & damper values
    initZone(zn_id)
    initDamper(zn_id)
  end
end

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = '192.168.1.55'
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "AUMSVILLE"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings[str__PosDirPressure.."Setpoint".."Min"] = "4"
  settings[str__PosDirPressure.."Setpoint".."Max"] = "8"
  settings[str__NegDirPressure.."Setpoint".."Min"] = "8"
  settings[str__NegDirPressure.."Setpoint".."Max"] = "12"
  settings[str__Pressure.."Setpoint".."HotZoneTrigger"] = "50"
  settings[str__Pressure.."Setpoint".."ColdZoneTrigger"] = "50"
  settings[str__Pressure.."Setpoint".."ChangeTimer"] = "5"
  settings[str__Pressure.."Setpoint".."ChangeInterval"] = "2"
  settings[str__Blower.."Gain"] = "1"
  settings[str__Blower.."Integral"] = "1.5"
  settings[str__Blower.."Derivative"] = "0"
  settings[str__Blower.."DerivativeTime"] = "2"
  settings[str__Blower.."Rate"] = "2"
  settings[str__Blower.."CycleNegativeTime"] = "30"
  settings[str__Blower.."CyclePositiveTime"] = "30"
  settings[str__Regime.."1"..str__TempSetPoint] = "131"
  settings[str__Regime.."2"..str__TempSetPoint] = "144"
  settings[str__Regime.."3"..str__TempSetPoint] = "134"
  settings[str__Regime.."1"..'Duration'] = "5"
  settings[str__Regime.."2"..'Duration'] = "7"
  settings[str__Damper.."Gain"] = "1"
  settings[str__Damper.."Integral"] = "1"
  settings[str__Damper.."Derivative"] = "0.3"
  settings[str__Damper.."DerivativeTime"] = "10"
  settings[str__Damper.."Rate"] = "10"
  settings["Min"..str__Damper.."Value"] = "6"
  settings["MaxTemperatureAlarm"] = "176"
  settings["MinTemperatureAlarm"] = "32"
  settings[str__BiofilterForcePositiveTemperature] = "180"
  settings[str__Mister.."OnTime"] = "10"
  settings[str__Mister.."OffTime"] = "30"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  settings["WirelessSensorAgeAlarm"] = "10"
  for i,zn_id in ipairs(ZONE_IDS) do
    settings[str__Zone..zn_id..str__ProbeAPointID] = "0"
    settings[str__Zone..zn_id..str__ProbeBPointID] = "0"
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    settings[str__Blower..bl_id..'PosDirection'..str__TempSetPoint] = "100"
    settings[str__Blower..bl_id..'NegDirection'..str__TempSetPoint] = "100"
    settings[str__Mister..bl_id..'Pos'..str__TempSetPoint] = "100"
    settings[str__Mister..bl_id..'Neg'..str__TempSetPoint] = "95"
    settings[str__Biofilter..bl_id..str__ProbePointID] = "0"
  end
  return settings
end

function blowerLogValues(log_values,zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BLOWER_GROUP_ZONE_IDS[blower]) do
        if zone == zn_id then
            logInsert(log_values,io[str__blower..blower..'revdamper'] * 10)
            logInsert(log_values,io[str__blower..blower..'speed'])
            logInsert(log_values,reg['biofilter'..blower..'avgtemp'])
            logInsert(log_values,reg['exhaust'..blower..'avgtemp'])
        end
    end
  end
end

function zoneLogValues(zn_id,probe_ids)
  local log_values = {}
  local valid_temps = false
  for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,probe_ids)) do
    if reg[temp_prefix..str__avgtemp] > 0 then
      valid_temps = true
    end
    logInsert(log_values,reg[temp_prefix..str__avgtemp])
  end
  logInsert(log_values,reg[str__zone..zn_id..str__avgdamper])
  blowerLogValues(log_values,zn_id)
  if valid_temps == true then
    resetAverage(str__zone..zn_id..str__avgdamper)
  end
  return log_values
end

function updateLastValidTemps()
  local wireless_data = retrieveWirelessSensorDataTCP()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,probe_id in ipairs(ZONE_PROBE_IDS) do
      local settingName = str__Zone..zn_id..'Probe'..probe_id..'PointID'
      local regPrefix = str__zone..zn_id..'p'..probe_id
      updateWirelessTemps(settingName,regPrefix,wireless_data)
    end
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    updateLVTemp(str__exhaust..bl_id)
    updateLVTemp(str__premister..bl_id)
    local settingName = str__Biofilter..bl_id..str__ProbePointID
    local regPrefix = str__biofilter..bl_id
    updateWirelessTemps(settingName,regPrefix,wireless_data)
  end
end

function updateTempAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix,reg[temp_prefix..str__lvtemp])
    end
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    updateTempAverage(str__exhaust..bl_id,reg[str__exhaust..bl_id..str__lvtemp])
    updateTempAverage(str__biofilter..bl_id,reg[str__biofilter..bl_id..str__lvtemp])
  end
end

function updateDamperAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    local dmpr_id = zn_id
    updateDamperAverage(zn_id,dmpr_id)
  end
end

function updateAverages()
  updateTempAverages()
  updateDamperAverages()
end

function spForZone(zn_id)
  if reg['zone'..zn_id..str__regime] == 3 then
    return SETTINGS['Regime3TempSetPoint']
  elseif reg['zone'..zn_id..str__regime] == 2 then
    return SETTINGS['Regime2TempSetPoint']
  else
    return SETTINGS['Regime1TempSetPoint']
  end
end

function zonesOnline(zn_ids)
  local online_count = 0
  for i,zn_id in ipairs(zn_ids) do
    if reg[str__zone..zn_id..str__control] == 1 then
      online_count = online_count + 1
    end
  end
  return online_count
end

function updateBlowers()
  for i,bl_id in ipairs(BLOWER_IDS) do
    local load_zone_active = false
    for i,zn_id in ipairs(BLOWER_GROUP_ZONE_IDS[bl_id]) do
        if reg['loadzone'..zn_id..'active'] == 1 then
          load_zone_active = true
          reg[str__blower..bl_id.."revoverride"] = 1
          reg[str__blower..bl_id..str__direction] = 1
          reg[str__blower..bl_id.."override"] = 1
          reg[str__blower..bl_id.."control"] = 1
        end
    end
    if reg[str__blower..bl_id..'revlogic'] == 0 then
      local top_avg = tempAvgForZones(BLOWER_GROUP_ZONE_IDS[bl_id],{'A'})
      local btm_avg = tempAvgForZones(BLOWER_GROUP_ZONE_IDS[bl_id],{'B'})
      local top_sp = tonumber(SETTINGS["Blower"..bl_id..'NegDirection'.."TempSetPoint"])
      local btm_sp = tonumber(SETTINGS["Blower"..bl_id..'PosDirection'.."TempSetPoint"])
      blowerDirectionTempControl(
        bl_id,
        zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id]),
        top_avg,
        btm_avg,
        tempAverageForBiofilters({bl_id},BIOFILTER_PROBE_IDS),
        top_sp,
        btm_sp
      )
    else
      blowerDirectionControl(
        str__blower..bl_id,
        reg['biofilter'..bl_id..'lvtemp'],
        SETTINGS[str__BiofilterForcePositiveTemperature],
        zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id])
      )
    end
    if load_zone_active and reg[str__blower..bl_id..str__idletimer] == 0 then
      if io[str__blower..bl_id.."revdamper"] == 1 then
        local max_speed = 100
        io[str__blower..bl_id.."speed"] = max_speed
        reg[str__blower..bl_id.."value"] = max_speed
      end
    end
    if reg[str__blower..bl_id..str__idletimer] == 0 then
      updateDuctPressureSetpoint(bl_id,BLOWER_GROUP_ZONE_IDS[bl_id],ZONE_PROBE_IDS,true)
    end
    blowerPressureControl(
      _G[str__BLOWER_..bl_id],
      str__blower..bl_id,
      reg[str__duct..bl_id.."pressureavg"],
      reg[str__duct..bl_id..str__pressuresp],
      zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id]),
      SETTINGS["MinVFDSpeed"],
      SETTINGS["MaxVFDSpeed"]
    )
  end
  updateMisters(BLOWER_IDS,BIOFILTER_PROBE_IDS)
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS['BlowerRate'])
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit,true)
  end
end

function updateMisters(blower_ids,biofilter_probe_ids)
  for i,bl_id in ipairs(blower_ids) do
    local timer = reg[str__duct..bl_id..str__mistertimer]
    local ontime = tonumber(SETTINGS[str__Mister.."OnTime"]) * 60
    local offtime = tonumber(SETTINGS[str__Mister.."OffTime"]) * 60
    if io[str__blower..bl_id..'run'] == 1 and reg[str__blower..bl_id..str__idletimer] == 0 then
      if reg[str__duct..bl_id..str__mister..'override'] == 0 then
        local temp,
              air_dir =
              reg['premister'..bl_id..'lvtemp'],
              'Pos'

        if io[str__blower..bl_id..'revdamper'] == 0 then
          temp = tempAverageForBiofilters({bl_id},biofilter_probe_ids)
          air_dir = 'Neg'
        end

        if temp >= tonumber(SETTINGS[str__Mister..bl_id..air_dir..'TempSetPoint']) then
          if timer == 0 then
            io[str__duct..bl_id..str__mister] = 1
            reg[str__duct..bl_id..str__mistertimer] = ontime + offtime
          elseif timer <= offtime then
            io[str__duct..bl_id..str__mister] = 0
          end
        else
          io[str__duct..bl_id..str__mister] = 0
        end
      else
        io[str__duct..bl_id..str__mister] = reg[str__duct..bl_id..str__mister.."control"]
      end
    else
      io[str__duct..bl_id..str__mister] = 0
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
    updateZone(_G[str__ZONE_..zn_id],zn_id,ZONE_PROBE_IDS)
  end
  updateAlarms()
end

function updateAlarms()
  for i,zn_id in ipairs(ZONE_IDS) do
    zoneTempAlarm(_G[str__ZONE_..zn_id],zn_id,ZONE_PROBE_IDS)
    wirelessSensorAgeAlarm(_G[str__ZONE_..zn_id],str__zone,zn_id,ZONE_PROBE_IDS)
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    blowerFaultAlarm(_G[str__BLOWER_..bl_id],bl_id,'Blower '..BLOWER_LABELS[bl_id])
    wirelessSensorAgeAlarm(_G[str__BLOWER_..bl_id],str__biofilter,bl_id,{''})
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
