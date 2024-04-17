local lu = require('luaunit')

TestWebmacsScripts = {}
luatest_running = true

-- script paths
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = 'pala_waste_management/'
main_path = package.path
package.path = main_path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'

-- control scripts
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
facility_name = "pala_waste_management/expansion_1"
package.path = main_path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require('facility_configuration')

-- globals for tests
blower_ids = uid(2,2)
blower_labels = {'02'}
zone_ids = uid(9,16)
zone_labels = {
  ['09']='2-1',['10']='2-2',['11']='2-3',
  ['12']='2-4',['13']='2-5',['14']='2-6',
  ['15']='2-7',['16']='2-8'
}
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
  io['container02temp'] = 225
  reg = initializeRegisters()
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
  SETTINGS['MisterOnTime'] = 10
  SETTINGS['MisterOffTime'] = 30
  SETTINGS["MaxContainerTemp"] = 250
  emails_sent = 0
  -- with all zones offline, blower is turned off
  reg.zone09control = 0
  reg.zone10control = 0
  reg.zone11control = 0
  reg.blower02override = 0
  io.blower02run = 1
  io.blower02fault = 1
  io.blower02speed = 0
  io.duct02pressure = 4
  reg.duct02pressuresp = 1
  reg.duct02pressureavg = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower02run, 0)
  lu.assertEquals(io.blower02speed, 0)
  -- if a zone is online
  reg.zone09control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 34.5)
  lu.assertEquals(reg.blower02value, 34.5)
  -- if all the zones are online
  reg.zone10control = 1
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 34.5)
  lu.assertEquals(reg.blower02value, 34.5)
  -- with manual override enabled
  reg.blower02override = 1
  reg.blower02control = 1
  reg.blower02value = 70
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 70)
  reg.blower02control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower02run, 0)
  -- if there is a fault, the speed is set to 0
  reg.blower02override = 0
  io.blower02fault = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower02speed, 0)
  -- if blower is off and a zone is online, the blower will start
  io.blower02fault = 1
  io.blower02run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(io.blower02run, 1)
  lu.assertEquals(io.blower02speed, 34.5)

  -- test that percentage of zones with avg temps above setpoint greater than or equal to hot zone trigger will increase ductXpressuresp
  reg.duct02pressuresp = 6
  reg.zone09pAlvtemp = 160
  reg.zone09pBlvtemp = 165
  reg.zone10pAlvtemp = 145
  reg.zone10pBlvtemp = 150
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that positive aeration direction pressure setpoint max is respected
  reg.duct02pressuresp = 20
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], tonumber(SETTINGS["PressureSetpointMax"]))
  -- test that percentage of zones with avg temps below setpoint greater than or equal to cold zone trigger will decrease ductXpressuresp
  reg.duct02pressuresp = 8
  reg.zone09pAlvtemp = 40
  reg.zone09pBlvtemp = 45
  reg.zone10pAlvtemp = 50
  reg.zone10pBlvtemp = 55
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 6)
  -- test that positive aeration direction pressure setpoint min is respected
  reg.duct02pressuresp = 1
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], tonumber(SETTINGS["PressureSetpointMin"]))
  -- test that hot zone trigger takes precedence over cold zone trigger
  reg.duct02pressuresp = 4
  reg.zone09pAlvtemp = 130
  reg.zone09pBlvtemp = 135
  reg.zone10pAlvtemp = 30
  reg.zone10pBlvtemp = 35
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 6)
  -- test that ductXpressuresp increases from last captured value from ductXpressuresp
  updateDuctPressureAverages()
  updateBlowers()
  -- pressuresp changes on next updateBlowers call
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 6)
  reg.zone09pAlvtemp = 132
  reg.zone09pBlvtemp = 132
  reg.zone09pClvtemp = 132
  reg.zone09pDlvtemp = 132
  reg.zone10pAlvtemp = 132
  reg.zone10pBlvtemp = 132
  reg.zone10pClvtemp = 132
  reg.zone10pDlvtemp = 132
  reg.duct02presssptimer = 0
  updateDuctPressureAverages()
  updateBlowers()
  -- print(tonumber(SETTINGS["PressureSetpointChangeInterval"]))
  lu.assertEquals(reg['duct02pressuresp'], 8)
  -- test that only online zones are accounted for
  reg.duct02pressuresp = 6
  reg.zone09pAlvtemp = 30
  reg.zone09pBlvtemp = 35
  reg.zone10pAlvtemp = 30
  reg.zone10pBlvtemp = 35
  reg.duct02presssptimer = 0
  reg.zone11control = 0
  reg.zone12control = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 4)
  -- test that no pressuresp adjustments are made for blowers not running
  reg.duct02pressuresp = 6
  reg.zone09pAlvtemp = 30
  reg.zone09pBlvtemp = 35
  reg.zone10pAlvtemp = 30
  reg.zone10pBlvtemp = 35
  reg.duct02presssptimer = 0
  io.blower02run = 0
  updateDuctPressureAverages()
  updateBlowers()
  lu.assertEquals(reg['duct02pressuresp'], 6)
  -- Blowers shut off if their container gets too hot
  lu.assertEquals(emails_sent, 0)
  io.container02temp = 260
  reg['container02alarmage'] = 0
  io['blower02run'] = 1
  io['blower02speed'] = 80
  reg['blower02value'] = 1
  updateBlowers()
  lu.assertEquals(io['blower02run'], 0)
  lu.assertEquals(io['blower02speed'], 0)
  lu.assertEquals(reg['blower02value'], 0)
  lu.assertEquals(reg['container02alarmage'], 3600000)
  lu.assertEquals(emails_sent, 1)
  io.container02temp = 240
  io['blower02run'] = 1
  io['blower02speed'] = 100
  reg['blower02value'] = 100
  updateBlowers()
  lu.assertEquals(io['blower02run'], 1)
  lu.assertEquals(io['blower02speed'], 100)
  lu.assertEquals(reg['blower02value'], 100)
  lu.assertEquals(emails_sent, 1)
  lu.assertEquals(reg['container02alarmage'], 0)
  -- blowers stop, but email does not get sent whe alarm age is not at zero
  reg['container02alarmage'] = 10
  io.container02temp = 260
  io['blower02run'] = 1
  io['blower02speed'] = 80
  reg['blower02value'] = 1
  updateBlowers()
  lu.assertEquals(io['blower02run'], 0)
  lu.assertEquals(io['blower02speed'], 0)
  lu.assertEquals(reg['blower02value'], 0)
  lu.assertEquals(reg['container02alarmage'], 10)
  lu.assertEquals(emails_sent, 1)
  -- alarm age resets when temp goes below set max point
  io.container02temp = 240
  updateBlowers()
  lu.assertEquals(reg['container02alarmage'], 0)
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

function TestWebmacsScripts:test_update_epa_temp_averages()
  initSequence()
  SETTINGS['DataLoggingRate'] = 30
  SETTINGS['Zone09RegimeType'] = 'pfrp'
  SETTINGS['Zone10RegimeType'] = 'pfrp'
  SETTINGS['Zone11RegimeType'] = 'warmup'
  SETTINGS['Zone12RegimeType'] = 'warmup'
  SETTINGS['Zone13RegimeType'] = 'warmup'
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
    if zone_id == '09' or zone_id == '10' then
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
    lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Zone, Temperature A, Temperature B, Temperature C, Temperature D, Damper, Regime, Blower Speed, PFRP Time \n01/01/2017 12:00:00, 2-"..tonumber(zone_id)..", 128, 135, 0, 0, 45, Warm Up, 4320\n")
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
  reg['duct02pressureavg'] = 1
  first_10_values = {3.6, 4.0, 4.2 ,4.9, 5.5, 5.8, 6.0, 5.7, 5.9, 6.1}
  for k, value in pairs(first_10_values) do
    io.duct02pressure = value
    updateDuctPressureAverages()
  end
  lu.assertEquals(AVERAGE_ARRAYS['duct02pressureavg'], {6.1, 5.9, 5.7, 6, 5.8, 5.5, 4.9, 4.2, 4, 3.6})
  lu.assertEquals(reg['duct02pressureavg'], 5.17)
  --after 10 values, it starts rotating the table
  io.duct02pressure = 8.0
  updateDuctPressureAverages()
  lu.assertEquals(AVERAGE_ARRAYS['duct02pressureavg'], {8, 6.1, 5.9, 5.7, 6, 5.8, 5.5, 4.9, 4.2, 4})
  lu.assertEquals(reg['duct02pressureavg'], 5.61)
  --with no historic values, it is just the lastest value
  AVERAGE_ARRAYS['duct02pressureavg'] = {}
  io.duct02pressure = 9.8
  updateDuctPressureAverages()
  lu.assertEquals(AVERAGE_ARRAYS['duct02pressureavg'], {9.8})
  lu.assertEquals(io.duct02pressure, 9.8)
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

-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
