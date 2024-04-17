## Remote Access

http://72.250.82.85:9080

## Control Loops

* Blower Control
* Damper Control
* Zone Control
* Temp Average
* Save Batch Status?

## Module List

| name           | type      | ip address    | mac / id          |
| -------------- | --------- | ------------- | ----------------- |
| device1        | X-600M    | 192.168.1.220 | 00:0c:c8:03:c5:2d |
| mcpRelaySlave1 | X-12S     |               | 00001595          |
| mcpInputSlave1 | X-15S     |               | 000013a3          |
| mcpAnalogOut1  | X-317     | 192.168.1.230 | 00:0c:c8:03:c5:76 |
| mcpAnalogOut2  | X-317     | 192.168.1.231 | 00:0c:c8:03:c5:8a |
| mcpAnalogOut3  | X-317     | 192.168.1.232 | 00:0c:c8:03:cb:ff |
| mcpTempRelay1  | X-300     | 192.168.1.240 | 00:0c:c8:03:c2:0d |
| mcpTempRelay2  | X-300     | 192.168.1.241 | 00:0c:c8:03:c2:13 |
| mcpAnalogIn1   | X-DAQ-8A5 | 192.168.1.250 | 00:0c:c8:03:56:dc |
| mcpAnalogIn2   | X-DAQ-8A5 | 192.168.1.251 | 00:0c:c8:03:56:d3 |
| fcp1AnalogIn   | X-DAQ-8A5 | 192.168.1.252 | 00:0c:c8:03:56:d7 |
| fcp2AnalogIn   | X-DAQ-8A5 | 192.168.1.253 | 00:0c:c8:03:56:e4 |

### Old modules (removed):

- fcp1TempRelay1 X-300-E 192.168.1.242 00:0c:c8:03:42:28
- fcp2TempRelay1 X-300-E 192.168.1.243 00:0c:c8:03:42:27

## Analog Output Configuration

Analog outputs on X-317 should be configured as follows:

Mode: 4 - 20 Milliamp Output
Units: %
Decimal Places: 0
User Input Max: 100% = 20mA
User Input Min: 0% = 4mA
State At Powerup: 0%

## IO and Register Configurations

### Each Blower / Duct

Blowers, duct temps and dampers are numbered 45 (14/15), 16 (16), 78 (17/18), 90 (19/20), 12 (21/22), 34 (23/24), and 56 (25/26).

#### duct90temp

Description: Duct (X) Temperature
Type: One wire sensor
Decimal places: 2
Offset : 0
Units: F

#### ductXtemp (except X=90)

Description: Duct (X) Temperature
Type: Analog input
Decimal places: 2
Slope: 50
Offset : -50
Units: F

#### ductXlvtemp

Description: Duct (X) Last Valid Temperature
Type: Float register
Decimal places: 2
Units: F
Default: 0

#### ductXavgtemp

Description: Duct (X) Average Temperature
Type: Float register
Decimal places: 2
Units: F
Default: 0

#### blowerXrun

Description: Blower (X) Run
Type: Relay
Power up mode: Last State
Keep alive: no
Log activity: no

#### blowerXfault

Description: Blower (X) Fault
Type: digital input
Debounce: 20ms
Edge: both
Log activity: no

#### blowerXspeed

Description: Blower (X) Speed
Type: analog output
Decimal places: 0
Units: %

#### blowerXoverride

Description: Blower X Manual Override
Type: Boolean register
Initial value: 0
Log activity: no

#### blowerXvalue

Description: Blower X Manual Set Value
Type: Float register
Units: %
Decimal places: 2
Initial value: 0

#### blowerXcontrol

Description: Blower X Control
Type: Boolean register
Initial value: 0
Log activity: yes

#### blowerXcycle

Description: Blower X Cycle Timer
Type: Timer register

#### damperXposition

Description: Damper (X) Position
Type: analog output
Decimal places: 0
Units: %

### Each Zone

Zones are numbered 14 - 26

#### zoneXtemp

Description: Zone X Temperature
Type: Analog input
Decimal places: 2
Slope: 50
Offset : -50
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
