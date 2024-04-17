-- DAMPER CONTROL FUNCTIONS
local str_movedfrom = 'movedfrom'

function initDamper(damper_id)
  local DAMPER = {}
  DAMPER["prev_error"] = 0
  DAMPER["int_error"] = 0
  DAMPER["control"] = 0
  _G['DAMPER_'..damper_id] = DAMPER
end

function updateDamperAverage(zone_id, damper_id)
  local zone_prefix = 'zone'..zone_id
  local damper_prefix = 'damper'..damper_id
  if reg[zone_prefix .. 'control'] == 1 and reg[zone_prefix .. 'avgtimer'] == 0 then
    if ioAppearsValid(damper_prefix .. 'position') then
      local rate = tonumber(SETTINGS["DataLoggingRate"])
      if rate < 5 then
        rate = 5
      end
      local sample_limit = rate / 5
      updateAverage(zone_prefix..'avgdamper', io[damper_prefix .. 'position'], sample_limit)
      reg[zone_prefix .. 'avgtimer'] = 300 -- set timer for five minutes
    end
  end
end

function updateDamperPIDValues(pid, current_temp, set_point)
  if current_temp ~= current_temp then
    current_temp = set_point
  end
  if set_point == 0 then
    set_point = current_temp
  end

  local curr_error = 100 - (tonumber(current_temp) / tonumber(set_point)) * 100
  local diff
  local p_term
  local i_term
  local d_term
  local dt = getNumericSetting('DamperDerivativeTime', 10)

  --integration
  pid["int_error"] = tonumber(pid["int_error"]) + curr_error * dt
  --limit integral windup
  if pid["int_error"] < 0 then
    pid["int_error"] = 0
  end
  if pid["int_error"] > 100 - tonumber(SETTINGS["MinDamperValue"]) then
    pid["int_error"] = 100 - tonumber(SETTINGS["MinDamperValue"])
  end

  --differentiation
  diff = (curr_error - tonumber(pid["prev_error"])) / dt

  --scaling
  p_term = tonumber(SETTINGS["DamperGain"]) * curr_error
  i_term = tonumber(SETTINGS["DamperIntegral"]) * pid["int_error"]
  d_term = tonumber(SETTINGS["DamperDerivative"]) * diff

  --summation of terms
  local result = p_term + i_term + d_term
  --round to 2 decimal places
  digits = 10 ^ 2
  result = math.floor(result * digits + 0.5) / digits

  pid["control"] = result

  --check for too high/low values
  if pid["control"] < 0 then
    pid["control"] = 0
  end
  if pid["control"] > 100 - tonumber(SETTINGS["MinDamperValue"]) then
    pid["control"] = 100 - tonumber(SETTINGS["MinDamperValue"])
  end

  pid["control"] = 100 - pid["control"]

  --save current error as previous error for next iteration
  pid["prev_error"] = curr_error
end

function damperControl(DAMPER, damper_id, control_temp, set_point)
  if reg['damper' .. damper_id .. 'override'] == 1 then
    DAMPER['control'] = reg['damper' .. damper_id .. 'value']
  elseif reg['zone' .. damper_id .. 'control'] == 1 then
    if control_temp > 0 then
      updateDamperPIDValues(DAMPER, control_temp, set_point)
    end
  else
    DAMPER['control'] = 0
  end
  io['damper' .. damper_id .. 'position'] = DAMPER['control']
end

-- END DAMPER CONTROL FUNCTIONS

-- ZONE CONTROL & LOGGING FUNCTIONS

function initZone(zone_id)
  local ZONE = {}
  ZONE["temp_in_alarm"] = 0
  ZONE["email_sent"] = 0
  _G['ZONE_'..zone_id] = ZONE
end

function setFileName(ZONE, zone_prefix)
  local batch = ''
  local zstartup = dbOpen("zone_startup.db",'zonestartup')
  if zstartup ~= nil then
    batch = getZoneState(zstartup, zone_prefix..'batch')
    batch = batch:gsub('[%s]', '-')
    batch = batch:gsub('_', '-')
    batch = batch:gsub('[%c]', '')
  end
  dbClose(zstartup,'zonestartup')
  ZONE["file_name"] = string.format("%02d_%02d_%02d_%02d%02d%02d", nowTime.month, nowTime.mday, nowTime.year, nowTime.hour, nowTime.min, nowTime.sec).."_"..batch..".csv"
  if batch == '' then
    batch = ZONE["file_name"]
  end
  local fh = file.open(batch_logs_path..ZONE["file_name"], "w")
  local bfiles = dbOpen("batch_files.db",'batchfiles')
  if fh ~= nil and zstartup ~= nil and bfiles ~= nil then
    --add to batch files database
    if tableRowExists(bfiles, "batch_files", ZONE["file_name"]) == false then
      insertTableRow(bfiles, 'batch_files', {ZONE["file_name"], batch})
    end
    --write inital labels
    local output = "Date/Time"
    output = output..", ".."Zone"
    for i, label in ipairs(ZONE_LOG_COLUMNS) do
      output = output..", "..label
    end
    fh:write(output.." \n")
    dbClose(bfiles,'batchfiles')
    fh:close()
    reg[zone_prefix.."reset"] = 0
  else
    ZONE["file_name"] = ""
  end
end

function printData(filename, temps, zone_id, probe_ids)
  local fh = file.open(batch_logs_path..filename, "a")
  if fh ~= nil then
    nowTime = time.getComponents(time.now())
    local timestamp = string.format("%02d/%02d/%02d %02d:%02d:%02d", nowTime.month, nowTime.mday, nowTime.year, nowTime.hour, nowTime.min, nowTime.sec)
    local output = timestamp
    if ZONE_LABELS ~= nil then
      output = output..", "..ZONE_LABELS[zone_id]
    else
      output = output..", "..tonumber(zone_id)
    end
    for i, temp in ipairs(temps) do
      output = output..", "..temp
    end
    fh:write(output.."\n")
    fh:close()
    if reg["zone"..zone_id..'pfrptime'] ~= nil then
      updateEPATempAverages(zone_id,probe_ids)
    end
  end
end

function moveZoneBatch(ZONE1, zone1id, zone1prefix)
  reg[zone1prefix.."control"] = 0
  local zone2id = ""..reg[zone1prefix.."moveto"]
  if #zone2id == 1 then
    zone2id = "0"..reg[zone1prefix.."moveto"]
  end
  local zone2prefix = 'zone'..zone2id
  if reg[zone2prefix.."control"] == 0 then
    if reg[zone1prefix.."regime"] ~= nil then
      reg[zone2prefix.."regime"] = reg[zone1prefix.."regime"]
      reg[zone2prefix.."regtimer"] = reg[zone1prefix.."regtimer"]
    end
    if reg[zone1prefix.."pfrptime"] ~= nil then
      reg[zone2prefix.."pfrptime"] = reg[zone1prefix.."pfrptime"]
    end
    if reg[zone2prefix..str_movedfrom] ~= nil then
      reg[zone2prefix..str_movedfrom] = zone1id
    end
    _G['ZONE_'..zone2id]["file_name"] = ZONE1["file_name"]
    ZONE1["file_name"] = ""
    table.insert(UPDATE_ZONE_STARTUP_LATER,zone2id)
    reg[zone1prefix.."moveto"] = 0
    reg[zone2prefix.."reset"] = 0
  end
end

function updateZone(ZONE, zone_id, probe_ids)
  local update_zone_startup = false
  local logging_rate = SETTINGS["DataLoggingRate"] * 60
  local zone_prefix = "zone"..zone_id
  local moved_from = reg[zone_prefix..str_movedfrom]
  if reg[zone_prefix.."moveto"] ~= nil and reg[zone_prefix.."moveto"] < 0 then
    reg[zone_prefix.."moveto"] = 0
    ZONE["file_name"] = ""
    reg[zone_prefix.."control"] = 0
    update_zone_startup = true
  elseif reg[zone_prefix.."moveto"] ~= nil and reg[zone_prefix.."moveto"] > 0 then
    moveZoneBatch(ZONE, zone_id, zone_prefix)
    update_zone_startup = true
  elseif reg[zone_prefix.."control"] == 1 then
    local load_zone_active = reg['loadzone'..zone_id..'active']
    if load_zone_active ~= nil and load_zone_active ~= 0 then
      reg['loadzone'..zone_id..'active'] = 0
    end
    nowTime = time.getComponents(time.now())
    if reg[zone_prefix.."reset"] == 1 or ZONE["file_name"] == "" then
      if reg[zone_prefix.."pfrptime"] ~= nil then
        reg[zone_prefix.."pfrptime"] = 0
      end
      if SETTINGS["Regime1Duration"] then
        reg[zone_prefix.."regime"] = 1
        reg[zone_prefix.."regtimer"] = SETTINGS["Regime1Duration"] * 24 * 60 * 60
      end
      setFileName(ZONE, zone_prefix)
      update_zone_startup = true
    elseif moved_from ~= nil and moved_from > 0 then
        reg[zone_prefix..str_movedfrom] = 0
        update_zone_startup = true
    elseif reg[zone_prefix.."print"] == 0 then
      local log_values = zoneLogValues(zone_id, probe_ids)
      if log_values then
        reg[zone_prefix..'print'] = logging_rate
        printData(ZONE["file_name"], log_values, zone_id, probe_ids)
      end
      update_zone_startup = true
    elseif reg[zone_prefix.."print"] > logging_rate then
      reg[zone_prefix..'print'] = logging_rate
      update_zone_startup = true
    end
    local cur_regime = reg[zone_prefix.."regime"]
    regimeProgression(zone_id)
    if cur_regime ~= reg[zone_prefix.."regime"] then
      update_zone_startup = true
    end
  else
    reg[zone_prefix..'print'] = logging_rate
    if moved_from ~= nil and tonumber(moved_from) > 0 then
      local fromzone = ""..moved_from
      if #fromzone < 2 then
        fromzone = "0"..fromzone
      end
      if reg["zone"..fromzone.."moveto"] ~= nil then
        local zoneto = ""..reg["zone"..fromzone.."moveto"]
        if #zoneto < 2 then
          zoneto = "0"..zoneto
        end
        if zoneto ~= zone_id then
          reg[zone_prefix..str_movedfrom] = 0
        end
      end
    end
  end
  local print_update_rate = 300
  local remainder = reg[zone_prefix..'print'] % print_update_rate
  if update_zone_startup or remainder >= print_update_rate - 10 then
    updateZoneStartup(ZONE, zone_id)
  end
end

function regimeProgression(zn_id)
  if SETTINGS["Zone"..zn_id.."Regime".."Type"] == "warmup" then
    if reg["zone"..zn_id.."regtimer"] == 0 and reg["zone"..zn_id.."regime"] < 2 then
      reg["zone"..zn_id.."regime"] = reg["zone"..zn_id.."regime"] + 1
    end
  elseif SETTINGS["Zone"..zn_id.."Regime".."Type"] == "pfrp" then
    if reg["zone"..zn_id.."pfrptime"] < 4320 then
      reg["zone"..zn_id.."regime"] = 2
    else
      reg["zone"..zn_id.."regime"] = 3
    end
  end
end
-- END ZONE CONTROL & LOGGING FUNCTIONS

function updateDuctPressureAverage(blwr_id,array_limit,is_reversing_system)
  local duct_pref = "duct"..blwr_id
  if is_reversing_system then
    if reg["blower"..blwr_id.."direction"] == 1 then
      updateAverage(duct_pref.."pospressureavg", io[duct_pref.."pospressure"], array_limit)
      resetAverage(duct_pref.."negpressureavg")
      reg[duct_pref..'pressureavg'] = reg[duct_pref..'pospressureavg']
    else
      updateAverage(duct_pref.."negpressureavg", io[duct_pref.."negpressure"], array_limit)
      resetAverage(duct_pref.."pospressureavg")
      reg[duct_pref..'pressureavg'] = reg[duct_pref..'negpressureavg']
    end
  else
    updateAverage(duct_pref.."pressureavg", io[duct_pref.."pressure"], array_limit)
  end
end

function revLogic(bl_id,zones_online,top_avg,btm_avg,biofilter_temp,temp_sp,top_sp,btm_sp)
  if reg['blower'..bl_id..'revlogic'] == 0 then
    blowerDirectionTempControl(bl_id,zones_online,top_avg,btm_avg,biofilter_temp,top_sp,btm_sp)
  else
    blowerDirectionControl('blower'..bl_id,biofilter_temp,temp_sp,zones_online)
  end
end

function revLoadZoneActive(zn_id,bl_id,load_zone_active)
  if reg['loadzone'..zn_id..'active'] == 1 then
    load_zone_active = true
    reg["blower"..bl_id.."revoverride"] = 1
    reg["blower"..bl_id.."direction"] = 1
    reg["blower"..bl_id.."override"] = 1
    reg["blower"..bl_id.."control"] = 1
  end
  return load_zone_active
end

function revLoadZoneSetMaxBlwrSpeed(bl_id,load_zone_active,max_speed)
  if max_speed == nil then
    max_speed = 100
  end
  if load_zone_active and reg["blower"..bl_id.."idletimer"] == 0 then
      if io["blower"..bl_id.."revdamper"] == 1 then
      io["blower"..bl_id.."speed"] = max_speed
      reg["blower"..bl_id.."value"] = max_speed
    end
  end
end

function processWirelessSensorAge(start_pos, sensor_data)
  local pos = responseIndexOf(start_pos, "snid=")
  if pos ~= nil and pos > 0 then
    pos = pos + start_pos + 6
    local snid = responseSubstr(pos, pos+16)
    local pos2 = responseIndexOf(pos, "<Age>")+pos
    if pos2 ~= nil and pos > 0 then
      local pos3 = responseIndexOf(pos2, "</Age>") + pos2
      local value = responseSubstr(pos2+5, pos3)
      sensor_data[snid] = tonumber(value)
      processWirelessSensorAge(pos3, sensor_data)
    end
  end
end

function processWirelessSensorData(start_pos, sensor_data)
  local pos = responseIndexOf(start_pos, "ptid=")
  if pos ~= nil and pos > 0 then
    pos = pos + start_pos + 6
    local ptid = responseSubstr(pos, pos+18)
    local pos2 = responseIndexOf(pos, "<Value>")+pos
    if pos2 ~= nil and pos > 0 then
      local pos3 = responseIndexOf(pos2, "</Value>") + pos2
      local value = responseSubstr(pos2+7, pos3)
      sensor_data[ptid] = tonumber(value)
      processWirelessSensorData(pos3, sensor_data)
    end
  end
end

function retrieveWirelessSensorData()
  local result_code = httpRequest("http://"..SETTINGS["WirelessBaseStationIP"].."/xmldata", 2500)
  local sensor_data = {}
  if result_code ~= nil and result_code > 0 then
    processWirelessSensorData(0, sensor_data)
    processWirelessSensorAge(0, sensor_data)
  end
  return sensor_data
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

function ioAppearsValid(io_name)
  return (io[io_name] ~= nil and io[io_name] == io[io_name])
end

function getNumericSetting(setting_name, default)
  if SETTINGS[setting_name] ~= nil then
    return tonumber(SETTINGS[setting_name])
  elseif default ~= nil then
    return tonumber(default)
  else
    return 0
  end
end

function sendInitAlarm()
  emailDef = {
    rcpt = "grp.admin",
    subj = "WebMACS Restarted",
    body = "The WebMACS system has restarted and is running the initialization sequence."
  }
  email(emailDef)
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
    sleep(SETTINGS['DamperRate'] * 1000)
    updateDampers()
  end
end
