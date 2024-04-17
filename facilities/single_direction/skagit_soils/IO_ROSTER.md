# Skagit Soils IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

I/O NAME          | FUNCTION        | TYPE   | DEVICE    | DEVICE NAME        | LOCATION | TERMINAL #
----------------- | --------------- | ------ | --------- | ------------------ | -------- | ----------
blower01run       | Blower Run      | Dout   | X-17S     | mcpInputRelay      | MCP      | 1A
blower02run       | Blower Run      | Dout   | X-17S     | mcpInputRelay      | MCP      | 2A
blower01fault     | Blower Fault    | Din    | X-17S     | mcpInputRelay      | MCP      | Input1
blower02fault     | Blower Fault    | Din    | X-17S     | mcpInputRelay      | MCP      | Input2
duct01pressure    | Duct Pressure   | Ain    | X-22S     | mcpAnalogIn1       | MCP      | Ain1
zone01pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn1       | MCP      | Ain2
zone02pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn1       | MCP      | Ain3
zone03pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn1       | MCP      | Ain4
zone04pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn1       | MCP      | Ain5
duct02pressure    | Duct Pressure   | Ain    | X-22S     | mcpAnalogIn2       | MCP      | Ain1
zone05pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn2       | MCP      | Ain2
zone06pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn2       | MCP      | Ain3
zone07pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn2       | MCP      | Ain4
zone08pAtemp      | Zone Temp       | Ain    | X-22S     | mcpAnalogIn2       | MCP      | Ain5
blower01speed     | Blower Speed    | Aout   | X-417     | mcpAnalogOut1      | MCP      | Out1
damper01position  | Damper Open     | Aout   | X-417     | mcpAnalogOut1      | MCP      | Out2
damper02position  | Damper Open     | Aout   | X-417     | mcpAnalogOut1      | MCP      | Out3
damper03position  | Damper Open     | Aout   | X-417     | mcpAnalogOut1      | MCP      | Out4
damper04position  | Damper Open     | Aout   | X-417     | mcpAnalogOut1      | MCP      | Out5
blower02speed     | Blower Speed    | Aout   | X-417     | mcpAnalogOut2      | MCP      | Out1
damper05position  | Damper Open     | Aout   | X-417     | mcpAnalogOut2      | MCP      | Out2
damper06position  | Damper Open     | Aout   | X-417     | mcpAnalogOut2      | MCP      | Out3
damper07position  | Damper Open     | Aout   | X-417     | mcpAnalogOut2      | MCP      | Out4
damper08position  | Damper Open     | Aout   | X-417     | mcpAnalogOut2      | MCP      | Out5
