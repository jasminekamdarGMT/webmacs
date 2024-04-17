local str__control,
str__blower,
str__zone,
str__duct,
str__biofilter,
str__regime,
str__regtimer,
str__direction,
str__override,
str__revoverride,
str__cycle,
str__customcycle,
str__cycleontime,
str__cycleofftime,
str__idletimer,
str__revtimer,
str__pressuresp,
str__pospressuresp,
str__negpressuresp,
str__presssptimer,
str__mistdelay,
str__misttimer,
str__pfrptime =
"control",
"blower",
"zone",
"duct",
"biofilter",
"regime",
"regtimer",
"direction",
"override",
"revoverride",
"cycle",
"customcycle",
"cycleontime",
"cycleofftime",
"idletimer",
"revtimer",
"pressuresp",
"pospressuresp",
"negpressuresp",
"presssptimer",
"mistdelay",
"misttimer",
"pfrptime"

SETTINGS = {}
WIRELESS_POINT_FAILURES = {}
UPDATE_ZONE_STARTUP_LATER = {}
init_complete = false

local zstartup_items = {
  str__control,
  "filename",
  "batch",
  str__regime,
  str__regtimer,
  str__pfrptime,
  "print",
  "movedfrom",
  "prelzbloweroverride",
  "prelzblowervalue",
  "prelzblowerdirection",
  "prelzblowerrevoverride",
  "prelzdamperoverride",
  "prelzdampervalue"
}

local bstartup_items = {
  str__direction,
  str__control,
  str__override,
  str__revoverride,
  str__cycle,
  str__customcycle,
  str__cycleontime,
  str__cycleofftime,
  str__idletimer,
  str__revtimer,
  "value",
  "revlogic",
  "prerevspeed"
}

local bstartup_duct_regs = {
  str__pressuresp,
  str__pospressuresp,
  str__negpressuresp,
  str__presssptimer
}

local bstartup_biofilter_regs = {
  str__mistdelay,
  str__misttimer
}

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

function createBatchFilesDB()
  local batch_files_db = dbOpen("batch_files.db",'batchfiles')
  batch_files_db:exec("CREATE TABLE batch_files (id INTEGER PRIMARY KEY, name, title)")
  if not luatest_running then print("Created Batch Files Database") end
  dbClose(batch_files_db,'batchfiles')
end

function initZoneStartupRow(zone_startup_db, name, state)
  if tableRowExists(zone_startup_db, "zone_startup", name) == false then
    insertTableRow(zone_startup_db, 'zone_startup', {name, state})
  end
end

function createZoneStartupDB()
  local zone_startup_db = dbOpen("zone_startup.db",'zonestartup')
  zone_startup_db:exec("CREATE TABLE zone_startup (id INTEGER PRIMARY KEY, name, state)")
  for i, zone_id in ipairs(ZONE_IDS) do
    for i,item in ipairs(zstartup_items) do
      local zone_pref = str__zone..zone_id
      local regval = "0"
      if item == 'batch' or item == 'filename' then
        regval = ""
      end
      initZoneStartupRow(zone_startup_db, zone_pref..item, regval)
      if not luatest_running then print("Init "..zone_pref..item) end
    end
    if not luatest_running then print("Init "..zone_id) end
  end
  if not luatest_running then print("Created Zone Startup Database") end
  dbClose(zone_startup_db,'zonestartup')
end

function getZoneState(zstartup, name)
  local state = ""
  for row in zstartup:rows("SELECT * FROM zone_startup WHERE name = '"..name.."'") do
    state = row[3]
  end
  return state
end

function startupZones()
  local zstartup = dbOpen("zone_startup.db",'zonestartup')
  for i, zone_id in ipairs(ZONE_IDS) do
    for i,item in ipairs(zstartup_items) do
      local zone_pref = str__zone..zone_id
      if item == 'filename' then
        _G['ZONE_'..zone_id]['file_name'] = getZoneState(zstartup, zone_pref..item)
      elseif item == 'batch' then
        setRegsFromState(zone_pref..item,getZoneState(zstartup, zone_pref..item))
      else
        setRegsFromState(zone_pref..item,tonumber(getZoneState(zstartup, zone_pref..item)))
      end
    end
  end
  dbClose(zstartup,'zonestartup')
end

function updateZoneStartup(ZONE, zone_id)
  local zone_pref = str__zone..zone_id
  local zstartup = dbOpen("zone_startup.db",'zonestartup')
  if zstartup == nil then
    table.insert(UPDATE_ZONE_STARTUP_LATER, zone_id)
  else
    local filename = getZoneState(zstartup, zone_pref.."filename")
    local batch = getZoneState(zstartup, zone_pref.."batch")
    local query = ""
    local regval = ""
    for i,item in ipairs(zstartup_items) do
      if string.sub(item,1,5) ~= 'prelz' then
        if item == "filename" then
          regval = ZONE['file_name']
          filename = regval
        elseif item == "batch" then
          regval = batch
          if filename == "" and ZONE['file_name'] == "" then
            regval = ""
          elseif regval == "" then
            local sections = {}
            if filename == "" then
              filename = ZONE['file_name']
            end
            for section in filename:gmatch("([^_]+)") do
              table.insert(sections, section)
            end
            if #sections > 4 then
              local title = sections[#sections]
              regval = string.sub(title,1,#title-4)
            end
          end
        elseif reg[zone_pref..item] ~= nil then
          regval = tonumber(reg[zone_pref..item])
        end
        query = query..[[UPDATE zone_startup SET state="]]..regval..[[" WHERE name="]]..zone_pref..item..[[";]]
      end
    end
    zstartup:exec(query)
    dbClose(zstartup,'zonestartup')
  end
end

function initBlowerStartupRow(blower_startup_db, name, state)
  if tableRowExists(blower_startup_db, "blower_startup", name) == false then
    insertTableRow(blower_startup_db, 'blower_startup', {name, state})
  end
end

function createBlowerStartupDB()
  local blower_startup_db = dbOpen("blower_startup.db",'blowerstartup')
  blower_startup_db:exec("CREATE TABLE blower_startup (id INTEGER PRIMARY KEY, name, state)")
  for i, blower_id in ipairs(BLOWER_IDS) do
    local bl_pref = str__blower..blower_id
    local duct_pref = str__duct..blower_id
    local biofilter_pref = str__biofilter..blower_id
    for i,item in ipairs(bstartup_items) do
      initBlowerStartupRow(blower_startup_db, bl_pref..item, "0")
      if not luatest_running then print("Init "..bl_pref..item) end
    end
    for i,item in ipairs(bstartup_duct_regs) do
      initBlowerStartupRow(blower_startup_db, duct_pref..item, "0")
      if not luatest_running then print("Init "..duct_pref..item) end
    end
    for i,item in ipairs(bstartup_biofilter_regs) do
      initBlowerStartupRow(blower_startup_db, biofilter_pref..item, "0")
      if not luatest_running then print("Init "..biofilter_pref..item) end
    end
    if not luatest_running then print("Init "..blower_id) end
  end
  if not luatest_running then print("Created Blower Startup Database") end
  dbClose(blower_startup_db,'blowerstartup')
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

function startupBlowers()
  local bstartup = dbOpen("blower_startup.db",'blowerstartup')
  for i, blower_id in ipairs(BLOWER_IDS) do
    local bl_pref = str__blower..blower_id
    local duct_pref = str__duct..blower_id
    local biofilter_pref = str__biofilter..blower_id
    for i,item in ipairs(bstartup_items) do
      setRegsFromState(bl_pref..item,tonumber(getBlowerState(bstartup, bl_pref..item)))
    end
    for i,item in ipairs(bstartup_duct_regs) do
      setRegsFromState(duct_pref..item,tonumber(getBlowerState(bstartup, duct_pref..item)))
    end
    for i,item in ipairs(bstartup_biofilter_regs) do
      setRegsFromState(biofilter_pref..item,tonumber(getBlowerState(bstartup, biofilter_pref..item)))
    end
  end
  dbClose(bstartup,'blowerstartup')
end

function updateBlowerStartup(BLOWER, blower_id)
  local bstartup = dbOpen("blower_startup.db",'blowerstartup')
  if bstartup == nil then
    table.insert(UPDATE_BLOWER_STARTUP_LATER, blower_id)
  else
    local query = ""
    local regval
    local bl_pref = str__blower..blower_id
    local duct_pref = str__duct..blower_id
    local biofilter_pref = str__biofilter..blower_id
    for i,item in ipairs(bstartup_items) do
      regval = reg[bl_pref..item]
      if regval ~= nil then
        query = query..[[UPDATE blower_startup SET state="]]..regval..[[" WHERE name="]]..bl_pref..item..[[";]]
      end
    end
    for i,item in ipairs(bstartup_duct_regs) do
      regval = reg[duct_pref..item]
      if regval ~= nil then
        query = query..[[UPDATE blower_startup SET state="]]..regval..[[" WHERE name="]]..duct_pref..item..[[";]]
      end
    end
    for i,item in ipairs(bstartup_biofilter_regs) do
      regval = reg[biofilter_pref..item]
      if regval ~= nil then
        query = query..[[UPDATE blower_startup SET state="]]..regval..[[" WHERE name="]]..biofilter_pref..item..[[";]]
      end
    end
    bstartup:exec(query)
    dbClose(bstartup,'blowerstartup')
  end
end

-- END DATABASE FUNCTIONS

-- FUNCTION TO COPY DATABASES FROM USB TO INTERNAL STORAGE

-- function copyExistingDBs()
--   local db_files = {"batch_files.db","blower_startup.db","settings.db","zone_startup.db"}
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

function updateEPATempAverages(zn_id,probe_ids)
  local can_count = false
  local zone_regime_type = SETTINGS["Zone"..zn_id.."RegimeType"]
  if zone_regime_type == nil or zone_regime_type == "pfrp" then
    can_count = true
  end
  if COUNT_PFRP_IN_WARMUP_ZONE and reg[str__zone..zn_id..'regime'] == 2 then
    can_count = true
  end
  if can_count then
    local avg_temp,
          max_temp,
          min_temp,
          valid_avg_temps,
          pfrp_duration,
          curr_pfrp_time =
          0,
          0,
          0,
          0,
          4320,
          reg[str__zone..zn_id..str__pfrptime]
    local valid_temps = {}
    for n,temp_prefix in ipairs(getTempPrefixes(str__zone,zn_id,probe_ids)) do
      local temp = reg[temp_prefix.."avgtemp"]
      table.insert(valid_temps,temp)
      avg_temp = avg_temp + temp
    end
    if #valid_temps > 0 then
      valid_temps = sortTableAsc(valid_temps)
      min_temp = valid_temps[1]
      max_temp = valid_temps[#valid_temps]
      avg_temp = avg_temp / #valid_temps
    end
    local check_temp = avg_temp
    if PFRP_AGGREGATE ~= nil then
      if PFRP_AGGREGATE == 'min' then
        check_temp = min_temp
      elseif PFRP_AGGREGATE == 'max' then
        check_temp = max_temp
      end
    end
    if curr_pfrp_time < pfrp_duration then
      if check_temp < PFRP_TEMP then
        reg[str__zone..zn_id..str__pfrptime] = 0
      else
        reg[str__zone..zn_id..str__pfrptime] = curr_pfrp_time + SETTINGS['DataLoggingRate']
      end
    end
  end
end

function updateZonesLater()
  local items = UPDATE_ZONE_STARTUP_LATER
  UPDATE_ZONE_STARTUP_LATER = {}
  for i,zn_id in pairs(items) do
    updateZoneStartup(_G['ZONE_'..zn_id], zn_id)
  end
end

function updateBlowersLater()
  local items = UPDATE_BLOWER_STARTUP_LATER
  UPDATE_BLOWER_STARTUP_LATER = {}
  for i,blwr_id in pairs(items) do
    updateBlowerStartup(_G['BLOWER_'..blwr_id], blwr_id)
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
  sendInitAlarm()
  if not webmacs_db_path then
    webmacs_db_path = '/usb/'
  end
  if not batch_logs_path then
    batch_logs_path = '/usb/'
  end
  initValues()
  createMissingSettings()
  createBatchFilesDB()
  createZoneStartupDB()
  startupZones()
  if BLOWER_IDS ~= nil then
    createBlowerStartupDB()
    startupBlowers()
  end
  loadSettings()
  init_complete = true
end

if not luatest_running then
  sleep(10000)
  initSequence()
  while init_complete do
    if #UPDATE_ZONE_STARTUP_LATER > 0 then
      sleep(2000)
      updateZonesLater()
    else
      sleep(6000)
      updateZones()
    end
  end
end
