local str__position,
      str__bioblower =
      "position",
      "bioblower"

function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PFRP_TEMP = 55
  BLOWER_IDS = uid(6)
  BIOFILTER_BLOWER_IDS = uid(1)
  -- BIOFILTER_DAMPER_IDS = uid(2)
  ZONE_IDS = uid(12)
  ZONE_PROBE_IDS = {'A'}
  BLWR_GRP_ZONE_IDS = {}
  BLWR_GRP_ZONE_IDS['01'] = uid(1,2)
  BLWR_GRP_ZONE_IDS['02'] = uid(3,4)
  BLWR_GRP_ZONE_IDS['03'] = uid(5,6)
  BLWR_GRP_ZONE_IDS['04'] = uid(7,8)
  BLWR_GRP_ZONE_IDS['05'] = uid(9,10)
  BLWR_GRP_ZONE_IDS['06'] = uid(11,12)
  ZONE_LOG_COLUMNS = {'Temperature A', 'Damper', 'Duct Pressure', 'Blower Speed', 'PFRP Time'}
  for i, blwr_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(blwr_id)
  end
  for i, bio_id in ipairs(BIOFILTER_BLOWER_IDS) do
    -- init blower values
    initBioBlower(bio_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    -- init zone & damper values
    initZone(zone_id)
    initDamper(zone_id)
  end
end

function initBioBlower(bio_id)
  local BIOBLOWER = {}
  BIOBLOWER['prev_error'] = 0
  BIOBLOWER['int_error'] = 0
  BIOBLOWER['control'] = 100
  BIOBLOWER["fault_email"] = 0
  _G['BIOBLOWER_'..bio_id] = BIOBLOWER
end

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "UNIVERVE"
  settings["MinVFDSpeed"] = "25"
  settings["MaxVFDSpeed"] = "100"
  settings["PressureSetpointMin"] = "4"
  settings["PressureSetpointMax"] = "8"
  settings["PressureSetpointHotZoneTrigger"] = "50"
  settings["PressureSetpointColdZoneTrigger"] = "50"
  settings["PressureSetpointChangeTimer"] = "5"
  settings["PressureSetpointChangeInterval"] = "2"
  settings["BlowerGain"] = "1"
  settings["BlowerIntegral"] = "1.5"
  settings["BlowerDerivative"] = "0"
  settings["BlowerDerivativeTime"] = "2"
  settings["BlowerRate"] = "2"
  -- settings["BiofilterBlowerGain"] = "1"
  -- settings["BiofilterBlowerIntegral"] = "1.5"
  -- settings["BiofilterBlowerDerivative"] = "0"
  -- settings["BiofilterBlowerDerivativeTime"] = "2"
  -- settings["BiofilterBlowerRate"] = "2"
  -- settings["MinBiofilterDamperValue"] = "6"
  settings["MinBiofilterVFDSpeed"] = "25"
  settings["MaxBiofilterVFDSpeed"] = "100"
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
  settings["GraphReferenceTemp"] = "55"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  settings["OperatingHoursStart"] = "00:00"
  settings["OperatingHoursEnd"] = "00:00"
  settings["TurboFailsafeTimer"] = "100"
  return settings
end

function blowerLogValues(log_values,zn_id)
  for i,blower in ipairs(BLOWER_IDS) do
    for i,zone in ipairs(BLWR_GRP_ZONE_IDS[blower]) do
        if zone == zn_id then
            logInsert(log_values,reg['duct'..blower..'pressureavg'])
            logInsert(log_values,reg['blower'..blower..'value'])
        end
    end
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
  logInsert(log_values, reg['zone' .. zone_id .. 'avgdamper'])
  blowerLogValues(log_values,zone_id)
  logInsert(log_values, reg['zone'..zone_id..'pfrptime'])
  if valid_temps == true then
    resetAverage('zone' .. zone_id .. 'avgdamper')
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
      updateTempAverage(temp_prefix,io[temp_prefix..'temp'])
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

function spForZone(zone_id)
  if reg['zone'..zone_id..'regime'] == 3 then
    return SETTINGS['Regime3TempSetPoint']
  elseif reg['zone'..zone_id..'regime'] == 2 then
    return SETTINGS['Regime2TempSetPoint']
  else
    return SETTINGS['Regime1TempSetPoint']
  end
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
    if reg['hsdamper'..blwr_id..'override'] == 1 then
      io['hsdamper'..blwr_id..str__position] = reg['hsdamper'..blwr_id..'value']
    else
      local blwr_grp = BLWR_GRP_ZONE_IDS[blwr_id]
      local blwr_grp_avg_dmpr = 0
      local damper_position_sum = 0
      local damper_count = 0
      for i,zn_id in ipairs(blwr_grp) do
        if ioAppearsValid('damper'..zn_id..str__position) and io['damper'..zn_id..str__position] > 0 then
          damper_position_sum = damper_position_sum + io['damper'..zn_id..str__position]
          damper_count = damper_count + 1
        end
      end
      if damper_count > 0 then
        blwr_grp_avg_dmpr = damper_position_sum / damper_count
        if blwr_grp_avg_dmpr > 0 then
          io['hsdamper'..blwr_id..str__position] = blwr_grp_avg_dmpr
        end
      end
    end
    local batch_running,
    tnnl_door_open,
    load_zone_active = tunnelDamperConditions(blwr_id)
    local ramp_up_blowers = batch_running and tnnl_door_open and load_zone_active
    if ramp_up_blowers then
      io['blower'..blwr_id..'speed'] = SETTINGS["MaxVFDSpeed"]
      reg['blower'..blwr_id..'value'] = SETTINGS["MaxVFDSpeed"]
    elseif batch_running == 0 then
      stopBlower('blower'..blwr_id)
    else
      updateDuctPressureSetpoint(blwr_id, BLWR_GRP_ZONE_IDS[blwr_id], ZONE_PROBE_IDS)
      blowerPressureControl(
        _G['BLOWER_'..blwr_id],
        'blower'..blwr_id,
        reg['duct'..blwr_id..'pressureavg'],
        reg['duct'..blwr_id..'pressuresp'],
        zonesOnline(BLWR_GRP_ZONE_IDS[blwr_id]),
        SETTINGS["MinVFDSpeed"],
        SETTINGS["MaxVFDSpeed"]
      )
    end
  end
  for i,bio_id in ipairs(BIOFILTER_BLOWER_IDS) do
    for i,dir in ipairs({'pos','neg'}) do
      local pressure_prefix = 'bio'..dir..'pressure'..bio_id
      blowerPressureControl(
        _G['BIOBLOWER_'..bio_id],
        str__bioblower..bio_id,
        io[str__bioblower..'01speed'],
        reg[str__bioblower..'01speedsp'],
        1,
        SETTINGS["MinVFDSpeed"],
        SETTINGS["MaxVFDSpeed"]
      )
      updateAverage(pressure_prefix..'avg', io[str__bioblower..bio_id..dir..'press'], 10)
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
    updateZone(_G['ZONE_'..zn_id], zn_id, ZONE_PROBE_IDS)
  end
  updateAlarms()
end

function updateAlarms()
  for i,zn_id in ipairs(ZONE_IDS) do
    zoneTempAlarm(_G['ZONE_'..zn_id], zn_id, ZONE_PROBE_IDS)
  end

  blowerFaultAlarm(BLOWER_01, '01', 'Blower T1')
  blowerFaultAlarm(BLOWER_02, '02', 'Blower T2')
  blowerFaultAlarm(BLOWER_03, '03', 'Blower T3')
  blowerFaultAlarm(BLOWER_04, '04', 'Blower T4')
  blowerFaultAlarm(BLOWER_05, '05', 'Blower T5')
  blowerFaultAlarm(BLOWER_06, '06', 'Blower T6')
end

function updateDuctPressureAverages()
  local array_limit = tonumber(SETTINGS["BlowerRate"])
  for i,blwr_id in ipairs(BLOWER_IDS) do
    updateDuctPressureAverage(blwr_id,array_limit)
  end
end

function tunnelDamperConditions(blwr_id)
  local empty_zones = 0
  local load_zones = 0
  local blwr_grp = BLWR_GRP_ZONE_IDS[blwr_id]
  for i, zn_id in ipairs(blwr_grp) do
    if reg['zone'..zn_id..'control'] == 0 then
      empty_zones = empty_zones + 1
    end
    if reg['loadzone'..zn_id..'active'] == 1 then
      load_zones = load_zones + 1
    end
  end
  local batch_running = zonesOnline(blwr_grp) > 0
  local tnnl_door_open = io['tunnel'..blwr_id..'door'] == 1
  local load_zone_active = load_zones > 0
  return batch_running, tnnl_door_open, load_zone_active, blwr_grp
end

function tunnelDamperControl()
  local extr_door_open = io['extrdoor01open'] == 0 or io['extrdoor02open'] == 0
  local turbo_time = reg['turbotimer'] > 0
  if not turbo_time and not extr_door_open then
    local start_time = SETTINGS['OperatingHoursStart']:gsub(":", "")
    local end_time = SETTINGS['OperatingHoursEnd']:gsub(":", "")
    local curr_time = time.getComponents(time.now())
    start_time = tonumber(start_time)
    end_time = tonumber(end_time)
    curr_time = tonumber(string.format("%02d%02d",curr_time.hour, curr_time.min))
    if reg['bioblower01override'] == 0 then
      if start_time < curr_time and curr_time < end_time then
        reg[str__bioblower..'01speedsp'] = SETTINGS["MaxVFDSpeed"]
      else
        reg[str__bioblower..'01speedsp'] = SETTINGS["MinVFDSpeed"]
      end
    else
      io[str__bioblower..'01speed'] = reg[str__bioblower..'01value']
    end
    for i,blwr_id in ipairs(BLOWER_IDS) do
      local batch_running,
      tnnl_door_open,
      load_zone_active,
      blwr_grp = tunnelDamperConditions(blwr_id)
      if batch_running then
        if tnnl_door_open then
          io['biodamper01position'] = 100
          io['biodamper02position'] = 100
        else
          -- Need more information on how biofilter dampers should modulate
          -- in reference to blower speed.
        end
      end
    end
  end
end

function turboControl()
  local extr_door_open = io['extrdoor01open'] == 0 or io['extrdoor02open'] == 0
  if reg['turbotimer'] == 0 and reg['turborun'] == 1 then
    reg['turbocontrol'] = 0
    reg['turborun'] = 0
  elseif extr_door_open or reg['turbocontrol'] == 1 then
    if reg['turborun'] == 0 then
      reg['turbotimer'] = tonumber(SETTINGS['TurboFailsafeTimer']) * 60
    end
    reg['turbocontrol'] = 1
    reg['turborun'] = 1
  elseif not extr_door_open or reg['turbocontrol'] == 0 then
    reg['turbotimer'] = 0
    reg['turborun'] = 0
  end
  if reg['turborun'] == 1 then
    reg[str__bioblower..'01speedsp'] = 100
    if io['biotunnel01door'] == 0 then
      reg['biodamper01value'] = 100
      reg['biodamper02value'] = 100
    else
      reg['biodamper01value'] = SETTINGS['MinDamperValue']
      reg['biodamper02value'] = SETTINGS['MinDamperValue']
    end
    io['biodamper01position'] = reg['biodamper01value']
    io['biodamper02position'] = reg['biodamper02value']
  end
end

function windowControl()
  local extr_door_open = io['extrdoor01open'] == 0 or io['extrdoor02open'] == 0
  if extr_door_open == true then
    io['window01open'] = 0
  else
    io['window01open'] = 100
  end
end

if not luatest_running then
  while init_complete ~= true do
    sleep(1000)
  end
  while init_complete do
    sleep(1000)
    updateDuctPressureAverages()
    tunnelDamperControl()
    turboControl()
    windowControl()
  end
end
