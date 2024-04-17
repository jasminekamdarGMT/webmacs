sleep(40000) -- sleep 40 seconds, allowing other loops to initialize
while true do
	sleep(2000) -- sleep 2 seconds
	--blower 1
	if io.blower1run == 1 then
		if reg.blower1timer == 0 then
			blower_update(BLOWER1, io.blower1pressure , SETTINGS["PressureSetPoint"] , 2)
      if io.blower1fault > 2 and reg.blower1override == 0 then
        io.blower1run = 1
				io.blower1Speed = BLOWER1["control"]
				reg.blower1value = BLOWER1["control"]
			elseif reg.blower1override == 1 then
				io.blower1Speed = reg.blower1value
			else
				io.blower1Speed = 0
			end
			reg.blower1timer = 60
		end
	else
		io.blower1Speed = 0
	end
	--blower 2
	if io.blower2run == 1 then
		if reg.blower2timer == 0 then
			blower_update(BLOWER2, io.blower2pressure , SETTINGS["PressureSetPoint"] , 2)
			if io.blower2fault > 2 and reg.blower2override == 0 then
				io.blower2run = 1
				io.blower2Speed = BLOWER2["control"]
				reg.blower2value = BLOWER2["control"]
			elseif reg.blower2override == 1 then
				io.blower2Speed = reg.blower2value
			else
				io.blower2Speed = 0
			end
			reg.blower2timer = 60
		end
	else
		io.blower2Speed = 0
	end
end