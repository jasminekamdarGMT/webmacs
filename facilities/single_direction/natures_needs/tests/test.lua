local lu = require('luaunit')
sqlite3 = require('lsqlite3complete')

facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "natures_needs"

-- special test env variables
has_blower_speed_control = true
luatest_running = true
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

local blower_ids = {'45', '16', '78', '90', '12', '34', '56'}
local zone_ids = {'14','15','16','17','18','19','20','21','22','23','24','25','26'}

function initIO()
  return {
    blower45fault = 1,
    blower16fault = 1,
    blower78fault = 1,
    blower90fault = 1,
    blower12fault = 1,
    blower34fault = 1,
    blower56fault = 1,
    stdout = io.stdout -- hack to expose stdout to luaunit
  }
end
io = initIO()
function initRegisters()
  local reg = {}
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'cycle'] = 0
    reg['blower'..blower_id..'control'] = 0
  end
  for i, zone_id in pairs(zone_ids) do
    reg['zone'..zone_id..'control'] = 0
    reg['zone'..zone_id..'avgtemp'] = 0
  end
  return reg
end
reg = initRegisters()

-- stubbed functions
-- function sleep(seconds) end

local emails_sent = 0
function email(message)
  last_email_subject = message.subj
  emails_sent = emails_sent + 1
end

-- stubbed time object and methods
time = {}
  function time:now()
  end

  function time:getComponents(ms)
    local components = {
      month = 1,
      mday = 1,
      year = 2017,
      hour = 12,
      min = 0,
      sec = 0,
      wday = 1,
      yday = 1,
      isdst = 1
    }
    return components
  end
-- end time table

-- stubbed file object and methods
test_files = {}
file = { filename = '', mode = '' }
  function file.open(filename, mode)
    file.filename = filename
    file.mode = mode
    if mode == 'w' or not test_files[filename] then
      test_files[filename] = ''
    end
    return file
  end
  function file:write(line)
    test_files[self.filename] = test_files[self.filename] .. line
  end
  function file:close() end
-- end file table

-- load controller files
package.path = package.path .. ';'..facility_path..'/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require('data_functions')
require('blower_functions')
require('damper_functions')
require('temp_functions')
require('facility_configuration')



TestWebmacsScripts = {}
  function TestWebmacsScripts:setUp()
    io = initIO()
    reg = initRegisters()
  end

  function TestWebmacsScripts:test_init_values()
    initValues()
    lu.assertEquals(_G['BLOWER_45']['control'], 100)
    lu.assertEquals(_G['TEMP_AVG_ARRAYS']['zone23'], {})
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
    io.zone21temp = 130
    updateLastValidTemps()
    lu.assertEquals(reg.zone21lvtemp, 130)
    -- io value is nil
    io.zone21temp = nil
    updateLastValidTemps()
    lu.assertEquals(reg.zone21lvtemp, 130)
    -- io value is >= 185
    io.zone21temp = 185
    updateLastValidTemps()
    lu.assertEquals(reg.zone21lvtemp, 130)
  end

  function TestWebmacsScripts:test_update_temp_averages()
    initSequence()
    first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
    for k, value in pairs(first_10_values) do
      io.zone19temp = value
      updateTempAverages()
    end
    lu.assertEquals(TEMP_AVG_ARRAYS['zone19'], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
    lu.assertEquals(reg['zone19avgtemp'], 110)
    --after 10 values, it starts rotating the table
    io.zone19temp = 80
    updateTempAverages()
    lu.assertEquals(TEMP_AVG_ARRAYS['zone19'], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
    lu.assertEquals(reg['zone19avgtemp'], 106)
    --with no historic values, it is just the lastest value
    TEMP_AVG_ARRAYS['zone19'] = {}
    io.zone19temp = 80
    updateTempAverages()
    lu.assertEquals(TEMP_AVG_ARRAYS['zone19'], {80})
    lu.assertEquals(reg.zone19avgtemp, 80)
  end

  function TestWebmacsScripts:test_update_blower_pid_values()
    initSequence()
    SETTINGS["MinVFDSpeed"] = "25"
    SETTINGS['BlowerRate'] = "2"
    SETTINGS["BlowerGain"] = "1"
    SETTINGS["BlowerIntegral"] = "1"
    SETTINGS["BlowerDerivative"] = "0.3"
    SETTINGS['Blower45TempSetPoint'] = "135"
    -- cold zone temps result in min vfd speed
    updateBlowerPIDValues(BLOWER_45, 120, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 65)
    updateBlowerPIDValues(BLOWER_45, 120, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 44.44)
    updateBlowerPIDValues(BLOWER_45, 120, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 25)
    -- warm zone temps result in increasing VFD speed
    updateBlowerPIDValues(BLOWER_45, 140, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 46.67)
    updateBlowerPIDValues(BLOWER_45, 140, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 51.85)
    updateBlowerPIDValues(BLOWER_45, 140, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 59.26)
    -- decreasing temps result in decreasing VFD speed
    updateBlowerPIDValues(BLOWER_45, 135, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 55)
    updateBlowerPIDValues(BLOWER_45, 130, SETTINGS['Blower45TempSetPoint'], SETTINGS['BlowerRate'])
    lu.assertEquals(BLOWER_45['control'], 43.89)
  end

  function TestWebmacsScripts:test_temp_average_for_zones()
    reg.zone17control = 1
    reg.zone17lvtemp = 120
    reg.zone18control = 1
    reg.zone18lvtemp = 140
    local avg = tempAvgForZones('17','18')
    lu.assertEquals(avg, 130)
    -- if a zone is offline, it is not included in average
    reg.zone17control = 0
    avg = tempAvgForZones('17','18')
    lu.assertEquals(avg, 140)
    reg.zone17control = 1
    reg.zone18control = 0
    avg = tempAvgForZones('17','18')
    lu.assertEquals(avg, 120)
    -- if both zones are offline, the return value is 0
    reg.zone17control = 0
    reg.zone18control = 0
    avg = tempAvgForZones('17','18')
    lu.assertEquals(avg, 0)
  end

  function TestWebmacsScripts:test_update_blowers()
    initSequence()
    -- with both zones offline, blower is turned off
    reg.zone14lvtemp = 135
    reg.zone15lvtemp = 135
    reg.zone14control = 0
    reg.zone15control = 0
    reg.blower45override = 0
    io.blower45run = 1
    io.blower45fault = 1
    reg.blower45cycle = 60 * 60
    updateBlowers()
    lu.assertEquals(io.blower45run, 0)
    lu.assertEquals(io.blower45speed, 0)
    -- if a zone is online
    reg.zone14control = 1
    reg.zone15control = 1
    io.blower45run = 1
    updateBlowers()
    lu.assertEquals(io.blower45run, 1)
    lu.assertEquals(io.blower45speed, 100)
    lu.assertEquals(reg.blower45value, 100)
    -- with manual override enabled
    reg.blower45override = 1
    reg.blower45control = 1
    reg.blower45value = 70
    updateBlowers()
    lu.assertEquals(io.blower45run, 1)
    lu.assertEquals(io.blower45speed, 70)
    reg.blower45control = 0
    updateBlowers()
    lu.assertEquals(io.blower45run, 0)
    -- if there is a fault, the spped is set to 0
    reg.blower45override = 0
    io.blower45fault = 0
    updateBlowers()
    lu.assertEquals(io.blower45speed, 0)
    -- if blower is off and a zone is online, the blower will start
    io.blower45fault = 1
    reg.zone14control = 1
    reg.zone15control = 0
    io.blower45run = 0
    updateBlowers()
    lu.assertEquals(io.blower45run, 1)
    lu.assertEquals(io.blower45speed, 100)
  end

  function TestWebmacsScripts:test_update_blower_run_value()
    initSequence()
    reg.blower78cycle = 60 * 60
    io.blower78run = 0
    updateBlowerRunValue('blower78', 1)
    lu.assertEquals(io.blower78run, 1)
    reg.blower78cycle = 60
    updateBlowerRunValue('blower78', 1)
    lu.assertEquals(io.blower78run, 0)
    reg.blower78cycle = 0
    updateBlowerRunValue('blower78', 1)
    lu.assertEquals(io.blower78run, 0)
    reg.blower78cycle = 60 * 60
    io.blower78run = 1
    updateBlowerRunValue('blower78', 1)
    updateBlowerRunValue('blower78', 0)
    lu.assertEquals(io.blower78run, 0)
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
    updateDamperPIDValues(DAMPER_90, 95, SETTINGS['DamperTempSetPoint'], SETTINGS['DamperRate'])
    lu.assertEquals(DAMPER_90['control'], 44.85)
    updateDamperPIDValues(DAMPER_90, 95, SETTINGS['DamperTempSetPoint'], SETTINGS['DamperRate'])
    lu.assertEquals(DAMPER_90['control'], 15)
    -- warm exhaust temps result in increasing damper position
    updateDamperPIDValues(DAMPER_90, 105, SETTINGS['DamperTempSetPoint'], SETTINGS['DamperRate'])
    lu.assertEquals(DAMPER_90['control'], 70.3)
    updateDamperPIDValues(DAMPER_90, 105, SETTINGS['DamperTempSetPoint'], SETTINGS['DamperRate'])
    lu.assertEquals(DAMPER_90['control'], 100)
    -- decreasing temps result in decreasing damper position
    updateDamperPIDValues(DAMPER_90, 98, SETTINGS['DamperTempSetPoint'], SETTINGS['DamperRate'])
    lu.assertEquals(math.floor(DAMPER_90['control']), 77)
    updateDamperPIDValues(DAMPER_90, 98, SETTINGS['DamperTempSetPoint'], SETTINGS['DamperRate'])
    lu.assertEquals(DAMPER_90['control'], 58)
  end

  function TestWebmacsScripts:test_update_dampers()
    initSequence()
    SETTINGS["MinDamperValue"] = "15"
    local blower_ids = {'45', '16', '78', '90', '12', '34', '56'}
    for i, blower_id in pairs(blower_ids) do
      reg['duct'..blower_id..'lvtemp'] = 95
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..blower_id]['control'], 44.85)
      updateDampers()
      lu.assertEquals(_G['DAMPER_'..blower_id]['control'], 15)
      lu.assertEquals(io['damper'..blower_id..'position'], 15)
    end
  end

  function TestWebmacsScripts:test_zone_controls()
    for i, zone_id in pairs(zone_ids) do
      -- with empty filename, creates new filename
      reg['zone'..zone_id..'control'] = 1
      reg['zone'..zone_id..'reset'] = 0
      _G['ZONE_'..zone_id]["file_name"] = ""
      updateZones()
      lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_zone'..zone_id..'.csv')
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Temperature \n")
      -- with zone reset active, creates new filename
      reg['zone'..zone_id..'reset'] = 1
      _G['ZONE_'..zone_id]["file_name"] = "/usb/oldfilename.csv"
      updateZones()
      lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_zone'..zone_id..'.csv')
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Temperature \n")
      lu.assertEquals(reg['zone'..zone_id..'reset'], 0)
      -- when print timer reaches zero, logs data and reset timer
      reg['zone'..zone_id..'print'] = 0
      reg['zone'..zone_id..'avgtemp'] = 128
      updateZones()
      lu.assertEquals(test_files[webmacs_db_path .. _G['ZONE_'..zone_id]["file_name"]], "Date/Time, Temperature \n01/01/2017 12:00:00, 128\n")
      lu.assertEquals(reg['zone'..zone_id..'print'], 7200)
      -- if all system is reset, zone values are loaded from db
      _G['ZONE_'..zone_id]["file_name"] = ""
      reg['zone'..zone_id..'control'] = 0
      initSequence()
      lu.assertEquals(reg['zone'..zone_id..'control'], 1)
      lu.assertEquals(_G['ZONE_'..zone_id]["file_name"], '01_01_2017_zone'..zone_id..'.csv')
    end
  end

  function TestWebmacsScripts:test_blower_fault_alarms()
    initSequence()
    local blower_labels = {'14/15', '16', '17/18', '19/20', '21/22', '23/24', '25/26'}
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
      lu.assertEquals(last_email_subject, "Alarm raised on Blower " .. blower_label .. "!")
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
      reg["zone"..zone_id.."avgtemp"] = 130
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
      -- if temp is outside bounds for 5 checks, alarm is sent
      reg["zone"..zone_id.."avgtemp"] = 180
      updateAlarms()
      updateAlarms()
      updateAlarms()
      updateAlarms()
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(last_email_subject, "Alarm raised on Zone " .. zone_id .. "!")
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
      lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 1)
      -- while alarm conditions persist, no additional emails are sent
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      -- return to normal temps resets alarm
      reg["zone"..zone_id.."avgtemp"] = 130
      updateAlarms()
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 0)
      -- with zone offline no alarms are triggered
      reg["zone"..zone_id.."control"] = 0
      reg["zone"..zone_id.."avgtemp"] = 180
      _G['ZONE_'..zone_id]['temp_in_alarm'] = 5
      _G['ZONE_'..zone_id]['email_sent'] = 0
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
    end
  end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
