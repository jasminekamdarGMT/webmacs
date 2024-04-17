local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "unrivaled"
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(8)
zone_ids = uid(8)
zone_probe_ids = {'A'}
has_wireless_zone_temp_sensor = true
has_tcp_connect = true
has_blower_speed_control = false
has_blower_faults = false
has_regimes = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')
require(facility_path..'x600m/tests/application_tests')
require(facility_path..'x600m/tests/blower_functions_tests')
require(facility_path..'x600m/tests/temp_functions_tests')
require(facility_path..'x600m/tests/wireless_temp_sensor_tests')
require(facility_path..'x600m/tests/zone_functions_tests')

-- special test env variables
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

-- TestWebmacsScripts = {}
function TestWebmacsScripts:setUp()
  io = initIO()
  reg = initRegisters()
end

function TestWebmacsScripts:tearDown()
  lu.assertEquals(var_names_are_valid(), true)
end

function TestWebmacsScripts:test_init_values()
  initValues()
  lu.assertEquals(_G['BLOWER_01']['control'], 100)
end

function TestWebmacsScripts:test_default_settings()
  local settings = defaultSettings()
  lu.assertEquals(settings['DataLoggingRate'], "120")
end

function TestWebmacsScripts:test_load_settings()
  initSequence()
  SETTINGS = {}
  loadSettings()
  lu.assertEquals(SETTINGS['DataLoggingRate'], "120")
end

function TestWebmacsScripts:test_temp_average_for_zones()
  reg.zone01control = 1
  reg.zone01pAlvtemp = 120
  local avg = tempAvgForZones({'01'}, zone_probe_ids)
  lu.assertEquals(avg, 120)
  -- ignores lv temp out of range
  reg.zone01pAlvtemp = -10
  avg = tempAvgForZones({'01'}, zone_probe_ids)
  lu.assertEquals(avg, 0)
  -- returns zero for zone offline
  reg.zone01control = 0
  avg = tempAvgForZones({'01'}, zone_probe_ids)
  lu.assertEquals(avg, 0)
end

function TestWebmacsScripts:test_update_blowers()
  initSequence()
  -- with zone offline, blower is turned off
  reg.zone01control = 0
  reg.blower01override = 0
  io.blower01run = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  -- if a zone is online, blower is turned on
  reg.zone01control = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  -- with manual override enabled
  reg.blower01override = 1
  reg.blower01control = 1
  io.blower01run = 0
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  reg.blower01control = 0
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  -- if blower is off and a zone is online, the blower will start
  reg.blower01override = 0
  io.blower01run = 0
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
end

function TestWebmacsScripts:test_update_blower_run_value()
  initSequence()
  reg.blower01cycle = 60 * 60
  io.blower01run = 0
  updateBlowerRunValue('blower01', 1)
  lu.assertEquals(io.blower01run, 1)
  reg.blower01cycle = 60
  updateBlowerRunValue('blower01', 1)
  lu.assertEquals(io.blower01run, 0)
  reg.blower01cycle = 0
  updateBlowerRunValue('blower01', 1)
  lu.assertEquals(io.blower01run, 0)
  reg.blower01cycle = 60 * 60
  io.blower01run = 1
  updateBlowerRunValue('blower01', 1)
  updateBlowerRunValue('blower01', 0)
  lu.assertEquals(io.blower01run, 0)
end

function TestWebmacsScripts:test_zone_controls()
  for i, zone_id in pairs(zone_ids) do
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'regime'] = 0
    reg['zone'..zone_id..'regtimer'] = 0
    reg['zone'..zone_id..'reset'] = 0
    io['blower'..zone_id..'run'] = 1
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Blower Run \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Blower Run \n")
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Blower Run \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, On\n")
    lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
    -- Blower run logs 'Off' when blower is not running.
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    io['blower'..zone_id..'run'] = 0
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Blower Run \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, On\n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, Off\n")
    lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
    -- if all system is reset, zone values are loaded from db
    _G['ZONE_'..zone_id]["file_name"] = ""
    reg['zone'..zone_id..'control'] = 0
    initSequence()
    lu.assertEquals(reg['zone'..zone_id..'control'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
  end
end

function TestWebmacsScripts:test_zone_regimes()
  initSequence()
  for i, zone_id in pairs(zone_ids) do
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'reset'] = 1
    reg['zone'..zone_id..'regime'] = 0
    reg['zone'..zone_id..'regtimer'] = 0
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    reg['zone'..zone_id..'regtimer'] = 0
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 2)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 604800)
    reg['zone'..zone_id..'regtimer'] = 0
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 3)
  end
end

function TestWebmacsScripts:test_zone_temp_alarms()
  initSequence()
  SETTINGS["MinTemperatureAlarm"] = 0
  SETTINGS["MaxTemperatureAlarm"] = 160
  for i, zone_id in pairs(zone_ids) do
    emails_sent = 0
    -- with alarm between min and max, no alarm is sent
    reg["zone"..zone_id.."control"] = 1
    reg["zone"..zone_id.."pAavgtemp"] = 130
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    -- if temp is outside bounds for 5 checks, alarm is sent
    reg["zone"..zone_id.."pAavgtemp"] = 180
    updateAlarms()
    updateAlarms()
    updateAlarms()
    updateAlarms()
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone " .. zone_id .. "!")
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 1)
    -- while alarm conditions persist, no additional emails are sent
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    -- return to normal temps resets alarm
    reg["zone"..zone_id.."pAavgtemp"] = 130
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 0)
    -- if last valid temps are higher than alarm setpoint while average temps are lower than setpoint
    emails_sent = 0
    _G['ZONE_'..zone_id]['email_sent'] = 0
    _G['ZONE_'..zone_id]['temp_in_alarm'] = 0
    reg["zone"..zone_id.."pAavgtemp"] = 159
    reg["zone"..zone_id.."pAlvtemp"] = 165
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 1)
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 2)
    updateAlarms()
    updateAlarms()
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
    reg["zone"..zone_id.."pAlvtemp"] = 155
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'],0)
    -- with zone offline no alarms are triggered
    emails_sent = 0
    reg["zone"..zone_id.."control"] = 0
    reg["zone"..zone_id.."pAavgtemp"] = 180
    _G['ZONE_'..zone_id]['temp_in_alarm'] = 5
    _G['ZONE_'..zone_id]['email_sent'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
  end
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
