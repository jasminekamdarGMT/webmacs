# Blossom Valley MCP1 Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcp01Controller    | X-600M       | MCP-1    | 192.168.1.100 | 00-0C-C8-04-9B-56
mcp01InputRelay1   | X-17S        | MCP-1    |               | 000029C0
mcp01InputRelay2   | X-17S        | MCP-1    |               | 00002D4B
mcp01AnalogInput   | X-22S        | MCP-1    |               | 00002ABB
mcp01AnalogOutput1 | X-317        | MCP-1    | 192.168.1.101 | 00-0C-C8-04-32-96
mcp01AnalogOutput2 | X-317        | MCP-1    | 192.168.1.102 | 00-0C-C8-04-32-B7
mcp01PointManager  | Base Station | MCP-1    | 192.168.1.103 |
fcpP1InputRelay    | X-410        | FCP-P1   | 192.168.1.104 | 00-0C-C8-04-AF-36
fcpP1AnalogInput   | X-418        | FCP-P1   | 192.168.1.105 | 00-0C-C8-04-9F-76
fcpP1AnalogOutput  | X-317        | FCP-P1   | 192.168.1.106 | 00-0C-C8-04-74-AF
fcpP3InputRelay    | X-410        | FCP-P1   | 192.168.1.107 | 00-0C-C8-04-AF-77
fcpP3AnalogInput   | X-418        | FCP-P3   | 192.168.1.108 | 00-0C-C8-04-9F-79
fcpP3AnalogOutput  | X-317        | FCP-P3   | 192.168.1.109 | 00-0C-C8-04-74-B3
fcpS1AnalogInput   | X-418        | FCP-S1   | 192.168.1.110 | 00-0C-C8-04-9F-90
fcpS1AnalogOutput  | X-317        | FCP-S1   | 192.168.1.111 | 00-0C-C8-04-74-C1
fcpS2AnalogInput   | X-418        | FCP-S2   | 192.168.1.112 | 00-0C-C8-04-9F-95
fcpS2AnalogOutput  | X-317        | FCP-S2   | 192.168.1.113 | 00-0C-C8-04-74-D9
mcp02Controller    | X-600        | MCP-2    | 192.168.1.114 | 00:0C:C8:03:91:DC
mcp02InputRelay1   | X-17S        | MCP-2    |               | 00002D4D
mcp02InputRelay2   | X-17S        | MCP-2    |               | 00002D5A
mcp02AnalogInput   | X-22S        | MCP-2    |               | 00002AC9
mcp02AnalogOutput1 | X-317        | MCP-2    | 192.168.1.115 | 00-0C-C8-04-8F-7C
mcp02AnalogOutput2 | X-317        | MCP-2    | 192.168.1.116 | 00-0C-C8-04-8F-7D
mcp02PointManager  | Base Station | MCP-2    | 192.168.1.117 |
fcpP4InputRelay    | X-410        | FCP-P4   | 192.168.1.118 | 00-0C-C8-04-AF-79
fcpP4AnalogInput   | X-418        | FCP-P4   | 192.168.1.119 | 00-0C-C8-04-9F-97
fcpP4AnalogOutput  | X-317        | FCP-P4   | 192.168.1.120 | 00-0C-C8-04-8F-7F
fcpP5InputRelay    | X-410        | FCP-P5   | 192.168.1.121 | 00-0C-C8-04-AF-7A
fcpP5AnalogInput   | X-418        | FCP-P5   | 192.168.1.122 | 00-0C-C8-04-9F-9C
fcpP5AnalogOutput  | X-317        | FCP-P5   | 192.168.1.123 | 00-0C-C8-04-8F-80
fcpS3AnalogInput   | X-418        | FCP-S3   | 192.168.1.124 | 00-0C-C8-04-9F-9D
fcpS3AnalogOutput  | X-317        | FCP-S3   | 192.168.1.125 | 00-0C-C8-04-8F-83


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

Blowers (X) are numbered P1,P2,P3,P4,P5,P6,S1,S2,S3

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

#### ductXpressure (Secondary Blowers Only)

- **Description:** Duct (X) Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -6.925
- **Units:** in

#### ductXpospressure (Primary Blowers Only)

- **Description:** Duct (X) Positive Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -6.925
- **Units:** in

#### ductXnegpressure (Primary Blowers Only)

- **Description:** Duct (X) Negative Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -34.625
- **Units:** in

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

#### ductXmisteroverride

- **Description:** Duct X Mister Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### ductXmistertimer

- **Description:** Duct X Mister Timer
- **Type:** Timer register

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

#### blowerXidletimer (Primary Blowers Only)

- **Description:** Blower X Idle Timer
- **Type:** Timer register

#### blowerXrevdamper

- **Description:** Actuator X Control
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### blowerXrevoverride (Primary Blowers Only)

- **Description:** Blower X Reverse Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### blowerXdirection (Primary Blowers Only)

- **Description:** Blower X Direction Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### premisterXtemp

- **Description:** Pre-Mister X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 11.25
- **Offset :** -13
- **Units:** F

#### premisterXlvtemp (Primary Blowers Only)

- **Description:** Pre-Mister X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### exhaustXtemp

- **Description:** Exhaust X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 11.25
- **Offset :** -13
- **Units:** F

#### exhaustXlvtemp (Primary Blowers Only)

- **Description:** Exhaust X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### exhaustXavgtemp (Primary Blowers Only)

- **Description:** Exhaust X Average Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### biofilterXpYlvtemp (Primary Blowers Only)

- **Description:** Biofilter X Last Valid Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### biofilterXpYavgtemp (Primary Blowers Only)

- **Description:** Biofilter X Average Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

### Each Zone

- Zones (X) are numbered 01 - 24
- Probes (Y) are numbered A - B
- Dampers (Z) use a 3 character system
- First 2 characters represent a blower ID consisting of pad type, Primary (P) or Secondary (S), and number of blower within sequence of pad type
- Third character represents damper associated with blower ID using alphabetical sequencing
- Dampers are numbered P1A,P1B,P2A,P2B,P3A,P3B,P4A,P4B,P5A,P5B,P6A,P6B,S1A,S1B,S1C,S2A,S2B,S2C,S3A,S3B,S3C

#### damperZposition

- **Description:** Damper Z Position
- **Type:** analog output
- **Decimal places:** 0
- **Units:** %

#### zoneXavgdamper

- **Description:** Zone X Average Damper
- **Type:** Float register
- **Decimal places:** 2
- **Units:** %
- **Default:** 0

#### damperZoverride

- **Description:** Damper Z Manual Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### damperZvalue

- **Description:** Damper Z Manual Set Value
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

#### loadzoneXactive

- **Description:** Load Zone X Active
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

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

#### pollwirelesstemps

- **Description:** Poll Wireless Temps Timer
- **Type:** Timer register

#### wirelesscommfailure

- **Description:** Wireless Communication Failure Timer
- **Type:** Timer register

#### zonexcapped

- **Description:** Zone x Batch is Capped
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### containerxalarmage

- **Description:** Container Over Temp Alarm Age Timer
- **Type:** Timer register
