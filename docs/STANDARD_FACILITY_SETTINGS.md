# Standard Facility Settings

This document is a list of standard facility settings broken into groups corresponding to their respective feature.

## Administration
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
FacilityName                         | Facility Name                           | string  |                  |         |         |      
Username                             | Username                                | string  |                  |         |         |      
Email                                | Email/SMS Address                       | string  |                  |         |         |      
TemperatureUnits                     | Temperature Units                       | string  |                  | F       |         |      
MaxTemperatureAlarm                  | High Temperature Alarm                  | number  | temperatureUnit  | 180     | 0       | 180  
MinTemperatureAlarm                  | Low Temperature Alarm                   | number  | temperatureUnit  | 0       | 0       | 180  
DataLoggingRate                      | Data Logging Rate                       | number  | Minutes          | 120     | 0       | 720  

### Specific To Systems With Wireless Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
WirelessSensorAgeAlarm               | Wireless Sensor Age Alarm               | number  | Minutes          | 10      | 5       | 720     

## Blower Control

### Specific To Single Direction Aeration Systems
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerCycleOnTime                    | Blower On Time (each cycle)             | number  | Minutes          | 55      | 0       | 120  
BlowerCycleOffTime                   | Blower Off Time (each cycle)            | number  | Minutes          | 5       | 0       | 120  

### Specific To Reversing Direction Aeration Systems
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BiofilterForcePositiveTemperature    | Biofilter Force Positive Temp           | number  | temperatureUnit  | 80      | 0       | 120  
BlowerCyclePositiveTime              | Blower Cycle Positive Aeration Timer    | number  | Minutes          | 40      | 0       | 120  
BlowerCycleNegativeTime              | Blower Cycle Negative Aeration Timer    | number  | Minutes          | 40      | 0       | 120  

### Specific To Systems With Speed Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
MinVFDSpeed                          | Minimum VFD Speed                       | number  | %                | 25      | 20      | 100  

### Specific To Systems With Pressure Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
PressureSetpointMin                  | Blower Pressure Setpoint Min            | number  | Inches           | 4       | 1       | 15   
PressureSetpointMax                  | Blower Pressure Setpoint Max            | number  | Inches           | 8       | 1       | 15   
PressureSetpointHotZoneTrigger       | Pressure Setpoint Hot Zone Trigger      | number  | %                | 50      | 0       | 100  
PressureSetpointColdZoneTrigger      | Pressure Setpoint Cold Zone Trigger     | number  | %                | 50      | 0       | 100  
PressureSetpointChangeTimer          | Pressure Setpoint Change Timer          | number  | Minutes          | 2       | 1       | 12  
PressureSetpointChangeInterval       | Pressure Setpoint Change Interval       | number  | Inches           | 2       | 1       | 15   

### Specific To Reversing Systems With Pressure Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
PosDirPressureSetpointMin            | Blower Pos Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 15   
PosDirPressureSetpointMax            | Blower Pos Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 15   
NegDirPressureSetpointMin            | Blower Neg Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 15   
NegDirPressureSetpointMax            | Blower Neg Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 15   

### Specific To Systems With Exhaust Mister Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
MisterXTempSetPoint                  | Mister X Temp Set Point                 | number  | temperatureUnit  | 70      | 0       | 120  

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
DamperDerivative                     | Damper Derivative                       | number  |                  | 0.75    | .1      | 2    
DamperGain                           | Damper Gain                             | number  |                  | 0.5     | .1      | 2    
DamperIntegral                       | Damper Integral                         | number  |                  | 1       | .1      | 2    
DamperRate                           | Damper Rate                             | number  | Seconds          | 90      | 1       | 300

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
- X represents corresponding zone or blower id
- Y represents probe id

### Specific To Systems With Zone Temp Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
ZoneXProbeYPointID                   | Zone X Probe Y                          | string  |                  |         |         |      

### Specific To Systems With Exhaust Temp Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
ExhaustXProbePointID                 | Exhaust X Probe                         | string  |                  |         |         |      

### Specific To Systems With Biofilter Temp Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BiofilterXProbePointID               | Biofilter X Probe                       | string  |                  |         |         |      

## Zone Control

### Specific To Systems Without Zone Dampers
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerXTempSetPoint                  | Blower X Temp Set Point                 | number  | temperatureUnit  | 80      | 0       | 80   