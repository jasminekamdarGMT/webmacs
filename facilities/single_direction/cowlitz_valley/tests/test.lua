local lu = require('luaunit')
sqlite3 = require('lsqlite3complete')
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "cowlitz_valley/"

-- special test env variables
luatest_running = true
has_blower_speed_control = true
webmacs_db_path = facility_path..facility_name..'tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

-- stubbed functions
-- function sleep(seconds) end

local emails_sent = 0
function email(message)
  last_email_subject = message.subj
  emails_sent = emails_sent + 1
end

-- test helpers
function zoneStartupValue(name)
	local zstartup = sqlite3.open(webmacs_db_path .. "zone_startup.db")
  local value = nil

	for row in zstartup:rows('SELECT * FROM zone_startup WHERE name = "' .. name .. '"') do
		value = row[3]
	end
	zstartup:close()
  return value
end

function tempAlarmTest(zone_number)
  zone_prefix = 'zone' .. zone_number
  emails_sent = 0
  reg[zone_prefix .. 'control'] = 1 -- zone online
  io[zone_prefix .. 'Temp'] = 150
  alarmLoop()
  lu.assertEquals(emails_sent, 0) -- no alarm if temp is between min and max
  io[zone_prefix .. 'Temp'] = 190
  alarmLoop()
  alarmLoop()
  alarmLoop()
  alarmLoop()
  lu.assertEquals(emails_sent, 0) -- no alarm sent until temp has been out of range 5 times
  alarmLoop()
  lu.assertEquals(emails_sent, 1) -- alarm email sent if temp is outside min and max 5 times in a row
  lu.assertEquals(last_email_subject, "Alarm raised on Zone " .. zone_number .. "!")
  alarmLoop()
  lu.assertEquals(emails_sent, 1) -- no additional emails sent while alarm condition persists
end

function blowerAlarmTest(blower_number)
  blower_prefix = 'blower' .. blower_number
  emails_sent = 0
  io[blower_prefix .. 'fault'] = 2 -- blower not in fault condition
  alarmLoop()
  lu.assertEquals(emails_sent, 0) -- no alarm
  io[blower_prefix .. 'fault'] = 1 -- blower in fault condition
  alarmLoop()
  lu.assertEquals(emails_sent, 1) -- alarm email sent
  lu.assertEquals(last_email_subject, "Alarm raised on Blower " .. blower_number .. "!")
  alarmLoop()
  lu.assertEquals(emails_sent, 1) -- no additional emails sent while alarm condition persists
end

function zoneControlTest(ZONE, zone_prefix)
  -- with new zone online initializes batch
  reg[zone_prefix .. "avgdamper"] = 53
  reg[zone_prefix .. "control"] = 1 -- zone online
  reg[zone_prefix .. "override"] = 0 -- manual override set to off
  ZONE["file_name"] = ""
  reg[zone_prefix .. "regime"] = 0
  reg[zone_prefix .. "print"] = nil
  io[zone_prefix .. "Temp"] = 160.3
  controlLoop()
  lu.assertEquals(reg[zone_prefix .. "regime"], 1)
  lu.assertEquals(reg[zone_prefix .. "batch"], 432000)
  lu.assertEquals(ZONE["set_point"], '131')
  --lu.assertEquals(test_files[ZONE["file_name"]], "Date/Time, Temperature \n")
  -- when batch reaches zero, increment regime
  reg[zone_prefix .. "batch"] = 0
  controlLoop()
  lu.assertEquals(reg[zone_prefix .. "regime"], 2)
  lu.assertEquals(reg[zone_prefix .. "batch"], 604800)
  lu.assertEquals(ZONE["set_point"], '144')
  -- when batch reaches zero for regime 2, increment regime to 3
  reg[zone_prefix .. "batch"] = 0
  controlLoop()
  lu.assertEquals(reg[zone_prefix .. "regime"], 3)
  lu.assertEquals(reg[zone_prefix .. "batch"], 0)
  lu.assertEquals(ZONE["set_point"], '134')
  -- when zone timer reaches zero, update zone and reset timer
  reg[zone_prefix .. "timer"] = 0
  controlLoop()
  lu.assertEquals(ZONE["control"], 100)
  lu.assertEquals(io[zone_prefix .. "Damper"], ZONE["control"])
	lu.assertEquals(reg[zone_prefix .. "value"], ZONE["control"])
  lu.assertEquals(reg[zone_prefix .. "timer"], '120')
  -- when print timer reaches zero, log data and reset timer
  reg[zone_prefix .. "print"] = 0
  controlLoop()
  lu.assertEquals(reg[zone_prefix .. "print"], 7200)
  lu.assertEquals(test_files[ZONE["file_name"]], "Date/Time, Temperature, Damper \n01/01/2017 12:00:00, 160.3, 53\n")
  -- when zone override is on, damper is set to override value
  reg[zone_prefix .. "override"] = 1 -- manual override set to on
  reg[zone_prefix .. "value"] = 50
  controlLoop()
  lu.assertEquals(io[zone_prefix .. "Damper"], 50)
  -- if the temp is invalid, the damper override is still effective
  io[zone_prefix .. "Temp"] = nil
  reg[zone_prefix .. "override"] = 1 -- manual override set to on
  reg[zone_prefix .. "value"] = 75
  controlLoop()
  lu.assertEquals(io[zone_prefix .. "Damper"], 75)
  io[zone_prefix .. "Temp"] = 160
  -- when zone is offline damper is set to zero
  reg[zone_prefix .. "control"] = 0 -- zone offline
  controlLoop()
  lu.assertEquals(io[zone_prefix .. "Damper"], 0)
  -- when zone reset is true, batch variables are reset
  reg[zone_prefix .. "regime"] = 3
  reg[zone_prefix .. "print"] = 100
  reg[zone_prefix .. "timer"] = 100
  reg[zone_prefix .. "batch"] = 100
  reg[zone_prefix .. "control"] = 1
  reg[zone_prefix .. "reset"] = 1
  ZONE["file_name"] = 'lolwat'
  controlLoop()
  lu.assertEquals(ZONE["file_name"], "/usb/01_01_2017_"..zone_prefix..".csv")
  lu.assertEquals(reg[zone_prefix .. "regime"], 1)
  lu.assertEquals(reg[zone_prefix .. "print"], 7200)
  lu.assertEquals(reg[zone_prefix .. "timer"], 0)
  lu.assertEquals(reg[zone_prefix .. "batch"], 432000)
end

function blowerControlTest(blower_prefix)
  SETTINGS["PressureSetPoint"] = 10
  SETTINGS["PressureSetPoint2"] = 10
  SETTINGS["BlowerGain"] = 1
  SETTINGS["BlowerIntegral"] = 1.5
  SETTINGS["BlowerDerivative"] = 0
  SETTINGS["MinVFDSpeed"] = 10
  -- with blower run variable set to 0
  io[blower_prefix .. "Speed"] = 100
  reg[blower_prefix .. "override"] = 0
  io[blower_prefix .. "run"] = 0
  io[blower_prefix .. "fault"] = 3
  blowerControlLoop()
  lu.assertEquals(io[blower_prefix .. "Speed"], 0)
  -- with blower run variable set to 1
  io[blower_prefix .. "run"] = 1
  io[blower_prefix .. "pressure"] = 1
  reg[blower_prefix .. "timer"] = 0
  blowerControlLoop()
  lu.assertEquals(io[blower_prefix .. "Speed"], 36)
  lu.assertEquals(reg[blower_prefix .. "value"], 36)
  lu.assertEquals(reg[blower_prefix .. "timer"], 60)
  -- if blower faults
  io[blower_prefix .. "fault"] = 0
  reg[blower_prefix .. "timer"] = 0
  blowerControlLoop()
  lu.assertEquals(io[blower_prefix .. "Speed"], 0)
  lu.assertEquals(reg[blower_prefix .. "timer"], 60)
  -- with manual override
  reg[blower_prefix .. "override"] = 1
  reg[blower_prefix .. "value"] = 50
  reg[blower_prefix .. "timer"] = 0
  blowerControlLoop()
  lu.assertEquals(io[blower_prefix .. "Speed"], 50)
  lu.assertEquals(reg[blower_prefix .. "timer"], 60)
end

-- stubbed time object and methods
time = {}
  function time:now()
  end

  function time:getComponents(ms)
    local components = {
      month = 1,
      mday = 1,
      year = 2017,
      hour = 12,
      min = 0,
      sec = 0,
      wday = 1,
      yday = 1,
      isdst = 1
    }
    return components
  end
-- end time table

-- stubbed file object and methods
test_files = {}
file = { filename = '', mode = '' }
  function file.open(filename, mode)
    file.filename = filename
    file.mode = mode
    if mode == 'w' or not test_files[filename] then
      test_files[filename] = ''
    end
    return file
  end
  function file:write(line)
    test_files[self.filename] = test_files[self.filename] .. line
  end
  function file:close() end
-- end file table

reg = {}

test_io = {
  blower1fault = 3,
  blower2fault = 3,
  zone1Temp = 0,
  zone2Temp = 0,
  zone3Temp = 0,
  zone4Temp = 0,
  zone5Temp = 0,
  zone6Temp = 0,
  zone7Temp = 0,
  zone8Temp = 0,
  zone9Temp = 0,
  zone10Temp = 0,
  stdout = io.stdout -- hack to expose stdout to luaunit
}

-- load controller files
package.path = package.path .. ';'..facility_path..'/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require('db_setup')
require('control_functions')
require('zone_startup_script')
require('zone_control_loop')
require('blower_control_script')

TestWebmacsScripts = {}
  function TestWebmacsScripts:setUp()
    io = test_io
    startup_zones()
  end

  function TestWebmacsScripts:test_update_zones()
    reg.zone1control = 1
    update_zones()
    lu.assertEquals(zoneStartupValue('zone1control'), 1)
  end

  function TestWebmacsScripts:test_alarms()
    SETTINGS["MaxTemperatureAlarm"] = 180
    tempAlarmTest(1)
    tempAlarmTest(2)
    tempAlarmTest(3)
    tempAlarmTest(4)
    tempAlarmTest(5)
    tempAlarmTest(6)
    tempAlarmTest(7)
    tempAlarmTest(8)
    tempAlarmTest(9)
    tempAlarmTest(10)
    blowerAlarmTest(1)
    blowerAlarmTest(2)
  end

  function TestWebmacsScripts:test_zone_control_loop()
    zoneControlTest(ZONE1, 'zone1')
    zoneControlTest(ZONE2, 'zone2')
    zoneControlTest(ZONE3, 'zone3')
    zoneControlTest(ZONE4, 'zone4')
    zoneControlTest(ZONE5, 'zone5')
    zoneControlTest(ZONE6, 'zone6')
    zoneControlTest(ZONE7, 'zone7')
    zoneControlTest(ZONE8, 'zone8')
    zoneControlTest(ZONE9, 'zone9')
    zoneControlTest(ZONE10, 'zone10')
  end

  function TestWebmacsScripts:test_blower_control_loop()
    blowerControlTest('blower1')
    blowerControlTest('blower2')
  end

  function TestWebmacsScripts:test_zone_startup_values()
    zone_prefix = 'zone1'
    reg[zone_prefix .. "override"] = 0 -- manual override set to off
    initStartupValues()
    lu.assertEquals(ZONE1["file_name"], '')
    reg[zone_prefix .. "control"] = 1
    reg[zone_prefix .. "batch"] = 0
    reg[zone_prefix .. "regime"] = 0
    controlLoop()
    lu.assertEquals(ZONE1["file_name"], '/usb/01_01_2017_zone1.csv')
    lu.assertEquals(reg[zone_prefix .. "control"], 1)
    lu.assertEquals(reg[zone_prefix .. "batch"], 432000)
    lu.assertEquals(reg[zone_prefix .. "regime"], 1)
    update_zones()
    initStartupValues()
    lu.assertEquals(ZONE1["file_name"], '')
    startup_zones()
    lu.assertEquals(ZONE1["file_name"], '/usb/01_01_2017_zone1.csv')
    lu.assertEquals(reg[zone_prefix .. "control"], 1)
    lu.assertEquals(reg[zone_prefix .. "batch"], 432000)
    lu.assertEquals(reg[zone_prefix .. "regime"], 1)
  end

  function TestWebmacsScripts:test_update_temp_averages()
    first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
    for k, value in pairs(first_10_values) do
      io.zone9Temp = value
      updateTempAverages()
    end
    lu.assertEquals(TEMP_AVG_ARRAYS['zone9'], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
    lu.assertEquals(reg['zone9avgtemp'], 110)
    --after 10 values, it starts rotating the table
    io.zone9Temp = 80
    updateTempAverages()
    lu.assertEquals(TEMP_AVG_ARRAYS['zone9'], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
    lu.assertEquals(reg['zone9avgtemp'], 106)
    --with no historic values, it is just the lastest value
    TEMP_AVG_ARRAYS['zone9'] = {}
    io.zone9Temp = 80
    updateTempAverages()
    lu.assertEquals(TEMP_AVG_ARRAYS['zone9'], {80})
    lu.assertEquals(reg.zone9avgtemp, 80)
    initStartupValues()
  end

  function TestWebmacsScripts:test_update_damper_averages()
    SETTINGS["DataLoggingRate"] = 100
    reg.zone9control = 1
    first_10_values = {10, 30, 50, 70, 90, 100, 80, 60, 20, 0}
    for k, value in pairs(first_10_values) do
      io.zone9Damper = value
      reg.zone9avgtimer = 0
      updateDamperAverages()
    end
    lu.assertEquals(DAMPER_AVG_ARRAYS['zone9'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone9avgdamper'], 51)
    lu.assertEquals(reg['zone9avgtimer'], 600)
    -- if zone is offline or timer is not complete, does nothing
    io.zone9Damper = 80
    reg.zone9control = 0
    reg.zone9avgtimer = 0
    updateDamperAverages()
    lu.assertEquals(DAMPER_AVG_ARRAYS['zone9'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone9avgdamper'], 51)
    reg.zone9control = 1
    reg.zone9avgtimer = 600
    updateDamperAverages()
    lu.assertEquals(DAMPER_AVG_ARRAYS['zone9'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone9avgdamper'], 51)
    -- otherwise, after 10 values, it starts rotating the table
    reg.zone9control = 1
    reg.zone9avgtimer = 0
    updateDamperAverages()
    lu.assertEquals(DAMPER_AVG_ARRAYS['zone9'], {80, 0, 20, 60, 80, 100, 90, 70, 50, 30})
    lu.assertEquals(reg['zone9avgdamper'], 58)
    --with no historic values, it is just the lastest value
    DAMPER_AVG_ARRAYS['zone9'] = {}
    io.zone9Damper = 80
    reg.zone9avgtimer = 0
    updateDamperAverages()
    lu.assertEquals(DAMPER_AVG_ARRAYS['zone9'], {80})
    lu.assertEquals(reg.zone9avgdamper, 80)
    initStartupValues()
  end
-- end of table TestStuff

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
