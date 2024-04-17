enableDebug()
-- Designed to read ModBus TCP data from another device and display the converted IEEE754 floating number
-- to a decimal number and save the information in a register value.
connected = 0
byteTable = {}
sleepTime = 15
loopStartTime = time.now()  -- Time at the beginning of the loop

-- Define a function to calculate and print elapsed time
function printElapsedTime(previousTime, message)
    local currentTime = time.now()
    local elapsed = time.getComponents(currentTime - previousTime)
    print(message .. ' elapsed time is: ' .. elapsed.min .. 'm:' .. elapsed.sec .. 's')
    return currentTime  -- Return the current time for further tracking
end

-- Define request packet for reading 5 registers starting from register 40001
reqPacket1Read = {
    0x00, -- TRX high byte (Transaction Identifier High)
    0x01, -- TRX low byte (Transaction Identifier Low)
    0x00, -- PTC high byte (Protocol Identifier High, always 0 for Modbus TCP)
    0x00, -- PTC low byte (Protocol Identifier Low, always 0 for Modbus TCP)
    0x00, -- LEN high byte (Length High, to be calculated based on payload)
    0x06, -- LEN low byte (Length Low, fixed for certain requests)
    0x01, -- UNT (Unit Identifier)
    0x03, -- FCD (Function Code for reading holding registers)
    0x00, -- SAD high byte (Starting Address High, adjusted to 0x0000)
    0x64, -- SAD low byte (Starting Address Low) - start at 100
    0x00, -- QTY high byte (Quantity High, for 16 registers)
    0x10  -- QTY low byte (Quantity Low, for 16 registers)
}

while true do
    -- Track time from the beginning of the loop
    local lastTime = loopStartTime
    print('#####################')
    loopStartTime = printElapsedTime(lastTime, 'Loop start')  -- Update loopStartTime and print elapsed time

    if connected == 0 then
        print("Connecting")
        rc = tcpConnect("10.0.0.151", 502, 3000)  
        -- rc = 1 if successful, or error code
        if rc == 1 then
            print("Connected")
            connected = 1
            printElapsedTime(loopStartTime, 'After connection')  -- Measure time after connection
        else
            print("Connection failed with error: " .. rc)
        end
    end

    if connected == 1 then
        print("Sending Packet 1 Read")
        rc = tcpSend(reqPacket1Read)         
        -- rc = number of bytes sent, or error code
        print("Sent " .. rc .. " bytes")
        printElapsedTime(loopStartTime, 'After send')  -- Measure time after connection

        if rc > 0 then
            rsp = tcpRecv()  
            -- rsp = number of bytes received, or error code
            response = responseGetBytes(0, rsp)  -- response = data or error code
            print('Received ' .. #response .. ' bytes')
            printElapsedTime(loopStartTime, 'After received')  -- Measure time after connection      
            -- process result
            -- print("Transaction ID:", response[1] * 256 + response[2])
            -- print("Protocol ID:", response[3] * 256 + response[4])
            -- print("Length:", response[5] * 256 + response[6])
            -- print("Unit ID:", response[7])
            -- print("Function Code:", response[8])
            -- print("Byte Count:", response[9])
            -- Output register data
            -- print("Register Data:")
            -- for i = 10, 40, 2 do  -- Start at 10th byte, increment by 2, stop at 40 (10 + 32 bytes of data)
            --     local register_index = (i - 10) / 2 + 1  -- Calculate register index
            --     local register_value = response[i] * 256 + response[i + 1]  -- Combine two bytes to form the register value
            --     print(string.format("Register %d: %d (0x%04X)", register_index, register_value, register_value))
            -- end

            -- Function to parse registers from response
            local function parseRegisters(response)
                local startIndex = 10 -- Starting index for register data in response array
                local registers = {}
                for i = startIndex, #response, 2 do
                    local register_value = response[i] * 256 + response[i + 1]
                    table.insert(registers, register_value)
                end
                return registers
            end

            -- Extracting register values
            local registers = parseRegisters(response)

            -- Combining Sensor ID_High and Sensor ID_Low to form a complete Sensor ID
            local sensorID = registers[1] * 65536 + registers[2] -- Shift Sensor ID_High left by 16 bits and add Sensor ID_Low
            -- Combine and print the first set of outputs
            print(string.format("Sensor ID: %d, Device Type: %d, Data Age: %d, Device Active: %d", 
            sensorID, registers[3], registers[4], registers[5]))
            -- Combine and print the second set of outputs
            print(string.format("Is Aware: %d, Voltage: %d, RSSI: %d", 
            registers[6], registers[7], registers[8]))

            -- -- Printing out the values
            -- print("Sensor ID:", sensorID)
            -- print("Device Type:", registers[3])
            -- print("Data Age:", registers[4])
            -- print("Device Active:", registers[5])
            -- print("Is Aware:", registers[6])
            -- print("Voltage:", registers[7])
            -- print("RSSI:", registers[8])
            -- for i = 9, 16 do
            --     print(string.format("Data %d: %d", i - 8, registers[i]))
            -- end
            temperatureF = registers[9]*9/50+32
            print('temperature is '..temperatureF..'°F')
        else
            print("Failed to send packet, error code: " .. rc)
        end
    end
    print('sleeping for '..sleepTime..' seconds')
    sleep(sleepTime*1000)  -- Sleep for 5 seconds before next loop iteration
end
