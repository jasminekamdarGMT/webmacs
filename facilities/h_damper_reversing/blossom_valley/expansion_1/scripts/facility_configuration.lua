local str__BLOWER_,
str__Blower,
str__blower,
str__duct,
str__Pressure,
str__PosDirPressure,
str__NegDirPressure,
str__pressure,
str__pressureavg,
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
str__BiofilterForcePositiveTemperature,
str__idletimer,
str__revdamper,
str__exhaust,
str__premister,
str__lvtemp,
str__avgtemp,
str__ProbeAPointID,
str__ProbeBPointID,
str__TempSetPoint,
str__Setpoint,
str__value,
str__Min,
str__Max =
'BLOWER_',
'Blower',
'blower',
'duct',
'Pressure',
'PosDirPressure',
'NegDirPressure',
'pressure',
'pressureavg',
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
'BiofilterForcePositiveTemperature',
'idletimer',
'revdamper',
'exhaust',
'premister',
'lvtemp',
'avgtemp',
'ProbeAPointID',
'ProbeBPointID',
'TempSetPoint',
'Setpoint',
'value',
'Min',
'Max'

function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  --init globals
  PFRP_TEMP = 131
  PFRP_AGGREGATE = "min"
  INCLUDE_INVALID_TEMPS = true
  COUNT_PFRP_IN_WARMUP_ZONE = false
  BIOFILTER_PROBE_IDS = {'A'}
  BLOWER_IDS = {'P7','S7'}
  P_BL_IDS,S_BL_IDS,BLOWER_GROUP_ZONE_IDS = uid(7,7,'P'),uid(7,7,'S'),{}
  BLOWER_GROUP_ZONE_IDS['P7'] = uid(25,26)
  BLOWER_GROUP_ZONE_IDS['S7'] = uid(27,28)
  ZONE_LABELS = {
    ['25']='P7A',['26']='P7B',['27']='S7A',['28']='S7B'
  }
  ZONE_IDS = uid(25,28)
  ZONE_PROBE_IDS = {'A','B'}
  ZONE_LOG_COLUMNS = {'Temperature A','Temperature B','Damper','Regime','Aeration Direction','Blower Speed','Biofilter Temperature','Exhaust Temperature','PFRP Time','Capped'}
  ZN_DMPR_IDS = {
    ['25']='P7A',['26']='P7B',['27']='S7A',['28']='S7B'
  }
  for i,zn_id in ipairs(ZONE_IDS) do
    WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeAPointID] = 0
    WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeBPointID] = 0
  end
  for i,bl_id in ipairs(P_BL_IDS) do
    WIRELESS_POINT_FAILURES[str__Biofilter..bl_id..str__ProbeAPointID] = 0
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(bl_id)
  end
  for i,zn_id in ipairs(ZONE_IDS) do
    -- init zone & damper values
    initZone(zn_id)
    initDamper(ZN_DMPR_IDS[zn_id])
  end
end

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = '192.168.1.103'
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "BLOSSOM VALLEY EXP 1"
  settings["PrimaryMinVFDSpeed"] = "25"
  settings["PrimaryMaxVFDSpeed"] = "100"
  settings["SecondaryMinVFDSpeed"] = "25"
  settings["SecondaryMaxVFDSpeed"] = "100"
  settings[str__Pressure..str__Setpoint..str__Min] = "4"
  settings[str__Pressure..str__Setpoint..str__Max] = "8"
  settings[str__PosDirPressure..str__Setpoint..str__Min] = "4"
  settings[str__PosDirPressure..str__Setpoint..str__Max] = "8"
  settings[str__NegDirPressure..str__Setpoint..str__Min] = "14"
  settings[str__NegDirPressure..str__Setpoint..str__Max] = "18"
  settings[str__Pressure..str__Setpoint.."HotZoneTrigger"] = "50"
  settings[str__Pressure..str__Setpoint.."ColdZoneTrigger"] = "50"
  settings[str__Pressure..str__Setpoint.."ChangeTimer"] = "5"
  settings[str__Pressure..str__Setpoint.."ChangeInterval"] = "2"
  settings[str__Blower.."Gain"] = "1"
  settings[str__Blower.."Integral"] = "1.5"
  settings[str__Blower.."Derivative"] = "0"
  settings[str__Blower.."DerivativeTime"] = "2"
  settings[str__Blower.."Rate"] = "2"
  settings[str__Blower.."CyclePositiveTime"] = "30"
  settings[str__Blower.."CycleNegativeTime"] = "30"
  settings[str__Regime.."1Duration"] = "5"
  settings[str__Regime.."1"..str__TempSetPoint] = "131"
  settings[str__Regime.."2"..str__TempSetPoint] = "144"
  settings[str__Regime.."3"..str__TempSetPoint] = "134"
  settings["PrimaryPadPosDirection"..str__TempSetPoint] = "100"
  settings["PrimaryPadNegDirection"..str__TempSetPoint] = "100"
  settings[str__Damper.."Gain"] = "1"
  settings[str__Damper.."Integral"] = "1"
  settings[str__Damper.."Derivative"] = "0.3"
  settings[str__Damper.."DerivativeTime"] = "10"
  settings[str__Damper.."Rate"] = "10"
  settings[str__Min..str__Damper.."Value"] = "6"
  settings[str__Max.."TemperatureAlarm"] = "176"
  settings[str__Min.."TemperatureAlarm"] = "32"
  settings[str__BiofilterForcePositiveTemperature] = "180"
  settings[str__Mister.."OnTime"] = "10"
  settings[str__Mister.."OffTime"] = "30"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  settings["WirelessSensorAgeAlarm"] = "10"
  settings["WirelessTempsPollInterval"] = "5"
  settings["MisterRelayType"] = "NO"
  for i,zn_id in ipairs(ZONE_IDS) do
    settings[str__Zone..zn_id..str__Regime.."Type"] = "warmup"
    settings[str__Zone..zn_id..str__ProbeAPointID] = "0"
    settings[str__Zone..zn_id..str__ProbeBPointID] = "0"
  end
  for i,bl_id in ipairs(P_BL_IDS) do
    settings[str__Mister..bl_id..'Pos'..str__TempSetPoint] = "100"
    settings[str__Mister..bl_id..'Neg'..str__TempSetPoint] = "95"
    settings[str__Biofilter..bl_id..str__ProbeAPointID] = "0"
  end
  return settings
end

function blowerLogValues(log_values,zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BLOWER_GROUP_ZONE_IDS[blower]) do
        if zone == zn_id then
            if string.sub(blower,1,1) == 'P' then
              logInsert(log_values,io[str__blower..blower..str__revdamper] * 10)
              logInsert(log_values,reg[str__blower..blower..str__value])
              logInsert(log_values,reg[str__biofilter..blower..str__avgtemp])
              logInsert(log_values,reg[str__exhaust..blower..str__avgtemp])
            else
              logInsert(log_values,10)
              logInsert(log_values,reg[str__blower..blower..str__value])
              logInsert(log_values,0)
              logInsert(log_values,0)
            end
        end
    end
  end
end

function zoneLogValues(zn_id,probe_ids)
  local log_values,valid_temps = {},false
  for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,probe_ids)) do
    if reg[temp_prefix..str__avgtemp] > 0 then
      valid_temps = true
    end
    logInsert(log_values,reg[temp_prefix..str__avgtemp])
  end
  logInsert(log_values,reg[str__zone..zn_id..str__avgdamper])
  logInsert(log_values,reg[str__zone..zn_id..str__regime])
  blowerLogValues(log_values,zn_id)
  logInsert(log_values,reg[str__zone..zn_id.."pfrptime"])
  local zone_is_capped = 'No'
  if reg[str__zone..zn_id..'capped'] == 1 then
    zone_is_capped = 'Yes'
  end
  logInsert(log_values,zone_is_capped)
  if valid_temps == true then
    resetAverage(str__zone..zn_id..str__avgdamper)
    return log_values
  else
    return nil
  end
end

function updateLastValidTemps()
  local wireless_data = retrieveWirelessSensorDataTCP()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,probe_id in ipairs(ZONE_PROBE_IDS) do
      local settingName,
            regPrefix =
            str__Zone..zn_id..'Probe'..probe_id..'PointID',
            str__zone..zn_id..'p'..probe_id
      updateWirelessTemps(settingName,regPrefix,wireless_data)
    end
  end
  for i,bl_id in ipairs(P_BL_IDS) do
    updateLVTemp(str__exhaust..bl_id)
    updateLVTemp(str__premister..bl_id)
    local settingName,
          regPrefix =
          str__Biofilter..bl_id..str__ProbeAPointID,
          str__biofilter..bl_id..'pA'
    updateWirelessTemps(settingName,regPrefix,wireless_data)
  end
end

function updateTempAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix,reg[temp_prefix..str__lvtemp])
    end
  end
  for i,bl_id in ipairs(P_BL_IDS) do
    updateTempAverage(str__exhaust..bl_id,reg[str__exhaust..bl_id..str__lvtemp])
    updateTempAverage(str__biofilter..bl_id,tempAverageForBiofilters({bl_id},BIOFILTER_PROBE_IDS))
  end
end

function updateBlowers()
  for i,bl_id in ipairs(P_BL_IDS) do
    local biofilter_temp_avg,
    load_zone_active =
    tempAverageForBiofilters({bl_id},BIOFILTER_PROBE_IDS),
    false

    for i,zn_id in ipairs(BLOWER_GROUP_ZONE_IDS[bl_id]) do
      load_zone_active = revLoadZoneActive(zn_id,bl_id,load_zone_active)
    end
    revLogic(
      bl_id,
      zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id]),
      tempAvgForZones(BLOWER_GROUP_ZONE_IDS[bl_id],{'A'}),
      tempAvgForZones(BLOWER_GROUP_ZONE_IDS[bl_id],{'B'}),
      biofilter_temp_avg,
      SETTINGS[str__BiofilterForcePositiveTemperature],
      tonumber(SETTINGS["PrimaryPadNegDirection"..str__TempSetPoint]),
      tonumber(SETTINGS["PrimaryPadPosDirection"..str__TempSetPoint])
    )
    revLoadZoneSetMaxBlwrSpeed(bl_id,load_zone_active,SETTINGS["PrimaryMaxVFDSpeed"])
    if reg[str__blower..bl_id..str__idletimer] == 0 then
      updateDuctPressureSetpoint(bl_id,BLOWER_GROUP_ZONE_IDS[bl_id],ZONE_PROBE_IDS,true)
    end
    blowerPressureControl(
      _G[str__BLOWER_..bl_id],
      str__blower..bl_id,
      reg[str__duct..bl_id..str__pressureavg],
      reg[str__duct..bl_id..str__pressuresp],
      zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id]),
      SETTINGS["PrimaryMinVFDSpeed"],
      SETTINGS["PrimaryMaxVFDSpeed"]
    )
    updateMisters(P_BL_IDS,BIOFILTER_PROBE_IDS)
  end
  for i,bl_id in ipairs(S_BL_IDS) do
    updateDuctPressureSetpoint(bl_id,BLOWER_GROUP_ZONE_IDS[bl_id],ZONE_PROBE_IDS)
    blowerPressureControl(
      _G[str__BLOWER_..bl_id],
      str__blower..bl_id,
      reg[str__duct..bl_id..str__pressureavg],
      reg[str__duct..bl_id..str__pressuresp],
      zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id]),
      SETTINGS["SecondaryMinVFDSpeed"],
      SETTINGS["SecondaryMaxVFDSpeed"]
    )
  end
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS[str__Blower.."Rate"])
  for i,blwr_id in ipairs(P_BL_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit,true)
  end
  for i,blwr_id in ipairs(S_BL_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit,false)
  end
end

function updateDampers()
  for i,zn_id in ipairs(ZONE_IDS) do
    local dmpr_id,
          zones,
          avg_sp,
          zone_control =
          ZN_DMPR_IDS[zn_id],
          {zn_id},
          0,
          reg[str__zone..zn_id..str__control]

    for i,zone in ipairs(zones) do
      avg_sp = avg_sp + spForZone(zone)
      if reg[str__zone..zone..str__control] == 1 then
        zone_control = 1
      end
    end
    avg_sp = avg_sp / #zones
    local ctrl_tmp,
          DAMPER =
          tempAvgForZones(zones,ZONE_PROBE_IDS),
          _G[str__DAMPER_..dmpr_id]
    if reg['zone'..zn_id..'regime'] == 2 then
      ctrl_tmp = minTempForZones({zn_id},ZONE_PROBE_IDS)
    end
    if reg[str__damper..dmpr_id..'override'] == 1 then
      DAMPER[str__control] = reg[str__damper..dmpr_id..str__value]
    elseif zone_control == 1 then
      if ctrl_tmp > 0 then
        updateDamperPIDValues(DAMPER,ctrl_tmp,avg_sp)
      end
    else
      DAMPER[str__control] = 0
    end
    io[str__damper..dmpr_id..'position'] = DAMPER[str__control]
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
    wirelessSensorAgeAlarm(_G[str__ZONE_..zn_id], str__zone, zn_id, ZONE_PROBE_IDS)
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    blowerFaultAlarm(_G[str__BLOWER_..bl_id],bl_id,str__Blower..' '..bl_id)
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
