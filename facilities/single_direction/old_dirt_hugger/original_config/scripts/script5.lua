-- Z2 Duty Cycle
while true do
  if event.condEvent8 == 1 then
     reg.register24 = 0
     sleep(reg.register26 * 60000)
     reg.register24 = 1
     sleep(reg.register25 * 60000)
  end
end
