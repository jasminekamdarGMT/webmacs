local str__Blower,
str__blower,
str__Biofilter,
str__biofilter,
str__BiofilterForcePositiveTemperature,
str__Damper,
str__lvtemp,
str__PointID,
str__PosDirPressureSetpoint,
str__NegDirPressureSetpoint,
str__PressureSetpoint,
str__pressuresp,
str__Probe,
str__pump,
str__speed,
str__Temperature,
str__Zone,
str__zone =
'Blower',
'blower',
'Biofilter',
'biofilter',
'BiofilterForcePositiveTemperature',
'Damper',
'lvtemp',
'PointID',
'PosDirPressureSetpoint',
'NegDirPressureSetpoint',
'PressureSetpoint',
'pressuresp',
'Probe',
'pump',
'speed',
'Temperature',
'Zone',
'zone'

PFRP_TEMP = 131
PFRP_AGGREGATE = "min"
BLOWER_IDS = {"01","02"}
BLWR_GRP_ZONE_IDS = {}
BLWR_GRP_ZONE_IDS["01"] = {"01","02"}
BLWR_GRP_ZONE_IDS["02"] = {"03","04","05","06"}
ZONE_IDS = {"01","02","03","04","05","06"}
ZONE_PROBE_IDS = {"A","B","C","D"}
ZONE_PROBE_TABLE = {
  ["01"]={"A","B"},["02"]=ZONE_PROBE_IDS,
  ["03"]={"A","B"},["04"]={"A","B"},
  ["05"]={"A","B"},["06"]=ZONE_PROBE_IDS,
}
ZONE_LOG_COLUMNS = {str__Temperature.." A",str__Temperature.." B",str__Temperature.." C",str__Temperature.." D",str__Damper,"Regime","Aeration Direction",str__Blower.." Speed",str__Biofilter.." "..str__Temperature,"Exhaust "..str__Temperature,"PFRP Time"}
REGIME_LABELS = {"Warm Up", "PFRP", "VAR"}
for i,zn_id in ipairs(ZONE_IDS) do
  for i, probe_id in ipairs(ZONE_PROBE_TABLE[zn_id]) do
    WIRELESS_POINT_FAILURES[str__Zone..zn_id..str__Probe..probe_id..str__PointID] = 0
  end
end
for i,blwr_id in ipairs(BLOWER_IDS) do
  WIRELESS_POINT_FAILURES[str__Biofilter..blwr_id..str__Probe..str__PointID] = 0
end

function defaultSettings()
  local settings = {}
  settings["WirelessBaseStationIP"] = "192.168.1.55"
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "DIRT HUGGER"
  settings[str__Blower.."Gain"] = "1"
  settings[str__Blower.."Integral"] = "1.5"
  settings[str__Blower.."Derivative"] = "0"
  settings[str__Blower.."DerivativeTime"] = "2"
  settings[str__Blower.."Rate"] = "2"
  settings[str__Damper.."Gain"] = "0.5"
  settings[str__Damper.."Integral"] = "1"
  settings[str__Damper.."Derivative"] = "0.75"
  settings[str__Damper.."DerivativeTime"] = "10"
  settings[str__Damper.."Rate"] = "90"
  settings["Max"..str__Temperature.."Alarm"] = "80"
  settings["Min"..str__Temperature.."Alarm"] = "0"
  settings["WirelessSensorAgeAlarm"] = "10"
  settings["WirelessTempsPollInterval"] = "5"
  settings["GraphReferenceTemp"] = "131"
  settings["GraphReferenceTempLabel"] = "Reference Temp"
  settings["WirelessTempsPollInterval"] = "5"
  for i,zn_id in ipairs(ZONE_IDS) do
    settings[str__Zone..zn_id.."TempSetPoint"] = "131"
    settings[str__Zone..zn_id.."RegimeType"] = "warmup"
    settings[str__Zone..zn_id.."MinDamperValue"] = "6"
    for i, probe_id in ipairs(ZONE_PROBE_TABLE[zn_id]) do
      settings[str__Zone..zn_id..str__Probe..probe_id..str__PointID] = "0"
    end
  end
  for i,blwr_id in ipairs(BLOWER_IDS) do
    settings[str__Biofilter..blwr_id..str__Probe..str__PointID] = "0"
    settings[str__Biofilter..blwr_id.."MisterTimer"] = "30"
    settings[str__Blower..blwr_id.."MinVFDSpeed"] = "25"
    settings[str__Blower..blwr_id.."MaxVFDSpeed"] = "100"
    settings[str__Blower..blwr_id..str__PosDirPressureSetpoint.."Min"] = "4"
    settings[str__Blower..blwr_id..str__PosDirPressureSetpoint.."Max"] = "8"
    settings[str__Blower..blwr_id..str__NegDirPressureSetpoint.."Min"] = "8"
    settings[str__Blower..blwr_id..str__NegDirPressureSetpoint.."Max"] = "14"
    settings[str__Blower..blwr_id..str__PressureSetpoint.."HotZoneTrigger"] = "50"
    settings[str__Blower..blwr_id..str__PressureSetpoint.."ColdZoneTrigger"] = "50"
    settings[str__Blower..blwr_id..str__PressureSetpoint.."ChangeTimer"] = "5"
    settings[str__Blower..blwr_id..str__PressureSetpoint.."ChangeInterval"] = "2"
    settings[str__Blower..blwr_id..str__Blower.."CycleNegativeTime"] = "40"
    settings[str__Blower..blwr_id..str__Blower.."CyclePositiveTime"] = "40"
    settings[str__Blower..blwr_id..str__BiofilterForcePositiveTemperature] = "80"
  end
  return settings
end

function initValues()
  if not luatest_running then
    webmacs_db_path = ""
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
            logInsert(log_values,reg[str__blower..blower.."direction"] * 10)
            logInsert(log_values,reg[str__blower..blower.."value"])
            logInsert(log_values,reg[str__biofilter..blower.."avgtemp"])
            logInsert(log_values,reg["exhaust"..blower.."avgtemp"])
        end
    end
  end
end

function zoneLogValues(zn_id,probe_ids)
  local log_values = {}
  local valid_temps = false
  for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,probe_ids)) do
    local avg_temp = reg[temp_prefix.."avgtemp"]
    if avg_temp == nil then
      avg_temp = 0
    end
    if avg_temp > 0 then
      valid_temps = true
    end
    logInsert(log_values,avg_temp)
  end
  logInsert(log_values,reg[str__zone..zn_id.."avgdamper"])
  logInsert(log_values,REGIME_LABELS[reg[str__zone..zn_id.."regime"]])
  blowerLogValues(log_values,zn_id)
  logInsert(log_values,reg[str__zone..zn_id.."pfrptime"])
  if valid_temps == true then
    resetAverage(str__zone..zn_id.."avgdamper")
    return log_values
  else
    return nil
  end
end

function updatePumps()
  customPumpControl("01")
  customPumpControl("02")
  customPumpControl("03")
end

function updateLastValidTemps()
  local wireless_data = retrieveWirelessSensorDataTCP()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,probe_id in ipairs(ZONE_PROBE_TABLE[zn_id]) do
      local settingName = str__Zone..zn_id..str__Probe..probe_id..str__PointID
      local regPrefix = str__zone..zn_id.."p"..probe_id
      updateWirelessTemps(settingName,regPrefix,wireless_data)
    end
  end
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateLVTemp("exhaust"..blwr_id)
    settingName = str__Biofilter..blwr_id..str__Probe..str__PointID
    regPrefix = str__biofilter..blwr_id
    updateWirelessTemps(settingName,regPrefix,wireless_data)
  end
end

function updateTempAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,ZONE_PROBE_TABLE[zn_id])) do
      updateTempAverage(temp_prefix,reg[temp_prefix..str__lvtemp])
    end
  end
  for i,blwr_id in ipairs(BLOWER_IDS) do
    temp_prefix = "exhaust"..blwr_id
    updateTempAverage(temp_prefix,reg[temp_prefix..str__lvtemp])
    temp_prefix = str__biofilter..blwr_id
    updateTempAverage(temp_prefix,reg[temp_prefix..str__lvtemp])
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
  return SETTINGS[str__Zone..zn_id.."TempSetPoint"]
end

function zonesOnline(zn_ids)
  local online_count = 0
  for i,zn_id in ipairs(zn_ids) do
    if reg[str__zone..zn_id.."control"] == 1 then
      online_count = online_count + 1
    end
  end
  return online_count
end

function customPumpControl(pump_id)
  if reg[str__pump..pump_id..str__speed] == 1 then
    io[str__pump..pump_id..str__speed.."1"] = 1
    io[str__pump..pump_id..str__speed.."2"] = 0
  elseif reg[str__pump..pump_id..str__speed] == 2 then
    io[str__pump..pump_id..str__speed.."1"] = 0
    io[str__pump..pump_id..str__speed.."2"] = 1
  elseif reg[str__pump..pump_id..str__speed] == 3 then
    io[str__pump..pump_id..str__speed.."1"] = 1
    io[str__pump..pump_id..str__speed.."2"] = 1
  else
    io[str__pump..pump_id..str__speed.."1"] = 0
    io[str__pump..pump_id..str__speed.."2"] = 0
  end
end

function biofilterMisterControl(blwr_id)
  if io[str__blower..blwr_id.."revdamper"] == 1 and io[str__blower..blwr_id.."run"] == 1 then
    if reg[str__biofilter..blwr_id..str__lvtemp] > getNumericSetting(str__Blower..blwr_id..str__BiofilterForcePositiveTemperature) and reg[str__biofilter..blwr_id.."mistdelay"] == 0 then
      if io[str__biofilter..blwr_id.."mister"] == 0 then
        io[str__biofilter..blwr_id.."mister"] = 1
        reg[str__biofilter..blwr_id.."misttimer"] = getNumericSetting(str__Biofilter..blwr_id.."MisterTimer") * 60
      elseif reg[str__biofilter..blwr_id.."misttimer"] == 0 then
        io[str__biofilter..blwr_id.."mister"] = 0
        reg[str__biofilter..blwr_id.."mistdelay"] = 1
      end
    elseif reg[str__biofilter..blwr_id.."misttimer"] == 0 then
      io[str__biofilter..blwr_id.."mister"] = 0
    end
  else
    io[str__biofilter..blwr_id.."mister"] = 0
    reg[str__biofilter..blwr_id.."misttimer"] = 0
    reg[str__biofilter..blwr_id.."mistdelay"] = 0
  end
end

function updateDuctPressureSetpoint(blwr_id, zone_ids, probe_ids, is_reversing_system, control_temp_aggregate)
  local duct_pref = "duct"..blwr_id
  local timer = duct_pref.."presssptimer"
  if io[str__blower..blwr_id.."run"] == 1 then
    if tonumber(reg[timer]) == 0 then
      reg[timer] = SETTINGS[str__Blower..blwr_id..str__PressureSetpoint.."ChangeTimer"] * 60
      local hot_zones_count = 0
      local cold_zones_count = 0
      local setpoint_interval = tonumber(SETTINGS[str__Blower..blwr_id..str__PressureSetpoint.."ChangeInterval"])
      local setpoint_max,setpoint_min,pressure_sp_reg
      if is_reversing_system then
        if io[str__blower..blwr_id.."revdamper"] == 0 then
          setpoint_min = tonumber(SETTINGS[str__Blower..blwr_id..str__NegDirPressureSetpoint.."Min"])
          setpoint_max = tonumber(SETTINGS[str__Blower..blwr_id..str__NegDirPressureSetpoint.."Max"])
          pressure_sp_reg = duct_pref.."neg"..str__pressuresp
        else
          setpoint_min = tonumber(SETTINGS[str__Blower..blwr_id..str__PosDirPressureSetpoint.."Min"])
          setpoint_max = tonumber(SETTINGS[str__Blower..blwr_id..str__PosDirPressureSetpoint.."Max"])
          pressure_sp_reg = duct_pref.."pos"..str__pressuresp
        end
      else
        setpoint_max = tonumber(SETTINGS[str__Blower..blwr_id..str__PressureSetpoint.."Max"])
        setpoint_min = tonumber(SETTINGS[str__Blower..blwr_id..str__PressureSetpoint.."Min"])
        pressure_sp_reg = duct_pref..str__pressuresp
      end
      local curr_pressuresp = reg[pressure_sp_reg]
      for i,zn_id in ipairs(zone_ids) do
        if reg["loadzone"..zn_id.."active"] ~= 1 then
          local control_temp = tempAvgForZones({zn_id},probe_ids)
          if control_temp_aggregate ~= nil then
            if control_temp_aggregate == "min" then
              control_temp = minTempForZones({zn_id},probe_ids)
            elseif control_temp_aggregate == "max" then
              control_temp = maxTempForZones({zn_id},probe_ids)
            end
          end
          control_temp = tonumber(control_temp)
          local zone_setpoint = tonumber(spForZone(zn_id))
          if reg[str__zone..zn_id.."control"] == 1 then
            if control_temp > zone_setpoint then
              hot_zones_count = hot_zones_count + 1
            elseif control_temp > 0 and control_temp < zone_setpoint then
              cold_zones_count = cold_zones_count + 1
            end
          end
        end
      end
      local online_zones = zonesOnline(zone_ids)
      if hot_zones_count / online_zones * 100 >= tonumber(SETTINGS[str__Blower..blwr_id..str__PressureSetpoint.."HotZoneTrigger"]) then
        reg[duct_pref..str__pressuresp] = curr_pressuresp + setpoint_interval
      elseif cold_zones_count / online_zones * 100 >= tonumber(SETTINGS[str__Blower..blwr_id..str__PressureSetpoint.."ColdZoneTrigger"]) then
        reg[duct_pref..str__pressuresp] = curr_pressuresp - setpoint_interval
      end
      if reg[duct_pref..str__pressuresp] > setpoint_max then
        reg[duct_pref..str__pressuresp] = setpoint_max
      elseif reg[duct_pref..str__pressuresp] < setpoint_min then
        reg[duct_pref..str__pressuresp] = setpoint_min
      end
      reg[pressure_sp_reg] = reg[duct_pref..str__pressuresp]
    end
  end
end

function updateBlowers()
  for i,blwr_id in ipairs(BLOWER_IDS) do
    blowerDirectionControl(
      str__blower..blwr_id,reg[str__biofilter..blwr_id..str__lvtemp],
      SETTINGS[str__Blower..blwr_id..str__BiofilterForcePositiveTemperature],
      zonesOnline(BLWR_GRP_ZONE_IDS[blwr_id]),
      SETTINGS[str__Blower..blwr_id..str__Blower.."CycleNegativeTime"],
      SETTINGS[str__Blower..blwr_id..str__Blower.."CyclePositiveTime"]
    )
    if reg[str__blower..blwr_id.."idletimer"] == 0 then
      updateDuctPressureSetpoint(blwr_id, BLWR_GRP_ZONE_IDS[blwr_id], ZONE_PROBE_IDS, true)
      biofilterMisterControl(blwr_id)
    end
    blowerPressureControl(
      _G["BLOWER_"..blwr_id],
      str__blower..blwr_id,
      reg["duct"..blwr_id.."pressureavg"],
      reg["duct"..blwr_id..str__pressuresp],
      zonesOnline(BLWR_GRP_ZONE_IDS[blwr_id]),
      SETTINGS[str__Blower..blwr_id.."MinVFDSpeed"],
      SETTINGS[str__Blower..blwr_id.."MaxVFDSpeed"]
    )
  end
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS[str__Blower.."Rate"])
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit,true)
  end
end

function damperControl(DAMPER, damper_id, control_temp, set_point, zn_id)
  if zn_id == nil then
    zn_id = damper_id
  end
  local min_damper_value = tonumber(SETTINGS[str__Zone..zn_id.."MinDamperValue"])
  if reg["damper" .. damper_id .. "override"] == 1 then
    DAMPER["control"] = reg["damper" .. damper_id .. "value"]
  elseif reg[str__zone .. zn_id .. "control"] == 1 then
    if control_temp > 0 then
      updateDamperPIDValues(DAMPER, control_temp, set_point, min_damper_value)
    end
  else
    DAMPER["control"] = min_damper_value
  end
  io["damper" .. damper_id .. "position"] = DAMPER["control"]
end

function updateDampers()
  for i,zn_id in ipairs(ZONE_IDS) do
    local control_temp = tempAvgForZones({zn_id},ZONE_PROBE_TABLE[zn_id])
    if reg[str__zone..zn_id.."regime"] == 2 then
      control_temp = minTempForZones({zn_id},ZONE_PROBE_TABLE[zn_id])
    end
    damperControl(_G["DAMPER_"..zn_id],zn_id,control_temp,spForZone(zn_id))
  end
end

function updateZones()
  for i,zn_id in ipairs(ZONE_IDS) do
    updateZone(_G["ZONE_"..zn_id],zn_id,ZONE_PROBE_IDS)
  end
  updateAlarms()
end

function updateAlarms()
  for i,zn_id in ipairs(ZONE_IDS) do
    zoneTempAlarm(_G["ZONE_"..zn_id],zn_id,ZONE_PROBE_TABLE[zn_id])
    wirelessSensorAgeAlarm(_G["ZONE_"..zn_id], str__zone, zn_id, ZONE_PROBE_TABLE[zn_id])
  end

  for i,blwr_id in ipairs(BLOWER_IDS) do
    blowerFaultAlarm(_G["BLOWER_"..blwr_id],blwr_id,str__Blower.." "..tonumber(blwr_id))
    wirelessSensorAgeAlarm(_G["BLOWER_"..blwr_id],str__biofilter,blwr_id,{""})
  end
end

if not luatest_running then
  while init_complete ~= true do
    sleep(1000)
  end
  while init_complete do
    sleep(1000)
    updatePumps()
    updateDuctPressureAverages()
  end
end
