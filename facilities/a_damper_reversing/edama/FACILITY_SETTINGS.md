# Edama Facility Settings

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
Mister01PosTempSetPoint              | Mister 01 Pos Temp Set Point            | number  | temperatureUnit  | 100     | 0       | 200
Mister01NegTempSetPoint              | Mister 01 Neg Temp Set Point            | number  | temperatureUnit  | 104     | 0       | 200
Blower01TempSetPoint                 | Blower 01 Temp Set Point                | number  | temperatureUnit  | 100     | 0       | 200  
Blower01PosDirectionTempSetPoint     | Blower 01 Pos Direction Temp Set Point  | number  | temperatureUnit  | 100     | 0       | 200
Blower01NegDirectionTempSetPoint     | Blower 01 Neg Direction Temp Set Point  | number  | temperatureUnit  | 100     | 0       | 200  
BlowerCyclePositiveTime              | Blower Cycle Positive Time              | number  | Minutes          | 30      | 0       | 1440
BlowerCycleNegativeTime              | Blower Cycle Negative Time              | number  | Minutes          | 30      | 0       | 1440
MisterOnTime                         | Mister On Time                          | number  | Minutes          | 55      | 10      | 86400  
MisterOffTime                        | Mister Off Time                         | number  | Minutes          | 55      | 10      | 86400

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

## Regime Settings

### Specific to Systems With Locational Regime Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Zone01RegimeType                     | Zone 1 Regime Type                      | string  |                  | warmup  |         |
Zone02RegimeType                     | Zone 2 Regime Type                      | string  |                  | warmup  |         |
Zone03RegimeType                     | Zone 3 Regime Type                      | string  |                  | warmup  |         |
Zone04RegimeType                     | Zone 4 Regime Type                      | string  |                  | warmup  |         |
Zone05RegimeType                     | Zone 5 Regime Type                      | string  |                  | warmup  |         |

## Wireless Probes
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Zone01ProbeAPointID                  | Zone 01 Probe A                         | string  |                  |         |         |
Zone01ProbeBPointID                  | Zone 01 Probe B                         | string  |                  |         |         |
Zone01ProbeCPointID                  | Zone 01 Probe A                         | string  |                  |         |         |
Zone01ProbeDPointID                  | Zone 01 Probe B                         | string  |                  |         |         |
Zone02ProbeAPointID                  | Zone 02 Probe A                         | string  |                  |         |         |
Zone02ProbeBPointID                  | Zone 02 Probe B                         | string  |                  |         |         |
Zone02ProbeCPointID                  | Zone 02 Probe A                         | string  |                  |         |         |
Zone02ProbeDPointID                  | Zone 02 Probe B                         | string  |                  |         |         |
Zone03ProbeAPointID                  | Zone 03 Probe A                         | string  |                  |         |         |
Zone03ProbeBPointID                  | Zone 03 Probe B                         | string  |                  |         |         |
Zone03ProbeCPointID                  | Zone 03 Probe A                         | string  |                  |         |         |
Zone03ProbeDPointID                  | Zone 03 Probe B                         | string  |                  |         |         |
Zone04ProbeAPointID                  | Zone 04 Probe A                         | string  |                  |         |         |
Zone04ProbeBPointID                  | Zone 04 Probe B                         | string  |                  |         |         |
Zone04ProbeCPointID                  | Zone 04 Probe A                         | string  |                  |         |         |
Zone04ProbeDPointID                  | Zone 04 Probe B                         | string  |                  |         |         |
Zone05ProbeAPointID                  | Zone 05 Probe A                         | string  |                  |         |         |
Zone05ProbeBPointID                  | Zone 05 Probe A                         | string  |                  |         |         |
Zone05ProbeCPointID                  | Zone 05 Probe B                         | string  |                  |         |         |
Zone05ProbeDPointID                  | Zone 05 Probe B                         | string  |                  |         |         |
