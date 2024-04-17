# Recompose Demo Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpController      | X-600M       | MCP      | 192.168.1.220 |
mcpRelay           | X-11S        | MCP      | n/a           |
mcpInputRelay      | X-310        | MCP      | 192.168.1.230 |
mcpPointManager    | web server   | MCP      | 192.168.1.55  |


## IO and Register Configurations

### Each Blower

Blowers (X) are numbered 01 - 02

#### blowerXrun

- **Description:** Blower (X) Run
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### blowerXoverride

- **Description:** Blower X Manual Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerXcontrol

- **Description:** Blower X Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### blowerXcycle

- **Description:** Blower X Cycle Timer
- **Type:** Timer register

#### blowerXcustomcycle

- **Description:** Blower X Custom Cycle
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerXcycleontime

- **Description:** Blower X Cycle On Time
- **Type:** Float register
- **Units:** Minutes
- **Decimal places:** 0
- **Initial value:** 0

#### blowerXcycleofftime

- **Description:** Blower X Cycle Off Time
- **Type:** Float register
- **Units:** Minutes
- **Decimal places:** 0
- **Initial value:** 0


### Each Zone

- Zones (X) are numbered 01
- Probes (Y) are number A - B

#### drumXcontrol

- **Description:** Drum X Rotation Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### drumXrotationls

- **Description:** Drum X Rotation Limit Switch
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### drumXignorels

- **Description:** Drum X Ignore Limit Switch Counter
- **Type:** Float register
- **Decimal places:** 0
- **Units:** #
- **Default:** 0

#### drumXlogrotation

- **Description:** Drum X Log Rotation
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### drumXpistoncycle

- **Description:** Drum X Piston Cycle Timer
- **Type:** Timer register

#### drumXpistonout

- **Description:** Drum X Piston Extend
- **Type:** Relay
- **Power up mode:** Off
- **Keep alive:** no
- **Log activity:** yes

#### drumXpistonin

- **Description:** Drum X Piston Retract
- **Type:** Relay
- **Power up mode:** Off
- **Keep alive:** no
- **Log activity:** yes

#### drumXpistonld

- **Description:** Drum X Piston Last Direction
- **Type:** Float register
- **Decimal places:** 0
- **Units:** #
- **Default:** 2

#### headspaceXlogtemp

- **Description:** Log Head Space X Temperature
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### headspaceXtemp

- **Description:** Head Space X Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### zoneXpYlvtemp

- **Description:** Zone X Last Valid Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### zoneXpYavgtemp

- **Description:** Zone X Average Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### zoneXmoveto

- **Description:** Zone X To Move Batch To
- **Type:** Float register
- **Decimal places:** 0
- **Units:** #
- **Default:** 0

#### zoneXmovedfrom

- **Description:** Zone That The Batch in Zone X was Moved from
- **Type:** Float register
- **Decimal places:** 0
- **Units:** #
- **Default:** 0

#### zoneXcontrol

- **Description:** Zone X Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### zoneXreset

- **Description:** Zone X Reset
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### zoneXprint

- **Description:** Zone X Print Timer
- **Type:** Timer register

#### zoneXavgtimer

- **Description:** Zone X Average Timer
- **Type:** Timer register

### System Registers

#### batchfilesinuse

- **Description:** Batch Files Database In Use
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerstartupinuse

- **Description:** Blower Startup Database In Use
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### settingsinuse

- **Description:** Settings Database In Use
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### zonestartupinuse

- **Description:** Zone Startup Database In Use
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no
