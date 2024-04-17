# Brady Trucking IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

## Relay

| I/O NAME         | FUNCTION   | TYPE | DEVICE | DEVICE NAME   | LOCATION | TERMINAL # |
| ---------------- | ---------- | ---- | ------ | ------------- | -------- | ---------- |
| blower01run      | Blower Run | Dout | X-17S  | mcpInputRelay | MCP      | 1B         |
| zone01irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 4NO        |
| zone02irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 3NO        |
| zone03irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 2NO        |
| zone04irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 1NO        |
| zone05irrigation | Solenoid   | Dout |        | mcpRelay02    | MCP      | 4NO        |

## Digital Input

| I/O NAME      | FUNCTION     | TYPE | DEVICE | DEVICE NAME   | LOCATION | TERMINAL # |
| ------------- | ------------ | ---- | ------ | ------------- | -------- | ---------- |
| blower01fault | Blower Fault | Dout | X-17S  | mcpInputRelay | MCP      | 1+         |

## Analog Output

| I/O NAME         | FUNCTION        | TYPE | DEVICE | DEVICE NAME      | LOCATION | TERMINAL # |
| ---------------- | --------------- | ---- | ------ | ---------------- | -------- | ---------- |
| blower01speed    | Blower Speed    | Aout | X-417  | mcpAnalogOutput2 | MCP      | Out5       |
| damper01position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out5       |
| damper02position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out4       |
| damper03position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out3       |
| damper04position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out2       |
| damper05position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out1       |

## Analog Input

| I/O NAME        | FUNCTION         | TYPE | DEVICE | DEVICE NAME      | LOCATION | TERMINAL # |
| --------------- | ---------------- | ---- | ------ | ---------------- | -------- | ---------- |
| zone01pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain8       |
| zone01pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain7       |
| zone01pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain6       |
| zone01pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain5       |
| zone02pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain8       |
| zone02pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain7       |
| zone02pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain6       |
| zone02pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain5       |
| zone03pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain8       |
| zone03pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain7       |
| zone03pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain6       |
| zone03pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain5       |
| zone04pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain8       |
| zone04pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain7       |
| zone04pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain6       |
| zone04pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain5       |
| zone05pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain8       |
| zone05pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain7       |
| zone05pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain6       |
| zone05pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain5       |
| container01temp | Container Temp   | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain4       |
| duct01pressure  | Duct Pressure    | Ain  | X-418  | mcpAnalogInput04 | MCP      | Ain1       |
