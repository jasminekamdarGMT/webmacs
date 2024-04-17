# Grimm's Fuel Expansion Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpController      | X-600M       | MCP      | 192.168.5.20 | 00:0c:c8:04:70:9b
mcpPointManager    | web server   | MCP      | 192.168.5.26 |
mcpAnalogInput     | X-418        | MCP      | 192.168.5.21 | 00:0c:c8:04:6f:33
mcpInputRelay      | X-410        | MCP      | 192.168.5.22 | 00:0c:c8:04:67:07
mcpRelay           | X-WR-4R3-I   | MCP      | 192.168.5.23 | 00:0c:c8:04:6e:b4
mcpAnalogOutput1   | X-317        | MCP      | 192.168.5.24 | 00:0c:c8:04:74:d2
mcpAnalogOutput2   | X-317        | MCP      | 192.168.5.25 | 00:0c:c8:04:74:cf
fcpInputRelay      | X-401        | FCP      | 192.168.5.27 | 00:0c:c8:04:f0:3d
fcpAnalogInput     | X-418        | FCP      | 192.168.5.28 | 00:0c:c8:04:f5:ba
fcpAnalogOutput1   | X-317        | FCP      | 192.168.5.29 | 00:0c:c8:04:f7:6a
fcpAnalogOutput2   | X-317        | FCP      | 192.168.5.30 | 00:0c:c8:04:f7:3e
fcpRelay           | X-WR-4R3-I   | FCP      | 192.168.5.31 | 00:0c:c8:04:cb:cf

## Analog Input Configuration

Analog inputs 1 - 4 on X-418 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

Analog inputs 5 - 8 on X-418 should be configured as follows:

- **Mode:** 0 - 5 Volt Output
- **Units:** V
- **Decimal Places:**  2
- **User Input Max:**  5V
- **User Input Min:**  0V
- **State At Powerup:**  0V

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

Blowers (X) are numbered 01 - 04

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

#### ductXmister

- **Description:** Duct (X) Mister Control
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
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

#### blowerXidletimer

- **Description:** Blower X Idle Timer
- **Type:** Timer register

#### blowerXrevtimer

- **Description:** Blower X Reverse Timer
- **Type:** Timer register

#### blowerXrevdamper

- **Description:** Actuator X Control
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

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

#### premisterXtemp

- **Description:** Pre-Mister X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 45
- **Offset :** -13
- **Units:** F

#### premisterXlvtemp

- **Description:** Pre-Mister X Last Valid Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### exhaustXtemp

- **Description:** Exhaust X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 45
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

- Zones (X) are numbered 01 - 16
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

#### zoneXtempage

- **Description:** Zone X Sensor Age
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

#### loadzoneXactive

- **Description:** Load Zone X Active
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

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
