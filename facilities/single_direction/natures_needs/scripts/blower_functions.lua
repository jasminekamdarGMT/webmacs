function updateBlowerPIDValues(pid, current_temp, set_point, dt)
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

  --integration
  pid["int_error"] = tonumber(pid["int_error"]) + curr_error * dt
  --limit integral windup
  if pid["int_error"] < 0 then
    pid["int_error"] = 0
  end
  if pid["int_error"] > 100 - tonumber(SETTINGS["MinVFDSpeed"]) then
    pid["int_error"] = 100 - tonumber(SETTINGS["MinVFDSpeed"])
  end

  --differentiation
  diff = (curr_error - tonumber(pid["prev_error"])) / dt

  --scaling
  p_term = tonumber(SETTINGS["BlowerGain"]) * curr_error
  i_term = tonumber(SETTINGS["BlowerIntegral"]) * pid["int_error"]
  d_term = tonumber(SETTINGS["BlowerDerivative"]) * diff

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
  if pid["control"] > 100 - tonumber(SETTINGS["MinVFDSpeed"]) then
    pid["control"] = 100 - tonumber(SETTINGS["MinVFDSpeed"])
  end

  pid["control"] = 100 - pid["control"]

  --save current error as previous error for next iteration
  pid["prev_error"] = curr_error
end

function updateBlowerRunValue(blower_prefix, new_value)
  if reg[blower_prefix .. 'cycle'] < SETTINGS['BlowerCycleOffTime'] * 60 then
    io[blower_prefix .. 'run'] = 0
    if reg[blower_prefix .. 'cycle'] == 0 then
      reg[blower_prefix .. 'cycle'] = SETTINGS['BlowerCycleTotalTime'] * 60
    end
  else
    io[blower_prefix .. 'run'] = new_value
  end
end

function blowerControl(BLOWER, blower_prefix, temp_average, temp_setpoint)
  if reg[blower_prefix .. 'override'] == 0 then
    if temp_average == 0 then
      reg[blower_prefix .. 'control'] = 0
    elseif temp_average > 0 and io[blower_prefix .. 'fault'] > 0 then
      reg[blower_prefix .. 'control'] = 1
    end
  end
	if reg[blower_prefix .. 'control'] == 1 then
    updateBlowerPIDValues(BLOWER, temp_average, temp_setpoint, SETTINGS['BlowerRate'])
    if io[blower_prefix .. 'fault'] > 0 and reg[blower_prefix .. 'override'] == 0 then
      io[blower_prefix .. 'speed'] = BLOWER["control"]
      reg[blower_prefix .. 'value'] = BLOWER["control"]
    elseif reg[blower_prefix .. 'override'] == 1 then
      io[blower_prefix .. 'speed'] = reg[blower_prefix .. 'value']
    else
      io[blower_prefix .. 'speed'] = 0
    end
  else
    io[blower_prefix .. 'speed'] = 0
  end
  updateBlowerRunValue(blower_prefix, reg[blower_prefix .. 'control'])
end

function blowerFaultAlarm(BLOWER, blower_id, blower_title)
  if io['blower' .. blower_id .. 'fault'] == 0 then
    if BLOWER['fault_email'] == 0 then
      sendAlarm(blower_title, "Fault")
      BLOWER['fault_email'] = 1
    end
  else
    BLOWER['fault_email'] = 0
  end
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(SETTINGS['BlowerRate'] * 1000)
    updateBlowers()
  end
end
