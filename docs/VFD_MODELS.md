# VFD Models

There are some different Variable Frequency Drive models that have been integrated with the WebMACS system.

_Note: SJ Drives are not dual torque drives. You have to choose constant or variable torque. This is relevant for both SJ-P1s and SJ700s._

## Hitachi SJ700

Source logic should be selected for the input termimals (FW).

- **P24**: supplies 24 VDC from VFD, connects to X-17S relay common side
- **FW**: connects to X-17S relay normally open side
- **AL0**: VFD alarm relay common side, connects to +24VDC from WebMACS power supply
- **AL1**: VFD alarm relay normally open side, connects to X-17S input
- **L**: analog input common, connects to 0VDC from WebMACS power supply
- **OI**: analog input 4-20mA, connects to X-317 analog output

Common for X-317 output and X-17S inputs should also be connected to 0VDC from WebMACS power supply.

## Hitachi SJ-P1

Source logic should be selected for the input termimals (FW).

- **COM**: common for VFD control inputs, connects to X-17S relay common side
- **9 [FW]**: connects to X-17S relay normally open side
- **AL0**: VFD alarm relay common side, connects to +24VDC from WebMACS power supply
- **AL1**: VFD alarm relay normally open side, connects to X-17S input
- **L**: analog input common, connects to 0VDC from WebMACS power supply
- **Ai1**: analog input 4-20mA, connects to X-317 analog output (make sure SW1 is configured for 4-20mA/current input)

Common for X-317 output and X-17S inputs should also be connected to 0VDC from WebMACS power supply.
