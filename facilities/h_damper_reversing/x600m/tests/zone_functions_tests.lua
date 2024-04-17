local lu = require('luaunit')

function TestWebmacsScripts:test_zone_regimes()
  if has_regimes == true then
    initSequence()
    if has_biofilter_mister_control == true then
      for i, blower_id in pairs(blower_ids) do
        io['blower'..blower_id..'revdamper'] = 1
      end
    end
    for i, zone_id in pairs(zone_ids) do
      reg['zone'..zone_id..'control'] = 1
      reg['zone'..zone_id..'reset'] = 1
      reg['zone'..zone_id..'regime'] = 0
      reg['zone'..zone_id..'regtimer'] = 0
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 1)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 432000)
      reg['zone'..zone_id..'regtimer'] = 0
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 2)
      lu.assertEquals(reg['zone'..zone_id..'regtimer'], 604800)
      reg['zone'..zone_id..'regtimer'] = 0
      updateZones()
      lu.assertEquals(reg['zone'..zone_id..'regime'], 3)
    end
    if #zone_ids > 1 then
      reg['zone02control'] = 0
      reg['zone01regime'] = 1
      reg['zone01regtimer'] = 0
      updateZones()
      lu.assertEquals(reg['zone01regime'], 2)
      lu.assertEquals(reg['zone02regime'], 3)
      reg['zone01moveto'] = 2
      reg['zone01regtimer'] = 5500
      updateZones()
      lu.assertEquals(reg['zone02regime'], 2)
      lu.assertEquals(reg['zone02regtimer'], 5500)
    end
  end
end
