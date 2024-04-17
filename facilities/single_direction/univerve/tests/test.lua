local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "univerve"
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(6)
blower_labels = {'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'B'}
biofilter_blower_ids = uid(1)
zone_ids = uid(12)
zone_probe_ids = {'A'}
has_wired_zone_temp_sensor = true
has_blower_speed_control = true
has_blower_pressure_control = true
has_regimes = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')
require(facility_path..'x600m/tests/application_tests')
require(facility_path..'x600m/tests/blower_functions_tests')
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
  for i, zone_id in pairs(zone_ids) do
    io['damper'..zone_id..'position'] = 0
  end
end

-- begin TestWebmacsScripts
function TestWebmacsScripts:test_update_blowers()
  initSequence()
  SETTINGS["PressureSetpointHotZoneTrigger"] = 65
  SETTINGS["PressureSetpointColdZoneTrigger"] = 40
  SETTINGS["Regime1TempSetPoint"] = "55"
  SETTINGS["Regime2TempSetPoint"] = "55"
  SETTINGS["Regime3TempSetPoint"] = "55"
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
  reg.duct03pressuresp = 1
  reg.duct04pressuresp = 1
  reg.duct05pressuresp = 1
  reg.duct06pressuresp = 1
  reg.duct01pressureavg = 4
  reg.duct02pressureavg = 6
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 0)
  -- if a zone is online
  reg.zone01control = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 34.5)
  lu.assertEquals(reg.blower01value, 34.5)
  -- if all the zones are online
  reg.zone02control = 1
  reg.zone03control = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 34.5)
  lu.assertEquals(reg.blower01value, 34.5)
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
  lu.assertEquals(io.blower01speed, 34.5)
  -- test that number of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.duct01pressuresp = 6
  reg.zone01control = 1
  reg.zone01pAlvtemp = 80
  reg.zone02control = 1
  reg.zone02pAlvtemp = 145
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
  reg.zone01pAlvtemp = 40
  reg.zone02pAlvtemp = 50
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
  reg.zone01pAlvtemp = 30
  reg.zone02pAlvtemp = 56
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 8)

  -- test that only online zones are accounted for
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone02pAlvtemp = 30
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone02pAlvtemp = 30
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  io.blower01run = 0
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- hsdamperXXposition is set to hsdamperXXvalue when hsdamperXXoverride is set to 1
  io.hsdamper02position = 10
  reg.hsdamper02value = 30
  reg.hsdamper02override = 1
  updateBlowers()
  lu.assertEquals(io['hsdamper02position'], 30)
  -- hsdamperXXposition is set to that blower groups average damper position when hsdamperXXoverride is set to 0
  reg.hsdamper02value = 60
  reg.hsdamper02override = 0
  io.damper03position = 80
  io.damper04position = 70
  updateBlowers()
  lu.assertEquals(io['hsdamper02position'], 75)
  io.damper03position = 65
  io.damper04position = 30
  updateBlowers()
  lu.assertEquals(io['hsdamper02position'], 47.5)
  -- Biofilter pressure average updates appropriately
  io.bioblower01pospress = 60
  io.bioblower01negpress = 50
  reg.biopospressure01avg = 0
  reg.bionegpressure01avg = 0
  updateBlowers()
  lu.assertEquals(reg['biopospressure01avg'], 60)
  lu.assertEquals(reg['bionegpressure01avg'], 50)
  io.bioblower01pospress = 50
  io.bioblower01negpress = 40
  updateBlowers()
  lu.assertEquals(reg['biopospressure01avg'], 55)
  lu.assertEquals(reg['bionegpressure01avg'], 45)
  io.bioblower01pospress = 40
  io.bioblower01negpress = 30
  updateBlowers()
  lu.assertEquals(reg['biopospressure01avg'], 50)
  lu.assertEquals(reg['bionegpressure01avg'], 40)
  io.bioblower01pospress = 80
  io.bioblower01negpress = 70
  updateBlowers()
  lu.assertEquals(reg['biopospressure01avg'], 57.5)
  lu.assertEquals(reg['bionegpressure01avg'], 47.5)
  -- Biofilter blower speed updates appropriately
  io.bioblower01run = 0
  io.bioblower01speed = 0
  reg.bioblower01speedsp = 0
  reg.bioblower01control = 1
  reg.bioblower01override = 0
  updateBlowers()
  lu.assertEquals(io.bioblower01run, 1)
  lu.assertEquals(io.bioblower01speed, 25)
  lu.assertEquals(reg.bioblower01value, 25)
  -- with manual override enabled
  io.bioblower01speed = 0
  reg.bioblower01override = 1
  reg.bioblower01control = 1
  reg.bioblower01value = 70
  updateBlowers()
  lu.assertEquals(io.bioblower01run, 1)
  lu.assertEquals(io.bioblower01speed, 70)
  reg.bioblower01control = 0
  updateBlowers()
  lu.assertEquals(io.bioblower01run, 0)
  -- if there is a fault, the speed is set to 0
  reg.bioblower01override = 0
  io.bioblower01fault = 0
  updateBlowers()
  lu.assertEquals(io.bioblower01speed, 0)
end

function TestWebmacsScripts:test_zone_controls()
  SETTINGS['DataLoggingRate'] = 120
  reg['biofilter01pAlvtemp'] = 130
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'value'] = 65
    reg['duct'..blower_id..'pressure'] = 8
    reg['duct'..blower_id..'pressureavg'] = 8
    updateBlowerStartup(_G['BLOWER_'..blower_id], blower_id)
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
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Damper, Duct Pressure, Blower Speed, PFRP Time \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Damper, Duct Pressure, Blower Speed, PFRP Time \n")
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pfrptime'] = 36
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Damper, Duct Pressure, Blower Speed, PFRP Time \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 8, 65, 36\n")
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

function TestWebmacsScripts:test_blower_fault_alarms()
  initSequence()
  if has_blower_faults == false then
    return
  end
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

function TestWebmacsScripts:test_tunnel_damper_control()
  initSequence()
  SETTINGS['OperatingHoursStart'] = '00:00'
  SETTINGS['OperatingHoursEnd'] = '00:00'
  SETTINGS["MaxVFDSpeed"] = 80
  SETTINGS["MinVFDSpeed"] = 20
  SETTINGS["MinBiofilterDamperValue"] = 15
  SETTINGS["MinDamperValue"] = 15
  io['tunnel01door'] = 0
  io['blower01run'] = 1
  io['extrdoor01open'] = 1
  io['extrdoor02open'] = 1
  io['biodamper01position'] = 0
  io['biodamper02position'] = 0
  io['bioblower01speed'] = 20
  reg['turbotimer'] = 0
  reg['bioblower01override'] = 1
  reg['bioblower01control'] = 1
  reg['bioblower01value'] = 50
  reg['bioblower01speedsp'] = 0
  for i, zn_id in ipairs(zone_ids) do
    reg['zone'..zn_id..'control'] = 0
  end
  -- If no batch is running
  -- Bio filter blower speed is set to the biofilter value reg when in manual override
  tunnelDamperControl()
  lu.assertEquals(io['bioblower01speed'], 50)
  lu.assertEquals(io['biodamper01position'], 0)
  lu.assertEquals(io['biodamper02position'], 0)
  lu.assertEquals(reg['bioblower01value'], 50)
  -- If a batch is running and tunnel door is NOT open... Need more information

  -- If a batch is running and a tunnel door is open
  -- Biofilter dampers open to 100%
    reg['zone01control'] = 1
    io['tunnel01door'] = 1
    tunnelDamperControl()
    lu.assertEquals(io['bioblower01speed'], 50)
    lu.assertEquals(io['biodamper01position'], 100)
    lu.assertEquals(io['biodamper02position'], 100)
    lu.assertEquals(reg['bioblower01value'], 50)
  -- If a batch is running and a tunnel door is open and load zone is active... Will need to fix database locked issue first.
end

function TestWebmacsScripts:test_turbo_control()
  initSequence()
  reg['turbotimer'] = 0
  SETTINGS['OperatingHoursStart'] = '00:00'
  SETTINGS['OperatingHoursEnd'] = '00:00'
  SETTINGS["MaxVFDSpeed"] = 80
  SETTINGS["MinVFDSpeed"] = 20
  SETTINGS["MaxBiofilterVFDSpeed"] = 80
  SETTINGS["MinBiofilterVFDSpeed"] = 20
  SETTINGS["MinDamperValue"] = 15
  SETTINGS['TurboFailsafeTimer'] = 30
  io['biotunnel01door'] = 1
  io['extrdoor01open'] = 1
  io['extrdoor02open'] = 1
  io['biodamper01position'] = 20
  io['biodamper02position'] = 20
  reg['bioblower01speedsp'] = 20
  reg['bioblower01value'] = 0
  reg['bioblower01speed'] = 0
  reg['turbocontrol'] = 0
  reg['turbotimer'] = 0
  reg['turborun'] = 0
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 20)
  lu.assertEquals(io['biodamper01position'], 20)
  lu.assertEquals(io['biodamper02position'], 20)
  lu.assertEquals(reg['turbotimer'], 0)
  -- When an exterior door opens
  reg['zone01control'] = 1
  io['tunnel01door'] = 1
  io['extrdoor01open'] = 0
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100)
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 1800)
  lu.assertEquals(reg['turbocontrol'], 1)
  lu.assertEquals(reg['turborun'], 1)
  -- When an exterior door closes
  io['extrdoor01open'] = 1
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100)
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 1800)
  lu.assertEquals(reg['turbocontrol'], 1)
  lu.assertEquals(reg['turborun'], 1)
  -- When turbo mode is turned on
  -- If tunnel door is closed
  reg['turbocontrol'] = 1
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100)
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 1800)
  lu.assertEquals(reg['turbocontrol'], 1)
  lu.assertEquals(reg['turborun'], 1)
  -- If tunnel door is open... No biofilter tunnel door exists on the system.
  -- We will need clarification on this.

  -- When turbo mode is turned off
  reg['turbocontrol'] = 0
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100) -- This will be updated in tunnelDamperControl()
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 0)
  lu.assertEquals(reg['turbocontrol'], 0)
  lu.assertEquals(reg['turborun'], 0)
  -- When turbo mode timer expires
  reg['turbocontrol'] = 1
  io['biotunnel01door'] = 1
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100)
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 1800)
  lu.assertEquals(reg['turbocontrol'], 1)
  lu.assertEquals(reg['turborun'], 1)
  reg['turbotimer'] = 15
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100)
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 15)
  lu.assertEquals(reg['turbocontrol'], 1)
  lu.assertEquals(reg['turborun'], 1)
  reg['turbotimer'] = 2
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100)
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 2)
  lu.assertEquals(reg['turbocontrol'], 1)
  lu.assertEquals(reg['turborun'], 1)
  reg['turbotimer'] = 0
  turboControl()
  lu.assertEquals(reg['bioblower01speedsp'], 100) -- This will be updated in tunnelDamperControl()
  lu.assertEquals(io['biodamper01position'], 15)
  lu.assertEquals(io['biodamper02position'], 15)
  lu.assertEquals(reg['turbotimer'], 0)
  lu.assertEquals(reg['turbocontrol'], 0)
  lu.assertEquals(reg['turborun'], 0)
end

function TestWebmacsScripts:test_window_control()
  initSequence()
  -- Window remains closed when all exterior doors are closed
  io['extrdoor01open'] = 1
  io['extrdoor02open'] = 1
  windowControl()
  lu.assertEquals(io['window01open'], 100)
  -- Window opens when either exterior door opens
  io['extrdoor01open'] = 0
  io['extrdoor02open'] = 1
  windowControl()
  lu.assertEquals(io['window01open'], 0)
  io['extrdoor01open'] = 1
  io['extrdoor02open'] = 1
  windowControl()
  lu.assertEquals(io['window01open'], 100)
  io['extrdoor01open'] = 1
  io['extrdoor02open'] = 0
  windowControl()
  lu.assertEquals(io['window01open'], 0)

end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
