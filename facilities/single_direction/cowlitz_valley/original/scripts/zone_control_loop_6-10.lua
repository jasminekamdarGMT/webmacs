sleep(30000)
while true do
	sleep(SETTINGS["ZoneRate"] * 1000) --sleep
  
	nowTime = time.getComponents(time.now())
	--Zone 6
	if reg.zone6control == 1 and io.zone6Temp == io.zone6Temp then
		if ZONE6["file_name"] == "" then
			setFileName(ZONE6, "zone6")
			if reg.zone6regime == 0 then
				reg.zone6regime = 1
				reg.zone6batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone6regime == 1 then
			ZONE6["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone6regime == 2 then
			ZONE6["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone6regime == 3 then
			ZONE6["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone6batch == 0 and reg.zone6regime < 3 then
			reg.zone6regime = reg.zone6regime + 1
			if reg.zone6regime == 2 then
				reg.zone6batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone6timer == 0 and reg.zone6override == 0 then
			zone_update(ZONE6, io.zone6Temp , ZONE6["set_point"] , SETTINGS["ZoneRate"])
			io.zone6Damper = ZONE6["control"]
			reg.zone6value = ZONE6["control"]
			reg.zone6timer = SETTINGS["ZoneRate"]
		elseif reg.zone6override == 1 then
			io.zone6Damper = reg.zone6value
		end
		if reg.zone6print == 0 then
			printData(ZONE6["file_name"], io.zone6Temp)
			reg.zone6print = SETTINGS["DataLoggingRate"] * 60
		end	
	elseif reg.zone6control == 1 then
		print("Error!")		
	else
		io.zone6Damper = 0
		ZONE6["file_name"] = ""
		reg.zone6regime = 0
		reg.zone6print = 0
		reg.zone6timer = 0
		reg.zone6batch = 0
	end
	--Zone 7
	if reg.zone7control == 1 and io.zone7Temp == io.zone7Temp then
		if ZONE7["file_name"] == "" then
			setFileName(ZONE7, "zone7")
			if reg.zone7regime == 0 then
				reg.zone7regime = 1
				reg.zone7batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone7regime == 1 then
			ZONE7["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone7regime == 2 then
			ZONE7["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone7regime == 3 then
			ZONE7["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone7batch == 0 and reg.zone7regime < 3 then
			reg.zone7regime = reg.zone7regime + 1
			if reg.zone7regime == 2 then
				reg.zone7batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone7timer == 0 and reg.zone7override == 0 then
			zone_update(ZONE7, io.zone7Temp , ZONE7["set_point"] , SETTINGS["ZoneRate"])
			io.zone7Damper = ZONE7["control"]
			reg.zone7value = ZONE7["control"]
			reg.zone7timer = SETTINGS["ZoneRate"]
		elseif reg.zone7override == 1 then
			io.zone7Damper = reg.zone7value
		end
		if reg.zone7print == 0 then
			printData(ZONE7["file_name"], io.zone7Temp)
			reg.zone7print = SETTINGS["DataLoggingRate"] * 60
		end		
	elseif reg.zone7control == 1 then
		print("Error!")	
	else
		io.zone7Damper = 0
		ZONE7["file_name"] = ""
		reg.zone7regime = 0
		reg.zone7print = 0
		reg.zone7timer = 0
		reg.zone7batch = 0
	end
	--Zone 8
	if reg.zone8control == 1 and io.zone8Temp == io.zone8Temp then
		if ZONE8["file_name"] == "" then
			setFileName(ZONE8, "zone8")
			if reg.zone8regime == 0 then
				reg.zone8regime = 1
				reg.zone8batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone8regime == 1 then
			ZONE8["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone8regime == 2 then
			ZONE8["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone8regime == 3 then
			ZONE8["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone8batch == 0 and reg.zone8regime < 3 then
			reg.zone8regime = reg.zone8regime + 1
			if reg.zone8regime == 2 then
				reg.zone8batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone8timer == 0 and reg.zone8override == 0 then
			zone_update(ZONE8, io.zone8Temp , ZONE8["set_point"] , SETTINGS["ZoneRate"])
			io.zone8Damper = ZONE8["control"]
			reg.zone8value = ZONE8["control"]
			reg.zone8timer = SETTINGS["ZoneRate"]
		elseif reg.zone8override == 1 then
			io.zone8Damper = reg.zone8value
		end
		if reg.zone8print == 0 then
			printData(ZONE8["file_name"], io.zone8Temp)
			reg.zone8print = SETTINGS["DataLoggingRate"] * 60
		end		
	elseif reg.zone8control == 1 then
		print("Error!")	
	else
		io.zone8Damper = 0
		ZONE8["file_name"] = ""
		reg.zone8regime = 0
		reg.zone8print = 0
		reg.zone8timer = 0
		reg.zone8batch = 0
	end
	--Zone 9
	if reg.zone9control == 1 and io.zone9Temp == io.zone9Temp then
		if ZONE9["file_name"] == "" then
			setFileName(ZONE9, "zone9")
			if reg.zone9regime == 0 then
				reg.zone9regime = 1
				reg.zone9batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone9regime == 1 then
			ZONE9["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone9regime == 2 then
			ZONE9["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone9regime == 3 then
			ZONE9["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone9batch == 0 and reg.zone9regime < 3 then
			reg.zone9regime = reg.zone9regime + 1
			if reg.zone9regime == 2 then
				reg.zone9batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone9timer == 0 and reg.zone9override == 0 then
			zone_update(ZONE9, io.zone9Temp , ZONE9["set_point"] , SETTINGS["ZoneRate"])
			io.zone9Damper = ZONE9["control"]
			reg.zone9value = ZONE9["control"]
			reg.zone9timer = SETTINGS["ZoneRate"]
		elseif reg.zone9override == 1 then
			io.zone9Damper = reg.zone9value
		end
		if reg.zone9print == 0 then
			printData(ZONE9["file_name"], io.zone9Temp)
			reg.zone9print = SETTINGS["DataLoggingRate"] * 60
		end		
	elseif reg.zone9control == 1 then
		print("Error!")	
	else
		io.zone9Damper = 0
		ZONE9["file_name"] = ""
		reg.zone9regime = 0
		reg.zone9print = 0
		reg.zone9timer = 0
		reg.zone9batch = 0
	end
	--Zone 10
	if reg.zone10control == 1 and io.zone10Temp == io.zone10Temp then
		if ZONE10["file_name"] == "" then
			setFileName(ZONE10, "zone10")
			if reg.zone10regime == 0 then
				reg.zone10regime = 1
				reg.zone10batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone10regime == 1 then
			ZONE10["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone10regime == 2 then
			ZONE10["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone10regime == 3 then
			ZONE10["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone10batch == 0 and reg.zone10regime < 3 then
			reg.zone10regime = reg.zone10regime + 1
			if reg.zone10regime == 2 then
				reg.zone10batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone10timer == 0 and reg.zone10override == 0 then
			zone_update(ZONE10, io.zone10Temp , ZONE10["set_point"] , SETTINGS["ZoneRate"])
			io.zone10Damper = ZONE10["control"]
			reg.zone10value = ZONE10["control"]
			reg.zone10timer = SETTINGS["ZoneRate"]
		elseif reg.zone10override == 1 then
			io.zone10Damper = reg.zone10value
		end
		if reg.zone10print == 0 then
			printData(ZONE10["file_name"], io.zone10Temp)
			reg.zone10print = SETTINGS["DataLoggingRate"] * 60
		end		
	elseif reg.zone10control == 1 then
		print("Error!")	
	else
		io.zone10Damper = 0
		ZONE10["file_name"] = ""
		reg.zone10regime = 0
		reg.zone10print = 0
		reg.zone10timer = 0
		reg.zone10batch = 0
	end
end