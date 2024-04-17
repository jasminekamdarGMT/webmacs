local lu = require('luaunit')

function TestWebmacsScripts:test_update_blower_pid_pressure_values()
  initSequence()
  SETTINGS["MinVFDSpeed"] = "25"
  SETTINGS['BlowerRate'] = "10"
  SETTINGS["BlowerGain"] = ".5"
  SETTINGS["BlowerIntegral"] = "1"
  SETTINGS["BlowerDerivative"] = ".5"
  SETTINGS["BlowerDerivativeTime"] = "10"
  SETTINGS['PressureSetpoint2'] = "4"
  for i, blower_id in pairs(blower_ids) do
    SETTINGS["MaxVFDSpeed"] = "100"
    -- low pressure results in max vfd speed
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 31.65)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 61.5)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 91.5)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 100)
    -- respects max vfd speed setting
    SETTINGS["MaxVFDSpeed"] = "85"
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 1, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 85)
    -- high pressure result in min VFD speed
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 10, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 25)
    updateBlowerPIDPressureValues(_G['BLOWER_'..blower_id], 10, SETTINGS['PressureSetpoint2'], 'blower'..blower_id, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
    lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 25)
  end
end

function TestWebmacsScripts:test_auto_blower_speed_control()
  if has_blower_speed_control == true then
    initSequence()
    SETTINGS["MinVFDSpeed"] = 30
    SETTINGS["MaxVFDSpeed"] = 100
    for i, blower_id in pairs(blower_ids) do
      reg['blower'..blower_id..'override'] = 0
      reg['blower'..blower_id..'control'] = 1
      io["blower"..blower_id.."speed"] = 20
      reg["blower"..blower_id.."prerevspeed"] = 0
      reg["blower"..blower_id.."value"] = 48
      -- feedback_value is 0 therefore blowerxcontrol and blowerxspeed/value are set to 0.
      autoBlowerSpeedControl('blower'..blower_id, 0, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
      lu.assertEquals(reg["blower"..blower_id.."control"], 0)
      lu.assertEquals(io["blower"..blower_id.."speed"], 0)
      lu.assertEquals(reg["blower"..blower_id.."value"], 0)
      -- feedback_value > 0 therefore blowerxcontrol is enabled and
      -- blowerxspeed/value are set to MinVFDSpeed.
      if reg["blower"..blower_id..'idletimer'] ~= nil then
        reg["blower"..blower_id..'idletimer'] = 12
        autoBlowerSpeedControl('blower'..blower_id, 10, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
        lu.assertEquals(reg["blower"..blower_id.."control"], 1)
        lu.assertEquals(io["blower"..blower_id.."speed"], 30)
        lu.assertEquals(reg["blower"..blower_id.."value"], 30)
        reg["blower"..blower_id..'idletimer'] = 0
      end
      -- blowerxoverride and blowerxcontrol are enabled therefore
      -- blowerxspeed will be set to blowerxvalue.
      reg['blower'..blower_id..'control'] = 1
      reg["blower"..blower_id.."override"] = 1
      io["blower"..blower_id.."speed"] = 20
      reg["blower"..blower_id.."value"] = 48
      autoBlowerSpeedControl('blower'..blower_id, 10, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"])
      lu.assertEquals(reg["blower"..blower_id.."control"], 1)
      lu.assertEquals(io["blower"..blower_id.."speed"], 48)
      lu.assertEquals(reg["blower"..blower_id.."value"], 48)
      -- blowerxoverride is disabled and blowerxidletimer is nil and
      -- blowerxfault = 1 therefore autoBlowerSpeedControl returns true.
      reg["blower"..blower_id.."override"] = 0
      lu.assertEquals(autoBlowerSpeedControl('blower'..blower_id, 12, SETTINGS["MinVFDSpeed"], SETTINGS["MaxVFDSpeed"]), true)
    end
  end
end

function TestWebmacsScripts:test_blower_fault_alarms()
  initSequence()
  if has_blower_faults == false then
    return
  end
  for i, blower_id in pairs(blower_ids) do
    blower_label = blower_labels[i]
    -- with no fault, no email is sent
    io['blower'..blower_id..'fault'] = 1
    emails_sent = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 0)
    -- with a fault, alarm email is sent
    io['blower'..blower_id..'fault'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    lu.assertEquals(last_email_subject, SETTINGS["FacilityName"]..": Alarm raised on Blower " .. blower_label .. "!")
    -- if alarm persists, no additional emails are sent
    updateAlarms()
    lu.assertEquals(emails_sent, 1)
    -- if alarm goes away and comes back and email is sent again
    io['blower'..blower_id..'fault'] = 1
    updateAlarms()
    io['blower'..blower_id..'fault'] = 0
    updateAlarms()
    lu.assertEquals(emails_sent, 2)
  end
end

function TestWebmacsScripts:test_save_blower_speed()
  initSequence()
  for i, blower_id in pairs(blower_ids) do
    reg['blower'..blower_id..'prerevspeed'] = 0
    reg['blower'..blower_id..'value'] = 75
    reg['blower'..blower_id..'override'] = 1
    lu.assertEquals(reg['blower'..blower_id..'prerevspeed'],0)
    -- save blower speed as blowerXprerevspeed
    saveBlwrSpeed('blower'..blower_id)
    lu.assertEquals(reg['blower'..blower_id..'prerevspeed'],75)
  end
end
