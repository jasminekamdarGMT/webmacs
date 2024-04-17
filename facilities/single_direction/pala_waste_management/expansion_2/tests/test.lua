local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "pala_waste_management/expansion_2"
main_path = package.path

-- control scripts
package.path = main_path .. ';'..facility_path..facility_name..'/scripts/?.lua'
require('data_functions')
require('facility_configuration')

-- globals for tests
pump_ids = uid(2)
tank_ids = uid(2)
zone_ids = uid(0)
duct_probe_ids = {'A', 'B'}
has_wired_zone_temp_sensor = true
has_blower_speed_control = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')

-- special test env variables
luatest_running = true
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

function appendFacilityIO(io)
  for i, pump_id in pairs(pump_ids) do
    io['pump'..pump_id..'run'] = 0
    io['pump'..pump_id..'fault'] = 1
    for p, probe_id in pairs(duct_probe_ids) do
      io['duct'..pump_id..probe_id..'pressure'] = 0
    end
  end
  for i, tank_id in pairs(tank_ids) do
    io['tank'..tank_id..'pressure'] = 0
  end
end

function initializeRegisters()
  local reg = {}
  for i, pump_id in pairs(pump_ids) do
    reg['pump'..pump_id..'control'] = 0
    reg['pump'..pump_id..'reset'] = 0
    reg['pump'..pump_id..'alarm'] = 0
    reg['pump'..pump_id..'alarmage'] = 0
    for p, probe_id in pairs(duct_probe_ids) do
      reg['duct'..pump_id..probe_id..'presssptimer'] = 0
      reg['duct'..pump_id..probe_id..'pressuresp'] = 0
      reg['duct'..pump_id..probe_id..'pressureavg'] = 0
    end
  end
  for i, tank_id in pairs(tank_ids) do
    reg['tank'..tank_id..'level'] = 0
    reg['tank'..tank_id..'presssptimer'] = 0
    reg['tank'..tank_id..'pressuresp'] = 0
    reg['tank'..tank_id..'pressureavg'] = 0
    reg['tank'..tank_id..'alarm'] = 0
  end
  if appendFacilityReg ~= nil then
    appendFacilityReg(reg)
  end
  return reg
end

function TestWebmacsScripts:setUp()
  initValues()
  io = initIO()
  reg = initializeRegisters()
end

function TestWebmacsScripts:tearDown()
  lu.assertEquals(var_names_are_valid(), true)
end

function TestWebmacsScripts:test_init_values()
  initValues()
  lu.assertEquals(_G['PUMP_02']['fault_email'], 0)
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

function TestWebmacsScripts:test_pump_logging()
  SETTINGS["DataLoggingRate"] = 120
  SETTINGS["Tank01LowLevel"] = "30"
  SETTINGS["Tank02LowLevel"] = "30"
  SETTINGS["Tank01CriticalLowLevel"] = "25"
  SETTINGS["Tank02CriticalLowLevel"] = "25"
  SETTINGS["Pump01PressureSetpointMax"] = "50"
  SETTINGS["Pump02PressureSetpointMax"] = "50"
  reg['pump01print'] = 0
  reg['pump02print'] = 0
  io['tank01pressure'] = 30
  io['tank02pressure'] = 30
  for i, pump_id in pairs(pump_ids) do
    -- with empty filename, creates new filename
    reg['pump'..pump_id..'control'] = 0
    reg['pump'..pump_id..'reset'] = 0
    _G['PUMP_'..pump_id]["file_name"] = ""
    updatePumps()
    if pump_id == "01" then
      lu.assertEquals(_G['PUMP_'..pump_id]["file_name"], '01_01_2017_120000_HV.csv')
    else
      lu.assertEquals(_G['PUMP_'..pump_id]["file_name"], '01_01_2017_120000_LV.csv')
    end
    lu.assertEquals(test_files[webmacs_db_path .. _G['PUMP_'..pump_id]["file_name"]], "Date/Time, Message \n")
    -- when print timer reaches zero, logs data and reset timer
    reg['pump'..pump_id..'print'] = 0
    io['tank'..pump_id..'pressure'] = 1
    updatePumps()
    lu.assertEquals(test_files[webmacs_db_path .. _G['PUMP_'..pump_id]["file_name"]], "Date/Time, Message \n01/01/2017 12:00:00, Tank "..pump_id.." level is critically low.\n")
    reg['pump'..pump_id..'print'] = 50
    io['tank'..pump_id..'pressure'] = 1
    updatePumps()
    lu.assertEquals(test_files[webmacs_db_path .. _G['PUMP_'..pump_id]["file_name"]], "Date/Time, Message \n01/01/2017 12:00:00, Tank "..pump_id.." level is critically low.\n")
    lu.assertEquals(reg['pump'..pump_id..'print'], 50)
    reg['pump'..pump_id..'print'] = 0
    io['tank'..pump_id..'pressure'] = 1
    updatePumps()
    lu.assertEquals(test_files[webmacs_db_path .. _G['PUMP_'..pump_id]["file_name"]], "Date/Time, Message \n01/01/2017 12:00:00, Tank "..pump_id.." level is critically low.\n01/01/2017 12:00:00, Tank "..pump_id.." level is critically low.\n")
    lu.assertEquals(reg['pump'..pump_id..'print'], 7200)
    -- if all system is reset, pump values are loaded from db
    _G['PUMP_'..pump_id]["file_name"] = ""
    initSequence()
    if pump_id == "01" then
      lu.assertEquals(_G['PUMP_'..pump_id]["file_name"], '01_01_2017_120000_HV.csv')
    else
      lu.assertEquals(_G['PUMP_'..pump_id]["file_name"], '01_01_2017_120000_LV.csv')
    end
  end
end

function TestWebmacsScripts:test_update_pumps()
  initSequence()
  -- initValues()
  SETTINGS["Tank01LowLevel"] = "30"
  SETTINGS["Tank02LowLevel"] = "30"
  SETTINGS["Tank01CriticalLowLevel"] = "25"
  SETTINGS["Tank02CriticalLowLevel"] = "25"
  SETTINGS["Pump01PressureSetpointMax"] = "50"
  SETTINGS["Pump02PressureSetpointMax"] = "50"
  emails_sent = 0
  reg['pump01print'] = 0
  reg['pump02print'] = 0
  io['tank01pressure'] = 30
  io['tank02pressure'] = 30
  reg['pump01control'] = 1
  io['pump01run'] = 0
  updatePumps()
  lu.assertEquals(io['pump01run'], 1)
  lu.assertEquals(emails_sent, 0)
  -- Pump turns off when pump control is deactivated
  reg['pump01print'] = 0
  reg['pump01control'] = 0
  updatePumps()
  lu.assertEquals(io['pump01run'], 0)
  lu.assertEquals(emails_sent, 0)
  -- Pump turns off when either duct pressure sensor exceeds max setpoint
  reg['pump01print'] = 0
  io['duct01Apressure'] = 51
  io['pump01run'] = 1
  reg['pump01control'] = 1
  updatePumps()
  lu.assertEquals(io['pump01run'], 0)
  lu.assertEquals(emails_sent, 1)
  reg['pump01print'] = 0
  io['duct01Apressure'] = 30
  io['duct01Bpressure'] = 51
  io['pump01run'] = 1
  reg['pump01control'] = 1
  updatePumps()
  lu.assertEquals(io['pump01run'], 0)
  lu.assertEquals(emails_sent, 2)
  -- Pump turns off when tank level is low
  io['duct01Bpressure'] = 30
  reg['pump01print'] = 0
  io['tank01pressure'] = 2
  updatePumps()
  lu.assertEquals(io['pump01run'], 0)
  lu.assertEquals(emails_sent, 3)
  reg['pump01print'] = 0
  io['tank01pressure'] = 30
  io['tank01pressure'] = 1
  updatePumps()
  lu.assertEquals(io['pump01run'], 0)
  lu.assertEquals(emails_sent, 4)
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
