# North Plains MCP Configuration

More info can be found in the [Pivotal Tracker Epic](https://www.pivotaltracker.com/epic/show/4740746)


## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpPointManager    | Base Station | MCP-1    | 192.168.1.55  |
mcpController      | X-600M       | MCP-1    | 192.168.1.200 |
mcpInputRelay      | X-17S        | MCP-1    |               |
mcpAnalogInput     | X-22S        | MCP-1    |               |
mcpAnalogOutput    | X-317        | MCP-1    | 192.168.1.201 | 00:0c:c8:05:92:97
fcpP1InputRelay    | X-410        | FCP-P1   | 192.168.1.202 | 00:0c:c8:05:92:52
fcpP1AnalogInput   | X-418        | FCP-P1   | 192.168.1.203 | 00:0c:c8:05:6d:15
fcpP1AnalogOutput  | X-317        | FCP-P1   | 192.168.1.204 | 00:0c:c8:05:8a:a7
fcpS2InputRelay    | X-410        | FCP-S2   | 192.168.1.205 | 00:0c:c8:05:91:ad
fcpS2AnalogInput   | X-418        | FCP-S2   | 192.168.1.206 | 00:0c:c8:05:6d:14
fcpS2AnalogOutput  | X-317        | FCP-S2   | 192.168.1.207 | 00:0c:c8:05:8a:88
fcpS1InputRelay    | X-410        | FCP-S1   | 192.168.1.208 | 00:0c:c8:05:91:7f
fcpS1AnalogInput   | X-418        | FCP-S1   | 192.168.1.209 | 00:0c:c8:05:6d:11
fcpS1AnalogOutput  | X-317        | FCP-S1   | 192.168.1.210 | 00:0c:c8:05:8a:7c
fcpP2AnalogInput   | X-418        | FCP-P2   | 192.168.1.212 | 00:0c:c8:05:6d:26
fcpP2AnalogOutput  | X-317        | FCP-P2   | 192.168.1.213 | 00:0c:c8:05:8a:7f
weatherStation     | X-422        |          | 192.168.1.214 | 00:0c:c8:05:25:fc
fcpP2InputRelay    | X-WR-4R3     | FCP-P2   | 192.168.1.220 | 00:0c:c8:04:aa:5a


## Analog Input Configuration

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

Blowers (X) are numbered 01-04

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

#### blowerXidletimer

- **Description:** Blower X Idle Timer
- **Type:** Timer register

#### blowerXrevdamper

- **Description:** Actuator X Control
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
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

#### ambientXtemp

- **Description:** Ambient X Temperature
- **Type:** 1-Wire Sensor
- **Decimal places:** 2
- **Units:** F

#### ambientXlvtemp

- **Description:** Ambient X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### ambientXtempage

- **Description:** Ambient X Sensor Age
- **Type:** Float register
- **Decimal places:** 0
- **Units:** Seconds
- **Default:** 0

#### ambientXavgtemp

- **Description:** Ambient X Average Temperature
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

#### exhaustXlvtemp

- **Description:** Exhaust X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### exhaustXtempage

- **Description:** Exhaust X Sensor Age
- **Type:** Float register
- **Decimal places:** 0
- **Units:** Seconds
- **Default:** 0

#### exhaustXavgtemp

- **Description:** Exhaust X Average Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### biofilterXlvtemp

- **Description:** Biofilter X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### biofilterXtempage

- **Description:** Biofilter X Sensor Age
- **Type:** Float register
- **Decimal places:** 0
- **Units:** Seconds
- **Default:** 0

#### biofilterXavgtemp

- **Description:** Biofilter X Average Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

### Each Zone

- Zones (X) are numbered 01 - 20
- Probes (Y) are numbered A - B

#### damperXPosition

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

#### wirelesscommfailure

- **Description:** Wireless Communication Failure Timer
- **Type:** Timer register
