# Blossom Valley Expansion Facility Settings

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
MisterP7PosTempSetPoint              | Mister P7 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200  
MisterP7NegTempSetPoint              | Mister P7 Neg Temp Set Point            | number  | temperatureUnit  | 95      | 0       | 200  
MisterOnTime                         | Mister On Time                          | number  | Minutes          | 55      | 10      | 86400  
MisterOffTime                        | Mister Off Time                         | number  | Minutes          | 55      | 10      | 86400
BlowerCycleOnTime                    | Blower On Time (each cycle)             | number  | Minutes          | 55      | 0       | 120  
BlowerCycleOffTime                   | Blower Off Time (each cycle)            | number  | Minutes          | 5       | 0       | 120
BlowerP7TempSetPoint                 | Blower P7 Temp Set Point                | number  | temperatureUnit  | 100     | 0       | 200  
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
Zone25RegimeType                     | Zone 25 Regime Type                     | string  |                  | warmup  |         |      
Zone26RegimeType                     | Zone 26 Regime Type                     | string  |                  | warmup  |         |      
Zone27RegimeType                     | Zone 27 Regime Type                     | string  |                  | warmup  |         |      
Zone28RegimeType                     | Zone 28 Regime Type                     | string  |                  | warmup  |         |      

## Wireless Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Zone25ProbeAPointID                  | Zone 25 Probe A                         | string  |                  |         |         |      
Zone25ProbeBPointID                  | Zone 25 Probe B                         | string  |                  |         |         |      
Zone26ProbeAPointID                  | Zone 26 Probe A                         | string  |                  |         |         |      
Zone26ProbeBPointID                  | Zone 26 Probe B                         | string  |                  |         |         |      
Zone27ProbeAPointID                  | Zone 27 Probe A                         | string  |                  |         |         |      
Zone27ProbeBPointID                  | Zone 27 Probe B                         | string  |                  |         |         |      
Zone28ProbeAPointID                  | Zone 28 Probe A                         | string  |                  |         |         |      
Zone28ProbeBPointID                  | Zone 28 Probe B                         | string  |                  |         |         |      
BiofilterP7ProbeAPointID             | Biofilter P7 Probe A                    | string  |                  |         |         |      
BiofilterP7ProbeBPointID             | Biofilter P7 Probe B                    | string  |                  |         |         |      
