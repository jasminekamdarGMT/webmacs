# North Plains IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md


## MCP-1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower01run          | Blower Run        | Dout   | X-17S        | mcpInputRelay    | MCP-1    | 1B
blower02run          | Blower Run        | Dout   | X-17S        | mcpInputRelay    | MCP-1    | 2B
blower03run          | Blower Run        | Dout   | X-17S        | mcpInputRelay    | MCP-1    | 3B
blower04run          | Blower Run        | Dout   | X-17S        | mcpInputRelay    | MCP-1    | 4B
blower01fault        | Blower Fault      | Din    | X-17S        | mcpInputRelay    | MCP-1    | 1+
blower02fault        | Blower Fault      | Din    | X-17S        | mcpInputRelay    | MCP-1    | 2+
blower03fault        | Blower Fault      | Din    | X-17S        | mcpInputRelay    | MCP-1    | 3+
blower04fault        | Blower Fault      | Din    | X-17S        | mcpInputRelay    | MCP-1    | 4+
blower01speed        | Blower Speed      | Aout   | X-317        | mcpAnalogOutput  | MCP-1    | Out1
blower02speed        | Blower Speed      | Aout   | X-317        | mcpAnalogOutput  | MCP-1    | Out2
blower03speed        | Blower Speed      | Aout   | X-317        | mcpAnalogOutput  | MCP-1    | Out3
blower04speed        | Blower Speed      | Aout   | X-317        | mcpAnalogOutput  | MCP-1    | Out4

## FCP-01
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower01revdamper    | Actuator Control  | Dout   | X-410        | fcpP1InputRelay    | FCP-P1   | Rly1
duct01mister         | Mister Control    | Dout   | X-410        | fcpP1InputRelay    | FCP-P1   | Rly2
duct01pospressure    | Pressure Sense    | Ain    | X-418        | fcpP1AnalogInput   | FCP-P1   | Ain1
duct01negpressure    | Pressure Sense    | Ain    | X-418        | fcpP1AnalogInput   | FCP-P1   | Ain2
exhaust01temp        | Temp Sense        | Ain    | X-418        | fcpP1AnalogInput   | FCP-P1   | Ain3
ambient01temp        | Temp Sense        |        | X-422        | weatherStation     |          |
damper01position     | Damper Position   | Aout   | X-317        | fcpP1AnalogOutput  | FCP-P1   | Out1
damper02position     | Damper Position   | Aout   | X-317        | fcpP1AnalogOutput  | FCP-P1   | Out2
damper03position     | Damper Position   | Aout   | X-317        | fcpP1AnalogOutput  | FCP-P1   | Out3
damper04position     | Damper Position   | Aout   | X-317        | fcpP1AnalogOutput  | FCP-P1   | Out4
damper05position     | Damper Position   | Aout   | X-317        | fcpP1AnalogOutput  | FCP-P1   | Out5

## FCP-02
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower02revdamper    | Actuator Control  | Dout   | X-410        | fcpS2InputRelay    | FCP-S2   | Rly1
duct02mister         | Mister Control    | Dout   | X-410        | fcpS2InputRelay    | FCP-S2   | Rly2
duct02pospressure    | Pressure Sense    | Ain    | X-418        | fcpS2AnalogInput   | FCP-S2   | Ain1
duct02negpressure    | Pressure Sense    | Ain    | X-418        | fcpS2AnalogInput   | FCP-S2   | Ain2
exhaust02temp        | Temp Sense        | Ain    | X-418        | fcpS2AnalogInput   | FCP-S2   | Ain3
ambient02temp        | Temp Sense        |        | X-422        | weatherStation     |          |
damper06position     | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out1
damper07position     | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out2
damper08position     | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out3
damper09position     | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out4
damper10position     | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out5

## FCP-S1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower03revdamper    | Actuator Control  | Dout   | X-410        | fcpS1InputRelay    | FCP-S1   | Rly1
duct03mister         | Mister Control    | Dout   | X-410        | fcpS1InputRelay    | FCP-S1   | Rly2
duct03pospressure    | Pressure Sense    | Ain    | X-418        | fcpS1AnalogInput   | FCP-S1   | Ain1
duct03negpressure    | Pressure Sense    | Ain    | X-418        | fcpS1AnalogInput   | FCP-S1   | Ain2
exhaust03temp        | Temp Sense        | Ain    | X-418        | fcpS1AnalogInput   | FCP-S1   | Ain3
ambient03temp        | Temp Sense        |        | X-422        | weatherStation     |          |
damper11position     | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out1
damper12position     | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out2
damper13position     | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out3
damper14position     | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out4
damper15position     | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out5

## FCP-P2
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blower04revdamper    | Actuator Control  | Dout   | X-WR-4R3     | fcpP2InputRelay    | FCP-P2   | Rly1
duct04mister         | Mister Control    | Dout   | X-WR-4R3     | fcpP2InputRelay    | FCP-P2   | Rly2
duct04pospressure    | Pressure Sense    | Ain    | X-418        | fcpP2AnalogInput   | FCP-P2   | Ain1
duct04negpressure    | Pressure Sense    | Ain    | X-418        | fcpP2AnalogInput   | FCP-P2   | Ain2
exhaust04temp        | Temp Sense        | Ain    | X-418        | fcpP2AnalogInput   | FCP-P2   | Ain3
ambient04temp        | Temp Sense        |        | X-422        | weatherStation     |          |
damper16position     | Damper Position   | Aout   | X-317        | fcpP2AnalogOutput  | FCP-P2   | Out1
damper17position     | Damper Position   | Aout   | X-317        | fcpP2AnalogOutput  | FCP-P2   | Out2
damper18position     | Damper Position   | Aout   | X-317        | fcpP2AnalogOutput  | FCP-P2   | Out3
damper19position     | Damper Position   | Aout   | X-317        | fcpP2AnalogOutput  | FCP-P2   | Out4
damper20position     | Damper Position   | Aout   | X-317        | fcpP2AnalogOutput  | FCP-P2   | Out5
