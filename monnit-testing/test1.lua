print('test1.lua')

SINGLE_WIRE_SENSOR_MAX_VALID_TEMP = 184
AVERAGE_ARRAYS = {}
SENSORS = {}

function retrieveWirelessSensorDataTCP()
  print("will it work???")
  SENSORS = {}
  local TRX = string.char(0x00)..string.char(0x00)        -- HEX 00 00 :: TRANSACTION ID      ::
  local PTC = string.char(0x00)..string.char(0x00)        -- HEX 00 00 :: PROTOCOL            :: MUST ALWAYS BE 0 FOR MODBUS
  local LEN = string.char(0x00)..string.char(0x06)        -- HEX 00 06 :: REQUEST LENGTH      :: FOR READ REQUESTS, WILL USUALLY BE 6
  local UNT = string.char(0x00)                           -- HEX 00    :: UNIT ID             :: WILL EITHER BE 00 OR FF UNLESS USING SERIAL BRIDGE
  local FCD = string.char(0x03)                           -- HEX 03    :: FUNCTION CODE       :: 03 IS FOR READING HOLD REGISTERS
  local SAD = string.char(0x00)..string.char(0x7c)        -- HEX 00 01 :: STARTING ADDRESS    :: BEGIN AT ADDRESS 1, CAN GO TO FF FF ( DEC 65535 )
  local QTY = string.char(0x00)..string.char(0x01)        -- HEX 00 01 :: QUANTITY            :: READ # REGISTERS - LIMIT 2000 COILS / 100 REGISTERS BUT WILL
                                                          --                                     INCREASE TCP:RECEIVE EXPECTED BYTES 
                                                          --                                  !! DO NOT READ MORE REGISTERS THAN EXISTS, WILL THROW EXCEPTION !!
  
  -- local payload = TRX..PTC..LEN..UNT..FCD..SAD..QTY       -- Payload constructor
  local payload = {0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x03, 0x00, 0x7c, 0x00, 0x01}
  -- table.insert(payload,TRX)
  -- table.insert(payload,PTC)
  -- table.insert(payload,LEN)
  -- table.insert(payload,UNT)
  -- table.insert(payload,FCD)
  -- table.insert(payload,SAD)
  -- table.insert(payload,QTY)

  
  host, port = "192.168.1.161", 502; -- IP ADDRESS HERE WILL NEED TO BE A SETTING THAT CAN BE UPDATED FROM THE UI
  -- socket = require("socket");
  -- tcp = assert(socket.tcp());
  
  -- tcp:settimeout(3);  -- WE MAY HAVE TO ADJUST TIMEOUT DEPENDING ON NETWORK CONDITIONS
  
  -- tcp:connect(host, port);
  r = {}  -- Response table
  local connected = 2
  if connected == 2 then
    connected = tcpConnect(host, port, 3000)
  end
  if connected == 1 then
    -- send = tcp:send(payload);
    print('###',#payload)
    send = tcpSend(payload) -- tcpSend func needs to be updated. See test_helpers.lua files
    print("resp: ",send)
    rc = tcpRecv()
    if rc > 0 then
      reg["wirelesscommfailure"] = maxcommfailure
      data = responseGetBytes(0, rc)
      if data ~= nil then
        local i = 1
        for _, char in pairs(data) do
            -- c = string.format('%02x', string.byte(char))    -- We have to convert responses from bytes into strings, otherwise, appears as blank
            print(i.." : "..char)                              -- Prints to console for debugging
            i = i + 1                                       -- Byte Index, can be removed for optimization
            table.insert(r,char)                               -- insert c char string into r data table
        end
      end
    end
  end
  
  
  -- local i = 1
  -- while true do

  --     -- s, stat, partial = tcp:receive()                        -- BE AWARE, TCP:RECEIVE IS A -HARD BLOCKING- OPERATION, IT WILL STOP ==EVERYTHING==
  --     if data ~= nil then
  --         for _, char in pairs(data) do
  --             c = string.format('%02x', string.byte(char))    -- We have to convert responses from bytes into strings, otherwise, appears as blank
  --             print(i.." : "..char)                              -- Prints to console for debugging
  --             i = i + 1                                       -- Byte Index, can be removed for optimization
  --             table.insert(r,c)                               -- insert c char string into r data table
  --         end
  --     end
  --     if #partial == 0 and stat == "timeout" then break end   -- If we receive no data and hit the timeout, close the connection
  --     if stat == "closed" then break end                      -- If the server closes the connection, break out
  -- end
  -- tcp:close();                                                -- No need for the TCP connection to stay open while we parse results.
  tcpClose()
  
  print(table.concat(r))
  print("Processed through all packets -- parsing results");
  
  -- if #r > 0 then
  --     if string.find(r[8],'8') then                            -- THIS IS IMPORTANT, if a read function call returns as 8#, it means there was an error
  --         print("ERROR IN REQUEST - CODE: "..r[9])             -- ERROR CODES HERE: simplymodbus.ca/exceptions.htm
  --     else
  --         local RLEN = tonumber(r[9],16)      -- RLEN = Response Length / Length of Data Payload after MBAP Header
  --         local i = 1                        -- Start incrementing at 10, as the first 8 bytes are MBAP, and byte 9 is length
  --         while i <= #r do
  --             print(r[i])
  --             local b = r[i]          -- We have to grab two bytes at a time for each register
  --             if i <#r then
  --               b = b..r[i+1]
  --             end
  --             local d = tonumber(b,16)        -- Convert to Decimal for a human readable value
  --             local s = b.." ("..d..")"       -- This is just readable formatting
  --             print(s)                        -- print it out for now, but we could add it to an RDATA array table
  --             i = i + 2;                      -- Increment by 2 for 
  --         end
  --     end
  -- else
  --     print("We received no data from device")
  -- end

  -- OLD TCP REQUEST FUNCTIONALITY WILL NEED TO REMAIN IN LOGIC FOR BACKWARD COMPATIBILITY UNTIL ALL FACILITIES ARE USING MONNIT DEVICES
  -- local sensoragealarm,
  --       twentyfourhours =
  --       tonumber(SETTINGS["WirelessSensorAgeAlarm"]) * 60,
  --       86400
  -- local maxcommfailure = sensoragealarm + twentyfourhours
  -- local connected = 2
  -- if connected == 2 then
  --   connected = tcpConnect(SETTINGS["WirelessBaseStationIP"], 1000, 3000)
  -- end
  -- if connected == 1 then
  --   -- get number of sensors in sensor table
  --   local count = 0
  --   count = getSensorCount()
  --   if count > 0 then
  --     -- iterate through sensor table
  --     for row_num=1,count do
  --       sn_id = getSensorID(row_num)
  --       if sn_id ~= nil then
  --         SENSORS[sn_id] = {}
  --         sd = getSensorData(row_num)
  --         data_table = parsePointManagerResponse(sd)
  --         SENSORS[sn_id] = data_table
  --       end
  --     end
  --   end
  --   reg["wirelesscommfailure"] = maxcommfailure
  -- elseif connected < 1 then
  --   print('TCP Err: ',connected)
  -- end
  -- tcpClose()
  SENSORS["tcp_response"] = connected
  return SENSORS
end

function maxtempAvgForZones(zone_ids, probe_ids)
  local average = 0
  local zone_average = 0
  for i, zone_id in ipairs(zone_ids) do
    zone_average = tempAvgForZones({zone_id}, probe_ids)
    if zone_average > average then
      average = zone_average
    end
  end
  return average
end

function zoneTempAlarm(ZONE, zone_id, probe_ids)
  if reg['zone' .. zone_id .. 'control'] == 1 then
    local zoneTemp = 0
    local maxTemp = 0
    local temp_in_alarm = 0
    for i, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, probe_ids)) do
      if reg[temp_prefix .. 'lvtemp'] > reg[temp_prefix .. 'avgtemp'] then
        zoneTemp = reg[temp_prefix .. 'lvtemp']
      else
        zoneTemp = reg[temp_prefix .. 'avgtemp']
      end
      if zoneTemp > maxTemp then
        maxTemp = zoneTemp
      end
    end
    if maxTemp < tonumber(SETTINGS["MinTemperatureAlarm"]) or maxTemp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
      ZONE['temp_in_alarm'] = ZONE['temp_in_alarm'] + 1
      temp_in_alarm = 1
    end
    if temp_in_alarm > 0 and ZONE['temp_in_alarm'] > 4 then
      if ZONE['email_sent'] == 0 then
        sendAlarm("Zone " .. zone_id, maxTemp)
        ZONE['email_sent'] = 1
      end
    else
      ZONE['email_sent'] = 0
    end
    if temp_in_alarm < 1 then
      ZONE['temp_in_alarm'] = 0
    end
  end
end

function wirelessSensorAgeAlarm(GVAR, prefix, id, probe_ids)
  if GVAR[prefix..'_wireless_sensor_age_in_alarm'] == nil then
    GVAR[prefix..'_wireless_sensor_age_in_alarm'] = 0
    GVAR[prefix..'_wireless_sensor_age_alarm_email_sent'] = 0
    GVAR[prefix..'_wireless_sensor_age_alarm_cooldown'] = 0
  end
  local sensorAge = nil
  local wireless_sensor_age_in_alarm = 0
  for i, temp_prefix in ipairs(getTempPrefixes(prefix, id, probe_ids)) do
    if reg[temp_prefix..'tempage'] ~= nil then
      sensorAge = tonumber(reg[temp_prefix..'tempage'])
      if sensorAge > tonumber(SETTINGS["WirelessSensorAgeAlarm"]) * 60 then
        GVAR[prefix..'_wireless_sensor_age_in_alarm'] = GVAR[prefix..'_wireless_sensor_age_in_alarm'] + 1
        wireless_sensor_age_in_alarm = 1
      end
    end
  end
  if sensorAge ~= nil then
    if wireless_sensor_age_in_alarm > 0 and GVAR[prefix..'_wireless_sensor_age_in_alarm'] > 2 then
      if GVAR[prefix..'_wireless_sensor_age_alarm_cooldown'] > 0 then
        GVAR[prefix..'_wireless_sensor_age_alarm_cooldown'] = GVAR[prefix..'_wireless_sensor_age_alarm_cooldown'] - 1
      else
        if GVAR[prefix..'_wireless_sensor_age_alarm_email_sent'] == 0 then
          sensorAge = math.floor(sensorAge / 60 + 0.5)
          prefix_str = prefix:gsub("^%l", string.upper).." "
          sendAlarm(prefix_str..id.." Temperature Sensor Communication", sensorAge.." minutes since last transmission")
          GVAR[prefix..'_wireless_sensor_age_alarm_email_sent'] = 1
          GVAR[prefix..'_wireless_sensor_age_alarm_cooldown'] = 30
        end
      end
    elseif wireless_sensor_age_in_alarm < 1 then
      if GVAR[prefix..'_wireless_sensor_age_alarm_cooldown'] == 0 then
        GVAR[prefix..'_wireless_sensor_age_in_alarm'] = 0
        GVAR[prefix..'_wireless_sensor_age_alarm_email_sent'] = 0
      end
    end
  end
end

function parsePointManagerResponse(data_string)
  data_table = {}
  if data_string ~= nil then
    if string.match(data_string, ",") then
      comma_index = string.find(data_string, ',')
      data_table['command'] = string.sub(data_string, 1, comma_index - 1)
      data_string = string.match(data_string, ",(.*)")
    end
    data_table['system_alarm'] = string.sub(data_string, 1, 1)
    data_table['sensor_alarm'] = string.sub(data_string, 9, 9)
    data_table['service_mode'] = string.sub(data_string, 10, 10)
    data_table['state_of_concern_io_1'] = string.sub(data_string, 11, 11)
    data_table['state_of_concern_io_2'] = nil
    if string.match(data_string, '|') then
      local delimiter_index = string.find(data_string, '|')
      data_table['state_of_concern_io_2'] = string.sub(data_string, delimiter_index + 1, delimiter_index + 1)
      data_table['temp_1'] = string.sub(data_string, 12, delimiter_index - 1)
      data_table['temp_2'] = string.sub(data_string, delimiter_index + 2, -1)
    else
      data_table['temp_1'] = string.sub(data_string, 12, -1)
      data_table['temp_2'] = nil
    end
    data_table['age'] = string.sub(data_string, 4, 8)
    data_table['sensor_type'] = string.sub(data_string, 2, 3)
  end
  return data_table
end

function updateWirelessTemps(settingName,regPrefix,wireless_data)
  local sensoragealarm,
        twentyfourhours =
        tonumber(SETTINGS["WirelessSensorAgeAlarm"]) * 60,
        86400
  local maxcommfailure = sensoragealarm + twentyfourhours
  local commfailuretime = reg["wirelesscommfailure"]
  local snid = string.sub(SETTINGS[settingName],1,#SETTINGS[settingName]-2)
  local ptnum = string.sub(SETTINGS[settingName],-2)
  if snid ~= nil and wireless_data ~= nil and wireless_data[snid] ~= nil then
    updateLVTemp(regPrefix,tonumber(wireless_data[snid]["temp"..ptnum]))
    updateLVSensorAge(regPrefix,tonumber(wireless_data[snid]["age"]))
    WIRELESS_POINT_FAILURES[settingName] = 0
  else
    if wireless_data["tcp_response"] < 1 then
      local time_diff = maxcommfailure - commfailuretime
      if WIRELESS_POINT_FAILURES[settingName] == 0 and commfailuretime == 0 then
        reg["wirelesscommfailure"] = maxcommfailure
      elseif WIRELESS_POINT_FAILURES[settingName] > 1 then
        if time_diff >= twentyfourhours then
          updateLVTemp(regPrefix,0)
        end
        if time_diff > 65535 then
          updateLVSensorAge(regPrefix,65535)
        else
          updateLVSensorAge(regPrefix,time_diff)
        end
      end
    else
      if WIRELESS_POINT_FAILURES[settingName] >= 100 then
        updateLVSensorAge(regPrefix,65535)
      elseif WIRELESS_POINT_FAILURES[settingName] >= 50 then
        updateLVSensorAge(regPrefix,sensoragealarm)
      end
    end
    WIRELESS_POINT_FAILURES[settingName] = WIRELESS_POINT_FAILURES[settingName] + 1
  end
end

function updateAverages()
  updateTempAverages()
  updateDamperAverages()
end

function updateDamperAverages()
  for i,zn_id in ipairs(ZONE_IDS) do
    local dmpr_id = ZN_DMPR_IDS[zn_id]
    updateDamperAverage(zn_id,dmpr_id)
  end
end

function spForZone(zn_id)
  local regime = reg["zone"..zn_id.."regime"]
  if regime < 2 then
    return SETTINGS["Regime".."1".."TempSetPoint"]
  else
    return SETTINGS["Regime"..regime.."TempSetPoint"]
  end
end

if not luatest_running then
  while init_complete ~= true do
    sleep(1000)
  end
  while init_complete do
    sleep(6000)
    if reg['refreshsettings'] == 1 then
      if pcall(loadSettings) then
        reg['refreshsettings'] = 0
      else
        print('Error loading settings')
      end
    end
    if reg["pollwirelesstemps"] ~= nil then
      if reg["pollwirelesstemps"] == 0 then
        updateLastValidTemps()
        reg["pollwirelesstemps"] = SETTINGS["WirelessTempsPollInterval"] * 60
      end
    else
      updateLastValidTemps()
    end
    updateAverages()
  end
end
