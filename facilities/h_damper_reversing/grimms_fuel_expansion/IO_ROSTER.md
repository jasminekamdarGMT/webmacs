# Grimm's Fuel Expansion IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

I/O NAME             | FUNCTION          | TYPE   | DEVICE       | DEVICE NAME        | LOCATION | TERMINAL #
-------------------- | ----------------- | ------ | ------------ | ------------------ | -------- | ----------
duct01pospressure    | Pressure Sense    | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain1
duct01negpressure    | Pressure Sense    | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain2
duct02pospressure    | Pressure Sense    | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain3
duct02negpressure    | Pressure Sense    | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain4
exhaust01temp        | Temp Sense        | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain5
premister01temp      | Temp Sense        | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain6
exhaust02temp        | Temp Sense        | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain7
premister02temp      | Temp Sense        | Ain    | X-418        | mcpAnalogInput     | MCP      | Ain8
blower01run          | Blower Run        | Dout   | X-WR-4R3-I   | mcpRelay           | MCP      | 1NO
blower02run          | Blower Run        | Dout   | X-WR-4R3-I   | mcpRelay           | MCP      | 2NO
blower01revdamper    | Actuator Control  | Dout   | X-410        | mcpInputRelay      | MCP      | Rly1
blower02revdamper    | Actuator Control  | Dout   | X-410        | mcpInputRelay      | MCP      | Rly2
duct01mister         | Mister Control    | Dout   | X-410        | mcpInputRelay      | MCP      | Rly3
duct02mister         | Mister Control    | Dout   | X-410        | mcpInputRelay      | MCP      | Rly4
blower01fault        | Fault Alarm       | Din    | X-410        | mcpInputRelay      | MCP      | In1+
blower02fault        | Fault Alarm       | Din    | X-410        | mcpInputRelay      | MCP      | In2+
blower01speed        | Blower Speed      | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out5
blower02speed        | Blower Speed      | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out4
damper01position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out3
damper02position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out2
damper03position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput1   | MCP      | Out1
damper04position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out5
damper05position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out4
damper06position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out3
damper07position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out2
damper08position     | Damper Position   | Aout   | X-317        | mcpAnalogOutput2   | MCP      | Out1
duct03pospressure    | Pressure Sense    | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain1
duct03negpressure    | Pressure Sense    | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain2
duct04pospressure    | Pressure Sense    | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain3
duct04negpressure    | Pressure Sense    | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain4
exhaust03temp        | Temp Sense        | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain5
premister03temp      | Temp Sense        | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain6
exhaust04temp        | Temp Sense        | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain7
premister04temp      | Temp Sense        | Ain    | X-418        | fcpAnalogInput     | FCP      | Ain8
blower03run          | Blower Run        | Dout   | X-401        | fcpInputRelay      | FCP      | Rly1
blower04run          | Blower Run        | Dout   | X-401        | fcpInputRelay      | FCP      | Rly2
blower03fault        | Fault Alarm       | Din    | X-401        | fcpInputRelay      | FCP      | In1+
blower04fault        | Fault Alarm       | Din    | X-401        | fcpInputRelay      | FCP      | In2+
blower03revdamper    | Actuator Control  | Dout   | X-WR-4R3-I   | fcpRelay           | FCP      | 1NO
blower04revdamper    | Actuator Control  | Dout   | X-WR-4R3-I   | fcpRelay           | FCP      | 2NO
duct03mister         | Mister Control    | Dout   | X-WR-4R3-I   | fcpRelay           | FCP      | 3NO
duct04mister         | Mister Control    | Dout   | X-WR-4R3-I   | fcpRelay           | FCP      | 4NO
blower03speed        | Blower Speed      | Aout   | X-317        | fcpAnalogOutput1   | FCP      | Out5
blower04speed        | Blower Speed      | Aout   | X-317        | fcpAnalogOutput1   | FCP      | Out4
damper09position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput1   | FCP      | Out3
damper10position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput1   | FCP      | Out2
damper11position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput1   | FCP      | Out1
damper12position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput2   | FCP      | Out5
damper13position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput2   | FCP      | Out4
damper14position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput2   | FCP      | Out3
damper15position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput2   | FCP      | Out2
damper16position     | Damper Position   | Aout   | X-317        | fcpAnalogOutput2   | FCP      | Out1
