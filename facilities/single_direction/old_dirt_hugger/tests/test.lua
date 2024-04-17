local lu = require('luaunit')

blower_ids = {'01','02'}
zone_ids = {'01','02'}
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "old_dirt_hugger"

has_blower_speed_control = true
luatest_running = true
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require(facility_path..'x600m/scripts/test_helpers')
require('data_functions')
require('damper_functions')
require('blower_functions')
require('temp_functions')
require('facility_configuration')

-- special test env variables
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
    lu.assertEquals(_G['BLOWER_02']['control'], 100)
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

  function TestWebmacsScripts:test_update_last_valid_temps()
    SETTINGS["Zone02ProbeBPointID"] = "0000000040B04AE4_2"
    updateLastValidTemps()
    lu.assertEquals(reg.zone02pBlvtemp, 64.7)
    -- sensor id is not in data
    SETTINGS["Zone02ProbeBPointID"] = "0000000040B0FFFF_2"
    updateLastValidTemps()
    updateLastValidTemps()
    updateLastValidTemps()
    updateLastValidTemps()
    lu.assertEquals(reg.zone02pBlvtemp, 64.7)
    -- after 5th failure, lv temp goes to zero
    updateLastValidTemps()
    lu.assertEquals(reg.zone02pBlvtemp, 0)
  end

  function TestWebmacsScripts:test_update_temp_averages()
    initSequence()
    first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
    for k, value in pairs(first_10_values) do
      reg.zone01pAlvtemp = value
      updateTempAverages()
    end
    lu.assertEquals(AVERAGE_ARRAYS['zone01pAavgtemp'], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
    lu.assertEquals(reg['zone01pAavgtemp'], 110)
    --after 10 values, it starts rotating the table
    reg.zone01pAlvtemp = 80
    updateTempAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone01pAavgtemp'], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
    lu.assertEquals(reg['zone01pAavgtemp'], 106)
    --with no historic values, it is just the lastest value
    AVERAGE_ARRAYS['zone01pAavgtemp'] = {}
    reg.zone01pAlvtemp = 80
    updateTempAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone01pAavgtemp'], {80})
    lu.assertEquals(reg.zone01pAavgtemp, 80)
  end

  function TestWebmacsScripts:test_temp_average_for_zones()
    reg.zone02control = 1
    reg.zone02pAlvtemp = 115
    reg.zone02pBlvtemp = 125
    local avg = tempAvgForZones({'02'}, {'A','B'})
    lu.assertEquals(avg, 120)
    -- ignores disconnected probe
    reg.zone02pBlvtemp = nil
    avg = tempAvgForZones({'02'}, {'A','B'})
    lu.assertEquals(avg, 115)
    -- ignores lv temp out of range
    reg.zone02pBlvtemp = -10
    avg = tempAvgForZones({'02'}, {'A','B'})
    lu.assertEquals(avg, 115)
    -- returns zero for zone offline
    reg.zone02control = 0
    avg = tempAvgForZones({'02'}, {'A','B'})
    lu.assertEquals(avg, 0)
  end

  function TestWebmacsScripts:test_update_blowers()
    initSequence()
    -- with zone offline, blower is turned off
    reg.zone02control = 0
    reg.blower02override = 0
    io.blower02run = 1
    reg.blower02cycle = 60 * 60
    io.blower02speed = 0
    updateBlowers()
    lu.assertEquals(io.blower02run, 0)
    lu.assertEquals(io.blower02speed, 0)
    -- if a zone is online
    reg.zone02control = 1
    reg.zone02pAlvtemp = 160
    updateBlowers()
    lu.assertEquals(io.blower02run, 1)
    lu.assertEquals(io.blower02speed, 100)
    lu.assertEquals(reg.blower02value, 100)
    -- if zone temp is cool
    reg.zone02pAlvtemp = 60
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
    -- if blower is off and a zone is online, the blower will start
    reg.blower02override = 0
    io.blower02run = 0
    updateBlowers()
    lu.assertEquals(io.blower02run, 1)
    lu.assertEquals(io.blower02speed, 25)
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

  function TestWebmacsScripts:test_pump_control()
    initSequence()
    reg['pump01speed'] = 1
    reg['pump02speed'] = 2
    updateDampers()
    lu.assertEquals(io['pump01run'], 1)
    lu.assertEquals(io['pump02run'], 1)
    lu.assertEquals(io['pump01speed1'], 1)
    lu.assertEquals(io['pump02speed1'], 0)
    lu.assertEquals(io['pump01speed2'], 0)
    lu.assertEquals(io['pump02speed2'], 1)
    reg['pump01speed'] = 0
    reg['pump02speed'] = 3
    updateDampers()
    lu.assertEquals(io['pump01run'], 0)
    lu.assertEquals(io['pump02run'], 1)
    lu.assertEquals(io['pump01speed1'], 0)
    lu.assertEquals(io['pump02speed1'], 1)
    lu.assertEquals(io['pump01speed2'], 0)
    lu.assertEquals(io['pump02speed2'], 1)
  end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
