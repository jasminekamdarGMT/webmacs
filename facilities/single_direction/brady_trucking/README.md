# Brady Trucking Configuration

## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

| name              | type  | location | ip address | mac / id |
| ----------------- | ----- | -------- | ---------- | -------- |
| mcpAnalogInput01  | X-22S | MCP      |            |          |
| mcpAnalogInput02  | X-22S | MCP      |            |          |
| mcpAnalogInput03  | X-22S | MCP      |            |          |
| mcpAnalogInput04  | X-418 | MCP      |            |          |
| mcpAnalogOutput01 | X-417 | MCP      |            |          |
| mcpAnalogOutput02 | X-417 | MCP      |            |          |
| mcpInputRelay     | X-17S | MCP      |            |          |

## Analog Output Configuration

Analog outputs on X-317 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:** 0
- **User Input Max:** 100% = 20mA
- **User Input Min:** 0% = 4mA
- **State At Powerup:** 0%

## Analog Input Configuration

Analog inputs on X-DAQ-8A5 should be configured to default values (scaling will be done on x600):

- **Differential Mode:** No
- **Units:** None
- **Decimal Places:** 3
- **Slope:** 1
- **Offset:** 0

## IO and Register Configurations

### Each Blower / Duct

Blowers (X) are numbered 01

#### ductXpresssptimer

- **Description:** Duct X Pressure Setpoint Timer
- **Type:** Timer register

#### ductXpressure

- **Description:** Duct (X) Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -6.925
- **Units:** in

#### ductXpressuresp

- **Description:** Duct (X) Pressure Setpoint
- **Type:** Float register
- **Units:** #
- **Decimal places:** 2
- **Initial value:** 0

#### ductXpressureavg

- **Description:** Duct (X) Pressure Average
- **Type:** Float register
- **Units:** in
- **Decimal places:** 2
- **Initial value:** 0

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

### Each Zone

- Zones (X) are numbered 01 - 05
- Probes (Y) are number A - D

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

#### zoneXpYtemp

**Description:** Zone X Temperature Y
**Type:** Analog input
**Decimal places:** 2
**Slope:** 11.25
**Offset :** -13
**Units:** F

#### zoneXpYlvtemp

**Description:** Zone X Last Valid Temperature Y
**Type:** Float register
**Decimal places:** 2
**Units:** F
**Default:** 0

#### zoneXpYavgtemp

**Description:** Zone X Average Temperature Y
**Type:** Float register
**Decimal places:** 2
**Units:** F
**Default:** 0

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

#### zoneXregtimer

- **Description:** Zone X Regime Timer
- **Type:** Timer register

#### zoneXregime

- **Description:** Zone X Regime
- **Type:** Float register
- **Units:** #
- **Decimal places:** 0
- **Initial value:** 0

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
