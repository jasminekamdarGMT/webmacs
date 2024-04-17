function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PFRP_TEMP = 55
  BLOWER_IDS = uid(4)
  ZONE_IDS = uid(4)
  BLWR_GRP_ZONE_IDS = {}
  BLWR_GRP_ZONE_IDS ['01'] = uid(1)
  BLWR_GRP_ZONE_IDS ['02'] = uid(2,2)
  BLWR_GRP_ZONE_IDS ['03'] = uid(3,3)
  BLWR_GRP_ZONE_IDS ['04'] = uid(4,4)
  ZONE_PROBE_IDS = {'A','B'}
  ZONE_LOG_COLUMNS = {'Temperature A', 'Temperature B', 'Damper', 'PFRP Time'}
  MAX_BLWRS_ON = 1
  GRP_IDS = {'group01'}
  GRP_BLWR_IDS = {}
  GRP_BLWR_IDS['group01'] = {'blower01','blower02','blower03','blower04'}
  GRP_BLWR_SEQ = {}
  GRP_BLWR_OVERRIDES = {}
  GRP_BLWR_VARS = {}
  for i,grp_id in ipairs(GRP_IDS) do
    GRP_BLWR_VARS[grp_id] = {}
    GRP_BLWR_VARS[grp_id]['pending_blower'] = ''
    GRP_BLWR_VARS[grp_id]['last_stopped'] = ''
    GRP_BLWR_VARS[grp_id]['run_next'] = ''
  end
  for i, blower_id in ipairs(BLOWER_IDS) do
    -- init blower values
    initBlower(blower_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    -- init zone
    initZone(zone_id)
  end
end

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "SCHAUS"
  settings["BlowerRate"] = "10"
  settings["BlowerCycleOnTime"] = "12"
  settings["BlowerCycleOffTime"] = "5"
  settings["Regime1TempSetPoint"] = "55"
  settings["Regime2TempSetPoint"] = "62"
  settings["Regime3TempSetPoint"] = "57"
  settings["Regime1Duration"] = "5"
  settings["Regime2Duration"] = "7"
  settings["MaxTemperatureAlarm"] = "80"
  settings["MinTemperatureAlarm"] = "0"
  settings["GraphReferenceTemp"] = "55"
  settings["GraphReferenceTempLabel"] = "PFRP Temp"
  settings["DamperRate"] = "10"
  settings["ManualBlowerDamperCycleTime"] = "6"
  settings["DamperAdvance"] = "30"
  return settings
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
  logInsert(log_values, reg['zone'..zone_id..'avgdamper'])
  logInsert(log_values, reg['zone'..zone_id..'pfrptime'])
  if valid_temps == true then
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

function setpointForZone(zone_id)
  if reg['zone'..zone_id..'regime'] == 3 then
    return SETTINGS['Regime3TempSetPoint']
  elseif reg['zone'..zone_id..'regime'] == 2 then
    return SETTINGS['Regime2TempSetPoint']
  else
    return SETTINGS['Regime1TempSetPoint']
  end
end

function totalZonesOnline(zone_ids)
  local online_count = 0
  for i, zone_id in ipairs(zone_ids) do
    if reg['zone'..zone_id..'control'] == 1 then
      online_count = online_count + 1
    end
  end
  return online_count
end

function updateBlowers()
  updateBlowerGroup('group01')
end

function updateBlowerGroup(grp_id)
  extractBlowerOverridesFromSequence(grp_id)
  for blwr_nm in pairs (GRP_BLWR_OVERRIDES) do
      blwr_nm = GRP_BLWR_OVERRIDES[blwr_nm]
      zn_grp_ids = BLWR_GRP_ZONE_IDS[string.sub(blwr_nm,-2)]
      blowerCustomControl(blwr_nm,zn_grp_ids,grp_id,SETTINGS['BlowerCycleOnTime'],SETTINGS['BlowerCycleOffTime'])  end
  for blwr_nm in pairs (GRP_BLWR_SEQ) do
      blwr_nm = GRP_BLWR_SEQ[blwr_nm]
      zn_grp_ids = BLWR_GRP_ZONE_IDS[string.sub(blwr_nm,-2)]
      blowerCustomControl(blwr_nm,zn_grp_ids,grp_id,SETTINGS['BlowerCycleOnTime'],SETTINGS['BlowerCycleOffTime'])  end
end

function extractBlowerOverridesFromSequence(grp_id)
  local pre_existing_overrides = GRP_BLWR_OVERRIDES
  GRP_BLWR_OVERRIDES = {}
  GRP_BLWR_SEQ = {}
  override_count = 0
  grp_prefixes = GRP_BLWR_IDS[grp_id]
  for i,blwr_nm in ipairs(grp_prefixes) do
    if reg[blwr_nm..'override'] == 1 then
      table.insert(GRP_BLWR_OVERRIDES,blwr_nm)
      override_count = override_count + 1
    else
      table.insert(GRP_BLWR_SEQ,blwr_nm)
    end
  end
  local loop_count = 0
  if override_count > MAX_BLWRS_ON then
    for i,blwr_nm in ipairs(GRP_BLWR_OVERRIDES) do
      for i,pre_existing_blwr_nm in ipairs(pre_existing_overrides) do
        if pre_existing_blwr_nm == blwr_nm and override_count > 1 then
          GRP_BLWR_OVERRIDES[blwr_nm] = nil
          reg[blwr_nm..'override'] = 0
          override_count = override_count - 1
        end
      end
    end
  end
  return override_count
end

function blowerCustomControl(blwr_nm,zn_grp_ids,grp_id,on_cycle,off_cycle)
  grp_prefixes = GRP_BLWR_IDS[grp_id]
  if reg[blwr_nm..'override'] == 1 then
    on_cycle = SETTINGS['ManualBlowerDamperCycleTime'] * 2
    reg[blwr_nm..'offtimer'] = 0
    if reg[blwr_nm..'control'] == 1 then
      if io[blwr_nm..'run'] == 1 then
        for i,zn_id in ipairs(zn_grp_ids) do
          if reg['zone'..zn_id..'dampercycle'] == 0 then
            reg['zone'..zn_id..'dampercycle'] = on_cycle * 60
          end
        end
      else
        if canStartBlower(blwr_nm,grp_id) then
          startBlower(blwr_nm,grp_id,on_cycle)
        end
      end
    else
      stopBlower(blwr_nm,grp_id,off_cycle,true,zn_grp_ids)
    end
  else
    local active_zones = false
    for i,zn_id in ipairs(zn_grp_ids) do
      if reg['zone'..zn_id ..'control'] == 1 then
        active_zones = true
        break
      end
    end
    if active_zones and #GRP_BLWR_OVERRIDES < MAX_BLWRS_ON then
      if reg[blwr_nm..'cycle'] == 0 then
        if blowerOnCount(grp_prefixes) < MAX_BLWRS_ON and io[blwr_nm..'run'] == 0 then
          if canStartBlower(blwr_nm,grp_id) then
            startBlower(blwr_nm,grp_id,on_cycle)
          end
        else
          stopBlower(blwr_nm,grp_id,off_cycle)
          reg[blwr_nm..'control'] = 0
        end
      end
    else
      stopBlower(blwr_nm,grp_id,off_cycle,true,zn_grp_ids)
    end
  end
end

function startBlower(blwr_nm,grp_id,on_cycle)
  reg[grp_id..'startdelay'] = 5
  if reg[blwr_nm..'override'] == 0 then
    reg[blwr_nm..'cycle'] = on_cycle * 60
  end
  io[blwr_nm..'run'] = 1
  reg[blwr_nm..'control'] = 1
end

function stopBlower(blwr_nm,grp_id,off_cycle,clr_vars,zn_grp_ids)
  if reg[blwr_nm..'override'] == 1 then
    off_cycle = 0
  end
  if io[blwr_nm..'run'] == 1 then
    io[blwr_nm..'run'] = 0
    reg[blwr_nm..'offtimer'] = off_cycle * 60
    reg[grp_id..'startdelay'] = 5
    GRP_BLWR_VARS[grp_id]['last_stopped'] = blwr_nm
  end
  if clr_vars then
    reg[blwr_nm..'control'] = 0
    reg[blwr_nm..'cycle'] = 0
    for i,zn_id in ipairs(zn_grp_ids) do
      reg['zone'..zn_id..'dampercycle'] = 0
    end
    if GRP_BLWR_VARS[grp_id]['run_next'] == blwr_nm then
      GRP_BLWR_VARS[grp_id]['run_next'] = ''
    end
    if GRP_BLWR_VARS[grp_id]['pending_blower'] == blwr_nm then
      GRP_BLWR_VARS[grp_id]['pending_blower'] = ''
    end
  end
end

function blowerOnCount(grp_prefixes)
  on_count = 0
  for i,blwr_nm in ipairs(grp_prefixes) do
    if reg[blwr_nm..'control'] == 1 then
      on_count = on_count + 1
    end
  end
  return on_count
end

function canStartBlower(blwr_nm,grp_id)
  can_start = true
  off_timer = reg[blwr_nm..'offtimer']
  pending = GRP_BLWR_VARS[grp_id]['pending_blower']
  last = GRP_BLWR_VARS[grp_id]['last_stopped']
  next = GRP_BLWR_VARS[grp_id]['run_next']
  if next == blwr_nm and reg[grp_id..'startdelay'] == 0 and off_timer == 0 then
    next = ''
  end
  if #next == 0 and pending == blwr_nm and off_timer == 0 then
    pending = ''
  end
  if #next > 0 or #pending > 0 or off_timer > 0 or reg[grp_id..'startdelay'] ~= 0 then
    can_start = false
  end
  if reg[blwr_nm..'override'] == 1 then
    if io[blwr_nm..'run'] == 0 and blowerRunCount(grp_prefixes) < MAX_BLWRS_ON then
      if #next == 0 then
        if reg[grp_id..'startdelay'] == 0 then
          can_start = true
        else
          next = blwr_nm
        end
      end
    end
  elseif off_timer == 0 and #pending == 0 and #next == 0 and reg[grp_id..'startdelay'] ~= 0 then
    next = blwr_nm
  elseif off_timer > 0 and #pending == 0 then
    if last ~= blwr_nm and #next == 0 then
      pending = blwr_nm
    end
  elseif off_timer > 0 and pending == blwr_nm then
    next = blwr_nm
  end
  if can_start and blowerRunCount(grp_prefixes) >= MAX_BLWRS_ON then
    can_start = false
    pending = blwr_nm
  end
  GRP_BLWR_VARS[grp_id]['pending_blower'] = pending
  GRP_BLWR_VARS[grp_id]['last_stopped'] = last
  GRP_BLWR_VARS[grp_id]['run_next'] = next
  return can_start
end

function blowerRunCount(grp_prefixes)
  run_count = 0
  for i,blwr_nm in ipairs(grp_prefixes) do
    if io[blwr_nm..'run'] == 1 then
      run_count = run_count + 1
    end
  end
  return run_count
end

function setDamperControl(blwr_nm,damper_prefix,ctrl_val)
  if io[damper_prefix..'control'] ~= ctrl_val then
    io[damper_prefix..'control'] = ctrl_val
  end
end

function damperCustomControl(DAMPER,blwr_nm,damper_prefix,zone_id,on_cycle)
  cycletime = reg[blwr_nm..'cycle']
  if reg[blwr_nm..'control'] == 1 then
    if reg[blwr_nm..'override'] == 1 then
      cycletime = reg[zone_id..'dampercycle']
      on_cycle = SETTINGS['ManualBlowerDamperCycleTime'] * 2
    end
    if cycletime > on_cycle * 30 + SETTINGS['DamperAdvance'] then
      setDamperControl(blwr_nm,damper_prefix,0)
    else
      setDamperControl(blwr_nm,damper_prefix,1)
    end
  else
    setDamperControl(blwr_nm,damper_prefix,0)
  end
end

function updateDampers()
  for i,zone_id in ipairs(ZONE_IDS) do
    damperCustomControl(_G['DAMPER_'..zone_id],'blower'..zone_id,'damper'..zone_id,'zone'..zone_id,SETTINGS['BlowerCycleOnTime'])
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
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
