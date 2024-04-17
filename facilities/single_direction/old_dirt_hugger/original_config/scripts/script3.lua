-- Duty Cycle Zone one
while true do
  if event.condEvent8 == 1 then
     reg.register12 = 1
     sleep(reg.register25 * 60000)
     reg.register12 = 0
     sleep(reg.register26 * 60000)
  end
end
