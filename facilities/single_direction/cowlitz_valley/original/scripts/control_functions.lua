function load_db_values()
	local db = sqlite3.open("/usb/settings.db");

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
  print("Current Error: " .. curr_error)
	--limit integral windup
  print("Initial Blower Error: " .. pid["int_error"])
	if tonumber(pid["int_error"]) < tonumber(SETTINGS["MinVFDSpeed"]) then
		pid["int_error"] = SETTINGS["MinVFDSpeed"]
	end
	if tonumber(pid["int_error"]) > 100 then
		pid["int_error"] = 100
	end
  
  print("Blower Error: " .. pid["int_error"])

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
	
	print("Blower Value: " .. result)
end

function zone_update(pid, current_temp, set_point, dt)
  if current_temp ~= current_temp then
    current_temp = set_point
  end
  if set_point == 0 then
      set_point = current_temp
  end
  print("Curr Temp: " .. current_temp .. " Set Point: " .. set_point)
	local curr_error = 100 - (tonumber(current_temp) / tonumber(set_point)) * 100
	local diff
	local p_term
	local i_term
	local d_term
  
  print("DT: " .. dt)
  print("CurError: " .. curr_error)

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
  
  print("Int Error: " .. pid["int_error"])
  print("Diff: " .. diff .. " Prev Error: " .. pid["prev_error"])

	--scaling
	p_term = tonumber(SETTINGS["ZoneGain"]) * curr_error
	i_term = tonumber(SETTINGS["ZoneIntegral"]) * pid["int_error"]
	d_term = tonumber(SETTINGS["ZoneDerivative"]) * diff

  print("Terms -- P: " .. p_term .. " I: " .. i_term .. " D: " .. d_term)
  
	--summation of terms
	local result = p_term + i_term + d_term
	--round to 2 decimal places
	digits = 10 ^ 2
 	result = math.floor(result * digits + 0.5) / digits
  
	pid["control"] = result
	
	print("Damper Value for " .. pid["file_name"] .. ":" .. result)
	
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
	local bfiles = sqlite3.open("/usb/batch_files.db")
	local query = [[DELETE FROM batch_files WHERE name="]] .. ZONE["file_name"].. [["; INSERT INTO batch_files VALUES (NULL, "]] .. ZONE["file_name"].. [[");]]
	bfiles:exec(query)
	bfiles:close()
	--write inital labels
	local fh = file.open(ZONE["file_name"], "w")
	if fh ~= nil then
		fh:write("Date/Time, Temperature \n")
		fh:close()
	end
end

function printData(filename, temp)
	local fh = file.open(filename, "a")
	if fh ~= nil then
		fh:write(string.format("%02d/%02d/%02d %02d:%02d:%02d", nowTime.month, nowTime.mday, nowTime.year, nowTime.hour, nowTime.min, nowTime.sec) .. ", " .. temp .. "\n")
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

while true do
	sleep(60000)
	if reg.zone1control == 1 then
		if io.zone1Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone1Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email1Sent == 0 then
				sendAlarm("Zone 1", io.zone1Temp)
				email1Sent = 1
			end
		else
			email1Sent = 0
		end
	end
	if reg.zone2control == 1 then
		if io.zone2Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone2Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email2Sent == 0 then
				sendAlarm("Zone 2", io.zone2Temp)
				email2Sent = 1
			end
		else
			email2Sent = 0
		end
	end
	if reg.zone3control == 1 then
		if io.zone3Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone3Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email3Sent == 0 then
				sendAlarm("Zone 3", io.zone3Temp)
				email3Sent = 1
			end
		else
			email3Sent = 0
		end
	end
	if reg.zone4control == 1 then
		if io.zone4Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone4Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email4Sent == 0 then
				sendAlarm("Zone 4", io.zone4Temp)
				email4Sent = 1
			end
		else
			email4Sent = 0
		end
	end
	if reg.zone5control == 1 then
		if io.zone5Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone5Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email5Sent == 0 then
				sendAlarm("Zone 5", io.zone5Temp)
				email5Sent = 1
			end
		else
			email5Sent = 0
		end
	end
	if reg.zone6control == 1 then
		if io.zone6Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone6Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email6Sent == 0 then
				sendAlarm("Zone 6", io.zone6Temp)
				email6Sent = 1
			end
		else
			email6Sent = 0
		end
	end
	if reg.zone7control == 1 then
		if io.zone7Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone7Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email7Sent == 0 then
				sendAlarm("Zone 7", io.zone7Temp)
				email7Sent = 1
			end
		else
			email7Sent = 0
		end
	end
	if reg.zone8control == 1 then
		if io.zone8Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone8Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email8Sent == 0 then
				sendAlarm("Zone 8", io.zone8Temp)
				email8Sent = 1
			end
		else
			email8Sent = 0
		end
	end
	if reg.zone9control == 1 then
		if io.zone9Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone9Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email9Sent == 0 then
				sendAlarm("Zone 9", io.zone9Temp)
				email9Sent = 1
			end
		else
			email9Sent = 0
		end
	end
	if reg.zone10control == 1 then
		if io.zone10Temp < tonumber(SETTINGS["MinTemperatureAlarm"]) or io.zone10Temp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
			if email10Sent == 0 then
				sendAlarm("Zone 10", io.zone10Temp)
				email10Sent = 1
			end
		else
			email10Sent = 0
		end
	end
  if io.blower1fault < 2 then
    if emailBlower1 == 0 then
      sendAlarm("Blower 1", "Fault")
      emailBlower1 = 1
    end
  else
    emailBlower1 = 0
  end
  if io.blower2fault < 2 then
    if emailBlower2 == 0 then
      sendAlarm("Blower 2", "Fault")
      emailBlower2 = 1
    end
  else
    emailBlower2 = 0
  end
end