# Recompose Demo IO Roster

You can find out more about the devices in the [module list][readme].

[readme]: README.md

I/O NAME          | FUNCTION                           | TYPE     | DEVICE    | DEVICE NAME        | LOCATION | TERMINAL #
----------------- | ---------------------------------- | -------- | --------- | ------------------ | -------- | ----------
headspace01probe  | Head-Space Temp                    | owsensor | X-600     | mcpController      | MCP      | Data-5v-Gnd
blower01run       | Blower Run                         | Dout     | X-11S     | mcpRelay           | MCP      | Rly1
blower02run       | Blower Run                         | Dout     | X-11S     | mcpRelay           | MCP      | Rly2
drum01limitswitch | Drum Rotation Limit Switch         | Din      | X-310     | mcpInputRelay      | MCP      | In1+
drum01pistonout   | Drum Rotation Piston Extend        | Din      | X-310     | mcpInputRelay      | MCP      | Rly1
drum01pistonin    | Drum Rotation Piston Retract       | Din      | X-310     | mcpInputRelay      | MCP      | Rly2
