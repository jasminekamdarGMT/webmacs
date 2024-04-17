local lu = require('luaunit')

TestWebmacsScripts = {}
blower_ids = {'01','02'}
blower_labels = {'1','2'}
zone_ids = {'01','02','03','04','05','06'}
zone_probe_ids = {'A','B'}
zone_probe_table = {
  ['01']={'A','B'},['02']={'A','B','C','D'},
  ['03']={'A','B'},['04']={'A','B'},
  ['05']={'A','B'},['06']={'A','B','C','D'},
}
biofilter_probe_ids = {''}
has_wireless_zone_temp_sensor = true
has_wireless_biofilter_temp_sensor = true
has_blower_speed_control = true
has_biofilter_mister_control = true
blower_direction_control = true
has_zone_temp_setpoint = true
facilities_dir = 'facilities/'
facility_type = 'h_damper_reversing/'
facility_path = facilities_dir..facility_type
facility_name = "dirt_hugger"


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

function appendFacilityReg(reg)
  for i, blower_id in pairs(blower_ids) do
    reg['exhaust'..blower_id..'lvtemp'] = 45
  end
end

-- begin TestWebmacsScripts
function TestWebmacsScripts:test_update_blowers()
  initSequence()
  for i, blower_id in pairs(blower_ids) do
    SETTINGS["Blower"..blower_id.."PressureSetpointHotZoneTrigger"] = 65
    SETTINGS["Blower"..blower_id.."PressureSetpointColdZoneTrigger"] = 40
  end
  -- with all zones offline, blower is turned off
  reg.zone01control = 0
  reg.zone02control = 0
  reg.zone03control = 0
  reg.blower01override = 0
  io.blower01run = 1
  io.blower01fault = 1
  io.blower01speed = 0
  reg.blower01prerevspeed = 0
  io.blower01revdamper = 0
  reg.blower01revtimer = 300
  reg.duct01pressureavg = 0
  reg.duct02pressureavg = 0
  io.duct01pospressure = 4
  io.duct01negpressure = 10
  io.duct02pospressure = 2
  io.duct02negpressure = 8
  reg.duct01pressuresp = 1
  reg.duct02pressuresp = 1
  reg.duct01pospressureavg = 4
  reg.duct01negpressureavg = 10
  reg.duct02pospressureavg = 2
  reg.duct02negpressureavg = 8
  reg.biofilter01lvtemp = 75
  reg.biofilter02lvtemp = 75
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01revdamper, 0)
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 0)
  -- if a zone is online
  reg.zone01control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 28.5)
  lu.assertEquals(reg.blower01value, 28.5)
  -- if all the zones are online
  reg.zone02control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 28.5)
  lu.assertEquals(reg.blower01value, 28.5)
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
  lu.assertEquals(io.blower01speed, 28.5)
  -- test that number of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.blower02control = 1
  io.blower02run = 1
  reg.duct02pressuresp = 6
  reg.duct01pospressuresp = 4
  reg.duct01negpressuresp = 4
  reg.duct02pospressuresp = 6
  reg.duct02negpressuresp = 6
  reg.zone03control = 1
  reg.zone03pAlvtemp = 150
  reg.zone03pBlvtemp = 155
  reg.zone04control = 1
  reg.zone04pAlvtemp = 155
  reg.zone04pBlvtemp = 155
  reg.zone05control = 1
  reg.zone05pAlvtemp = 80
  reg.zone05pBlvtemp = 85
  reg.zone06control = 1
  reg.zone06pAlvtemp = 145
  reg.zone06pBlvtemp = 150
  reg.zone06pClvtemp = 145
  reg.zone06pDlvtemp = 150
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- test pressure does not change while idletimer greater than zero
  lu.assertEquals(reg['blower02idletimer'], 420)
  lu.assertEquals(io['blower02run'], 0)
  lu.assertEquals(reg['duct02pressuresp'], 6)
  -- test pressure changes after idletimer reaches zero
  reg.blower02idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['blower02run'], 1)
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that pressure setpoint max is respected
  reg.duct02pospressuresp = 10
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that number of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  io.blower02run = 1
  reg.duct02pospressuresp = 6
  reg.zone03pAlvtemp = 40
  reg.zone03pBlvtemp = 55
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.zone05pAlvtemp = 40
  reg.zone05pBlvtemp = 45
  reg.zone06pAlvtemp = 50
  reg.zone06pBlvtemp = 55
  reg.zone06pClvtemp = 50
  reg.zone06pDlvtemp = 55
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 4)
  -- test that pressure setpoint min is respected
  reg.duct02pospressuresp = 4
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 4)
  -- test that hot zone trigger takes precedence over cold zone trigger
  for i, blower_id in pairs(blower_ids) do
    SETTINGS["Blower"..blower_id.."PressureSetpointHotZoneTrigger"] = 50
    SETTINGS["Blower"..blower_id.."PressureSetpointColdZoneTrigger"] = 50
  end
  io.blower02run = 1
  reg.duct02pospressuresp = 6
  reg.zone03pAlvtemp = 145
  reg.zone03pBlvtemp = 150
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.zone05pAlvtemp = 30
  reg.zone05pBlvtemp = 35
  reg.zone06pAlvtemp = 30
  reg.zone06pBlvtemp = 35
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that last saved direction pressure setpoints are resumed
  for i, blower_id in pairs(blower_ids) do
    SETTINGS["Blower"..blower_id.."NegDirPressureSetpointMin"] = 12
    SETTINGS["Blower"..blower_id.."NegDirPressureSetpointMax"] = 24
  end
  reg.duct01pospressuresp = 4
  reg.biofilter01lvtemp = 90
  reg.zone01pAlvtemp = 180
  reg.zone01pBlvtemp = 190
  reg.zone02pAlvtemp = 185
  reg.zone02pBlvtemp = 190
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01idletimer'], 420)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 4)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- revdamper changes direction to positive
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 4)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- test that ductXpressuresp increases from last captured value from ductXpospressuresp
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  reg.biofilter01lvtemp = 60
  reg.zone01pAlvtemp = 180
  reg.zone01pBlvtemp = 180
  reg.zone02pAlvtemp = 175
  reg.zone02pBlvtemp = 170
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- revdamper changes direction to negative
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- test that ductXpressuresp increases from last captured value from ductXnegpressuresp
  reg.zone01pAlvtemp = 180
  reg.zone01pBlvtemp = 170
  reg.zone02pAlvtemp = 165
  reg.zone02pBlvtemp = 190
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 12)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 12)
  reg.zone01pAlvtemp = 180
  reg.zone01pBlvtemp = 170
  reg.zone02pAlvtemp = 165
  reg.zone02pBlvtemp = 190
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 14)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 14)
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 16)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  -- revdamper changes direction
  reg.biofilter01lvtemp = 85
  reg.zone01pAlvtemp = 180
  reg.zone01pBlvtemp = 90
  reg.zone02control = 1
  reg.zone02pAlvtemp = 185
  reg.zone02pBlvtemp = 90
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 16)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 16)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  -- test that only online zones are accounted for
  io.blower02run = 1
  reg.duct02pospressuresp = 6
  reg.zone03pAlvtemp = 145
  reg.zone03pBlvtemp = 150
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.zone05pAlvtemp = 30
  reg.zone05pBlvtemp = 35
  reg.zone06pAlvtemp = 30
  reg.zone06pBlvtemp = 35
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  reg.zone03control = 0
  reg.zone04control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  io.blower02run = 0
  reg.duct02pressuresp = 6
  reg.zone03pAlvtemp = 145
  reg.zone03pBlvtemp = 150
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.zone05pAlvtemp = 30
  reg.zone05pBlvtemp = 35
  reg.zone06pAlvtemp = 30
  reg.zone06pBlvtemp = 35
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 6)
  -- If the blower is running and is not in idle time then the blower speed/value will not go below the MinVFDSpeed
  io.blower01run = 1
  io.blower01speed = 20
  reg.blower01value = 20
  reg.duct01pressureavg = 70
  updateBlowers()
  lu.assertEquals(io["blower01run"], 1)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01idletimer"], 0)
end

function TestWebmacsScripts:test_update_duct_pressure_averages()
  initSequence()
  SETTINGS['BlowerRate'] = 10
  reg['blower01direction'] = 1
  reg['duct01pospressureavg'] = 1
  first_10_values = {3.6, 4.0, 4.2 ,4.9, 5.5, 5.8, 6.0, 5.7, 5.9, 6.1}
  for k, value in pairs(first_10_values) do
    io.duct01pospressure = value
    updateDuctPressureAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['duct01pospressureavg'], {6.1, 5.9, 5.7, 6, 5.8, 5.5, 4.9, 4.2, 4, 3.6})
  lu.assertEquals(reg['duct01pospressureavg'], 5.17)
  --after 10 values, it starts rotating the table
  io.duct01pospressure = 8.0
  updateDuctPressureAverages()
  lu.assertEquals(AVERAGE_ARRAYS['duct01pospressureavg'], {8, 6.1, 5.9, 5.7, 6, 5.8, 5.5, 4.9, 4.2, 4})
  lu.assertEquals(reg['duct01pospressureavg'], 5.61)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['duct01pospressureavg'] = {}
  io.duct01pospressure = 9.8
  updateDuctPressureAverages()
  lu.assertEquals(AVERAGE_ARRAYS['duct01pospressureavg'], {9.8})
  lu.assertEquals(io.duct01pospressure, 9.8)
end

function TestWebmacsScripts:test_blower_direction_control()
  initSequence()
  reg.zone01control = 1
  reg.blower01control = 1
  io.blower01run = 1
  reg.blower01override = 0
  io.blower01fault = 1
  io.blower01revdamper = 0
  io.blower01speed = 37.5
  reg.biofilter01lvtemp = 50
  reg.biofilter02lvtemp = 50
  io.duct01pospressure = 4
  io.duct01negpressure = 10
  io.duct02pospressure = 2
  io.duct02negpressure = 8
  reg.duct01pressureavg = 0
  reg.duct01pospressureavg = 4
  reg.duct01negpressureavg = 10
  reg.duct02pressureavg = 0
  reg.duct02pospressureavg = 2
  reg.duct02negpressureavg = 8
  reg.duct01pressuresp = 0
  reg.duct02pressuresp = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- test that correct pressure sensor value is used based on blower direction
  reg.blower01direction = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.duct01pressureavg, io.duct01pospressure)
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.duct01pressureavg, io.duct01negpressure)
  -- test that blower stops running while idle timer is running
  -- with temp average less than setpoint
  io.blower01run = 1
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  reg.blower01idletimer = 200
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 25)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  -- with temp average greater than setpoint
  reg.biofilter01lvtemp = 90
  reg.blower01direction = 1
  io.blower01run = 1
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  reg.blower01idletimer = 200
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 25)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  -- test that reverse is initiated when rev timer hits zero and that rev timer is reset
  -- with temp average less than setpoint
  reg.biofilter01lvtemp = 50
  reg.blower01revtimer = 0
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(reg.blower01revtimer, 2400)
  -- with temp average greater than setpoint it does not reset rev timer
  reg.biofilter01lvtemp = 90
  reg.blower01revtimer = 0
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(reg.blower01revtimer, 0)
  -- test that output is set to correct direction when idle timer is halfway complete
  io.blower01revdamper = 0
  reg.blower01direction = 1
  reg.blower01idletimer = 110
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01revdamper, 1)
  -- test that normal blower speed resumes when idle timer is complete
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01speed, 33.5)
  -- test that rev override forces desired direction
  -- with temp average less than setpoint
  reg.biofilter01lvtemp = 50
  io.blower01revdamper = 0
  reg.blower01direction = 1
  reg.blower01revoverride = 1
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  -- test that positive aeration is forced when exhaust temp is above SP
  reg.biofilter01lvtemp = 90
  reg.blower01direction = 0
  reg.blower01revoverride = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  -- test that auto reverse is disabled when no zones are online
  for i, zone_id in pairs(zone_ids) do
    reg['zone'..zone_id..'control'] = 0
  end
  reg.blower01revtimer = 0
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 0)
end

function TestWebmacsScripts:test_biofilter_mister_control()
  initSequence()
  reg.zone01control = 1
  reg.blower01control = 1
  io.blower01run = 1
  io.blower01fault = 1
  reg.duct01pressureavg = 0
  reg.duct02pressureavg = 0
  io.duct01pospressure = 4
  io.duct01negpressure = 10
  io.duct02pospressure = 2
  io.duct02negpressure = 8
  reg.duct01pospressureavg = 4
  reg.duct01negpressureavg = 10
  reg.duct02pospressureavg = 2
  reg.duct02negpressureavg = 8
  reg.duct01pressuresp = 0
  reg.duct02pressuresp = 0
  reg.biofilter01lvtemp = 90
  reg.biofilter02lvtemp = 90
  reg.blower01direction = 0
  io.blower01revdamper = 0
  reg.blower01revoverride = 0
  reg.blower01cycle = 360
  reg.blower01idletimer = 0
  io.biofilter01mister = 0
  reg.biofilter01misttimer = 0
  reg.biofilter01mistdelay = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(io.blower01revdamper, 0)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  -- biofilter mister does not turn on while blower idle timer greater than 0
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  -- biofilter mister turns on at next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 1)
  lu.assertEquals(reg.biofilter01misttimer, 1800)
  -- biofilter mister turns off when biofilter mister timer has completed
  reg.biofilter01misttimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  -- biofilter mister does not turn on if biofilter mister delay timer is greater than 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  lu.assertEquals(reg.biofilter01mistdelay, 1)
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  lu.assertEquals(reg.biofilter01mistdelay, 1)
  -- biofilter mister delay does not reset to 0 when revdamper is positive and biofilter temp is less than BiofilterForcePositiveTemperature value
  reg.biofilter01lvtemp = 60
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 0)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  lu.assertEquals(reg.biofilter01mistdelay, 1)
  lu.assertEquals(reg.blower01idletimer, 420)
  reg.blower01idletimer = 210
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 0)
  lu.assertEquals(io.blower01revdamper, 1)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  lu.assertEquals(reg.biofilter01mistdelay, 1)
  -- biofilter mister delay resets to 0 when revdamper is negative and blower idle timer has completed
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 0)
  lu.assertEquals(io.blower01revdamper, 0)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  lu.assertEquals(reg.biofilter01mistdelay, 1)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 0)
  lu.assertEquals(io.blower01revdamper, 0)
  lu.assertEquals(io.biofilter01mister, 0)
  lu.assertEquals(reg.biofilter01misttimer, 0)
  lu.assertEquals(reg.biofilter01mistdelay, 0)
end

function TestWebmacsScripts:test_zone_controls()
  for i, zone_id in pairs(zone_ids) do
    for i, blower_id in pairs(blower_ids) do
      reg['blower'..blower_id..'value'] = 65
      reg['blower'..blower_id..'direction'] = 1
      reg['biofilter'..blower_id..'avgtemp'] = 75
      reg['exhaust'..blower_id..'avgtemp'] = 70
    end
    for i, probe_id in ipairs(zone_probe_table[zone_id]) do
      reg['zone'..zone_id..'p'..probe_id..'avgtemp'] = 0
      reg['zone'..zone_id..'p'..probe_id..'lvtemp'] = 0
    end
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'reset'] = 0
    reg['zone'..zone_id.."pfrptime"] = 36
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time \n")
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'avgdamper'] = 45
    if zone_id == '02' or zone_id == '06' then
      reg['zone'..zone_id..'pAavgtemp'] = 128
      reg['zone'..zone_id..'pBavgtemp'] = 135
      reg['zone'..zone_id..'pCavgtemp'] = 128
      reg['zone'..zone_id..'pDavgtemp'] = 135
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 128, 135, 45, Warm Up, 10, 65, 75, 70, 0\n")
    else
      reg['zone'..zone_id..'pAavgtemp'] = 128
      reg['zone'..zone_id..'pBavgtemp'] = 135
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 0, 0, 45, Warm Up, 10, 65, 75, 70, 0\n")
    end
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

function TestWebmacsScripts:test_update_damper_pid_values()
  initSequence()
  
  -- Set initial values
  local min_damper_value = nil
  local damper_temp_setpoint = nil
  
  -- Set minimum damper value for each zone
  for i, zone_id in pairs(zone_ids) do
    local zone_key = "Zone" .. zone_id
    SETTINGS[zone_key .. "MinDamperValue"] = "15"
    min_damper_value = tonumber(SETTINGS[zone_key .. "MinDamperValue"])
  end
  
  -- Set PID controller settings
  SETTINGS['DamperRate'] = "10"
  SETTINGS["DamperGain"] = "1"
  SETTINGS["DamperIntegral"] = "1"
  SETTINGS["DamperDerivative"] = "0.3"
  SETTINGS['DamperTempSetPoint'] = "100"
  damper_temp_setpoint = tonumber(SETTINGS['DamperTempSetPoint'])
  
  -- Test damper control values for each zone
  for i, zone_id in pairs(zone_ids) do
    local zone_damper = _G['DAMPER_' .. zone_id]
    local expected_control = nil
    
    -- Test cold exhaust temperatures
    updateDamperPIDValues(zone_damper, 95, damper_temp_setpoint, min_damper_value)
    expected_control = 44.85
    lu.assertEquals(zone_damper['control'], expected_control)
    
    updateDamperPIDValues(zone_damper, 95, damper_temp_setpoint, min_damper_value)
    expected_control = min_damper_value
    lu.assertEquals(zone_damper['control'], expected_control)
    
    -- Test warm exhaust temperatures
    updateDamperPIDValues(zone_damper, 105, damper_temp_setpoint, min_damper_value)
    expected_control = 70.3
    lu.assertEquals(zone_damper['control'], expected_control)
    
    updateDamperPIDValues(zone_damper, 105, damper_temp_setpoint, min_damper_value)
    expected_control = damper_temp_setpoint
    lu.assertEquals(zone_damper['control'], expected_control)
    
    -- Test decreasing temperatures
    updateDamperPIDValues(zone_damper, 98, damper_temp_setpoint, min_damper_value)
    expected_control = 77
    lu.assertEquals(math.floor(zone_damper['control']), expected_control)
    
    updateDamperPIDValues(zone_damper, 98, damper_temp_setpoint, min_damper_value)
    expected_control = 58
    lu.assertEquals(zone_damper['control'], expected_control)
    
    -- Test minimum and maximum values
    updateDamperPIDValues(zone_damper, 120, damper_temp_setpoint, min_damper_value)
    expected_control = 100
    lu.assertEquals(zone_damper['control'], expected_control)
    
    updateDamperPIDValues(zone_damper, 80, damper_temp_setpoint, min_damper_value)
    expected_control = min_damper_value
    lu.assertEquals(zone_damper['control'], expected_control)
  end
end

function TestWebmacsScripts:test_update_dampers()
  initSequence()
  -- Set minimum damper value for each zone
  for i, zone_id in pairs(zone_ids) do
    local zone_key = "Zone" .. zone_id
    SETTINGS[zone_key .. "MinDamperValue"] = "15"
    min_damper_value = tonumber(SETTINGS[zone_key .. "MinDamperValue"])
  end
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
    if #zone_probe_ids == 1 then
      reg[zone_prefix..'lvtemp'] = 130
    elseif #zone_probe_ids == 2 then
      reg[zone_prefix..'pAlvtemp'] = 125
      reg[zone_prefix..'pBlvtemp'] = 135
    end
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 59.15)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 22.22)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
    lu.assertEquals(io[damper_prefix..'position'], 15)
    if #zone_probe_ids == 1 then
      reg[zone_prefix..'lvtemp'] = 140
    elseif #zone_probe_ids == 2 then
      reg[zone_prefix..'pAlvtemp'] = 135
      reg[zone_prefix..'pBlvtemp'] = 145
    end
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 55.96)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 92.78)
    reg[zone_prefix..'control'] = 0
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
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

function TestWebmacsScripts:test_pump_control()
  initSequence()
  reg['pump01speed'] = 1
  reg['pump02speed'] = 2
  reg['pump03speed'] = 0
  updatePumps()
  lu.assertEquals(io['pump01speed1'], 1)
  lu.assertEquals(io['pump02speed1'], 0)
  lu.assertEquals(io['pump03speed1'], 0)
  lu.assertEquals(io['pump01speed2'], 0)
  lu.assertEquals(io['pump02speed2'], 1)
  lu.assertEquals(io['pump03speed2'], 0)
  reg['pump01speed'] = 0
  reg['pump02speed'] = 3
  reg['pump03speed'] = 1
  updatePumps()
  lu.assertEquals(io['pump01speed1'], 0)
  lu.assertEquals(io['pump02speed1'], 1)
  lu.assertEquals(io['pump03speed1'], 1)
  lu.assertEquals(io['pump01speed2'], 0)
  lu.assertEquals(io['pump02speed2'], 1)
  lu.assertEquals(io['pump03speed2'], 0)
end

function TestWebmacsScripts:test_retrieve_wireless_sensor_data_tcp()
  initSequence()
  local sensor_data = retrieveWirelessSensorDataTCP()

  for i,zn_id in ipairs(zone_ids) do
    SETTINGS["Zone"..zn_id.."ProbeAPointID"] = "0000000050B04AE3_1"
    SETTINGS["Zone"..zn_id.."ProbeBPointID"] = "0000000050B04AE3_2"
    SETTINGS["Zone"..zn_id.."ProbeCPointID"] = "0000000050B04AE3_2"
    SETTINGS["Zone"..zn_id.."ProbeDPointID"] = "0000000050B04AE3_2"
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
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeBPointID"] = 50
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          lu.assertEquals(reg[temp_prefix.."tempage"], 600)
          -- after 100th failure, temp age goes to max sensor age
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeBPointID"] = 100
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        end
      end
    end
  end
end

function TestWebmacsScripts:test_wireless_sensor_age_alarms()
  initSequence()
  SETTINGS["WirelessSensorAgeAlarm"] = 10
  for i, zone_id in pairs(zone_ids) do
    emails_sent = 0
    -- with sensor age below wireless sensor age alarm setpoint, no alarm is sent
    for i, probe_id in ipairs(zone_probe_table[zone_id]) do
      reg['zone'..zone_id..'p'..probe_id..'avgtemp'] = 20
      reg['zone'..zone_id..'p'..probe_id..'lvtemp'] = 70
      reg['zone'..zone_id..'p'..probe_id..'tempage'] = 559
    end
    reg["zone"..zone_id.."control"] = 1
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 0)
    -- if sensor age is outside bounds for 3 checks, alarm is sent
    reg["zone"..zone_id.."pAtempage"] = 618
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 1)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 0)
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 2)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 0)
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 3)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_id.." Temperature Sensor Communication".."!")
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 3)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
    -- while alarm conditions persist, no additional emails are sent
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    -- if cooldown has not completed, alarm does not reset when sensor age is below wireless sensor age alarm setpoint
    reg["zone"..zone_id.."pAtempage"] = 130
    reg["zone"..zone_id.."pBtempage"] = 559
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_cooldown'], 29)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 4)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
    -- if cooldown has completed, alarm resets when sensor age is below wireless sensor age alarm setpoint
    _G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_cooldown'] = 0
    updateAlarms()
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_cooldown'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 0)
    lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 0)
    -- with zone offline no alarms are triggered
    reg["zone"..zone_id.."control"] = 0
    reg["zone"..zone_id.."pAtempage"] = 180
    _G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'] = 5
    _G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
  end

  prefix = 'biofilter'
  for i, blower_id in pairs(blower_ids) do
    emails_sent = 0
    -- with sensor age below wireless sensor age alarm setpoint, no alarm is sent
    reg[prefix..blower_id.."tempage"] = 559
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'], 0)
    -- if sensor age is outside bounds for 3 checks, alarm is sent
    reg[prefix..blower_id.."tempage"] = 618
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    prefix_str = prefix:gsub("^%l", string.upper).." "
    lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on "..prefix_str..blower_id.." Temperature Sensor Communication".."!")
    lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'], 3)
    lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_email_sent'], 1)
    -- while alarm conditions persist, no additional emails are sent
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    -- alarm resets when sensor age is below wireless sensor age alarm setpoint
    reg[prefix..blower_id.."tempage"] = 130
    _G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_cooldown'] = 0
    updateAlarms()
    lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'], 0)
    lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_email_sent'], 0)
    -- with zone offline no alarms are triggered
    reg["zone"..blower_id.."control"] = 0
    reg[prefix..blower_id.."tempage"] = 180
    _G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'] = 5
    _G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_email_sent'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
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
    -- if zone_id == '02' or zone_id == '06' then
    for i, probe_id in ipairs(zone_probe_table[zone_id]) do
      reg['zone'..zone_id..'p'..probe_id..'avgtemp'] = 130
      reg['zone'..zone_id..'p'..probe_id..'lvtemp'] = 130
      -- reg['zone'..zone_id..'pBavgtemp'] = 135
      -- reg['zone'..zone_id..'pCavgtemp'] = 128
      -- reg['zone'..zone_id..'pDavgtemp'] = 135
    end
    -- reg["zone"..zone_id.."pAavgtemp"] = 130
    -- reg["zone"..zone_id.."pBavgtemp"] = 130
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
    reg["zone"..zone_id.."pBavgtemp"] = 159
    reg["zone"..zone_id.."pAlvtemp"] = 165
    reg["zone"..zone_id.."pBlvtemp"] = 165
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
    reg["zone"..zone_id.."pBlvtemp"] = 155
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

function TestWebmacsScripts:test_update_last_valid_temps()
  SETTINGS["Zone05ProbeBPointID"] = "0000000050B04AE3_1"
  updateLastValidTemps()
  lu.assertEquals(reg.zone05pBlvtemp, 70.9)
  -- sensor id is not in data
  SETTINGS["Zone05ProbeBPointID"] = "0000000040B0FFFF_2"
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  lu.assertEquals(reg.zone05pBlvtemp, 70.9)
  -- after 50th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone05ProbeBPointID"] = 50
  updateLastValidTemps()
  lu.assertEquals(reg.zone05pBlvtemp, 70.9)
  lu.assertEquals(reg.zone05pBtempage, 600)
  -- after 100th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone05ProbeBPointID"] = 100
  updateLastValidTemps()
  lu.assertEquals(reg.zone05pBlvtemp, 70.9)
  lu.assertEquals(reg.zone05pBtempage, 65535)
  -- test exhaust temp
  io.exhaust01temp = 130
  updateLastValidTemps()
  lu.assertEquals(reg.exhaust01lvtemp, 130)
  -- io value is nil
  io.exhaust01temp = nil
  updateLastValidTemps()
  lu.assertEquals(reg.exhaust01lvtemp, 130)
  -- io value is >= 185
  io.exhaust01temp = 185
  updateLastValidTemps()
  lu.assertEquals(reg.exhaust01lvtemp, 130)
end

function TestWebmacsScripts:test_zone_regimes()
  if has_regimes == true then
    initSequence()
    SETTINGS["Regime1Duration"] = 1
    SETTINGS["Regime2Duration"] = 3
    SETTINGS["Regime3Duration"] = 11
    if has_biofilter_mister_control == true then
      for i, blower_id in pairs(blower_ids) do
        io['blower'..blower_id..'revdamper'] = 1
      end
    end
    for i, zone_id in pairs(zone_ids) do
      reg['zone'..zone_id..'control'] = 1
      reg['zone'..zone_id..'reset'] = 1
      reg['zone'..zone_id..'regime'] = 0
      reg['zone'..zone_id..'regtimer'] = 0
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 86400)
      reg['zone'..zone_id..'regtimer'] = 0
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 0)
      SETTINGS["Zone"..zone_id.."RegimeType"] = "pfrp"
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 2)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 0)
      reg['zone'..zone_id..'regtimer'] = 0
      reg['zone'..zone_id..'pfrptime'] = 4319
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 2)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 0)
      reg['zone'..zone_id..'pfrptime'] = 4320
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 3)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 0)
      reg['zone'..zone_id..'regtimer'] = 0
      reg['zone'..zone_id..'vartime'] = 15839
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 3)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 0)
      reg['zone'..zone_id..'vartime'] = 15840
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 4)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 0)
    end
    if #zone_ids > 1 then
      reg['zone02control'] = 0
      reg['zone02regtimer'] = 0
      reg['zone01regime'] = 1
      reg['zone01vartime'] = 0
      reg['zone01pfrptime'] = 0
      reg['zone01regtimer'] = 0
      updateZones()
      lu.assertEquals(reg['zone01regime'], 2)
      lu.assertEquals(reg['zone02regime'], 4)
      reg['zone01moveto'] = 2
      reg['zone01regtimer'] = 5500
      updateZones()
      lu.assertEquals(reg['zone02regime'], 2)
      lu.assertEquals(reg['zone02regtimer'], 5500)
    end
  end
end

function TestWebmacsScripts:test_update_epa_temp_averages()
  initSequence()
  SETTINGS['DataLoggingRate'] = 30
  for i, zone_id in pairs(zone_ids) do
    SETTINGS['Zone'..zone_id..'RegimeType'] = 'pfrp'
    reg['zone'..zone_id..'regime'] = 2
    reg['zone'..zone_id..'regtimer'] = 0
    reg['zone'..zone_id..'pfrptime'] = 0
    reg['zone'..zone_id..'control'] = 1
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 9
      if has_wireless_zone_temp_sensor == true then
        reg[temp_prefix..'tempage'] = 300
        reg[temp_prefix..'tempage'] = 300
      end
    end
    -- increments pfrp time while both temp vals are above setpoint
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],30)
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],60)
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],90)
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 4
    end
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],120)
    -- resets pfrp time when both temp vals are below setpoint
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP - 15
    end
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    -- increments pfrp time if both temp vals meet setpoint
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP
    end
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],30)
    -- resets pfrp time if only one temp val meets setpoint
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      if string.sub(temp_prefix,1,#temp_prefix) == 'A' then
        reg[temp_prefix..'avgtemp'] = PFRP_TEMP
      else
        reg[temp_prefix..'avgtemp'] = PFRP_TEMP - 1
      end
    end
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    -- count pfrp when warmup zone progesses to pfrp regime
    SETTINGS['Zone'..zone_id..'RegimeType'] = 'warmup'
    reg['zone'..zone_id..'regime'] = 1
    reg['zone'..zone_id..'regtimer'] = 0
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 3
    end
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'regime'],1)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    reg['zone'..zone_id..'regime'] = 2
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'regime'],2)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'regime'],2)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
  end
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
