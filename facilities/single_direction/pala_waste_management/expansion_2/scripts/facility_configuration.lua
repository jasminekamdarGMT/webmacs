function initValues()
  if not luatest_running then
    webmacs_db_path = ''
  end
  -- init globals
  PUMP_IDS = uid(2)
  TANK_IDS = uid(2)
  ZONE_IDS = {}
  ZONE_LOG_COLUMNS = {''}
  PUMP_LABELS = {['01']='HV',['02']='LV'}
  TANK_LABELS = {['01']='HV',['02']='LV'}
  DUCT_PROBE_IDS = {'A', 'B'}
  for i, pump_id in ipairs(PUMP_IDS) do
    -- init pump values
    initPump(pump_id)
  end
end

function initPump(pump_id)
  local PUMP = {}
  PUMP["fault_email"] = 0
  _G['PUMP_'..pump_id] = PUMP
end

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "Pala Waste Management | Pump Control"
  settings["Pump01PressureAlarmSetpoint"] = "60"
  settings["Pump02PressureAlarmSetpoint"] = "60"
  settings["Pump01PressureSetpointMin"] = "4"
  settings["Pump02PressureSetpointMin"] = "4"
  settings["Pump01PressureSetpointMax"] = "50"
  settings["Pump02PressureSetpointMax"] = "50"
  settings["Pump01ShutoffTimer"] = "120"
  settings["Pump02ShutoffTimer"] = "120"
  settings["Tank01LowLevel"] = "30"
  settings["Tank02LowLevel"] = "30"
  settings["Tank01CriticalLowLevel"] = "25"
  settings["Tank02CriticalLowLevel"] = "25"
  return settings
end

function printData(reason, pump_id)
  local filename = _G['PUMP_'..pump_id]["file_name"]
  local fh = file.open(batch_logs_path..filename, "a")
  if fh ~= nil then
    nowTime = time.getComponents(time.now())
    local timestamp = string.format("%02d/%02d/%02d %02d:%02d:%02d", nowTime.month, nowTime.mday, nowTime.year, nowTime.hour, nowTime.min, nowTime.sec)
    local output = timestamp
    local message = ''
    if reason == 'pump start' then
      message = 'Pump '..pump_id..' turned on.'
    elseif reason == 'pump stop' then
      message = 'Pump '..pump_id..' turned off.'
    elseif reason == 'tank low' then
      message = 'Tank '..pump_id..' level is low.'
      sendAlarm('tank'..pump_id, message)
    elseif reason == 'tank crit' then
      message = 'Tank '..pump_id..' level is critically low.'
      sendAlarm('tank'..pump_id, message)
    elseif reason == 'high pressure' then
      message = 'High pressure in duct '..pump_id..'.'
      sendAlarm('duct'..pump_id, message)
    end
    output = output..", "..message
    fh:write(output.."\n")
    fh:close()
  end
end

function updateLastValidTemps()
  -- Do nothing
end

function GetTankLevels(tank_id)
  -- Water level in inches = (pressure reading * 1 psi of liquid in inches) / specific gravity of liquid
  -- 1 psi of water in inches = 27.6799.
  -- Specific gravity of water = 1.0. This can be omitted from the calculation since we'll be deviding by 1.
  -- readings range from 2ft = 24 inches = ~0.867055 = 0% to 12ft = 144 inches = ~5.20233 = 100%
  -- max = 143.936
  local tank_lvl_offset = -24
  local tank_max = 144 + tank_lvl_offset
  local tank_lvl =  (io['tank'..tank_id..'pressure'] * 27.6799) + tank_lvl_offset
  local tank_low = tank_lvl <= tank_max * (SETTINGS["Tank"..tank_id.."LowLevel"] / 100)
  local tank_crit_low = tank_lvl <= tank_max * (SETTINGS["Tank"..tank_id.."CriticalLowLevel"] / 100)
  return tank_low, tank_crit_low
end

function stopPump(pump_id)
  io['pump'..pump_id..'run'] = 0
  reg['pump'..pump_id..'control'] = 0
end

function updatePumps()
  for i,pump_id in ipairs(PUMP_IDS) do
    local update_zone_startup = false
    local tank_id = pump_id
    local tank_low, tank_crit_low = GetTankLevels(tank_id)
    local high_pressure = false
    local reason = ''
    local can_print = reg['pump'..pump_id..'print'] == 0
    for p, probe_id in pairs(duct_probe_ids) do
      high_pressure = io['duct'..pump_id..probe_id..'pressure'] >= tonumber(SETTINGS["Pump"..pump_id.."PressureSetpointMax"])
      if high_pressure then
        break
      end
    end
    if _G['PUMP_'..pump_id]["file_name"] == nil or _G['PUMP_'..pump_id]["file_name"] == "" then
      setFileName(_G['PUMP_'..pump_id], pump_id)
      update_zone_startup = true
    end
    if tank_crit_low then
      stopPump(pump_id)
      reason = 'tank crit'
      update_zone_startup = true
    elseif tank_low then
      stopPump(pump_id)
      reason = 'tank low'
      update_zone_startup = true
    elseif high_pressure then
      stopPump(pump_id)
      reason = 'high pressure'
      update_zone_startup = true
    else
      if reg['pump'..pump_id..'control'] == 1 and io['pump'..pump_id..'run'] == 0 then
        reason = 'pump start'
      elseif reg['pump'..pump_id..'control'] == 0 and io['pump'..pump_id..'run'] == 1 then
        reason = 'pump stop'
      end
      io['pump'..pump_id..'run'] = reg['pump'..pump_id..'control']
    end
    if reason ~= '' and can_print then
      printData(reason, pump_id)
      reg['pump'..pump_id..'print'] = SETTINGS["DataLoggingRate"] * 60
    end
    local print_update_rate = 300
    local remainder = reg['pump'..pump_id..'print'] % print_update_rate
    if update_zone_startup or remainder >= print_update_rate - 10 then
      updatePumpStartup(_G['PUMP_'..pump_id], pump_id)
    end
  end
end

function sendAlarm(desc, reading)
  local facility = SETTINGS['FacilityName']
  emailDef = {
    rcpt = "grp.admin",
    subj = facility..[[: Alarm raised on ]]..desc..[[!]],
    body = facility..[[: An alarm was raised on ]]..desc..[[.  The reading is: ]]..reading..[[.]]
  }
  email(emailDef)
end

if not luatest_running then
  while init_complete ~= true do
    sleep(1000)
  end
  while init_complete do
    sleep(1000)
    updatePumps()
  end
end
