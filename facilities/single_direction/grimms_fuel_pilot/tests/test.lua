local lu = require('luaunit')

blower_ids = {}
zone_probe_ids = {''}
zone_ids = {'01','02', '03'}
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "grimms_fuel_pilot"

has_blower_speed_control = false

luatest_running = true
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require(facility_path..'x600m/scripts/test_helpers')
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- special test env variables
luatest_running = true
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

TestWebmacsScripts = {}
  function TestWebmacsScripts:setUp()
    io = initIO()
    reg = initRegisters()
  end

  function TestWebmacsScripts:tearDown()
    lu.assertEquals(var_names_are_valid(), true)
  end

  function TestWebmacsScripts:test_init_values()
    initValues()
    lu.assertEquals(_G['DAMPER_02']['control'], 0)
  end

  function TestWebmacsScripts:test_default_settings()
    local settings = defaultSettings()
    lu.assertEquals(settings['DataLoggingRate'], "360")
  end

  function TestWebmacsScripts:test_load_settings()
    initSequence()
    SETTINGS = {}
    loadSettings()
    lu.assertEquals(SETTINGS['DataLoggingRate'], "360")
  end

  function TestWebmacsScripts:test_update_damper_averages()
    initSequence()
    SETTINGS["DataLoggingRate"] = 50
    reg.zone03control = 1
    first_10_values = {10, 30, 50, 70, 90, 100, 80, 60, 20, 0}
    for k, value in pairs(first_10_values) do
      io.damper03position = value
      reg.zone03avgtimer = 0
      updateDamperAverages()
    end
    lu.assertEquals(AVERAGE_ARRAYS['zone03avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone03avgdamper'], 51)
    lu.assertEquals(reg['zone03avgtimer'], 300)
    -- if zone is offline or timer is not complete, does nothing
    io.damper03position = 80
    reg.zone03control = 0
    reg.zone03avgtimer = 0
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone03avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone03avgdamper'], 51)
    reg.zone03control = 1
    reg.zone03avgtimer = 300
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone03avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone03avgdamper'], 51)
    -- otherwise, after 10 values, it starts rotating the table
    reg.zone03control = 1
    reg.zone03avgtimer = 0
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone03avgdamper'], {80, 0, 20, 60, 80, 100, 90, 70, 50, 30})
    lu.assertEquals(reg['zone03avgdamper'], 58)
    --with no historic values, it is just the lastest value
    AVERAGE_ARRAYS['zone03avgdamper'] = {}
    io.damper03position = 80
    reg.zone03avgtimer = 0
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone03avgdamper'], {80})
    lu.assertEquals(reg.zone03avgdamper, 80)
    initSequence()
  end

  function TestWebmacsScripts:test_update_damper_pid_values()
    initSequence()
    SETTINGS["MinDamperValue"] = "15"
    SETTINGS['DamperRate'] = "10"
    SETTINGS["DamperGain"] = "1"
    SETTINGS["DamperIntegral"] = "1"
    SETTINGS["DamperDerivative"] = "0.3"
    SETTINGS['DamperTempSetPoint'] = "100"
    -- cold exhaust temps result in min damper position
    updateDamperPIDValues(DAMPER_03, 95, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(DAMPER_03['control'], 44.85)
    updateDamperPIDValues(DAMPER_03, 95, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(DAMPER_03['control'], 15)
    -- warm exhaust temps result in increasing damper position
    updateDamperPIDValues(DAMPER_03, 105, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(DAMPER_03['control'], 70.3)
    updateDamperPIDValues(DAMPER_03, 105, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(DAMPER_03['control'], 100)
    -- decreasing temps result in decreasing damper position
    updateDamperPIDValues(DAMPER_03, 98, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(math.floor(DAMPER_03['control']), 77)
    updateDamperPIDValues(DAMPER_03, 98, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(DAMPER_03['control'], 58)
  end

  function TestWebmacsScripts:test_update_dampers()
    initSequence()
    SETTINGS["MinDamperValue"] = "15"
    SETTINGS["Regime1TempSetPoint"] = "135"
    for i, zone_id in pairs(zone_ids) do
      zone_prefix = 'zone'..zone_id
      damper_prefix = 'damper'..zone_id
      reg[zone_prefix..'control'] = 1
      reg[damper_prefix..'override'] = 0
      reg[zone_prefix..'lvtemp'] = 130
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 59.15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 22.22)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
      lu.assertEquals(io[damper_prefix..'position'], 15)
      reg[zone_prefix..'lvtemp'] = 140
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

  function TestWebmacsScripts:test_update_temp_averages()
    initSequence()
    first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
    for k, value in pairs(first_10_values) do
      io.zone01temp = value
      updateTempAverages()
    end
    lu.assertEquals(AVERAGE_ARRAYS['zone01avgtemp'], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
    lu.assertEquals(reg['zone01avgtemp'], 110)
    --after 10 values, it starts rotating the table
    io.zone01temp = 80
    updateTempAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone01avgtemp'], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
    lu.assertEquals(reg['zone01avgtemp'], 106)
    --with no historic values, it is just the lastest value
    AVERAGE_ARRAYS['zone01avgtemp'] = {}
    io.zone01temp = 80
    updateTempAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone01avgtemp'], {80})
    lu.assertEquals(reg.zone01avgtemp, 80)
  end

  function TestWebmacsScripts:test_temp_average_for_zones()
    reg.zone02control = 1
    reg.zone02temp = 115
    reg.zone02lvtemp = 125
    local avg = tempAvgForZones({'02'}, {''})
    lu.assertEquals(avg, 125)
    -- zero for disconnected probe
    reg.zone02lvtemp = nil
    avg = tempAvgForZones({'02'}, {''})
    lu.assertEquals(avg, 0)
    -- zero for lv temp out of range
    reg.zone02lvtemp = -10
    avg = tempAvgForZones({'02'}, {''})
    lu.assertEquals(avg, 0)
    -- returns zero for zone offline
    reg.zone02control = 0
    reg.zone02lvtemp = 125
    avg = tempAvgForZones({'02'}, {''})
    lu.assertEquals(avg, 0)
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
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature, Damper \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128\n")
      lu.assertEquals(reg['zone'..zone_id..'print'], 21600)
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
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
