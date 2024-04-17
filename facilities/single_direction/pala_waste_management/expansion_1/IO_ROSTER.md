# Pala Waste Management IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

## Relay

| I/O NAME         | FUNCTION   | TYPE | DEVICE | DEVICE NAME   | LOCATION | TERMINAL # |
| ---------------- | ---------- | ---- | ------ | ------------- | -------- | ---------- |
| blower02run      | Blower Run | Dout | X-17S  | mcpInputRelay | MCP      | 1B         |
| zone09irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 4NO        |
| zone10irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 3NO        |
| zone11irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 2NO        |
| zone12irrigation | Solenoid   | Dout |        | mcpRelay01    | MCP      | 1NO        |
| zone13irrigation | Solenoid   | Dout |        | mcpRelay02    | MCP      | 4NO        |
| zone14irrigation | Solenoid   | Dout |        | mcpRelay02    | MCP      | 4NO        |
| zone15irrigation | Solenoid   | Dout |        | mcpRelay02    | MCP      | 4NO        |
| zone16irrigation | Solenoid   | Dout |        | mcpRelay02    | MCP      | 4NO        |

## Digital Input

| I/O NAME      | FUNCTION     | TYPE | DEVICE | DEVICE NAME   | LOCATION | TERMINAL # |
| ------------- | ------------ | ---- | ------ | ------------- | -------- | ---------- |
| blower02fault | Blower Fault | Dout | X-17S  | mcpInputRelay | MCP      | 1+         |

## Analog Output

| I/O NAME         | FUNCTION        | TYPE | DEVICE | DEVICE NAME      | LOCATION | TERMINAL # |
| ---------------- | --------------- | ---- | ------ | ---------------- | -------- | ---------- |
| blower02speed    | Blower Speed    | Aout | X-417  | mcpAnalogOutput2 | MCP      | Out5       |
| damper09position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out5       |
| damper10position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out4       |
| damper11position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out3       |
| damper12position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out2       |
| damper13position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out1       |
| damper14position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out1       |
| damper15position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out1       |
| damper16position | Damper Position | Aout | X-417  | mcpAnalogOutput1 | MCP      | Out1       |

## Analog Input

| I/O NAME        | FUNCTION         | TYPE | DEVICE | DEVICE NAME      | LOCATION | TERMINAL # |
| --------------- | ---------------- | ---- | ------ | ---------------- | -------- | ---------- |
| zone09pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain8       |
| zone09pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain7       |
| zone09pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain6       |
| zone09pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain5       |
| zone10pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain8       |
| zone10pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain7       |
| zone10pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain6       |
| zone10pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput01 | MCP      | Ain5       |
| zone11pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain8       |
| zone11pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain7       |
| zone11pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain6       |
| zone11pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain5       |
| zone12pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain8       |
| zone12pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain7       |
| zone12pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain6       |
| zone12pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput02 | MCP      | Ain5       |
| zone13pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain8       |
| zone13pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain7       |
| zone13pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain6       |
| zone13pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain5       |
| zone14pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain8       |
| zone14pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain7       |
| zone14pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain6       |
| zone14pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain5       |
| zone15pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain8       |
| zone15pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain7       |
| zone15pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain6       |
| zone15pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain5       |
| zone16pAtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain8       |
| zone16pBtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain7       |
| zone16pCtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain6       |
| zone16pDtemp    | Zone Temperature | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain5       |
| container02temp | Container Temp   | Ain  | X-22S  | mcpAnalogInput03 | MCP      | Ain4       |
| duct02pressure  | Duct Pressure    | Ain  | X-418  | mcpAnalogInput04 | MCP      | Ain1       |
