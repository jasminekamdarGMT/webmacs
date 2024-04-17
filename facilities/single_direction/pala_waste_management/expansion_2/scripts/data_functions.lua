SETTINGS = {}
UPDATE_PUMP_STARTUP_LATER = {}
init_complete = false

-- DATABASE FUNCTIONS

function dbOpen(db_file,db_reg_pref)
  local connection = sqlite3.open(webmacs_db_path..db_file)
  if connection ~= nil then
    reg[db_reg_pref..'inuse'] = 1
  end
  return connection
end

function dbClose(connection,db_reg_pref)
  connection:close()
  if connection ~= nil then
    reg[db_reg_pref..'inuse'] = 0
  end
end

function tableRowExists(db_handle, table, row_name)
  for row in db_handle:rows([[SELECT * FROM ]]..table..[[ WHERE name = "]]..row_name..[["]]) do
    return true
  end
  return false
end

function insertTableRow(db_handle, table, values)
  local query = [[INSERT INTO ]]..table..[[ VALUES (NULL]]
  for i, value in ipairs(values) do
    query = query..[[, "]]..value..[["]]
  end
  db_handle:exec(query..[[)]])
end

function createMissingSettings()
  local settings_db = dbOpen("settings.db",'settings')
  settings_db:exec("CREATE TABLE settings (id INTEGER PRIMARY KEY, name, value)")
  for k, v in pairs(defaultSettings()) do
    if tableRowExists(settings_db, "settings", k) == false then
      insertTableRow(settings_db, 'settings', {k, v})
    end
  end
  dbClose(settings_db,'settings')
end

function loadSettings()
	local settings_db = dbOpen("settings.db",'settings')
	for row in settings_db:rows('SELECT * FROM settings') do
		SETTINGS[row[2]] = row[3]
	end
	dbClose(settings_db,'settings')
end

function initPumpStartupRow(pump_startup_db, name, state)
  if tableRowExists(pump_startup_db, "pump_startup", name) == false then
    insertTableRow(pump_startup_db, 'pump_startup', {name, state})
  end
end

function createPumpStartupDB()
  local pump_startup_db = dbOpen("pump_startup.db",'pumpstartup')
  pump_startup_db:exec("CREATE TABLE pump_startup (id INTEGER PRIMARY KEY, name, state)")
  for i, pump_id in ipairs(PUMP_IDS) do
    initPumpStartupRow(pump_startup_db, "pump"..pump_id.."filename", "")
    if not luatest_running then print("Init ".."pump"..pump_id..item) end
    if not luatest_running then print("Init "..pump_id) end
  end
  if not luatest_running then print("Created Pump Startup Database") end
  dbClose(pump_startup_db,'pumpstartup')
end

function getPumpState(pstartup, name)
  local state = ""
  for row in pstartup:rows("SELECT * FROM pump_startup WHERE name = '"..name.."'") do
    state = row[3]
  end
  return state
end

function startupPumps()
  local pstartup = dbOpen("pump_startup.db",'pumpstartup')
  for i, pump_id in ipairs(PUMP_IDS) do
    _G['PUMP_'..pump_id]['file_name'] = getPumpState(pstartup, "pump"..pump_id..'filename')
  end
  dbClose(pstartup,'pumpstartup')
end

function setFileName(PUMP, pump_id)
  local batch = ''
  local pump_label = PUMP_LABELS[pump_id]
  nowTime = time.getComponents(time.now())
  PUMP["file_name"] = string.format("%02d_%02d_%02d_%02d%02d%02d", nowTime.month, nowTime.mday, nowTime.year, nowTime.hour, nowTime.min, nowTime.sec).."_"..pump_label..".csv"
  batch = PUMP["file_name"]
  local bfiles = dbOpen("pump_startup.db",'pumpfiles')
  if bfiles ~= nil then
    if tableRowExists(bfiles, "pump_startup", PUMP["file_name"]) == false then
      insertTableRow(bfiles, 'pump_startup', {PUMP["file_name"], batch})
    end
  end
  dbClose(bfiles,'pumpfiles')
  if bfiles then
    local fh = file.open(batch_logs_path..PUMP["file_name"], "w")
    if fh ~= nil then
      local output = "Date/Time, Message"
      fh:write(output.." \n")
      fh:close()
    end
  end
end

function updatePumpStartup(PUMP, pump_id)
  local pump_pref = "pump"..pump_id
  local pstartup = dbOpen("pump_startup.db",'pumpstartup')
  if pstartup == nil then
    table.insert(UPDATE_PUMP_STARTUP_LATER, pump_id)
  else
    local filename = getPumpState(pstartup, pump_pref.."filename")
    local batch = getPumpState(pstartup, pump_pref.."batch")
    local query = [[UPDATE pump_startup SET state="]]..PUMP['file_name']..[[" WHERE name="]]..pump_pref.."filename"..[[";]]
    pstartup:exec(query)
    dbClose(pstartup,'pumpstartup')
  end
end

function getBlowerState(bstartup, name)
  local state = ""
  for row in bstartup:rows("SELECT * FROM blower_startup WHERE name = '"..name.."'") do
    state = row[3]
  end
  return state
end

function setRegsFromState(register,value)
  if reg[register] ~= nil then
    reg[register] = value
  end
end

-- END DATABASE FUNCTIONS

-- FUNCTION TO COPY DATABASES FROM USB TO INTERNAL STORAGE

-- function copyExistingDBs()
--   local db_files = {"batch_files.db","blower_startup.db","settings.db","pump_startup.db"}
--   for i, db_file in ipairs(db_files) do
--     filename = "/usb/"..db_file
--     infile = file.open(filename, "r")
--     db_data = infile:read("*a")
--     infile:close()
--     file_destination = file.open(db_file, "r")
--     if file_destination == nil or file_destination:seek("end") == 0 then -- ensures file does not exist already to prevent overwriting existing dbs
--       print('Copying file '..filename..' to internal storage')
--       outfile = file.open(db_file, "w")
--       outfile:write(db_data)
--       outfile:close()
--     end
--   end
-- end

-- END FUNCTION TO COPY DATABASES FROM USB TO INTERNAL STORAGE
function uid(first_id,last_id,prefix)
  local ids = {}

  if last_id == nil then
    last_id = first_id
    first_id = 1
  end

  for i = first_id,last_id,1 do
    local id = i
    if prefix ~= nil then
      id = prefix..i
    else
      id = string.format("%02d",i)
    end
    table.insert(ids,id)
  end

  return ids
end

function logInsert(t,value)
  if value == 'nan' or (type(value) == 'number' and value < 0) then
    value = 0
  end
  if value ~= value then
    value = 0
  end
  table.insert(t,value)
end

function sortTableAsc(t)
  local done = false
  local sorted = t

  repeat
    done = true
    for i,v in pairs(sorted) do
      if sorted[i - 1] ~= nil then
        if sorted[i - 1] > sorted[i] then
          done = false
          local tmp = sorted[i - 1]
          sorted[i - 1] = sorted[i]
          sorted[i] = tmp
        end
      end
    end
  until(done)

  return sorted
end

function updatePumpsLater()
  local items = UPDATE_PUMP_STARTUP_LATER
  UPDATE_PUMP_STARTUP_LATER = {}
  for i,zn_id in pairs(items) do
    updatePumpStartup(_G['PUMP_'..zn_id], zn_id)
  end
end

-- FUNCTION TO DELETE DEPRECATED FACILITY SETTINGS
-- call this function in the initSequence function after the createMissingSettings function
-- function deleteSettings()
--   local settings_to_delete = {} -- add settings that should be deleted here
-- 	local settings_db = dbOpen("settings.db",'settings')
--   for _,setting_name in pairs(settings_to_delete) do
--     settings_db:exec('DELETE FROM settings WHERE name="'..setting_name..'"')
--   end
-- 	dbClose(settings_db,'settings')
-- end
-- END FUNCTION TO DELETE DEPRECATED FACILITY SETTINGS

function initSequence()
  if not webmacs_db_path then
    webmacs_db_path = '/usb/'
  end
  if not batch_logs_path then
    batch_logs_path = '/usb/'
  end
  initValues()
  createMissingSettings()
  createPumpStartupDB()
  startupPumps()
  init_complete = true
end

if not luatest_running then
  sleep(10000)
  initSequence()
  while init_complete do
    if #UPDATE_PUMP_STARTUP_LATER > 0 then
      sleep(2000)
      updatePumpsLater()
    else
      sleep(6000)
      updatePumps()
    end
  end
end
