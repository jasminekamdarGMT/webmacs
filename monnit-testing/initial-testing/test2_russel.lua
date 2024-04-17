enableDebug()
--Designed to read ModBus TCP data from another device and display the converted IEEE754 floating number
--to a decimal number and save the information in a register value.
connected = 0
byteTable = {}

--Read Packet1
qtyHigh = 0
qtyLow = 5

reqPacket1Read = {
    0x00, -- TRX high byte (Transaction Identifier High)
    0x01, -- TRX low byte (Transaction Identifier Low)
    0x00, -- PTC high byte (Protocol Identifier High, always 0 for Modbus TCP)
    0x00, -- PTC low byte (Protocol Identifier Low, always 0 for Modbus TCP)
    0x00, -- LEN high byte (Length High, to be calculated based on payload)
    0x06, -- LEN low byte (Length Low, fixed for certain requests, here calculated as 1 + 1 + 2 + 2 = 6 bytes follow)
    0x01, -- UNT (Unit Identifier, adjust as needed, often 1 for single device setups)
    0x03, -- FCD (Function Code, for reading holding registers)
    0x00, -- SAD high byte (Starting Address High, starting at register 40001 adjusted to 0x0000)
    0x00, -- SAD low byte (Starting Address Low, completing the address)
    0x00, -- QTY high byte (Quantity High, for 5 registers, the high byte is 0)
    0x05  -- QTY low byte (Quantity Low, for 5 registers)
}


while true do
    if connected == 0 then
        print("Connecting")
        rc = tcpConnect("10.0.0.151", 502, 3000)  --rc = 1 or error code
        if rc == 1 then
            print("Connected")
            connected = 1
        end
    end
    
    -- if connected send messages
    if connected == 1 then
        print("Send Packet 1 Read")
        rc = tcpSend(reqPacket1Read) --rc = #bytes sent, or error code
        print("Sent " .. rc .. " bytes")
        if rc > 0 then
            rsp = tcpRecv()  --rsp = #bytes received, or error code
            print('received '..rsp..' bytes')
            rspB = responseGetBytes(0,rsp) ---rspB = data or error code
            --note:  will need to also use qtyHigh and qtyLow for lots of registers
            tcpClose()
            
            
            print("Data")
            for k, v in pairs(rspB) do
        				--print("K: " .. k .. " V: " .. v.."  "..string.format("%02x", v))
        				print("K: " .. k .. " V: " .. v.."  "..string.format("%02x", v).."  "..tonumber(v))
                --print("K: " .. k .. " V: " .. string.format("%02x", v))
                --print()
                byteTable[k] = tonumber(v)
                --print(byteTable[k])
            end

            -- Uncomment and fix this call as needed
            -- print(UnpackIEEE754(byteTable))
        end
    end
    sleep(5000)
end