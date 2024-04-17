local lu = require('luaunit')

blower_ids = {'01', '02', '03', '04', '05', '06', '07', '08', '09', '10'}
zone_probe_ids = {}
zone_ids = {'01', '02', '03', '04', '05', '06', '07', '08', '09', '10'}
facilities_dir = 'facilities/'
facility_type = 'single_direction/'
facility_path = facilities_dir..facility_type
facility_name = "strathmore"

has_blower_speed_control = false

luatest_running = true
package.path = package.path .. ';'..facility_path..'x600m/scripts/?.lua;'..facility_path..facility_name..'/scripts/?.lua'
require(facility_path..'x600m/scripts/test_helpers')
require('data_functions')
require('damper_functions')
require('blower_functions')
require('temp_functions')
require('facility_configuration')

-- special test env variables
webmacs_db_path = facility_path..facility_name..'/tests/'
os.execute("rm " .. webmacs_db_path .. "*.db")

function appendFacilityIO(io)
  for i, blower_id in ipairs(blower_ids) do
    io['blower' .. blower_id .. 'run'] = 0
  end
end

function appendFacilityReg(reg)
  for i, blower_id in ipairs(blower_ids) do
    reg['blower' .. blower_id .. 'control'] = 0
    reg['blower' .. blower_id .. 'cycle'] = 0
    reg['blower' .. blower_id .. 'override'] = 0
    reg['blower' .. blower_id .. 'offtimer'] = 0
  end
end

TestWebmacsScripts = {}
  function TestWebmacsScripts:setUp()
    io = initIO()
    reg = initRegisters()
  end

  function TestWebmacsScripts:tearDown()
    lu.assertEquals(var_names_are_valid(), true)
  end

  function TestWebmacsScripts:test_blower_on_count()
    groupPrefixes = {'blower01', 'blower02', 'blower03', 'blower04', 'blower05'}
    reg['blower01control'] = 1
    reg['blower02control'] = 0
    reg['blower03control'] = 1
    reg['blower04control'] = 0
    reg['blower05control'] = 1
    lu.assertEquals(blowerOnCount(groupPrefixes), 3)
  end

  function TestWebmacsScripts:test_manual_blower_control()
    initSequence()
    -- if blower is set to manual override, it will run
    reg['blower01override'] = 1
    reg['blower01control'] = 1
    io['blower01run'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    -- it will not start another blower for 5 seconds
    reg['blower02override'] = 1
    reg['blower02control'] = 1
    io['blower02run'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 0)
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 1)
    -- if there are already 2 blowers running, it will not start a third
    reg['blower03override'] = 1
    reg['blower03control'] = 0
    io['blower03run'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    -- maintains the 2 running blower limit on a successive loop
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
  end

  function TestWebmacsScripts:test_auto_blower_control()
    initSequence()
    -- if blower is set to auto, it will run
    reg['blower01override'] = 0
    reg['blower01control'] = 0
    reg['zone01control'] = 1
    io['blower01run'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    -- it will not start another blower for 5 seconds
    reg['blower02override'] = 0
    reg['blower02control'] = 0
    reg['zone02control'] = 1
    io['blower02run'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 0)
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 1)
    -- if there are already 2 blowers running, it will not start a third
    reg['blower03override'] = 0
    reg['blower03control'] = 0
    reg['zone03control'] = 1
    io['blower03run'] = 0
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    -- maintains the 2 running blower limit on a successive loop
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    -- if third blower set to manual and control on
    reg['blower03override'] = 1
    reg['blower03control'] = 1
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
    reg['blower01cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 1)
    -- if third blower is set as manual and control turned off
    reg['blower03control'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 0)
  end

  function TestWebmacsScripts:test_blower_run_sequence()
    initSequence()
    -- set all zones online
    for i, zone_id in ipairs(zone_ids) do
      reg['zone' .. zone_id .. 'control'] = 1
    end
    -- set all blowers to auto and off
    for i, blower_id in ipairs(blower_ids) do
      reg['blower' .. blower_id .. 'control'] = 0
      reg['blower' .. blower_id .. 'cycle'] = 0
      reg['blower' .. blower_id .. 'override'] = 0
      reg['blower' .. blower_id .. 'offtimer'] = 0
      io['blower' .. blower_id .. 'run'] = 0
    end
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 0)
    lu.assertEquals(io['blower06run'], 0)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 0)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 0)
    -- overrides get first dibs
    reg['blower03override'] = 1
    reg['blower10override'] = 1
    reg['blower03control'] = 1
    reg['blower10control'] = 1
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 0)
    lu.assertEquals(io['blower06run'], 0)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 0)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 1)
    -- if 5 second delays have passed first blower in each group should run
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 0)
    lu.assertEquals(io['blower06run'], 1)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 0)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 1)
    -- if blower in each group reaches end of cycle set next blower that is not running to run
    reg['blower01cycle'] = 0
    reg['blower06cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 0)
    lu.assertEquals(io['blower06run'], 0)
    lu.assertEquals(io['blower07run'], 1)
    lu.assertEquals(io['blower08run'], 0)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 1)
    reg['blower02cycle'] = 0
    reg['blower07cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 1)
    lu.assertEquals(io['blower05run'], 0)
    lu.assertEquals(io['blower06run'], 0)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 1)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 1)
    reg['blower04cycle'] = 0
    reg['blower08cycle'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 1)
    lu.assertEquals(io['blower06run'], 0)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 0)
    lu.assertEquals(io['blower09run'], 1)
    lu.assertEquals(io['blower10run'], 1)
    reg['blower05cycle'] = 0
    reg['blower09cycle'] = 0
    updateBlowers()
    -- next cycle restarts blower sequence
    reg['blower01offtimer'] = 0
    reg['blower06offtimer'] = 0
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 0)
    lu.assertEquals(io['blower06run'], 1)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 0)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 1)
    reg['blower01cycle'] = 0
    reg['blower06cycle'] = 0
    reg['blower02offtimer'] = 0
    reg['blower07offtimer'] = 0
    updateBlowers()
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 1)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 0)
    lu.assertEquals(io['blower06run'], 0)
    lu.assertEquals(io['blower07run'], 1)
    lu.assertEquals(io['blower08run'], 0)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 1)
    -- if zone is offline skip that blower
    reg['zone04control'] = 0
    reg['blower02cycle'] = 0
    reg['blower07cycle'] = 0
    updateBlowers()
    reg['blower05offtimer'] = 0
    reg['blower08offtimer'] = 0
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 0)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 1)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 1)
    lu.assertEquals(io['blower06run'], 0)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 1)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 1)
    -- if overrides are turned off sequence continues as normal
    reg['blower03override'] = 0
    reg['blower10override'] = 0
    updateBlowers()
    reg['blower01offtimer'] = 0
    reg['blower06offtimer'] = 0
    reg['group01startdelay'] = 0
    reg['group02startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower01run'], 1)
    lu.assertEquals(io['blower02run'], 0)
    lu.assertEquals(io['blower03run'], 0)
    lu.assertEquals(io['blower04run'], 0)
    lu.assertEquals(io['blower05run'], 1)
    lu.assertEquals(io['blower06run'], 1)
    lu.assertEquals(io['blower07run'], 0)
    lu.assertEquals(io['blower08run'], 1)
    lu.assertEquals(io['blower09run'], 0)
    lu.assertEquals(io['blower10run'], 0)
  end

  function TestWebmacsScripts:test_handle_pending_blower()
    initSequence()
    -- if blower offtimer > 0 blower does not start
    reg['blower01override'] = 0
    reg['blower01control'] = 1
    reg['blower01cycle'] = 0
    reg['blower02override'] = 0
    reg['blower02control'] = 1
    io['blower02run'] = 0
    reg['blower02offtimer'] = 100
    reg['zone02control'] = 1
    reg['group01startdelay'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 0)
    -- if blower offtimer == 0 blower starts
    reg['blower02offtimer'] = 0
    updateBlowers()
    lu.assertEquals(io['blower02run'], 1)
  end

  function TestWebmacsScripts:test_manual_damper_control()
    initSequence()
    -- if blower is set to manual override, it will alternate damper
    reg['blower01override'] = 1
    reg['blower01control'] = 1
    reg['zone01dampercycle'] = 200
    updateDampers()
    lu.assertEquals(io['damper01control'], 1)
    reg['zone01dampercycle'] = 400
    updateDampers()
    lu.assertEquals(io['damper01control'], 0)
  end

  function TestWebmacsScripts:test_auto_damper_control()
    initSequence()
    reg['blower01override'] = 0
    reg['blower01control'] = 1
    reg['blower01cycle'] = 200
    updateDampers()
    lu.assertEquals(io['damper01control'], 1)
    reg['blower01cycle'] = 400
    updateDampers()
    lu.assertEquals(io['damper01control'], 0)
  end
-- end of table TestWebmacsScripts

local runner = lu.LuaUnit.new()
runner:setOutputType("tap")
os.exit( runner:runSuite() )
