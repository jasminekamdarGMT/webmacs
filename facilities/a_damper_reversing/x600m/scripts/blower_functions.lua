local str__speed,
      str__control,
      str__pressuresp,
      str__override,
      str__int_error,
      str__prev_error,
      str__cycleontime,
      str__cycleofftime,
      str__idletimer,
      str__Mister,
      str__mister,
      str__mistertimer,
      str__misteroverride,
      str__premister,
      str__duct,
      str__blower,
      str__direction,
      str__lvtemp,
      str__TempSetPoint,
      str__revdamper,
      str__revtimer =
      'speed',
      'control',
      'pressuresp',
      'override',
      'int_error',
      'prev_error',
      'cycleontime',
      'cycleofftime',
      'idletimer',
      'Mister',
      'mister',
      'mistertimer',
      'misteroverride',
      'premister',
      'duct',
      'blower',
      'direction',
      'lvtemp',
      'TempSetPoint',
      'revdamper',
      'revtimer'

UPDATE_BLOWER_STARTUP_LATER = {}
BLOWER_CYCLE_IDLE_TIME = 7

function initBlower(blower_id)
  local BLOWER = {}
  BLOWER[str__prev_error] = 0
  BLOWER[str__int_error] = 0
  BLOWER[str__control] = 100
  BLOWER["fault_email"] = 0
  _G['BLOWER_'..blower_id] = BLOWER
end

function updateBlowerPIDValues(pid,current_temp,set_point,min_speed,max_speed)
  local min_vfd_speed = 0
  local max_vfd_speed = 100
  if min_speed ~= nil then
    min_vfd_speed = min_speed
  end
  if max_speed ~= nil then
    max_vfd_speed = max_speed
  end
  if current_temp ~= current_temp then
    current_temp = set_point
  end
  if set_point == 0 then
    set_point = current_temp
  end

  local curr_error = 100 - (tonumber(current_temp) / tonumber(set_point)) * 100
  local diff
  local p_term
  local i_term
  local d_term
  local dt = getNumericSetting('BlowerDerivativeTime', 10)

  pid[str__int_error] = tonumber(pid[str__int_error]) + curr_error * dt
  if pid[str__int_error] < 0 then
    pid[str__int_error] = 0
  end
  if pid[str__int_error] > 100 - tonumber(min_vfd_speed) then
    pid[str__int_error] = 100 - tonumber(min_vfd_speed)
  end

  diff = (curr_error - tonumber(pid[str__prev_error])) / dt

  p_term = tonumber(SETTINGS["BlowerGain"]) * curr_error
  i_term = tonumber(SETTINGS["BlowerIntegral"]) * pid[str__int_error]
  d_term = tonumber(SETTINGS["BlowerDerivative"]) * diff

  local result = p_term + i_term + d_term
  digits = 10 ^ 2
  result = math.floor(result * digits + 0.5) / digits

  pid[str__control] = result

  if pid[str__control] < 0 then
    pid[str__control] = 0
  end
  if pid[str__control] > 100 - tonumber(min_vfd_speed) then
    pid[str__control] = 100 - tonumber(min_vfd_speed)
  end

  pid[str__control] = 100 - pid[str__control]

  pid[str__prev_error] = curr_error

  if tonumber(pid[str__control]) < tonumber(min_vfd_speed) then
    pid[str__control] = tonumber(min_vfd_speed)
    pid[str__prev_error] = 0
  end
  if tonumber(pid[str__control]) > tonumber(max_vfd_speed) then
    pid[str__control] = tonumber(max_vfd_speed)
  end
end

function updateBlowerPIDPressureValues(pid,current_pressure,set_point,bl_pref,min_speed,max_speed)
  local curr_error = -(current_pressure - set_point)
  local diff,p_term,i_term,d_term
  local dt = getNumericSetting('BlowerDerivativeTime', 10)
  local min_vfd_speed = 0
  local max_vfd_speed = 100
  if min_speed ~= nil then
    min_vfd_speed = tonumber(min_speed)
  end
  if max_speed ~= nil then
    max_vfd_speed = tonumber(max_speed)
  end
  if reg[bl_pref..str__idletimer] ~= nil and reg[bl_pref..str__idletimer] > 0 then
    pid[str__control] = min_vfd_speed
    curr_error = 0
  else
    if pid[str__int_error] ~= pid[str__int_error] then
      pid[str__int_error] = 0
    end
    pid[str__int_error] = pid[str__int_error] + curr_error * dt

    if tonumber(pid[str__int_error]) < min_vfd_speed then
      pid[str__int_error] = min_vfd_speed
    end
    if tonumber(pid[str__int_error]) > max_vfd_speed then
      pid[str__int_error] = max_vfd_speed
    end

    diff = (curr_error - pid[str__prev_error]) / dt

    p_term = SETTINGS["BlowerGain"] * curr_error
    i_term = SETTINGS["BlowerIntegral"] * pid[str__int_error]
    d_term = SETTINGS["BlowerDerivative"] * diff

    result = p_term + i_term + d_term
    digits = 10 ^ 2
    result = math.floor(result * digits + 0.5) / digits
    pid[str__control] = result

    if tonumber(pid[str__control]) < min_vfd_speed then
      pid[str__control] = min_vfd_speed
      pid[str__prev_error] = 0
    end
    if tonumber(pid[str__control]) > max_vfd_speed then
      pid[str__control] = max_vfd_speed
    end
  end

  if curr_error ~= curr_error then
    pid[str__prev_error] = 0
  else
    pid[str__prev_error] = curr_error
  end
end

function stopBlower(bl_pref)
  io[bl_pref..'run'] = 0
  if io[bl_pref..str__speed] ~= nil then
    io[bl_pref..str__speed] = 0
    reg[bl_pref..'value'] = 0
  end
end

function blowerHasFault(bl_pref)
  if io[bl_pref..'fault'] ~= nil and io[bl_pref..'fault'] == 0 then
    return true
  else
    return false
  end
end

function autoBlowerSpeedControl(bl_pref,feedback_value,min_speed,max_speed)
  local min_vfd_speed = 0
  local max_vfd_speed = 100
  if min_speed ~= nil then
    min_vfd_speed = min_speed
  end
  if max_speed ~= nil then
    max_vfd_speed = max_speed
  end
  if reg[bl_pref..str__override] == 0 then
    if feedback_value > 0 and blowerHasFault(bl_pref) == false then
      reg[bl_pref..str__control] = 1
    else
      reg[bl_pref..str__control] = 0
    end
  end
  if reg[bl_pref..str__control] == 1 then
    if reg[bl_pref..str__idletimer] ~= nil and reg[bl_pref..str__idletimer] > 0 then
      io[bl_pref..str__speed] = tonumber(min_vfd_speed)
      reg[bl_pref..'value'] = tonumber(min_vfd_speed)
    elseif blowerHasFault(bl_pref) == false and reg[bl_pref..str__override] == 0 then
      return true
    elseif reg[bl_pref..str__override] == 1 then
      if reg[bl_pref..str__idletimer] ~= nil and reg[bl_pref..str__idletimer] < 1 then
        local prerev_speed = reg[bl_pref..'prerevspeed']
        if prerev_speed > 0 and prerev_speed ~= reg[bl_pref..'value'] then
          reg[bl_pref..'value'] = prerev_speed
          reg[bl_pref..'prerevspeed'] = 0
        end
      end
      if io[bl_pref..str__speed] ~= nil then
        io[bl_pref..str__speed] = reg[bl_pref..'value']
      end
    elseif io[bl_pref..str__speed] ~= nil then
      io[bl_pref..str__speed] = 0
      reg[bl_pref..'value'] = 0
    end
  elseif io[bl_pref..str__speed] ~= nil then
    io[bl_pref..str__speed] = 0
    reg[bl_pref..'value'] = 0
  end
  return false
end

function blowerSetDirection(bl_pref,new_dir,idle_time,next_cycle_time)
  if reg[bl_pref..str__direction] ~= new_dir then
    saveBlwrSpeed(bl_pref)
    reg[bl_pref..str__revtimer] = next_cycle_time
    reg[bl_pref..str__idletimer] = idle_time
    reg[bl_pref..str__direction] = new_dir
  end
end

function A_DamperTimerControl(bl_pref,temp_avg,temp_sp,zones_online)
  local half_of_idle_time = BLOWER_CYCLE_IDLE_TIME * 30
  local bl_dir = reg[bl_pref..str__direction]
  local new_dir = 1
  local next_cycle_time = 0
  if reg[bl_pref..str__idletimer] > 0 and reg[bl_pref..str__idletimer] < half_of_idle_time then
    if reg[bl_pref..str__revdamper] ~= bl_dir then
      reg[bl_pref..str__idletimer] = half_of_idle_time
      reg[bl_pref..str__revdamper] = bl_dir
      updateDampers()
    end
  elseif reg[bl_pref..'revoverride'] > 0 then
    if reg[bl_pref..str__revdamper] ~= bl_dir and reg[bl_pref..str__idletimer] < 1 then
      new_dir = bl_dir
      local from,to = 'A','B'
      if new_dir == 0 then
        from,to = 'B','A'
      end
      copyDamperValues(new_dir,from,to)
      saveBlwrSpeed(bl_pref)
      reg[bl_pref..str__idletimer] = half_of_idle_time * 2
    elseif reg[bl_pref..str__revdamper] ~= bl_dir and reg[bl_pref..str__idletimer] < half_of_idle_time then
      reg[bl_pref..str__revdamper] = bl_dir
    end
    reg[bl_pref..str__revtimer] = 0
  elseif temp_avg > tonumber(temp_sp) and zones_online > 0 then
    if new_dir ~= nil and bl_dir ~= new_dir then
      local from,to = 'B','A'
      copyDamperValues(new_dir,from,to)
    end
    blowerSetDirection(bl_pref,new_dir,half_of_idle_time * 2,next_cycle_time)
  elseif reg[bl_pref..str__revtimer] == 0 and zones_online > 0 then
    next_cycle_time = SETTINGS["BlowerCyclePositiveTime"]
    if bl_dir == 1 then
      new_dir = 0
      next_cycle_time = SETTINGS["BlowerCycleNegativeTime"]
    end
    local from,to = 'A','B'
    if new_dir == 0 then
      from,to = 'B','A'
    end
    copyDamperValues(new_dir,from,to)
    blowerSetDirection(bl_pref,new_dir,half_of_idle_time * 2,next_cycle_time * 60)
  end
end

function A_DamperPressureControl(BLOWER,bl_pref,current_pressure,pressure_setpoint,zones_online,min_speed,max_speed)
  if autoBlowerSpeedControl(bl_pref,zones_online,min_speed,max_speed) == true then
    updateBlowerPIDPressureValues(BLOWER,current_pressure,pressure_setpoint,bl_pref,min_speed,max_speed)
    io[bl_pref..'speed'] = BLOWER[str__control]
    reg[bl_pref..'value'] = BLOWER[str__control]
  end
  io[bl_pref..'run'] = reg[bl_pref..str__control]
end

function A_DamperDirectionControl(bl_id,zones_online,top_avg,btm_avg,biofilters_temp_avg,top_sp,btm_sp)
  local bl_pref = str__blower..bl_id
  local bl_dir = reg[bl_pref..str__direction]
  local half_idle_time = BLOWER_CYCLE_IDLE_TIME * 30
  local new_dir
  if reg[bl_pref..str__idletimer] > 0 and reg[bl_pref..str__idletimer] < half_idle_time then
    if reg[bl_pref..str__revdamper] ~= bl_dir then
      reg[bl_pref..str__idletimer] = half_idle_time
      reg[bl_pref..str__revdamper] = bl_dir
      updateDampers()
    end
  elseif reg[bl_pref..'revoverride'] > 0 then
    if reg[bl_pref..str__revdamper] ~= bl_dir and reg[bl_pref..str__idletimer] < 1 then
      new_dir = bl_dir
      local from,to = 'A','B'
      if new_dir == 0 then
        from,to = 'B','A'
      end
      copyDamperValues(new_dir,from,to)
      saveBlwrSpeed(bl_pref)
      reg[bl_pref..str__idletimer] = half_idle_time * 2
    end
    reg[bl_pref..str__revtimer] = 0
  elseif zones_online > 0 then
    local can_reverse = reg[bl_pref..str__revtimer] == 0
    local biofilter_force_positive = biofilters_temp_avg > tonumber(SETTINGS["BiofilterForcePositiveTemperature"])
    if biofilter_force_positive then
      new_dir = 1
    elseif btm_avg <= btm_sp and top_avg > top_sp then
      new_dir = 0
    elseif top_avg <= top_sp and btm_avg > btm_sp then
      new_dir = 1
    end
    if new_dir ~= nil and bl_dir ~= new_dir then
      if can_reverse or biofilter_force_positive then
        local idle_time = half_idle_time * 2
        local next_cycle_time = tonumber(SETTINGS["BlowerCyclePositiveTime"]) * 60 + idle_time
        if new_dir == 0 then
          next_cycle_time = tonumber(SETTINGS["BlowerCycleNegativeTime"]) * 60 + idle_time
        end
        local from,to = 'A','B'
        if new_dir == 0 then
          from,to = 'B','A'
        end
        copyDamperValues(new_dir,from,to)
        blowerSetDirection(bl_pref,new_dir,idle_time,next_cycle_time)
      end
    end
  end
end

function blowerFaultAlarm(BLOWER,blower_id,blower_title)
  if blowerHasFault('blower'..blower_id) == true then
    if BLOWER['fault_email'] == 0 then
      sendAlarm(blower_title,"Fault")
      BLOWER['fault_email'] = 1
    end
  else
    BLOWER['fault_email'] = 0
  end
end

function updateDuctPressureSetpoint(blwr_id, zone_ids, probe_ids, is_reversing_system, control_temp_aggregate)
  local duct_pref = "duct"..blwr_id
  local timer = duct_pref..'presssptimer'
  if io['blower'..blwr_id..'run'] == 1 then
    if tonumber(reg[timer]) == 0 then
      reg[timer] = SETTINGS["PressureSetpointChangeTimer"] * 60
      local hot_zones_count = 0
      local cold_zones_count = 0
      local setpoint_interval = tonumber(SETTINGS["PressureSetpointChangeInterval"])
      local setpoint_max,setpoint_min,pressure_sp_reg
      if is_reversing_system then
        if reg[str__blower..blwr_id..str__revdamper] == 0 then
          setpoint_min = tonumber(SETTINGS["NegDirPressureSetpointMin"])
          setpoint_max = tonumber(SETTINGS["NegDirPressureSetpointMax"])
          pressure_sp_reg = duct_pref..'negpressuresp'
        else
          setpoint_min = tonumber(SETTINGS["PosDirPressureSetpointMin"])
          setpoint_max = tonumber(SETTINGS["PosDirPressureSetpointMax"])
          pressure_sp_reg = duct_pref..'pospressuresp'
        end
      else
        setpoint_max = tonumber(SETTINGS["PressureSetpointMax"])
        setpoint_min = tonumber(SETTINGS["PressureSetpointMin"])
        pressure_sp_reg = duct_pref..str__pressuresp
      end
      local curr_pressuresp = reg[pressure_sp_reg]
      for i,zn_id in ipairs(zone_ids) do
        if reg['loadzone'..zn_id..'active'] ~= 1 then
          local control_temp = tempAvgForZones({zn_id},probe_ids)
          if control_temp_aggregate ~= nil then
            if control_temp_aggregate == 'min' then
              control_temp = minTempForZones({zn_id},probe_ids)
            elseif control_temp_aggregate == 'max' then
              control_temp = maxTempForZones({zn_id},probe_ids)
            end
          end
          control_temp = tonumber(control_temp)
          local zone_setpoint = tonumber(spForZone(zn_id))
          if reg['zone'..zn_id..str__control] == 1 then
            if control_temp > zone_setpoint then
              hot_zones_count = hot_zones_count + 1
            elseif control_temp > 0 and control_temp < zone_setpoint then
              cold_zones_count = cold_zones_count + 1
            end
          end
        end
      end
      local online_zones = zonesOnline(zone_ids)
      if hot_zones_count / online_zones * 100 >= tonumber(SETTINGS["PressureSetpointHotZoneTrigger"]) then
        reg[duct_pref..str__pressuresp] = curr_pressuresp + setpoint_interval
      elseif cold_zones_count / online_zones * 100 >= tonumber(SETTINGS["PressureSetpointColdZoneTrigger"]) then
        reg[duct_pref..str__pressuresp] = curr_pressuresp - setpoint_interval
      end
      if reg[duct_pref..str__pressuresp] > setpoint_max then
        reg[duct_pref..str__pressuresp] = setpoint_max
      elseif reg[duct_pref..str__pressuresp] < setpoint_min then
        reg[duct_pref..str__pressuresp] = setpoint_min
      end
      reg[pressure_sp_reg] = reg[duct_pref..str__pressuresp]
    end
  end
end

function updateMisters(biofilter_probe_ids)
  for i,bl_id in ipairs(BLOWER_IDS) do
    local timer = reg[str__duct..bl_id..str__mistertimer]
    local ontime = tonumber(SETTINGS[str__Mister.."OnTime"]) * 60
    local offtime = tonumber(SETTINGS[str__Mister.."OffTime"]) * 60
    if io[str__blower..bl_id..'run'] == 1 and reg[str__blower..bl_id..str__idletimer] == 0 then
      if reg[str__duct..bl_id..str__mister..'override'] == 1 then
        if reg[str__duct..bl_id..str__mister.."control"] == 1 then
          if timer == 0 then
            reg[str__duct..bl_id..str__mistertimer] = ontime + offtime
            io[str__duct..bl_id..str__mister] = 1
          elseif timer <= offtime then
            io[str__duct..bl_id..str__mister] = 0
          else
            io[str__duct..bl_id..str__mister] = 1
          end
        else
          reg[str__duct..bl_id..str__mistertimer] = 0
          io[str__duct..bl_id..str__mister] = 0
        end
      else
        local temp,
              air_dir =
              reg[str__premister..bl_id..str__lvtemp],
              'Pos'

        if reg[str__blower..bl_id..str__direction] == 0 then
          temp = tempAverageForBiofilters({bl_id},biofilter_probe_ids)
          air_dir = 'Neg'
        end

        if temp >= tonumber(SETTINGS[str__Mister..bl_id..air_dir..str__TempSetPoint]) then
          if timer == 0 then
            io[str__duct..bl_id..str__mister] = 1
            reg[str__duct..bl_id..str__mistertimer] = ontime + offtime
          elseif timer <= offtime then
            io[str__duct..bl_id..str__mister] = 0
          end
        else
          io[str__duct..bl_id..str__mister] = 0
        end
      end
    else
      io[str__duct..bl_id..str__mister] = 0
    end
  end
end

function saveBlwrSpeed(bl_pref)
  if reg[bl_pref..'override'] == 1 then
    reg[bl_pref..'prerevspeed'] = reg[bl_pref..'value']
  end
end

function ioAppearsValid(io_name)
  return (io[io_name] ~= nil and io[io_name] == io[io_name])
end

function getNumericSetting(setting_name, default)
  if SETTINGS[setting_name] ~= nil then
    return tonumber(SETTINGS[setting_name])
  elseif default ~= nil then
    return tonumber(default)
  else
    return 0
  end
end

if not luatest_running then
  while init_complete ~= true do
    sleep(1000)
  end
  while init_complete do
    if #UPDATE_BLOWER_STARTUP_LATER > 0 then
      sleep(1000)
      updateBlowersLater()
    else
      sleep(SETTINGS['BlowerRate'] * 1000)
      updateBlowers()
      for i,blwr_id in ipairs(BLOWER_IDS) do
        updateBlowerStartup(_G['BLOWER_'..blwr_id], blwr_id)
      end
    end
  end
end
