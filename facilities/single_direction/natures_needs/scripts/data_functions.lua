SETTINGS = {}
TEMP_AVG_ARRAYS = {}
init_complete = false

if not webmacs_db_path then
  webmacs_db_path = '/usb/'
end

function tableRowExists(db_handle, table, row_name)
  for row in db_handle:rows([[SELECT * FROM ]] .. table .. [[ WHERE name = "]] .. row_name .. [["]]) do
    return true
  end
  return false
end

function initSettingsRow(settings_db, name, value)
  if tableRowExists(settings_db, "settings", name) == false then
    settings_db:exec([[INSERT INTO settings VALUES (NULL, "]] .. name .. [[", "]] .. value .. [[")]])
  end
end

function createMissingSettings()
  local settings_db = sqlite3.open(webmacs_db_path .. "settings.db")
  settings_db:exec("CREATE TABLE settings (id INTEGER PRIMARY KEY, name, value)")
  for k, v in pairs(defaultSettings()) do
    initSettingsRow(settings_db, k, v)
  end
  settings_db:close()
end

function loadSettings()
	local db = sqlite3.open(webmacs_db_path .. "settings.db");

	for row in db:rows('SELECT * FROM settings') do
		SETTINGS[row[2]] = row[3]
	end
	
	db:close()
end

function createBatchFilesDB()
  local batch_files_db = sqlite3.open(webmacs_db_path .. "batch_files.db")
  batch_files_db:exec("CREATE TABLE batch_files (id INTEGER PRIMARY KEY, name)")
  if not luatest_running then print("Created Batch Files Database Successful") end
  batch_files_db:close()
end

function initZoneStartupRow(zone_startup_db, name, state)
  if tableRowExists(zone_startup_db, "zone_startup", name) == false then
    zone_startup_db:exec([[INSERT INTO zone_startup VALUES (NULL, "]] .. name .. [[", "]] .. state .. [[")]])
  end
end

function createZoneStartupDB()
  local zone_startup_db = sqlite3.open(webmacs_db_path .. "zone_startup.db")
  zone_startup_db:exec("CREATE TABLE zone_startup (id INTEGER PRIMARY KEY, name, state)")
  for i, zone_id in ipairs(ZONE_IDS) do
    initZoneStartupRow(zone_startup_db, "zone" .. zone_id .. "control", "0")
    initZoneStartupRow(zone_startup_db, "zone" .. zone_id .. "filename", "")
    if not luatest_running then print("Added initial zone startup values for zone " .. zone_id) end
  end
  if not luatest_running then print("Created Zone Startup Database Successful") end
  zone_startup_db:close()
end

function getZoneState(zstartup, name)
  local state = ""
  for row in zstartup:rows("SELECT * FROM zone_startup WHERE name = '" .. name .. "'") do
    state = row[3]
  end
  return state
end

function startupZones()
  local zstartup = sqlite3.open(webmacs_db_path .. "zone_startup.db")

  for i, zone_id in ipairs(ZONE_IDS) do
    reg['zone'..zone_id..'control'] = getZoneState(zstartup, 'zone' .. zone_id .. 'control')
    _G['ZONE_' .. zone_id]['file_name'] = getZoneState(zstartup, 'zone' .. zone_id .. 'filename')
  end

  zstartup:close()
end

function updateZoneStartup(ZONE, zone_id)
  local zstartup = sqlite3.open(webmacs_db_path .. "zone_startup.db")
  zone_control = reg['zone'..zone_id..'control']
  zone_filename = ZONE['file_name']
  local query = [[UPDATE zone_startup SET state=]] .. zone_control .. [[ WHERE name="zone]] .. zone_id .. [[control";
    UPDATE zone_startup SET state="]] .. zone_filename .. [[" WHERE name="zone]] .. zone_id .. [[filename";
    ]]
  zstartup:exec(query)
  zstartup:close()
end

function initBlower(blower_id)
  local BLOWER = {}
  BLOWER["prev_error"] = 0
  BLOWER["int_error"] = 0
  BLOWER["control"] = 100
  BLOWER["fault_email"] = 0
  _G['BLOWER_'..blower_id] = BLOWER
end

function initDamper(damper_id)
  local DAMPER = {}
  DAMPER["prev_error"] = 0
  DAMPER["int_error"] = 0
  DAMPER["control"] = 0
  _G['DAMPER_'..damper_id] = DAMPER
end

function initZone(zone_id)
  local ZONE = {}
  ZONE["temp_in_alarm"] = 0
  ZONE["email_sent"] = 0
  _G['ZONE_'..zone_id] = ZONE
end

function initTempAverage(temp_prefix)
  TEMP_AVG_ARRAYS[temp_prefix] = {}
end

function defaultSettings()
  local settings = {}
  settings["DataLoggingRate"] = "120"
  settings["FacilityName"] = "COWLITZ VALLEY COMPOST"
  settings["MinVFDSpeed"] = "25"
  settings["BlowerGain"] = "1"
  settings["BlowerIntegral"] = "1"
  settings["BlowerDerivative"] = "0.3"
  settings["BlowerRate"] = "2"
  settings["BlowerCycleTotalTime"] = "60"
  settings["BlowerCycleOffTime"] = "5"
  settings["Blower45TempSetPoint"] = "135"
  settings["Blower16TempSetPoint"] = "135"
  settings["Blower78TempSetPoint"] = "135"
  settings["Blower90TempSetPoint"] = "135"
  settings["Blower12TempSetPoint"] = "135"
  settings["Blower34TempSetPoint"] = "135"
  settings["Blower56TempSetPoint"] = "135"
  settings["DamperGain"] = "1"
  settings["DamperIntegral"] = "1"
  settings["DamperDerivative"] = "0.3"
  settings["DamperRate"] = "10"
  settings["DamperTempSetPoint"] = "100"
  settings["MinDamperValue"] = "6"
  settings["MaxTemperatureAlarm"] = "170"
  settings["MinTemperatureAlarm"] = "0"
  return settings
end

function setFileName(ZONE, zone)
  ZONE["file_name"] = string.format("%02d_%02d_%02d", nowTime.month, nowTime.mday, nowTime.year) .. "_" .. zone .. ".csv"
  --add to batch files database
  local bfiles = sqlite3.open(webmacs_db_path .. "batch_files.db")
  local query = [[DELETE FROM batch_files WHERE name="]] .. ZONE["file_name"].. [["; INSERT INTO batch_files VALUES (NULL, "]] .. ZONE["file_name"].. [[");]]
  bfiles:exec(query)
  bfiles:close()
  --write inital labels
  local fh = file.open(webmacs_db_path .. ZONE["file_name"], "w")
  if fh ~= nil then
    fh:write("Date/Time, Temperature \n")
    fh:close()
  end
end

function printData(filename, temp)
  local fh = file.open(webmacs_db_path .. filename, "a")
  if fh ~= nil then
    fh:write(string.format("%02d/%02d/%02d %02d:%02d:%02d", nowTime.month, nowTime.mday, nowTime.year, nowTime.hour, nowTime.min, nowTime.sec) .. ", " .. temp .. "\n")
    fh:close()
  end
end

function updateZone(ZONE, zone_id)
  local zone_prefix = "zone"..zone_id
  if reg[zone_prefix.."control"] == 1 then
    nowTime = time.getComponents(time.now())
    if reg[zone_prefix.."reset"] == 1 or ZONE["file_name"] == "" then
      reg[zone_prefix.."reset"] = 0
      setFileName(ZONE, zone_prefix)
      updateZoneStartup(ZONE, zone_id)
    elseif reg[zone_prefix.."print"] == 0 then
      if reg[zone_prefix .. 'avgtemp'] > 0 then
        reg[zone_prefix .. 'print'] = SETTINGS["DataLoggingRate"] * 60
        printData(ZONE["file_name"], reg[zone_prefix .. 'avgtemp'])
        updateZoneStartup(ZONE, zone_id)
      end
    end
  else
    if reg[zone_prefix.."print"] == 0 then
      reg[zone_prefix .. 'print'] = SETTINGS["DataLoggingRate"] * 60
      updateZoneStartup(ZONE, zone_id)
    end
  end
end

function sendAlarm(desc, reading)
  emailDef = {
    rcpt = "grp.admin",
    subj = [[Alarm raised on ]] .. desc .. [[!]],
    body = [[An alarm was raised on ]] .. desc .. [[.  The reading is: ]] .. reading .. [[.]]
  }
  email(emailDef)
end

function initSequence()
  initValues()
  createMissingSettings()
  createBatchFilesDB()
  createZoneStartupDB()
  startupZones()
  loadSettings()
  init_complete = true
end

if not luatest_running then
  sleep(10000)
  initSequence()

  while init_complete do
    sleep(10000)
    updateZones()
  end
end
