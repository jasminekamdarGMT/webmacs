sleep(30000)
while true do
	sleep(SETTINGS["ZoneRate"] * 1000)
	nowTime = time.getComponents(time.now())
	load_db_values()
	if reg.zone1control == 1 and io.zone1Temp == io.zone1Temp then
		if ZONE1["file_name"] == "" then
			setFileName(ZONE1, "zone1")
			if reg.zone1regime == 0 then
				reg.zone1regime = 1
				reg.zone1batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone1regime == 1 then
			ZONE1["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone1regime == 2 then
			ZONE1["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone1regime == 3 then
			ZONE1["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone1batch == 0 and reg.zone1regime < 3 then
			reg.zone1regime = reg.zone1regime + 1
			if reg.zone1regime == 2 then
				reg.zone1batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone1timer == 0 and reg.zone1override == 0 then
			zone_update(ZONE1, io.zone1Temp , ZONE1["set_point"] , SETTINGS["ZoneRate"])
			io.zone1Damper = ZONE1["control"]
			reg.zone1value = ZONE1["control"]
			reg.zone1timer = SETTINGS["ZoneRate"]
		elseif reg.zone1override == 1 then
			io.zone1Damper = reg.zone1value
		end
		if reg.zone1print == 0 then
			printData(ZONE1["file_name"], io.zone1Temp)
			reg.zone1print = SETTINGS["DataLoggingRate"] * 60
		end
	elseif reg.zone1control == 1 then
		print("Error!")
	else
		io.zone1Damper = 0
		ZONE1["file_name"] = ""
		reg.zone1regime = 0
		reg.zone1print = 0
		reg.zone1timer = 0
		reg.zone1batch = 0
	end
	if reg.zone2control == 1 and io.zone2Temp == io.zone2Temp then
		if ZONE2["file_name"] == "" then
			setFileName(ZONE2, "zone2")
			if reg.zone2regime == 0 then
				reg.zone2regime = 1
				reg.zone2batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone2regime == 1 then
			ZONE2["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone2regime == 2 then
			ZONE2["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone2regime == 3 then
			ZONE2["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone2batch == 0 and reg.zone2regime < 3 then
			reg.zone2regime = reg.zone2regime + 1
			if reg.zone2regime == 2 then
				reg.zone2batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone2timer == 0 and reg.zone2override == 0 then
			zone_update(ZONE2, io.zone2Temp , ZONE2["set_point"] , SETTINGS["ZoneRate"])
			io.zone2Damper = ZONE2["control"]
			reg.zone2value = ZONE2["control"]
			reg.zone2timer = SETTINGS["ZoneRate"]
		elseif reg.zone2override == 1 then
			io.zone2Damper = reg.zone2value
		end
		if reg.zone2print == 0 then
			printData(ZONE2["file_name"], io.zone2Temp)
			reg.zone2print = SETTINGS["DataLoggingRate"] * 60
		end	
	elseif reg.zone2control == 1 then
		print("Error!")		
	else
		io.zone2Damper = 0
		ZONE2["file_name"] = ""
		reg.zone2regime = 0
		reg.zone2print = 0
		reg.zone2timer = 0
		reg.zone2batch = 0
	end
	if reg.zone3control == 1 and io.zone3Temp == io.zone3Temp then
		if ZONE3["file_name"] == "" then
			setFileName(ZONE3, "zone3")
			if reg.zone3regime == 0 then
				reg.zone3regime = 1
				reg.zone3batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone3regime == 1 then
			ZONE3["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone3regime == 2 then
			ZONE3["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone3regime == 3 then
			ZONE3["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone3batch == 0 and reg.zone3regime < 3 then
			reg.zone3regime = reg.zone3regime + 1
			if reg.zone3regime == 2 then
				reg.zone3batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone3timer == 0 and reg.zone3override == 0 then
			zone_update(ZONE3, io.zone3Temp , ZONE3["set_point"] , SETTINGS["ZoneRate"])
			io.zone3Damper = ZONE3["control"]
			reg.zone3value = ZONE3["control"]
			reg.zone3timer = SETTINGS["ZoneRate"]
		elseif reg.zone3override == 1 then
			io.zone3Damper = reg.zone3value
		end
		if reg.zone3print == 0 then
			printData(ZONE3["file_name"], io.zone3Temp)
			reg.zone3print = SETTINGS["DataLoggingRate"] * 60
		end		
	elseif reg.zone3control == 1 then
		print("Error!")	
	else
		io.zone3Damper = 0
		ZONE3["file_name"] = ""
		reg.zone3regime = 0
		reg.zone3print = 0
		reg.zone3timer = 0
		reg.zone3batch = 0
	end
	if reg.zone4control == 1 and io.zone4Temp == io.zone4Temp then
		if ZONE4["file_name"] == "" then
			setFileName(ZONE4, "zone4")
			if reg.zone4regime == 0 then
				reg.zone4regime = 1
				reg.zone4batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone4regime == 1 then
			ZONE4["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone4regime == 2 then
			ZONE4["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone4regime == 3 then
			ZONE4["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone4batch == 0 and reg.zone4regime < 3 then
			reg.zone4regime = reg.zone4regime + 1
			if reg.zone4regime == 2 then
				reg.zone4batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone4timer == 0 and reg.zone4override == 0 then
			zone_update(ZONE4, io.zone4Temp , ZONE4["set_point"] , SETTINGS["ZoneRate"])
			io.zone4Damper = ZONE4["control"]
			reg.zone4value = ZONE4["control"]
			reg.zone4timer = SETTINGS["ZoneRate"]
		elseif reg.zone4override == 1 then
			io.zone4Damper = reg.zone4value
		end
		if reg.zone4print == 0 then
			printData(ZONE4["file_name"], io.zone4Temp)
			reg.zone4print = SETTINGS["DataLoggingRate"] * 60
		end	
	elseif reg.zone4control == 1 then
		print("Error!")		
	else
		io.zone4Damper = 0
		ZONE4["file_name"] = ""
		reg.zone4regime = 0
		reg.zone4print = 0
		reg.zone4timer = 0
		reg.zone4batch = 0
	end
	if reg.zone5control == 1 and io.zone5Temp == io.zone5Temp then
		if ZONE5["file_name"] == "" then
			setFileName(ZONE5, "zone5")
			if reg.zone5regime == 0 then
				reg.zone5regime = 1
				reg.zone5batch = SETTINGS["R1Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone5regime == 1 then
			ZONE5["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg.zone5regime == 2 then
			ZONE5["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg.zone5regime == 3 then
			ZONE5["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg.zone5batch == 0 and reg.zone5regime < 3 then
			reg.zone5regime = reg.zone5regime + 1
			if reg.zone5regime == 2 then
				reg.zone5batch = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg.zone5timer == 0 and reg.zone5override == 0 then
			zone_update(ZONE5, io.zone5Temp , ZONE5["set_point"] , SETTINGS["ZoneRate"])
			io.zone5Damper = ZONE5["control"]
			reg.zone5value = ZONE5["control"]
			reg.zone5timer = SETTINGS["ZoneRate"]
		elseif reg.zone5override == 1 then
			io.zone5Damper = reg.zone5value
		end
		if reg.zone5print == 0 then
			printData(ZONE5["file_name"], io.zone5Temp)
			reg.zone5print = SETTINGS["DataLoggingRate"] * 60
		end	
	elseif reg.zone5control == 1 then
		print("Error!")		
	else
		io.zone5Damper = 0
		ZONE5["file_name"] = ""
		reg.zone5regime = 0
		reg.zone5print = 0
		reg.zone5timer = 0
		reg.zone5batch = 0
	end
end