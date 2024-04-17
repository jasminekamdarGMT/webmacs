# Dirt Hugger IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

I/O NAME          | FUNCTION          | TYPE   | DEVICE    | DEVICE NAME        | LOCATION | TERMINAL #
----------------- | ----------------- | ------ | --------- | ------------------ | -------- | ---------
pump01speed1      | Pump Speed 1      | Dout   | X-12S     | mcpRelay           | MCP      | 2NO
pump01speed2      | Pump Speed 2      | Dout   | X-12S     | mcpRelay           | MCP      | 3NO
pump02speed1      | Pump Speed 1      | Dout   | X-12S     | mcpRelay           | MCP      | 5NO
pump02speed2      | Pump Speed 2      | Dout   | X-12S     | mcpRelay           | MCP      | 6NO
duct01pospressure | Pressure Sense    | Ain    | X-16S     | mcpAnalogInput     | MCP      | Ain1
duct01negpressure | Pressure Sense    | Ain    | X-16S     | mcpAnalogInput     | MCP      | Ain2
exhaust01temp     | Temp Sense        | Ain    | X-16S     | mcpAnalogInput     | MCP      | Ain3
blower01fault     | Fault Alarm       | Din    | X-310     | mcpInputRelay      | MCP      | In1+
blower01run       | Blower Run        | Dout   | X-310     | mcpInputRelay      | MCP      | Rly1
blower01revdamper | Actuator Control  | Dout   | X-310     | mcpInputRelay      | MCP      | Rly2
blower01speed     | Blower Speed      | Aout   | X-317     | mcpAnalogOutput    | MCP      | Out1
damper01position  | Damper Position   | Aout   | X-317     | mcpAnalogOutput    | MCP      | Out2
damper02position  | Damper Position   | Aout   | X-317     | mcpAnalogOutput    | MCP      | Out3
blower02fault     | Fault Alarm       | Din    | X-310     | fcpInputRelay      | FCP      | In1+
blower02run       | Blower Run        | Dout   | X-310     | fcpInputRelay      | FCP      | Rly1
pump03speed1      | Pump Speed 3      | Dout   | X-310     | fcpInputRelay      | FCP      | Rly2
blower02revdamper | Actuator Control  | Dout   | X-310     | fcpInputRelay      | FCP      | Rly3
pump03speed2      | Pump Speed 3      | Dout   | X-310     | fcpInputRelay      | FCP      | Rly4
duct02pospressure | Pressure Sense    | Ain    | X-418     | fcpAnalogInput     | FCP      | Ain1
duct02negpressure | Pressure Sense    | Ain    | X-418     | fcpAnalogInput     | FCP      | Ain2
exhaust02temp     | Temp Sense        | Ain    | X-418     | fcpAnalogInput     | FCP      | Ain3
blower02speed     | Blower Speed      | Aout   | X-317     | fcpAnalogOutput    | FCP      | Out1
damper03position  | Damper Position   | Aout   | X-317     | fcpAnalogOutput    | FCP      | Out2
damper04position  | Damper Position   | Aout   | X-317     | fcpAnalogOutput    | FCP      | Out3
damper05position  | Damper Position   | Aout   | X-317     | fcpAnalogOutput    | FCP      | Out4
damper06position  | Damper Position   | Aout   | X-317     | fcpAnalogOutput    | FCP      | Out5
