local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'h_damper_reversing/'
facility_path = facilities_dir..facility_type
facility_name = "aumsville"
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(2)
blower_labels = {'P1','S1'}
zone_ids = {'05','06','07','08','09','10','17','18','19','20','21','22'}
zone_labels = {
  ['05']='P5',['06']='P6',['07']='P7',['08']='P8',['09']='P9',['10']='P10',
  ['17']='S5',['18']='S6',['19']='S7',['20']='S8',['21']='S9',['22']='S10'
}
zone_probe_ids = {'A','B'}
biofilter_probe_ids = {''}
has_wireless_zone_temp_sensor = true
has_wireless_biofilter_temp_sensor = true
has_tcp_connect = true
has_blower_speed_control = true
blower_direction_control = true
has_blower_temp_setpoint = true

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
    io['blower'..blower_id..'revdamper'] = 0
  end
  for i, zone_id in pairs(zone_ids) do
    io['damper'..zone_id..'position'] = 0
  end
end

function appendFacilityReg(reg)
  for i, blower_id in pairs(blower_ids) do
    reg['exhaust'..blower_id..'lvtemp'] = 45
    reg["blower"..blower_id.."revtimer"] = 0
    reg["blower"..blower_id.."revlogic"] = 0
  end
end

-- begin TestWebmacsScripts
function TestWebmacsScripts:test_update_blowers()
  initSequence()
  SETTINGS["PressureSetpointHotZoneTrigger"] = 65
  SETTINGS["PressureSetpointColdZoneTrigger"] = 40
  -- with all zones offline, blower is turned off
  reg.zone05control = 0
  reg.zone06control = 0
  reg.zone07control = 0
  reg.blower01override = 0
  io.blower01run = 1
  io.blower01fault = 1
  io.blower01speed = 0
  reg.blower01prerevspeed = 0
  io.blower01revdamper = 0
  reg.blower01revtimer = 300
  reg.duct01pressureavg = 10
  reg.duct02pressureavg = 8
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
  updateBlowers()
  lu.assertEquals(io.blower01revdamper, 0)
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 0)
  -- if a zone is online
  reg.zone05control = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 28.5)
  lu.assertEquals(reg.blower01value, 28.5)
  -- if all the zones are online
  reg.zone06control = 1
  reg.zone07control = 1
  reg.zone08control = 1
  reg.zone09control = 1
  reg.zone10control = 1
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 28.5)
  lu.assertEquals(reg.blower01value, 28.5)
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
  lu.assertEquals(io.blower01speed, 28.5)
  -- test that number of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.blower02control = 1
  io.blower02run = 1
  io.blower02revdamper = 0
  reg.duct02pressuresp = 6
  reg.duct01pospressuresp = 4
  reg.duct01negpressuresp = 4
  reg.duct02pospressuresp = 6
  reg.duct02negpressuresp = 6
  reg.zone17control = 1
  reg.zone17pAlvtemp = 70
  reg.zone17pBlvtemp = 105
  reg.zone18control = 1
  reg.zone18pAlvtemp = 70
  reg.zone18pBlvtemp = 105
  reg.zone19control = 1
  reg.zone19pAlvtemp = 70
  reg.zone19pBlvtemp = 105
  reg.zone20control = 1
  reg.zone20pAlvtemp = 70
  reg.zone20pBlvtemp = 105
  reg.zone21control = 1
  reg.zone21pAlvtemp = 70
  reg.zone21pBlvtemp = 105
  reg.zone22control = 1
  reg.zone22pAlvtemp = 70
  reg.zone22pBlvtemp = 105
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  -- test pressure does not change while idletimer greater than zero
  lu.assertEquals(reg['blower02idletimer'], 420)
  lu.assertEquals(io['blower02run'], 0)
  lu.assertEquals(reg['duct02pressuresp'], 6)
  -- test pressure changes after idletimer reaches zero
  reg.blower02idletimer = 0
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateBlowers()
  lu.assertEquals(io['blower02run'], 1)
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that pressure setpoint max is respected
  reg.duct02pospressuresp = 10
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that number of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  io.blower02run = 1
  io.blower02revdamper = 1
  reg.duct02pospressuresp = 6
  reg.zone17pAlvtemp = 55
  reg.zone17pBlvtemp = 40
  reg.zone18pAlvtemp = 155
  reg.zone18pBlvtemp = 150
  reg.zone19pAlvtemp = 45
  reg.zone19pBlvtemp = 40
  reg.zone20pAlvtemp = 55
  reg.zone20pBlvtemp = 50
  reg.zone21pAlvtemp = 55
  reg.zone21pBlvtemp = 50
  reg.zone22pAlvtemp = 55
  reg.zone22pBlvtemp = 50
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 4)
  -- test that pressure setpoint min is respected
  reg.duct02pospressuresp = 4
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 4)
  -- test that hot zone trigger takes precedence over cold zone trigger
  SETTINGS["PressureSetpointHotZoneTrigger"] = 50
  SETTINGS["PressureSetpointColdZoneTrigger"] = 50
  io.blower02run = 1
  reg.duct02pospressuresp = 6
  reg.zone17pAlvtemp = 150
  reg.zone17pBlvtemp = 145
  reg.zone18pAlvtemp = 155
  reg.zone18pBlvtemp = 150
  reg.zone19pAlvtemp = 135
  reg.zone19pBlvtemp = 130
  reg.zone20pAlvtemp = 35
  reg.zone20pBlvtemp = 30
  reg.zone21pAlvtemp = 35
  reg.zone21pBlvtemp = 30
  reg.zone22pAlvtemp = 35
  reg.zone22pBlvtemp = 30
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that last saved direction pressure setpoints are resumed
  SETTINGS["NegDirPressureSetpointMin"] = 12
  SETTINGS["NegDirPressureSetpointMax"] = 24
  reg.duct01pospressuresp = 4
  reg.biofilter01lvtemp = 190
  reg.zone05pAlvtemp = 190
  reg.zone05pBlvtemp = 180
  reg.zone06pAlvtemp = 190
  reg.zone06pBlvtemp = 185
  reg.zone07pAlvtemp = 190
  reg.zone07pBlvtemp = 180
  reg.zone08pAlvtemp = 190
  reg.zone08pBlvtemp = 185
  reg.zone09pAlvtemp = 190
  reg.zone09pBlvtemp = 180
  reg.zone10pAlvtemp = 190
  reg.zone10pBlvtemp = 185
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  reg.blower01direction = 0
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01idletimer'], 420)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 4)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- revdamper changes direction to positive
  reg.blower01idletimer = 100
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 4)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- test that ductXpressuresp increases from last captured value from ductXpospressuresp
  reg.blower01idletimer = 0
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  reg.biofilter01lvtemp = 60
  reg.zone05pAlvtemp = 110
  reg.zone05pBlvtemp = 80
  reg.zone06pAlvtemp = 110
  reg.zone06pBlvtemp = 75
  reg.zone07pAlvtemp = 110
  reg.zone07pBlvtemp = 80
  reg.zone08pAlvtemp = 110
  reg.zone08pBlvtemp = 75
  reg.zone09pAlvtemp = 110
  reg.zone09pBlvtemp = 80
  reg.zone10pAlvtemp = 110
  reg.zone10pBlvtemp = 75
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  reg.blower01revtimer = 0
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- revdamper changes direction to negative
  reg.blower01idletimer = 100
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 8)
  -- test that ductXpressuresp increases from last captured value from ductXnegpressuresp
  reg.zone05pAlvtemp = 170
  reg.zone05pBlvtemp = 180
  reg.zone06pAlvtemp = 190
  reg.zone06pBlvtemp = 165
  reg.zone07pAlvtemp = 190
  reg.zone07pBlvtemp = 165
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 12)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 12)
  reg.zone05pAlvtemp = 170
  reg.zone05pBlvtemp = 180
  reg.zone06pAlvtemp = 190
  reg.zone06pBlvtemp = 165
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 14)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 14)
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 16)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  -- revdamper changes direction
  reg.biofilter01lvtemp = 85
  reg.zone05pAlvtemp = 90
  reg.zone05pBlvtemp = 180
  reg.zone06control = 1
  reg.zone06pAlvtemp = 90
  reg.zone06pBlvtemp = 185
  reg.zone07control = 1
  reg.zone07pAlvtemp = 90
  reg.zone07pBlvtemp = 185
  reg.zone08control = 1
  reg.zone08pAlvtemp = 90
  reg.zone08pBlvtemp = 185
  reg.zone09control = 1
  reg.zone09pAlvtemp = 90
  reg.zone09pBlvtemp = 185
  reg.zone10control = 1
  reg.zone10pAlvtemp = 90
  reg.zone10pBlvtemp = 185
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  reg.blower01revtimer = 0
  reg.blower01revlogic = 0
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 16)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  reg.blower01idletimer = 100
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 16)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  reg.blower01idletimer = 0
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['duct01negpressuresp'], 16)
  -- test that only online zones are accounted for
  io.blower02run = 1
  io.blower02revdamper = 1
  reg.duct02pospressuresp = 6
  reg.zone10pAlvtemp = 145
  reg.zone10pBlvtemp = 150
  reg.zone17pAlvtemp = 150
  reg.zone17pBlvtemp = 155
  reg.zone18pAlvtemp = 30
  reg.zone18pBlvtemp = 35
  reg.zone19pAlvtemp = 30
  reg.zone19pBlvtemp = 35
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  reg.zone06control = 0
  reg.zone07control = 0
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  io.blower02run = 0
  reg.duct02pressuresp = 6
  reg.zone07pAlvtemp = 145
  reg.zone07pBlvtemp = 150
  reg.zone08pAlvtemp = 150
  reg.zone08pBlvtemp = 155
  reg.zone09pAlvtemp = 30
  reg.zone09pBlvtemp = 35
  reg.zone10pAlvtemp = 30
  reg.zone10pBlvtemp = 35
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 6)
  -- test handling load zone active
  io.blower01run = 0
  io.blower01revdamper = 0
  io.blower01speed = 25
  reg.blower01value = 25
  reg.blower01override = 0
  reg.blower01direction = 0
  reg.blower01idletimer = 0
  reg.blower01revoverride = 0
  reg.loadzone06active = 1
  reg.damper06value = 100
  SETTINGS["MaxVFDSpeed"] = 75
  updateBlowers()
  lu.assertEquals(io["blower01run"], 0)
  lu.assertEquals(io["blower01revdamper"], 0)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 420)
  lu.assertEquals(reg["blower01revoverride"], 1)
  lu.assertEquals(reg["damper06value"], 100)
  reg.blower01idletimer = 210
  updateBlowers()
  lu.assertEquals(io["blower01run"], 0)
  lu.assertEquals(io["blower01revdamper"], 0)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 210)
  lu.assertEquals(reg["blower01revoverride"], 1)
  reg.blower01idletimer = 209
  updateBlowers()
  lu.assertEquals(io["blower01run"], 0)
  lu.assertEquals(io["blower01revdamper"], 1)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 210)
  lu.assertEquals(reg["blower01revoverride"], 1)
  reg.blower01idletimer = 0
  -- sets blower speed and value to blower value prior to reversing
  updateBlowers()
  lu.assertEquals(io["blower01run"], 1)
  lu.assertEquals(io["blower01revdamper"], 1)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 0)
  lu.assertEquals(reg["blower01revoverride"], 1)
  -- sets blower speed to 100 due to load zone being active
  updateBlowers()
  lu.assertEquals(io["blower01run"], 1)
  lu.assertEquals(io["blower01revdamper"], 1)
  lu.assertEquals(io["blower01speed"], 100)
  lu.assertEquals(reg["blower01value"], 100)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 0)
  lu.assertEquals(reg["blower01revoverride"], 1)
  -- If the blower is running and is not in idle time then the blower speed/value will not go below the MinVFDSpeed
  io.blower01run = 1
  io.blower01speed = 20
  reg.blower01value = 20
  reg.loadzone06active = 0
  updateBlowers()
  lu.assertEquals(io["blower01run"], 1)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 0)
end

function TestWebmacsScripts:test_blower_direction_control()
  initSequence()
  reg.zone05control = 1
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
  reg.duct01pressuresp = 0
  reg.duct02pressuresp = 0
  reg.blower01revlogic = 1
  reg.duct01pressureavg = 0
  reg.duct01pospressureavg = 4
  reg.duct01negpressureavg = 10
  reg.duct02pospressureavg = 2
  reg.duct02negpressureavg = 8
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
  reg.biofilter01lvtemp = 190
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
  reg.blower01revtimer = 0
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blower01direction, 1)
  lu.assertEquals(reg.blower01revtimer, 0)
  -- with temp average greater than setpoint it does not reset rev timer
  reg.biofilter01lvtemp = 190
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
  -- test that positive aeration is forced when biofilter temp is above SP
  reg.biofilter01lvtemp = 190
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

function TestWebmacsScripts:test_zone_controls()
  for i, blower_id in pairs(blower_ids) do
    io['blower'..blower_id..'speed'] = 65
    io['blower'..blower_id..'revdamper'] = 1
    reg['biofilter'..blower_id..'avgtemp'] = 75
    reg['exhaust'..blower_id..'avgtemp'] = 70
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
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature \n")
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 135
    reg['zone'..zone_id..'avgdamper'] = 45
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature \n01/01/2017 12:00:00, "..zone_labels[zone_id]..", 128, 135, 45, 10, 65, 75, 70\n")
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
    local target_zone = '05'
    if zone_id == target_zone then
      reg['zone'..zone_id..'moveto'] = 6
      target_zone = '06'
    else
      reg['zone'..zone_id..'moveto'] = 5
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

function TestWebmacsScripts:test_batch_moving()
  initSequence()
  if #zone_ids >= 2 then
    -- with empty filename, creates new filename
    reg['zone05control'] = 1
    reg['zone06control'] = 0
    reg['zone05reset'] = 0
    reg['zone06reset'] = 0
    if has_regimes == true then
      reg['zone05regime'] = 0
      reg['zone05regtimer'] = 0
      reg['zone06regime'] = 0
      reg['zone06regtimer'] = 0
    end
    _G['ZONE_05']["file_name"] = ""
    _G['ZONE_06']["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle ('05', 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_05']["file_name"], '01_01_2017_120000_newbatchname.csv')
    -- simulate move batch
    reg['zone05moveto'] = 6
    updateZones()
    lu.assertEquals(_G['ZONE_05']["file_name"], '')
    lu.assertEquals(reg['zone05control'], 0)
    lu.assertEquals(_G['ZONE_06']["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(reg['zone06control'], 0)
  end

  function TestWebmacsScripts:test_update_duct_pressure_averages()
    initSequence()
    SETTINGS['BlowerRate'] = 10
    reg['blower01direction'] = 1
    reg['duct01pressureavg'] = 0
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

function TestWebmacsScripts:test_retrieve_wireless_sensor_data_tcp()
  initSequence()
  local sensor_data = retrieveWirelessSensorDataTCP()

  for i,zn_id in ipairs(zone_ids) do
    SETTINGS["Zone"..zn_id.."ProbeAPointID"] = "0000000050B04AE3_1"
    SETTINGS["Zone"..zn_id.."ProbeBPointID"] = "0000000050B04AE3_2"
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

function TestWebmacsScripts:test_update_misters()
  initSequence()
  -- when blower is running, idle cycle complete, and mister override is on,
  -- mister should be on/off based on mistercontrol value
  io.blower01run = 1
  reg.blower01idletimer = 0
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 1
  reg.duct01mistercontrol = 0
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],0)
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 1
  reg.duct01mistercontrol = 1
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],1)
  -- when blower is not running, mister should be off
  io.blower01run = 0
  reg.blower01idletimer = 0
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 1
  reg.duct01mistercontrol = 0
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],0)
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 1
  reg.duct01mistercontrol = 1
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],0)
  -- when blower is running and in idle cycle, mister should be off
  io.blower01run = 1
  reg.blower01idletimer = 100
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 1
  reg.duct01mistercontrol = 0
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],0)
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 1
  reg.duct01mistercontrol = 1
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],0)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in positive, and premister temp is less than setpoint
  -- mister is off
  io.blower01run = 1
  reg.blower01idletimer = 0
  reg.blower01direction = 1
  io.blower01revdamper = 1
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 0
  reg.duct01mistercontrol = 0
  reg.premister01lvtemp = 99
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],0)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in positive, and premister temp is at or above the setpoint
  -- mister is on
  io.blower01run = 1
  reg.blower01idletimer = 0
  reg.blower01direction = 1
  io.blower01revdamper = 1
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 0
  reg.duct01mistercontrol = 0
  reg.premister01lvtemp = 100
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],1)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in negative, and biofilter temp avg is below the setpoint
  -- mister is off
  io.blower01run = 1
  reg.blower01idletimer = 0
  reg.blower01direction = 0
  io.blower01revdamper = 0
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 0
  reg.duct01mistercontrol = 0
  reg.premister01lvtemp = 100
  reg.biofilter01lvtemp = 94
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],0)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in negative, and biofilter temp avg is at or above the setpoint
  -- mister is on
  io.blower01run = 1
  reg.blower01idletimer = 0
  reg.blower01direction = 0
  io.blower01revdamper = 0
  reg.duct01mistertimer = 0
  reg.duct01misteroverride = 0
  reg.duct01mistercontrol = 0
  reg.premister01lvtemp = 100
  reg.biofilter01lvtemp = 95
  updateMisters(blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['duct01mister'],1)
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
