# Boost Organics Configuration

Facility specific info can be found [here](https://www.pivotaltracker.com/epic/show/4813130).


## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpController      | X-600M       | MCP      | 192.168.1.220 | 00-0C-C8-04-9B-91
mcpInputRelay      | X-17S        | MCP      |     n/a       | 000029BC
mcpAnalogIn        | X-22S        | MCP      |     n/a       | 00002AB0
mcpAnalogOut1      | X-317        | MCP      | 192.168.1.230 | 00-0C-C8-04-74-FA
mcpAnalogOut2      | X-317        | MCP      | 192.168.1.231 | 00-0C-C8-04-74-F6
pointManager       | web server   | MCP      | 192.168.1.55  |


## IO and Register Configurations

## Analog Input Configuration

Analog inputs 1 - 4 on X-22S should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

### Each Blower / Duct

Blowers (X) are numbered 01 - 02

#### ductXpresssptimer

- **Description:** Duct X Pressure Setpoint Timer
- **Type:** Timer register

#### ductXpressuresp

- **Description:** Duct X Pressure Setpoint
- **Type:** Float register
- **Units:** #
- **Decimal places:** 2
- **Initial value:** 0

#### ductXpressure

- **Description:** Duct (X) Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -6.925
- **Units:** in

#### ductXpressureavg

- **Description:** Duct (X) Pressure Average
- **Type:** Float register
- **Units:** in
- **Decimal places:** 2
- **Initial value:** 0

#### blowerXrun

- **Description:** Blower (X) Run
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### blowerXfault

- **Description:** Blower (X) Fault
- **Type:** digital input
- **Debounce:** 20ms
- **Edge:** both
- **Log activity:** no

#### blowerXspeed

- **Description:** Blower (X) Speed
- **Type:** analog output
- **Decimal places:** 0
- **Units:** %

#### blowerXoverride

- **Description:** Blower X Manual Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerXvalue

- **Description:** Blower X Manual Set Value
- **Type:** Float register
- **Units:** %
- **Decimal places:** 2
- **Initial value:** 0

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

#### exhaustXtemp

- **Description:** Exhaust X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 11.25
- **Offset :** -13
- **Units:** F

#### exhaustXlvtemp

- **Description:** Exhaust X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### exhaustXavgtemp

- **Description:** Exhaust X Average Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0


### Each Zone

- Zones (X) are numbered 01 - 08
- Probes (Y) are number A - B

#### damperXposition

- **Description:** Damper (X) Position
- **Type:** analog output
- **Decimal places:** 0
- **Units:** %

#### zoneXavgdamper

- **Description:** Zone X Average Damper
- **Type:** Float register
- **Decimal places:** 2
- **Units:** %
- **Default:** 0

#### damperXoverride

- **Description:** Damper X Manual Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### damperXvalue

- **Description:** Damper X Manual Set Value
- **Type:** Float register
- **Units:** %
- **Decimal places:** 2
- **Initial value:** 0

#### zoneXpYlvtemp

- **Description:** Zone X Last Valid Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### zoneXpYtempage

- **Description:** Zone X Sensor Age Y
- **Type:** Float register
- **Decimal places:** 0
- **Units:** Seconds
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

#### zoneXregtimer

- **Description:** Zone X Regime Timer
- **Type:** Timer register

#### zoneXregime

- **Description:** Zone X Regime
- **Type:** Float register
- **Units:** #
- **Decimal places:** 0
- **Initial value:** 0

#### zoneXpfrptime

- **Description:** Zone X PFRP Time
- **Type:** Float register
- **Decimal places:** 0
- **Units:** F
- **Default:** 0

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

#### wirelesscommfailure

- **Description:** Wireless Communication Failure Timer
- **Type:** Timer register
