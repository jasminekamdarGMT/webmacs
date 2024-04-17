BLWR_IDS = {'01','02','03','04','05','06','07','08','09','10'}
ZONE_IDS = BLWR_IDS
ZONE_DAMPER_IDS = {'A','B'}
ZONE_PROBE_IDS = {}
ZONE_LOG_COLUMNS = {'Blower','Damper'}
MAX_BLWRS_ON = 2
GRP_IDS = {'group01','group02'}
GRP_BLWR_IDS = {}
GRP_BLWR_IDS['group01'] = {'blower01','blower02','blower03','blower04','blower05'}
GRP_BLWR_IDS['group02'] = {'blower06','blower07','blower08','blower09','blower10'}
GRP_BLWR_SEQ = {}
GRP_BLWR_OVERRIDES = {}
GRP_BLWR_VARS = {}

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "360"
  settings["FacilityName"] = "STRATHMORE"
  settings["ManualBlowerDamperCycleTime"] = 6
  for i,blower_id in ipairs(BLWR_IDS) do
    settings["Blower"..blower_id.."CycleOnTime"] = 12
    settings["Blower"..blower_id.."CycleOffTime"] = 12
  end
  settings["DamperAdvance"] = 30
  settings["DamperRate"] = 10
  settings["BlowerRate"] = 10
  return settings
end

function initValues()
  for i,zone_id in ipairs(ZONE_IDS) do
    initBlower(zone_id)
    initZone(zone_id)
  end
  for i,grp_id in ipairs(GRP_IDS) do
    GRP_BLWR_VARS[grp_id] = {}
    GRP_BLWR_VARS[grp_id]['pending_blower'] = ''
    GRP_BLWR_VARS[grp_id]['last_stopped'] = ''
    GRP_BLWR_VARS[grp_id]['run_next'] = ''
  end
end

function zoneLogValues(zone_id,probe_ids)
  return nil
end

function updateLastValidTemps()
end

function updateAverages()
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

function blowerRunCount(grp_prefixes)
  run_count = 0
  for i,blwr_nm in ipairs(grp_prefixes) do
    if io[blwr_nm..'run'] == 1 then
      run_count = run_count + 1
    end
  end
  return run_count
end

function extractBlowerOverridesFromSequence(grp_id)
  GRP_BLWR_OVERRIDES = {}
  GRP_BLWR_SEQ = {}
  override_count = 0
  grp_prefixes = GRP_BLWR_IDS[grp_id]
  for i,blwr_nm in ipairs(grp_prefixes) do
    if reg[blwr_nm..'override'] == 1 then
      table.insert(GRP_BLWR_OVERRIDES,blwr_nm)
    else
      table.insert(GRP_BLWR_SEQ,blwr_nm)
    end
  end
  return override_count
end

function logData(zone_id)
  ZONE = _G['ZONE_'..zone_id]
  if io['blower'..zone_id..'run'] ~= nil and io['damper'..zone_id..'control'] ~= nil then
    printData(ZONE["file_name"],{ io['blower'..zone_id..'run']*100,io['damper'..zone_id..'control']*100 },zone_id)
  end
end

function canStartBlower(blwr_nm,zone_id,grp_id)
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

function startBlower(blwr_nm,grp_id,on_cycle)
  reg[grp_id..'startdelay'] = 5
  if reg[blwr_nm..'override'] == 0 then
    reg[blwr_nm..'cycle'] = on_cycle * 60
  end
  io[blwr_nm..'run'] = 1
  reg[blwr_nm..'control'] = 1
  logData(string.sub(blwr_nm,-2))
end

function stopBlower(blwr_nm,grp_id,off_cycle,clr_vars,zone_id)
  if reg[blwr_nm..'override'] == 1 then
    off_cycle = 0
  end
  if io[blwr_nm..'run'] == 1 then
    io[blwr_nm..'run'] = 0
    reg[blwr_nm..'offtimer'] = off_cycle * 60
    reg[grp_id..'startdelay'] = 5
    GRP_BLWR_VARS[grp_id]['last_stopped'] = blwr_nm
    logData(string.sub(blwr_nm,-2))
  end
  if clr_vars then
    reg[blwr_nm..'control'] = 0
    reg[blwr_nm..'cycle'] = 0
    reg[zone_id..'dampercycle'] = 0
    if GRP_BLWR_VARS[grp_id]['run_next'] == blwr_nm then
      GRP_BLWR_VARS[grp_id]['run_next'] = ''
    end
    if GRP_BLWR_VARS[grp_id]['pending_blower'] == blwr_nm then
      GRP_BLWR_VARS[grp_id]['pending_blower'] = ''
    end
  end
end

function blowerCustomControl(blwr_nm,zone_id,grp_id,on_cycle,off_cycle)
  grp_prefixes = GRP_BLWR_IDS[grp_id]
  if reg[blwr_nm..'override'] == 1 then
    on_cycle = SETTINGS['ManualBlowerDamperCycleTime'] * 2
    reg[blwr_nm..'offtimer'] = 0
    if reg[blwr_nm..'control'] == 1 then
      if io[blwr_nm..'run'] == 1 then
        if reg[zone_id..'dampercycle'] == 0 then
          reg[zone_id..'dampercycle'] = on_cycle * 60
        end
      else
        if canStartBlower(blwr_nm,zone_id,grp_id) then
          startBlower(blwr_nm,grp_id,on_cycle)
        end
      end
    else
      stopBlower(blwr_nm,grp_id,off_cycle,true,zone_id)
    end
  elseif reg[zone_id ..'control'] == 1 then
    if reg[blwr_nm..'cycle'] == 0 then
      if blowerOnCount(grp_prefixes) < MAX_BLWRS_ON and io[blwr_nm..'run'] == 0 then
        if canStartBlower(blwr_nm,zone_id,grp_id) then
          startBlower(blwr_nm,grp_id,on_cycle)
        end
      else
        stopBlower(blwr_nm,grp_id,off_cycle)
        reg[blwr_nm..'control'] = 0
      end
    end
  else
    stopBlower(blwr_nm,grp_id,off_cycle,true,zone_id)
  end
end

function updateBlowerGroup(grp_id)
  extractBlowerOverridesFromSequence(grp_id)
  for blwr_nm in pairs (GRP_BLWR_OVERRIDES) do
      blwr_nm = GRP_BLWR_OVERRIDES[blwr_nm]
      item_id = string.sub(blwr_nm,-2)
      blowerCustomControl(blwr_nm,'zone'..item_id,grp_id,SETTINGS['Blower'..item_id..'CycleOnTime'],SETTINGS['Blower'..item_id..'CycleOffTime'])
  end
  for blwr_nm in pairs (GRP_BLWR_SEQ) do
      blwr_nm = GRP_BLWR_SEQ[blwr_nm]
      item_id = string.sub(blwr_nm,-2)
      blowerCustomControl(blwr_nm,'zone'..item_id,grp_id,SETTINGS['Blower'..item_id..'CycleOnTime'],SETTINGS['Blower'..item_id..'CycleOffTime'])
  end
end
function updateBlowers()
  updateBlowerGroup('group01')
  updateBlowerGroup('group02')
end
function setDamperControl(blwr_nm,damper_prefix,ctrl_val)
  if io[damper_prefix..'control'] ~= ctrl_val then
    io[damper_prefix..'control'] = ctrl_val
    logData(string.sub(blwr_nm,-2))
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
    damperCustomControl(_G['DAMPER_'..zone_id],'blower'..zone_id,'damper'..zone_id,'zone'..zone_id,SETTINGS['Blower'..zone_id..'CycleOnTime'])
  end
end

function updateZones()
  for i,zone_id in ipairs(ZONE_IDS) do
    updateZone(_G['ZONE_'..zone_id],zone_id,ZONE_PROBE_IDS)
  end
end
function updateAlarms()
end
if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
