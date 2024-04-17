enableDebug()

SINGLE_WIRE_SENSOR_MAX_VALID_TEMP = 184
AVERAGE_ARRAYS = {}
local host, port = "10.0.0.151", 502
init_complete=1

function retrieveWirelessSensorDataTCP()
  print("Attempting to connect and retrieve data...")
  SENSORS = {}

  -- Define the Modbus TCP payload for a Read Holding Registers request:
  local payload = {
      0x00, 0x01, -- Transaction Identifier: 0x0001 - A unique identifier for each Modbus request.
      0x00, 0x00, -- Protocol Identifier: 0x0000 - Zero for Modbus TCP.
      0x00, 0x06, -- Length: 0x0006 - The number of remaining bytes in this frame.
      0x01,       -- Unit Identifier: 0x01 - Identifies a remote slave connected to a TCP/IP network.
      0x03,       -- Function Code: 0x03 - Read Holding Registers function of Modbus.
      0x00, 0x64, -- Starting Address: 0x0064 (hex for 100) - The starting register address to read from.
      0x00, 0x10  -- Quantity of Registers: 0x0010 (hex for 16) - The number of registers to read.
  }

  -- Response buffer
  local response = {}
  local connected = tcpConnect("10.0.0.151", 502, 3000)

  if connected == 1 then
      print("Connected successfully.")
      local send_status = tcpSend(payload)
      print("Send status: ", send_status)

      local rc = tcpRecv()
      if rc > 0 then
          local data = responseGetBytes(0, rc)
          if data then
              for i, byte in ipairs(data) do
                  print(i .. " : " .. string.format("%02x", byte))
                  table.insert(response, byte)
              end
          end
      else
          print("Failed to receive data.")
      end
      tcpClose()
  else
      print("Failed to connect. Error code: ", connected)
  end

  print("Processing complete.")
  SENSORS["tcp_response"] = connected
  return SENSORS
end

function tempIoAppearsValid(temp_io_name)
  return (ioAppearsValid(temp_io_name) and io[temp_io_name] <= SINGLE_WIRE_SENSOR_MAX_VALID_TEMP)
end

function resetAverage(average_register)
  AVERAGE_ARRAYS[average_register] = {}
end

function updateAverage(average_register, insert_value, array_limit)
  if not AVERAGE_ARRAYS[average_register] then
    resetAverage(average_register)
  end
  table.insert(AVERAGE_ARRAYS[average_register], 1, insert_value)
  local count = 0
  local sum_of_values = 0
  for k, value in pairs(AVERAGE_ARRAYS[average_register]) do
    count = count + 1
    if count <= array_limit then
      sum_of_values = sum_of_values + value
    end
  end
  if count > array_limit then
    table.remove(AVERAGE_ARRAYS[average_register])
    count = count - 1
  end
  reg[average_register] = sum_of_values / count
end

function updateLVSensorAge(temp_prefix, current_age)
  if current_age ~= nil then
    reg[temp_prefix .. 'tempage'] = current_age
  end
end

function updateLVTemp(temp_prefix, current_temp)
  if current_temp ~= nil then
    reg[temp_prefix .. 'lvtemp'] = current_temp
  elseif tempIoAppearsValid(temp_prefix .. 'temp') then
    reg[temp_prefix .. 'lvtemp'] = io[temp_prefix .. 'temp']
  end
end

function updateTempAverage(temp_prefix, current_temp)
  if current_temp ~= nil then
    updateAverage(temp_prefix..'avgtemp', current_temp, 10)
  elseif tempIoAppearsValid(temp_prefix .. 'temp') then
    updateAverage(temp_prefix..'avgtemp', io[temp_prefix .. 'temp'], 10)
  end
end

function getTempPrefixes(prefix, id, probe_ids)
  local prefixes = {}
  for n, probe_id in ipairs(probe_ids) do
    if probe_id == '' then
      table.insert(prefixes, prefix..id)
    else
      table.insert(prefixes, prefix..id..'p'..probe_id)
    end
  end
  return prefixes
end

function tempAvgForZones(zone_ids, probe_ids)
  local avg_temp = 0
  local valid_temps = validTempsForZones(zone_ids, probe_ids)
  if #valid_temps > 0 then
    for n,temp in ipairs(valid_temps) do
      avg_temp = avg_temp + temp
    end
    avg_temp = avg_temp / #valid_temps
  end
  return avg_temp
end

function validTempsForZones(zone_ids, probe_ids)
  local valid_temps = {}
  for i, zone_id in ipairs(zone_ids) do
    if reg['zone'..zone_id..'control'] == 1 then
      for n, temp_prefix in ipairs(getTempPrefixes('zone',zone_id, probe_ids)) do
        if reg[temp_prefix..'lvtemp'] then
          local temp = reg[temp_prefix..'lvtemp']
          if temp > 0 then
            table.insert(valid_temps,temp)
          end
        end
      end
    end
  end
  return sortTableAsc(valid_temps)
end

function maxTempForZones(zone_ids, probe_ids)
  local max_temp = 0
  local valid_temps = validTempsForZones(zone_ids, probe_ids)
  if #valid_temps > 0 then
    max_temp = valid_temps[#valid_temps]
  end
  return max_temp
end

function minTempForZones(zone_ids, probe_ids)
  local min_temp = 0
  local valid_temps = validTempsForZones(zone_ids, probe_ids)
  if #valid_temps > 0 then
    min_temp = valid_temps[1]
  end
  return min_temp
end

function tempAverageForBiofilters(biofilter_ids, probe_ids)
  local count = 0
  local sum_of_temps = 0
  for i, biofilter_id in ipairs(biofilter_ids) do
    for n, temp_prefix in ipairs(getTempPrefixes('biofilter',biofilter_id, probe_ids)) do
      if reg[temp_prefix .. 'lvtemp'] and reg[temp_prefix .. 'lvtemp'] > 0 then
        sum_of_temps = sum_of_temps + reg[temp_prefix .. 'lvtemp']
        count = count + 1
      end
    end
  end
  if count > 0 then
    return sum_of_temps / count
  else
    return 0
  end
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
    print('init_complete')
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
