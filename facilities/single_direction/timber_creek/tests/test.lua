local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "timber_creek"
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(2)
blower_labels = {'1-4','5-8'}
zone_ids = uid(8)
zone_probe_ids = {'A'}
has_wireless_zone_temp_sensor = true
has_blower_speed_control = true
has_regimes = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')
require(facility_path..'x600m/tests/application_tests')
require(facility_path..'x600m/tests/blower_functions_tests')
require(facility_path..'x600m/tests/damper_functions_tests')
require(facility_path..'x600m/tests/temp_functions_tests')
require(facility_path..'x600m/tests/wireless_temp_sensor_tests')
require(facility_path..'x600m/tests/zone_functions_tests')

-- special test env variables
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
    reg.blower01cycleofftime = 30
    reg.blower01cycleontime = 30
    reg.blower01customcycle = 1
    io.blower01run = 1
    io.blower01fault = 1
    io.blower01speed = 0
    io.duct01pressure = 4
    reg.duct01pressuresp = 1
    reg.duct01pressureavg = 4
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    -- with manual override enabled
    reg.blower01override = 1
    reg.blower01control = 1
    io.blower01run = 0
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
    reg.blower01control = 0
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    -- if blowerxcycle is greater than blowerxcycleofftime converted to seconds, blower turns on.
    lu.assertEquals(reg.blower01cycleofftime, 30)
    reg.blower01cycle = 2000
    reg.blower01override = 0
    reg.blower01control = 1
    io.blower01fault = 1
    io.blower01run = 0
    reg.zone01control = 1
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
    lu.assertEquals(reg.blower01cycle, 2000)
    -- if blowerxcycle is less than blowerxcycleofftime converted to seconds, blower stops running.
    reg.blower01cycle = 1700
    reg.blower01override = 0
    reg.blower01control = 1
    io.blower01fault = 1
    reg.zone01control = 1
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    lu.assertEquals(reg.blower01cycle, 1700)
    -- if blowerxcycle reaches 0, blower stops running and blowerxcycle resets.
    reg.blower01cycle = 0
    reg.blower01override = 0
    reg.blower01control = 1
    io.blower01fault = 1
    reg.zone01control = 1
    updateBlowers()
    lu.assertEquals(io.blower01run, 0)
    lu.assertEquals(reg.blower01cycle, 3600)
    updateBlowers()
    lu.assertEquals(io.blower01run, 1)
  end

  function TestWebmacsScripts:test_zone_controls()
    for i, blower_id in pairs(blower_ids) do
      io['blower'..blower_id..'speed'] = 65
      io['duct'..blower_id..'pressure'] = 4
      reg['duct'..blower_id..'pressureavg'] = 4
    end
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
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Damper, Blower Speed, Duct Pressure \n")
      -- with zone reset active, creates new filename
      reg['zone'..zone_id..'reset'] = 1
      _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
      -- simulate user entering batch name
      updateZoneBatchTitle (zone_id, 'newbatchname')
      updateZones()
      lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Damper, Blower Speed, Duct Pressure \n")
      lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
      lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
      -- when print timer reaches zero, logs data and reset timer
      reg['zone'..zone_id..'print'] = 0
      reg['zone'..zone_id..'pAavgtemp'] = 128
      reg['zone'..zone_id..'pAavgtemp'] = 128
      reg['zone'..zone_id..'avgdamper'] = 45
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Damper, Blower Speed, Duct Pressure \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 45, 65, 4\n")
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

  function TestWebmacsScripts:test_update_dampers()
    initSequence()
    SETTINGS["MinDamperValue"] = "15"
    SETTINGS["Regime1TempSetPoint"] = "135"
    for i, zone_id in pairs(zone_ids) do
      zone_prefix = 'zone'..zone_id
      damper_prefix = 'damper'..zone_id
      reg[zone_prefix..'control'] = 1
      reg[damper_prefix..'override'] = 0
      reg[zone_prefix..'pAlvtemp'] = 130
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 59.15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 22.22)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
      lu.assertEquals(io[damper_prefix..'position'], 15)
      reg[zone_prefix..'pAlvtemp'] = 140
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

function TestWebmacsScripts:test_retrieve_wireless_sensor_data_tcp()
  initSequence()
  local sensor_data = retrieveWirelessSensorDataTCP()

  for i,zn_id in ipairs(zone_ids) do
    SETTINGS["Zone"..zn_id.."ProbeAPointID"] = "0000000050B04AE3_1"
  end
  for i,bl_id in ipairs(blower_ids) do
    SETTINGS["Biofilter"..bl_id.."ProbePointID"] = "0000000050B04AE3_1"
  end
  for i,zn_id in ipairs(zone_ids) do
    for i, probe_id in pairs(zone_probe_ids) do
      for i, temp_prefix in ipairs(getTempPrefixes('zone', zn_id, {probe_id})) do
        updateLastValidTemps()
        if probe_id ~= 'B' then
          lu.assertEquals(reg[temp_prefix.."lvtemp"],70.9)
          -- sensor id is not in data
          SETTINGS["Zone"..zn_id.."Probe"..probe_id.."PointID"] = "0000000040B0FFFF_2"
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          -- after 50th failure, temp age goes to sensor age alarm time
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 50
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          lu.assertEquals(reg[temp_prefix.."tempage"], 600)
          -- after 100th failure, temp age goes to max sensor age
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 100
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        else
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          -- sensor id is not in data
          SETTINGS["Zone"..zn_id.."Probe"..probe_id.."PointID"] = "0000000040B0FFFF_2"
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], -327.5)
          -- after 50th failure, temp age goes to sensor age alarm time
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 50
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          lu.assertEquals(reg[temp_prefix.."tempage"], 600)
          -- after 100th failure, temp age goes to max sensor age
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 100
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        end
      end
    end
  end
end

function TestWebmacsScripts:test_update_last_valid_temps()
  SETTINGS["Zone01ProbeAPointID"] = "0000000050B04AE3_1"
  updateLastValidTemps()
  -- sensor id is not in data
  SETTINGS["Zone01ProbeAPointID"] = "0000000040B0FFFF_2"
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  -- after 50th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone01ProbeAPointID"] = 50
  updateLastValidTemps()
  -- after 100th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone01ProbeAPointID"] = 100
  updateLastValidTemps()
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
