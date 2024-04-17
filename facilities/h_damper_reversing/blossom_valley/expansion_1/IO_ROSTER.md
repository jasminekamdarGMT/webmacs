# Blossom Valley Expansion 1 IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

## FCP-P7
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME         | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------- | -------- | ----------
blowerP7revdamper    | Actuator Control  | Dout   | X-410        | fcpP7InputRelay     | FCP-P7   | Rly1
ductP7mister         | Mister Control    | Dout   | X-410        | fcpP7InputRelay     | FCP-P7   | Rly2
blowerP7run          | Blower Run        | Dout   | X-410        | fcpP7InputRelay02   | MCP-2    | Rly1
blowerS7run          | Blower Run        | Dout   | X-410        | fcpP7InputRelay02   | MCP-2    | Rly2
blowerP7fault        | Blower Fault      | Din    | X-410        | fcpP7InputRelay02   | MCP-2    | Din1
blowerS7fault        | Blower Fault      | Din    | X-410        | fcpP7InputRelay02   | MCP-2    | Din2
ductP7pospressure    | Pressure Sense    | Ain    | X-418        | fcpP7AnalogInput    | FCP-P7   | Ain1
ductP7negpressure    | Pressure Sense    | Ain    | X-418        | fcpP7AnalogInput    | FCP-P7   | Ain2
exhaustP7temp        | Temp Sense        | Ain    | X-418        | fcpP7AnalogInput    | FCP-P7   | Ain3
premisterP7temp      | Temp Sense        | Ain    | X-418        | fcpP7AnalogInput    | FCP-P7   | Ain4
damperP7Aposition    | Damper Position   | Aout   | X-317        | fcpP7AnalogOutput   | FCP-P7   | Out1
damperP7Bposition    | Damper Position   | Aout   | X-317        | fcpP7AnalogOutput   | FCP-P7   | Out2
blowerP7speed        | Blower Speed      | Aout   | X-317        | fcpP7AnalogOutput02 | MCP-2    | Out1

## FCP-S7
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME         | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------- | -------- | ----------
ductS7pressure       | Pressure Sense    | Ain    | X-418        | fcpS7AnalogInput    | FCP-S7   | Ain1
damperS7Aposition    | Damper Position   | Aout   | X-317        | fcpS7AnalogOutput   | FCP-S7   | Out1
damperS7Bposition    | Damper Position   | Aout   | X-317        | fcpS7AnalogOutput   | FCP-S7   | Out2
blowerS7speed        | Blower Speed      | Aout   | X-317        | fcpP7AnalogOutput02 | MCP-2    | Out2
