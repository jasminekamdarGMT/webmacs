# Edama Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name                   | type          | location  | ip address         | mac / id
---------------------- | ------------- | --------- | ------------------ | -----------------
mcpAnalogInput         | X-22S         | MCP       |                    | 00003fe1
mcpAnalogOutput1       | X-317         | MCP       | 192.168.1.230:2502 | 00:0C:C8:05:6C:4c
mcpAnalogOutput2       | X-317         | MCP       | 192.168.1.231:2503 | 00:0C:C8:05:6C:25
mcpAnalogOutput3       | X-317         | MCP       | 192.168.1.232:2504 | 00:0C:C8:05:58:0C
mcpController          | X-600M        | MCP       |                    |
mcpInputRelay          | X-17S         | MCP       |                    | 00004cf7


## Analog Input Configuration

Analog inputs 1 - 8 on X-22S should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

Analog inputs 1 - 4 on X-418 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

## Analog Output Configuration

Analog outputs on X-317 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

## IO and Register Configuration

### Each Blower / Duct

- Blowers (X) are numbered 01
- Probes (Y) are numbered A - D

#### ductXpresssptimer

- **Description:** Duct X Pressure Setpoint Timer
- **Type:** Timer register

#### ductXpressuresp

- **Description:** Duct (X) Pressure Setpoint
- **Type:** Float register
- **Units:** #
- **Decimal places:** 2
- **Initial value:** 0

#### ductXpospressuresp

- **Description:** Duct (X) Positive Direction Pressure Setpoint
- **Type:** Float register
- **Units:** #
- **Decimal places:** 2
- **Initial value:** 0

#### ductXnegpressuresp

- **Description:** Duct (X) Negative Direction Pressure Setpoint
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

#### ductXpospressure

- **Description:** Duct (X) Positive Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -6.925
- **Units:** in

#### ductXnegpressure

- **Description:** Duct (X) Negative Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -34.625
- **Units:** in

#### ductXpospressureavg

- **Description:** Duct (X) Positive Pressure
- **Type:** Float register
- **Units:** In
- **Decimal places:** 2
- **Initial value:** 0

#### ductXnegpressureavg

- **Description:** Duct (X) Negative Pressure
- **Type:** Float register
- **Units:** In
- **Decimal places:** 2
- **Initial value:** 0

#### ductXmister

- **Description:** Duct (X) Mister Control
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### ductXmistercontrol

- **Description:** Duct X Mister Manual Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### ductXmistertimer

- **Description:** Duct X Mister Timer
- **Type:** Timer register

#### ductXmisteroverride

- **Description:** Duct X Mister Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

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

#### blowerXprerevspeed

- **Description:** Blower X Pre-reversing value
- **Type:** Float register
- **Units:** %
- **Decimal places:** 2
- **Initial value:** 0

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

#### blowerXidletimer

- **Description:** Blower X Idle Timer
- **Type:** Timer register

#### blowerXrevdamper

- **Description:** Blower X Aeration Reversing Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerXrevtimer

- **Description:** Blower X Reverse Timer
- **Type:** Timer register

#### blowerXrevoverride

- **Description:** Blower X Reverse Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerXdirection

- **Description:** Blower X Direction Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerXrevlogic

- **Description:** Blower X Reverse Logic Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### premisterXtemp

- **Description:** Pre-Mister X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 11.25
- **Offset :** -13
- **Units:** C

#### premisterXlvtemp

- **Description:** Pre-Mister X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** C
- **Default:** 0

#### exhaustXtemp

- **Description:** Exhaust X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 11.25
- **Offset :** -13
- **Units:** C

#### exhaustXlvtemp

- **Description:** Exhaust X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** C
- **Default:** 0

#### exhaustXavgtemp

- **Description:** Exhaust X Average Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** C
- **Default:** 0

#### biofilterXpYlvtemp

- **Description:** Biofilter X Last Valid Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** C
- **Default:** 0

#### biofilterXpYtempage

- **Description:** Biofilter X Sensor Age Y
- **Type:** Float register
- **Decimal places:** 0
- **Units:** Seconds
- **Default:** 0

#### biofilterXpYavgtemp

- **Description:** Biofilter X Average Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** C
- **Default:** 0

### Each Zone

- Zones (X) are numbered 01 - 05
- Probes (Y) are numbered A - D

#### damperXposition

- **Description:** Damper X Position
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
- **Units:** C
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
- **Units:** C
- **Default:** 0

#### zoneXtempsp

- **Description:** Zone X Temp Setpoint
- **Type:** Float register
- **Decimal places:** 0
- **Units:** C
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

- **Description:** Zone X PFRP Time
- **Type:** Float register
- **Decimal places:** 0
- **Units:** C
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
