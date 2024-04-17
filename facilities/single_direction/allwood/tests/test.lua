local lu = require('luaunit')

TestWebmacsScripts = {}
blower_ids = {'01', '02'}
blower_labels = {'1-4', '5-8'}
zone_ids = {'01','02','03','04','05','06','07','08'}
zone_probe_ids = {''}
has_wired_zone_temp_sensor = true
has_blower_speed_control = true
has_regimes = true
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "allwood"
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
require(facility_path..'x600m/tests/damper_functions_tests')
require(facility_path..'x600m/tests/temp_functions_tests')
require(facility_path..'x600m/tests/zone_functions_tests')

-- special test env variables
luatest_running = true
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

function appendFacilityIO(io)
  for i, blower_id in pairs(blower_ids) do
    io['blower'..blower_id..'fault'] = 1
  end
  for i, zone_id in pairs(zone_ids) do
    io['damper'..zone_id..'position'] = 0
  end
end

-- begin TestWebmacsScripts
function TestWebmacsScripts:test_update_blowers()
  initSequence()
  SETTINGS["PressureSetpointHotZoneTrigger"] = 65
  SETTINGS["PressureSetpointColdZoneTrigger"] = 40
  -- with all zones offline, blower is turned off
  reg.zone01control = 0
  reg.zone02control = 0
  reg.zone03control = 0
  reg.blower01override = 0
  io.blower01run = 1
  io.blower01fault = 1
  io.blower01speed = 0
  io.duct01pressure = 4
  io.duct02pressure = 6
  reg.duct01pressuresp = 1
  reg.duct02pressuresp = 1
  reg.duct01pressureavg = 4
  reg.duct02pressureavg = 6
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 0)
  -- if a zone is online
  reg.zone01control = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 25)
  lu.assertEquals(reg.blower01value, 25)
  -- if all the zones are online
  reg.zone02control = 1
  reg.zone03control = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 25)
  lu.assertEquals(reg.blower01value, 25)
  -- with manual override enabled
  reg.blower01override = 1
  reg.blower01control = 1
  reg.blower01value = 70
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 70)
  reg.blower01control = 0
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  -- if there is a fault, the speed is set to 0
  reg.blower01override = 0
  io.blower01fault = 0
  updateBlowers()
  lu.assertEquals(io.blower01speed, 0)
  -- if blower is off and a zone is online, the blower will start
  io.blower01fault = 1
  io.blower01run = 0
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 25)
  -- test that number of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.duct01pressuresp = 6
  reg.zone01control = 1
  reg.zone01lvtemp = 80
  reg.zone01lvtemp = 85
  reg.zone02control = 1
  reg.zone02lvtemp = 145
  reg.zone02lvtemp = 150
  reg.zone03control = 1
  reg.zone03lvtemp = 150
  reg.zone03lvtemp = 155
  reg.zone04control = 1
  reg.zone04lvtemp = 145
  reg.zone04lvtemp = 145
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 8)
  -- test that pressure setpoint max is respected
  reg.duct01pressuresp = 10
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 10)
  -- test that number of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  reg.duct01pressuresp = 6
  reg.zone01lvtemp = 40
  reg.zone01lvtemp = 45
  reg.zone02lvtemp = 50
  reg.zone02lvtemp = 55
  reg.zone03lvtemp = 150
  reg.zone03lvtemp = 155
  reg.zone04lvtemp = 150
  reg.zone04lvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that pressure setpoint min is respected
  reg.duct01pressuresp = 4
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that hot zone trigger takes precedence over cold zone trigger
  SETTINGS["PressureSetpointHotZoneTrigger"] = 2
  SETTINGS["PressureSetpointColdZoneTrigger"] = 2
  reg.duct01pressuresp = 6
  reg.zone01lvtemp = 30
  reg.zone01lvtemp = 35
  reg.zone02lvtemp = 30
  reg.zone02lvtemp = 35
  reg.zone03lvtemp = 145
  reg.zone03lvtemp = 150
  reg.zone04lvtemp = 150
  reg.zone04lvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 8)

  -- test that only online zones are accounted for
  reg.duct01pressuresp = 6
  reg.zone01lvtemp = 30
  reg.zone01lvtemp = 35
  reg.zone02lvtemp = 30
  reg.zone02lvtemp = 35
  reg.zone03lvtemp = 145
  reg.zone03lvtemp = 150
  reg.zone04lvtemp = 150
  reg.zone04lvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  reg.zone03control = 0
  reg.zone04control = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  reg.duct01pressuresp = 6
  reg.zone01lvtemp = 30
  reg.zone01lvtemp = 35
  reg.zone02lvtemp = 30
  reg.zone02lvtemp = 35
  reg.zone03lvtemp = 145
  reg.zone03lvtemp = 150
  reg.zone04lvtemp = 150
  reg.zone04lvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  io.blower01run = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
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
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature, Damper \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature, Damper \n")
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'avgtemp'] = 128
    reg['zone'..zone_id..'avgtemp'] = 135
    reg['zone'..zone_id..'avgtemp'] = 128
    reg['zone'..zone_id..'avgdamper'] = 45
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature, Damper \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 45\n")
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

function TestWebmacsScripts:test_update_duct_pressure_averages()
  initSequence()
  SETTINGS['BlowerRate'] = 10
  reg['duct01pressureavg'] = 1
  first_10_values = {3.6, 4.0, 4.2 ,4.9, 5.5, 5.8, 6.0, 5.7, 5.9, 6.1}
  for k, value in pairs(first_10_values) do
    io.duct01pressure = value
    updateDuctPressureAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['duct01pressureavg'], {6.1, 5.9, 5.7, 6, 5.8, 5.5, 4.9, 4.2, 4, 3.6})
  lu.assertEquals(reg['duct01pressureavg'], 5.17)
  --after 10 values, it starts rotating the table
  io.duct01pressure = 8.0
  updateDuctPressureAverages()
  lu.assertEquals(AVERAGE_ARRAYS['duct01pressureavg'], {8, 6.1, 5.9, 5.7, 6, 5.8, 5.5, 4.9, 4.2, 4})
  lu.assertEquals(reg['duct01pressureavg'], 5.61)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['duct01pressureavg'] = {}
  io.duct01pressure = 9.8
  updateDuctPressureAverages()
  lu.assertEquals(AVERAGE_ARRAYS['duct01pressureavg'], {9.8})
  lu.assertEquals(io.duct01pressure, 9.8)
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
