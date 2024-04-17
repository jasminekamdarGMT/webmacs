-- increment Batch Age and PFRP
while true do
  if event.condEvent1 == 1 then
      sleep(8640000)
      reg.register7 = reg.register7 + .1
      if event.condEvent12 == 0 then
         reg.register11 = reg.register11 + .1
      end
  end
end
