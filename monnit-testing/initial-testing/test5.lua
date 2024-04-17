enableDebug()
-- Designed to read ModBus TCP data from another device and display converted data
connected = 0
byteTable = {}
sleepTime = 15
numberOfSensors = 3  -- Define the number of sensors here

function createModbusRequest(startRegister, numRegisters)
    return {
        0x00, -- TRX high byte (Transaction Identifier High)
        0x01, -- TRX low byte (Transaction Identifier Low)
        0x00, -- PTC high byte (Protocol Identifier High, always 0 for Modbus TCP)
        0x00, -- PTC low byte (Protocol Identifier Low, always 0 for Modbus TCP)
        0x00, -- LEN high byte (Length High, to be calculated based on payload)
        6 + numRegisters * 2, -- LEN low byte (Length Low, actual length after this header)
        0x01, -- UNT (Unit Identifier)
        0x03, -- FCD (Function Code for reading holding registers)
        math.floor(startRegister / 256), -- SAD high byte (Starting Address High)
        startRegister % 256, -- SAD low byte (Starting Address Low)
        math.floor(numRegisters / 256), -- QTY high byte (Quantity High)
        numRegisters % 256  -- QTY low byte (Quantity Low)
    }
end

function parseRegisters(response)
    local startIndex = 10  -- Starting index for register data in response array
    local registers = {}
    for i = startIndex, #response, 2 do
        local register_value = response[i] * 256 + response[i + 1]
        table.insert(registers, register_value)
    end
    return registers
end

while true do
    local startRegister = 100
    local registersPerSensor = 16
    local totalRegisters = numberOfSensors * registersPerSensor

    print('#####################')
    print('Current time is: ' .. os.date("%X"))

    if connected == 0 then
        print("Connecting")
        local rc = tcpConnect("10.0.0.151", 502, 3000)
        if rc == 1 then
            print("Connected")
            connected = 1
        else
            print("Connection failed with error: " .. rc)
            print('Sleeping for ' .. sleepTime .. ' seconds')
            sleep(sleepTime * 1000)
            goto continue  -- Necessary to skip the rest of the loop when connection fails
        end
    end

    local reqPacket = createModbusRequest(startRegister, totalRegisters)
    print("Sending Packet for Read")
    local rc = tcpSend(reqPacket)
    print("Sent " .. rc .. " bytes")

    if rc > 0 then
        local response = tcpRecv()
        print('Received ' .. #response .. ' bytes')
        local registers = parseRegisters(response)

        -- Output data for each sensor
        for sensor = 1, numberOfSensors do
            local baseIndex = (sensor - 1) * registersPerSensor + 1
            local sensorID = registers[baseIndex] * 65536 + registers[baseIndex + 1]
            print(string.format("Sensor %d ID: %d", sensor, sensorID))
            print(string.format("Sensor %d Device Type: %d", sensor, registers[baseIndex + 2]))
            -- Add more print statements as necessary for other data points
        end
    else
        print("Failed to send packet, error code: " .. rc)
    end

    print('Sleeping for ' .. sleepTime .. ' seconds')
    sleep(sleepTime * 1000)

    ::continue::
end
