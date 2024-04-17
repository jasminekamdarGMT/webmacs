local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = 'pala_waste_management'
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')

-- globals for tests
blower_ids = uid(1)
blower_labels = {'01'}
zone_ids = uid(8)
zone_labels = {
  ['01']='1-1',['02']='1-2',['03']='1-3',
  ['04']='1-4',['05']='1-5',['06']='1-6',
  ['07']='1-7',['08']='1-8'
}
container_ids = uid(2)
zone_probe_ids = {'A', 'B', 'C', 'D'}
has_wired_zone_temp_sensor = true
has_blower_speed_control = true

-- additional test files
require(facility_path..'x600m/scripts/test_helpers')
require(facility_path..'x600m/tests/damper_functions_tests')
require(facility_path..'x600m/tests/temp_functions_tests')
require(facility_path..'x600m/tests/zone_functions_tests')

-- special test env variables
luatest_running = true
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

function appendFacilityIO(io)
  for i, container_id in pairs(container_ids) do
    io['container'..container_id..'estop'] = 0
  end
  for i, blower_id in pairs(blower_ids) do
    io['blower'..blower_id..'fault'] = 1
  end
  for i, zone_id in pairs(zone_ids) do
    io['damper'..zone_id..'position'] = 0
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

function TestWebmacsScripts:setUp()
  io = initIO()
  io['container01temp'] = 225
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

function TestWebmacsScripts:test_update_blowers()
  initSequence()
  reg['estopactive'] = 0
  SETTINGS['MisterOnTime'] = 10
  SETTINGS['MisterOffTime'] = 30
  SETTINGS["MaxContainerTemp"] = 250
  emails_sent = 0
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
  reg.duct01pressureavg = 0
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
  reg.duct01pressuresp = 6
  reg.zone01pAlvtemp = 160
  reg.zone01pBlvtemp = 165
  reg.zone02pAlvtemp = 145
  reg.zone02pBlvtemp = 150
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
  reg.zone01pBlvtemp = 45
  reg.zone02pAlvtemp = 50
  reg.zone02pBlvtemp = 55
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
  reg.duct01pressuresp = 4
  reg.zone01pAlvtemp = 130
  reg.zone01pBlvtemp = 135
  reg.zone02pAlvtemp = 30
  reg.zone02pBlvtemp = 35
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  -- test that ductXpressuresp increases from last captured value from ductXpressuresp
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct01pressuresp'], 6)
  reg.zone01pAlvtemp = 132
  reg.zone01pBlvtemp = 132
  reg.zone01pClvtemp = 132
  reg.zone01pDlvtemp = 132
  reg.zone02pAlvtemp = 132
  reg.zone02pBlvtemp = 132
  reg.zone02pClvtemp = 132
  reg.zone02pDlvtemp = 132
  reg.duct01presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- print(tonumber(SETTINGS["PressureSetpointChangeInterval"]))
  lu.assertEquals(reg['duct01pressuresp'], 8)
  -- test that only online zones are accounted for
  reg.duct01pressuresp = 6
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
  -- Blowers shut off if their container gets too hot
  lu.assertEquals(emails_sent, 0)
  io.container01temp = 260
  reg['container01alarmage'] = 0
  io['blower01run'] = 1
  io['blower01speed'] = 80
  reg['blower01value'] = 1
  updateBlowers()
  lu.assertEquals(io['blower01run'], 0)
  lu.assertEquals(io['blower01speed'], 0)
  lu.assertEquals(reg['blower01value'], 0)
  lu.assertEquals(reg['container01alarmage'], 3600000)
  lu.assertEquals(emails_sent, 1)
  io.container01temp = 240
  io['blower01run'] = 1
  io['blower01speed'] = 100
  reg['blower01value'] = 100
  updateBlowers()
  lu.assertEquals(io['blower01run'], 1)
  lu.assertEquals(io['blower01speed'], 100)
  lu.assertEquals(reg['blower01value'], 100)
  lu.assertEquals(emails_sent, 1)
  lu.assertEquals(reg['container01alarmage'], 0)
  -- blowers stop, but email does not get sent whe alarm age is not at zero
  reg['container01alarmage'] = 10
  io.container01temp = 260
  io['blower01run'] = 1
  io['blower01speed'] = 80
  reg['blower01value'] = 1
  updateBlowers()
  lu.assertEquals(io['blower01run'], 0)
  lu.assertEquals(io['blower01speed'], 0)
  lu.assertEquals(reg['blower01value'], 0)
  lu.assertEquals(reg['container01alarmage'], 10)
  lu.assertEquals(emails_sent, 1)
  -- alarm age resets when temp goes below set max point
  io.container01temp = 240
  updateBlowers()
  lu.assertEquals(reg['container01alarmage'], 0)
  io.container01temp = 200
  reg['estopactive'] = 0
  io['blower01run'] = 1
  io['blower01speed'] = 80
  reg['blower01value'] = 1
  updateBlowers()
  lu.assertEquals(io['blower01run'], 1)
  lu.assertEquals(io['blower01speed'], 100)
  lu.assertEquals(reg['blower01value'], 100)
  reg['estopactive'] = 1
  updateBlowers()
  lu.assertEquals(io['blower01run'], 0)
  lu.assertEquals(io['blower01speed'], 0)
  lu.assertEquals(reg['blower01value'], 0)
end

function TestWebmacsScripts:test_update_dampers()
  initSequence()
  reg['estopactive'] = 0
  SETTINGS["MinDamperValue"] = "15"
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
    elseif #zone_probe_ids == 4 then
      reg[zone_prefix..'pAlvtemp'] = 125
      reg[zone_prefix..'pBlvtemp'] = 135
      reg[zone_prefix..'pClvtemp'] = 125
      reg[zone_prefix..'pDlvtemp'] = 135
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
    elseif #zone_probe_ids == 4 then
      reg[zone_prefix..'pAlvtemp'] = 135
      reg[zone_prefix..'pBlvtemp'] = 145
      reg[zone_prefix..'pClvtemp'] = 135
      reg[zone_prefix..'pDlvtemp'] = 145
    end
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 55.96)
    -- test damper value does not change when estop is active
    io["container01estop"] = 1
    io["container02estop"] = 0
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 1)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 55.96)
    io["container01estop"] = 0
    io["container02estop"] = 1
    reg['estopactive'] = 0
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 1)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 55.96)
    io["container01estop"] = 1
    io["container02estop"] = 1
    lu.assertEquals(reg['estopactive'], 1)
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 0)
    -- test that damper value updates when estop is no longer active
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

function TestWebmacsScripts:test_update_irrigations()
  initSequence()
  SETTINGS['IrrigationOnTime'] = 30
  -- test each zone while everything is off
  for i,zn_id in ipairs(zone_ids) do
    reg['zone'..zn_id..'irrcontrol'] = 0
    reg['zone'..zn_id..'irrtimer'] = 0
    io['zone'..zn_id..'irrigation'] = 0
    io['container01estop'] = 1
    io['container02estop'] = 1
    reg['estopactive'] = 0
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 0)
    lu.assertEquals(reg['zone'..zn_id..'irrtimer'], 0)
    -- test that when irrcontrol is on, the timer gets started and the irrigation turns on
    reg['zone'..zn_id..'irrcontrol'] = 1
    reg['zone'..zn_id..'irrtimer'] = 0
    io['zone'..zn_id..'irrigation'] = 0
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 1)
    lu.assertEquals(reg['zone'..zn_id..'irrtimer'], 1800)
    -- test that irrigation turns off when zoneirrcontrol is 0
    reg['zone'..zn_id..'irrcontrol'] = 0
    io['zone'..zn_id..'irrigation'] = 1
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 0)
    lu.assertEquals(reg['zone'..zn_id..'irrtimer'], 1800)
    -- test that irrigation stays on while the timer is counting down
    reg['zone'..zn_id..'irrcontrol'] = 1
    reg['zone'..zn_id..'irrtimer'] = 1800
    io['zone'..zn_id..'irrigation'] = 1
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 1)
    lu.assertEquals(reg['zone'..zn_id..'irrtimer'], 1800)
    reg['zone'..zn_id..'irrcontrol'] = 1
    reg['zone'..zn_id..'irrtimer'] = 2
    io['zone'..zn_id..'irrigation'] = 1
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 1)
    lu.assertEquals(reg['zone'..zn_id..'irrtimer'], 2)
    -- test that irrigation turns off when timer is up
    reg['zone'..zn_id..'irrcontrol'] = 1
    reg['zone'..zn_id..'irrtimer'] = 0
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 0)
    -- test that irrigation turns off when estop is active
    reg['zone'..zn_id..'irrcontrol'] = 1
    reg['zone'..zn_id..'irrtimer'] = 0
    io['zone'..zn_id..'irrigation'] = 0
    io['container01estop'] = 1
    io['container02estop'] = 1
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 0)
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 1)
    lu.assertEquals(reg['zone'..zn_id..'irrtimer'], 1800)
    io['container01estop'] = 0
    io['container02estop'] = 1
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 1)
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 0)
    lu.assertEquals(reg['zone'..zn_id..'irrcontrol'], 0)
    io['container01estop'] = 1
    io['container02estop'] = 0
    reg['zone'..zn_id..'irrcontrol'] = 1
    reg['zone'..zn_id..'irrtimer'] = 1800
    io['zone'..zn_id..'irrigation'] = 1
    reg['estopactive'] = 0
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 1)
    updateIrrigation(zn_id)
    lu.assertEquals(io['zone'..zn_id..'irrigation'], 0)
    lu.assertEquals(reg['zone'..zn_id..'irrcontrol'], 0)
  end
end

function TestWebmacsScripts:test_update_epa_temp_averages()
  initSequence()
  SETTINGS['DataLoggingRate'] = 30
  SETTINGS['Zone01RegimeType'] = 'pfrp'
  SETTINGS['Zone02RegimeType'] = 'pfrp'
  SETTINGS['Zone03RegimeType'] = 'warmup'
  SETTINGS['Zone04RegimeType'] = 'warmup'
  SETTINGS['Zone05RegimeType'] = 'warmup'
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
      -- increments pfrp time while min avgtemp vals are above setpoint
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
      -- resets pfrp time when min avgtemp vals are below setpoint
      for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
        reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 1
      end
      reg['zone'..zone_id..'pAavgtemp'] = PFRP_TEMP - 1
      updateEPATempAverages(zone_id,zone_probe_ids)
      lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
      updateEPATempAverages(zone_id,zone_probe_ids)
      lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
      -- increments pfrp time if min avgtemp vals meet setpoint
      for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
        reg[temp_prefix..'avgtemp'] = PFRP_TEMP + 15
      end
      reg['zone'..zone_id..'pAavgtemp'] = PFRP_TEMP
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

function TestWebmacsScripts:test_zone_controls()
  for i, zone_id in pairs(zone_ids) do
    -- with empty filename, creates new filename
    reg['zone'..zone_id..'control'] = 1
    reg['zone'..zone_id..'reset'] = 0
    _G['ZONE_'..zone_id]["file_name"] = ""
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Blower Speed, PFRP Time \n")
    -- with zone reset active, creates new filename
    reg['zone'..zone_id..'reset'] = 1
    _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
    -- simulate user entering batch name
    updateZoneBatchTitle (zone_id, 'newbatchname')
    updateZones()
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Blower Speed, PFRP Time \n")
    lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
    -- when print timer reaches zero, logs data and reset timer
    reg['zone'..zone_id..'print'] = 0
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'pBavgtemp'] = 135
    reg['zone'..zone_id..'pAavgtemp'] = 128
    reg['zone'..zone_id..'avgdamper'] = 45
    reg['zone'..zone_id..'pfrptime'] = 4320
    updateZones()
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Blower Speed, PFRP Time \n01/01/2017 12:00:00, 1-"..tonumber(zone_id)..", 128, 135, 0, 0, 45, Warm Up, 4320\n")
    lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
    -- if all system is reset, zone values are loaded from db
    _G['ZONE_'..zone_id]["file_name"] = ""
    reg['zone'..zone_id..'control'] = 0
    initSequence()
    lu.assertEquals(reg['zone'..zone_id..'control'], 1)
    lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_120000_newbatchname.csv')
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

function TestWebmacsScripts:test_update_blower_pid_pressure_values()
  initSequence()
  SETTINGS["MinVFDSpeed"] = "25"
  SETTINGS['BlowerRate'] = "10"
  SETTINGS["BlowerGain"] = ".5"
  SETTINGS["BlowerIntegral"] = "1"
  SETTINGS["BlowerDerivative"] = ".5"
  SETTINGS["BlowerDerivativeTime"] = "10"
  SETTINGS['PressureSetpoint2'] = "4"
  for i, blower_id in pairs(blower_ids) do
    SETTINGS["MaxVFDSpeed"] = "100"
    -- low pressure results in max vfd speed
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 31.65)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 61.5)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 91.5)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 100)
    -- respects max vfd speed setting
    SETTINGS["MaxVFDSpeed"] = "85"
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 85)
    -- high pressure result in min VFD speed
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 10, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 25)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 10, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 25)
  end
end

function TestWebmacsScripts:test_auto_blower_speed_control()
  if has_blower_speed_control == true then
    initSequence()
    SETTINGS["MinVFDSpeed"] = 30
    SETTINGS["MaxVFDSpeed"] = 100
    for i, blower_id in pairs(blower_ids) do
      reg['blower'..blower_id..'override'] = 0
      reg['blower'..blower_id..'control'] = 1
      io["blower"..blower_id.."speed"] = 20
      reg["blower"..blower_id.."value"] = 48
      -- feedback_value is 0 therefore blowerxcontrol and blowerxspeed/value are set to 0.
      autoBlowerSpeedControl('blower'..blower_id, 0, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
      lu.assertEquals(reg["blower"..blower_id.."control"], 0)
      lu.assertEquals(io["blower"..blower_id.."speed"], 0)
      lu.assertEquals(reg["blower"..blower_id.."value"], 0)
      -- feedback_value > 0 therefore blowerxcontrol is enabled and
      -- blowerxspeed/value are set to MinVFDSpeed.
      if reg["blower"..blower_id..'idletimer'] ~= nil then
        reg["blower"..blower_id..'idletimer'] = 12
        autoBlowerSpeedControl('blower'..blower_id, 10, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
        lu.assertEquals(reg["blower"..blower_id.."control"], 1)
        lu.assertEquals(io["blower"..blower_id.."speed"], 30)
        lu.assertEquals(reg["blower"..blower_id.."value"], 30)
        reg["blower"..blower_id..'idletimer'] = 0
      end
      -- blowerxoverride and blowerxcontrol are enabled therefore
      -- blowerxspeed will be set to blowerxvalue.
      reg['blower'..blower_id..'control'] = 1
      reg["blower"..blower_id.."override"] = 1
      io["blower"..blower_id.."speed"] = 20
      reg["blower"..blower_id.."value"] = 48
      autoBlowerSpeedControl('blower'..blower_id, 10, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
      lu.assertEquals(reg["blower"..blower_id.."control"], 1)
      lu.assertEquals(io["blower"..blower_id.."speed"], 48)
      lu.assertEquals(reg["blower"..blower_id.."value"], 48)
      -- blowerxoverride is disabled and blowerxidletimer is nil and
      -- blowerxfault = 1 therefore autoBlowerSpeedControl returns true.
      reg["blower"..blower_id.."override"] = 0
      lu.assertEquals(autoBlowerSpeedControl('blower'..blower_id, 12, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"]), true)
    end
  end
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

function TestWebmacsScripts:test_estop()
  -- irrigation 0, pump control 0, damper control don't move
  initSequence()
  io['container01temp'] = 100
  io['container02temp'] = 100
  -- loop through blowers
  for i,blwr_id in ipairs(blower_ids) do
    -- test that blowers remain on when estop is not active
    reg['blower'..blwr_id..'control'] = 1
    reg['blower'..blwr_id..'override'] = 1
    reg['blower'..blwr_id..'value'] = 50
    io['blower'..blwr_id..'run'] = 1
    io['blower'..blwr_id..'speed'] = 50
    io['container01estop'] = 1
    io['container02estop'] = 1
    reg['estopactive'] = 1
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 0)
    updateBlowers()
    lu.assertEquals(io['blower'..blwr_id..'run'], 1)
    lu.assertEquals(io['blower'..blwr_id..'speed'], 50)
    lu.assertEquals(reg['blower'..blwr_id..'value'], 50)
    -- test that blowers turn off when estop is active
    io['container01estop'] = 0
    io['container02estop'] = 0
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 1)
    updateBlowers()
    lu.assertEquals(io['blower'..blwr_id..'run'], 0)
    lu.assertEquals(io['blower'..blwr_id..'speed'], 0)
    lu.assertEquals(reg['blower'..blwr_id..'value'], 0)
    reg['blower'..blwr_id..'control'] = 1
    reg['blower'..blwr_id..'value'] = 50
    io['blower'..blwr_id..'run'] = 1
    io['blower'..blwr_id..'speed'] = 50
    io['container01estop'] = 1
    io['container02estop'] = 0
    reg['estopactive'] = 0
    updateAlarms()
    lu.assertEquals(reg['estopactive'], 1)
    updateBlowers()
    lu.assertEquals(io['blower'..blwr_id..'run'], 0)
    lu.assertEquals(io['blower'..blwr_id..'speed'], 0)
    lu.assertEquals(reg['blower'..blwr_id..'value'], 0)
  end
end

-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
