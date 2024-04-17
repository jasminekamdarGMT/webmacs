# Ostrum Organics IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md


## MCP-1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower01run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay    | MCP-1    | 1B
blower02run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay    | MCP-1    | 2B
blower02revdamper    | Actuator Control  | Dout   | X-17S        | mcp01InputRelay    | MCP-1    | 3B
duct02mister         | Mister Control    | Dout   | X-17S        | mcp01InputRelay    | MCP-1    | 4B
blower01fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay    | MCP-1    | 1+
blower02fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay    | MCP-1    | 2+
duct02pospressure    | Pressure Sense    | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain1
duct02negpressure    | Pressure Sense    | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain2
exhaust02temp        | Temp Sense        | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain3
premister02temp      | Temp Sense        | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain4
blower01speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput  | MCP-1    | Out1
blower02speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput  | MCP-1    | Out2
damper03position     | Damper Position   | Aout   | X-317        | mcp01AnalogOutput2 | MCP-1    | Out2
damper04position     | Damper Position   | Aout   | X-317        | mcp01AnalogOutput2 | MCP-1    | Out3

## FCP-1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower01revdamper    | Actuator Control  | Dout   | X-410        | fcp01InputRelay    | FCP-1    | Rly1
duct01mister         | Mister Control    | Dout   | X-410        | fcp01InputRelay    | FCP-1    | Rly2
duct01pospressure    | Pressure Sense    | Ain    | X-418        | fcp01AnalogInput   | FCP-1    | Ain1
duct01negpressure    | Pressure Sense    | Ain    | X-418        | fcp01AnalogInput   | FCP-1    | Ain2
exhaust01temp        | Temp Sense        | Ain    | X-418        | fcp01AnalogInput   | FCP-1    | Ain3
premister01temp      | Temp Sense        | Ain    | X-418        | fcp01AnalogInput   | FCP-1    | Ain4
damper01position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput  | FCP-1    | Out1
damper02position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput  | FCP-1    | Out2
