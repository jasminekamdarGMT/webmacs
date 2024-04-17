local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "schaus"
package.path = package.path..';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(4)
blower_labels = {'1','2','3','4'}
zone_ids = uid(4)
zone_probe_ids = {'A','B'}
has_tcp_connect = true
has_blower_speed_control = false
has_blower_faults = false
has_regimes = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')
require(facility_path..'x600m/tests/application_tests')
-- require(facility_path..'x600m/tests/blower_functions_tests')
require(facility_path..'x600m/tests/temp_functions_tests')
require(facility_path..'x600m/tests/zone_functions_tests')

-- special test env variables
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm "..webmacs_db_path.."*.db")

function appendFacilityReg(reg)
  for i, blower_id in ipairs(blower_ids) do
    reg['blower'..blower_id..'control'] = 0
    reg['blower'..blower_id..'cycle'] = 0
    reg['blower'..blower_id..'override'] = 0
    reg['blower'..blower_id..'offtimer'] = 0
  end
end

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
  reg.zone01pBlvtemp = 120
  local avg = tempAvgForZones({'01'}, zone_probe_ids)
  lu.assertEquals(avg, 120)
  -- ignores lv temp out of range
  reg.zone01pAlvtemp = -10
  reg.zone01pBlvtemp = -10
  avg = tempAvgForZones({'01'}, zone_probe_ids)
  lu.assertEquals(avg, 0)
  -- returns zero for zone offline
  reg.zone01control = 0
  avg = tempAvgForZones({'01'}, zone_probe_ids)
  lu.assertEquals(avg, 0)
end

  function TestWebmacsScripts:test_blower_on_count()
    groupPrefixes = {'blower01', 'blower02', 'blower03', 'blower04'}
    reg['blower01control'] = 1
    reg['blower02control'] = 0
    reg['blower03control'] = 1
    reg['blower04control'] = 0
    lu.assertEquals(blowerOnCount(groupPrefixes), 2)
  end

  function TestWebmacsScripts:test_manual_blower_control()
    initSequence()
    -- if blower is set to manual override, it will run
    reg['blower01override'] = 1
    reg['blower01control'] = 1
    io['blower01run'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    -- it will not start another blower for 5 seconds
    -- The most recently set blower override takes priority over previously set blower overrides
    reg['blower02override'] = 1
    reg['blower02control'] = 1
    io['blower02run'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(reg['group01startdelay'], 5)
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    -- maintains the 1 running blower limit on a successive loop
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
  end
  
  function TestWebmacsScripts:test_auto_blower_control()
    initSequence()
    reg['zone04control'] = 1
    io['blower01run'] = 0
    io['blower02run'] = 0
    io['blower03run'] = 0
    io['blower04run'] = 0
    -- if blower is set to auto, it will run
    reg['blower01override'] = 0
    reg['blower01control'] = 0
    reg['zone01control'] = 1
    io['blower01run'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(reg['group01startdelay'], 5)
    -- it will not start another blower for 5 seconds
    reg['group01startdelay'] = 0
    reg['blower01cycle'] = 0
    reg['blower02override'] = 0
    reg['blower02control'] = 0
    reg['zone02control'] = 1
    io['blower02run'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 0)
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    -- if there are already 1 blowers running, it will not start a second
    reg['zone03control'] = 1
    io['blower03run'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    -- maintains the 1 running blower limit on a successive loop
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    -- if third blower set to manual and control on
    -- current blower stops and third blower starts
    reg['blower03override'] = 1
    reg['blower03control'] = 1
    updateBlowers()
    lu.assertEquals(reg['group01startdelay'], 5)
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    -- if cycle expires, third blower continues to run 
    reg['blower03cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    -- if third blower is set as manual and control turned off
    reg['blower03override'] = 0
    reg['blower03control'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(reg['group01startdelay'], 5)
    -- after third blower manual ends, the initial sequence restarts
    updateBlowers()
    reg['blower01offtimer'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    reg['blower02offtimer'] = 0
    reg['blower01cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    -- when zoneXcontrol is zero, it is skipped in the sequence
    reg['blower03offtimer'] = 0
    reg['blower02cycle'] = 0
    reg['zone03control'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 1)
    -- sequence resets upon completion
    reg['blower01offtimer'] = 0
    reg['blower04cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)

  end

  function TestWebmacsScripts:test_blower_run_sequence()
    initSequence()
    -- set all zones online
    for i, zone_id in ipairs(zone_ids) do
      reg['zone'..zone_id..'control'] = 1
    end
    -- set all blowers to auto and off
    for i, blower_id in ipairs(blower_ids) do
      reg['blower'..blower_id..'control'] = 0
      reg['blower'..blower_id..'cycle'] = 0
      reg['blower'..blower_id..'override'] = 0
      reg['blower'..blower_id..'offtimer'] = 0
      io['blower'..blower_id..'run'] = 0
    end
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    -- overrides get first dibs
    reg['blower04override'] = 1
    reg['blower04control'] = 1
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 1)
    lu.assertEquals(reg['group01startdelay'], 5)
    -- if MAX_BLWRS_ON is equal to 1 and multiple blowers have override enabled
    -- the most recently overridden blower will take priority and will run until it's override is disabled
    -- or another blower override is enabled
    reg['blower02override'] = 1
    reg['blower02control'] = 1
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    -- reg['blower01override'] = 1
    -- reg['blower01control'] = 1
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    reg['blower04override'] = 1
    reg['blower04control'] = 1
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 1)
    -- if overrides are turned off sequence continues as normal
    -- if 5 second delays have passed first blower in each group should run
    reg['blower04override'] = 0
    reg['blower04control'] = 0
    reg['blower01cycle'] = 0
    reg['blower02cycle'] = 0
    reg['blower03cycle'] = 0
    reg['blower04cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['blower04offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    -- if blower in each group reaches end of cycle set next blower that is not running to run
    reg['blower01cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['blower02offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    reg['blower02cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['blower03offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    reg['blower03cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['blower04offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 1)
    -- next cycle restarts blower sequence
    reg['blower04cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['blower01offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    reg['blower01cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['blower02offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    -- if zone is offline skip that blower
    reg['zone03control'] = 0
    reg['blower02cycle'] = 0
    reg['blower04cycle'] = 0
    updateBlowers()
    reg['blower03offtimer'] = 0
    reg['blower04offtimer'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 1)
  end

  function TestWebmacsScripts:test_handle_pending_blower()
    initSequence()
    -- if blower offtimer > 0 blower does not start
    reg['blower01override'] = 0
    reg['blower01control'] = 1
    reg['blower01cycle'] = 0
    reg['blower02override'] = 0
    reg['blower02control'] = 1
    io['blower02run'] = 0
    reg['blower02offtimer'] = 100
    reg['zone02control'] = 1
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 0)
    -- if blower offtimer == 0 blower starts
    reg['blower02offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 1)
  end

function TestWebmacsScripts:test_zone_controls()
  SETTINGS["DataLoggingRate"] = 120
  for i, zone_id in pairs(zone_ids) do
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'regime'] = 0
    reg['zone'..zone_id..'regtimer'] = 0
    reg['zone'..zone_id..'reset'] = 0
    reg['zone'..zone_id..'avgdamper'] = 30
    reg['zone'..zone_id..'pfrptime'] = 7
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path.._G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, PFRP Time \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path.._G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, PFRP Time \n")
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 135
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path.._G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, PFRP Time \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 30, 0\n")
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
    reg["zone"..zone_id.."pBavgtemp"] = 130
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    -- if temp is outside bounds for 5 checks, alarm is sent
    reg["zone"..zone_id.."pAavgtemp"] = 180
    reg["zone"..zone_id.."pBavgtemp"] = 180
    updateAlarms()
    updateAlarms()
    updateAlarms()
    updateAlarms()
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_id.."!")
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 1)
    -- while alarm conditions persist, no additional emails are sent
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    -- return to normal temps resets alarm
    reg["zone"..zone_id.."pAavgtemp"] = 130
    reg["zone"..zone_id.."pBavgtemp"] = 130
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 0)
    -- if last valid temps are higher than alarm setpoint while average temps are lower than setpoint
    emails_sent = 0
    _G['ZONE_'..zone_id]['email_sent'] = 0
    _G['ZONE_'..zone_id]['temp_in_alarm'] = 0
    reg["zone"..zone_id.."pAavgtemp"] = 159
    reg["zone"..zone_id.."pBavgtemp"] = 159
    reg["zone"..zone_id.."pAlvtemp"] = 165
    reg["zone"..zone_id.."pBlvtemp"] = 165
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
    reg["zone"..zone_id.."pBlvtemp"] = 155
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'],0)
    -- with zone offline no alarms are triggered
    emails_sent = 0
    reg["zone"..zone_id.."control"] = 0
    reg["zone"..zone_id.."pAavgtemp"] = 180
    reg["zone"..zone_id.."pBavgtemp"] = 180
    _G['ZONE_'..zone_id]['temp_in_alarm'] = 5
    _G['ZONE_'..zone_id]['email_sent'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
  end
end

function TestWebmacsScripts:test_manual_damper_control()
  initSequence()
  -- if blower is set to manual override, it will alternate damper
  reg['blower01override'] = 1
  reg['blower01control'] = 1
  reg['zone01dampercycle'] = 200
  updateDampers()
  lu.assertEquals(io['damper01control'], 1)
  reg['zone01dampercycle'] = 400
  updateDampers()
  lu.assertEquals(io['damper01control'], 0)
end

function TestWebmacsScripts:test_auto_damper_control()
  initSequence()
  reg['blower01override'] = 0
  reg['blower01control'] = 1
  reg['blower01cycle'] = 200
  updateDampers()
  lu.assertEquals(io['damper01control'], 1)
  reg['blower01cycle'] = 400
  updateDampers()
  lu.assertEquals(io['damper01control'], 0)
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
