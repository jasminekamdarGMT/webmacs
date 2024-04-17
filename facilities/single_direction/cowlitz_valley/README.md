# Updated Cowlitz Valley Configuration

http://166.253.106.87:9080/setup.html

Updated programming for Cowlitz Valley Compost by Jacob Senecal.

## Control/Logic Lua Scripts

* script1 - Control Functions
* script2 - Zone Control Loop
* script3 - Blower Control Script
* script4 - Zone Startup Script

## Running Tests

```sh
lua new_swanson/tests/test.lua -v
```

### Test Requirements

```sh
luarocks install luaunit
luarocks install lsqlite3complete
```

## IO and Register Configurations

### Each Blower

#### blowerXrun

Description: Blower X Run
Type: Relay
Power up mode: Last State
Keep alive: no
Log activity: no

#### blowerXpressure

Description: Blower X Pressure
Type: analog input
Decimal places:  1
Slope: 6.927
Offset: -6.927
Units: WC
Differential mode: off

#### blowerXfault

Description: Blower X Fault
Type: analog input
Decimal places:  2
Slope: 1
Offset: 0
Units: V
Differential mode: off

#### blowerXSpeed

Description: Blower X Speed
Type: analog output
Decimal places: 0
Units: %

#### blowerXoverride

Description: Blower X Manual Override
Type: Boolean register
Initial value: 0
Log activity: no

#### blowerXtimer

Description: Blower X Timer
Type: Timer register

#### blowerXvalue

Description: Blower X Manual Set Value
Type: Float register
Units: %
Decimal places: 2
Initial value: 0


### Each Zone

#### zoneXTemp

Description: Zone X Temperature
Type: One wire sensor
Decimal places: 2
Offset : 0
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

#### zoneXDamper

Description: Zone X Damper
Type: analog output
Decimal places: 0
Units: %

#### zoneXavgdamper

Description: Zone X Average Damper
Type: Float register
Decimal places: 2
Units: %
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

#### zoneXoverride

Description: Zone X Manual Override
Type: Boolean register
Initial value: 0
Log activity: no

#### zoneXtimer

Description: Zone X Timer
Type: Timer register

#### zoneXavgtimer

Description: Zone X Average Timer
Type: Timer register

#### zoneXprint

Description: Zone X Print Timer
Type: Timer register

#### zoneXbatch

Description: Zone X Batch Timer
Type: Timer register

#### zoneXregime

Description: Current Regime for Zone X
Type: Float register
Units: #
Decimal places: 0
Initial value: 0

#### zoneXvalue

Description: Zone X Manual Set Value
Type: Float register
Units: %
Decimal places: 2
Initial value: 0
