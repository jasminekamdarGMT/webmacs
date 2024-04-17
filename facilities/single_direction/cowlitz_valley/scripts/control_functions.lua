function load_db_values()
	local db = sqlite3.open(webmacs_db_path .. "settings.db");

	for row in db:rows('SELECT * FROM settings') do
		SETTINGS[row[2]] = row[3]
	end
	
	db:close()
end

function blower_update(pid, current_temp, set_point, dt)
	local curr_error = -(current_temp - set_point)
	local diff
	local p_term
	local i_term
	local d_term

	--integration
  if pid["int_error"] ~= pid["int_error"] then
    pid["int_error"] = 0
  end
	pid["int_error"] = pid["int_error"] + curr_error * dt
  if not luatest_running then print("Current Error: " .. curr_error) end
	--limit integral windup
  if not luatest_running then print("Initial Blower Error: " .. pid["int_error"]) end
	if tonumber(pid["int_error"]) < tonumber(SETTINGS["MinVFDSpeed"]) then
		pid["int_error"] = SETTINGS["MinVFDSpeed"]
	end
	if tonumber(pid["int_error"]) > 100 then
		pid["int_error"] = 100
	end
  
  if not luatest_running then print("Blower Error: " .. pid["int_error"]) end

	--differentiation
	diff = (curr_error - pid["prev_error"]) / dt

	--scaling
	p_term = SETTINGS["BlowerGain"] * curr_error
	i_term = SETTINGS["BlowerIntegral"] * pid["int_error"]
	d_term = SETTINGS["BlowerDerivative"] * diff

	--summation of terms
	result = p_term + i_term + d_term
	--round to 2 decimal places
	digits = 10 ^ 2
 	result = math.floor(result * digits + 0.5) / digits
	pid["control"] = result
	
	--check for too high/low values
	if tonumber(pid["control"]) < tonumber(SETTINGS["MinVFDSpeed"]) then
		pid["control"] = SETTINGS["MinVFDSpeed"]
	end
	if tonumber(pid["control"]) > 100 then
		pid["control"] = 100
	end
	
	--save current error as previous error for next iteration
  if curr_error ~= curr_error then
    pid["prev_error"] = 0
  else
		pid["prev_error"] = curr_error
  end
	
	if not luatest_running then print("Blower Value: " .. result) end
end

function zone_update(pid, current_temp, set_point, dt)
  if current_temp ~= current_temp then
    current_temp = set_point
  end
  if set_point == 0 then
      set_point = current_temp
  end
  if not luatest_running then print("Curr Temp: " .. current_temp .. " Set Point: " .. set_point) end
	local curr_error = 100 - (tonumber(current_temp) / tonumber(set_point)) * 100
	local diff
	local p_term
	local i_term
	local d_term
  
	if not luatest_running then
	  print("DT: " .. dt)
		print("CurError: " .. curr_error)
	end

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
  
	if not luatest_running then
	  print("Int Error: " .. pid["int_error"])
		print("Diff: " .. diff .. " Prev Error: " .. pid["prev_error"])
	end

	--scaling
	p_term = tonumber(SETTINGS["ZoneGain"]) * curr_error
	i_term = tonumber(SETTINGS["ZoneIntegral"]) * pid["int_error"]
	d_term = tonumber(SETTINGS["ZoneDerivative"]) * diff

  if not luatest_running then print("Terms -- P: " .. p_term .. " I: " .. i_term .. " D: " .. d_term) end
  
	--summation of terms
	local result = p_term + i_term + d_term
	--round to 2 decimal places
	digits = 10 ^ 2
 	result = math.floor(result * digits + 0.5) / digits
  
	pid["control"] = result
	
	if not luatest_running then print("Damper Value for " .. pid["file_name"] .. ":" .. result) end
	
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

function setFileName(ZONE, zone)
	ZONE["file_name"] = "/usb/" .. string.format("%02d_%02d_%02d", nowTime.month, nowTime.mday, nowTime.year) .. "_" .. zone .. ".csv"
	--add to batch files database
	local bfiles = sqlite3.open(webmacs_db_path .. "batch_files.db")
	local query = [[DELETE FROM batch_files WHERE name="]] .. ZONE["file_name"].. [["; INSERT INTO batch_files VALUES (NULL, "]] .. ZONE["file_name"].. [[");]]
	bfiles:exec(query)
	bfiles:close()
	--write inital labels
	local fh = file.open(ZONE["file_name"], "w")
	if fh ~= nil then
		fh:write("Date/Time, Temperature, Damper \n")
		fh:close()
	end
end

function printData(filename, temp, damper)
	local fh = file.open(filename, "a")
	if fh ~= nil then
		fh:write(string.format("%02d/%02d/%02d %02d:%02d:%02d", nowTime.month, nowTime.mday, nowTime.year, nowTime.hour, nowTime.min, nowTime.sec) .. ", " .. temp .. ", " .. damper .. "\n")
		fh:close()
	end
end

function sendAlarm(desc, reading)
	emailDef = {
		rcpt = "grp.admin",
		subj = [[Alarm raised on ]] .. desc .. [[!]],
		body = [[An alarm was raised on ]] .. desc .. [[.  The reading is: ]] .. reading .. [[.]]
	}
	email(emailDef)
end

function zoneTempAlarm(ZONE, zone_number)
	if reg['zone' .. zone_number .. 'control'] == 1 then
		zoneTemp = io['zone' .. zone_number .. 'Temp']
		if zoneTemp < tonumber(SETTINGS["MinTemperatureAlarm"]) or zoneTemp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			ZONE['temp_in_alarm'] = ZONE['temp_in_alarm'] + 1
		else
			ZONE['temp_in_alarm'] = 0
		end
		if ZONE['temp_in_alarm'] > 4 then
			if ZONE['email_sent'] == 0 then
				sendAlarm("Zone " .. zone_number, zoneTemp)
				ZONE['email_sent'] = 1
			end
		else
			ZONE['email_sent'] = 0
		end
	end
end

function blowerFaultAlarm(blower_number)
	if io['blower' .. blower_number .. 'fault'] < 2 then
    if _G['emailBlower' .. blower_number] == 0 then
      sendAlarm("Blower " .. blower_number, "Fault")
      _G['emailBlower' .. blower_number] = 1
    end
  else
    _G['emailBlower' .. blower_number] = 0
  end
end

function alarmLoop()
	zoneTempAlarm(ZONE1, 1)
	zoneTempAlarm(ZONE2, 2)
	zoneTempAlarm(ZONE3, 3)
	zoneTempAlarm(ZONE4, 4)
	zoneTempAlarm(ZONE5, 5)
	zoneTempAlarm(ZONE6, 6)
	zoneTempAlarm(ZONE7, 7)
	zoneTempAlarm(ZONE8, 8)
	zoneTempAlarm(ZONE9, 9)
	zoneTempAlarm(ZONE10, 10)
	blowerFaultAlarm(1)
  blowerFaultAlarm(2)
end

if not luatest_running then
	print('Starting alarm control loop...')
	while true do
		sleep(60000)
		alarmLoop()
	end
end
