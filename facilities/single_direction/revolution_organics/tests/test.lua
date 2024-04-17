local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = 'revolution_organics'
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(7)
blower_labels = {'1','2','3','4','5','6','7'}
zone_ids = uid(14)
zone_probe_ids = {'A', 'B'}
has_wired_zone_temp_sensor = true
has_blower_speed_control = true
has_blower_temp_setpoint = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')
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
  -- with both zones offline, blower is turned off
  io.damper03position = 0
  io.damper04position = 0
  reg.blower02override = 0
  io.blower02run = 1
  io.blower02fault = 1
  io.blower02speed = 0
  reg.blower02cycle = 60 * 60
  updateBlowers()
  lu.assertEquals(io.blower02run, 0)
  lu.assertEquals(io.blower02speed, 0)
  -- if a zone is online
  io.damper04position = 100
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 100)
  lu.assertEquals(reg.blower02value, 100)
  -- if other zone is online
  io.damper03position = 100
  io.damper04position = 0
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 100)
  lu.assertEquals(reg.blower02value, 100)
  -- if both zones are online
  io.damper04position = 100
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 100)
  lu.assertEquals(reg.blower02value, 100)
  -- if average of damper positions is lower than blower min speed
  io.damper03position = 10
  io.damper04position = 0
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 25)
  lu.assertEquals(reg.blower02value, 25)
  -- with manual override enabled
  reg.blower02override = 1
  reg.blower02control = 1
  reg.blower02value = 70
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 70)
  reg.blower02control = 0
  updateBlowers()
  lu.assertEquals(io.blower02run, 0)
  -- if there is a fault, the speed is set to 0
  reg.blower02override = 0
  io.blower02fault = 0
  updateBlowers()
  lu.assertEquals(io.blower02speed, 0)
  -- if blower is off and a zone is online, the blower will start
  io.damper03position = 0
  io.damper04position = 100
  io.blower02fault = 1
  io.blower02run = 0
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 100)
end

function TestWebmacsScripts:test_zone_controls()
  for i, zone_id in pairs(zone_ids) do
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'reset'] = 0
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, PFRP Time \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, PFRP Time \n")
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 135
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'avgdamper'] = 45
    reg['zone'..zone_id..'pfrptime'] = 4320
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, PFRP Time \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 45, 4320\n")
    lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
    -- if all system is reset, zone values are loaded from db
    _G['ZONE_'..zone_id]["file_name"] = ""
    reg['zone'..zone_id..'control'] = 0
    initSequence()
    lu.assertEquals(reg['zone'..zone_id..'control'], 1)
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
  end
end

function TestWebmacsScripts:test_update_dampers()
  initSequence()
  SETTINGS["MinDamperValue"] = "15"
  SETTINGS["Regime1TempSetPoint"] = "135"
  SETTINGS["DamperGain"] = "1"
  SETTINGS["DamperIntegral"] = "1"
  SETTINGS["DamperDerivative"] = "0.3"
  SETTINGS["DamperDerivativeTime"] = "10"
  SETTINGS["DamperRate"] = "10"
  if has_blower_temp_setpoint == true then
    for i, blower_id in pairs(blower_ids) do
      SETTINGS["Blower"..blower_id.."TempSetPoint"] = "135"
    end
  end
  if has_zone_temp_setpoint == true then
    for i, zone_id in pairs(zone_ids) do
      SETTINGS["Zone"..zone_id.."TempSetPoint"] = "135"
    end
  end
  for i, zone_id in pairs(zone_ids) do
    zone_prefix = 'zone'..zone_id
    damper_prefix = 'damper'..zone_id
    reg[zone_prefix..'control'] = 1
    reg[damper_prefix..'override'] = 0
    reg[zone_prefix..'pAlvtemp'] = 125
    reg[zone_prefix..'pBlvtemp'] = 135
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 59.15)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 22.22)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
    lu.assertEquals(io[damper_prefix..'position'], 15)
    reg[zone_prefix..'pAlvtemp'] = 135
    reg[zone_prefix..'pBlvtemp'] = 145
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 55.96)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 92.78)
    reg[zone_prefix..'control'] = 0
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 0)
    reg[zone_prefix..'control'] = 1
    reg[damper_prefix..'override'] = 1
    reg[damper_prefix..'value'] = 80
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 80)
    -- with zone offline, manual override stays in effect
    reg[zone_prefix..'control'] = 0
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 80)
  end
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
