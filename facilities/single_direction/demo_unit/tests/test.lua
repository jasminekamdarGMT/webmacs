local lu = require('luaunit')

TestWebmacsScripts = {}
blower_ids = {'01','02'}
blower_labels = {'1', '2'}
zone_ids = {'01','02'}
zone_probe_ids = {''}
has_wired_zone_temp_sensor = true
has_blower_speed_control = false
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "demo_unit"

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
luatest_running = true
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

function TestWebmacsScripts:test_blower_fault_alarms()
  -- no blower fault ios
end

function TestWebmacsScripts:test_default_settings()
  local settings = defaultSettings()
  lu.assertEquals(settings['DataLoggingRate'], "30")
end

function TestWebmacsScripts:test_load_settings()
  initSequence()
  SETTINGS = {}
  loadSettings()
  lu.assertEquals(SETTINGS['DataLoggingRate'], "30")
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
