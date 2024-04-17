
function updateLVTemp(temp_prefix)
  local io_appears_valid = io[temp_prefix .. 'temp'] ~= nil and io[temp_prefix .. 'temp'] == io[temp_prefix .. 'temp']
  if io_appears_valid and io[temp_prefix .. 'temp'] < 185 then
    reg[temp_prefix .. 'lvtemp'] = io[temp_prefix .. 'temp']
  end
end

function updateTempAverage(temp_prefix)
  local io_appears_valid = io[temp_prefix .. 'temp'] ~= nil and io[temp_prefix .. 'temp'] == io[temp_prefix .. 'temp']
  if io_appears_valid and io[temp_prefix .. 'temp'] < 185 then
    table.insert(TEMP_AVG_ARRAYS[temp_prefix], 1, io[temp_prefix .. 'temp'])
    local count = 0
    local sum_of_temps = 0
    for k, value in pairs(TEMP_AVG_ARRAYS[temp_prefix]) do
      count = count + 1
      if count <= 10 then
        sum_of_temps = sum_of_temps + value
      end    
    end
    if count > 10 then
      table.remove(TEMP_AVG_ARRAYS[temp_prefix])
      count = count - 1
    end
    reg[temp_prefix .. 'avgtemp'] = sum_of_temps / count
  end
end

function tempAvgForZones(first_zone_id, second_zone_id)
  local average = 0
  if reg['zone' .. first_zone_id .. 'control'] == 1 then
    average = reg['zone' .. first_zone_id .. 'lvtemp']
  end
  if reg['zone' .. second_zone_id .. 'control'] == 1 then
    if average > 0 then
      average = (reg['zone' .. second_zone_id .. 'lvtemp'] + average) / 2
    else
      average = reg['zone' .. second_zone_id .. 'lvtemp']
    end
  end
  return average
end

function zoneTempAlarm(ZONE, zone_id)
  if reg['zone' .. zone_id .. 'control'] == 1 then
    zoneTemp = reg['zone' .. zone_id .. 'avgtemp']
    if zoneTemp < tonumber(SETTINGS["MinTemperatureAlarm"]) or zoneTemp > tonumber(SETTINGS["MaxTemperatureAlarm"]) then
      ZONE['temp_in_alarm'] = ZONE['temp_in_alarm'] + 1
    else
      ZONE['temp_in_alarm'] = 0
    end
    if ZONE['temp_in_alarm'] > 4 then
      if ZONE['email_sent'] == 0 then
        sendAlarm("Zone " .. zone_id, zoneTemp)
        ZONE['email_sent'] = 1
      end
    else
      ZONE['email_sent'] = 0
    end
  end
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(6000)
    updateLastValidTemps()
    updateTempAverages()
  end
end
