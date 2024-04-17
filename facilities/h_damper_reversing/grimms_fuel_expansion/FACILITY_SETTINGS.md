# Grimm's Expansion Facility Settings

## Administration
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
FacilityName                         | Facility Name                           | string  |                  |         |         |      
Username                             | Username                                | string  |                  |         |         |      
Email                                | Email/SMS Address                       | string  |                  |         |         |      
TemperatureUnits                     | Temperature Units                       | string  |                  | F       |         |      
MaxTemperatureAlarm                  | High Temperature Alarm                  | number  | temperatureUnit  | 80      | 0       | 180  
MinTemperatureAlarm                  | Low Temperature Alarm                   | number  | temperatureUnit  | 0       | 0       | 180  
DataLoggingRate                      | Data Logging Rate                       | number  | Minutes          | 120     | 0       | 720  
WirelessSensorAgeAlarm               | Wireless Sensor Age Alarm               | number  | Minutes          | 10      | 5       | 720     

## Blower Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
MinVFDSpeed                          | Minimum VFD Speed                       | number  | %                | 25      | 20      | 100  
MaxVFDSpeed                          | Maximum VFD Speed                       | number  | %                | 100     | 20      | 100  
PosDirPressureSetpointMin            | Blower Pos Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 15   
PosDirPressureSetpointMax            | Blower Pos Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 15   
NegDirPressureSetpointMin            | Blower Neg Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 15   
NegDirPressureSetpointMax            | Blower Neg Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 15   
PressureSetpointHotZoneTrigger       | Pressure Setpoint Hot Zone Trigger      | number  | %                | 50      | 0       | 100  
PressureSetpointColdZoneTrigger      | Pressure Setpoint Cold Zone Trigger     | number  | %                | 50      | 0       | 100  
PressureSetpointChangeTimer          | Pressure Setpoint Change Timer          | number  | Minutes          | 2       | 1       | 12  
PressureSetpointChangeInterval       | Pressure Setpoint Change Interval       | number  | Inches           | 2       | 1       | 15   
Mister01TempSetPoint                 | Mister 1 Temp Set Point                 | number  | temperatureUnit  | 70      | 0       | 120  
Mister02TempSetPoint                 | Mister 2 Temp Set Point                 | number  | temperatureUnit  | 70      | 0       | 120  
Mister03TempSetPoint                 | Mister 3 Temp Set Point                 | number  | temperatureUnit  | 70      | 0       | 120  
Mister04TempSetPoint                 | Mister 4 Temp Set Point                 | number  | temperatureUnit  | 70      | 0       | 120  
Mister01MinOnTime                    | Mister 1 On Timer                       | number  | Minutes          | 2       | 0       | 15  
Mister02MinOnTime                    | Mister 2 On Timer                       | number  | Minutes          | 2       | 0       | 15  
Mister03MinOnTime                    | Mister 3 On Timer                       | number  | Minutes          | 2       | 0       | 15  
Mister04MinOnTime                    | Mister 4 On Timer                       | number  | Minutes          | 2       | 0       | 15  
BiofilterForcePositiveTemperature    | Biofilter Force Positive Temp           | number  | temperatureUnit  | 80      | 0       | 120  
BlowerCyclePositiveTime              | Blower Cycle Positive Aeration Timer    | number  | Minutes          | 40      | 0       | 120  
BlowerCycleNegativeTime              | Blower Cycle Negative Aeration Timer    | number  | Minutes          | 40      | 0       | 120  

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
Regime1TempSetPoint                  | Regime 1 Temp Set Point                 | number  | temperatureUnit  | 131     | 0       | 180  
Regime2TempSetPoint                  | Regime 2 Temp Set Point                 | number  | temperatureUnit  | 144     | 0       | 180  
Regime3TempSetPoint                  | Regime 3 Temp Set Point                 | number  | temperatureUnit  | 134     | 0       | 180  

## Wireless Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Zone01ProbeAPointID                  | Zone 1 Probe A                          | string  |                  |         |         |      
Zone01ProbeBPointID                  | Zone 1 Probe B                          | string  |                  |         |         |      
Zone02ProbeAPointID                  | Zone 2 Probe A                          | string  |                  |         |         |      
Zone02ProbeBPointID                  | Zone 2 Probe B                          | string  |                  |         |         |      
Zone03ProbeAPointID                  | Zone 3 Probe A                          | string  |                  |         |         |      
Zone03ProbeBPointID                  | Zone 3 Probe B                          | string  |                  |         |         |      
Zone04ProbeAPointID                  | Zone 4 Probe A                          | string  |                  |         |         |      
Zone04ProbeBPointID                  | Zone 4 Probe B                          | string  |                  |         |         |      
Zone05ProbeAPointID                  | Zone 5 Probe A                          | string  |                  |         |         |      
Zone05ProbeBPointID                  | Zone 5 Probe B                          | string  |                  |         |         |      
Zone06ProbeAPointID                  | Zone 6 Probe A                          | string  |                  |         |         |      
Zone06ProbeBPointID                  | Zone 6 Probe B                          | string  |                  |         |         |      
Zone07ProbeAPointID                  | Zone 7 Probe A                          | string  |                  |         |         |      
Zone07ProbeBPointID                  | Zone 7 Probe B                          | string  |                  |         |         |      
Zone08ProbeAPointID                  | Zone 8 Probe A                          | string  |                  |         |         |      
Zone08ProbeBPointID                  | Zone 8 Probe B                          | string  |                  |         |         |      
Zone09ProbeAPointID                  | Zone 9 Probe A                          | string  |                  |         |         |      
Zone09ProbeBPointID                  | Zone 9 Probe B                          | string  |                  |         |         |      
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
Biofilter01ProbePointID              | Biofilter 1 Probe                       | string  |                  |         |         |      
Biofilter02ProbePointID              | Biofilter 2 Probe                       | string  |                  |         |         |      
Biofilter03ProbePointID              | Biofilter 3 Probe                       | string  |                  |         |         |      
Biofilter04ProbePointID              | Biofilter 4 Probe                       | string  |                  |         |         |      
