local str__BLOWER_,
str__Blower,
str__blower,
str__duct,
str__Pressure,
str__PosDirPressure,
str__NegDirPressure,
str__pressure,
str__pressuresp,
str__pospressuresp,
str__negpressuresp,
str__pospressure,
str__negpressure,
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
str__Mister,
str__mister,
str__idletimer,
str__revdamper,
str__exhaust,
str__premister,
str__lvtemp,
str__avgtemp,
str__ProbeAPointID,
str__ProbeBPointID,
str__ProbeCPointID,
str__ProbeDPointID,
str__TempSetPoint,
str__mistertimer,
str__misteroverride,
str__Biofilter,
str__biofilter,
str__override =
'BLOWER_',
'Blower',
'blower',
'duct',
'Pressure',
'PosDirPressure',
'NegDirPressure',
'pressure',
'pressuresp',
'pospressuresp',
'negpressuresp',
"pospressure",
"negpressure",
"pospressureavg",
"negpressureavg",
'control',
'direction',
'DAMPER_',
'Damper',
'damper',
'avgdamper',
'ZONE_',
'Zone',
'zone',
'Mister',
'mister',
'idletimer',
'revdamper',
'exhaust',
'premister',
'lvtemp',
'avgtemp',
'ProbeAPointID',
'ProbeBPointID',
'ProbeCPointID',
'ProbeDPointID',
'TempSetPoint',
'mistertimer',
'misteroverride',
'Biofilter',
'biofilter',
'override'

PFRP_TEMP = 55
PFRP_AGGREGATE = "min"
COUNT_PFRP_IN_WARMUP_ZONE = true
BLOWER_CYCLE_IDLE_TIME = 3
BLOWER_IDS = {'01'}
ZONE_IDS = {'01','02','03','04','05'}
ZONE_LABELS = {
  ['01']='P1',['02']='P2',['03']='P3',['04']='P4',['05']='S1'
}
BLOWER_GROUP_ZONE_IDS = {
  ['01']=ZONE_IDS
}
ZONE_PROBE_IDS = {'A','B','C','D'}
DAMPER_IDS = {'P1A','P1B','P2A','P2B','P3A','P3B','P4A','P4B','S1A','S1B'}
DAMPER_ZONE = {
  ['P1A']='01',['P1B']='01',['P2A']='02',['P2B']='02',['P3A']='03',['P3B']='03',
  ['P4A']='04',['P4B']='04',['S1A']='05',['S1B']='05'
}
DAMPER_BLOWER = {
  ['P1A']='01',['P1B']='01',['P2A']='01',['P2B']='01',['P3A']='01',['P3B']='01',
  ['P4A']='01',['P4B']='01',['S1A']='01',['S1B']='01'
}
ZONE_LOG_COLUMNS = {'Temperature A','Temperature B','Temperature C','Temperature D','Damper','Regime','Aeration Direction','Blower Speed','Biofilter Temperature A','Biofilter Temperature B','Exhaust Temperature','PFRP Time'}
for i,zn_id in ipairs(ZONE_IDS) do
  WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeAPointID] = 0
  WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeBPointID] = 0
  WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeCPointID] = 0
  WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeDPointID] = 0
end
for i,bl_id in ipairs(BLOWER_IDS) do
  WIRELESS_POINT_FAILURES[str__Biofilter..bl_id..str__ProbeAPointID] = 0
  WIRELESS_POINT_FAILURES[str__Biofilter..bl_id..str__ProbeBPointID] = 0
  WIRELESS_POINT_FAILURES[str__Biofilter..bl_id..str__ProbeCPointID] = 0
  WIRELESS_POINT_FAILURES[str__Biofilter..bl_id..str__ProbeDPointID] = 0
end

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = '192.168.1.200'
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "EDAMA"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings[str__PosDirPressure.."Setpoint".."Min"] = "4"
  settings[str__PosDirPressure.."Setpoint".."Max"] = "8"
  settings[str__NegDirPressure.."Setpoint".."Min"] = "10"
  settings[str__NegDirPressure.."Setpoint".."Max"] = "14"
  settings[str__Pressure.."Setpoint".."HotZoneTrigger"] = "50"
  settings[str__Pressure.."Setpoint".."ColdZoneTrigger"] = "50"
  settings[str__Pressure.."Setpoint".."ChangeTimer"] = "5"
  settings[str__Pressure.."Setpoint".."ChangeInterval"] = "2"
  settings[str__Blower.."Gain"] = "1"
  settings[str__Blower.."Integral"] = "1.5"
  settings[str__Blower.."Derivative"] = "0"
  settings[str__Blower.."DerivativeTime"] = "2"
  settings[str__Blower.."Rate"] = "2"
  settings["BlowerCyclePositiveTime"] = "30"
  settings["BlowerCycleNegativeTime"] = "30"
  settings[str__Damper.."Gain"] = "1"
  settings[str__Damper.."Integral"] = "1"
  settings[str__Damper.."Derivative"] = "0.3"
  settings[str__Damper.."DerivativeTime"] = "10"
  settings[str__Damper.."Rate"] = "10"
  settings["Min"..str__Damper.."Value"] = "6"
  settings["Regime1TempSetPoint"] = "45"
  settings["Regime2TempSetPoint"] = "65"
  settings["Regime3TempSetPoint"] = "50"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "10"
  settings["WirelessSensorAgeAlarm"] = "10"
  settings["BiofilterForcePositiveTemperature"] = "75"
  settings[str__Mister.."OnTime"] = "10"
  settings[str__Mister.."OffTime"] = "30"
  settings["GraphReferenceTemp"] = "55"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  for i,zn_id in ipairs(ZONE_IDS) do
    settings[str__Zone..zn_id.."RegimeType"] = "warmup"
    settings[str__Zone..zn_id..str__ProbeAPointID] = "0"
    settings[str__Zone..zn_id..str__ProbeBPointID] = "0"
    settings[str__Zone..zn_id..str__ProbeCPointID] = "0"
    settings[str__Zone..zn_id..str__ProbeDPointID] = "0"
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    settings[str__Blower..bl_id..'PosDirection'..str__TempSetPoint] = "60"
    settings[str__Blower..bl_id..'NegDirection'..str__TempSetPoint] = "50"
    settings[str__Mister..bl_id..'Pos'..str__TempSetPoint] = "80"
    settings[str__Mister..bl_id..'Neg'..str__TempSetPoint] = "80"
    settings[str__Biofilter..bl_id..str__ProbeAPointID] = "0"
    settings[str__Biofilter..bl_id..str__ProbeBPointID] = "0"
    settings[str__Biofilter..bl_id..str__ProbeCPointID] = "0"
    settings[str__Biofilter..bl_id..str__ProbeDPointID] = "0"
  end
  return settings
end

function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(bl_id)
  end
  for i,zn_id in ipairs(ZONE_IDS) do
    -- init zone values
    initZone(zn_id)
  end
  for i,damper_id in ipairs(DAMPER_IDS) do
    -- init damper values
    initDamper(damper_id)
  end
end

function blowerLogValues(log_values,zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BLOWER_GROUP_ZONE_IDS[blower]) do
        if zone == zn_id then
          logInsert(log_values,reg[str__blower..blower..str__revdamper] * 10)
          logInsert(log_values,io[str__blower..blower.."speed"])
          local bio_pref = str__biofilter..blower
          local bio_temp_A,
                bio_temp_B =
                (reg[bio_pref..'pA'..str__avgtemp] + reg[bio_pref..'pB'..str__avgtemp]) / 2,
                (reg[bio_pref..'pC'..str__avgtemp] + reg[bio_pref..'pD'..str__avgtemp]) / 2
          logInsert(log_values,bio_temp_A)
          logInsert(log_values,bio_temp_B)
          logInsert(log_values,reg[str__exhaust..blower..str__avgtemp])
        end
    end
  end
end

function zoneLogValues(zn_id,probe_ids)
  local log_values,
        valid_temps =
        {},
        false
  for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,probe_ids)) do
    if reg[temp_prefix..str__avgtemp] > 0 then
      valid_temps = true
    end
    logInsert(log_values,reg[temp_prefix..str__avgtemp])
  end
  logInsert(log_values,reg[str__zone..zn_id..str__avgdamper])
  logInsert(log_values,reg[str__zone..zn_id.."regime"])
  blowerLogValues(log_values,zn_id)
  logInsert(log_values,reg[str__zone..zn_id.."pfrptime"])
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
      if SETTINGS[settingName] ~= nil then
        updateWirelessTemps(settingName,regPrefix,wireless_data)
      end
    end
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    updateLVTemp(str__exhaust..bl_id)
    updateLVTemp(str__premister..bl_id)
    for n,probe_id in ipairs(ZONE_PROBE_IDS) do
      local settingName = str__Biofilter..bl_id..'Probe'..probe_id..'PointID'
      local regPrefix = str__biofilter..bl_id..'p'..probe_id
      if SETTINGS[settingName] ~= nil then
        updateWirelessTemps(settingName,regPrefix,wireless_data)
      end
    end
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
    for n,temp_prefix in ipairs(getTempPrefixes(str__biofilter,bl_id,ZONE_PROBE_IDS)) do
      updateTempAverage(temp_prefix,reg[temp_prefix..str__lvtemp])
    end
  end
end

function updateDamperAverages()
  for i,dmpr_id in ipairs(DAMPER_IDS) do
    local active_dampers = 'A'
    local bl_id = DAMPER_BLOWER[dmpr_id]
    local rev_damper = reg[str__blower..bl_id..str__revdamper]
    if rev_damper == 1 then
      active_dampers = 'B'
    end
    if string.sub(dmpr_id,3,3) == active_dampers then
      updateDamperAverage(DAMPER_ZONE[dmpr_id],dmpr_id)
    end
  end
end

function updateAverages()
  updateTempAverages()
  updateDamperAverages()
end

function spForZone(zn_id)
  local regime = reg[str__zone..zn_id.."regime"]
  if regime < 2 then
    return SETTINGS["Regime".."1".."TempSetPoint"]
  else
    return SETTINGS["Regime"..regime.."TempSetPoint"]
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

function copyDamperValues(bl_dir,from,to)
  for i,dmpr_id in ipairs(DAMPER_IDS) do
    local damper_pref = str__damper..string.sub(dmpr_id,1,2)
    reg[damper_pref..to..str__override] = reg[damper_pref..from..str__override]
    reg[damper_pref..to..'value'] = reg[damper_pref..from..'value']
  end
end

function updateBlowers()
  for i,bl_id in ipairs(BLOWER_IDS) do
    local load_zone_active,
          zones_online,
          top_avg,
          btm_avg,
          biofilters_temp_avg,
          top_sp,
          btm_sp
          =
          false,
          zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id]),
          tempAvgForZones(BLOWER_GROUP_ZONE_IDS[bl_id],{'A','C'}),
          tempAvgForZones(BLOWER_GROUP_ZONE_IDS[bl_id],{'B','D'}),
          tempAverageForBiofilters({bl_id},ZONE_PROBE_IDS),
          tonumber(SETTINGS[str__Blower..bl_id..'NegDirection'..str__TempSetPoint]),
          tonumber(SETTINGS[str__Blower..bl_id..'PosDirection'..str__TempSetPoint])

    for i,zn_id in ipairs(BLOWER_GROUP_ZONE_IDS[bl_id]) do
      load_zone_active = revLoadZoneActive(zn_id,bl_id,load_zone_active)
    end
    revLogic(
      bl_id,
      zones_online,
      top_avg,
      btm_avg,
      biofilters_temp_avg,
      SETTINGS["BiofilterForcePositiveTemperature"],
      top_sp,
      btm_sp
    )
    revLoadZoneSetMaxBlwrSpeed(bl_id,load_zone_active,SETTINGS["MaxVFDSpeed"])
    if reg[str__blower..bl_id..str__idletimer] == 0 then
      local control_temp_aggregate = nil
      for i,zn_id in ipairs(BLOWER_GROUP_ZONE_IDS[bl_id]) do
        if reg[str__zone..zn_id.."regime"] == 2 then
          control_temp_aggregate = 'min'
        end
      end
      updateDuctPressureSetpoint(bl_id,BLOWER_GROUP_ZONE_IDS[bl_id],ZONE_PROBE_IDS,true,control_temp_aggregate)
    end
    A_DamperPressureControl(
      _G[str__BLOWER_..bl_id],
      str__blower..bl_id,
      reg[str__duct..bl_id.."pressureavg"],
      reg[str__duct..bl_id..str__pressuresp],
      zonesOnline(BLOWER_GROUP_ZONE_IDS[bl_id]),
      SETTINGS["MinVFDSpeed"],
      SETTINGS["MaxVFDSpeed"]
    )
  end
  updateMisters(ZONE_PROBE_IDS)
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS[str__Blower.."Rate"])
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit,true)
  end
end

function updateDampers()
  local active_dampers = 'A'
  for i,dmpr_id in ipairs(DAMPER_IDS) do
    local zn_id = DAMPER_ZONE[dmpr_id]
    local bl_id = DAMPER_BLOWER[dmpr_id]
    local bl_dir = reg[str__blower..bl_id..str__direction]
    local rev_damper = reg[str__blower..bl_id..str__revdamper]
    local control_temp = tempAvgForZones({zn_id},ZONE_PROBE_IDS)
    if reg[str__zone..zn_id.."regime"] == 2 then
      control_temp = minTempForZones({zn_id},ZONE_PROBE_IDS)
    end
    if rev_damper == 1 then
      active_dampers = 'B'
    end
    if rev_damper == bl_dir then
      if rev_damper == 1 then
        io[str__duct..bl_id..'inletdamper'] = 100
        io[str__exhaust..bl_id..str__damper] = 0
      else
        io[str__duct..bl_id..'inletdamper'] = 0
        io[str__exhaust..bl_id..str__damper] = 100
      end
    end
    if string.sub(dmpr_id,3,3) == active_dampers then
      damperControl(_G[str__DAMPER_..dmpr_id],dmpr_id,control_temp,spForZone(zn_id),zn_id)
    else
      if rev_damper == bl_dir then
        _G[str__DAMPER_..dmpr_id]['control'] = 0
        reg[str__damper..dmpr_id..'value'] = 0
        io[str__damper..dmpr_id..'position'] = 0
      end
    end
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
    blowerFaultAlarm(_G[str__BLOWER_..bl_id],bl_id,'Blower '..bl_id)
    wirelessSensorAgeAlarm(_G[str__BLOWER_..bl_id],str__premister,bl_id,{''})
    wirelessSensorAgeAlarm(_G[str__BLOWER_..bl_id],str__exhaust,bl_id,{''})
    wirelessSensorAgeAlarm(_G[str__BLOWER_..bl_id],str__biofilter,bl_id,ZONE_PROBE_IDS)
  end
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(1000)
    updateDuctPressureAverages()
  end
end
