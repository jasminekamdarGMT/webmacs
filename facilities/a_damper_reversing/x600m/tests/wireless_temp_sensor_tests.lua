local lu = require('luaunit')

function TestWebmacsScripts:test_wireless_sensor_age_alarms()
  initSequence()
  SETTINGS["WirelessSensorAgeAlarm"] = 10
  if #zone_probe_ids == 1 then
    for i, zone_id in pairs(zone_ids) do
      emails_sent = 0
      -- with sensor age below wireless sensor age alarm setpoint, no alarm is sent
      reg["zone"..zone_id.."control"] = 1
      reg["zone"..zone_id.."pAlvtemp"] = 70
      reg["zone"..zone_id.."pAtempage"] = 559
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 0)
      -- if sensor age is outside bounds for 3 checks, alarm is sent
      reg["zone"..zone_id.."pAtempage"] = 618
      updateAlarms()
      updateAlarms()
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      if zone_labels then
        lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_labels[zone_id].." Temperature Sensor Communication".."!")
      else
        lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_id.." Temperature Sensor Communication".."!")
      end
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 3)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
      -- while alarm conditions persist, no additional emails are sent
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      -- if cooldown has not completed, alarm does not reset when sensor age is below wireless sensor age alarm setpoint
      reg["zone"..zone_id.."pAtempage"] = 130
      updateAlarms()
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 4)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
      -- alarm resets when sensor age is below wireless sensor age alarm setpoint
      reg["zone"..zone_id.."pAtempage"] = 130
      _G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_cooldown'] = 0
      updateAlarms()
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 0)
      -- with zone offline no alarms are triggered
      reg["zone"..zone_id.."control"] = 0
      reg["zone"..zone_id.."pAtempage"] = 180
      _G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'] = 5
      _G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'] = 0
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
    end
  elseif #zone_probe_ids >= 2 then
    for i, zone_id in pairs(zone_ids) do
      emails_sent = 0
      -- with sensor age below wireless sensor age alarm setpoint, no alarm is sent
      reg["zone"..zone_id.."control"] = 1
      reg["zone"..zone_id.."pAlvtemp"] = 70
      reg["zone"..zone_id.."pBlvtemp"] = 70
      reg["zone"..zone_id.."pAtempage"] = 559
      reg["zone"..zone_id.."pBtempage"] = 559
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 0)
      -- if sensor age is outside bounds for 3 checks, alarm is sent
      reg["zone"..zone_id.."pAtempage"] = 618
      updateAlarms()
      updateAlarms()
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      if zone_labels then
        lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_labels[zone_id].." Temperature Sensor Communication".."!")
      else
        lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Zone "..zone_id.." Temperature Sensor Communication".."!")
      end
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 3)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
      -- while alarm conditions persist, no additional emails are sent
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 4)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
      reg["zone"..zone_id.."pAtempage"] = nil
      reg["zone"..zone_id.."pBtempage"] = nil
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 4)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
      reg["zone"..zone_id.."pAtempage"] = 618
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 5)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
      -- if cooldown has not completed, alarm does not reset when sensor age is below wireless sensor age alarm setpoint
      reg["zone"..zone_id.."pAtempage"] = 130
      reg["zone"..zone_id.."pBtempage"] = 559
      updateAlarms()
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_cooldown'], 28)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 5)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 1)
      -- if cooldown has completed, alarm resets when sensor age is below wireless sensor age alarm setpoint
      _G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_cooldown'] = 0
      updateAlarms()
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_cooldown'], 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'], 0)
      lu.assertEquals(_G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'], 0)
      -- with zone offline no alarms are triggered
      reg["zone"..zone_id.."control"] = 0
      reg["zone"..zone_id.."pAtempage"] = 180
      _G['ZONE_'..zone_id]['zone_wireless_sensor_age_in_alarm'] = 5
      _G['ZONE_'..zone_id]['zone_wireless_sensor_age_alarm_email_sent'] = 0
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
    end
  end

  local sensor_prefixes = {}
  if has_wireless_biofilter_temp_sensor == true then
    table.insert(sensor_prefixes,'biofilter')
  elseif has_wireless_premister_temp_sensor == true then
    table.insert(sensor_prefixes,'premister')
  elseif has_wireless_exhaust_temp_sensor == true then
    table.insert(sensor_prefixes,'exhaust')
  end
  for i, prefix in pairs(sensor_prefixes) do
    for i, blower_id in pairs(blower_ids) do
      emails_sent = 0
      -- with sensor age below wireless sensor age alarm setpoint, no alarm is sent
      reg[prefix..blower_id.."tempage"] = 559
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'], 0)
      -- if sensor age is outside bounds for 3 checks, alarm is sent
      reg[prefix..blower_id.."tempage"] = 618
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      updateAlarms()
      lu.assertEquals(emails_sent, 0)
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      prefix_str = prefix:gsub("^%l", string.upper).." "
      lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on "..prefix_str..blower_id.." Temperature Sensor Communication".."!")
      lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'], 3)
      lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_email_sent'], 1)
      -- while alarm conditions persist, no additional emails are sent
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
      -- alarm resets when sensor age is below wireless sensor age alarm setpoint
      reg[prefix..blower_id.."tempage"] = 130
      _G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_cooldown'] = 0
      updateAlarms()
      lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'], 0)
      lu.assertEquals(_G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_email_sent'], 0)
      -- with zone offline no alarms are triggered
      for i, zone_id in pairs(zone_ids) do
        reg["zone"..zone_id.."control"] = 0
      end
      reg[prefix..blower_id.."tempage"] = 180
      _G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_in_alarm'] = 5
      _G['BLOWER_'..blower_id][prefix..'_wireless_sensor_age_alarm_email_sent'] = 0
      updateAlarms()
      lu.assertEquals(emails_sent, 1)
    end
  end
end

function TestWebmacsScripts:test_retrieve_wireless_sensor_data_tcp()
  initSequence()
  retrieveWirelessSensorDataTCP()
  for i,zn_id in ipairs(zone_ids) do
    SETTINGS["Zone"..zn_id.."ProbeAPointID"] = "0000000050B04AE3_1"
    SETTINGS["Zone"..zn_id.."ProbeBPointID"] = "0000000050B04AE3_2"
    for i, probe_id in pairs(zone_probe_ids) do
      for i, temp_prefix in ipairs(getTempPrefixes('zone', zn_id, {probe_id})) do
        updateLastValidTemps()
        if probe_id ~= 'B' then
          lu.assertEquals(reg[temp_prefix.."lvtemp"],70.9)
          -- sensor id is not in data
          SETTINGS["Zone"..zn_id.."Probe"..probe_id.."PointID"] = "0000000040B0FFFF_2"
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          -- after 50th failure, temp age goes to sensor age alarm time
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 50
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          lu.assertEquals(reg[temp_prefix.."tempage"], 600)
          -- after 100th failure, temp age goes to max sensor age
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeAPointID"] = 100
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], 70.9)
          lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        else
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          -- sensor id is not in data
          SETTINGS["Zone"..zn_id.."Probe"..probe_id.."PointID"] = "0000000040B0FFFF_2"
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"], -327.5)
          -- after 50th failure, temp age goes to sensor age alarm time
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeBPointID"] = 50
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          lu.assertEquals(reg[temp_prefix.."tempage"], 600)
          -- after 100th failure, temp age goes to max sensor age
          WIRELESS_POINT_FAILURES["Zone"..zn_id.."ProbeBPointID"] = 100
          updateLastValidTemps()
          lu.assertEquals(reg[temp_prefix.."lvtemp"],-327.5)
          lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        end
      end
    end
  end
end

function TestWebmacsScripts:test_update_wireless_temps()
  initSequence()
  SETTINGS["WirelessSensorAgeAlarm"] = 10
  local sn_id = "0000000050B04AE3"
  local wireless_data = {}
  for i, zone_id in pairs(zone_ids) do
    for i, probe_id in pairs(zone_probe_ids) do
      for i, temp_prefix in ipairs(getTempPrefixes('zone', zone_id, {probe_id})) do
        local settingName = "Zone"..zone_id.."Probe"..probe_id.."PointID"
        WIRELESS_POINT_FAILURES[settingName] = 0
        SETTINGS[settingName] = sn_id.."_1"
        -- with wireless sensor communication
        wireless_data["tcp_response"] = 1
        wireless_data[sn_id] = {}
        reg["wirelesscommfailure"] = 87000
        wireless_data[sn_id]["temp_1"] =	"88.3"
        wireless_data[sn_id]["age"] = "00200"
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 88.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 200)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],0)
        -- without wireless sensor communication
        wireless_data = {}
        wireless_data["tcp_response"] = -8
        reg["wirelesscommfailure"] = 87000
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 88.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 200)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],1)
        reg["wirelesscommfailure"] = 86600
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 88.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 200)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],2)
        -- sensor temp age is updated to difference of maxcommfailure minus reg["wirelesscommfailure"]
        reg["wirelesscommfailure"] = 86400
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 88.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 600)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],3)
        reg["wirelesscommfailure"] = 56400
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 88.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 30600)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],4)
        -- when elapsed failure time exceeds max sensor age of 65535, temp age stays at 65535
        reg["wirelesscommfailure"] = 16400
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 88.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],5)
        -- when elapsed failure time reaches 24 hours, lvtemp updates to 0
        reg["wirelesscommfailure"] = 600
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 0)
        lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],6)
        -- when wireless sensor communication resumes
        wireless_data["tcp_response"] = 1
        reg["wirelesscommfailure"] = 87000
        wireless_data[sn_id] = {}
        wireless_data[sn_id]["temp_1"] =	"108.3"
        wireless_data[sn_id]["age"] = "00400"
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 108.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 400)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],0)
        -- with sensor id that is not in sensor data
        SETTINGS[settingName] = "0000000010B02AE5_1"
        reg["wirelesscommfailure"] = 87000
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 108.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 400)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],1)
        reg["wirelesscommfailure"] = 87000
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 108.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 400)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],2)
        -- when 50th failure is reached, temp age is set to sensor age alarm time
        WIRELESS_POINT_FAILURES[settingName] = 50
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 108.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 600)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],51)
        -- when 100th failure is reached, temp age is set to max sensor age
        WIRELESS_POINT_FAILURES[settingName] = 100
        updateWirelessTemps(settingName,temp_prefix,wireless_data)
        lu.assertEquals(reg[temp_prefix.."lvtemp"], 108.3)
        lu.assertEquals(reg[temp_prefix.."tempage"], 65535)
        lu.assertEquals(WIRELESS_POINT_FAILURES[settingName],101)
      end
    end
  end
end
