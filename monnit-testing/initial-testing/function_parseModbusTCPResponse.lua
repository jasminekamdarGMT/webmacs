function parseModbusTCPResponse(response)
    -- Parsing the response
    local trx = response[1] * 256 + response[2]
    local ptc = response[3] * 256 + response[4]
    local len = response[5] * 256 + response[6]
    local unt = response[7]
    local fcd = response[8]
    local byte_count = response[9]

    print("Transaction Identifier:", trx)
    print("Protocol Identifier:", ptc)
    print("Length:", len)
    print("Unit Identifier:", unt)
    print("Function Code:", fcd)
    print("Byte Count:", byte_count)

    -- Assuming no error in response, parsing the data bytes for register values
    if fcd == 0x03 then -- Check if the function code is for reading (0x03)
        print("Register Values:")
        for i = 10, #response, 2 do -- Start from the 10th byte, iterate by 2 for each register value
            local register_value = response[i] * 256 + response[i + 1]
            print("Register", (i - 9) / 2, ":", register_value)
        end
    else
        print("Error in response. Error code:", fcd - 0x80)
    end
end

-- Example usage with a simulated response
local exampleResponse = {
    0x00, 
    0x01, 
    0x00, 
    0x00, 
    0x00, 
    0x06, 
    0x01, 
    0x03, 
    0x0A, 
    0x00, 
    0x01, 
    0x00, 
    0x02, 
    0x00, 
    0x03, 
    0x00, 
    0x04, 
    0x00, 
    0x05}
parseModbusTCPResponse(exampleResponse)
