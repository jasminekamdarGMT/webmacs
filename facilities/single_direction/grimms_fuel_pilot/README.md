# Grimm's Fuel Pilot Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpController      | X-600M       | MCP      | 192.168.1.220 | 00:0c:c8:04:46:32
mcpAnalogInput     | X-16S        | MCP      |     n/a       | 0000244c
mcpAnalogOutput    | X-317        | MCP      | 192.168.1.230 | 00:0C:C8:04:32:A4

## Analog Output Configuration

Analog outputs on X-317 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

### Each Zone

- Zones (X) are numbered 01 - 03

#### damperXposition

Description: Damper (X) Position
Type: analog output
Decimal places: 0
Units: %

#### zoneXavgdamper

Description: Zone X Average Damper
Type: Float register
Decimal places: 2
Units: %
Default: 0

#### damperXoverride

Description: Damper X Manual Override
Type: Boolean register
Initial value: 0
Log activity: no

#### damperXvalue

Description: Damper X Manual Set Value
Type: Float register
Units: %
Decimal places: 2
Initial value: 0

#### zoneXtemp

Description: Zone X Temperature
Type: Analog input
Decimal places: 2
Slope: 45
Offset : -13
Units: F

#### zoneXlvtemp

Description: Zone X Last Valid Temperature
Type: Float register
Decimal places: 2
Units: F
Default: 0

#### zoneXavgtemp

Description: Zone X Average Temperature
Type: Float register
Decimal places: 2
Units: F
Default: 0

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

#### zoneXregtimer

- **Description:** Zone X Regime Timer
- **Type:** Timer register

#### zoneXregime

- **Description:** Zone X Regime
- **Type:** Float register
- **Units:** #
- **Decimal places:** 0
- **Initial value:** 0


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
