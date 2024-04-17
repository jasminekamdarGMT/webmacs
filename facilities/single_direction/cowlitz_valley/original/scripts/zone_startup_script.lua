BLOWER1 = {}
BLOWER1["prev_error"] = 0
BLOWER1["int_error"] = 0
BLOWER1["control"] = 0

BLOWER2 = {}
BLOWER2["prev_error"] = 0
BLOWER2["int_error"] = 0
BLOWER2["control"] = 0

ZONE1 = {}
ZONE1["prev_error"] = 0
ZONE1["int_error"] = 0
ZONE1["control"] = 0
ZONE1["set_point"] = 0
ZONE1["file_name"] = "";

ZONE2 = {}
ZONE2["prev_error"] = 0
ZONE2["int_error"] = 0
ZONE2["control"] = 0
ZONE2["set_point"] = 0
ZONE2["file_name"] = "";

ZONE3 = {}
ZONE3["prev_error"] = 0
ZONE3["int_error"] = 0
ZONE3["control"] = 0
ZONE3["set_point"] = 0
ZONE3["file_name"] = "";

ZONE4 = {}
ZONE4["prev_error"] = 0
ZONE4["int_error"] = 0
ZONE4["control"] = 0
ZONE4["set_point"] = 0
ZONE4["file_name"] = "";

ZONE5 = {}
ZONE5["prev_error"] = 0
ZONE5["int_error"] = 0
ZONE5["control"] = 0
ZONE5["set_point"] = 0
ZONE5["file_name"] = "";

ZONE6 = {}
ZONE6["prev_error"] = 0
ZONE6["int_error"] = 0
ZONE6["control"] = 0
ZONE6["set_point"] = 0
ZONE6["file_name"] = "";

ZONE7 = {}
ZONE7["prev_error"] = 0
ZONE7["int_error"] = 0
ZONE7["control"] = 0
ZONE7["set_point"] = 0
ZONE7["file_name"] = "";

ZONE8 = {}
ZONE8["prev_error"] = 0
ZONE8["int_error"] = 0
ZONE8["control"] = 0
ZONE8["set_point"] = 0
ZONE8["file_name"] = "";

ZONE9 = {}
ZONE9["prev_error"] = 0
ZONE9["int_error"] = 0
ZONE9["control"] = 0
ZONE9["set_point"] = 0
ZONE9["file_name"] = "";

ZONE10 = {}
ZONE10["prev_error"] = 0
ZONE10["int_error"] = 0
ZONE10["control"] = 0
ZONE10["set_point"] = 0
ZONE10["file_name"] = "";

SETTINGS = {}
SETTINGS["DataLoggingRate"] = 0
SETTINGS["PressureSetPoint"] = 0
SETTINGS["MinVFDSpeed"] = 0
SETTINGS["BlowerGain"] = 0
SETTINGS["BlowerIntegral"] = 0
SETTINGS["BlowerDerivative"] = 0
SETTINGS["R1TempSetPoint"] = 0
SETTINGS["R2TempSetPoint"] = 0
SETTINGS["R3TempSetPoint"] = 0
SETTINGS["R1Duration"] = 0
SETTINGS["R2Duration"] = 0
SETTINGS["MaxTemperatureAlarm"] = 0
SETTINGS["MinTemperatureAlarm"] = 0
SETTINGS["ZoneGain"] = 0
SETTINGS["ZoneIntegral"] = 0
SETTINGS["ZoneDerivative"] = 0
SETTINGS["ZoneRate"] = 0
SETTINGS["MinDamperValue"] = 0

--enableDebug()
function startup_zones()
	local zstartup = sqlite3.open("/usb/zone_startup.db")

	for row in zstartup:rows('SELECT * FROM zone_startup') do
		reg[row[2]] = row[3]
    print(row[2] .. " set to " .. row[3])
	end
	
	zstartup:close()
end

function update_zones()
	local zstartup = sqlite3.open("/usb/zone_startup.db")
	
	local query = [[UPDATE zone_startup SET state=]] .. reg.zone1control .. [[ WHERE name="zone1control";
				   UPDATE zone_startup SET state=]] .. reg.zone2control .. [[ WHERE name="zone2control";
				   UPDATE zone_startup SET state=]] .. reg.zone3control .. [[ WHERE name="zone3control";
				   UPDATE zone_startup SET state=]] .. reg.zone4control .. [[ WHERE name="zone4control";
				   UPDATE zone_startup SET state=]] .. reg.zone5control .. [[ WHERE name="zone5control";
				   UPDATE zone_startup SET state=]] .. reg.zone6control .. [[ WHERE name="zone6control";
				   UPDATE zone_startup SET state=]] .. reg.zone7control .. [[ WHERE name="zone7control";
				   UPDATE zone_startup SET state=]] .. reg.zone8control .. [[ WHERE name="zone8control";
				   UPDATE zone_startup SET state=]] .. reg.zone9control .. [[ WHERE name="zone9control";
				   UPDATE zone_startup SET state=]] .. reg.zone10control .. [[ WHERE name="zone10control";
				   UPDATE zone_startup SET state=]] .. reg.zone1batch .. [[ WHERE name="zone1batch";
				   UPDATE zone_startup SET state=]] .. reg.zone2batch .. [[ WHERE name="zone2batch";
				   UPDATE zone_startup SET state=]] .. reg.zone3batch .. [[ WHERE name="zone3batch";
				   UPDATE zone_startup SET state=]] .. reg.zone4batch .. [[ WHERE name="zone4batch";
				   UPDATE zone_startup SET state=]] .. reg.zone5batch .. [[ WHERE name="zone5batch";
				   UPDATE zone_startup SET state=]] .. reg.zone6batch .. [[ WHERE name="zone6batch";
				   UPDATE zone_startup SET state=]] .. reg.zone7batch .. [[ WHERE name="zone7batch";
				   UPDATE zone_startup SET state=]] .. reg.zone8batch .. [[ WHERE name="zone8batch";
				   UPDATE zone_startup SET state=]] .. reg.zone9batch .. [[ WHERE name="zone9batch";
				   UPDATE zone_startup SET state=]] .. reg.zone10batch .. [[ WHERE name="zone10batch";
				   UPDATE zone_startup SET state=]] .. reg.zone1regime .. [[ WHERE name="zone1regime";
				   UPDATE zone_startup SET state=]] .. reg.zone2regime .. [[ WHERE name="zone2regime";
				   UPDATE zone_startup SET state=]] .. reg.zone3regime .. [[ WHERE name="zone3regime";
				   UPDATE zone_startup SET state=]] .. reg.zone4regime .. [[ WHERE name="zone4regime";
				   UPDATE zone_startup SET state=]] .. reg.zone5regime .. [[ WHERE name="zone5regime";
				   UPDATE zone_startup SET state=]] .. reg.zone6regime .. [[ WHERE name="zone6regime";
				   UPDATE zone_startup SET state=]] .. reg.zone7regime .. [[ WHERE name="zone7regime";
				   UPDATE zone_startup SET state=]] .. reg.zone8regime .. [[ WHERE name="zone8regime";
				   UPDATE zone_startup SET state=]] .. reg.zone9regime .. [[ WHERE name="zone9regime";
				   UPDATE zone_startup SET state=]] .. reg.zone10regime .. [[ WHERE name="zone10regime";
				   ]]
	zstartup:exec(query)
  print("Updated Zones Successful")
	zstartup:close()
end
sleep(10000)
startup_zones()

while true do
	update_zones()
	
	sleep(900000) -- sleep for 15 minutes.
end