-- increment Z2 batch age and PFRP
while true do
  if event.condEvent14 == 1 then
      sleep(8640000)
      reg.register19 = reg.register19 + .1
      if event.condEvent24 == 0 then
         reg.register23 = reg.register23 + .1
      end
  end
end
