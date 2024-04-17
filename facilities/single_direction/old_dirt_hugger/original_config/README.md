# Original Dirt Hugger Config

## Devices

Name    | Description          | Address      | Model        | SN / UID
------- | -------------------- | ------------ | ------------ | -----------------
device1 | X-600M (master unit) |              | X-600M       | 00:0c:c8:04:0d:ea
device2 | relays 1-8           | 1            | X-12S        | 000003f0
device3 | relays 9-16          | 2            | X-12S        | 00000459
device5 | Low Air Probes       | 192.168.1.21 | X-DAQ-2R1-4T | 00:0c:c8:03:4e:6f
device6 | High Air Probes      | 192.168.1.22 | X-DAQ-2R1-4T | 00:0c:c8:03:4e:70

## Relay Outputs

Name    | Description | Device  | Device Relay #
------- | ----------- | ------- | --------------
relay1  | Zone 1 AUTO | device2 | 1
relay2  | Zone 2 AUTO | device2 | 2
relay5  | Zone 1 DI1  | device2 | 5
relay6  | Zone 1 DI2  | device2 | 6
relay7  | Zone 1 DI3  | device2 | 7
relay9  | Zone 2 DI1  | device3 | 1
relay10 | Zone 2 DI2  | device3 | 2
relay11 | Zone 2 DI3  | device3 | 3

## One-Wire Sensors

Name    | Description     | Device  | 1-W Sensor #
------- | --------------- | ------- | ------------
temp1   | Temp Probe 1    | device6 | 1
temp2   | Temp Probe 2    | device6 | 2
temp3   | Temp Probe 3    | device6 | 3
temp4   | Temp Probe 4    | device6 | 4
z2temp1 | Temp Probe 1 Z2 | device5 | 1
z2temp2 | Temp Probe 2 Z2 | device5 | 2
z2temp3 | Temp Probe 3 Z2 | device5 | 3
z2temp4 | Temp Probe 4 Z2 | device5 | 4

## IO Registers

Name       | Description            | Type       | Units | Init Value / Expr
---------- | ---------------------- | ---------- | ----- | -----------------
register1  | Zone 1 Set Point       | FLOAT      | °F    | 135
register3  | Blower Full Speed      | BOOLEAN    |       | 0
register5  | SP - 10                | EXPRESSION | °F    | reg.register1 - 10
register7  | Batch Age              | FLOAT      | days  | 0
register8  | Average Temp           | FLOAT      | °F    | 0
register9  | Blower Speed           | FLOAT      | %     | 0
register11 | PFRP                   | FLOAT      | days  | 0
register12 | Duty Cycle ON zone one | BOOLEAN    |       | 0
register13 | Zone 2 Set Point       | FLOAT      | °F    | 135
register15 | Blower Full Speed      | BOOLEAN    |       | 0
register17 | SP - 10                | EXPRESSION | °F    | reg.register13 - 10
register19 | Batch Age              | FLOAT      | days  | 0
register20 | Average Temp           | FLOAT      | °F    | 0
register21 | Blower Speed           | FLOAT      | %     | 0
register23 | PFRP                   | FLOAT      | Days  | 0
register24 | Z2 Duty Cycle ON       | BOOLEAN    |       | 0
register25 | common DC On min       | FLOAT      | min   | 55
register26 | common DC OFF min      | FLOAT      | min   | 5
register27 | Z1 SP + 5              | EXPRESSION | °F    | reg.register1 + 5
register28 | Z2 SP + 5              | EXPRESSION | °F    | reg.register13 + 5
