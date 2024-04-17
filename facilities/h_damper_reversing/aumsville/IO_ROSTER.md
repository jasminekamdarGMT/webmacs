# Aumsville IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md


## MCP-1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower01run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay    | MCP-1    | 1B
blower02run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay    | MCP-1    | 2B
blower03run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay    | MCP-1    | 3B
blower01fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay    | MCP-1    | 1+
blower02fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay    | MCP-1    | 2+
blower03fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay    | MCP-1    | 3+
blower01speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out1
blower02speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out2
blower03speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out3

## FCP-01
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower01revdamper    | Actuator Control  | Dout   | X-410        | fcp01InputRelay    | FCP-01   | Rly1
duct01mister         | Mister Control    | Dout   | X-410        | fcp01InputRelay    | FCP-01   | Rly2
duct01pospressure    | Pressure Sense    | Ain    | X-418        | fcp01AnalogInput   | FCP-01   | Ain1
duct01negpressure    | Pressure Sense    | Ain    | X-418        | fcp01AnalogInput   | FCP-01   | Ain2
exhaust01temp        | Temp Sense        | Ain    | X-418        | fcp01AnalogInput   | FCP-01   | Ain3
premister01temp      | Temp Sense        | Ain    | X-418        | fcp01AnalogInput   | FCP-01   | Ain4
damper05position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput1 | FCP-01   | Out1
damper06position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput1 | FCP-01   | Out2
damper07position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput1 | FCP-01   | Out3
damper08position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput1 | FCP-01   | Out4
damper09position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput1 | FCP-01   | Out5
damper10position     | Damper Position   | Aout   | X-317        | fcp01AnalogOutput2 | FCP-01   | Out1

## FCP-02
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower02revdamper    | Actuator Control  | Dout   | X-410        | fcp02InputRelay    | FCP-02   | Rly1
duct02mister         | Mister Control    | Dout   | X-410        | fcp02InputRelay    | FCP-02   | Rly2
duct02pospressure    | Pressure Sense    | Ain    | X-418        | fcp02AnalogInput   | FCP-02   | Ain1
duct02negpressure    | Pressure Sense    | Ain    | X-418        | fcp02AnalogInput   | FCP-02   | Ain2
exhaust02temp        | Temp Sense        | Ain    | X-418        | fcp02AnalogInput   | FCP-02   | Ain3
premister02temp      | Temp Sense        | Ain    | X-418        | fcp02AnalogInput   | FCP-02   | Ain4
damper17position     | Damper Position   | Aout   | X-317        | fcp02AnalogOutput1 | FCP-02   | Out1
damper18position     | Damper Position   | Aout   | X-317        | fcp02AnalogOutput1 | FCP-02   | Out2
damper19position     | Damper Position   | Aout   | X-317        | fcp02AnalogOutput1 | FCP-02   | Out3
damper20position     | Damper Position   | Aout   | X-317        | fcp02AnalogOutput1 | FCP-02   | Out4
damper21position     | Damper Position   | Aout   | X-317        | fcp02AnalogOutput1 | FCP-02   | Out5
damper22position     | Damper Position   | Aout   | X-317        | fcp02AnalogOutput2 | FCP-02   | Out1
