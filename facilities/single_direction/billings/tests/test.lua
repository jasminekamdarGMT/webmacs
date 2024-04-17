local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "billings"
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(1)
damper_ids = uid(9)
zone_ids = uid(9)
zone_probe_ids = {'A','B'}
has_wired_zone_temp_sensor = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')
require(facility_path..'x600m/tests/application_tests')
require(facility_path..'x600m/tests/damper_functions_tests')
require(facility_path..'x600m/tests/temp_functions_tests')
require(facility_path..'x600m/tests/zone_functions_tests')

-- special test env variables
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

function appendFacilityIO(io)
  for i, blower_id in pairs(blower_ids) do
    io['blower'..blower_id..'fault'] = 1
  end
  for i, damper_id in pairs(damper_ids) do
    io['damper'..damper_id..'position'] = 0
  end
end

function initializeRegisters()
  local reg = {}
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'control'] = 0
  end
  for i, zone_id in pairs(zone_ids) do
    reg['zone'..zone_id..'control'] = 0
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pfrptime'] = 0
    if zone_probe_ids ~= nil then
      for p, probe_id in pairs(zone_probe_ids) do
        if probe_id == '' then
          reg['zone'..zone_id..probe_id..'avgtemp'] = 0
          reg['zone'..zone_id..probe_id..'lvtemp'] = 0
        else
          reg['zone'..zone_id..'p'..probe_id..'avgtemp'] = 0
          reg['zone'..zone_id..'p'..probe_id..'lvtemp'] = 0
        end
      end
    else
      reg['zone'..zone_id..'pAavgtemp'] = 0
      reg['zone'..zone_id..'pAlvtemp'] = 0
    end
  end
  return reg
end

function TestWebmacsScripts:setUp()
  io = initIO()
  reg = initializeRegisters()
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

function TestWebmacsScripts:test_update_temp_averages()
  initSequence()
  first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
  for k, value in pairs(first_10_values) do
    io.zone04pAtemp = value
    updateTempAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['zone04pAavgtemp'], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
  lu.assertEquals(reg['zone04pAavgtemp'], 110)
  --after 10 values, it starts rotating the table
  io.zone04pAtemp = 80
  updateTempAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone04pAavgtemp'], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
  lu.assertEquals(reg['zone04pAavgtemp'], 106)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['zone04pAavgtemp'] = {}
  io.zone04pAtemp = 80
  updateTempAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone04pAavgtemp'], {80})
  lu.assertEquals(reg.zone04pAavgtemp, 80)
end

function TestWebmacsScripts:test_update_damper_averages()
  initSequence()
  SETTINGS["DataLoggingRate"] = 50
  reg.zone02control = 1
  first_10_values = {10, 30, 50, 70, 90, 100, 80, 60, 20, 0}
  for k, value in pairs(first_10_values) do
    io.damper02position = value
    reg.zone02avgtimer = 0
    updateDamperAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['zone02avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
  lu.assertEquals(reg['zone02avgdamper'], 51)
  lu.assertEquals(reg['zone02avgtimer'], 300)
  -- if zone is offline or timer is not complete, does nothing
  io.damper02position = 80
  reg.zone02control = 0
  reg.zone02avgtimer = 0
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone02avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
  lu.assertEquals(reg['zone02avgdamper'], 51)
  reg.zone02control = 1
  reg.zone02avgtimer = 300
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone02avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
  lu.assertEquals(reg['zone02avgdamper'], 51)
  -- otherwise, after 10 values, it starts rotating the table
  reg.zone02control = 1
  reg.zone02avgtimer = 0
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone02avgdamper'], {80, 0, 20, 60, 80, 100, 90, 70, 50, 30})
  lu.assertEquals(reg['zone02avgdamper'], 58)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['zone02avgdamper'] = {}
  io.damper02position = 80
  reg.zone02avgtimer = 0
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone02avgdamper'], {80})
  lu.assertEquals(reg.zone02avgdamper, 80)
  initSequence()
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
  lu.assertEquals(math.floor(reg['duct01pressureavg']), 5)
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

function TestWebmacsScripts:test_update_blower_pid_values()
  initSequence()
  SETTINGS["MinVFDSpeed"] = "25"
  SETTINGS["MaxVFDSpeed"] = "100"
  SETTINGS['BlowerRate'] = "10"
  SETTINGS["BlowerGain"] = ".5"
  SETTINGS["BlowerIntegral"] = "1"
  SETTINGS["BlowerDerivative"] = ".5"
  SETTINGS["BlowerDerivativeTime"] = "10"
  SETTINGS['PressureSetpoint2'] = "4"
  -- low pressure results in max vfd speed
  updateBlowerPIDPressureValues(BLOWER_01, 1, SETTINGS['PressureSetpoint2'], 'blower01', SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  lu.assertEquals(BLOWER_01['control'], 31.65)
  updateBlowerPIDPressureValues(BLOWER_01, 1, SETTINGS['PressureSetpoint2'], 'blower01', SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  lu.assertEquals(BLOWER_01['control'], 61.5)
  updateBlowerPIDPressureValues(BLOWER_01, 1, SETTINGS['PressureSetpoint2'], 'blower01', SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  lu.assertEquals(BLOWER_01['control'], 91.5)
  updateBlowerPIDPressureValues(BLOWER_01, 1, SETTINGS['PressureSetpoint2'], 'blower01', SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  lu.assertEquals(BLOWER_01['control'], 100)
  -- high pressure result in min VFD speed
  updateBlowerPIDPressureValues(BLOWER_01, 10, SETTINGS['PressureSetpoint2'], 'blower01', SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  lu.assertEquals(BLOWER_01['control'], 36.55)
  updateBlowerPIDPressureValues(BLOWER_01, 10, SETTINGS['PressureSetpoint2'], 'blower01', SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  lu.assertEquals(BLOWER_01['control'], 25)
  updateBlowerPIDPressureValues(BLOWER_01, 10, SETTINGS['PressureSetpoint2'], 'blower01', SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
  lu.assertEquals(BLOWER_01['control'], 25)
end

function TestWebmacsScripts:test_temp_average_for_zones()
  reg.zone04control = 1
  reg.zone04pAlvtemp = 115
  local avg = tempAvgForZones({'04'}, {'A'})
  lu.assertEquals(avg, 115)
  -- ignores disconnected probe
  avg = tempAvgForZones({'04'}, {'A'})
  lu.assertEquals(avg, 115)
  -- ignores lv temp out of range
  avg = tempAvgForZones({'04'}, {'A'})
  lu.assertEquals(avg, 115)
  -- returns zero for zone offline
  reg.zone04control = 0
  avg = tempAvgForZones({'04'}, {'A'})
  lu.assertEquals(avg, 0)
end

function TestWebmacsScripts:test_max_temp_average_for_zones()
  reg.zone03control = 1
  reg.zone03pAlvtemp = 115
  reg.zone04control = 1
  reg.zone04pAlvtemp = 135
  local avg = maxtempAvgForZones({'03','04'}, {'A'})
  lu.assertEquals(avg, 135)
  -- if a zone is offline, it is not included in average
  reg.zone04control = 0
  avg = maxtempAvgForZones({'03','04'}, {'A'})
  lu.assertEquals(avg, 115)
  reg.zone03control = 0
  reg.zone04control = 1
  avg = maxtempAvgForZones({'03','04'}, {'A'})
  lu.assertEquals(avg, 135)
  -- if both zones are offline, the return value is 0
  reg.zone03control = 0
  reg.zone04control = 0
  avg = maxtempAvgForZones({'03','04'}, {'A'})
  lu.assertEquals(avg, 0)
end

function TestWebmacsScripts:test_update_blowers()
  initSequence()
  SETTINGS["PressureSetpointHotZoneTrigger"] = 50
  SETTINGS["PressureSetpointColdZoneTrigger"] = 50
  -- with all zones offline, blower is turned off
  reg.zone01control = 0
  reg.zone02control = 0
  reg.zone03control = 0
  reg.blower01override = 0
  io.blower01run = 1
  io.blower01fault = 1
  io.blower01speed = 0
  io.duct01pressure = 4
  reg.duct01pressuresp = 1
  reg.duct01pressureavg = 4
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 0)
  -- if a zone is online
  reg.zone01control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 25)
  lu.assertEquals(reg.blower01value, 25)
  -- if all the zones are online
  reg.zone02control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 25)
  lu.assertEquals(reg.blower01value, 25)
  -- with manual override enabled
  reg.blower01override = 1
  reg.blower01control = 1
  reg.blower01value = 70
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 70)
  reg.blower01control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  -- if there is a fault, the speed is set to 0
  reg.blower01override = 0
  io.blower01fault = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01speed, 0)
  -- if blower is off and a zone is online, the blower will start
  io.blower01fault = 1
  io.blower01run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 25)

  -- test that percentage of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 160
  reg.zone02pAlvtemp = 145
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 8)
  -- test that positive aeration direction pressure setpoint max is respected
  reg.duct01pressuresp = 20
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], tonumber(SETTINGS["PressureSetpointMax"]))
  -- test that percentage of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  reg.duct01pressuresp = 8
  reg.zone01pAlvtemp = 40
  reg.zone02pAlvtemp = 50
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that positive aeration direction pressure setpoint min is respected
  reg.duct01pressuresp = 1
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], tonumber(SETTINGS["PressureSetpointMin"]))
  -- test that hot zone trigger takes precedence over cold zone trigger
  SETTINGS["PressureSetpointHotZoneTrigger"] = 50
  SETTINGS["PressureSetpointColdZoneTrigger"] = 50
  reg.duct01pressuresp = 4
  reg.zone01pAlvtemp = 130
  reg.zone02pAlvtemp = 30
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that ductXpressuresp increases from last captured value from ductXpospressuresp
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  reg.zone01pAlvtemp = 105
  reg.zone02pAlvtemp = 110
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that only online zones are accounted for
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone02pAlvtemp = 30
  reg.duct01presssptimer = 0
  reg.zone03control = 0
  reg.zone04control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone02pAlvtemp = 30
  reg.duct01presssptimer = 0
  io.blower01run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
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
  updateDamperPIDValues(DAMPER_03, 83, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_03['control'], 46.45)
  updateDamperPIDValues(DAMPER_03, 83, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_03['control'], 15)
  -- warm exhaust temps result in increasing damper position
  updateDamperPIDValues(DAMPER_03, 114, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_03['control'], 78.65)
  updateDamperPIDValues(DAMPER_03, 114, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_03['control'], 100)
  -- decreasing temps result in decreasing damper position
  updateDamperPIDValues(DAMPER_03, 90, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(math.floor(DAMPER_03['control']), 54)
  updateDamperPIDValues(DAMPER_03, 90, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_03['control'], 38)
end

function TestWebmacsScripts:test_update_dampers()
  initSequence()
  SETTINGS["MinDamperValue"] = "15"
  SETTINGS["Regime1TempSetPoint"] = "135"
  SETTINGS["Regime2TempSetPoint"] = "135"
  SETTINGS["Regime3TempSetPoint"] = "135"
  SETTINGS["Zone01RegimeType"] = "pfrp"
  SETTINGS["Zone02RegimeType"] = "pfrp"
  SETTINGS["Zone03RegimeType"] = "pfrp"
  SETTINGS["Zone04RegimeType"] = "pfrp"
  reg['zone01regime'] = 2
  reg['zone02regime'] = 3
  reg['zone03regime'] = 1
  reg['zone04regime'] = 1
  for i, zone_id in pairs(zone_ids) do
    damper_id = zone_id
    damper_prefix = 'damper'..damper_id
    zone_prefix = 'zone'..zone_id
    reg[zone_prefix..'control'] = 1
    reg[damper_prefix..'override'] = 0
    if reg[zone_prefix..'regime'] == 2 then
      -- min temp is used as control temp for zones with pfrp regime type
      -- target test temp is 130
      reg[zone_prefix..'pAlvtemp'] = 115
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 60.74)
      updateDampers()
      lu.assertEquals(math.floor(_G['DAMPER_'..damper_id]['control']), 33)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
      lu.assertEquals(io[damper_prefix..'position'], 15)
      -- target test temp is 140
      reg[zone_prefix..'pAlvtemp'] = 178
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 100)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 100)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 0)
      reg[zone_prefix..'control'] = 1
      reg[damper_prefix..'override'] = 1
      reg[damper_prefix..'value'] = 80
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
      reg[damper_prefix..'override'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 0)
    else
      -- avg temp is used as control temp for zones with warmup regime type
      -- target test temp is 130
      reg[zone_prefix..'pAlvtemp'] = 94
      updateDampers()
      lu.assertEquals(math.floor(_G['DAMPER_'..damper_id]['control']), 19)
      updateDampers()
      lu.assertEquals(math.floor(_G['DAMPER_'..damper_id]['control']), 15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
      lu.assertEquals(io[damper_prefix..'position'], 15)
      -- target test temp is 140
      reg[zone_prefix..'pAlvtemp'] = 135
      updateDampers()
      lu.assertEquals(math.floor(_G['DAMPER_'..damper_id]['control']), 19)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 0)
      reg[zone_prefix..'control'] = 1
      reg[damper_prefix..'override'] = 1
      reg[damper_prefix..'value'] = 80
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
      reg[damper_prefix..'override'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 0)
    end
  end
end

function TestWebmacsScripts:test_zone_controls()
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'value'] = 65
    reg['duct'..blower_id..'pressureavg'] = 8
    updateBlowerStartup(_G['BLOWER_'..blower_id], blower_id)
  end
  for i, zone_id in pairs(zone_ids) do
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'reset'] = 0
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Duct Pressure, Blower Speed, PFRP Time \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Duct Pressure, Blower Speed, PFRP Time \n")
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 130
    reg['zone'..zone_id..'avgdamper'] = 45
    reg['zone'..zone_id..'pfrptime'] = 360
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Duct Pressure, Blower Speed, PFRP Time \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 130, 45, 8, 65, 360".."\n")
    lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
    -- if all system is reset, zone values are loaded from db
    _G['ZONE_'..zone_id]["file_name"] = ""
    reg['zone'..zone_id..'control'] = 0
    initSequence()
    lu.assertEquals(reg['zone'..zone_id..'control'], 1)
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
    _G['ZONE_'..target_zone]["file_name"] = ''
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '')
    lu.assertEquals(_G['ZONE_'..target_zone]["file_name"], '01_01_2017_120000_newbatchname.csv')
    -- if close batch is requested
    reg['zone'..target_zone..'moveto'] = -1
    updateZones()
    lu.assertEquals(_G['ZONE_'..target_zone]["file_name"], '')
  end
end

function TestWebmacsScripts:test_blower_fault_alarms()
  initSequence()
  local blower_labels = blower_ids
  for i, blower_id in pairs(blower_ids) do
    blower_label = blower_labels[i]
    -- with no fault, no email is sent
    io['blower'..blower_id..'fault'] = 1
    emails_sent = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    -- with a fault, alarm email is sent
    io['blower'..blower_id..'fault'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Blower " .. blower_label .. "!")
    -- if alarm persists, no additional emails are sent
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    -- if alarm goes away and comes back and email is sent again
    io['blower'..blower_id..'fault'] = 1
    updateAlarms()
    io['blower'..blower_id..'fault'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 2)
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
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    -- if temp is outside bounds for 5 checks, alarm is sent
    reg["zone"..zone_id.."pAavgtemp"] = 180
    updateAlarms()
    updateAlarms()
    updateAlarms()
    updateAlarms()
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone " .. zone_id .. "!")
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 1)
    -- while alarm conditions persist, no additional emails are sent
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    -- return to normal temps resets alarm
    reg["zone"..zone_id.."pAavgtemp"] = 130
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 0)
    -- if last valid temps are higher than alarm setpoint while average temps are lower than setpoint
    emails_sent = 0
    _G['ZONE_'..zone_id]['email_sent'] = 0
    _G['ZONE_'..zone_id]['temp_in_alarm'] = 0
    reg["zone"..zone_id.."pAavgtemp"] = 159
    reg["zone"..zone_id.."pAlvtemp"] = 165
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
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'],0)
    -- with zone offline no alarms are triggered
    emails_sent = 0
    reg["zone"..zone_id.."control"] = 0
    reg["zone"..zone_id.."pAavgtemp"] = 180
    _G['ZONE_'..zone_id]['temp_in_alarm'] = 5
    _G['ZONE_'..zone_id]['email_sent'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
  end
end

function TestWebmacsScripts:test_zone_regimes()
  initSequence()
  for i, blower_id in pairs(blower_ids) do
  end
  -- test warmup regime zones
  for i, zone_id in pairs(zone_ids) do
    SETTINGS["Zone"..zone_id.."RegimeType"]= 'warmup'
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'reset'] = 1
    reg['zone'..zone_id..'regime'] = 0
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    reg['zone'..zone_id..'pfrptime'] = 4260
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    reg['zone'..zone_id..'pfrptime'] = 4320
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
  end
  -- test pfrp regime zones
  for i, zone_id in pairs(zone_ids) do
    SETTINGS["Zone"..zone_id.."RegimeType"] = 'pfrp'
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'reset'] = 1
    reg['zone'..zone_id..'regime'] = 0
    lu.assertEquals(reg['zone'..zone_id..'regime'], 0)
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    reg['zone'..zone_id..'pfrptime'] = 4260
    reg['zone'..zone_id..'regtimer'] = 0
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 2)
    reg['zone'..zone_id..'pfrptime'] = 4320
    reg['zone'..zone_id..'regtimer'] = 0
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 3)
  end
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
