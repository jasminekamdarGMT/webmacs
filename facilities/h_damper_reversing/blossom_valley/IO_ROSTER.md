# Blossom Valley IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md


## MCP-1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blowerP1run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay1   | MCP-1    | 1B
blowerP2run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay1   | MCP-1    | 2B
blowerP3run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay1   | MCP-1    | 3B
blowerP4run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay1   | MCP-1    | 4B
blowerP1fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay1   | MCP-1    | 1+
blowerP2fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay1   | MCP-1    | 2+
blowerP3fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay1   | MCP-1    | 3+
blowerP4fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay1   | MCP-1    | 4+
blowerS1run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay2   | MCP-1    | 1B
blowerS2run          | Blower Run        | Dout   | X-17S        | mcp01InputRelay2   | MCP-1    | 2B
ductP2mister         | Mister Control    | Dout   | X-17S        | mcp01InputRelay2   | MCP-1    | 3B
blowerP2revdamper    | Actuator Control  | Dout   | X-17S        | mcp01InputRelay2   | MCP-1    | 4B
blowerS1fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay2   | MCP-1    | 1+
blowerS2fault        | Blower Fault      | Din    | X-17S        | mcp01InputRelay2   | MCP-1    | 2+
ductP2pospressure    | Pressure Sense    | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain1
ductP2negpressure    | Pressure Sense    | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain2
exhaustP2temp        | Temp Sense        | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain3
premisterP2temp      | Temp Sense        | Ain    | X-22S        | mcp01AnalogInput   | MCP-1    | Ain4
blowerP1speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out1
blowerP2speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out2
blowerP3speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out3
blowerP4speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out4
blowerS1speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput1 | MCP-1    | Out5
blowerS2speed        | Blower Speed      | Aout   | X-317        | mcp01AnalogOutput2 | MCP-1    | Out1
damperP2Aposition    | Damper Position   | Aout   | X-317        | mcp01AnalogOutput2 | MCP-1    | Out2
damperP2Bposition    | Damper Position   | Aout   | X-317        | mcp01AnalogOutput2 | MCP-1    | Out3

## FCP-P1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blowerP1revdamper    | Actuator Control  | Dout   | X-410        | fcpP1InputRelay    | FCP-P1   | Rly1
ductP1mister         | Mister Control    | Dout   | X-410        | fcpP1InputRelay    | FCP-P1   | Rly2
ductP1pospressure    | Pressure Sense    | Ain    | X-418        | fcpP1AnalogInput   | FCP-P1   | Ain1
ductP1negpressure    | Pressure Sense    | Ain    | X-418        | fcpP1AnalogInput   | FCP-P1   | Ain2
exhaustP1temp        | Temp Sense        | Ain    | X-418        | fcpP1AnalogInput   | FCP-P1   | Ain3
premisterP1temp      | Temp Sense        | Ain    | X-418        | fcpP1AnalogInput   | FCP-P1   | Ain4
damperP1Aposition    | Damper Position   | Aout   | X-317        | fcpP1AnalogOutput  | FCP-P1   | Out1
damperP1Bposition    | Damper Position   | Aout   | X-317        | fcpP1AnalogOutput  | FCP-P1   | Out2

## FCP-P3
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blowerP3revdamper    | Actuator Control  | Dout   | X-410        | fcpP3InputRelay    | FCP-P3   | Rly1
ductP3mister         | Mister Control    | Dout   | X-410        | fcpP3InputRelay    | FCP-P3   | Rly2
ductP3pospressure    | Pressure Sense    | Ain    | X-418        | fcpP3AnalogInput   | FCP-P3   | Ain1
ductP3negpressure    | Pressure Sense    | Ain    | X-418        | fcpP3AnalogInput   | FCP-P3   | Ain2
exhaustP3temp        | Temp Sense        | Ain    | X-418        | fcpP3AnalogInput   | FCP-P3   | Ain3
premisterP3temp      | Temp Sense        | Ain    | X-418        | fcpP3AnalogInput   | FCP-P3   | Ain4
damperP3Aposition    | Damper Position   | Aout   | X-317        | fcpP3AnalogOutput  | FCP-P3   | Out1
damperP3Bposition    | Damper Position   | Aout   | X-317        | fcpP3AnalogOutput  | FCP-P3   | Out2

## FCP-P4
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blowerP4revdamper    | Actuator Control  | Dout   | X-410        | fcpP4InputRelay    | FCP-P4   | Rly1
ductP4mister         | Mister Control    | Dout   | X-410        | fcpP4InputRelay    | FCP-P4   | Rly2
ductP4pospressure    | Pressure Sense    | Ain    | X-418        | fcpP4AnalogInput   | FCP-P4   | Ain1
ductP4negpressure    | Pressure Sense    | Ain    | X-418        | fcpP4AnalogInput   | FCP-P4   | Ain2
exhaustP4temp        | Temp Sense        | Ain    | X-418        | fcpP4AnalogInput   | FCP-P4   | Ain3
premisterP4temp      | Temp Sense        | Ain    | X-418        | fcpP4AnalogInput   | FCP-P4   | Ain4
damperP4Aposition    | Damper Position   | Aout   | X-317        | fcpP4AnalogOutput  | FCP-P4   | Out1
damperP4Bposition    | Damper Position   | Aout   | X-317        | fcpP4AnalogOutput  | FCP-P4   | Out2

## MCP-2
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blowerP5run          | Blower Run        | Dout   | X-17S        | mcp02InputRelay1   | MCP-2    | 1B
blowerP6run          | Blower Run        | Dout   | X-17S        | mcp02InputRelay1   | MCP-2    | 2B
blowerP5fault        | Blower Fault      | Din    | X-17S        | mcp02InputRelay1   | MCP-2    | 1+
blowerP6fault        | Blower Fault      | Din    | X-17S        | mcp02InputRelay1   | MCP-2    | 2+
blowerS3run          | Blower Run        | Dout   | X-17S        | mcp02InputRelay2   | MCP-2    | 1B
ductP6mister         | Mister Control    | Dout   | X-17S        | mcp02InputRelay2   | MCP-2    | 3B
blowerP6revdamper    | Actuator Control  | Dout   | X-17S        | mcp02InputRelay2   | MCP-2    | 4B
blowerS3fault        | Blower Fault      | Din    | X-17S        | mcp02InputRelay2   | MCP-2    | 1+
ductP6pospressure    | Pressure Sense    | Ain    | X-22S        | mcp02AnalogInput   | MCP-2    | Ain1
ductP6negpressure    | Pressure Sense    | Ain    | X-22S        | mcp02AnalogInput   | MCP-2    | Ain2
exhaustP6temp        | Temp Sense        | Ain    | X-22S        | mcp02AnalogInput   | MCP-2    | Ain3
premisterP6temp      | Temp Sense        | Ain    | X-22S        | mcp02AnalogInput   | MCP-2    | Ain4
blowerP5speed        | Blower Speed      | Aout   | X-317        | mcp02AnalogOutput1 | MCP-2    | Out1
blowerP6speed        | Blower Speed      | Aout   | X-317        | mcp02AnalogOutput1 | MCP-2    | Out2
blowerS3speed        | Blower Speed      | Aout   | X-317        | mcp02AnalogOutput2 | MCP-2    | Out1
damperP6Aposition    | Damper Position   | Aout   | X-317        | mcp02AnalogOutput2 | MCP-2    | Out3
damperP6Bposition    | Damper Position   | Aout   | X-317        | mcp02AnalogOutput2 | MCP-2    | Out4


## FCP-P5
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
blowerP5revdamper    | Actuator Control  | Dout   | X-410        | fcpP5InputRelay    | FCP-P5   | Rly1
ductP5mister         | Mister Control    | Dout   | X-410        | fcpP5InputRelay    | FCP-P5   | Rly2
ductP5pospressure    | Pressure Sense    | Ain    | X-418        | fcpP5AnalogInput   | FCP-P5   | Ain1
ductP5negpressure    | Pressure Sense    | Ain    | X-418        | fcpP5AnalogInput   | FCP-P5   | Ain2
exhaustP5temp        | Temp Sense        | Ain    | X-418        | fcpP5AnalogInput   | FCP-P5   | Ain3
premisterP5temp      | Temp Sense        | Ain    | X-418        | fcpP5AnalogInput   | FCP-P5   | Ain4
damperP5Aposition    | Damper Position   | Aout   | X-317        | fcpP5AnalogOutput  | FCP-P5   | Out1
damperP5Bposition    | Damper Position   | Aout   | X-317        | fcpP5AnalogOutput  | FCP-P5   | Out2

## FCP-S1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
ductS1pressure       | Pressure Sense    | Ain    | X-418        | fcpS1AnalogInput   | FCP-S1   | Ain1
damperS1Aposition    | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out1
damperS1Bposition    | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out2
damperS1Cposition    | Damper Position   | Aout   | X-317        | fcpS1AnalogOutput  | FCP-S1   | Out3

## FCP-S2
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
ductS2pressure       | Pressure Sense    | Ain    | X-418        | fcpS2AnalogInput   | FCP-S2   | Ain1
damperS2Aposition    | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out1
damperS2Bposition    | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out2
damperS2Cposition    | Damper Position   | Aout   | X-317        | fcpS2AnalogOutput  | FCP-S2   | Out3

## FCP-S3
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
ductS3pressure       | Pressure Sense    | Ain    | X-418        | fcpS3AnalogInput   | FCP-S3   | Ain1
damperS3Aposition    | Damper Position   | Aout   | X-317        | fcpS3AnalogOutput  | FCP-S3   | Out1
damperS3Bposition    | Damper Position   | Aout   | X-317        | fcpS3AnalogOutput  | FCP-S3   | Out2
damperS3Cposition    | Damper Position   | Aout   | X-317        | fcpS3AnalogOutput  | FCP-S3   | Out3
