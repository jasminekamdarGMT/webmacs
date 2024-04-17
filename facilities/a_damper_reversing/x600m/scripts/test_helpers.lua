local json = require ("cjson")
sqlite3 = require('lsqlite3complete')

-- special test env variables
luatest_running = true
facilities_dir = 'facilities/';
webmacs_db_path = facility_path..facility_name..'/tests/'
batch_logs_path = webmacs_db_path
os.execute("rm " .. webmacs_db_path .. "*.db")

-- mock httpRequest functions
mock_wireless_data_file = facility_path..facility_name.."/mocks/point_six_data.xml"
function loadMockWirelessData()
  local file = io.open(mock_wireless_data_file , "r" )
  if file then
    local contents = file:read( "*a" )
    io.close( file )
    return contents, 200
  else
    return nil, 404
  end
end
-- local http = require("socket.http")
last_response = nil
TIMEOUT = 1
function httpRequest(url, timeoutMilliseconds)
  last_response = nil
  -- local response, status = http.request(url)
  local response, status = loadMockWirelessData()
  if status == 200 then
    last_response = response
    return string.len(response)
  else
    return 0
  end
end
function responseIndexOf(start, searchStr)
  local index = string.find(last_response, searchStr, start, true)
  if index ~= nil then
    index = index - 1 - start
  end
  return index
end
function responseSubstr(startpos, endpos)
  if type(endpos) == 'string' then
    endpos = #endpos
  end
  return string.sub(last_response, startpos+1, endpos)
end
-- end of mock httpRequest functions

-- start mock tcpConnect functions
function tcpConnect(hostName, port, timeoutMilliseconds)
  return 1
end
function tcpSend(msg)
  local cmd = string.sub(msg, 2, #msg - 1)
  if cmd == 'S' then
    last_response = "S,1,032119155129,na,na,0,0,0,0,0"
  elseif cmd == 'CSR1' then
    last_response = "CSR1,28,0000000050B04AE3,1Analog_2(A0.17582,-328.00000,F,1,0,0)(A0.17582,-328.00000,F,1,0,0)"
  elseif cmd == 'D1' then
    last_response = string.char(02).."D1,F2800252FFF70.9|F-327.5"..string.char(13)
  end
  return 1
end
function tcpRecv()
  if last_response ~= nil then
    return last_response
  else
    return ""
  end
end
function tcpClose()
  return
end
--end mock tcpConnect functions

-- stubbed functions
-- function sleep(seconds) end

emails_sent = 0
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

-- mock updating zone batch title
function updateZoneBatchTitle (zone_id, batch_title)
    local zone_startup_db = dbOpen("zone_startup.db",'zonestartup')
    query = "UPDATE zone_startup SET `state`='"..batch_title.."' WHERE `name`='"..'zone'..zone_id..'batch'.."';";
    zone_startup_db:exec(query)
    dbClose(zone_startup_db,'zonestartup')
end
-- end mock updating zone batch title

function loadStateNames()
  local file = io.open( facility_path..facility_name.."/mocks/state.json", "r" )
  if file then
    local contents = file:read( "*a" )
    local state = json.decode(contents);
    io.close( file )
    return state
  end
end
state_names = loadStateNames()

function var_names_are_valid()
  local reserved = {stdout=1, open=1, close=1}

  for name, value in pairs(io) do
    if string.len(name) > 20 then
      print('io name too long: '..name)
      return false
    end
    if not state_names[name] and not reserved[name] then
      print('io name not in state.json file: '..name)
      return false
    end
  end

  for name, value in pairs(reg) do
    if string.len(name) > 20 then
      print('register name too long: '..name)
      return false
    end
    if not state_names[name] and not reserved[name] then
      print('register name not in state.json file: '..name)
      return false
    end
  end

  return true
end

function initIO()
  local io = {
    stdout = io.stdout, -- hack to expose stdout to luaunit
    open = io.open, -- hack to expose open to luaunit
    close = io.close -- hack to expose close to luaunit
  }
  if appendFacilityIO ~= nil then
    appendFacilityIO(io)
  end
  return io
end
io = initIO()

function initRegisters()
  local reg = {}
  for i, blower_id in pairs(blower_ids) do
    if blower_direction_control then
      reg['blower'..blower_id..'direction'] = 0
      reg['blower'..blower_id..'revtimer'] = 0
      reg['blower'..blower_id..'idletimer'] = 0
      reg['blower'..blower_id..'revoverride'] = 0
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
reg = initRegisters()
