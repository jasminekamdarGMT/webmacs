function updateLVTemp(zone_prefix)
  local io_appears_valid = io[zone_prefix .. 'Temp'] ~= nil and io[zone_prefix .. 'Temp'] == io[zone_prefix .. 'Temp']
  if io_appears_valid and io[zone_prefix .. 'Temp'] < 185 then
    reg[zone_prefix .. 'lvtemp'] = io[zone_prefix .. 'Temp']
  end
end

function updateTempAverage(zone_prefix)
  local io_appears_valid = io[zone_prefix .. 'Temp'] ~= nil and io[zone_prefix .. 'Temp'] == io[zone_prefix .. 'Temp']
  if io_appears_valid and io[zone_prefix .. 'Temp'] < 185 then
    table.insert(TEMP_AVG_ARRAYS[zone_prefix], 1, io[zone_prefix .. 'Temp'])
    local count = 0
    local sum_of_temps = 0
    for k, value in pairs(TEMP_AVG_ARRAYS[zone_prefix]) do
      count = count + 1
      if count <= 10 then
        sum_of_temps = sum_of_temps + value
      end
    end
    if count > 10 then
      table.remove(TEMP_AVG_ARRAYS[zone_prefix])
      count = count - 1
    end
    reg[zone_prefix .. 'avgtemp'] = sum_of_temps / count
  end
end

function updateDamperAverage(zone_prefix)
	if reg[zone_prefix .. 'control'] == 1 and reg[zone_prefix .. 'avgtimer'] == 0 then
		local io_appears_valid = io[zone_prefix .. 'Damper'] ~= nil and io[zone_prefix .. 'Damper'] == io[zone_prefix .. 'Damper']
		if io_appears_valid then
			table.insert(DAMPER_AVG_ARRAYS[zone_prefix], 1, io[zone_prefix .. 'Damper'])
			local count = 0
			local sum_of_positions = 0
			local sample_limit = SETTINGS["DataLoggingRate"] / 10
			for k, value in pairs(DAMPER_AVG_ARRAYS[zone_prefix]) do
				count = count + 1
				if count <= sample_limit then
					sum_of_positions = sum_of_positions + value
				end
			end
			if count > sample_limit then
				table.remove(DAMPER_AVG_ARRAYS[zone_prefix])
				count = count - 1
			end
			reg[zone_prefix .. 'avgdamper'] = sum_of_positions / count
			reg[zone_prefix .. 'avgtimer'] = 600 -- set timer for ten minutes
		end
	end
end

function zoneControlLoop(ZONE, zone_prefix)
	updateLVTemp(zone_prefix)
	local control_temp = 0
	if reg[zone_prefix .. 'lvtemp'] and reg[zone_prefix .. 'lvtemp'] > 0 then
		control_temp = reg[zone_prefix .. 'lvtemp']
	end
	if reg[zone_prefix .. 'control'] == 1 then
		if reg[zone_prefix .. 'reset'] == 1 or ZONE["file_name"] == "" then
			reg[zone_prefix .. 'reset'] = 0
			ZONE["file_name"] = ""
			setFileName(ZONE, zone_prefix)
			reg[zone_prefix .. 'batch'] = SETTINGS["R1Duration"] * 24 * 60 * 60
			reg[zone_prefix .. 'regime'] = 1
			reg[zone_prefix .. 'print'] = SETTINGS["DataLoggingRate"] * 60
			reg[zone_prefix .. 'timer'] = 0
			update_zones()
		end
		if reg[zone_prefix .. 'batch'] == 0 and reg[zone_prefix .. 'regime'] < 3 then
			reg[zone_prefix .. 'regime'] = reg[zone_prefix .. 'regime'] + 1
			if reg[zone_prefix .. 'regime'] == 2 then
				reg[zone_prefix .. 'batch'] = SETTINGS["R2Duration"] * 24 * 60 * 60
			end
		end
		if reg[zone_prefix .. 'regime'] == 1 then
			ZONE["set_point"] = SETTINGS["R1TempSetPoint"]
		elseif reg[zone_prefix .. 'regime'] == 2 then
			ZONE["set_point"] = SETTINGS["R2TempSetPoint"]
		elseif reg[zone_prefix .. 'regime'] == 3 then
			ZONE["set_point"] = SETTINGS["R3TempSetPoint"]
		end
		if reg[zone_prefix .. 'override'] == 1 then
			io[zone_prefix .. 'Damper'] = reg[zone_prefix .. 'value']
		elseif reg[zone_prefix .. 'timer'] == 0 and control_temp > 0 then
			zone_update(ZONE, control_temp, ZONE["set_point"] , SETTINGS["ZoneRate"])
			io[zone_prefix .. 'Damper'] = ZONE["control"]
			reg[zone_prefix .. 'value'] = ZONE["control"]
			reg[zone_prefix .. 'timer'] = SETTINGS["ZoneRate"]
		end
		updateTempAverage(zone_prefix)
		local log_temp = 0
		if reg[zone_prefix .. 'avgtemp'] and reg[zone_prefix .. 'avgtemp'] > 0 then
			log_temp = reg[zone_prefix .. 'avgtemp']
		end
		if reg[zone_prefix .. 'print'] == 0 and log_temp > 0 then
			printData(ZONE["file_name"], log_temp, reg[zone_prefix .. 'avgdamper'])
			DAMPER_AVG_ARRAYS[zone_prefix] = {}
			reg[zone_prefix .. 'print'] = SETTINGS["DataLoggingRate"] * 60
		end
	else
		io[zone_prefix .. 'Damper'] = 0
	end
end

function controlLoop()
	nowTime = time.getComponents(time.now())
	load_db_values()
	zoneControlLoop(ZONE1, "zone1")
	zoneControlLoop(ZONE2, "zone2")
	zoneControlLoop(ZONE3, "zone3")
	zoneControlLoop(ZONE4, "zone4")
	zoneControlLoop(ZONE5, "zone5")
	zoneControlLoop(ZONE6, "zone6")
	zoneControlLoop(ZONE7, "zone7")
	zoneControlLoop(ZONE8, "zone8")
	zoneControlLoop(ZONE9, "zone9")
	zoneControlLoop(ZONE10, "zone10")
end

if not luatest_running then
	sleep(30000)
	print('Starting zone control loop...')
	while true do
		sleep(SETTINGS["ZoneRate"] * 1000)
		controlLoop()
	end
end
