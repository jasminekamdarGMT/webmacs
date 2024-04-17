--enableDebug()
if not webmacs_db_path then
  webmacs_db_path = '/usb/'
end

function createBatchFilesDB()
  local batch_files_db = sqlite3.open(webmacs_db_path .. "batch_files.db")
  batch_files_db:exec("CREATE TABLE batch_files (id INTEGER PRIMARY KEY, name)")
  if not luatest_running then print("Created Batch Files Database Successful") end
  batch_files_db:close()
end
createBatchFilesDB()

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

function createSettingsDB()
  local settings_db = sqlite3.open(webmacs_db_path .. "settings.db")
  settings_db:exec("CREATE TABLE settings (id INTEGER PRIMARY KEY, name, value)")
  initSettingsRow(settings_db, "DataLoggingRate", "120")
  initSettingsRow(settings_db, "FacilityName", "COWLITZ VALLEY COMPOST")
  initSettingsRow(settings_db, "PressureSetPoint", "6")
  initSettingsRow(settings_db, "PressureSetPoint2", "6")
  initSettingsRow(settings_db, "MaxPressure", "")
  initSettingsRow(settings_db, "MinPressure", "")
  initSettingsRow(settings_db, "MinVFDSpeed", "25")
  initSettingsRow(settings_db, "BlowerGain", "1")
  initSettingsRow(settings_db, "BlowerIntegral", "1.5")
  initSettingsRow(settings_db, "BlowerDerivative", "0")
  initSettingsRow(settings_db, "R1TempSetPoint", "131")
  initSettingsRow(settings_db, "R2TempSetPoint", "144")
  initSettingsRow(settings_db, "R3TempSetPoint", "134")
  initSettingsRow(settings_db, "R1Duration", "5")
  initSettingsRow(settings_db, "R2Duration", "7")
  initSettingsRow(settings_db, "ZoneGain", "1")
  initSettingsRow(settings_db, "ZoneIntegral", "1")
  initSettingsRow(settings_db, "ZoneDerivative", "0.3")
  initSettingsRow(settings_db, "ZoneRate", "120")
  initSettingsRow(settings_db, "MinDamperValue", "6")
  initSettingsRow(settings_db, "MaxTemperatureAlarm", "170")
  initSettingsRow(settings_db, "MinTemperatureAlarm", "0")
  if not luatest_running then print("Created Settings Database Successful") end
  settings_db:close()
end
createSettingsDB()

function initZoneStartupRow(zone_startup_db, name, state)
  if tableRowExists(zone_startup_db, "zone_startup", name) == false then
    zone_startup_db:exec([[INSERT INTO zone_startup VALUES (NULL, "]] .. name .. [[", "]] .. state .. [[")]])
  end
end

function createZoneStartupDB()
  local zone_startup_db = sqlite3.open(webmacs_db_path .. "zone_startup.db")
  zone_startup_db:exec("CREATE TABLE zone_startup (id INTEGER PRIMARY KEY, name, state)")
  for zone_number=1,10,1 do
    initZoneStartupRow(zone_startup_db, "zone" .. zone_number .. "control", "0")
    initZoneStartupRow(zone_startup_db, "zone" .. zone_number .. "regime", "0")
    initZoneStartupRow(zone_startup_db, "zone" .. zone_number .. "batch", "0")
    initZoneStartupRow(zone_startup_db, "zone" .. zone_number .. "filename", "")
    if not luatest_running then print("Added initial zone startup values for zone " .. zone_number) end
  end
  if not luatest_running then print("Created Zone Startup Database Successful") end
  zone_startup_db:close()
end
createZoneStartupDB()

function updateTempAverages()
  updateTempAverage("zone1")
  updateTempAverage("zone2")
  updateTempAverage("zone3")
  updateTempAverage("zone4")
  updateTempAverage("zone5")
  updateTempAverage("zone6")
  updateTempAverage("zone7")
  updateTempAverage("zone8")
  updateTempAverage("zone9")
  updateTempAverage("zone10")
end

function updateDamperAverages()
  updateDamperAverage("zone1")
  updateDamperAverage("zone2")
  updateDamperAverage("zone3")
  updateDamperAverage("zone4")
  updateDamperAverage("zone5")
  updateDamperAverage("zone6")
  updateDamperAverage("zone7")
  updateDamperAverage("zone8")
  updateDamperAverage("zone9")
  updateDamperAverage("zone10")
end

function updateAverages()
  updateTempAverages()
  updateDamperAverages()
end

if not luatest_running then
  sleep(20000) -- sleep 20 seconds, allowing other loops to initialize
  print('Starting temp average loop...')
  while true do
    sleep(6000) -- sleep 6 seconds
    updateAverages()
  end
end
