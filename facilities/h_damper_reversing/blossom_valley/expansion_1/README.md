# Blossom Valley Expansion 1 Configuration




## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name                 | type         | location | ip address    | mac / id
-------------------- | ------------ | -------- | ------------- | -----------------
mcp03Controller      | X-600M       | MCP-3    | 192.168.1.100 | 00-0C-C8-05-D1-84
fcpP7AnalogOutput02  | X-410        | MCP-2    | 192.168.1.201 | 00-0C-C8-05-03-CD
fcpP7InputRelay02    | X-410        | MCP-2    | 192.168.1.202 | 00-0C-C8-05-D7-03
fcpP7InputRelay      | X-410        | FCP-P7   | 192.168.1.204 | 00-0C-C8-05-A8-58
fcpP7AnalogInput     | X-418        | FCP-P7   | 192.168.1.205 | 00-0C-C8-05-96-E7
fcpP7AnalogOutput    | X-317        | FCP-P7   | 192.168.1.206 | 00-0C-C8-05-E3-BD
fcpS7AnalogInput     | X-418        | FCP-S7   | 192.168.1.210 | 00-0C-C8-05-96-EF
fcpS7AnalogOutput    | X-317        | FCP-S7   | 192.168.1.211 | 00-0C-C8-05-E3-AF


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

Blowers (X) are numbered P7, S7

#### ductXpresssptimer

- **Description:** Duct X Pressure Setpoint Timer
- **Type:** Timer register

#### ductXpressuresp

- **Description:** Duct (X) Pressure Setpoint
- **Type:** Float register
- **Units:** in
- **Decimal places:** 2
- **Initial value:** 0

#### ductXpospressuresp (Primary Blowers Only)

- **Description:** Duct (X) Positive Direction Pressure Setpoint
- **Type:** Float register
- **Units:** in
- **Decimal places:** 2
- **Initial value:** 0

#### ductXnegpressuresp (Primary Blowers Only)

- **Description:** Duct (X) Negative Direction Pressure Setpoint
- **Type:** Float register
- **Units:** in
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

#### ductXmister (Primary Blowers Only)

- **Description:** Duct (X) Mister Control
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### ductXmistercontrol (Primary Blowers Only)

- **Description:** Duct X Mister Manual Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### ductXmisteroverride (Primary Blowers Only)

- **Description:** Duct X Mister Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### ductXmistertimer (Primary Blowers Only)

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

#### blowerXprerevspeed (Primary Blowers Only)

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

#### blowerXrevdamper (Primary Blowers Only)

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

#### premisterXtemp (Primary Blowers Only)

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

#### exhaustXtemp (Primary Blowers Only)

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

- Zones (X) are numbered 25 - 28
- Probes (Y) are numbered A - B
- Dampers (Z) use a 3 character system
- First 2 characters represent a blower ID consisting of pad type, Primary (P) or Secondary (S), and number of blower within sequence of pad type
- Third character represents damper associated with blower ID using alphabetical sequencing
- Dampers are numbered P7A,P7B,S7A,S7B

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
- **Units:**
- **Default:** 0

#### zoneXcapped

- **Description:** Zone X Batch is Capped
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

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
