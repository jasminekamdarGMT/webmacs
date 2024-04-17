-- Two Zone blower dispatch
while true do 
  if event.condEvent8 == 1 then              -- power ON
    if event.condEvent4 == 1 then            -- Z1 blower latch engaged
     io.relay8 = 1
     io.relay5 = 1
     io.relay6 = 0
     io.relay7 = 0
     reg.register9 = 100
    elseif event.condEvent13 == 1 then       -- Z1 duty cycle ON phase
     if io.relay1 == 1 then                  -- zone 1 active
       if event.condEvent2 == 1 then         -- avg temp >= sp+5
        io.relay8 = 1
        io.relay5 = 1
        io.relay6 = 0
        io.relay7 = 0
        reg.register9 = 100
       elseif event.condEvent3 == 1 then     -- sp+5 > avg temp > sp
        io.relay8 = 1
        io.relay5 = 0
        io.relay6 = 1
        io.relay7 = 0
        reg.register9 = 60
       elseif event.condEvent9 == 1 then     -- sp >= avg temp > sp-10
        io.relay8 = 1
        io.relay5 = 1
        io.relay6 = 1
        io.relay7 = 0
        reg.register9 = 40
       elseif event.condEvent10 == 1 then    -- sp-10 >= avg temp
        io.relay8 = 1
        io.relay5 = 0
        io.relay6 = 0
        io.relay7 = 1
        reg.register9 = 25
       end
     else                                    -- zone 1 OFF
      io.relay8 = 0
      io.relay5 = 0
      io.relay6 = 0
      io.relay7 = 0
      reg.register9 = 0
     end
    elseif event.condEvent13 == 0 then       -- Z1 duty cycle OFF phase
      io.relay8 = 0
      io.relay5 = 0
      io.relay6 = 0
      io.relay7 = 0
      reg.register9 = 0
    end                            	   -- end Z1
    if event.condEvent18 == 1 then 	   -- Z2 blower latch engaged
     io.relay12 = 1
     io.relay9 = 1
     io.relay10 = 0
     io.relay11 = 0    
     reg.register21 = 100
    elseif event.condEvent25 == 1 then       -- Z2 duty cycle ON phase
     if io.relay2 == 1 then                  -- zone 2 active
      if event.condEvent15 == 1 then         -- avg temp >= sp+5
       io.relay12 = 1
       io.relay9 = 1
       io.relay10 = 0
       io.relay11 = 0
       reg.register21 = 100
      elseif event.condEvent16 == 1 then     -- sp+5 > avg temp > sp
       io.relay12 = 1
       io.relay9 = 0
       io.relay10 = 1
       io.relay11 = 0
       reg.register21 = 60
      elseif event.condEvent22 == 1 then     -- sp >= avg temp > sp-10
       io.relay12 = 1
       io.relay9 = 1
       io.relay10 = 1
       io.relay11 = 0
       reg.register21 = 40
      elseif event.condEvent23 == 1 then     -- sp-10 >= avg temp
       io.relay12 = 1
       io.relay9 = 0
       io.relay10 = 0
       io.relay11 = 1
       reg.register21 = 25
      end
     else                                    -- Zone 2 OFF
      io.relay12 = 0
      io.relay9 = 0
      io.relay10 = 0
      io.relay11 = 0
      reg.register21 = 0
     end
    elseif event.condEvent25 == 0 then       -- Z2 duty cycle OFF phase
      io.relay12 = 0
      io.relay9 = 0
      io.relay10 = 0
      io.relay11 = 0
      reg.register21 = 0
    end					   -- end Z2
  end
  end
