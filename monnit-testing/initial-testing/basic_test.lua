enableDebug()

local t = 5000
local ts = t / 1000
local y = 0

host = '10.0.0.151'
port = 502

connected = tcpConnect(host, port, 3000)
if connected == 1 then
  print('connected')
end
tcpClose()

print('starting up')


while true do
  sleep (t)
  print('scanning every '..ts..' seconds')
  y = y + 1
  print('hello, there have been '..y..'scans')

  

end

while true do
  print('anything?')
end