local lu = require('luaunit')

blower_ids = {'01','02'}
zone_ids = {'01'}
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "recompose_demo"

has_blower_speed_control = false
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
    SETTINGS["Zone01ProbeBPointID"] = "0000000040B04AE4_2"
    updateLastValidTemps()
    lu.assertEquals(reg.zone01pBlvtemp, 64.7)
    -- sensor id is not in data
    SETTINGS["Zone01ProbeBPointID"] = "0000000040B0FFFF_2"
    updateLastValidTemps()
    updateLastValidTemps()
    updateLastValidTemps()
    updateLastValidTemps()
    lu.assertEquals(reg.zone01pBlvtemp, 64.7)
    -- after 5th failure, lv temp goes to zero
    updateLastValidTemps()
    lu.assertEquals(reg.zone01pBlvtemp, 0)
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
    reg.zone01control = 1
    reg.zone01pAlvtemp = 115
    reg.zone01pBlvtemp = 125
    local avg = tempAvgForZones({'01'}, {'A','B'})
    lu.assertEquals(avg, 120)
    -- ignores disconnected probe
    reg.zone01pBlvtemp = nil
    avg = tempAvgForZones({'01'}, {'A','B'})
    lu.assertEquals(avg, 115)
    -- ignores lv temp out of range
    reg.zone01pBlvtemp = -10
    avg = tempAvgForZones({'01'}, {'A','B'})
    lu.assertEquals(avg, 115)
    -- returns zero for zone offline
    reg.zone01control = 0
    avg = tempAvgForZones({'01'}, {'A','B'})
    lu.assertEquals(avg, 0)
  end

  function TestWebmacsScripts:test_update_blowers()
    initSequence()
    -- with zone offline, blower is turned off
    reg.zone01control = 0
    reg.blower01override = 0
    io.blower01run = 1
    reg.blower01cycle = 60 * 60
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    -- if a zone is online
    reg.zone01control = 1
    reg.zone01pAlvtemp = 160
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
    -- if zone temp is cool
    reg.zone01pAlvtemp = 60
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
    reg.zone01pAlvtemp = 50
    reg.blower01cycle = 200
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    -- with manual override enabled
    reg.blower01override = 1
    reg.blower01control = 1
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
    reg.blower01control = 0
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    -- if blower is off, a zone is online and cycle off time has completed, the blower will start
    reg.blower01override = 0
    io.blower01run = 0
    reg.blower01cycle = 0
    updateBlowers()
    lu.assertEquals(reg.blower01cycle, 3600)
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
    -- if PAS blower is on, drum ventilation blower is forced on
    reg.blower01override = 0
    io.blower01run = 1
    reg.blower02override = 1
    reg.blower02control = 0
    io.blower02run = 0
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
    lu.assertEquals(io.blower02run, 1)
    -- when blower 1 stops running, blower 2 manual control resumes
    reg.blower01cycle = 200
    updateBlowers()
    lu.assertEquals(reg.blower01cycle, 200)
    lu.assertEquals(io.blower01run, 0)
    lu.assertEquals(io.blower02run, 0)
    -- if PAS blower is off, drum ventilation blower follows duty cycle
    reg.zone01pAlvtemp = 160
    reg.zone01pBlvtemp = 165
    reg.blower01cycle = 3600
    reg.blower01override = 1
    reg.blower01control = 0
    io.blower01run = 0
    reg.blower02override = 0
    reg.blower02control = 1
    io.blower02run = 1
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    lu.assertEquals(io.blower02run, 1)
    reg.blower02cycle = 280
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    lu.assertEquals(io.blower02run, 0)
    reg.blower02cycle = 3600
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    lu.assertEquals(io.blower02run, 1)
    reg.zone01control = 0
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    lu.assertEquals(io.blower02run, 0)
  end

  function TestWebmacsScripts:test_zone_controls()
    for i, zone_id in pairs(zone_ids) do
      -- with empty filename, creates new filename
      reg['zone'..zone_id..'control'] = 1
      reg['zone'..zone_id..'reset'] = 0
      reg['drum'..zone_id..'ignorels'] = 0
      _G['ZONE_'..zone_id]["file_name"] = ""
      -- simulate user entering batch name
      updateZoneBatchTitle (zone_id, 'newbatchname')
      updateZones()
      lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Head-Space Temp, Drum Rotation \n")
      -- with zone reset active, creates new filename
      reg['zone'..zone_id..'reset'] = 1
      _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
      -- simulate user entering batch name
      updateZoneBatchTitle (zone_id, 'newbatchname')
      updateZones()
      lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Head-Space Temp, Drum Rotation \n")
      lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
      -- when print timer reaches zero, logs data and reset timer
      reg['zone'..zone_id..'print'] = 0
      reg['zone'..zone_id..'pAavgtemp'] = 128
      reg['zone'..zone_id..'pBavgtemp'] = 135
      reg['zone'..zone_id..'pCavgtemp'] = 143
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Head-Space Temp, Drum Rotation \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 0, 0\n")
      lu.assertEquals(reg['zone'..zone_id..'print'], 21600)
      -- if all system is reset, zone values are loaded from db
      _G['ZONE_'..zone_id]["file_name"] = ""
      reg['zone'..zone_id..'control'] = 0
      initSequence()
      lu.assertEquals(reg['zone'..zone_id..'control'], 1)
      lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
      -- when drum rotation limit switch activates, logs data
      reg['drum'..zone_id..'control'] = 1
      io['drum'..zone_id..'limitswitch'] = 1
      reg['drum'..zone_id..'ignorels'] = 0
      reg['drum'..zone_id..'logrotation'] = 1
      drumRotationControl(zone_id)
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Head-Space Temp, Drum Rotation \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 0, 0\n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 0, 100\n")
      -- when head space temperature probe is manually inserted into drum and log head space toggle is off, head space temp is not logged
      io['headspace'..zone_id..'probe'] = 75
      reg['headspace'..zone_id..'logtemp'] = 0
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Head-Space Temp, Drum Rotation \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 0, 0\n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 0, 100\n")
      -- when head space temperature probe is manually inserted into drum and log head space toggle is on, head space temp is logged
      io['headspace'..zone_id..'probe'] = 75
      reg['headspace'..zone_id..'logtemp'] = 1
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Head-Space Temp, Drum Rotation \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 0, 0\n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 0, 100\n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 143, 75, 0\n")
    end
  end

  function TestWebmacsScripts:test_drum_rotation_control()
    initSequence()
    reg.zone01pAavgtemp = 101
    reg.zone01pBavgtemp = 105
    reg.zone01pCavgtemp = 103
    reg.drum01pistonld = 2
    reg.drum01control = 0
    io.drum01limitswitch = 0
    io.drum01pistonout = 0
    io.drum01pistonin = 0
    reg.drum01pistoncycle = 0
    -- if drum rotation control is off, drum rotation piston relays are off
    updateDampers()
    lu.assertEquals(reg.drum01pistoncycle, 0)
    lu.assertEquals(reg.drum01ignorels, 60)
    lu.assertEquals(io.drum01pistonout, 0)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if drum rotation control is on, drum rotation piston extend relay changes to on
    reg.drum01control = 1
    updateDampers()
    lu.assertEquals(reg.drum01pistoncycle, tonumber(SETTINGS['DrumPistonExtensionCycleTime']))
    lu.assertEquals(reg.drum01ignorels, 0)
    lu.assertEquals(io.drum01pistonout, 1)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if drum rotation limit switch and piston cycle timer has not completed, direction is not changed
    reg.drum01pistoncycle = 2
    updateDampers()
    lu.assertEquals(reg.drum01pistoncycle, 2)
    lu.assertEquals(reg.drum01ignorels, 0)
    lu.assertEquals(io.drum01pistonout, 1)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if drum piston cycle timer completes, direction is reversed
    reg.drum01pistoncycle = 0
    updateDampers()
    lu.assertEquals(reg.drum01pistoncycle, tonumber(SETTINGS['DrumPistonRetractionCycleTime']))
    lu.assertEquals(reg.drum01ignorels, 0)
    lu.assertEquals(io.drum01pistonout, 0)
    lu.assertEquals(io.drum01pistonin, 1)
    -- if drum piston cycle timer completes, direction is reversed
    reg.drum01pistoncycle = 0
    updateDampers()
    lu.assertEquals(reg.drum01pistoncycle, tonumber(SETTINGS['DrumPistonExtensionCycleTime']))
    lu.assertEquals(reg.drum01ignorels, 0)
    lu.assertEquals(io.drum01pistonout, 1)
    lu.assertEquals(io.drum01pistonin, 0)
    lu.assertEquals(reg.drum01pistonld, 1)
    -- if drum rotation is stopped mid-rotation, drum rotation piston relays are set to off and piston cycle timer is set to 0
    reg.drum01control = 0
    updateDampers()
    lu.assertEquals(reg.drum01pistoncycle, 0)
    lu.assertEquals(reg.drum01ignorels, 60)
    lu.assertEquals(io.drum01pistonout, 0)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if drum rotation is started again after being stopped mid-rotation, drum rotation piston relays resume last state and piston cycle is reset
    reg.drum01control = 1
    updateDampers()
    lu.assertEquals(reg.drum01pistoncycle, tonumber(SETTINGS['DrumPistonExtensionCycleTime']))
    lu.assertEquals(reg.drum01ignorels, 0)
    lu.assertEquals(io.drum01pistonout, 1)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if drum rotation limit switch is activated, drum control and drum rotation piston relays are set to off
    io.drum01limitswitch = 1
    updateDampers()
    lu.assertEquals(reg.drum01ignorels, 60)
    lu.assertEquals(reg.drum01control, 0)
    lu.assertEquals(io.drum01pistonout, 0)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if control is set to on and drum rotation limit switch is activated, drum rotation limit switch is ignored for DrumLimitSwitchIgnoreTime
    reg.drum01control = 1
    for count=reg.drum01ignorels,1,-1 do
      updateDampers()
      lu.assertEquals(reg.drum01ignorels, count-1)
      lu.assertEquals(reg.drum01control, 1)
    end
    lu.assertEquals(reg.drum01ignorels, 0)
    -- if drum limit switch ignore counter is 0 and limit swith is activated, drum rotation piston relays turn off
    io.drum01limitswitch = 1
    updateDampers()
    lu.assertEquals(reg.drum01ignorels, 60)
    lu.assertEquals(reg.drum01control, 0)
    lu.assertEquals(io.drum01pistonout, 0)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if control is still off and drum rotation limit switch is not activated, drum rotation piston relays stay off
    -- and drum limit switch ignore counter is reset to 0
    io.drum01limitswitch = 0
    updateDampers()
    lu.assertEquals(reg.drum01ignorels, 60)
    lu.assertEquals(reg.drum01control, 0)
    lu.assertEquals(io.drum01pistonout, 0)
    lu.assertEquals(io.drum01pistonin, 0)
    -- if control is switched to on and drum rotation limit switch is not activated, drum rotation piston out relay switches on
    -- and drum limit switch ignore counter remains 0
    reg.drum01control = 1
    updateDampers()
    lu.assertEquals(reg.drum01ignorels, 0)
    lu.assertEquals(reg.drum01control, 1)
    lu.assertEquals(io.drum01pistonout, 1)
    lu.assertEquals(io.drum01pistonin, 0)
  end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
