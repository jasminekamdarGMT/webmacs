# Blossom Valley Facility Settings

## Administration
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
FacilityName                         | Facility Name                           | string  |                  |         |         |      
Username                             | Username                                | string  |                  |         |         |      
Email                                | Email/SMS Address                       | string  |                  |         |         |      
TemperatureUnits                     | Temperature Units                       | string  |                  | F       |         |      
MaxTemperatureAlarm                  | High Temperature Alarm                  | number  | temperatureUnit  | 176     | 0       | 200  
MinTemperatureAlarm                  | Low Temperature Alarm                   | number  | temperatureUnit  | 32      | 0       | 200  
DataLoggingRate                      | Data Logging Rate                       | number  | Minutes          | 120     | 0       | 720  

## Blower Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
MinVFDSpeed                          | Minimum VFD Speed                       | number  | %                | 25      | 20      | 100  
MaxVFDSpeed                          | Maximum VFD Speed                       | number  | %                | 100     | 20      | 100  
PressureSetpointMin                  | Blower Pressure Setpoint Min            | number  | Inches           | 4       | 1       | 15   
PressureSetpointMax                  | Blower Pressure Setpoint Max            | number  | Inches           | 8       | 1       | 15   
PosDirPressureSetpointMin            | Blower Pos Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 15   
PosDirPressureSetpointMax            | Blower Pos Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 15   
NegDirPressureSetpointMin            | Blower Neg Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 15   
NegDirPressureSetpointMax            | Blower Neg Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 15   
PressureSetpointHotZoneTrigger       | Pressure Setpoint Hot Zone Trigger      | number  | %                | 50      | 0       | 100  
PressureSetpointColdZoneTrigger      | Pressure Setpoint Cold Zone Trigger     | number  | %                | 50      | 0       | 100  
PressureSetpointChangeTimer          | Pressure Setpoint Change Timer          | number  | Minutes          | 2       | 1       | 12  
PressureSetpointChangeInterval       | Pressure Setpoint Change Interval       | number  | Inches           | 2       | 1       | 15   
MisterP1PosTempSetPoint              | Mister P1 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200  
MisterP2PosTempSetPoint              | Mister P2 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200
MisterP3PosTempSetPoint              | Mister P3 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200  
MisterP4PosTempSetPoint              | Mister P4 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200  
MisterP5PosTempSetPoint              | Mister P5 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200
MisterP6PosTempSetPoint              | Mister P6 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200  
MisterP1NegTempSetPoint              | Mister P1 Neg Temp Set Point            | number  | temperatureUnit  | 95      | 0       | 200  
MisterP2NegTempSetPoint              | Mister P2 Neg Temp Set Point            | number  | temperatureUnit  | 95      | 0       | 200
MisterP3NegTempSetPoint              | Mister P3 Neg Temp Set Point            | number  | temperatureUnit  | 95      | 0       | 200  
MisterP4NegTempSetPoint              | Mister P4 Neg Temp Set Point            | number  | temperatureUnit  | 95      | 0       | 200  
MisterP5NegTempSetPoint              | Mister P5 Neg Temp Set Point            | number  | temperatureUnit  | 95      | 0       | 200
MisterP6NegTempSetPoint              | Mister P6 Neg Temp Set Point            | number  | temperatureUnit  | 95      | 0       | 200  
MisterOnTime                         | Mister On Time                          | number  | Minutes          | 55      | 10      | 86400  
MisterOffTime                        | Mister Off Time                         | number  | Minutes          | 55      | 10      | 86400
BlowerCycleOnTime                    | Blower On Time (each cycle)             | number  | Minutes          | 55      | 0       | 120  
BlowerCycleOffTime                   | Blower Off Time (each cycle)            | number  | Minutes          | 5       | 0       | 120
BlowerP1TempSetPoint                 | Blower P1 Temp Set Point                | number  | temperatureUnit  | 100     | 0       | 200  
BlowerP2TempSetPoint                 | Blower P2 Temp Set Point                | number  | temperatureUnit  | 100     | 0       | 200
BlowerP3TempSetPoint                 | Blower P3 Temp Set Point                | number  | temperatureUnit  | 100     | 0       | 200   
PrimaryPadPosDirectionTempSetPoint   | PrimaryPad Pos Direction Temp Set Point | number  | temperatureUnit  | 100     | 0       | 200  
PrimaryPadNegDirectionTempSetPoint   | PrimaryPad Neg Direction Temp Set Point | number  | temperatureUnit  | 100     | 0       | 200  

## Blower PID Settings
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerDerivativeTime                 | Blower Derivative Time                  | number  |                  | 10      | 1       | 10    
BlowerDerivative                     | Blower Derivative                       | number  |                  | 0.3     | .1      | 2     
BlowerGain                           | Blower Gain                             | number  |                  | 1       | .1      | 2     
BlowerIntegral                       | Blower Integral                         | number  |                  | 1       | .1      | 2     
BlowerRate                           | Blower Rate                             | number  | Seconds          | 2       | 1       | 300   

## Damper Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
MinDamperValue                       | Mininum Damper Value                    | number  | %                | 6       | 5       | 100  

## Damper PID Settings
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
DamperDerivativeTime                 | Damper Derivative Time                  | number  |                  | 10      | 1       | 10    
DamperDerivative                     | Damper Derivative                       | number  |                  | 0.3     | .1      | 2    
DamperGain                           | Damper Gain                             | number  |                  | 1       | .1      | 2    
DamperIntegral                       | Damper Integral                         | number  |                  | 1       | .1      | 2    
DamperRate                           | Damper Rate                             | number  | Seconds          | 10      | 1       | 300  

## Graph Settings

### Specific to Systems With Reference Temp Line on Graph
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
GraphReferenceTemp                   | Reference Temp                          | number  |                  |         |         |
GraphReferenceTempLabel              | Reference Temp Label                    | string  |                  |         |         |

## Regime Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Regime1Duration                      | Regime 1 Duration                       | number  | Days             | 5       | 0       | 30   
Regime2Duration                      | Regime 2 Duration                       | number  | Days             | 7       | 0       | 30   
Regime1TempSetPoint                  | Regime 1 Temp Set Point                 | number  | temperatureUnit  | 131     | 0       | 200  
Regime2TempSetPoint                  | Regime 2 Temp Set Point                 | number  | temperatureUnit  | 144     | 0       | 200  
Regime3TempSetPoint                  | Regime 3 Temp Set Point                 | number  | temperatureUnit  | 134     | 0       | 200  
Zone01RegimeType                     | Zone 01 Regime Type                     | string  |                  | warmup  |         |      
Zone02RegimeType                     | Zone 02 Regime Type                     | string  |                  | warmup  |         |      
Zone03RegimeType                     | Zone 03 Regime Type                     | string  |                  | warmup  |         |      
Zone04RegimeType                     | Zone 04 Regime Type                     | string  |                  | warmup  |         |      
Zone05RegimeType                     | Zone 05 Regime Type                     | string  |                  | warmup  |         |      
Zone06RegimeType                     | Zone 06 Regime Type                     | string  |                  | warmup  |         |      
Zone07RegimeType                     | Zone 07 Regime Type                     | string  |                  | warmup  |         |      
Zone08RegimeType                     | Zone 08 Regime Type                     | string  |                  | warmup  |         |      
Zone09RegimeType                     | Zone 09 Regime Type                     | string  |                  | warmup  |         |      
Zone10RegimeType                     | Zone 10 Regime Type                     | string  |                  | warmup  |         |      
Zone11RegimeType                     | Zone 11 Regime Type                     | string  |                  | warmup  |         |      
Zone12RegimeType                     | Zone 12 Regime Type                     | string  |                  | warmup  |         |      
Zone13RegimeType                     | Zone 13 Regime Type                     | string  |                  | warmup  |         |      
Zone14RegimeType                     | Zone 14 Regime Type                     | string  |                  | warmup  |         |      
Zone15RegimeType                     | Zone 15 Regime Type                     | string  |                  | warmup  |         |      
Zone16RegimeType                     | Zone 16 Regime Type                     | string  |                  | warmup  |         |      
Zone17RegimeType                     | Zone 17 Regime Type                     | string  |                  | warmup  |         |      
Zone18RegimeType                     | Zone 18 Regime Type                     | string  |                  | warmup  |         |      
Zone19RegimeType                     | Zone 19 Regime Type                     | string  |                  | warmup  |         |      
Zone20RegimeType                     | Zone 20 Regime Type                     | string  |                  | warmup  |         |      
Zone21RegimeType                     | Zone 21 Regime Type                     | string  |                  | warmup  |         |      
Zone22RegimeType                     | Zone 22 Regime Type                     | string  |                  | warmup  |         |      
Zone23RegimeType                     | Zone 23 Regime Type                     | string  |                  | warmup  |         |      
Zone24RegimeType                     | Zone 24 Regime Type                     | string  |                  | warmup  |         |      

## Wireless Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Zone01ProbeAPointID                  | Zone 01 Probe A                         | string  |                  |         |         |      
Zone01ProbeBPointID                  | Zone 01 Probe B                         | string  |                  |         |         |      
Zone02ProbeAPointID                  | Zone 02 Probe A                         | string  |                  |         |         |      
Zone02ProbeBPointID                  | Zone 02 Probe B                         | string  |                  |         |         |      
Zone03ProbeAPointID                  | Zone 03 Probe A                         | string  |                  |         |         |      
Zone03ProbeBPointID                  | Zone 03 Probe B                         | string  |                  |         |         |      
Zone04ProbeAPointID                  | Zone 04 Probe A                         | string  |                  |         |         |      
Zone04ProbeBPointID                  | Zone 04 Probe B                         | string  |                  |         |         |      
Zone05ProbeAPointID                  | Zone 05 Probe A                         | string  |                  |         |         |      
Zone05ProbeBPointID                  | Zone 05 Probe B                         | string  |                  |         |         |      
Zone06ProbeAPointID                  | Zone 06 Probe A                         | string  |                  |         |         |      
Zone06ProbeBPointID                  | Zone 06 Probe B                         | string  |                  |         |         |
Zone07ProbeAPointID                  | Zone 07 Probe A                         | string  |                  |         |         |      
Zone07ProbeBPointID                  | Zone 07 Probe B                         | string  |                  |         |         |
Zone08ProbeAPointID                  | Zone 08 Probe A                         | string  |                  |         |         |      
Zone08ProbeBPointID                  | Zone 08 Probe B                         | string  |                  |         |         |
Zone09ProbeAPointID                  | Zone 09 Probe A                         | string  |                  |         |         |      
Zone09ProbeBPointID                  | Zone 09 Probe B                         | string  |                  |         |         |
Zone10ProbeAPointID                  | Zone 10 Probe A                         | string  |                  |         |         |      
Zone10ProbeBPointID                  | Zone 10 Probe B                         | string  |                  |         |         |
Zone11ProbeAPointID                  | Zone 11 Probe A                         | string  |                  |         |         |      
Zone11ProbeBPointID                  | Zone 11 Probe B                         | string  |                  |         |         |
Zone12ProbeAPointID                  | Zone 12 Probe A                         | string  |                  |         |         |      
Zone12ProbeBPointID                  | Zone 12 Probe B                         | string  |                  |         |         |
Zone13ProbeAPointID                  | Zone 13 Probe A                         | string  |                  |         |         |      
Zone13ProbeBPointID                  | Zone 13 Probe B                         | string  |                  |         |         |
Zone14ProbeAPointID                  | Zone 14 Probe A                         | string  |                  |         |         |      
Zone14ProbeBPointID                  | Zone 14 Probe B                         | string  |                  |         |         |
Zone15ProbeAPointID                  | Zone 15 Probe A                         | string  |                  |         |         |      
Zone15ProbeBPointID                  | Zone 15 Probe B                         | string  |                  |         |         |      
Zone16ProbeAPointID                  | Zone 16 Probe A                         | string  |                  |         |         |      
Zone16ProbeBPointID                  | Zone 16 Probe B                         | string  |                  |         |         |      
Zone17ProbeAPointID                  | Zone 17 Probe A                         | string  |                  |         |         |      
Zone17ProbeBPointID                  | Zone 17 Probe B                         | string  |                  |         |         |      
Zone18ProbeAPointID                  | Zone 18 Probe A                         | string  |                  |         |         |      
Zone18ProbeBPointID                  | Zone 18 Probe B                         | string  |                  |         |         |      
Zone19ProbeAPointID                  | Zone 19 Probe A                         | string  |                  |         |         |      
Zone19ProbeBPointID                  | Zone 19 Probe B                         | string  |                  |         |         |      
Zone20ProbeAPointID                  | Zone 20 Probe A                         | string  |                  |         |         |      
Zone20ProbeBPointID                  | Zone 20 Probe B                         | string  |                  |         |         |      
Zone21ProbeAPointID                  | Zone 21 Probe A                         | string  |                  |         |         |      
Zone21ProbeBPointID                  | Zone 21 Probe B                         | string  |                  |         |         |      
Zone22ProbeAPointID                  | Zone 22 Probe A                         | string  |                  |         |         |      
Zone22ProbeBPointID                  | Zone 22 Probe B                         | string  |                  |         |         |      
Zone23ProbeAPointID                  | Zone 23 Probe A                         | string  |                  |         |         |      
Zone23ProbeBPointID                  | Zone 23 Probe B                         | string  |                  |         |         |      
Zone24ProbeAPointID                  | Zone 24 Probe A                         | string  |                  |         |         |      
Zone24ProbeBPointID                  | Zone 24 Probe B                         | string  |                  |         |         |      
BiofilterP1ProbeAPointID             | Biofilter P1 Probe A                    | string  |                  |         |         |      
BiofilterP1ProbeBPointID             | Biofilter P1 Probe B                    | string  |                  |         |         |      
BiofilterP2ProbeAPointID             | Biofilter P2 Probe A                    | string  |                  |         |         |      
BiofilterP2ProbeBPointID             | Biofilter P2 Probe B                    | string  |                  |         |         |       
BiofilterP3ProbeAPointID             | Biofilter P3 Probe A                    | string  |                  |         |         |      
BiofilterP3ProbeBPointID             | Biofilter P3 Probe B                    | string  |                  |         |         |       
BiofilterP4ProbeAPointID             | Biofilter P4 Probe A                    | string  |                  |         |         |      
BiofilterP4ProbeBPointID             | Biofilter P4 Probe B                    | string  |                  |         |         |      
BiofilterP5ProbeAPointID             | Biofilter P5 Probe A                    | string  |                  |         |         |      
BiofilterP5ProbeBPointID             | Biofilter P5 Probe B                    | string  |                  |         |         |       
BiofilterP6ProbeAPointID             | Biofilter P6 Probe A                    | string  |                  |         |         |      
BiofilterP6ProbeBPointID             | Biofilter P6 Probe B                    | string  |                  |         |         |       
