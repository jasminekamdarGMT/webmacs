local lu = require('luaunit')

function TestWebmacsScripts:test_update_damper_averages()
  initSequence()
  SETTINGS["DataLoggingRate"] = 50
  for i, zone_id in pairs(zone_ids) do
    reg["zone"..zone_id.."control"] = 1
    first_10_values = {10, 30, 50, 70, 90, 100, 80, 60, 20, 0}
    for k, value in pairs(first_10_values) do
      io["damper"..zone_id.."position"] = value
      reg["zone"..zone_id.."avgtimer"] = 0
      updateDamperAverages()
    end
    lu.assertEquals(AVERAGE_ARRAYS['zone'..zone_id..'avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone'..zone_id..'avgdamper'], 51)
    lu.assertEquals(reg['zone'..zone_id..'avgtimer'], 300)
    -- if zone is offline or timer is not complete, does nothing
    io["damper"..zone_id.."position"] = 80
    reg["zone"..zone_id.."control"] = 0
    reg["zone"..zone_id.."avgtimer"] = 0
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone'..zone_id..'avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone'..zone_id..'avgdamper'], 51)
    reg["zone"..zone_id.."control"] = 1
    reg["zone"..zone_id.."avgtimer"] = 300
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone'..zone_id..'avgdamper'], {0, 20, 60, 80, 100, 90, 70, 50, 30, 10})
    lu.assertEquals(reg['zone'..zone_id..'avgdamper'], 51)
    -- otherwise, after 10 values, it starts rotating the table
    reg["zone"..zone_id.."control"] = 1
    reg["zone"..zone_id.."avgtimer"] = 0
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone'..zone_id..'avgdamper'], {80, 0, 20, 60, 80, 100, 90, 70, 50, 30})
    lu.assertEquals(reg['zone'..zone_id..'avgdamper'], 58)
    --with no historic values, it is just the lastest value
    AVERAGE_ARRAYS['zone'..zone_id..'avgdamper'] = {}
    io["damper"..zone_id.."position"] = 80
    reg["zone"..zone_id.."avgtimer"] = 0
    updateDamperAverages()
    lu.assertEquals(AVERAGE_ARRAYS['zone'..zone_id..'avgdamper'], {80})
    lu.assertEquals(reg["zone"..zone_id.."avgdamper"], 80)
  end
  initSequence()
end

function TestWebmacsScripts:test_update_damper_pid_values()
  initSequence()
  SETTINGS["MinDamperValue"] = "15"
  SETTINGS['DamperRate'] = "10"
  SETTINGS["DamperGain"] = "1"
  SETTINGS["DamperIntegral"] = "1"
  SETTINGS["DamperDerivative"] = "0.3"
  SETTINGS['DamperTempSetPoint'] = "100"
  for i, zone_id in pairs(zone_ids) do
    -- cold exhaust temps result in min damper position
    updateDamperPIDValues(_G['DAMPER_'..zone_id], 95, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 44.85)
    updateDamperPIDValues(_G['DAMPER_'..zone_id], 95, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
    -- warm exhaust temps result in increasing damper position
    updateDamperPIDValues(_G['DAMPER_'..zone_id], 105, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 70.3)
    updateDamperPIDValues(_G['DAMPER_'..zone_id], 105, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 100)
    -- decreasing temps result in decreasing damper position
    updateDamperPIDValues(_G['DAMPER_'..zone_id], 98, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(math.floor(_G['DAMPER_'..zone_id]['control']), 77)
    updateDamperPIDValues(_G['DAMPER_'..zone_id], 98, SETTINGS['DamperTempSetPoint'])
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 58)
  end
end

function TestWebmacsScripts:test_update_dampers()
  initSequence()
  SETTINGS["MinDamperValue"] = "15"
  SETTINGS["Regime1TempSetPoint"] = "135"
  SETTINGS["DamperGain"] = "1"
  SETTINGS["DamperIntegral"] = "1"
  SETTINGS["DamperDerivative"] = "0.3"
  SETTINGS["DamperDerivativeTime"] = "10"
  SETTINGS["DamperRate"] = "10"
  if has_blower_temp_setpoint == true then
    for i, blower_id in pairs(blower_ids) do
      SETTINGS["Blower"..blower_id.."TempSetPoint"] = "135"
    end
  end
  if has_zone_temp_setpoint == true then
    for i, zone_id in pairs(zone_ids) do
      SETTINGS["Zone"..zone_id.."TempSetPoint"] = "135"
    end
  end
  for i, zone_id in pairs(zone_ids) do
    zone_prefix = 'zone'..zone_id
    damper_prefix = 'damper'..zone_id
    reg[zone_prefix..'control'] = 1
    reg[damper_prefix..'override'] = 0
    if #zone_probe_ids == 1 then
      reg[zone_prefix..'lvtemp'] = 130
    elseif #zone_probe_ids == 2 then
      reg[zone_prefix..'pAlvtemp'] = 125
      reg[zone_prefix..'pBlvtemp'] = 135
    end
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 59.15)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 22.22)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 15)
    lu.assertEquals(io[damper_prefix..'position'], 15)
    if #zone_probe_ids == 1 then
      reg[zone_prefix..'lvtemp'] = 140
    elseif #zone_probe_ids == 2 then
      reg[zone_prefix..'pAlvtemp'] = 135
      reg[zone_prefix..'pBlvtemp'] = 145
    end
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 55.96)
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 92.78)
    reg[zone_prefix..'control'] = 0
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 0)
    reg[zone_prefix..'control'] = 1
    reg[damper_prefix..'override'] = 1
    reg[damper_prefix..'value'] = 80
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 80)
    -- with zone offline, manual override stays in effect
    reg[zone_prefix..'control'] = 0
    updateDampers()
    lu.assertEquals(_G['DAMPER_'..zone_id]['control'], 80)
  end
end
