# Dirt Hugger Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpController      | X-600M       | MCP      | 192.168.1.220 | 00:0c:c8:03:91:dc
mcpAnalogOutput    | X-317        | MCP      | 192.168.1.230 | 00:0c:c8:04:8f:94
mcpInputRelay      | X-310        | MCP      | 192.168.1.231 | 00:0c:c8:02:f2:97
mcpAnalogInput     | X-16S        | MCP      | n/a           | 00002d6e
mcpRelay           | X-12S        | MCP      | n/a           | 000003f0
mcpPointManager    | web server   | MCP      | 192.168.1.55  |
fcpAnalogOutput    | X-317        | FCP      | 192.168.1.240 | 00:0c:c8:04:8f:8e
fcpInputRelay      | X-310        | FCP      | 192.168.1.241 | 00:0c:c8:02:f2:96
fcpAnalogInput     | X-418        | FCP      | 192.168.1.242 | 00:0C:C8:04:9F:93


## Analog Input Configuration

Analog inputs 1 - 3 on X-418 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

## Analog Output Configuration

Analog outputs on each X-317 should be configured as follows:

- **Mode:** 4 - 20 Milliamp Output
- **Units:** %
- **Decimal Places:**  0
- **User Input Max:**  100% = 20mA
- **User Input Min:**  0% = 4mA
- **State At Powerup:**  0%

## IO and Register Configuration

### Each Blower / Duct

Blowers (X) are numbered 01 - 02

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
- **Slope:** -6.925
- **Offset :** 34.625
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

#### biofilterXavgtemp

- **Description:** Biofilter X Average Temperature
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### biofilterXmister

- **Description:** Biofilter X Mister Control
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### biofilterXmisttimer

- **Description:** Biofilter X Mister Timer
- **Type:** Timer register

#### biofilterXmistdelay

- **Description:** Biofilter X Mister Delay
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

### Each Zone

- Zones (X) are numbered 01 - 06
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

### Each Pump

- Pumps used in South pad only
- Pumps (X) are numbered 01 - 03

#### pumpXspeed

- **Description:** Pump X Speed
- **Type:** Float register
- **Units:** #
- **Decimal places:** 0
- **Initial value:** 0

#### pumpXspeed1

- **Description:** Pump X Speed 1
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### pumpXspeed2

- **Description:** Pump X Speed 2
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
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

#### pollwirelesstemps

- **Description:** Poll Wireless Temps Timer
- **Type:** Timer register

#### wirelesscommfailure

- **Description:** Wireless Communication Failure Timer
- **Type:** Timer register
