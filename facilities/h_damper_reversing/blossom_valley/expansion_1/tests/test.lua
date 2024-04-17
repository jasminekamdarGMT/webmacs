local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true
facilities_dir = 'facilities/'
facility_type = 'h_damper_reversing/'
facility_path = facilities_dir..facility_type
facility_name = "blossom_valley"
main_path = package.path
package.path = main_path .. ';'..facility_path..'/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
facility_name = "blossom_valley/expansion_1"
package.path = main_path .. ';'..facility_path..'/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require('facility_configuration')

biofilter_probe_ids = {'A'}
blower_ids = {'P7','S7'}
blower_group_zone_ids = {}
blower_group_zone_ids['P7'] = uid(25,26)
blower_group_zone_ids['S7'] = uid(27,28)
p_blower_ids = {'P7'}
s_blower_ids = {'S7'}
damper_ids = {
  'P7A','P7B','S7A','S7B'
}
zone_ids = uid(25,28)
zone_probe_ids = {'A','B'}
zone_damper_ids = {
  ['25']='P7A',['26']='P7B',['27']='S7A',['28']='S7B'
}
zone_labels = {
  ['25']='P7A',['26']='P7B',['27']='S7A',['28']='S7B'
}
has_blower_speed_control = true

require(facility_path..'x600m/scripts/test_helpers')
require(facility_path..'x600m/tests/wireless_temp_sensor_tests')

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

function appendFacilityReg(reg)
  for i, blower_id in pairs(p_blower_ids) do
    reg['exhaust'..blower_id..'lvtemp'] = 45
  end
  for i, zone_id in pairs(zone_ids) do
    reg['zone'..zone_id..'regime'] = 0
  end
end

function initializeRegisters()
  local reg = {}
  for i, blower_id in pairs(blower_ids) do
    if string.sub(blower_id,1,1) == 'P' then
      reg['blower'..blower_id..'direction'] = 0
      reg['blower'..blower_id..'idletimer'] = 0
      reg['blower'..blower_id..'revoverride'] = 0
      reg["blower"..blower_id.."revtimer"] = 0
      reg["blower"..blower_id.."revlogic"] = 0
    else
      reg['blower'..blower_id..'cycle'] = 0
      reg['blower'..blower_id..'customcycle'] = 0
    end
    reg['blower'..blower_id..'control'] = 0
  end
  for i, zone_id in pairs(zone_ids) do
    reg['zone'..zone_id..'control'] = 0
    reg['zone'..zone_id..'print'] = 0
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
      reg['zone'..zone_id..'pBavgtemp'] = 0
      reg['zone'..zone_id..'pAlvtemp'] = 0
      reg['zone'..zone_id..'pBlvtemp'] = 0
    end
  end
  if appendFacilityReg ~= nil then
    appendFacilityReg(reg)
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
  lu.assertEquals(_G['BLOWER_S7']['control'], 100)
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

function TestWebmacsScripts:test_update_last_valid_temps()
  SETTINGS["Zone26ProbeBPointID"] = "0000000050B04AE3_1"
  updateLastValidTemps()
  lu.assertEquals(reg.zone26pBlvtemp, 70.9)
  -- sensor id is not in data
  SETTINGS["Zone26ProbeBPointID"] = "0000000040B0FFFF_2"
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  lu.assertEquals(reg.zone26pBlvtemp, 70.9)
  -- after 50th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone26ProbeBPointID"] = 50
  updateLastValidTemps()
  lu.assertEquals(reg.zone26pBlvtemp, 70.9)
  lu.assertEquals(reg.zone26pBtempage, 600)
  -- after 100th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone26ProbeBPointID"] = 100
  updateLastValidTemps()
  lu.assertEquals(reg.zone26pBlvtemp, 70.9)
  lu.assertEquals(reg.zone26pBtempage, 65535)
  -- test biofilter temp
  SETTINGS["BiofilterP7ProbeAPointID"] = "0000000050B04AE3_1"
  updateLastValidTemps()
  lu.assertEquals(reg.biofilterP7pAlvtemp, 70.9)
  -- test exhaust temp
  io.exhaustP7temp = 130
  updateLastValidTemps()
  lu.assertEquals(reg.exhaustP7lvtemp, 130)
  -- io value is nil
  io.exhaustP7temp = nil
  updateLastValidTemps()
  lu.assertEquals(reg.exhaustP7lvtemp, 130)
  -- io value is >= 185
  io.exhaustP7temp = 185
  updateLastValidTemps()
  lu.assertEquals(reg.exhaustP7lvtemp, 130)
end

function TestWebmacsScripts:test_update_temp_averages()
  initSequence()
  first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
  for k, value in pairs(first_10_values) do
    reg.zone25pAlvtemp = value
    updateTempAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['zone25pAavgtemp'], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
  lu.assertEquals(reg['zone25pAavgtemp'], 110)
  --after 10 values, it starts rotating the table
  reg.zone25pAlvtemp = 80
  updateTempAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone25pAavgtemp'], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
  lu.assertEquals(reg['zone25pAavgtemp'], 106)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['zone25pAavgtemp'] = {}
  reg.zone25pAlvtemp = 80
  updateTempAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone25pAavgtemp'], {80})
  lu.assertEquals(reg.zone25pAavgtemp, 80)
end

function TestWebmacsScripts:test_update_damper_averages()
  initSequence()
  SETTINGS["DataLoggingRate"] = 50
  reg.zone25control = 1
  first_10_values = {10, 30, 50, 70, 90, 100, 80, 60, 20, 0}
  for k, value in pairs(first_10_values) do
    io.damperP7Aposition = value
    reg.zone25avgtimer = 0
    updateDamperAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['zone25avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
  lu.assertEquals(reg['zone25avgdamper'], 51)
  lu.assertEquals(reg['zone25avgtimer'], 300)
  -- if zone is offline or timer is not complete, does nothing
  io.damperP7Aposition = 80
  reg.zone25control = 0
  reg.zone25avgtimer = 0
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone25avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
  lu.assertEquals(reg['zone25avgdamper'], 51)
  reg.zone25control = 1
  reg.zone25avgtimer = 300
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone25avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
  lu.assertEquals(reg['zone25avgdamper'], 51)
  -- otherwise, after 10 values, it starts rotating the table
  reg.zone25control = 1
  reg.zone25avgtimer = 0
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone25avgdamper'], {80, 0, 20, 60, 80, 100, 90, 70, 50, 30})
  lu.assertEquals(reg['zone25avgdamper'], 58)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['zone25avgdamper'] = {}
  io.damperP7Aposition = 80
  reg.zone25avgtimer = 0
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone25avgdamper'], {80})
  lu.assertEquals(reg.zone25avgdamper, 80)
  initSequence()
end

function TestWebmacsScripts:test_update_blower_pid_values()
  initSequence()
  SETTINGS["PrimaryMinVFDSpeed"] = "25"
  SETTINGS["PrimaryMaxVFDSpeed"] = "100"
  SETTINGS['BlowerRate'] = "10"
  SETTINGS["BlowerGain"] = ".5"
  SETTINGS["BlowerIntegral"] = "1"
  SETTINGS["BlowerDerivative"] = ".5"
  SETTINGS["BlowerDerivativeTime"] = "10"
  SETTINGS['PressureSetpoint2'] = "4"
  -- low pressure results in max vfd speed
  updateBlowerPIDPressureValues(BLOWER_P7, 1, SETTINGS['PressureSetpoint2'], 'blowerP7', SETTINGS["PrimaryMinVFDSpeed"], SETTINGS["PrimaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_P7['control'], 31.5)
  updateBlowerPIDPressureValues(BLOWER_P7, 1, SETTINGS['PressureSetpoint2'], 'blowerP7', SETTINGS["PrimaryMinVFDSpeed"], SETTINGS["PrimaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_P7['control'], 61.5)
  updateBlowerPIDPressureValues(BLOWER_P7, 1, SETTINGS['PressureSetpoint2'], 'blowerP7', SETTINGS["PrimaryMinVFDSpeed"], SETTINGS["PrimaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_P7['control'], 91.5)
  updateBlowerPIDPressureValues(BLOWER_P7, 1, SETTINGS['PressureSetpoint2'], 'blowerP7', SETTINGS["PrimaryMinVFDSpeed"], SETTINGS["PrimaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_P7['control'], 100)
  -- high pressure result in min VFD speed
  updateBlowerPIDPressureValues(BLOWER_P7, 10, SETTINGS['PressureSetpoint2'], 'blowerP7', SETTINGS["PrimaryMinVFDSpeed"], SETTINGS["PrimaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_P7['control'], 37.45)
  updateBlowerPIDPressureValues(BLOWER_P7, 10, SETTINGS['PressureSetpoint2'], 'blowerP7', SETTINGS["PrimaryMinVFDSpeed"], SETTINGS["PrimaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_P7['control'], 25)
  updateBlowerPIDPressureValues(BLOWER_P7, 10, SETTINGS['PressureSetpoint2'], 'blowerP7', SETTINGS["PrimaryMinVFDSpeed"], SETTINGS["PrimaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_P7['control'], 25)

  -- low pressure results in max vfd speed
  updateBlowerPIDPressureValues(BLOWER_S7, 1, SETTINGS['PressureSetpoint2'], 'blowerS7', SETTINGS["SecondaryMinVFDSpeed"], SETTINGS["SecondaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_S7['control'], 31.5)
  updateBlowerPIDPressureValues(BLOWER_S7, 1, SETTINGS['PressureSetpoint2'], 'blowerS7', SETTINGS["SecondaryMinVFDSpeed"], SETTINGS["SecondaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_S7['control'], 61.5)
  updateBlowerPIDPressureValues(BLOWER_S7, 1, SETTINGS['PressureSetpoint2'], 'blowerS7', SETTINGS["SecondaryMinVFDSpeed"], SETTINGS["SecondaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_S7['control'], 91.5)
  updateBlowerPIDPressureValues(BLOWER_S7, 1, SETTINGS['PressureSetpoint2'], 'blowerS7', SETTINGS["SecondaryMinVFDSpeed"], SETTINGS["SecondaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_S7['control'], 100)
  -- high pressure result in min VFD speed
  updateBlowerPIDPressureValues(BLOWER_S7, 10, SETTINGS['PressureSetpoint2'], 'blowerS7', SETTINGS["SecondaryMinVFDSpeed"], SETTINGS["SecondaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_S7['control'], 37.45)
  updateBlowerPIDPressureValues(BLOWER_S7, 10, SETTINGS['PressureSetpoint2'], 'blowerS7', SETTINGS["SecondaryMinVFDSpeed"], SETTINGS["SecondaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_S7['control'], 25)
  updateBlowerPIDPressureValues(BLOWER_S7, 10, SETTINGS['PressureSetpoint2'], 'blowerS7', SETTINGS["SecondaryMinVFDSpeed"], SETTINGS["SecondaryMaxVFDSpeed"])
  lu.assertEquals(BLOWER_S7['control'], 25)
end

function TestWebmacsScripts:test_temp_average_for_zones()
  reg.zone26control = 1
  reg.zone26pAlvtemp = 115
  reg.zone26pBlvtemp = 125
  local avg = tempAvgForZones({'26'}, {'A','B'})
  lu.assertEquals(avg, 120)
  -- ignores disconnected probe
  reg.zone26pBlvtemp = nil
  avg = tempAvgForZones({'26'}, {'A','B'})
  lu.assertEquals(avg, 115)
  -- ignores lv temp out of range
  reg.zone26pBlvtemp = -10
  avg = tempAvgForZones({'26'}, {'A','B'})
  lu.assertEquals(avg, 115)
  -- returns zero for zone offline
  reg.zone26control = 0
  avg = tempAvgForZones({'26'}, {'A','B'})
  lu.assertEquals(avg, 0)
end

function TestWebmacsScripts:test_max_temp_average_for_zones()
  reg.zone25control = 1
  reg.zone25pAlvtemp = 115
  reg.zone25pBlvtemp = 125
  reg.zone26control = 1
  reg.zone26pAlvtemp = 135
  reg.zone26pBlvtemp = 145
  local avg = maxtempAvgForZones({'25','26'}, {'A','B'})
  lu.assertEquals(avg, 140)
  -- if a zone is offline, it is not included in average
  reg.zone26control = 0
  avg = maxtempAvgForZones({'25','26'}, {'A','B'})
  lu.assertEquals(avg, 120)
  reg.zone25control = 0
  reg.zone26control = 1
  avg = maxtempAvgForZones({'25','26'}, {'A','B'})
  lu.assertEquals(avg, 140)
  -- if both zones are offline, the return value is 0
  reg.zone25control = 0
  reg.zone26control = 0
  avg = maxtempAvgForZones({'25','26'}, {'A','B'})
  lu.assertEquals(avg, 0)
end

function TestWebmacsScripts:test_update_blowers()
  initSequence()
  SETTINGS["PressureSetpointHotZoneTrigger"] = 50
  SETTINGS["PressureSetpointColdZoneTrigger"] = 50
  SETTINGS["BiofilterForcePositiveTemperature"] = 180
  -- with all zones offline, blower is turned off
  for i,zn_id in ipairs(zone_ids) do
    reg["zone"..zn_id.."control"] = 0
  end
  for i,bl_id in ipairs(p_blower_ids) do
    SETTINGS['Mister'..bl_id..'PosTempSetPoint'] = "100"
    SETTINGS['Mister'..bl_id..'NegTempSetPoint'] = "100"
    for n,zn_id in ipairs(blower_group_zone_ids[bl_id]) do
      SETTINGS["Zone"..zn_id.."RegimeType"] = "pfrp"
    end
    reg["blower"..bl_id.."override"] = 0
    reg["blower"..bl_id.."idletimer"] = 0
    reg["blower"..bl_id.."prerevspeed"] = 0
    reg["blower"..bl_id.."value"] = 0
    io["blower"..bl_id.."run"] = 1
    io["blower"..bl_id.."fault"] = 1
    io["blower"..bl_id.."speed"] = 0
    reg["blower"..bl_id.."direction"] = 0
    io["blower"..bl_id.."revdamper"] = 0
    io["duct"..bl_id.."pospressure"] = 4
    io["duct"..bl_id.."negpressure"] = 10
    io["duct"..bl_id.."pospressure"] = 2
    io["duct"..bl_id.."negpressure"] = 8
    reg["duct"..bl_id.."pressuresp"] = 1
    reg["duct"..bl_id.."pressuresp"] = 1
    reg["duct"..bl_id.."pressureavg"] = 0
    reg["duct"..bl_id.."pospressureavg"] = 4
    reg["duct"..bl_id.."negpressureavg"] = 10
    reg["duct"..bl_id.."pospressureavg"] = 2
    reg["duct"..bl_id.."negpressureavg"] = 8
    reg["duct"..bl_id.."mistertimer"] = 0
    reg["premister"..bl_id.."lvtemp"] = 0
  end
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7run, 0)
  lu.assertEquals(io.blowerP7speed, 0)
  -- if a zone is online
  reg.zone25control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7run, 1)
  lu.assertEquals(io.blowerP7speed, 30.5)
  lu.assertEquals(reg.blowerP7value, 30.5)
  -- if all the zones are online
  reg.zone26control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7run, 1)
  lu.assertEquals(io.blowerP7speed, 30.5)
  lu.assertEquals(reg.blowerP7value, 30.5)
  -- with manual override enabled
  reg.blowerP7override = 1
  reg.blowerP7control = 1
  reg.blowerP7value = 70
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7run, 1)
  lu.assertEquals(io.blowerP7speed, 70)
  reg.blowerP7control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7run, 0)
  -- if there is a fault, the speed is set to 0
  reg.blowerP7override = 0
  io.blowerP7fault = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7speed, 0)
  -- if blower is off and a zone is online, the blower will start
  io.blowerP7fault = 1
  io.blowerP7run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7run, 1)
  lu.assertEquals(io.blowerP7speed, 30.5)
  -- test that number of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.blowerP7direction = 0
  io.blowerP7revdamper = 0
  reg.ductP7pospressuresp = 4
  reg.ductP7negpressuresp = 16
  reg.zone25control = 1
  reg.zone25pAlvtemp = 160
  reg.zone25pBlvtemp = 165
  reg.zone26control = 1
  reg.zone26pAlvtemp = 145
  reg.zone26pBlvtemp = 150
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  reg.blowerP7revtimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 18)
  -- test that negative aeration direction pressure setpoint max is respected
  reg.ductP7negpressuresp = 20
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], tonumber(SETTINGS["NegDirPressureSetpointMax"]))
  -- test that number of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  reg.ductP7negpressuresp = 18
  reg.zone25pAlvtemp = 40
  reg.zone25pBlvtemp = 45
  reg.zone26pAlvtemp = 50
  reg.zone26pBlvtemp = 55
  reg.ductP7presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['ductP7pressuresp'], 16)
  -- test that negative aeration direction pressure setpoint min is respected
  reg.ductP7negpressuresp = 1
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], tonumber(SETTINGS["NegDirPressureSetpointMin"]))
  -- test that ductXpressuresp is not updated after blower direction change while idletimer is greater than 0
  reg.zone25control = 1
  reg.zone25pAlvtemp = 90
  reg.zone25pBlvtemp = 180
  reg.zone26control = 1
  reg.zone26pAlvtemp = 90
  reg.zone26pBlvtemp = 185
  reg.ductP7presssptimer = 0
  reg.blowerP7direction = 0
  reg.blowerP7revtimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7idletimer'], 420)
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 14)
  reg.blowerP7idletimer = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 14)
  -- test that number of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.ductP7pospressuresp = 6
  reg.zone25pAlvtemp = 160
  reg.zone25pBlvtemp = 165
  reg.zone26pAlvtemp = 145
  reg.zone26pBlvtemp = 150
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 8)
  -- test that positive aeration direction pressure setpoint max is respected
  reg.ductP7pospressuresp = 20
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], tonumber(SETTINGS["PosDirPressureSetpointMax"]))
  -- test that number of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  reg.ductP7pospressuresp = 8
  reg.zone25pAlvtemp = 40
  reg.zone25pBlvtemp = 45
  reg.zone26pAlvtemp = 50
  reg.zone26pBlvtemp = 55
  reg.ductP7presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  -- test that positive aeration direction pressure setpoint min is respected
  reg.ductP7pospressuresp = 1
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], tonumber(SETTINGS["PosDirPressureSetpointMin"]))
  -- test that hot zone trigger takes precedence over cold zone trigger
  SETTINGS["PressureSetpointHotZoneTrigger"] = 2
  SETTINGS["PressureSetpointColdZoneTrigger"] = 2
  reg.ductP7pospressuresp = 4
  reg.zone25pAlvtemp = 130
  reg.zone25pBlvtemp = 135
  reg.zone26pAlvtemp = 30
  reg.zone26pBlvtemp = 35
  reg.ductP7presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  -- test that last saved direction pressure setpoints are resumed
  SETTINGS["NegDirPressureSetpointMin"] = 12
  SETTINGS["NegDirPressureSetpointMax"] = 24
  reg.ductP7pospressuresp = 4
  reg.zone25pAlvtemp = 90
  reg.zone25pBlvtemp = 180
  reg.zone26pAlvtemp = 90
  reg.zone26pBlvtemp = 185
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  reg.blowerP7revtimer = 0
  reg.blowerP7direction = 0
  io.blowerP7revdamper = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(reg['blowerP7idletimer'], 420)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  lu.assertEquals(reg['ductP7pospressuresp'], 4)
  lu.assertEquals(reg['ductP7negpressuresp'], 14)
  -- revdamper changes direction to positive
  reg.blowerP7idletimer = 200
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  lu.assertEquals(reg['ductP7pospressuresp'], 4)
  lu.assertEquals(reg['ductP7negpressuresp'], 14)
  -- test that ductXpressuresp increases from last captured value from ductXpospressuresp
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 14)
  reg.zone25pAlvtemp = 110
  reg.zone25pBlvtemp = 90
  reg.zone26pAlvtemp = 120
  reg.zone26pBlvtemp = 95
  reg.ductP7presssptimer = 0
  reg.blowerP7revtimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 14)
  -- revdamper changes direction to negative
  reg.blowerP7idletimer = 200
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 14)
  -- test that ductXpressuresp increases from last captured value from ductXnegpressuresp
  reg.zone25pAlvtemp = 130
  reg.zone25pBlvtemp = 135
  reg.zone26pAlvtemp = 95
  reg.zone26pBlvtemp = 120
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 16)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 16)
  reg.zone25pAlvtemp = 150
  reg.zone25pBlvtemp = 165
  reg.zone26pAlvtemp = 85
  reg.zone26pBlvtemp = 165
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 18)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 18)
  reg.ductP7presssptimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 20)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 20)
  -- revdamper changes direction
  reg.zone25pAlvtemp = 90
  reg.zone25pBlvtemp = 180
  reg.zone26control = 1
  reg.zone26pAlvtemp = 90
  reg.zone26pBlvtemp = 185
  reg.ductP7presssptimer = 0
  reg.blowerP7revtimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(reg['ductP7pressuresp'], 20)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 20)
  reg.blowerP7idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 20)
  lu.assertEquals(reg['ductP7pospressuresp'], 6)
  lu.assertEquals(reg['ductP7negpressuresp'], 20)
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(reg['ductP7pressuresp'], 8)
  lu.assertEquals(reg['ductP7pospressuresp'], 8)
  lu.assertEquals(reg['ductP7negpressuresp'], 20)
  -- test that only online zones are accounted for
  reg.ductP7pospressuresp = 6
  reg.zone25pAlvtemp = 30
  reg.zone25pBlvtemp = 35
  reg.zone26pAlvtemp = 30
  reg.zone26pBlvtemp = 35
  reg.ductP7presssptimer = 0
  reg.zone27control = 0
  reg.zone28control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['ductP7pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  reg.ductP7pressuresp = 6
  reg.zone25pAlvtemp = 30
  reg.zone25pBlvtemp = 35
  reg.zone26pAlvtemp = 30
  reg.zone26pBlvtemp = 35
  reg.ductP7presssptimer = 0
  io.blowerP7run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['ductP7pressuresp'], 6)
  -- test that mister only turns on if blower is running and the blower not idling
  local mister_off = 0
  local mister_on = 1
  io.ductP7mister = mister_off
  reg.blowerP7control = 0
  io.blowerP7run = 0
  reg.blowerP7direction = 1
  reg.premisterP7lvtemp = 75
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_on
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_off)
  io.ductP7mister = mister_off
  reg.blowerP7control = 1
  io.blowerP7run = 1
  reg.blowerP7direction = 1
  reg.premisterP7lvtemp = 105
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_on
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_on)
  -- test that mister turns off if blower is offline
  io.ductP7mister = mister_on
  reg.blowerP7control = 0
  io.blowerP7run = 0
  reg.blowerP7direction = 1
  reg.premisterP7lvtemp = 75
  reg.ductP7misteroverride = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_off)
  -- test that mister turns on when average of the biolfilterXlvtemp values are greater than or equal to MisterXNegTempSetPoint
  io.ductP7mister = mister_off
  reg.blowerP7control = 1
  io.blowerP7run = 1
  reg.blowerP7direction = 0
  io.blowerP7revdamper = 0
  reg.biofilterP7pAlvtemp = 104
  reg.ductP7mistertimer = 0
  updateTempAverages()
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_on)
  -- test that mister stays on when average of the biolfilterXlvtemp values lower to less than MisterXNegTempSetPoint and greater than MisterXNegTempSetPoint
  reg.biofilterP7pAlvtemp = 100
  updateTempAverages()
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_on)
  -- test that mister turns off when average of the biolfilterXlvtemp values are less than or equal to MisterXNegTempSetPoint
  reg.biofilterP7pAlvtemp = 95
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_on
  updateTempAverages()
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_off)
  -- test that mister stays off when average of the biolfilterXlvtemp values raises to less than MisterXNegTempSetPoint and greater than MisterXNegTempSetPoint
  reg.biofilterP7pAlvtemp = 37
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_off)
  -- test that mister turns off when blower direction is changing
  reg.biofilterP7pAlvtemp = 105
  reg.blowerP7direction = 0
  io.ductP7mister = mister_on
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_on)
  reg.biofilterP7pAlvtemp = 45
  reg.blowerP7direction = 1
  reg.blowerP7idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_off)
  reg.biofilterP7pAlvtemp = 45
  reg.premisterP7lvtemp = 55
  reg.blowerP7direction = 1
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_off)
  reg.biofilterP7pAlvtemp = 125
  reg.premisterP7lvtemp = 105
  reg.blowerP7direction = 1
  reg.blowerP7idletimer = 0
  reg.ductP7mistertimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_on)
  -- Test that mister manual override is respected
  reg.ductP7misteroverride = 1
  reg.ductP7mistercontrol = mister_on
  reg.blowerP7idletimer = 0
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_on)
  -- lu.assertEquals(io['ductP8mister'], mister_off)
  reg.ductP7misteroverride = 0
  reg.ductS7misteroverride = 1
  updateBlowers()
  lu.assertEquals(io['ductP7mister'], mister_on)
  -- lu.assertEquals(io['ductP8mister'], mister_off)
  -- test that blower is forced to positive aeration if biofilter temp is greater than BiofilterForcePositiveTemperature
  SETTINGS["BiofilterForcePositiveTemperature"] = 190
  reg.biofilterP7pAlvtemp = 125
  reg.premisterP7lvtemp = 105
  reg.blowerP7direction = 0
  io.blowerP7revdamper = 0
  io.blowerP7run = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(io['blowerP7run'], 1)
  reg.biofilterP7pAlvtemp = 185
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(io['blowerP7run'], 1)
  -- biofilter temp is greater than BiofilterForcePositiveTemperature setpoint and forces positive aeration direction
  reg.biofilterP7pAlvtemp = 191
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(io['blowerP7run'], 0)
  reg.blowerP7idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(io['blowerP7run'], 0)
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 1)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(io['blowerP7run'], 1)
  -- biofilter temp falls under BiofilterForcePositiveTemperature setpoint and resumes normal operation
  reg.biofilterP7pAlvtemp = 189
  reg.zone25pAlvtemp = 165
  reg.zone25pBlvtemp = 80
  reg.zone26pAlvtemp = 165
  reg.zone26pBlvtemp = 85
  reg.blowerP7revtimer = 0
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 1)
  lu.assertEquals(io['blowerP7run'], 0)
  reg.blowerP7idletimer = 100
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(io['blowerP7run'], 0)
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blowerP7direction'], 0)
  lu.assertEquals(io['blowerP7revdamper'], 0)
  lu.assertEquals(io['blowerP7run'], 1)
  -- test secondary blower operation
  -- test that number of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  io.blowerS7run = 1
  io.blowerS7fault = 1
  reg.blowerS7override = 0
  io.ductS7pressure = 10
  reg.ductS7pressureavg = 10
  reg.ductS7pressuresp = 6
  reg.zone25control = 1
  reg.zone26control = 1
  reg.zone27control = 1
  reg.zone28control = 1
  reg.zone25pAlvtemp = 40
  reg.zone26pAlvtemp = 50
  reg.zone27pAlvtemp = 40
  reg.zone28pAlvtemp = 50
  reg.zone25pfrptime = 0
  reg.zone26pfrptime = 0
  reg.zone27pfrptime = 0
  reg.zone28pfrptime = 0
  reg.ductS7presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['blowerS7run'], 1)
  lu.assertEquals(reg['ductS7pressuresp'], 4)
  -- test that pressure setpoint min is respected
  reg.ductS7pressuresp = 4
  reg.ductS7presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['ductS7pressuresp'], tonumber(SETTINGS["PressureSetpointMin"]))
  io.blowerS7run = 1
  io.blowerS7fault = 1
  reg.ductS7pressuresp = 4
  reg.zone25pAlvtemp = 180
  reg.zone26pAlvtemp = 180
  reg.zone27pAlvtemp = 180
  reg.zone28pAlvtemp = 180
  reg.ductS7presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['blowerS7run'], 1)
  lu.assertEquals(reg['ductS7pressuresp'], 6)
end

function TestWebmacsScripts:test_blower_direction_control()
  initSequence()
  reg.zone25control = 1
  reg.zone26control = 1
  for i,bl_id in ipairs(p_blower_ids) do
    SETTINGS['Mister'..bl_id..'PosTempSetPoint'] = "100"
    SETTINGS['Mister'..bl_id..'NegTempSetPoint'] = "100"
    for n,zn_id in ipairs(blower_group_zone_ids[bl_id]) do
      SETTINGS["Zone"..zn_id.."RegimeType"] = "pfrp"
    end
    reg["blower"..bl_id.."override"] = 0
    reg["blower"..bl_id.."value"] = 0
    io["blower"..bl_id.."run"] = 1
    io["blower"..bl_id.."fault"] = 1
    io["blower"..bl_id.."speed"] = 0
    io["duct"..bl_id.."pospressure"] = 4
    io["duct"..bl_id.."negpressure"] = 10
    io["duct"..bl_id.."pospressure"] = 2
    io["duct"..bl_id.."negpressure"] = 8
    reg["duct"..bl_id.."pressuresp"] = 0
    reg["duct"..bl_id.."pressuresp"] = 0
    reg["duct"..bl_id.."pressureavg"] = 0
    reg["duct"..bl_id.."pospressureavg"] = 4
    reg["duct"..bl_id.."negpressureavg"] = 10
    reg["duct"..bl_id.."pospressureavg"] = 2
    reg["duct"..bl_id.."negpressureavg"] = 8
    reg["premister"..bl_id.."lvtemp"] = 0
  end
  reg.blowerP7control = 1
  io.blowerP7run = 1
  reg.blowerP7override = 0
  io.blowerP7fault = 1
  io.blowerP7revdamper = 0
  io.blowerP7speed = 37.5
  reg.blowerP7idletimer = 200
  updateDuctPressureAverages()
  updateBlowers()
  -- test that correct pressure sensor value is used based on blower direction
  reg.blowerP7direction = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.ductP7pressureavg, io.ductP7pospressure)
  lu.assertEquals(io.blowerP7revdamper, 1)
  reg.blowerP7direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.ductP7pressureavg, io.ductP7negpressure)
  lu.assertEquals(io.blowerP7revdamper, 1)
  -- test that when positive blower direction and top sensors avg less than neg direction setpoint, direction is not changed
  reg.blowerP7direction = 1
  reg.blowerP7idletimer = 0
  reg.blowerP7revtimer = 0
  reg.blowerP7revlogic = 0
  reg.zone25pAlvtemp = 90
  reg.zone26pAlvtemp = 80
  reg.zone25pBlvtemp = 160
  reg.zone26pBlvtemp = 150
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blowerP7direction, 1)
  lu.assertEquals(io.blowerP7revdamper, 1)
  -- test that when positive blower direction and top sensors avg greater than neg direction setpoint, direction is changed
  reg.blowerP7direction = 1
  reg.blowerP7idletimer = 0
  reg.blowerP7revtimer = 0
  reg.zone25pAlvtemp = 160
  reg.zone26pAlvtemp = 150
  reg.zone25pBlvtemp = 90
  reg.zone26pBlvtemp = 80
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blowerP7direction, 0)
  -- test that when negative blower direction and bottom sensors avg less than pos direction setpoint, direction is not changed
  reg.blowerP7direction = 0
  reg.blowerP7idletimer = 0
  reg.blowerP7revtimer = 0
  reg.zone25pAlvtemp = 160
  reg.zone26pAlvtemp = 150
  reg.zone25pBlvtemp = 90
  reg.zone26pBlvtemp = 80
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blowerP7direction, 0)
  -- test that when negative blower direction and bottom sensors avg greater than pos direction setpoint, direction is changed
  reg.blowerP7direction = 0
  reg.blowerP7idletimer = 0
  reg.blowerP7revtimer = 0
  reg.zone25pAlvtemp = 160
  reg.zone26pAlvtemp = 150
  reg.zone25pBlvtemp = 180
  reg.zone26pBlvtemp = 170
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blowerP7direction, 1)
  -- test that blower goes to min speed while idle timer is running
  -- with temp average less than setpoint
  lu.assertEquals(io.blowerP7run, 0)
  lu.assertEquals(io.blowerP7speed, 25)
  -- with temp average greater than setpoint
  reg.zone25pBlvtemp = 160
  reg.zone26pBlvtemp = 150
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7run, 0)
  lu.assertEquals(io.blowerP7speed, 25)
  -- test that output is set to correct direction when idle timer is halfway complete
  io.blowerP7revdamper = 0
  reg.blowerP7direction = 1
  reg.blowerP7idletimer = 110
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7revdamper, 1)
  lu.assertEquals(reg.blowerP7direction, 1)
  lu.assertEquals(io.blowerP7run, 0)
  lu.assertEquals(io.blowerP7speed, 25)
  -- test that normal blower speed resumes when idle timer is complete
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blowerP7revdamper, 1)
  lu.assertEquals(reg.blowerP7direction, 1)
  lu.assertEquals(io.blowerP7speed, 35.5)
  -- test that rev override forces desired direction
  -- with temp average less than setpoint
  reg.zone25pAlvtemp = 50
  reg.zone26pAlvtemp = 40
  io.blowerP7revdamper = 0
  reg.blowerP7direction = 1
  reg.blowerP7revoverride = 1
  reg.blowerP7idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg.blowerP7direction, 1)
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
  updateDamperPIDValues(DAMPER_S7A, 95, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_S7A['control'], 44.85)
  updateDamperPIDValues(DAMPER_S7A, 95, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_S7A['control'], 15)
  -- warm exhaust temps result in increasing damper position
  updateDamperPIDValues(DAMPER_S7A, 105, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_S7A['control'], 70.3)
  updateDamperPIDValues(DAMPER_S7A, 105, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_S7A['control'], 100)
  -- decreasing temps result in decreasing damper position
  updateDamperPIDValues(DAMPER_S7A, 98, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(math.floor(DAMPER_S7A['control']), 77)
  updateDamperPIDValues(DAMPER_S7A, 98, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_S7A['control'], 58)
end

function TestWebmacsScripts:test_update_dampers()
  initSequence()
  SETTINGS["MinDamperValue"] = "15"
  SETTINGS["Regime1TempSetPoint"] = "135"
  SETTINGS["Regime2TempSetPoint"] = "135"
  SETTINGS["Regime3TempSetPoint"] = "135"
  SETTINGS["PrimaryPadTempSetPoint"] = "135"
  for i, zone_id in pairs(zone_ids) do
    zone_prefix = 'zone'..zone_id
    reg[zone_prefix..'pfrptime'] = 0
  end
  for i, zone_id in pairs(zone_ids) do
    damper_id = zone_damper_ids[zone_id]
    damper_prefix = 'damper'..damper_id
    zone_prefix = 'zone'..zone_id
    reg[zone_prefix..'control'] = 1
    reg[damper_prefix..'override'] = 0
    reg[zone_prefix..'pAlvtemp'] = 125
    reg[zone_prefix..'pBlvtemp'] = 135
    reg[zone_prefix..'pfrptime'] = 0
    if string.sub(damper_id,1,1) == 'S' then
      reg[zone_prefix..'pAlvtemp'] = 130
      reg[zone_prefix..'pBlvtemp'] = 0
      if zone_id ~= '10' and zone_id ~= '14' and zone_id ~= '24' then
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 59.15)
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 22.22)
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
       lu.assertEquals(io[damper_prefix..'position'], 15)
       reg[zone_prefix..'pAlvtemp'] = 140
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 55.96)
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 92.78)
       reg[zone_prefix..'control'] = 0
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 0)
       reg[zone_prefix..'control'] = 1
       reg[damper_prefix..'override'] = 1
       reg[damper_prefix..'value'] = 80
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
       -- when zone is offline and damper override is on, manual damper position is respected
       reg[zone_prefix..'control'] = 0
       updateDampers()
       lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
     end
    else
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 59.15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 22.22)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 15)
      lu.assertEquals(io[damper_prefix..'position'], 15)
      reg[zone_prefix..'pAlvtemp'] = 135
      reg[zone_prefix..'pBlvtemp'] = 145
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 55.96)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 92.78)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 0)
      reg[zone_prefix..'control'] = 1
      reg[damper_prefix..'override'] = 1
      reg[damper_prefix..'value'] = 80
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
      reg[zone_prefix..'control'] = 0
      -- when zone is offline and damper override is on, manual damper position is respected
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damper_id]['control'], 80)
    end
  end
end

function TestWebmacsScripts:test_zone_controls()
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'value'] = 100
    reg['duct'..blower_id..'pressureavg'] = 8
    if string.sub(blower_id,1,1) == 'P' then
      io['blower'..blower_id..'revdamper'] = 1
      reg['biofilter'..blower_id..'avgtemp'] = 135
      reg['exhaust'..blower_id..'avgtemp'] = 123
    end
    updateBlowerStartup(_G['BLOWER_'..blower_id], blower_id)
  end
  for i, zone_id in pairs(zone_ids) do
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'regime'] = 0
    reg['zone'..zone_id..'reset'] = 0
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time, Capped \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time, Capped \n")
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 135
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'avgdamper'] = 45
    reg['zone'..zone_id..'pfrptime'] = 360
    reg['zone'..zone_id..'capped'] = 0
    updateZones()
    if string.sub(zone_labels[zone_id],1,1) == 'P' then
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time, Capped \n01/01/2017 12:00:00, "..zone_labels[zone_id]..", 128, 135, 45, 1, 10, 100, 135, 123, 360, No".."\n")
    else
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature, Exhaust Temperature, PFRP Time, Capped \n01/01/2017 12:00:00, "..zone_labels[zone_id]..", 128, 135, 45, 1, 10, 100, 0, 0, 360, No".."\n")
    end
    lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
    -- if all system is reset, zone values are loaded from db
    _G['ZONE_'..zone_id]["file_name"] = ""
    reg['zone'..zone_id..'control'] = 0
    initSequence()
    lu.assertEquals(reg['zone'..zone_id..'control'], 1)
    lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    -- if move to zone is requested, moves batch to new zone
    local target_zone = '25'
    if zone_id == target_zone then
      reg['zone'..zone_id..'moveto'] = 26
      target_zone = '26'
    else
      reg['zone'..zone_id..'moveto'] = 25
    end
    reg['zone'..target_zone..'control'] = 0
    reg['zone'..target_zone..'regime'] = 0
    _G['ZONE_'..target_zone]["file_name"] = ''
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '')
    lu.assertEquals(reg['zone'..target_zone..'regime'], 1)
    lu.assertEquals(_G['ZONE_'..target_zone]["file_name"], '01_01_2017_120000_newbatchname.csv')
    -- if close batch is requested
    reg['zone'..target_zone..'moveto'] = -1
    updateZones()
    lu.assertEquals(_G['ZONE_'..target_zone]["file_name"], '')
  end
end

function TestWebmacsScripts:test_zone_regimes()
  initSequence()
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'value'] = 100
    reg['duct'..blower_id..'pressureavg'] = 8
    if string.sub(blower_id,1,1) == 'P' then
      io['blower'..blower_id..'revdamper'] = 1
      reg['biofilter'..blower_id..'avgtemp'] = 135
      reg['exhaust'..blower_id..'avgtemp'] = 123
    end
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
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 2)
    reg['zone'..zone_id..'pfrptime'] = 4260
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 2)
    reg['zone'..zone_id..'pfrptime'] = 4320
    updateZones()
    lu.assertEquals(reg['zone'..zone_id..'regime'], 3)
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
    reg["zone"..zone_id.."pBavgtemp"] = 130
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
    if zone_labels then
      lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone " .. zone_labels[zone_id] .. "!")
    else
      lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone " .. zone_id .. "!")
    end
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
          if string.sub(zone_labels[zn_id],1,1) == 'P' then
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
end

function TestWebmacsScripts:test_batch_moving()
  initSequence()
  if #zone_ids >= 2 then
    -- with empty filename, creates new filename
    reg['zone25control'] = 1
    reg['zone26control'] = 0
    reg['zone25reset'] = 0
    reg['zone26reset'] = 0
    if has_regimes == true then
      reg['zone25regime'] = 0
      reg['zone25regtimer'] = 0
      reg['zone26regime'] = 0
      reg['zone26regtimer'] = 0
    end
    _G['ZONE_25']["file_name"] = ""
    _G['ZONE_26']["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle ('25', 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_25']["file_name"], '01_01_2017_120000_newbatchname.csv')
    -- simulate move batch
    reg['zone25moveto'] = 26
    reg['zone26movedfrom'] = 25
    reg['zone26reset'] = 1
    updateZones()
    lu.assertEquals(_G['ZONE_25']["file_name"], '')
    lu.assertEquals(reg['zone25control'], 0)
    lu.assertEquals(reg['zone25moveto'], 0)
    lu.assertEquals(_G['ZONE_26']["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(reg['zone26control'], 0)
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

function TestWebmacsScripts:test_save_blower_speed()
  initSequence()
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'prerevspeed'] = 0
    reg['blower'..blower_id..'value'] = 75
    reg['blower'..blower_id..'override'] = 1
    lu.assertEquals(reg['blower'..blower_id..'prerevspeed'],0)
    -- save blower speed as blowerXprerevspeed
    saveBlwrSpeed('blower'..blower_id)
    lu.assertEquals(reg['blower'..blower_id..'prerevspeed'],75)
  end
end

function TestWebmacsScripts:test_log_insert()
  initSequence()
  local tmp = {}
  local res = logInsert(tmp,"Yes")
  lu.assertEquals(tmp[1],"Yes")
  tmp = {}
  res = logInsert(tmp,"No")
  lu.assertEquals(tmp[1],"No")
  tmp = {}
  res = logInsert(tmp,33)
  lu.assertEquals(tmp[1],33)
  -- negative values or nan values are logged as 0
  tmp = {}
  res = logInsert(tmp,-33)
  lu.assertEquals(tmp[1],0)
  tmp = {}
  res = logInsert(tmp,"nan")
  lu.assertEquals(tmp[1],0)
  -- simulate nan val returned from x600
  local v = 0/0
  res = logInsert(tmp,v)
  lu.assertEquals(tmp[1],0)
end

function TestWebmacsScripts:test_update_misters()
  initSequence()
  local mister_on = 1
  local mister_off = 0
  -- when blower is running, idle cycle complete, and mister override is on,
  -- mister should be on/off based on mistercontrol value
  io.blowerP7run = 1
  reg.blowerP7direction = 1
  io.blowerP7revdamper = 1
  reg.blowerP7idletimer = 0
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_on
  reg.premisterP7lvtemp = 90
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_off)
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 1
  reg.ductP7mistercontrol = mister_on
  reg.premisterP7lvtemp = 90
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_on)
  -- when blower is not running, mister should be off
  io.blowerP7run = 0
  reg.blowerP7idletimer = 0
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 1
  reg.ductP7mistercontrol = mister_off
  reg.premisterP7lvtemp = 90
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_off)
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 1
  reg.ductP7mistercontrol = mister_on
  reg.premisterP7lvtemp = 90
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_off)
  -- when blower is running and in idle cycle, mister should be off
  io.blowerP7run = 1
  reg.blowerP7idletimer = 100
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 1
  reg.ductP7mistercontrol = mister_off
  reg.premisterP7lvtemp = 90
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_off)
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 1
  reg.ductP7mistercontrol = mister_on
  reg.premisterP7lvtemp = 90
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_off)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in positive, and premister temp is less than setpoint
  -- mister is off
  io.blowerP7run = 1
  reg.blowerP7idletimer = 0
  reg.blowerP7direction = 1
  io.blowerP7revdamper = 1
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_off
  reg.premisterP7lvtemp = 99
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_off)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in positive, and premister temp is at or above the setpoint
  -- mister is on
  io.blowerP7run = 1
  reg.blowerP7idletimer = 0
  reg.blowerP7direction = 1
  io.blowerP7revdamper = 1
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_off
  reg.premisterP7lvtemp = 100
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_on)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in negative, and biofilter temp avg is below the setpoint
  -- mister is off
  io.blowerP7run = 1
  reg.blowerP7idletimer = 0
  reg.blowerP7direction = 0
  io.blowerP7revdamper = 0
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_off
  reg.premisterP7lvtemp = 100
  reg.biofilterP7pAlvtemp = 94
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_off)
  -- when blower is running, idle cycle complete, mister override is off,
  -- blower direction is in negative, and biofilter temp avg is at or above the setpoint
  -- mister is on
  io.blowerP7run = 1
  reg.blowerP7idletimer = 0
  reg.blowerP7direction = 0
  io.blowerP7revdamper = 0
  reg.ductP7mistertimer = 0
  reg.ductP7misteroverride = 0
  reg.ductP7mistercontrol = mister_off
  reg.premisterP7lvtemp = 100
  reg.biofilterP7pAlvtemp = 95
  updateMisters(p_blower_ids,biofilter_probe_ids)
  lu.assertEquals(io['ductP7mister'],mister_on)
end

function TestWebmacsScripts:test_uid_func()
  local ids = {}
  ids = uid(1)
  lu.assertEquals(#ids,1)
  lu.assertEquals(ids[1],'01')
  ids = uid(3)
  lu.assertEquals(#ids,3)
  lu.assertEquals(ids[1],'01')
  lu.assertEquals(ids[2],'02')
  lu.assertEquals(ids[3],'03')
  ids = uid(9,12)
  lu.assertEquals(#ids,4)
  lu.assertEquals(ids[1],'09')
  lu.assertEquals(ids[2],'10')
  lu.assertEquals(ids[3],'11')
  lu.assertEquals(ids[4],'12')
  ids = uid(8,11,'P')
  lu.assertEquals(#ids,4)
  lu.assertEquals(ids[1],'P8')
  lu.assertEquals(ids[2],'P9')
  lu.assertEquals(ids[3],'P10')
  lu.assertEquals(ids[4],'P11')
end

function TestWebmacsScripts:test_misterValue_func()
  -- handles reverse value for "NC" relays
  SETTINGS['MisterRelayType'] = 'NC'
  local input_val = 0
  local output_val = 0
  output_val = misterValue(input_val)
  lu.assertEquals(output_val, 1)
  input_val = 1
  output_val = misterValue(input_val)
  lu.assertEquals(output_val, 0)
  -- handles value for relays that are not "NC"
  SETTINGS['MisterRelayType'] = 'NO'
  input_val = 0
  output_val = misterValue(input_val)
  lu.assertEquals(output_val, 0)
  input_val = 1
  output_val = misterValue(input_val)
  lu.assertEquals(output_val, 1)
  SETTINGS['MisterRelayType'] = ''
  input_val = 0
  output_val = misterValue(input_val)
  lu.assertEquals(output_val, 0)
  input_val = 1
  output_val = misterValue(input_val)
  lu.assertEquals(output_val, 1)
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
