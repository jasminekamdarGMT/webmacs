local lu = require('luaunit')

TestWebmacsScripts = {}
blower_ids = {'01','02','03','04'}
blower_labels = {'1','2','3','4'}
zone_ids = {'01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16'}
zone_probe_ids = {'A','B'}
biofilter_probe_ids = {''}
has_tcp_connect = true
has_wireless_zone_temp_sensor = true
has_wireless_biofilter_temp_sensor = true
has_blower_speed_control = true
blower_direction_control = true
facilities_dir = 'facilities/'
facility_type = 'h_damper_reversing/'
facility_path = facilities_dir..facility_type
facility_name = "grimms_fuel_expansion"

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
  SETTINGS["PressureSetpointHotZoneTrigger"] = 55
  SETTINGS["PressureSetpointColdZoneTrigger"] = 45
  -- with all zones offline, blower is turned off
  reg.zone01control = 0
  reg.zone02control = 0
  reg.zone03control = 0
  reg.blower01override = 0
  io.blower01run = 1
  io.blower01fault = 1
  io.blower01speed = 0
  reg.blower01prerevspeed = 0
  reg.blower01revtimer = 300
  io.duct01pospressure = 4
  io.duct01negpressure = 10
  io.duct02pospressure = 2
  io.duct02negpressure = 8
  reg.duct01pressuresp = 1
  reg.duct02pressuresp = 1
  reg.duct01pressureavg = 0
  reg.duct01pospressureavg = 4
  reg.duct01negpressureavg = 10
  reg.duct02pressureavg = 0
  reg.duct02pospressureavg = 2
  reg.duct02negpressureavg = 8
  reg.duct03pressureavg = 0
  reg.duct03pospressureavg = 10
  reg.duct03negpressureavg = 10
  reg.duct04pressureavg = 0
  reg.duct04pospressureavg = 10
  reg.duct04negpressureavg = 10
  reg.biofilter01lvtemp = 70
  reg.biofilter02lvtemp = 70
  reg.biofilter03lvtemp = 70
  reg.biofilter04lvtemp = 70
  updateDuctPressureAverages()
  updateBlowers()
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
  reg.zone03control = 1
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
  reg.duct01pressuresp = 6
  reg.duct01pospressuresp = 4
  reg.duct01negpressuresp = 4
  reg.duct02pospressuresp = 6
  reg.duct02negpressuresp = 6
  reg.zone01control = 1
  reg.zone01pAlvtemp = 80
  reg.zone01pBlvtemp = 85
  reg.zone02control = 1
  reg.zone02pAlvtemp = 145
  reg.zone02pBlvtemp = 150
  reg.zone03control = 1
  reg.zone03pAlvtemp = 150
  reg.zone03pBlvtemp = 155
  reg.zone04control = 1
  reg.zone04pAlvtemp = 145
  reg.zone04pBlvtemp = 145
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that pressure setpoint max is respected
  reg.duct01pressuresp = 10
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 10)
  -- test that number of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 40
  reg.zone01pBlvtemp = 45
  reg.zone02pAlvtemp = 50
  reg.zone02pBlvtemp = 55
  reg.zone03pAlvtemp = 150
  reg.zone03pBlvtemp = 155
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that pressure setpoint min is respected
  reg.duct01pressuresp = 4
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that hot zone trigger takes precedence over cold zone trigger
  SETTINGS["PressureSetpointHotZoneTrigger"] = 50
  SETTINGS["PressureSetpointColdZoneTrigger"] = 50
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone01pBlvtemp = 35
  reg.zone02pAlvtemp = 30
  reg.zone02pBlvtemp = 35
  reg.zone03pAlvtemp = 145
  reg.zone03pBlvtemp = 150
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that last saved direction pressure setpoints are resumed
  SETTINGS["NegDirPressureSetpointMin"] = 12
  SETTINGS["NegDirPressureSetpointMax"] = 24
  reg.duct01pospressuresp = 4
  reg.biofilter01lvtemp = 90
  reg.zone01pAlvtemp = 180
  reg.zone01pBlvtemp = 190
  reg.zone02pAlvtemp = 185
  reg.zone02pBlvtemp = 190
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  reg.blower01direction = 0
  io.blower01revdamper = 0
  io.blower01run = 1
  reg.premister01lvtemp = 75
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01idletimer'], 420)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 4)
  lu.assertEquals(reg['duct01negpressuresp'], 4)
  -- revdamper changes direction to positive
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(io['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 4)
  lu.assertEquals(reg['duct01negpressuresp'], 4)
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
  lu.assertEquals(reg['duct01negpressuresp'], 4)
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
  lu.assertEquals(reg['duct01negpressuresp'], 4)
  -- revdamper changes direction to negative
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(io['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  lu.assertEquals(reg['duct01negpressuresp'], 4)
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
  reg.duct01pospressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone01pBlvtemp = 35
  reg.zone02pAlvtemp = 30
  reg.zone02pBlvtemp = 35
  reg.zone03pAlvtemp = 145
  reg.zone03pBlvtemp = 150
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  reg.zone03control = 0
  reg.zone04control = 0
  reg.biofilter01lvtemp = 104
  io.blower01revdamper = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone01pBlvtemp = 35
  reg.zone02pAlvtemp = 30
  reg.zone02pBlvtemp = 35
  reg.zone03pAlvtemp = 145
  reg.zone03pBlvtemp = 150
  reg.zone04pAlvtemp = 150
  reg.zone04pBlvtemp = 155
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  io.blower01run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that mister only turns on if blower is online
  io.duct01mister = 0
  reg.blower01control = 0
  io.blower01run = 0
  reg.blower01direction = 1
  reg.premister01lvtemp = 75
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
  io.duct01mister = 0
  reg.blower01control = 1
  io.blower01run = 1
  reg.blower01direction = 1
  reg.blower01idletimer = 0
  reg.premister01lvtemp = 105
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 1)
  -- test that mister turns off if blower is offline
  io.duct01mister = 1
  reg.blower01control = 0
  io.blower01run = 0
  reg.blower01direction = 1
  reg.premister01lvtemp = 75
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
  -- test that mister turns on when biolfilterXlvtemp value is greater than or equal to MisterXNegHighTempSetPoint
  SETTINGS["BiofilterForcePositiveTemperature"] = 130
  io.duct01mister = 0
  reg.blower01control = 1
  io.blower01run = 1
  io.blower01revdamper = 0
  reg.blower01direction = 0
  reg.biofilter01lvtemp = 104
  reg.blower01idletimer = 0
  reg.blower01revtimer = 300
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 1)
  -- test that mister stays on biolfilterXlvtemp value lower to less than MisterXNegHighTempSetPoint and greater than MisterXNegLowTempSetPoint
  reg.biofilter01lvtemp = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 1)
  -- test that mister turns off biolfilterXlvtemp value is less than or equal to MisterXNegLowTempSetPoint
  reg.biofilter01lvtemp = 95
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
  -- test that mister stays off biolfilterXlvtemp value raises to less than MisterXNegHighTempSetPoint and greater than MisterXNegLowTempSetPoint
  reg.biofilter01lvtemp = 37
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
  -- test that mister turns off when blower direction is changing
  reg.biofilter01lvtemp = 105
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 1)
  reg.biofilter01lvtemp = 45
  reg.blower01direction = 1
  reg.blower01idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
  reg.biofilter01lvtemp = 45
  reg.premister01lvtemp = 55
  reg.blower01direction = 1
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
  reg.biofilter01lvtemp = 125
  reg.premister01lvtemp = 105
  reg.blower01direction = 1
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 1)
  io.blower01run = 0
  io.blower01revdamper = 0
  io.blower01speed = 25
  reg.blower01value = 25
  reg.blower01override = 0
  reg.blower01direction = 0
  reg.blower01idletimer = 0
  reg.blower01revoverride = 0
  reg.loadzone01active = 1
  io.blower01run = 0
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 145
  reg.zone01pBlvtemp = 150
  reg.duct01presssptimer = 0
  reg.duct02presssptimer = 0
  SETTINGS["MaxVFDSpeed"] = 75
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io["blower01run"], 0)
  lu.assertEquals(io["blower01revdamper"], 0)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 420)
  lu.assertEquals(reg["blower01revoverride"], 1)
  reg.blower01idletimer = 210
  updateDuctPressureAverages()
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
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io["blower01run"], 0)
  lu.assertEquals(io["blower01revdamper"], 1)
  lu.assertEquals(io["blower01speed"], 25)
  lu.assertEquals(reg["blower01value"], 25)
  lu.assertEquals(reg["blower01override"], 1)
  lu.assertEquals(reg["blower01direction"], 1)
  lu.assertEquals(reg["blower01idletimer"], 209)
  lu.assertEquals(reg["blower01revoverride"], 1)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
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
end

function TestWebmacsScripts:test_blower_direction_control()
  initSequence()
  reg.zone01control = 1
  for i,blwr_id in ipairs(BLOWER_IDS) do
    reg["blower"..blwr_id.."control"] = 1
    io["blower"..blwr_id.."run"] = 1
    reg["blower"..blwr_id.."override"] = 0
    io["blower"..blwr_id.."fault"] = 1
    io["blower"..blwr_id.."revdamper"] = 0
    io["blower"..blwr_id.."speed"] = 37.5
    reg["biofilter"..blwr_id.."lvtemp"] = 50
    reg["biofilter"..blwr_id.."lvtemp"] = 50
    reg["biofilter"..blwr_id.."lvtemp"] = 50
    reg["biofilter"..blwr_id.."lvtemp"] = 50
    reg["blower"..blwr_id.."idletimer"] = 420
    io["duct"..blwr_id.."pospressure"] = 4
    io["duct"..blwr_id.."negpressure"] = 10
    io["duct"..blwr_id.."pospressure"] = 2
    io["duct"..blwr_id.."negpressure"] = 8
    reg["duct"..blwr_id.."pressuresp"] = 0
    reg["duct"..blwr_id.."pressuresp"] = 0
    reg["duct"..blwr_id.."pressureavg"] = 0
    reg["duct"..blwr_id.."pospressureavg"] = 4
    reg["duct"..blwr_id.."negpressureavg"] = 10
    reg["duct"..blwr_id.."pospressureavg"] = 2
    reg["duct"..blwr_id.."negpressureavg"] = 8
  end
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
  -- test that blower goes to min speed while idle timer is running
  -- with temp average less than setpoint
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 25)
  -- with temp average greater than setpoint
  reg.biofilter01lvtemp = 90
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 25)
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
  reg.premister01lvtemp = 60
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01speed, 35.5)
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
  reg.biofilter01lvtemp = 135
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

function TestWebmacsScripts:test_zone_controls()
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'value'] = 65
    io['blower'..blower_id..'revdamper'] = 1
    reg['blower'..blower_id..'value'] = 100
    reg['biofilter'..blower_id..'avgtemp'] = 135
    reg['exhaust'..blower_id..'avgtemp'] = 123
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
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'avgdamper'] = 45
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature \n01/01/2017 12:00:00, "..tonumber(zone_id)..", 128, 135, 45, 10, 100, 135, 123\n")
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

function TestWebmacsScripts:test_retrieve_wireless_sensor_data_tcp()
  initSequence()
  local sensor_data = retrieveWirelessSensorDataTCP()

  for i,zn_id in ipairs(zone_ids) do
    SETTINGS["Zone"..zn_id.."ProbeAPointID"] = "0000000050B04AE3_1"
    SETTINGS["Zone"..zn_id.."ProbeBPointID"] = "0000000050B04AE3_2"
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
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
