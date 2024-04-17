local lu = require('luaunit')

-- TestWebmacsScripts = {}
  function TestWebmacsScripts:setUp()
    io = initIO()
    reg = initRegisters()
  end

  function TestWebmacsScripts:tearDown()
    lu.assertEquals(var_names_are_valid(), true)
  end

  function TestWebmacsScripts:test_init_values()
    initValues()
    for i, blower_id in pairs(blower_ids) do
      lu.assertEquals(_G['BLOWER_'..blower_id]['control'], 100)
    end
  end

  function TestWebmacsScripts:test_default_settings()
    local settings = defaultSettings()
    lu.assertEquals(settings['DataLoggingRate'], "120")
  end

  function TestWebmacsScripts:test_load_settings()
    initSequence()
    SETTINGS = {}
    loadSettings()
    lu.assertEquals(SETTINGS['DataLoggingRate'], "120")
  end

  function TestWebmacsScripts:test_batch_moving()
    initSequence()
    if #zone_ids >= 2 then
      -- with empty filename, creates new filename
      reg['zone01control'] = 1
      reg['zone02control'] = 0
      reg['zone01reset'] = 0
      reg['zone02reset'] = 0
      if has_regimes == true then
        reg['zone01regime'] = 0
        reg['zone01regtimer'] = 0
        reg['zone02regime'] = 0
        reg['zone02regtimer'] = 0
      end
      _G['ZONE_01']["file_name"] = ""
      _G['ZONE_02']["file_name"] = ""
      -- simulate user entering batch name
      updateZoneBatchTitle ('01', 'newbatchname')
      updateZones()
      lu.assertEquals(_G['ZONE_01']["file_name"], '01_01_2017_120000_newbatchname.csv')
      -- simulate move batch
      reg['zone01moveto'] = 2
      reg['zone02reset'] = 1
      updateZones()
      lu.assertEquals(_G['ZONE_01']["file_name"], '')
      lu.assertEquals(reg['zone01control'], 0)
      lu.assertEquals(_G['ZONE_02']["file_name"], '01_01_2017_120000_newbatchname.csv')
      lu.assertEquals(reg['zone02control'], 0)
    end
  end

  function TestWebmacsScripts:test_sort_table_asc()
    local vals = {101.1,100.5,99,99,105,103,102.8,102.4}
    local sorted_vals = sortTableAsc(vals)
    lu.assertEquals(sorted_vals[1],99)
    lu.assertEquals(sorted_vals[2],99)
    lu.assertEquals(sorted_vals[3],100.5)
    lu.assertEquals(sorted_vals[4],101.1)
    lu.assertEquals(sorted_vals[5],102.4)
    lu.assertEquals(sorted_vals[6],102.8)
    lu.assertEquals(sorted_vals[7],103)
    lu.assertEquals(sorted_vals[8],105)
  end

  function TestWebmacsScripts:test_log_insert()
    initSequence()
    local tmp = {}
    local res = logInsert(tmp,"Yes")
    lu.assertEquals(tmp[1],"Yes")
    tmp = {}
    res = logInsert(tmp,"No")
    lu.assertEquals(tmp[1],"No")
    tmp = {}
    res = logInsert(tmp,33)
    lu.assertEquals(tmp[1],33)
    -- negative values or nan values are logged as 0
    tmp = {}
    res = logInsert(tmp,-33)
    lu.assertEquals(tmp[1],0)
    tmp = {}
    -- simulate nan val returned from x600
    local v = 0/0
    res = logInsert(tmp,v)
    lu.assertEquals(tmp[1],0)
  end

  function TestWebmacsScripts:test_uid_func()
    local ids = {}
    ids = uid(1)
    lu.assertEquals(#ids,1)
    lu.assertEquals(ids[1],'01')
    ids = uid(3)
    lu.assertEquals(#ids,3)
    lu.assertEquals(ids[1],'01')
    lu.assertEquals(ids[2],'02')
    lu.assertEquals(ids[3],'03')
    ids = uid(9,12)
    lu.assertEquals(#ids,4)
    lu.assertEquals(ids[1],'09')
    lu.assertEquals(ids[2],'10')
    lu.assertEquals(ids[3],'11')
    lu.assertEquals(ids[4],'12')
    ids = uid(8,11,'P')
    lu.assertEquals(#ids,4)
    lu.assertEquals(ids[1],'P8')
    lu.assertEquals(ids[2],'P9')
    lu.assertEquals(ids[3],'P10')
    lu.assertEquals(ids[4],'P11')
  end
-- end of table TestWebmacsScripts
