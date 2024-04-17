# Univerve Configuration

## Module List

There is also an [IO Roster][io-roster].

[io-roster]: IO_ROSTER.md

name               | type         | location | ip address    | mac / id
------------------ | ------------ | -------- | ------------- | -----------------
mcpController      | X-600M       | MCP      | 192.168.1.220 | 
mcpInputRelay      | X-17S        | MCP      |     n/a       | 
mcpAnalogIn        | X-22S        | MCP      |     n/a       | 
mcpAnalogOut1      | X-317        | MCP      | 192.168.1.230 |
mcpAnalogOut2      | X-317        | MCP      | 192.168.1.231 | 

<!-- TODO get names and types from Jake  -->

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

Blowers (X) are numbered 01 - 06

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

#### blowerXdoorswitch

- **Description:** Blower (X) Door Switch
- **Type:** digital input
- **Debounce:** 20ms
- **Edge:** both
- **Log activity:** no

#### exteriorXdoorswitch

- **Description:** Exterior (X) Door Switch
- **Type:** digital input
- **Debounce:** 20ms
- **Edge:** both
- **Log activity:** no

#### blowerXtunneldamper

- **Description:** Blower (X) Tunnel Damper
- **Type:** analog output
- **Decimal places:** 0
- **Units:** %

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

#### tunnelXdoor

- **Description:** Tunnel X Door Switch
- **Type:** Relay
- **Power up mode:** off
- **Keep alive:** no
- **Log activity:** no

#### hsdamperXposition

- **Description:** Headspace Damper X Position
- **Type:** analog output
- **Decimal places:** 0
- **Units:** %

#### damperXvalue

- **Description:** Headspace Damper X Manual Set Value
- **Type:** Float register
- **Units:** %
- **Decimal places:** 2
- **Initial value:** 0


#### biodamperXoverride

- **Description:** Biofilter Damper X Manual Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

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

#### bioblowerXrun

- **Description:** Biofilter Blower (X) Run
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### bioblowerXcontrol

- **Description:** Biofilter Blower X Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### bioblowerXfault

- **Description:** Biofilter Blower X Fault
- **Type:** digital input
- **Debounce:** 20ms
- **Edge:** both
- **Log activity:** no

#### bioblowerXspeed

- **Description:** Biofilter Blower X Speed
- **Type:** analog output
- **Decimal places:** 0
- **Units:** %

#### biofilterXpressure

- **Description:** Biofilter (X) Pressure
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 1.731
- **Offset :** -6.925
- **Units:** in

#### biopressureXavg

- **Description:** Biofilter (X) Pressure Average
- **Type:** Float register
- **Units:** in
- **Decimal places:** 2
- **Initial value:** 0

#### bioblowerXoverride

- **Description:** Biofilter Blower X Manual Override
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** no

#### bioblowerXvalue

- **Description:** Biofilter Blower X Manual Set Value
- **Type:** Float register
- **Units:** %
- **Decimal places:** 2
- **Initial value:** 0

#### biofilterXtemp

- **Description:** Biofilter X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 11.25
- **Offset :** -13
- **Units:** F

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

#### biodamperXposition

- **Description:** Biofilter Damper X Position
- **Type:** analog output
- **Decimal places:** 0
- **Units:** %

#### biodamperXvalue

- **Description:** Biofilter Damper X Manual Set Value
- **Type:** Float register
- **Units:** %
- **Decimal places:** 2
- **Initial value:** 0

#### biotunnelXdoor

- **Description:** Biofilter X Tunnel Door Switch
- **Type:** digital input
- **Debounce:** 20ms
- **Edge:** both
- **Log activity:** no


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

#### zoneXtemp

- **Description:** Zone X Temperature
- **Type:** Analog input
- **Decimal places:** 2
- **Slope:** 11.25
- **Offset :** -13
- **Units:** F

#### zoneXlvtemp

- **Description:** Zone X Last Valid Temperature Y
- **Type:** Float register
- **Decimal places:** 2
- **Units:** F
- **Default:** 0

#### zoneXavgtemp

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

#### extrdoorXopen

- **Description:** Exterior Door X Switch
- **Type:** Relay
- **Power up mode:** Last State
- **Keep alive:** no
- **Log activity:** no

#### windowXopen

- **Description:** Window X Switch
- **Type:** digital input
- **Debounce:** 20ms
- **Edge:** both
- **Log activity:** no

#### turbocontrol

- **Description:** Turbo Mode Control
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### turborun

- **Description:** Turbo Mode Run
- **Type:** Boolean register
- **Initial value:** 0
- **Log activity:** yes

#### turbotimer

- **Description:** Turbo Mode Fail Safe Timer
- **Type:** Timer register

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
