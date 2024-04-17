local lu = require('luaunit')

function TestWebmacsScripts:test_update_last_valid_temps()
  for i, zone_id in pairs(zone_ids) do
    if has_wireless_zone_temp_sensor == true then
      if has_tcp_connect == true then
        return
      end
      for i, probe_id in pairs(zone_probe_ids) do
        for i, temp_prefix in ipairs(getTempPrefixes('zone', zone_id, {probe_id})) do
          SETTINGS["Zone"..zone_id.."Probe"..probe_id.."PointID"] = "0000000040B04AE4_2"
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 64.7)
          -- sensor id is not in data
          SETTINGS["Zone"..zone_id.."Probe"..probe_id.."PointID"] = "0000000040B0FFFF_2"
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 64.7)
          -- after 5th failure, lv temp goes to zero
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 0)
        end
      end
    elseif has_wired_zone_temp_sensor == true then
      for i, probe_id in pairs(zone_probe_ids) do
        for i, temp_prefix in ipairs(getTempPrefixes('zone', zone_id, {probe_id})) do
          io[temp_prefix.."temp"] = 130
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 130)
          -- io value is nil
          io[temp_prefix.."temp"] = nil
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 130)
          -- io value is >= 185
          io[temp_prefix.."temp"] = 185
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 130)
        end
      end
    end
  end

  for i, blower_id in pairs(blower_ids) do
    if has_wireless_biofilter_temp_sensor == true then
      for i, probe_id in pairs(biofilter_probe_ids) do
        for i, temp_prefix in ipairs(getTempPrefixes('biofilter', blower_id, {probe_id})) do
          SETTINGS["Biofilter"..blower_id.."Probe"..probe_id.."PointID"] = "0000000040B04AE4_2"
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 64.7)
          -- sensor id is not in data
          SETTINGS["Biofilter"..blower_id.."Probe"..probe_id.."PointID"] = "0000000040B0FFFF_2"
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 64.7)
          -- after 5th failure, lv temp goes to zero
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 0)
        end
      end
    end
  end
end

function TestWebmacsScripts:test_update_temp_averages()
  if has_wired_zone_temp_sensor == true or has_wireless_zone_temp_sensor == true then
    initSequence()
    for i, zone_id in pairs(zone_ids) do
      for i, probe_id in pairs(zone_probe_ids) do
        for i, temp_prefix in ipairs(getTempPrefixes('zone', zone_id, {probe_id})) do
          first_10_values = {120, 100, 120 ,100, 120, 100, 120, 100, 120, 100}
          for k, value in pairs(first_10_values) do
            if has_wired_zone_temp_sensor == true then
              io[temp_prefix.."temp"] = value
            elseif has_wireless_zone_temp_sensor == true then
              reg[temp_prefix.."lvtemp"] = value
            end
            updateTempAverages()
          end
          lu.assertEquals(AVERAGE_ARRAYS[temp_prefix.."avgtemp"], {100, 120 ,100, 120, 100, 120, 100, 120, 100, 120})
          lu.assertEquals(reg[temp_prefix.."avgtemp"], 110)
          --after 10 values, it starts rotating the table
          if has_wired_zone_temp_sensor == true then
            io[temp_prefix.."temp"] = 80
          elseif has_wireless_zone_temp_sensor == true then
            reg[temp_prefix.."lvtemp"] = 80
          end
          updateTempAverages()
          lu.assertEquals(AVERAGE_ARRAYS[temp_prefix.."avgtemp"], {80, 100, 120 ,100, 120, 100, 120, 100, 120, 100})
          lu.assertEquals(reg[temp_prefix.."avgtemp"], 106)
          --with no historic values, it is just the lastest value
          AVERAGE_ARRAYS[temp_prefix.."avgtemp"] = {}
          if has_wired_zone_temp_sensor == true then
            io[temp_prefix.."temp"] = 60
          elseif has_wireless_zone_temp_sensor == true then
            reg[temp_prefix.."lvtemp"] = 60
          end
          updateTempAverages()
          lu.assertEquals(AVERAGE_ARRAYS[temp_prefix.."avgtemp"], {60})
          lu.assertEquals(reg[temp_prefix.."avgtemp"], 60)
        end
      end
    end
  end
end

function TestWebmacsScripts:test_temp_average_for_zones()
  for i, zone_id in pairs(zone_ids) do
    if #zone_probe_ids == 1 then
      reg["zone"..zone_id.."control"] = 1
      reg["zone"..zone_id.."lvtemp"] = 115
      local avg = tempAvgForZones({zone_id}, {''})
      lu.assertEquals(avg, 115)
      -- zero for disconnected probe
      reg["zone"..zone_id.."lvtemp"] = nil
      avg = tempAvgForZones({zone_id}, {''})
      lu.assertEquals(avg, 0)
      -- zero for lv temp out of range
      reg["zone"..zone_id.."lvtemp"] = -10
      avg = tempAvgForZones({zone_id}, {''})
      lu.assertEquals(avg, 0)
      -- returns zero for zone offline
      reg["zone"..zone_id.."control"] = 0
      avg = tempAvgForZones({zone_id}, {''})
      lu.assertEquals(avg, 0)
    elseif #zone_probe_ids == 2 then
      reg["zone"..zone_id.."control"] = 1
      reg["zone"..zone_id.."pAlvtemp"] = 115
      reg["zone"..zone_id.."pBlvtemp"] = 125
      local avg = tempAvgForZones({zone_id}, {'A','B'})
      lu.assertEquals(avg, 120)
      -- ignores disconnected probe
      reg["zone"..zone_id.."pBlvtemp"] = nil
      avg = tempAvgForZones({zone_id}, {'A','B'})
      lu.assertEquals(avg, 115)
      -- ignores lv temp out of range
      reg["zone"..zone_id.."pBlvtemp"] = -10
      avg = tempAvgForZones({zone_id}, {'A','B'})
      lu.assertEquals(avg, 115)
      -- returns zero for zone offline
      reg["zone"..zone_id.."control"] = 0
      avg = tempAvgForZones({zone_id}, {'A','B'})
      lu.assertEquals(avg, 0)
    end
  end
end

function TestWebmacsScripts:test_max_temp_average_for_zones()
  if #zone_probe_ids == 2 then
    if #zone_ids == 1 then
      local zone_1 = zone_ids[1]
      reg["zone"..zone_1.."control"] = 1
      reg["zone"..zone_1.."pAlvtemp"] = 115
      reg["zone"..zone_1.."pBlvtemp"] = 125
      local avg = maxtempAvgForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(avg, 120)
      -- if zone is offline, the return value is 0
      reg["zone"..zone_1.."control"] = 0
      avg = maxtempAvgForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(avg, 0)
    elseif #zone_ids >= 2 then
      local zone_1 = zone_ids[1]
      local zone_2 = zone_ids[2]
      reg["zone"..zone_1.."control"] = 1
      reg["zone"..zone_2.."control"] = 1
      reg["zone"..zone_1.."pAlvtemp"] = 115
      reg["zone"..zone_1.."pBlvtemp"] = 125
      reg["zone"..zone_2.."pAlvtemp"] = 135
      reg["zone"..zone_2.."pBlvtemp"] = 145
      local avg = maxtempAvgForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(avg, 140)
      -- if a zone is offline, it is not included in average
      reg["zone"..zone_2.."control"] = 0
      avg = maxtempAvgForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(avg, 120)
      reg["zone"..zone_1.."control"] = 0
      reg["zone"..zone_2.."control"] = 1
      avg = maxtempAvgForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(avg, 140)
      -- if both zones are offline, the return value is 0
      reg["zone"..zone_1.."control"] = 0
      reg["zone"..zone_2.."control"] = 0
      avg = maxtempAvgForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(avg, 0)
    end
  end
end

function TestWebmacsScripts:test_max_temp_for_zones()
  if #zone_probe_ids == 2 then
    if #zone_ids == 1 then
      local zone_1 = zone_ids[1]
      reg["zone"..zone_1.."control"] = 1
      reg["zone"..zone_1.."pAlvtemp"] = 115
      reg["zone"..zone_1.."pBlvtemp"] = 125
      local max = maxTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(max, 125)
      -- if a zone is offline, it is not included in max temp
      max = maxTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(max, 125)
      reg["zone"..zone_1.."control"] = 0
      max = maxTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(max, 145)
      -- if both zones are offline, the return value is 0
      reg["zone"..zone_1.."control"] = 0
      max = maxTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(max, 0)
    elseif #zone_ids >= 2 then
      local zone_1 = zone_ids[1]
      local zone_2 = zone_ids[2]
      reg["zone"..zone_1.."control"] = 1
      reg["zone"..zone_1.."pAlvtemp"] = 115
      reg["zone"..zone_1.."pBlvtemp"] = 125
      reg["zone"..zone_2.."control"] = 1
      reg["zone"..zone_2.."pAlvtemp"] = 135
      reg["zone"..zone_2.."pBlvtemp"] = 145
      local max = maxTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(max, 145)
      -- if a zone is offline, it is not included in max temp
      reg["zone"..zone_2.."control"] = 0
      max = maxTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(max, 125)
      reg["zone"..zone_1.."control"] = 0
      reg["zone"..zone_2.."control"] = 1
      max = maxTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(max, 145)
      -- if both zones are offline, the return value is 0
      reg["zone"..zone_1.."control"] = 0
      reg["zone"..zone_2.."control"] = 0
      max = maxTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(max, 0)
    end
  end
end

function TestWebmacsScripts:test_min_temp_for_zones()
  if #zone_probe_ids == 2 then
    if #zone_ids == 1 then
      local zone_1 = zone_ids[1]
      reg["zone"..zone_1.."control"] = 1
      reg["zone"..zone_1.."pAlvtemp"] = 115
      reg["zone"..zone_1.."pBlvtemp"] = 125
      local min = minTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(min, 125)
      -- if a zone is offline, it is not included in min temp
      min = minTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(min, 125)
      reg["zone"..zone_1.."control"] = 0
      min = minTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(min, 145)
      -- if both zones are offline, the return value is 0
      reg["zone"..zone_1.."control"] = 0
      min = minTempForZones({zone_1}, zone_probe_ids)
      lu.assertEquals(min, 0)
    elseif #zone_ids >= 2 then
      local zone_1 = zone_ids[1]
      local zone_2 = zone_ids[2]
      reg["zone"..zone_1.."control"] = 1
      reg["zone"..zone_1.."pAlvtemp"] = 115
      reg["zone"..zone_1.."pBlvtemp"] = 125
      reg["zone"..zone_2.."control"] = 1
      reg["zone"..zone_2.."pAlvtemp"] = 135
      reg["zone"..zone_2.."pBlvtemp"] = 145
      local min = minTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(min, 115)
      -- if a zone is offline, it is not included in min temp
      reg["zone"..zone_1.."control"] = 0
      min = minTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(min, 135)
      reg["zone"..zone_1.."control"] = 1
      reg["zone"..zone_2.."control"] = 0
      min = minTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(min, 115)
      -- if both zones are offline, the return value is 0
      reg["zone"..zone_1.."control"] = 0
      reg["zone"..zone_2.."control"] = 0
      min = minTempForZones({zone_1,zone_2}, zone_probe_ids)
      lu.assertEquals(min, 0)
    end
  end
end

function TestWebmacsScripts:test_zone_temp_alarms()
  initSequence()
  SETTINGS["MinTemperatureAlarm"] = 0
  SETTINGS["MaxTemperatureAlarm"] = 160
  if #zone_probe_ids == 1 then
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
      lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone " .. zone_id .. "!")
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
      -- if last valid temps are higher than alarm setpoint while average temps are lower than setpoint
      emails_sent = 0
      _G['ZONE_'..zone_id]['email_sent'] = 0
      _G['ZONE_'..zone_id]['temp_in_alarm'] = 0
      reg["zone"..zone_id.."avgtemp"] = 159
      reg["zone"..zone_id.."lvtemp"] = 165
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 1)
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 2)
      updateAlarms()
      updateAlarms()
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
      reg["zone"..zone_id.."lvtemp"] = 155
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
      -- with zone offline no alarms are triggered
      reg["zone"..zone_id.."control"] = 0
      reg["zone"..zone_id.."avgtemp"] = 180
      _G['ZONE_'..zone_id]['temp_in_alarm'] = 5
      _G['ZONE_'..zone_id]['email_sent'] = 0
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
    end
  elseif #zone_probe_ids >= 2 then
    for i, zone_id in pairs(zone_ids) do
      emails_sent = 0
      -- with alarm between min and max, no alarm is sent
      reg["zone"..zone_id.."control"] = 1
      reg["zone"..zone_id.."pAavgtemp"] = 130
      reg["zone"..zone_id.."pBavgtemp"] = 130
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
      -- if temp is outside bounds for 5 checks, alarm is sent
      reg["zone"..zone_id.."pAavgtemp"] = 180
      updateAlarms()
      updateAlarms()
      updateAlarms()
      updateAlarms()
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone " .. zone_id .. "!")
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
      lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 1)
      -- while alarm conditions persist, no additional emails are sent
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      -- return to normal temps resets alarm
      reg["zone"..zone_id.."pAavgtemp"] = 130
      updateAlarms()
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'], 0)
      -- if last valid temps are higher than alarm setpoint while average temps are lower than setpoint
      emails_sent = 0
      _G['ZONE_'..zone_id]['email_sent'] = 0
      _G['ZONE_'..zone_id]['temp_in_alarm'] = 0
      reg["zone"..zone_id.."pAavgtemp"] = 159
      reg["zone"..zone_id.."pBavgtemp"] = 159
      reg["zone"..zone_id.."pAlvtemp"] = 165
      reg["zone"..zone_id.."pBlvtemp"] = 165
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 1)
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 2)
      updateAlarms()
      updateAlarms()
      updateAlarms()
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 5)
      reg["zone"..zone_id.."pAlvtemp"] = 155
      reg["zone"..zone_id.."pBlvtemp"] = 155
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(_G['ZONE_'..zone_id]['temp_in_alarm'], 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['email_sent'],0)
      -- with zone offline no alarms are triggered
      emails_sent = 0
      reg["zone"..zone_id.."control"] = 0
      reg["zone"..zone_id.."pAavgtemp"] = 180
      _G['ZONE_'..zone_id]['temp_in_alarm'] = 5
      _G['ZONE_'..zone_id]['email_sent'] = 0
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
    end
  end
end

function TestWebmacsScripts:test_parse_point_manager_data()
  initSequence()
  -- Data string has command and delimiter
  data_table = parsePointManagerResponse('D2,F2800252FFF70.9|F-327.5')
  lu.assertEquals(data_table['command'], 'D2')
  lu.assertEquals(data_table['system_alarm'], 'F')
  lu.assertEquals(data_table['sensor_type'], '28')
  lu.assertEquals(data_table['age'], '00252')
  lu.assertEquals(data_table['sensor_alarm'], 'F')
  lu.assertEquals(data_table['service_mode'], 'F')
  lu.assertEquals(data_table['state_of_concern_io_1'], 'F')
  lu.assertEquals(data_table['temp_1'], '70.9')
  lu.assertEquals(data_table['state_of_concern_io_2'], 'F')
  lu.assertEquals(data_table['temp_2'], '-327.5')
  -- Data string does not have command or delimiter
  data_table = parsePointManagerResponse('F2800252FFF70.9')
  lu.assertEquals(data_table['command'], nil)
  lu.assertEquals(data_table['system_alarm'], 'F')
  lu.assertEquals(data_table['sensor_type'], '28')
  lu.assertEquals(data_table['age'], '00252')
  lu.assertEquals(data_table['sensor_alarm'], 'F')
  lu.assertEquals(data_table['service_mode'], 'F')
  lu.assertEquals(data_table['state_of_concern_io_1'], 'F')
  lu.assertEquals(data_table['temp_1'], '70.9')
  lu.assertEquals(data_table['state_of_concern_io_2'], nil)
  lu.assertEquals(data_table['temp_2'], nil)
end

function TestWebmacsScripts:test_update_epa_temp_averages()
  initSequence()
  SETTINGS['DataLoggingRate'] = 30
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
    -- increments pfrp time while avgtemp vals are above setpoint
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
    -- resets pfrp time when avgtemp vals are below setpoint
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP - 15
    end
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],0)
    -- increments pfrp time if avgtemp vals meet setpoint
    for n,temp_prefix in ipairs(getTempPrefixes('zone',zone_id,zone_probe_ids)) do
      reg[temp_prefix..'avgtemp'] = PFRP_TEMP
    end
    updateEPATempAverages(zone_id,zone_probe_ids)
    lu.assertEquals(reg['zone'..zone_id..'pfrptime'],30)
  end
end
