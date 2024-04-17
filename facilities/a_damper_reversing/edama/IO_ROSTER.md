# Edama IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md


## MCP-1
I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
duct01mister         | Mister Control    | Relay  | X-17s        | mcpInputRelay      | MCP      | 2B
blower01fault        | Blower Fault      | Din    | X-17s        | mcpInputRelay      | MCP      | 1+
blower01run          | Blower Run        | Relay  | X-17s        | mcpInputRelay      | MCP      | 1B
premister01temp      | Amb. Temp Sense   | Ain    | X-22s        | mcpAnalogInput     | MCP      | Ain4
exhaust01temp        | Exh. Temp Sense   | Ain    | X-22s        | mcpAnalogInput     | MCP      | Ain3
duct01pospressure    | Pressure Sense    | Ain    | X-22s        | mcpAnalogInput     | MCP      | Ain2
duct01negpressure    | Pressure Sense    | Ain    | X-22s        | mcpAnalogInput     | MCP      | Ain1
blower01speed        | Blower 1 Speed    | Din    | X-317        | mcpAnalogOutput1   | MCP      | Out1
duct01inletdamper    | Damper Position   | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out5
damperS1Aposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out4
damperS1Bposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out3
damperP1Aposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out2
damperP1Bposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out5
damperP2Aposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out4
damperP2Bposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out3
damperP3Aposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out2
damperP3Bposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out1
damperP4Aposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput3   | MCP      | Out5
damperP4Bposition    | Damper Position   | Aout   | X-317        | mcpAnalogOutput3   | MCP      | Out4
exhuast01damper      | Damper Position   | Aout   | X-317        | mcpAnalogOutput3   | MCP      | Out3
