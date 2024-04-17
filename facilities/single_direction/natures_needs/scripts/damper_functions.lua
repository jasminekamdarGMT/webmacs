
function updateDamperPIDValues(pid, current_temp, set_point, dt)
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

function damperControl(DAMPER, damper_id)
  last_valid_temp = reg['duct' .. damper_id .. 'lvtemp']
  if last_valid_temp then
    updateDamperPIDValues(DAMPER, reg['duct' .. damper_id .. 'lvtemp'], SETTINGS['DamperTempSetPoint'], SETTINGS['DamperRate'])
    io['damper' .. damper_id .. 'position'] = DAMPER['control']
  end
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(SETTINGS['DamperRate'] * 1000)
    updateDampers()
  end
end
