# Revolution Organics Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name                   | type          | location  | ip address         | mac / id
---------------------- | ------------- | --------- | ------------------ | -----------------
mcpAnalogInput1        | X-22S         | MCP       |                    | 00004b67
mcpAnalogInput2        | X-22S         | MCP       |                    | 00004bd0
mcpAnalogOutput1       | X-317         | MCP       | 192.168.1.231:2601 | 00:0c:c8:05:92:69
mcpAnalogOutput2       | X-317         | MCP       | 192.168.1.232:2602 | 00:0c:c8:05:92:6c
mcpAnalogOutput3       | X-317         | MCP       | 192.168.1.233:2603 | 00:0c:c8:05:92:c4
mcpAnalogOutput4       | X-317         | MCP       | 192.168.1.234:2604 | 00:0c:c8:05:92:77
mcpAnalogOutput5       | X-317         | MCP       | 192.168.1.237:2607 | 00:0c:c8:05:92:66
mcpInputRelay1         | X-17S         | MCP       |                    | 00004f77
mcpInputRelay2         | X-17S         | MCP       |                    | 00004cea
fcp1AnalogInput        | X-DAQ-8A5     | FCP       | 192.168.1.242      | 00:0C:C8:03:56:C9
fcp2AnalogInput        | X-DAQ-8A5     | FCP       | 192.168.1.243      | 00:0C:C8:02:FE:8B

## Analog Output Configuration

Analog outputs on X-317 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

## Analog Input Configuration

Analog inputs on X-DAQ-8A5 should be configured to default values (scaling will be done on x600):

- **Differential Mode:** No
- **Units:** None
- **Decimal Places:** 3
- **Slope:** 1
- **Offset:** 0

## IO and Register Configurations

### Each Blower / Duct

Blowers (X) are numbered 01 - 07

#### blowerXrun

**Description:** Blower (X) Run
**Type:** Relay
**Power up mode:** Last State
**Keep alive:** no
**Log activity:** no

#### blowerXfault

**Description:** Blower (X) Fault
**Type:** digital input
**Debounce:** 20ms
**Edge:** both
**Log activity:** no

#### blowerXspeed

**Description:** Blower (X) Speed
**Type:** analog output
**Decimal places:** 0
**Units:** %

#### blowerXoverride

**Description:** Blower X Manual Override
**Type:** Boolean register
**Initial value:** 0
**Log activity:** no

#### blowerXvalue

**Description:** Blower X Manual Set Value
**Type:** Float register
**Units:** %
**Decimal places:** 2
**Initial value:** 0

#### blowerXcontrol

**Description:** Blower X Control
**Type:** Boolean register
**Initial value:** 0
**Log activity:** yes

#### blowerXcycle

**Description:** Blower X Cycle Timer
**Type:** Timer register

#### blowerXcustomcycle

**Description:** Blower X Custom Cycle
**Type:** Boolean register
**Initial value:** 0
**Log activity:** no

#### blowerXcycleontime

**Description:** Blower X Cycle On Time
**Type:** Float register
**Units:** Minutes
**Decimal places:** 0
**Initial value:** 0

#### blowerXcycleofftime

**Description:** Blower X Cycle Off Time
**Type:** Float register
**Units:** Minutes
**Decimal places:** 0
**Initial value:** 0


### Each Zone

- Zones (X) are numbered 01 - 14
- Probes (Y) are number A - B

#### damperXposition

**Description:** Damper (X) Position
**Type:** analog output
**Decimal places:** 0
**Units:** %

#### zoneXavgdamper

**Description:** Zone X Average Damper
**Type:** Float register
**Decimal places:** 2
**Units:** %
**Default:** 0

#### damperXoverride

**Description:** Damper X Manual Override
**Type:** Boolean register
**Initial value:** 0
**Log activity:** no

#### damperXvalue

**Description:** Damper X Manual Set Value
**Type:** Float register
**Units:** %
**Decimal places:** 2
**Initial value:** 0

#### zoneXpYtemp

**Description:** Zone X Temperature Y
**Type:** Analog input
**Decimal places:** 2
**Slope:** 24.272
**Offset :** -24.272
**Units:** C

#### zoneXpYlvtemp

**Description:** Zone X Last Valid Temperature Y
**Type:** Float register
**Decimal places:** 2
**Units:** C
**Default:** 0

#### zoneXpYtempage

- **Description:** Zone X Sensor Age Y
- **Type:** Float register
- **Decimal places:** 0
- **Units:** Seconds
- **Default:** 0

#### zoneXpYavgtemp

**Description:** Zone X Average Temperature Y
**Type:** Float register
**Decimal places:** 2
**Units:** C
**Default:** 0

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

**Description:** Zone X Control
**Type:** Boolean register
**Initial value:** 0
**Log activity:** yes

#### zoneXreset

**Description:** Zone X Reset
**Type:** Boolean register
**Initial value:** 0
**Log activity:** yes

#### zoneXprint

**Description:** Zone X Print Timer
**Type:** Timer register

#### zoneXavgtimer

**Description:** Zone X Average Timer
**Type:** Timer register

#### loadzoneXactive

- **Description:** Load Zone X Active
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### zoneXpfrptime

**Description:** Zone X PFRP Time
**Type:** Float register
**Decimal places:** 0
**Units:** F
**Default:** 0


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

#### refreshsettings

- **Description:** Refresh Settings Trigger
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no
