BLOWER_IDS = {'45', '16', '78', '90', '12', '34', '56'}
ZONE_IDS = {'14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'}

function initValues()
  for i, blower_id in ipairs(BLOWER_IDS) do
    -- init blower & duct values
    initBlower(blower_id)
    initDamper(blower_id)
    initTempAverage('duct'..blower_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    -- init zone values
    initZone(zone_id)
    initTempAverage('zone'..zone_id)
  end
end

function updateLastValidTemps()
  for i, blower_id in ipairs(BLOWER_IDS) do
    updateLVTemp('duct'..blower_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    updateLVTemp('zone'..zone_id)
  end
end

function updateTempAverages()
  for i, blower_id in ipairs(BLOWER_IDS) do
    updateTempAverage('duct'..blower_id)
  end
  for i, zone_id in ipairs(ZONE_IDS) do
    updateTempAverage('zone'..zone_id)
  end
end

function updateBlowers()
  blowerControl(BLOWER_45, 'blower45', tempAvgForZones('14', '15'), SETTINGS['Blower45TempSetPoint'])
  blowerControl(BLOWER_16, 'blower16', tempAvgForZones('16', '16'), SETTINGS['Blower16TempSetPoint'])
  blowerControl(BLOWER_78, 'blower78', tempAvgForZones('17', '18'), SETTINGS['Blower78TempSetPoint'])
  blowerControl(BLOWER_90, 'blower90', tempAvgForZones('19', '20'), SETTINGS['Blower90TempSetPoint'])
  blowerControl(BLOWER_12, 'blower12', tempAvgForZones('21', '22'), SETTINGS['Blower12TempSetPoint'])
  blowerControl(BLOWER_34, 'blower34', tempAvgForZones('23', '24'), SETTINGS['Blower34TempSetPoint'])
  blowerControl(BLOWER_56, 'blower56', tempAvgForZones('25', '26'), SETTINGS['Blower56TempSetPoint'])
end

function updateDampers()
  damperControl(DAMPER_45, '45')
  damperControl(DAMPER_16, '16')
  damperControl(DAMPER_78, '78')
  damperControl(DAMPER_90, '90')
  damperControl(DAMPER_12, '12')
  damperControl(DAMPER_34, '34')
  damperControl(DAMPER_56, '56')
end

function updateZones()
  updateZone(ZONE_14, '14')
  updateZone(ZONE_15, '15')
  updateZone(ZONE_16, '16')
  updateZone(ZONE_17, '17')
  updateZone(ZONE_18, '18')
  updateZone(ZONE_19, '19')
  updateZone(ZONE_20, '20')
  updateZone(ZONE_21, '21')
  updateZone(ZONE_22, '22')
  updateZone(ZONE_23, '23')
  updateZone(ZONE_24, '24')
  updateZone(ZONE_25, '25')
  updateZone(ZONE_26, '26')
end

function updateAlarms()
  zoneTempAlarm(ZONE_14, '14')
  zoneTempAlarm(ZONE_15, '15')
  zoneTempAlarm(ZONE_16, '16')
  zoneTempAlarm(ZONE_17, '17')
  zoneTempAlarm(ZONE_18, '18')
  zoneTempAlarm(ZONE_19, '19')
  zoneTempAlarm(ZONE_20, '20')
  zoneTempAlarm(ZONE_21, '21')
  zoneTempAlarm(ZONE_22, '22')
  zoneTempAlarm(ZONE_23, '23')
  zoneTempAlarm(ZONE_24, '24')
  zoneTempAlarm(ZONE_25, '25')
  zoneTempAlarm(ZONE_26, '26')
  blowerFaultAlarm(BLOWER_45, '45', 'Blower 14/15')
  blowerFaultAlarm(BLOWER_16, '16', 'Blower 16')
  blowerFaultAlarm(BLOWER_78, '78', 'Blower 17/18')
  blowerFaultAlarm(BLOWER_90, '90', 'Blower 19/20')
  blowerFaultAlarm(BLOWER_12, '12', 'Blower 21/22')
  blowerFaultAlarm(BLOWER_34, '34', 'Blower 23/24')
  blowerFaultAlarm(BLOWER_56, '56', 'Blower 25/26')
end

if not luatest_running then
  sleep(30000)
  while init_complete do
    sleep(60000)
    updateAlarms()
  end
end
