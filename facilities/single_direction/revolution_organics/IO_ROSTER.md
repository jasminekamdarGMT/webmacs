# Revolution Organics IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

## Relay
I/O NAME          | FUNCTION        | TYPE   | DEVICE    | DEVICE NAME        | LOCATION | TERMINAL #
----------------- | --------------- | ------ | --------- | ------------------ | -------- | ----------
blower01run       | Blower Run      | Dout   | X-17S     | mcpInputRelay1     | MCP      | 1NO
blower02run       | Blower Run      | Dout   | X-17S     | mcpInputRelay1     | MCP      | 2NO
blower03run       | Blower Run      | Dout   | X-17S     | mcpInputRelay1     | MCP      | 3NO
blower04run       | Blower Run      | Dout   | X-17S     | mcpInputRelay1     | MCP      | 4NO
blower05run       | Blower Run      | Dout   | X-17S     | mcpInputRelay2     | MCP      | 1NO
blower06run       | Blower Run      | Dout   | X-17S     | mcpInputRelay2     | MCP      | 2NO
blower07run       | Blower Run      | Dout   | X-17S     | mcpInputRelay2     | MCP      | 3NO

## Digital Input
I/O NAME          | FUNCTION        | TYPE   | DEVICE    | DEVICE NAME        | LOCATION | TERMINAL #
----------------- | --------------- | ------ | --------- | ------------------ | -------- | ----------
blower01fault     | Blower Fault    | Dout   | X-17S     | mcpInputRelay1     | MCP      | 1NO
blower02fault     | Blower Fault    | Dout   | X-17S     | mcpInputRelay1     | MCP      | 2NO
blower03fault     | Blower Fault    | Dout   | X-17S     | mcpInputRelay1     | MCP      | 3NO
blower04fault     | Blower Fault    | Dout   | X-17S     | mcpInputRelay1     | MCP      | 4NO
blower05fault     | Blower Fault    | Dout   | X-17S     | mcpInputRelay2     | MCP      | 1NO
blower06fault     | Blower Fault    | Dout   | X-17S     | mcpInputRelay2     | MCP      | 2NO
blower07fault     | Blower Fault    | Dout   | X-17S     | mcpInputRelay2     | MCP      | 3NO

## Analog Output
I/O NAME          | FUNCTION         | TYPE   | DEVICE    | DEVICE NAME        | LOCATION | TERMINAL #
----------------- | ---------------- | ------ | --------- | ------------------ | -------- | ----------
blower01speed     | Blower Speed     | Aout   | X-317     | mcpAnalogOutput1   | MCP      | 1NO
blower02speed     | Blower Speed     | Aout   | X-317     | mcpAnalogOutput1   | MCP      | 2NO
blower03speed     | Blower Speed     | Aout   | X-317     | mcpAnalogOutput1   | MCP      | 3NO
blower04speed     | Blower Speed     | Aout   | X-317     | mcpAnalogOutput1   | MCP      | 4NO
blower05speed     | Blower Speed     | Aout   | X-317     | mcpAnalogOutput2   | MCP      | 1NO
blower06speed     | Blower Speed     | Aout   | X-317     | mcpAnalogOutput2   | MCP      | 2NO
blower07speed     | Blower Speed     | Aout   | X-317     | mcpAnalogOutput2   | MCP      | 3NO
damper01position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput3   | MCP      | 1NO
damper02position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput3   | MCP      | 2NO
damper03position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput3   | MCP      | 3NO
damper04position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput3   | MCP      | 4NO
damper05position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput3   | MCP      | 5NO
damper06position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput4   | MCP      | 1NO
damper07position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput4   | MCP      | 2NO
damper08position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput4   | MCP      | 3NO
damper09position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput4   | MCP      | 4NO
damper10position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput4   | MCP      | 5NO
damper11position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput5   | MCP      | 1NO
damper12position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput5   | MCP      | 2NO
damper13position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput5   | MCP      | 3NO
damper14position  | Damper Position  | Aout   | X-317     | mcpAnalogOutput5   | MCP      | 4NO

## Analog Input
I/O NAME          | FUNCTION         | TYPE   | DEVICE      | DEVICE NAME       | LOCATION | TERMINAL #
----------------- | ---------------- | ------ | ----------- | ----------------  | -------- | ----------
zone01pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 1NO
zone01pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 2NO
zone02pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 3NO
zone02pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 4NO
zone03pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 5NO
zone03pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 6NO
zone04pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 7NO
zone04pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp1AnalogInput   | FCP      | 8NO
zone05pAtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput1   | MCP      | 1NO
zone05pBtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput1   | MCP      | 2NO
zone06pAtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput1   | MCP      | 3NO
zone06pBtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput1   | MCP      | 4NO
zone07pAtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput1   | MCP      | 5NO
zone07pBtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput1   | MCP      | 6NO
zone08pAtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput2   | MCP      | 1NO
zone08pBtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput2   | MCP      | 2NO
zone09pAtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput2   | MCP      | 3NO
zone09pBtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput2   | MCP      | 4NO
zone10pAtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput2   | MCP      | 5NO
zone10pBtemp      | Zone Temperature | Ain    | X-22S       | mcpAnalogInput2   | MCP      | 6NO
zone11pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 1NO
zone11pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 2NO
zone12pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 3NO
zone12pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 4NO
zone13pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 5NO
zone13pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 6NO
zone14pAtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 7NO
zone14pBtemp      | Zone Temperature | Ain    | X-DAQ-8A5   | fcp2AnalogInput   | FCP      | 8NO
