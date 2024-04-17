# Ditr Hugger IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

I/O NAME          | FUNCTION        | TYPE   | DEVICE    | DEVICE NAME        | LOCATION | TERMINAL #
----------------- | --------------- | ------ | --------- | ------------------ | -------- | ----------
blower01run       | Blower Run      | Dout   | X-12S     | mcpRelaySlave      | MCP      | 4NO
blower02run       | Blower Run      | Dout   | X-12S     | mcpRelaySlave      | MCP      | 8NO
blower01speed     | Blower Speed    | Aout   | X-317     | mcpAnalogOut       | MCP      | Out1
blower02speed     | Blower Speed    | Aout   | X-317     | mcpAnalogOut       | MCP      | Out2
zone01onindicator | Zone Online     | Dout   | X-DAQ     | mcpRelayTemp       | MCP      | Out1
zone02onindicator | Zone Online     | Dout   | X-DAQ     | mcpRelayTemp       | MCP      | Out2
pump01run         | Pump Run        | Dout   | X-12S     | mcpRelaySlave2     | MCP      | 6NO
pump01speed1      | Pump Speed 1    | Dout   | X-12S     | mcpRelaySlave2     | MCP      | 8NO
pump01speed2      | Pump Speed 2    | Dout   | X-12S     | mcpRelaySlave2     | MCP      | 7NO
pump02run         | Pump Run        | Dout   | X-12S     | mcpRelaySlave2     | MCP      | 2NO
pump02speed1      | Pump Speed 1    | Dout   | X-12S     | mcpRelaySlave2     | MCP      | 4NO
pump02speed2      | Pump Speed 2    | Dout   | X-12S     | mcpRelaySlave2     | MCP      | 3NO
