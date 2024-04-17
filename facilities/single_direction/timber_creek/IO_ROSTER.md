# Timber Creek IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

I/O NAME                | FUNCTION                   | TYPE   | DEVICE    | DEVICE NAME       | LOCATION | TERMINAL #
----------------------- | -------------------------- | ------ | --------- | ----------------- | -------- | ----------
blower01run             | Blower Run                 | Din    | X-17S     | mcpInputRelay     | MCP      | 1B
blower01fault           | Blower Fault               | Din    | X-17S     | mcpInputRelay     | MCP      | 1+
blower01speed           | Blower Speed               | Aout   | X-417     | mcpAnalogOutput   | MCP      | Out1
blower01amp             | Blower Amp                 | Ain    | X-22s     | mcpAnalogInput    | MCP      | Ain1
blower01rpm             | Blower RPM                 | Ain    | X-22s     | mcpAnalogInput    | MCP      | Ain2
container01ambienttemp  | Container Ambient Temp     | Ain    | X-22s     | mcpAnalogInput    | MCP      | Ain3
duct01pospressure       | Duct Positive Pressure     | in     | X-22s     | fcp01AnalogInput  | MCP      | Ain1
damper01position        | Damper Position            | Aout   | X-417     | fcp01AnalogOut    | MCP      | Out1
damper02position        | Damper Position            | Aout   | X-417     | fcp01AnalogOut    | MCP      | Out2
damper03position        | Damper Position            | Aout   | X-417     | fcp01AnalogOut    | MCP      | Out3
damper04position        | Damper Position            | Aout   | X-417     | fcp01AnalogOut    | MCP      | Out4
fcp01ambienttemp        | Ambient Temp               | Ain    | X-22s     | mcpAnalogInput    | MCP      | Ain2
blower02run             | Blower Run                 | Din    | X-17S     | mcpInputRelay2    | MCP      | 1B
blower02fault           | Blower Fault               | Din    | X-17S     | mcpInputRelay2    | MCP      | 1+
blower02speed           | Blower Speed               | Aout   | X-417     | mcpAnalogOutput   | MCP      | Out1
blower02amp             | Blower Amp                 | Ain    | X-22s     | mcpAnalogInput    | MCP      | Ain1
blower02rpm             | Blower RPM                 | Ain    | X-22s     | mcpAnalogInput    | MCP      | Ain2
duct02pospressure       | Duct Positive Pressure     | in     | X-418     | fcp02AnalogInput  | MCP      | Ain1
damper05position        | Damper Position            | Aout   | X-417     | fcp02AnalogOut    | MCP      | Out1
damper06position        | Damper Position            | Aout   | X-417     | fcp02AnalogOut    | MCP      | Out2
damper07position        | Damper Position            | Aout   | X-417     | fcp02AnalogOut    | MCP      | Out3
damper08position        | Damper Position            | Aout   | X-417     | fcp02AnalogOut    | MCP      | Out4
