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
str__misteroverride =
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
'misteroverride'

function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PFRP_TEMP = 131
  PFRP_AGGREGATE = "min"
  INCLUDE_INVALID_TEMPS = true
  BLOWER_IDS = uid(2)
  BL_GRP_ZN_IDS = {}
  BL_GRP_ZN_IDS['01'] = uid(2)
  BL_GRP_ZN_IDS['02'] = uid(3,4)
  BLOWER_LABELS = {
    ['01']='P1',['02']='P2'
  }
  ZONE_BLOWER_IDS = {}
  ZONE_BLOWER_IDS['01'] = '01'
  ZONE_BLOWER_IDS['02'] = '01'
  ZONE_BLOWER_IDS['03'] = '02'
  ZONE_BLOWER_IDS['04'] = '02'
  ZONE_LABELS = {
    ['01']='P1A',['02']='P1B',['03']='P2A',['04']='P2B'
  }
  ZONE_IDS = uid(4)
  ZONE_PROBE_IDS = {'A','B','C','D'}
  ZONE_LOG_COLUMNS = {'Temperature A','Temperature B','Temperature C','Temperature D','Damper','Regime','Aeration Direction','Blower Speed','Biofilter Temperature','Exhaust Temperature','PFRP Time','Capped'}
  REGIME_LABELS = {'Warm Up', 'PFRP', 'VAR'}
  for i,zn_id in ipairs(ZONE_IDS) do
    WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeAPointID] = 0
    WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeBPointID] = 0
    if string.sub(ZONE_LABELS[zn_id],1,2) == 'P2' then
      WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeCPointID] = 0
      WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__ProbeDPointID] = 0
    end
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(bl_id)
  end
  for i,zn_id in ipairs(ZONE_IDS) do
    -- init zone & damper values
    initZone(zn_id)
    initDamper(zn_id)
  end
end

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = '192.168.1.55'
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "OSTROM ORGANICS"
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
  settings[str__Damper.."Gain"] = "1"
  settings[str__Damper.."Integral"] = "1"
  settings[str__Damper.."Derivative"] = "0.3"
  settings[str__Damper.."DerivativeTime"] = "10"
  settings[str__Damper.."Rate"] = "10"
  settings["Min"..str__Damper.."Value"] = "6"
  settings["Regime1TempSetPoint"] = "100"
  settings["Regime2TempSetPoint"] = "100"
  settings["Regime3TempSetPoint"] = "100"
  settings["MaxTemperatureAlarm"] = "176"
  settings["MinTemperatureAlarm"] = "32"
  settings["WirelessSensorAgeAlarm"] = "10"
  settings["BiofilterForcePositiveTemperature"] = "180"
  settings[str__Mister.."OnTime"] = "10"
  settings[str__Mister.."OffTime"] = "30"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  for i,zn_id in ipairs(ZONE_IDS) do
    settings[str__Zone..zn_id.."RegimeType"] = "warmup"
    settings[str__Zone..zn_id..str__ProbeAPointID] = "0"
    settings[str__Zone..zn_id..str__ProbeBPointID] = "0"
    if string.sub(ZONE_LABELS[zn_id],1,2) == 'P2' then
      settings[str__Zone..zn_id..str__ProbeCPointID] = "0"
      settings[str__Zone..zn_id..str__ProbeDPointID] = "0"
    end
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    settings[str__Blower..bl_id..'PosDirection'..str__TempSetPoint] = "100"
    settings[str__Blower..bl_id..'NegDirection'..str__TempSetPoint] = "100"
    settings[str__Mister..bl_id..'Pos'..str__TempSetPoint] = "100"
    settings[str__Mister..bl_id..'NegHigh'..str__TempSetPoint] = "104"
    settings[str__Mister..bl_id..'NegLow'..str__TempSetPoint] = "95"
  end
  return settings
end

function blowerLogValues(log_values,zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BL_GRP_ZN_IDS[blower]) do
        if zone == zn_id then
          logInsert(log_values,io[str__blower..blower..str__revdamper] * 10)
          logInsert(log_values,io[str__blower..blower.."speed"])
          logInsert(log_values,reg['biofilter'..blower..str__avgtemp])
          logInsert(log_values,reg[str__exhaust..blower..str__avgtemp])
        end
    end
  end
end

function zoneLogValues(zn_id,probe_ids)
  probe_ids = ZONE_PROBE_IDS
  local log_values = {}
  local valid_temps = false
  for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,probe_ids)) do
    if reg[temp_prefix..str__avgtemp] > 0 then
      valid_temps = true
    end
    logInsert(log_values,reg[temp_prefix..str__avgtemp])
  end
  logInsert(log_values,reg[str__zone..zn_id..str__avgdamper])
  logInsert(log_values,REGIME_LABELS[reg[str__zone..zn_id.."regime"]])
  blowerLogValues(log_values,zn_id)
  logInsert(log_values,reg[str__zone..zn_id.."pfrptime"])
  local zone_is_capped = 'No'
  if reg[str__zone..zn_id..'capped'] == 1 then
    zone_is_capped = 'Yes'
  end
  logInsert(log_values,zone_is_capped)
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
  end
end

function updateTempAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    if string.sub(ZONE_LABELS[zn_id],1,2) == 'P2' then
      probe_ids = ZONE_PROBE_IDS
    else
      probe_ids = {'A','B'}
    end
    for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,probe_ids)) do
      updateTempAverage(temp_prefix,reg[temp_prefix..str__lvtemp])
    end
  end
  for i,bl_id in ipairs(BLOWER_IDS) do
    updateTempAverage(str__exhaust..bl_id..str__lvtemp)
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
  if reg[str__zone..zn_id.."regime"] == 3 then
    return SETTINGS["Regime"..'3'..str__TempSetPoint]
  elseif reg[str__zone..zn_id.."regime"] == 2 then
    return SETTINGS["Regime"..'2'..str__TempSetPoint]
  else
    return SETTINGS["Regime"..'1'..str__TempSetPoint]
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
    -- force direction to always be positive
    reg[str__blower..bl_id..str__direction] = 1
    io[str__blower..bl_id..str__revdamper] = 1
    if reg[str__blower..bl_id..str__idletimer] == 0 then
      -- treat like positive only system
      local control_temp_aggregate = nil
      for i,zn_id in ipairs(BL_GRP_ZN_IDS[bl_id]) do
        if reg[str__zone..zn_id.."regime"] == 2 then
          control_temp_aggregate = 'min'
        end
      end
      updateDuctPressureSetpoint(bl_id,BL_GRP_ZN_IDS[bl_id],ZONE_PROBE_IDS,true,control_temp_aggregate)
    end
    blowerPressureControl(
      _G[str__BLOWER_..bl_id],
      str__blower..bl_id,
      reg[str__duct..bl_id.."pressureavg"],
      reg[str__duct..bl_id..str__pressuresp],
      zonesOnline(BL_GRP_ZN_IDS[bl_id]),
      SETTINGS["MinVFDSpeed"],
      SETTINGS["MaxVFDSpeed"]
    )
  end
  updateMisters()
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS[str__Blower.."Rate"])
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit,true)
  end
end

function updateMisters()
  for i,bl_id in ipairs(BLOWER_IDS) do
    local timer = reg[str__duct..bl_id..str__mistertimer]
    local ontime = tonumber(SETTINGS[str__Mister.."OnTime"]) * 60
    local offtime = tonumber(SETTINGS[str__Mister.."OffTime"]) * 60
    if io[str__blower..bl_id..'run'] == 1 and reg[str__blower..bl_id..str__idletimer] == 0 then
      if reg[str__blower..bl_id..str__direction] == 1 then
        if reg[str__duct..bl_id..str__misteroverride] == 1 then
          if reg[str__duct..bl_id..str__mister.."control"] == 1 then
            if timer == 0 then
              reg[str__duct..bl_id..str__mistertimer] = ontime + offtime
              io[str__duct..bl_id..str__mister] = 1
            elseif timer <= offtime then
              io[str__duct..bl_id..str__mister] = 0
            else
              io[str__duct..bl_id..str__mister] = 1
            end
          else
            reg[str__duct..bl_id..str__mistertimer] = 0
            io[str__duct..bl_id..str__mister] = 0
          end
        elseif reg[str__premister..bl_id..str__lvtemp] >= tonumber(SETTINGS[str__Mister..bl_id..'Pos'..str__TempSetPoint]) then
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
        io[str__duct..bl_id..str__mister] = 0
      end
    else
      io[str__duct..bl_id..str__mister] = 0
    end
  end
end

function updateDampers()
  for i,zn_id in ipairs(ZONE_IDS) do
    local dmpr_id = zn_id
    local control_temp = tempAvgForZones({zn_id},ZONE_PROBE_IDS)
    if reg[str__zone..zn_id.."regime"] == 2 then
      control_temp = minTempForZones({zn_id},ZONE_PROBE_IDS)
    end
    damperControl(_G[str__DAMPER_..dmpr_id],dmpr_id,control_temp,spForZone(zn_id))
  end
end

function updateZones()
  for i,zn_id in ipairs(ZONE_IDS) do
    if string.sub(ZONE_LABELS[zn_id],1,2) == 'P2' then
      probe_ids = ZONE_PROBE_IDS
    else
      probe_ids = {'A','B'}
    end
    updateZone(_G[str__ZONE_..zn_id],zn_id,probe_ids)
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
  end
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(1000)
    updateDuctPressureAverages()
  end
end
