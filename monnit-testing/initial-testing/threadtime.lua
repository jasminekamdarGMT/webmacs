enableDebug()

local lastTime = currentTime
local currentTime = time.now()
local compTime = time.getComponents(currentTime)

local sleepSec = 15
local thready = 'A'
local elapsTime
local tick = 'tick'

function prTick(tick)
    print(tick)
end

while true do
    lastTime = currentTime
    currentTime = time.now()
    compTime = time.getComponents(currentTime)
    elapsTime = time.getComponents(currentTime - lastTime)
    print(thready..'  current time: '..compTime.hour..':'..compTime.min..':'..compTime.sec..'      elapsed time is :'..elapsTime.min..':'..elapsTime.sec)
    
    --print('elapsed time is :'..elapsTime.min..':'..elapsTime.sec)
    print(thready..'  ###############    sleep  '..sleepSec..' seconds'  )
    sleep(sleepSec*1000)
    prTick(tick)
end
