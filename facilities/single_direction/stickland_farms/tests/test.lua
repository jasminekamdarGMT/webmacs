local lu = require('luaunit')

TestWebmacsScripts = {}
blower_ids = {'01','02','03','04','05','06','07','08','09','10'}
blower_labels = {'1', '2', '3', '4', '5', '6', '7', '8', '9', '10'}
zone_ids = {'01','02','03','04','05','06','07','08','09','10'}
zone_probe_ids = {'A', 'B'}
has_wired_zone_temp_sensor = true
has_blower_speed_control = false
has_regimes = true
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "stickland_farms"

luatest_running = true
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require(facility_path..'x600m/scripts/test_helpers')
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')
require(facility_path..'x600m/tests/application_tests')
require(facility_path..'x600m/tests/blower_functions_tests')
require(facility_path..'x600m/tests/temp_functions_tests')
require(facility_path..'x600m/tests/zone_functions_tests')

-- special test env variables
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

function appendFacilityIO(io)
  for i, blower_id in pairs(blower_ids) do
    io['blower'..blower_id..'fault'] = 1
  end
end

-- begin TestWebmacsScripts

function TestWebmacsScripts:test_update_blowers()
  initSequence()
  -- with zone offline, blower is turned off
  reg.zone01control = 0
  reg.blower01override = 0
  io.blower01run = 1
  io.blower01fault = 1
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
  io.blower01fault = 1
  io.blower01run = 0
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  -- when blower is set to custom cycle and temp has reached setpoint, blower cycle resets to keep blower running
  io.blower01run = 0
  reg.blower01customcycle = 1
  reg.blower01cycleontime = 10
  reg.blower01cycleofftime = 2
  reg.zone01pAlvtemp = 150
  reg.zone01pBlvtemp = 150
  updateBlowers()
  lu.assertEquals(reg.blower01cycle, 720)
  lu.assertEquals(io.blower01run, 1)
  reg.zone01pAlvtemp = 147
  reg.zone01pBlvtemp = 147
  reg.blower01cycle = 716
  updateBlowers()
  lu.assertEquals(reg.blower01cycle, 720)
  lu.assertEquals(io.blower01run, 1)
  -- when blower is set to custom cycle and temp is below setpoint, blower respects blower custom cycle timer
  reg.zone01pAlvtemp = 100
  reg.zone01pBlvtemp = 100
  reg.blower01cycle = 300
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  reg.zone01pAlvtemp = 100
  reg.zone01pBlvtemp = 100
  reg.blower01cycle = 100
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  -- when blower is not set to custom cycle and temp has reached setpoint, blower cycle resets to keep blower running
  reg.blower01customcycle = 0
  reg.zone01pAlvtemp = 120
  reg.zone01pBlvtemp = 120
  reg.blower01cycle = 0
  updateBlowers()
  lu.assertEquals(reg.blower01cycle, 3600)
  lu.assertEquals(io.blower01run, 0)
  reg.zone01pAlvtemp = 150
  reg.zone01pBlvtemp = 150
  updateBlowers()
  lu.assertEquals(reg.blower01cycle, 3600)
  lu.assertEquals(io.blower01run, 1)
  reg.zone01pAlvtemp = 147
  reg.zone01pBlvtemp = 147
  reg.blower01cycle = 3596
  updateBlowers()
  lu.assertEquals(reg.blower01cycle, 3600)
  lu.assertEquals(io.blower01run, 1)
  -- when blower is not set to custom cycle and temp is below setpoint, blower respects global blower cycle timer
  reg.zone01pAlvtemp = 100
  reg.zone01pBlvtemp = 100
  reg.blower01cycle = 400
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  reg.zone01pAlvtemp = 100
  reg.zone01pBlvtemp = 100
  reg.blower01cycle = 250
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
end

function TestWebmacsScripts:test_zone_controls()
  for i, zone_id in pairs(zone_ids) do
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'regime'] = 0
    reg['zone'..zone_id..'regtimer'] = 0
    reg['zone'..zone_id..'reset'] = 0
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B \n")
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 135
    reg['zone'..zone_id..'pAavgtemp'] = 128
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135\n")
    lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
    -- if all system is reset, zone values are loaded from db
    _G['ZONE_'..zone_id]["file_name"] = ""
    reg['zone'..zone_id..'control'] = 0
    initSequence()
    lu.assertEquals(reg['zone'..zone_id..'control'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    -- if move to zone is requested, moves batch to new zone
    local target_zone = '01'
    if zone_id == target_zone then
      reg['zone'..zone_id..'moveto'] = 2
      target_zone = '02'
    else
      reg['zone'..zone_id..'moveto'] = 1
    end
    reg['zone'..target_zone..'control'] = 0
    reg['zone'..target_zone..'regime'] = 0
    reg['zone'..target_zone..'regtimer'] = 0
    _G['ZONE_'..target_zone]["file_name"] = ''
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '')
    lu.assertEquals(reg['zone'..target_zone..'regime'], 1)
    lu.assertEquals(reg['zone'..target_zone..'regtimer'], 432000)
    lu.assertEquals(_G['ZONE_'..target_zone]["file_name"], '01_01_2017_120000_newbatchname.csv')
    -- if close batch is requested
    reg['zone'..target_zone..'moveto'] = -1
    updateZones()
    lu.assertEquals(_G['ZONE_'..target_zone]["file_name"], '')
  end
end
-- end TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
