function blowerControl(BLOWER, blower_prefix, pressure_setpoint)
	if io[blower_prefix .. 'run'] == 1 then
		if reg[blower_prefix .. 'timer'] == 0 then
			blower_update(BLOWER, io[blower_prefix .. 'pressure'], pressure_setpoint, 2)
			if io[blower_prefix .. 'fault'] > 2 and reg[blower_prefix .. 'override'] == 0 then
				io[blower_prefix .. 'run'] = 1
				io[blower_prefix .. 'Speed'] = BLOWER["control"]
				reg[blower_prefix .. 'value'] = BLOWER["control"]
			elseif reg[blower_prefix .. 'override'] == 1 then
				io[blower_prefix .. 'Speed'] = reg[blower_prefix .. 'value']
			else
				io[blower_prefix .. 'Speed'] = 0
			end
			reg[blower_prefix .. 'timer'] = 60
		end
	else
		io[blower_prefix .. 'Speed'] = 0
	end
end

function blowerControlLoop()
	blowerControl(BLOWER1, 'blower1', SETTINGS["PressureSetPoint"])
	blowerControl(BLOWER2, 'blower2', SETTINGS["PressureSetPoint2"])
end

if not luatest_running then
	sleep(40000) -- sleep 40 seconds, allowing other loops to initialize
	print('Starting blower control loop...')
	while true do
		sleep(2000) -- sleep 2 seconds
		blowerControlLoop()
	end
end
