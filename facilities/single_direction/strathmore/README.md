# Strathmore Configuration

Control logic is documented [here][control-logic].

[control-logic]: CONTROL_LOGIC.md

## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpController      | X-600M       | MCP      |     n/a       | 00:0c:c8:04:46:42
mcpRelay1          | X-12S        | MCP      |     n/a       | 00001ab6
mcpRelay2          | X-12S        | MCP      |     n/a       | 00001ab5
mcpRelay3          | X-12S        | MCP      |     n/a       | 00001ac9


## IO and Register Configurations

### Each Blower group

Blower groups (X) are numbered 01 - 02

#### groupXstartdelay

Description: Blower X Cycle Timer
Type: Timer register

### Each Blower

Blowers (X) are numbered 01 - 10

#### blowerXrun

Description: Blower (X) Run
Type: Relay
Power up mode: Last State
Keep alive: no
Log activity: no

#### blowerXoverride

Description: Blower X Manual Override
Type: Boolean register
Initial value: 0
Log activity: no

#### blowerXvalue

Description: Blower X Manual Set Value
Type: Float register
Units: %
Decimal places: 2
Initial value: 0

#### blowerXcontrol

Description: Blower X Control
Type: Boolean register
Initial value: 0
Log activity: yes

#### blowerXcycle

Description: Blower X Cycle Timer
Type: Timer register

#### blowerXcustomcycle

Description: Blower X Custom Cycle Timer
Type: Timer register

#### blowerXofftimer

Description: Blower X Off Timer
Type: Timer register

### Each Zone

- Zones (X) are numbered 01 - 10

#### damperXcontrol

Description: Damper X Control
Type: Boolean register
Initial value: 0
Log activity: yes

#### zoneXdampercycle

Description: Zone X Damper Cycle Timer
Type: Timer register

#### zoneXcontrol

Description: Zone X Control
Type: Boolean register
Initial value: 0
Log activity: yes

#### zoneXreset

Description: Zone X Reset
Type: Boolean register
Initial value: 0
Log activity: yes

#### zoneXprint

Description: Zone X Print Timer
Type: Timer register

#### zoneXavgtimer

Description: Zone X Average Timer
Type: Timer register


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
