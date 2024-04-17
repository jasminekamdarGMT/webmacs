local lu = require('luaunit')

blower_ids = {'01'}
damper_ids = {'P1A','P1B','P2A','P2B','P3A','P3B','P4A','P4B','S1A','S1B'}
zone_labels = {
  ['01'] = 'P1',
  ['02'] = 'P2',
  ['03'] = 'P3',
  ['04'] = 'P4',
  ['05'] = 'S1',
}
zone_ids = {'01','02','03','04','05'}
zone_probe_ids = {'A','B','C','D'}
biofilter_probe_ids = {'A','B','C','D'}
facilities_dir = 'facilities/'
facility_type = 'a_damper_reversing/'
facility_path = facilities_dir..facility_type
facility_name = "edama"

luatest_running = true
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require(facility_path..'x600m/scripts/test_helpers')
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

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
  for i, blower_id in pairs(blower_ids) do
    reg['exhaust'..blower_id..'lvtemp'] = 45
  end
end

function initializeRegisters()
  local reg = {}
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'direction'] = 0
    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revoverride'] = 0
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
      reg['zone'..zone_id..'pBavgtemp'] = 0
      reg['zone'..zone_id..'pCavgtemp'] = 0
      reg['zone'..zone_id..'pDavgtemp'] = 0
      reg['zone'..zone_id..'pAlvtemp'] = 0
      reg['zone'..zone_id..'pBlvtemp'] = 0
      reg['zone'..zone_id..'pClvtemp'] = 0
      reg['zone'..zone_id..'pDlvtemp'] = 0
    end
  end
  if appendFacilityReg ~= nil then
    appendFacilityReg(reg)
  end
  return reg
end

TestWebmacsScripts = {}
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

function TestWebmacsScripts:test_update_last_valid_temps()
  SETTINGS["Zone02ProbeBPointID"] = "0000000050B04AE3_1"
  updateLastValidTemps()
  lu.assertEquals(reg.zone02pBlvtemp, 70.9)
  -- sensor id is not in data
  SETTINGS["Zone02ProbeBPointID"] = "0000000040B0FFFF_2"
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  updateLastValidTemps()
  lu.assertEquals(reg.zone02pBlvtemp, 70.9)
  -- after 50th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone02ProbeBPointID"] = 50
  updateLastValidTemps()
  lu.assertEquals(reg.zone02pBlvtemp, 70.9)
  lu.assertEquals(reg.zone02pBtempage, 600)
  -- after 100th failure, temp age goes to sensor age alarm time
  WIRELESS_POINT_FAILURES["Zone02ProbeBPointID"] = 100
  updateLastValidTemps()
  lu.assertEquals(reg.zone02pBlvtemp, 70.9)
  lu.assertEquals(reg.zone02pBtempage, 65535)
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

function TestWebmacsScripts:test_update_temp_averages()
  initSequence()
  first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
  for k, value in pairs(first_10_values) do
    reg.zone04pAlvtemp = value
    updateTempAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['zone04pAavgtemp'], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
  lu.assertEquals(reg['zone04pAavgtemp'], 110)
  --after 10 values, it starts rotating the table
  reg.zone04pAlvtemp = 80
  updateTempAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone04pAavgtemp'], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
  lu.assertEquals(reg['zone04pAavgtemp'], 106)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['zone04pAavgtemp'] = {}
  reg.zone04pAlvtemp = 80
  updateTempAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone04pAavgtemp'], {80})
  lu.assertEquals(reg.zone04pAavgtemp, 80)
end

function TestWebmacsScripts:test_update_damper_averages()
  initSequence()
  SETTINGS["DataLoggingRate"] = 50
  reg.blower01revdamper = 0
  reg.zone02control = 1
  first_10_values = {10, 30, 50, 70, 90, 100, 80, 60, 20, 0}
  for k, value in pairs(first_10_values) do
    io.damperP2Aposition = value
    io.damperP2Bposition = 0
    reg.zone02avgtimer = 0
    updateDamperAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['zone02avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
  lu.assertEquals(reg['zone02avgdamper'], 51)
  lu.assertEquals(reg['zone02avgtimer'], 300)
  -- if zone is offline or timer is not complete, does nothing
  io.damperP2Aposition = 80
  io.damperP2Bposition = 0
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
  io.damperP2Aposition = 80
  io.damperP2Bposition = 0
  reg.zone02avgtimer = 0
  updateDamperAverages()
  lu.assertEquals(AVERAGE_ARRAYS['zone02avgdamper'], {80})
  lu.assertEquals(reg.zone02avgdamper, 80)
  initSequence()
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
  reg.zone04pBlvtemp = 125
  local avg = tempAvgForZones({'04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 120)
  -- ignores disconnected probe
  reg.zone04pBlvtemp = nil
  avg = tempAvgForZones({'04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 115)
  -- ignores lv temp out of range
  reg.zone04pBlvtemp = -10
  avg = tempAvgForZones({'04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 115)
  -- returns zero for zone offline
  reg.zone04control = 0
  avg = tempAvgForZones({'04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 0)
end

function TestWebmacsScripts:test_max_temp_average_for_zones()
  reg.zone03control = 1
  reg.zone03pAlvtemp = 115
  reg.zone03pBlvtemp = 125
  reg.zone04control = 1
  reg.zone04pAlvtemp = 135
  reg.zone04pBlvtemp = 145
  local avg = maxtempAvgForZones({'03','04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 140)
  -- if a zone is offline, it is not included in average
  reg.zone04control = 0
  avg = maxtempAvgForZones({'03','04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 120)
  reg.zone03control = 0
  reg.zone04control = 1
  avg = maxtempAvgForZones({'03','04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 140)
  -- if both zones are offline, the return value is 0
  reg.zone03control = 0
  reg.zone04control = 0
  avg = maxtempAvgForZones({'03','04'}, {'A','B','C','D'})
  lu.assertEquals(avg, 0)
end

function TestWebmacsScripts:test_update_blowers()
  initSequence()
  SETTINGS["PressureSetpointHotZoneTrigger"] = 50
  SETTINGS["PressureSetpointColdZoneTrigger"] = 50
  SETTINGS['MisterOnTime'] = 10
  SETTINGS['MisterOffTime'] = 30
  SETTINGS['Regime1TempSetPoint'] = 100
  SETTINGS['Regime2TempSetPoint'] = 100
  SETTINGS['Regime3TempSetPoint'] = 100
  SETTINGS['Blower01PosDirectionTempSetPoint'] = 100
  SETTINGS['Blower01NegDirectionTempSetPoint'] = 100
  -- with all zones offline, blower is turned off
  reg.blower01revlogic = 0
  reg.premister01lvtemp = 75
  reg.biofilter01pAlvtemp = 65
  reg.biofilter01pBlvtemp = 65
  reg.biofilter01pClvtemp = 65
  reg.biofilter01pDlvtemp = 65
  reg.zone01control = 0
  reg.zone02control = 0
  reg.zone03control = 0
  reg.zone04control = 0
  reg.zone05control = 0
  reg.blower01direction = 1
  reg.blower01override = 0
  io.blower01run = 1
  io.blower01fault = 1
  io.blower01speed = 0
  reg.blower01prerevspeed = 0
  reg.blower01revdamper = 1
  io.duct01pospressure = 4
  io.duct01negpressure = 10
  reg.duct01pressuresp = 1
  reg.duct01pressureavg = 0
  reg.duct01pospressureavg = 4
  reg.duct01negpressureavg = 10
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 0)
  lu.assertEquals(io.blower01speed, 0)
  -- if a zone is online
  reg.zone01control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 34.5)
  lu.assertEquals(reg.blower01value, 34.5)
  -- if all the zones are online
  reg.zone02control = 1
  reg.zone03control = 1
  reg.zone04control = 1
  reg.zone05control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower01run, 1)
  lu.assertEquals(io.blower01speed, 34.5)
  lu.assertEquals(reg.blower01value, 34.5)
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
  lu.assertEquals(io.blower01speed, 34.5)

  -- test that percentage of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.duct01pospressuresp = 6
  reg.zone01regime = 1
  reg.zone02regime = 1
  reg.zone03regime = 1
  reg.zone04regime = 1
  reg.zone05regime = 1
  reg.zone03control = 0
  reg.zone04control = 0
  reg.zone05control = 0
  reg.zone01pAlvtemp = 160
  reg.zone01pBlvtemp = 165
  reg.zone01pClvtemp = 160
  reg.zone01pDlvtemp = 165
  reg.zone02pAlvtemp = 145
  reg.zone02pBlvtemp = 150
  reg.zone02pClvtemp = 145
  reg.zone02pDlvtemp = 150
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  -- test that positive aeration direction pressure setpoint max is respected
  reg.duct01pospressuresp = 20
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], tonumber(SETTINGS["PosDirPressureSetpointMax"]))
  -- test that percentage of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  reg.duct01pospressuresp = 8
  reg.zone01pAlvtemp = 40
  reg.zone01pBlvtemp = 45
  reg.zone01pClvtemp = 40
  reg.zone01pDlvtemp = 45
  reg.zone02pAlvtemp = 50
  reg.zone02pBlvtemp = 55
  reg.zone02pClvtemp = 50
  reg.zone02pDlvtemp = 55
  reg.duct01presssptimer = 0
  reg.blower01direction = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that positive aeration direction pressure setpoint min is respected
  reg.duct01pospressuresp = 1
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], tonumber(SETTINGS["PosDirPressureSetpointMin"]))
  -- test that hot zone trigger takes precedence over cold zone trigger
  SETTINGS["PressureSetpointHotZoneTrigger"] = 50
  SETTINGS["PressureSetpointColdZoneTrigger"] = 50
  reg.duct01pospressuresp = 4
  reg.zone01pAlvtemp = 130
  reg.zone01pBlvtemp = 135
  reg.zone01pClvtemp = 130
  reg.zone01pDlvtemp = 135
  reg.zone02pAlvtemp = 30
  reg.zone02pBlvtemp = 35
  reg.zone02pClvtemp = 30
  reg.zone02pDlvtemp = 35
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that ductXpressuresp increases from last captured value from ductXpospressuresp
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 6)
  lu.assertEquals(reg['duct01pospressuresp'], 6)
  reg.zone01pAlvtemp = 105
  reg.zone01pBlvtemp = 110
  reg.zone02pAlvtemp = 110
  reg.zone02pBlvtemp = 120
  reg.duct01presssptimer = 0
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  -- test aeration direction reverses to negative
  reg.zone01pAlvtemp = 105
  reg.zone01pBlvtemp = 95
  reg.zone01pClvtemp = 105
  reg.zone01pDlvtemp = 95
  reg.zone02pAlvtemp = 115
  reg.zone02pBlvtemp = 90
  reg.zone02pClvtemp = 115
  reg.zone02pDlvtemp = 90
  reg['damperP1Aoverride'] = 0
  reg['damperP1Avalue'] = 0
  io['damperP1Aposition'] = 0
  reg['damperP1Boverride'] = 0
  reg['damperP1Bvalue'] = 50
  io['damperP1Bposition'] = 50
  io['duct01inletdamper'] = 100
  io['exhaust01damper'] = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],0)
  lu.assertEquals(io['damperP1Aposition'],0)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],50)
  lu.assertEquals(io['duct01inletdamper'],100)
  lu.assertEquals(io['exhaust01damper'],0)
  -- reverses when revtimer completes and copies lower damper values to the upper dampers
  reg.blower01revtimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],0)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],50)
  lu.assertEquals(io['duct01inletdamper'],100)
  lu.assertEquals(io['exhaust01damper'],0)
  -- revdamper reverses and upper dampers are now controlled
  reg.blower01idletimer = 30
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(reg['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],100)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],0)
  lu.assertEquals(io['damperP1Bposition'],0)
  lu.assertEquals(io['duct01inletdamper'],0)
  lu.assertEquals(io['exhaust01damper'],100)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(reg['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],100)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],0)
  lu.assertEquals(io['damperP1Bposition'],0)
  lu.assertEquals(io['duct01inletdamper'],0)
  lu.assertEquals(io['exhaust01damper'],100)
  -- test aeration direction reverses to positive
  reg.zone01pAlvtemp = 95
  reg.zone01pBlvtemp = 105
  reg.zone01pClvtemp = 95
  reg.zone01pDlvtemp = 105
  reg.zone02pAlvtemp = 90
  reg.zone02pBlvtemp = 115
  reg.zone02pClvtemp = 90
  reg.zone02pDlvtemp = 115
  reg['damperP1Aoverride'] = 0
  reg['damperP1Avalue'] = 50
  io['damperP1Aposition'] = 100
  reg['damperP1Boverride'] = 0
  reg['damperP1Bvalue'] = 0
  io['damperP1Bposition'] = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(reg['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],100)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],0)
  lu.assertEquals(io['damperP1Bposition'],0)
  lu.assertEquals(io['duct01inletdamper'],0)
  lu.assertEquals(io['exhaust01damper'],100)
  -- reverses when revtimer completes and copies upper damper values to the lower dampers
  reg.blower01revtimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],100)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],0)
  lu.assertEquals(io['duct01inletdamper'],0)
  lu.assertEquals(io['exhaust01damper'],100)
  -- revdamper reverses and lower dampers are now controlled
  reg.blower01idletimer = 30
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],0)
  lu.assertEquals(io['damperP1Aposition'],0)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],100)
  lu.assertEquals(io['duct01inletdamper'],100)
  lu.assertEquals(io['exhaust01damper'],0)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],0)
  lu.assertEquals(io['damperP1Aposition'],0)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],100)
  lu.assertEquals(io['duct01inletdamper'],100)
  lu.assertEquals(io['exhaust01damper'],0)
  -- reverses when revoverride is on and copies lower damper values to the upper dampers
  reg.blower01revoverride = 1
  reg.blower01direction = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],0)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],100)
  lu.assertEquals(io['duct01inletdamper'],100)
  lu.assertEquals(io['exhaust01damper'],0)
  -- revdamper reverses and upper dampers are now controlled
  reg.blower01idletimer = 30
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(reg['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],100)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],0)
  lu.assertEquals(io['damperP1Bposition'],0)
  lu.assertEquals(io['duct01inletdamper'],0)
  lu.assertEquals(io['exhaust01damper'],100)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 0)
  lu.assertEquals(reg['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],0)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],100)
  lu.assertEquals(reg['damperP1Boverride'],0)
  lu.assertEquals(reg['damperP1Bvalue'],0)
  lu.assertEquals(io['damperP1Bposition'],0)
  lu.assertEquals(io['duct01inletdamper'],0)
  lu.assertEquals(io['exhaust01damper'],100)
  -- reverses when revoverride is on and copies upper damper values to the lower dampers
  reg.blower01revoverride = 1
  reg.blower01direction = 1
  reg['damperP1Aoverride'] = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 0)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],1)
  lu.assertEquals(reg['damperP1Avalue'],50)
  lu.assertEquals(io['damperP1Aposition'],100)
  lu.assertEquals(reg['damperP1Boverride'],1)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],0)
  lu.assertEquals(io['duct01inletdamper'],0)
  lu.assertEquals(io['exhaust01damper'],100)
  -- revdamper reverses and lower dampers are now controlled
  reg.blower01idletimer = 30
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],1)
  lu.assertEquals(reg['damperP1Avalue'],0)
  lu.assertEquals(io['damperP1Aposition'],0)
  lu.assertEquals(reg['damperP1Boverride'],1)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],50)
  lu.assertEquals(io['duct01inletdamper'],100)
  lu.assertEquals(io['exhaust01damper'],0)
  reg.blower01idletimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['blower01direction'], 1)
  lu.assertEquals(reg['blower01revdamper'], 1)
  lu.assertEquals(reg['duct01pressuresp'], 8)
  lu.assertEquals(reg['duct01pospressuresp'], 8)
  lu.assertEquals(reg['damperP1Aoverride'],1)
  lu.assertEquals(reg['damperP1Avalue'],0)
  lu.assertEquals(io['damperP1Aposition'],0)
  lu.assertEquals(reg['damperP1Boverride'],1)
  lu.assertEquals(reg['damperP1Bvalue'],50)
  lu.assertEquals(io['damperP1Bposition'],50)
  lu.assertEquals(io['duct01inletdamper'],100)
  lu.assertEquals(io['exhaust01damper'],0)
  -- test that only online zones are accounted for
  reg.duct01pospressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone01pBlvtemp = 35
  reg.zone02pAlvtemp = 30
  reg.zone02pBlvtemp = 35
  reg.duct01presssptimer = 0
  reg.zone03control = 0
  reg.zone04control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 30
  reg.zone01pBlvtemp = 35
  reg.zone02pAlvtemp = 30
  reg.zone02pBlvtemp = 35
  reg.duct01presssptimer = 0
  io.blower01run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that mister only turns on if blower is online
  reg.duct01mistertimer = 0
  io.duct01mister = 0
  reg.blower01control = 0
  reg.blower01run = 0
  reg.blower01direction = 1
  reg.premister01lvtemp = 75
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
  io.duct01mister = 0
  reg.blower01control = 1
  reg.blower01run = 1
  reg.blower01direction = 1
  reg.premister01lvtemp = 105
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 1)
  -- test that mister turns off if blower is offline
  io.duct01mister = 1
  reg.blower01control = 0
  reg.blower01run = 0
  reg.blower01direction = 1
  reg.premister01lvtemp = 75
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io['duct01mister'], 0)
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
  updateDamperPIDValues(DAMPER_P2A, 95, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_P2A['control'], 44.85)
  updateDamperPIDValues(DAMPER_P2A, 95, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_P2A['control'], 15)
  -- warm exhaust temps result in increasing damper position
  updateDamperPIDValues(DAMPER_P2A, 105, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_P2A['control'], 70.3)
  updateDamperPIDValues(DAMPER_P2A, 105, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_P2A['control'], 100)
  -- decreasing temps result in decreasing damper position
  updateDamperPIDValues(DAMPER_P2A, 98, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(math.floor(DAMPER_P2A['control']), 77)
  updateDamperPIDValues(DAMPER_P2A, 98, SETTINGS['DamperTempSetPoint'])
  lu.assertEquals(DAMPER_P2A['control'], 58)
end

function TestWebmacsScripts:test_update_dampers()
  initSequence()
  SETTINGS["MinDamperValue"] = "15"
  SETTINGS["Regime1TempSetPoint"] = "135"
  SETTINGS["Regime2TempSetPoint"] = "135"
  SETTINGS["Regime3TempSetPoint"] = "135"
  SETTINGS["Zone".."01".."RegimeType"] = "pfrp"
  SETTINGS["Zone".."02".."RegimeType"] = "pfrp"
  SETTINGS["Zone".."03".."RegimeType"] = "warmup"
  SETTINGS["Zone".."04".."RegimeType"] = "warmup"
  SETTINGS["Zone".."05".."RegimeType"] = "warmup"
  reg['zone01regime'] = 2
  reg['zone02regime'] = 3
  reg['zone03regime'] = 1
  reg['zone04regime'] = 1
  reg['zone05regime'] = 1
  reg['blower01revdamper'] = 0
  reg['blower01direction'] = 0
  for i, zone_id in pairs(zone_ids) do
    damperA_id = zone_labels[zone_id]..'A'
    damperB_id = zone_labels[zone_id]..'B'
    damperA_prefix = 'damper'..damperA_id
    damperB_prefix = 'damper'..damperB_id
    reg[damperA_prefix..'override'] = 0
    reg[damperB_prefix..'override'] = 0
    zone_prefix = 'zone'..zone_id
    reg[zone_prefix..'control'] = 1
    if reg[zone_prefix..'regime'] == 2 then
      -- min temp is used as control temp for zones with pfrp regime type
      -- target test temp is 130
      reg[zone_prefix..'pAlvtemp'] = 130
      reg[zone_prefix..'pBlvtemp'] = 155
      reg[zone_prefix..'pClvtemp'] = 140
      reg[zone_prefix..'pDlvtemp'] = 150
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 59.15)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      updateDampers()
      lu.assertEquals(math.floor(_G['DAMPER_'..damperA_id]['control']), 22)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 15)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 15)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      lu.assertEquals(io[damperA_prefix..'position'], 15)
      lu.assertEquals(io[damperB_prefix..'position'], 0)
      -- target test temp is 140
      reg[zone_prefix..'pAlvtemp'] = 165
      reg[zone_prefix..'pBlvtemp'] = 140
      reg[zone_prefix..'pClvtemp'] = 145
      reg[zone_prefix..'pDlvtemp'] = 155
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 55.96)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 92.78)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 0)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[zone_prefix..'control'] = 1
      reg[damperA_prefix..'override'] = 1
      reg[damperA_prefix..'value'] = 80
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 80)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 80)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[damperA_prefix..'override'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 0)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
    else
      -- avg temp is used as control temp for zones with warmup regime type
      -- target test temp is 130
      reg[zone_prefix..'pAlvtemp'] = 125
      reg[zone_prefix..'pBlvtemp'] = 135
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 59.15)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      updateDampers()
      lu.assertEquals(math.floor(_G['DAMPER_'..damperA_id]['control']), 22)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 15)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 15)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      lu.assertEquals(io[damperA_prefix..'position'], 15)
      lu.assertEquals(io[damperB_prefix..'position'], 0)
      -- target test temp is 140
      reg[zone_prefix..'pAlvtemp'] = 135
      reg[zone_prefix..'pBlvtemp'] = 145
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 55.96)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 92.78)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 0)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[zone_prefix..'control'] = 1
      reg[damperA_prefix..'override'] = 1
      reg[damperA_prefix..'value'] = 80
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 80)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[zone_prefix..'control'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 80)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[damperA_prefix..'override'] = 1
      reg[damperB_prefix..'override'] = 1
      reg[damperA_prefix..'value'] = 60
      reg[damperB_prefix..'value'] = 60
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 60)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
      reg[zone_prefix..'control'] = 1
      reg[damperA_prefix..'override'] = 0
      reg[damperB_prefix..'override'] = 0
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..damperA_id]['control'], 100)
      lu.assertEquals(_G['DAMPER_'..damperB_id]['control'], 0)
    end
  end
end

function TestWebmacsScripts:test_zone_controls()
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'value'] = 65
    reg['blower'..blower_id..'direction'] = 1
    reg['blower'..blower_id..'revdamper'] = 1
    reg['duct'..blower_id..'pressureavg'] = 8
    reg['biofilter'..blower_id..'pA'..'avgtemp'] = 125
    reg['biofilter'..blower_id..'pB'..'avgtemp'] = 140
    reg['biofilter'..blower_id..'pC'..'avgtemp'] = 135
    reg['biofilter'..blower_id..'pD'..'avgtemp'] = 150
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
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature A, Biofilter Temperature B, Exhaust Temperature, PFRP Time \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature A, Biofilter Temperature B, Exhaust Temperature, PFRP Time \n")
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 135
    reg['zone'..zone_id..'pCavgtemp'] = 131
    reg['zone'..zone_id..'pDavgtemp'] = 130
    reg['zone'..zone_id..'avgdamper'] = 45
    reg['zone'..zone_id..'pfrptime'] = 360
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Aeration Direction, Blower Speed, Biofilter Temperature A, Biofilter Temperature B, Exhaust Temperature, PFRP Time \n01/01/2017 12:00:00, "..zone_labels[zone_id]..", 128, 135, 131, 130, 45, 1, 10, 132.5, 142.5, 360".."\n")
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

function TestWebmacsScripts:test_wireless_sensor_age_alarms()
  initSequence()
  SETTINGS["WirelessSensorAgeAlarm"] = 10
  for i, zone_id in pairs(zone_ids) do
    emails_sent = 0
    -- with sensor age below wireless sensor age alarm setpoint, no alarm is sent
    reg["zone"..zone_id.."control"] = 1
    reg["zone"..zone_id.."pAlvtemp"] = 70
    reg["zone"..zone_id.."pBlvtemp"] = 70
    reg["zone"..zone_id.."pClvtemp"] = 70
    reg["zone"..zone_id.."pDlvtemp"] = 70
    reg["zone"..zone_id.."pAtempage"] = 559
    reg["zone"..zone_id.."pBtempage"] = 559
    reg["zone"..zone_id.."pCtempage"] = 559
    reg["zone"..zone_id.."pDtempage"] = 559
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
    if zone_labels then
      lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_labels[zone_id].." Temperature Sensor Communication".."!")
    else
      lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_id.." Temperature Sensor Communication".."!")
    end
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

  sensor_prefixes = {'premister','exhaust'}
  for i, prefix in pairs(sensor_prefixes) do
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
end

function TestWebmacsScripts:test_update_misters()
  initSequence()
  SETTINGS["MisterOnTime"] = 10
  SETTINGS["MisterOffTime"] = 30
  for i, blower_id in pairs(blower_ids) do
    SETTINGS["Mister"..blower_id..'Pos'.."TempSetPoint"] = 80
    reg["premister"..blower_id.."lvtemp"] = 75
    reg["duct"..blower_id.."misteroverride"] = 0
    reg["duct"..blower_id.."mistertimer"] = 0
    io["blower"..blower_id..'run'] = 0
    reg["blower"..blower_id.."idletimer"] = 0
    -- while in positive aeration
    reg["blower"..blower_id.."direction"] = 1
    -- with blower off, mister is off
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 0)
    -- with blower on and premister temp below setpoint, mister is off
    io["blower"..blower_id..'run'] = 1
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 0)
    -- with blower on and premister temp above setpoint, mister is on
    io["blower"..blower_id..'run'] = 1
    reg["premister"..blower_id.."lvtemp"] = 81
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2400)
    -- with premister temp above setpoint and mister timer within the on time cycle, mister stays on
    reg["duct"..blower_id.."mistertimer"] = 2000
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2000)
    -- with premister temp above setpoint and mister timer below the on time cycle, mister turns off
    reg["duct"..blower_id.."mistertimer"] = 1700
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 1700)
    -- with premister temp below setpoint, mister is off
    reg["duct"..blower_id.."mistertimer"] = 600
    reg["premister"..blower_id.."lvtemp"] = 78
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 600)
    -- with premister temp above setpoint and mister timer within the off time cycle, mister is off
    reg["duct"..blower_id.."mistertimer"] = 200
    reg["premister"..blower_id.."lvtemp"] = 88
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 200)
    -- with premister temp above setpoint and mister timer completed, mister turns on
    reg["duct"..blower_id.."mistertimer"] = 00
    reg["premister"..blower_id.."lvtemp"] = 98
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2400)
    -- with premister temp above setpoint and mister timer within the off time cycle, mister is off
    reg["duct"..blower_id.."mistertimer"] = 500
    reg["premister"..blower_id.."lvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 500)
    -- with mister override and mister control on, mister turns on
    reg["duct"..blower_id.."mistercontrol"] = 1
    reg["duct"..blower_id.."misteroverride"] = 1
    reg["duct"..blower_id.."mistertimer"] = 0
    reg["premister"..blower_id.."lvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2400)
    lu.assertEquals(reg["duct"..blower_id.."misteroverride"], 1)
    -- mister turns off during off time
    reg["duct"..blower_id.."mistertimer"] = 500
    reg["premister"..blower_id.."lvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 500)
    lu.assertEquals(reg["duct"..blower_id.."misteroverride"], 1)
    -- with mister override and mister control off, mister turns off
    reg["duct"..blower_id.."mistercontrol"] = 0
    reg["duct"..blower_id.."misteroverride"] = 1
    reg["duct"..blower_id.."mistertimer"] = 0
    reg["premister"..blower_id.."lvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 0)
    lu.assertEquals(reg["duct"..blower_id.."misteroverride"], 1)

    -- while in negative aeration
    reg["duct"..blower_id.."misteroverride"] = 0
    reg["blower"..blower_id.."direction"] = 0
    -- with blower off, mister is off
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 0)
    -- with blower on and biofilter temp average below setpoint, mister is off
    io["blower"..blower_id..'run'] = 1
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 0)
    -- with blower on and biofilter temp average above setpoint, mister is on
    io["blower"..blower_id..'run'] = 1
    reg["biofilter"..blower_id.."pAlvtemp"] = 81
    reg["biofilter"..blower_id.."pBlvtemp"] = 81
    reg["biofilter"..blower_id.."pClvtemp"] = 81
    reg["biofilter"..blower_id.."pDlvtemp"] = 81
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2400)
    -- with biofilter temp average above setpoint and mister timer within the on time cycle, mister stays on
    reg["duct"..blower_id.."mistertimer"] = 2000
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2000)
    -- with biofilter temp average above setpoint and mister timer below the on time cycle, mister turns off
    reg["duct"..blower_id.."mistertimer"] = 1700
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 1700)
    -- with biofilter temp average below setpoint, mister is off
    reg["duct"..blower_id.."mistertimer"] = 600
    reg["biofilter"..blower_id.."pAlvtemp"] = 78
    reg["biofilter"..blower_id.."pBlvtemp"] = 78
    reg["biofilter"..blower_id.."pClvtemp"] = 78
    reg["biofilter"..blower_id.."pDlvtemp"] = 78
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 600)
    -- with biofilter temp average above setpoint and mister timer within the off time cycle, mister is off
    reg["duct"..blower_id.."mistertimer"] = 200
    reg["biofilter"..blower_id.."pAlvtemp"] = 88
    reg["biofilter"..blower_id.."pBlvtemp"] = 88
    reg["biofilter"..blower_id.."pClvtemp"] = 88
    reg["biofilter"..blower_id.."pDlvtemp"] = 88
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 200)
    -- with biofilter temp average above setpoint and mister timer completed, mister turns on
    reg["duct"..blower_id.."mistertimer"] = 00
    reg["biofilter"..blower_id.."pAlvtemp"] = 98
    reg["biofilter"..blower_id.."pBlvtemp"] = 98
    reg["biofilter"..blower_id.."pClvtemp"] = 98
    reg["biofilter"..blower_id.."pDlvtemp"] = 98
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2400)
    -- with biofilter temp average above setpoint and mister timer within the off time cycle, mister is off
    reg["duct"..blower_id.."mistertimer"] = 500
    reg["biofilter"..blower_id.."pAlvtemp"] = 84
    reg["biofilter"..blower_id.."pBlvtemp"] = 84
    reg["biofilter"..blower_id.."pClvtemp"] = 84
    reg["biofilter"..blower_id.."pDlvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 500)
    -- with mister override and mister control on, mister turns on
    reg["duct"..blower_id.."mistercontrol"] = 1
    reg["duct"..blower_id.."misteroverride"] = 1
    reg["duct"..blower_id.."mistertimer"] = 0
    reg["biofilter"..blower_id.."pAlvtemp"] = 84
    reg["biofilter"..blower_id.."pBlvtemp"] = 84
    reg["biofilter"..blower_id.."pClvtemp"] = 84
    reg["biofilter"..blower_id.."pDlvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 1)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 2400)
    lu.assertEquals(reg["duct"..blower_id.."misteroverride"], 1)
    -- mister turns off during off time
    reg["duct"..blower_id.."mistertimer"] = 500
    reg["biofilter"..blower_id.."pAlvtemp"] = 84
    reg["biofilter"..blower_id.."pBlvtemp"] = 84
    reg["biofilter"..blower_id.."pClvtemp"] = 84
    reg["biofilter"..blower_id.."pDlvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 500)
    lu.assertEquals(reg["duct"..blower_id.."misteroverride"], 1)
    -- with mister override and mister control off, mister turns off
    reg["duct"..blower_id.."mistercontrol"] = 0
    reg["duct"..blower_id.."misteroverride"] = 1
    reg["duct"..blower_id.."mistertimer"] = 0
    reg["biofilter"..blower_id.."pAlvtemp"] = 84
    reg["biofilter"..blower_id.."pBlvtemp"] = 84
    reg["biofilter"..blower_id.."pClvtemp"] = 84
    reg["biofilter"..blower_id.."pDlvtemp"] = 84
    updateMisters(biofilter_probe_ids)
    lu.assertEquals(io["duct"..blower_id.."mister"], 0)
    lu.assertEquals(reg["duct"..blower_id.."mistertimer"], 0)
    lu.assertEquals(reg["duct"..blower_id.."misteroverride"], 1)
  end
end

function TestWebmacsScripts:test_zone_regimes()
  initSequence()
  for i, blower_id in pairs(blower_ids) do
    reg["blower"..blower_id.."revdamper"] = 1
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

function TestWebmacsScripts:test_retrieve_wireless_sensor_data_tcp()
  initSequence()
  local sensor_data = retrieveWirelessSensorDataTCP()

  for i,zn_id in ipairs(zone_ids) do
    SETTINGS["Zone"..zn_id.."ProbeAPointID"] = "0000000050B04AE3_1"
    SETTINGS["Zone"..zn_id.."ProbeBPointID"] = "0000000050B04AE3_2"
    SETTINGS["Zone"..zn_id.."ProbeCPointID"] = "0000000050B04AE3_2"
    SETTINGS["Zone"..zn_id.."ProbeDPointID"] = "0000000050B04AE3_2"
  end
  for i,zn_id in ipairs(zone_ids) do
    for i, probe_id in pairs(zone_probe_ids) do
      for i, temp_prefix in ipairs(getTempPrefixes('zone', zn_id, {probe_id})) do
        updateLastValidTemps()
        if probe_id == 'A' then
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
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeCPointID"] = 50
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeDPointID"] = 50
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          lu.assertEquals(reg[temp_prefix.."tempage"], 600)
          -- after 100th failure, temp age goes to max sensor age
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 100
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeCPointID"] = 100
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeDPointID"] = 100
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        else
          if probe_id ~= 'B' and tonumber(zn_id) < 3 then
            return
          end
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

function TestWebmacsScripts:test_update_epa_temp_averages()
  initSequence()
  SETTINGS['DataLoggingRate'] = 30
  SETTINGS['Zone01RegimeType'] = 'pfrp'
  SETTINGS['Zone02RegimeType'] = 'pfrp'
  SETTINGS['Zone03RegimeType'] = 'warmup'
  SETTINGS['Zone04RegimeType'] = 'warmup'
  for i, zone_id in pairs(zone_ids) do
    if has_regimes == true then
      reg['zone'..zone_id..'regime'] = 2
      reg['zone'..zone_id..'regtimer'] = 0
    end
    reg['zone'..zone_id..'pfrptime'] = 0
    reg['zone'..zone_id..'control'] = 1
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 9
      if has_wireless_zone_temp_sensor == true then
        reg[temp_prefix..'tempage'] = 300
        reg[temp_prefix..'tempage'] = 300
      end
    end
    if zone_id == '01' or zone_id == '02' then
      -- increments pfrp time while avgtemp vals are above setpoint
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
      -- resets pfrp time when avgtemp vals are below setpoint
      for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
        reg[temp_prefix..'avgtemp'] = PFRP_TEMP - 1
      end
      updateEPATempAverages(zone_id,zone_probe_ids)
      lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
      updateEPATempAverages(zone_id,zone_probe_ids)
      lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
      -- increments pfrp time if avgtemp vals meet setpoint
      for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
        reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 15
      end
      updateEPATempAverages(zone_id,zone_probe_ids)
      lu.assertEquals(reg['zone'..zone_id..'pfrptime'],30)
    else
      -- does not increment pfrptime for non PFRP zones
      updateEPATempAverages(zone_id,zone_probe_ids)
      lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
      for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
        reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 4
      end
      updateEPATempAverages(zone_id,zone_probe_ids)
      lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    end
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

function TestWebmacsScripts:test_a_damper_direction_control()
  initSequence()
  for i, blower_id in pairs(blower_ids) do
    SETTINGS["BiofilterForcePositiveTemperature"] = 75
    SETTINGS["BlowerCyclePositiveTime"] = 30
    SETTINGS["BlowerCycleNegativeTime"] = 30
    reg['blower'..blower_id..'revoverride'] = 0
    reg['blower'..blower_id..'revdamper'] = 0
    reg['blower'..blower_id..'direction'] = 0
    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0


    local zones_online = 1
    local top_avg = 50 -- avg of temps from top portions of sensors
    local btm_avg = 50 -- avg of temps from bottom portions of sensors
    local biofilters_temp_avg = 50 -- avg of temps from biofilter temp sensors
    local top_sp = 65 -- BlowerXNegDirectionTempSetPoint setting
    local btm_sp = 65 -- BlowerXPosDirectionTempSetPoint setting

    -- Within the A_DamperDirectionControl function logic the
    -- top_avg is compared against top_sp while btm_avg is compared against btm_sp
    -- to determine aeration direction

    -- During negative aeration, top part of pile cools while bottom part gets hotter
    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)

    top_avg = 40
    btm_avg = 60

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)

    top_avg = 35
    btm_avg = 65

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)

    -- when top_avg <= top_sp and btm_avg > btm_sp, aeration direction changes to positive
    top_avg = 34
    btm_avg = 66

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)

    -- During positive aeration, bottom part of pile cools while top part gets hotter
    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 35
    btm_avg = 65

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)

    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 45
    btm_avg = 55

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)

    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 55
    btm_avg = 45

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)

    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 65
    btm_avg = 35

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)

    -- when btm_avg <= btm_sp and top_avg > top_sp, aeration direction changes to negative
    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 66
    btm_avg = 34

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)

    -- when top_avg and btm_avg are equal to the top_sp and btm_sp
    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 65
    btm_avg = 65

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)

    -- when biofilters_temp_avg > BiofilterForcePositiveTemperature setting, direction is forced to positive
    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 66
    btm_avg = 64
    biofilters_temp_avg = 76

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)

    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 60
    btm_avg = 50
    biofilters_temp_avg = 70

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)

    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 0
    top_avg = 70
    btm_avg = 40

    A_DamperDirectionControl(blower_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)
  end
end

function TestWebmacsScripts:test_a_damper_timer_control()
  initSequence()
  SETTINGS["BiofilterForcePositiveTemperature"] = 75
  SETTINGS["BlowerCyclePositiveTime"] = 30
  SETTINGS["BlowerCycleNegativeTime"] = 30
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'revoverride'] = 0
    reg['blower'..blower_id..'revdamper'] = 0
    reg['blower'..blower_id..'direction'] = 1
    reg['blower'..blower_id..'idletimer'] = 0
    reg['blower'..blower_id..'revtimer'] = 60

    local zones_online = 1
    local biofilters_temp_avg = 50
    local temp_sp = SETTINGS["BiofilterForcePositiveTemperature"]

    A_DamperTimerControl('blower'..blower_id,biofilters_temp_avg,temp_sp,zones_online)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)
    lu.assertEquals(reg['blower'..blower_id..'revtimer'], 60)

    -- When revtimer reaches 0 the blower changes direction and the revtimer resets.
    reg['blower'..blower_id..'revtimer'] = 0
    A_DamperTimerControl('blower'..blower_id,biofilters_temp_avg,temp_sp,zones_online)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)
    lu.assertEquals(reg['blower'..blower_id..'revtimer'], 1800)

    -- When revtimer is greater than 0 the blower continues in the same direction.
    reg['blower'..blower_id..'revtimer'] = 20
    A_DamperTimerControl('blower'..blower_id,biofilters_temp_avg,temp_sp,zones_online)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 0)
    lu.assertEquals(reg['blower'..blower_id..'revtimer'], 20)

    -- The damper direction is forced into positive and the revtimer resets if the biofilter average temp exceeds BiofilterForcePositiveTemperature.
    biofilters_temp_avg = 76
    A_DamperTimerControl('blower'..blower_id,biofilters_temp_avg,temp_sp,zones_online)
    lu.assertEquals(reg['blower'..blower_id..'direction'], 1)
    lu.assertEquals(reg['blower'..blower_id..'revtimer'], 0)
  end
end

function TestWebmacsScripts:test_rev_load_zone_set_max_blwr_speed()
  initSequence()
  SETTINGS["MaxVFDSpeed"] = nil
  for i, zone_id in pairs(zone_ids) do
    reg['loadzone'..zone_id..'active'] = 1
  end
  for i, blower_id in pairs(blower_ids) do
    reg["premister"..blower_id.."lvtemp"] = 75
    reg["blower"..blower_id.."revdamper"] = 1
    reg["blower"..blower_id.."idletimer"] = 0
    io["blower"..blower_id.."speed"] = 30
    reg["blower"..blower_id.."prerevspeed"] = 0
    reg['blower'..blower_id..'revlogic'] = 0
    -- when load zone is active and MaxVFDSpeed setting is nil blower speed should be 100
    updateBlowers()
    lu.assertEquals(io["blower"..blower_id.."speed"], 100)
    -- when load zone is active and MaxVFDSpeed setting is not nil blower speed should equal the MaxVFDSpeed setting
    SETTINGS["MaxVFDSpeed"] = 77
    updateBlowers()
    lu.assertEquals(io["blower"..blower_id.."speed"], SETTINGS["MaxVFDSpeed"])
    SETTINGS["MaxVFDSpeed"] = 10
    updateBlowers()
    lu.assertEquals(io["blower"..blower_id.."speed"], SETTINGS["MaxVFDSpeed"])
    SETTINGS["MaxVFDSpeed"] = 0
    updateBlowers()
    lu.assertEquals(io["blower"..blower_id.."speed"], SETTINGS["MaxVFDSpeed"])
  end
end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
