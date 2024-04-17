ZONE_IDS = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10"}
TEMP_AVG_ARRAYS = {}
DAMPER_AVG_ARRAYS = {}

function initZone(zone_id)
	TEMP_AVG_ARRAYS["zone"..zone_id] = {}
	DAMPER_AVG_ARRAYS["zone"..zone_id] = {}
	local ZONE = {}
	ZONE["prev_error"] = 0
	ZONE["int_error"] = 0
	ZONE["control"] = 0
	ZONE["set_point"] = 0
	ZONE["temp_in_alarm"] = 0
	ZONE["file_name"] = "";
	_G['ZONE'..zone_id] = ZONE
end

function initStartupValues()
	BLOWER1 = {}
	BLOWER1["prev_error"] = 0
	BLOWER1["int_error"] = 0
	BLOWER1["control"] = 0

	BLOWER2 = {}
	BLOWER2["prev_error"] = 0
	BLOWER2["int_error"] = 0
	BLOWER2["control"] = 0

	for i, zone_id in ipairs(ZONE_IDS) do
		-- init zone values
		initZone(zone_id)
	end

	SETTINGS = {}
	SETTINGS["DataLoggingRate"] = 0
	SETTINGS["PressureSetPoint"] = 0
	SETTINGS["PressureSetPoint2"] = 0
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
end
initStartupValues()

if not webmacs_db_path then
  webmacs_db_path = '/usb/'
end

--enableDebug()
function loadZoneStates(zstartup, name_suffix)
	for row in zstartup:rows("SELECT * FROM zone_startup WHERE name LIKE '%" .. name_suffix .. "'") do
		reg[row[2]] = row[3]
		if not luatest_running then print(row[2] .. " set to " .. row[3]) end
	end
end

function getZoneState(zstartup, name)
	local state = ""
	for row in zstartup:rows("SELECT * FROM zone_startup WHERE name = '" .. name .. "'") do
		state = row[3]
	end
	return state
end

function startup_zones()
	local zstartup = sqlite3.open(webmacs_db_path .. "zone_startup.db")

	loadZoneStates(zstartup, 'control', reg)
	loadZoneStates(zstartup, 'batch', reg)
	loadZoneStates(zstartup, 'regime', reg)

	for zone_number=1,10,1 do
		_G['ZONE' .. zone_number]['file_name'] = getZoneState(zstartup, 'zone' .. zone_number .. 'filename')
	end

	zstartup:close()
end

function update_zones()
	local zstartup = sqlite3.open(webmacs_db_path .. "zone_startup.db")
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
				   UPDATE zone_startup SET state="]] .. ZONE1['file_name'] .. [[" WHERE name="zone1filename";
				   UPDATE zone_startup SET state="]] .. ZONE2['file_name'] .. [[" WHERE name="zone2filename";
				   UPDATE zone_startup SET state="]] .. ZONE3['file_name'] .. [[" WHERE name="zone3filename";
				   UPDATE zone_startup SET state="]] .. ZONE4['file_name'] .. [[" WHERE name="zone4filename";
				   UPDATE zone_startup SET state="]] .. ZONE5['file_name'] .. [[" WHERE name="zone5filename";
				   UPDATE zone_startup SET state="]] .. ZONE6['file_name'] .. [[" WHERE name="zone6filename";
				   UPDATE zone_startup SET state="]] .. ZONE7['file_name'] .. [[" WHERE name="zone7filename";
				   UPDATE zone_startup SET state="]] .. ZONE8['file_name'] .. [[" WHERE name="zone8filename";
				   UPDATE zone_startup SET state="]] .. ZONE9['file_name'] .. [[" WHERE name="zone9filename";
				   UPDATE zone_startup SET state="]] .. ZONE10['file_name'] .. [[" WHERE name="zone10filename";
				   ]]
	zstartup:exec(query)
	if not luatest_running then print("Updated Zones Successful") end
	zstartup:close()
end

if not luatest_running then
  sleep(10000)
  startup_zones()

  print('Starting update zones control loop...')
  while true do
    sleep(900000) -- sleep for 15 minutes.

    update_zones()
  end
end
