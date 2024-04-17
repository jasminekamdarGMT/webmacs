# Dirt Hugger Facility Settings

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
SETTING NAME                                 | DESCRIPTION                                     | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
-------------------------------------------- | ----------------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Blower01MinVFDSpeed                          | Minimum VFD Speed                               | number  | %                | 25      | 20      | 100  
Blower01MaxVFDSpeed                          | Maximum VFD Speed                               | number  | %                | 100     | 20      | 100  
Blower01PosDirPressureSetpointMin            | Blower Pos Dir Pressure Setpoint Min            | number  | Inches           | 4       | 1       | 20   
Blower01PosDirPressureSetpointMax            | Blower Pos Dir Pressure Setpoint Max            | number  | Inches           | 8       | 1       | 20   
Blower01NegDirPressureSetpointMin            | Blower Neg Dir Pressure Setpoint Min            | number  | Inches           | 4       | 1       | 20   
Blower01NegDirPressureSetpointMax            | Blower Neg Dir Pressure Setpoint Max            | number  | Inches           | 8       | 1       | 20   
Blower01PressureSetpointHotZoneTrigger       | Pressure Setpoint Hot Zone Trigger              | number  | %                | 50      | 0       | 100  
Blower01PressureSetpointColdZoneTrigger      | Pressure Setpoint Cold Zone Trigger             | number  | %                | 50      | 0       | 100  
Blower01PressureSetpointChangeTimer          | Pressure Setpoint Change Timer                  | number  | Minutes          | 2       | 1       | 12  
Blower01PressureSetpointChangeInterval       | Pressure Setpoint Change Interval               | number  | Inches           | 2       | 1       | 15   
Blower01BlowerCyclePositiveTime              | Blower Cycle Positive Aeration Timer            | number  | Minutes          | 40      | 0       | 120  
Blower01BlowerCycleNegativeTime              | Blower Cycle Negative Aeration Timer            | number  | Minutes          | 40      | 0       | 120  
Blower02MinVFDSpeed                          | Minimum VFD Speed                               | number  | %                | 25      | 20      | 100  
Blower02MaxVFDSpeed                          | Maximum VFD Speed                               | number  | %                | 100     | 20      | 100  
Blower02PosDirPressureSetpointMin            | Blower Pos Dir Pressure Setpoint Min            | number  | Inches           | 4       | 1       | 20   
Blower02PosDirPressureSetpointMax            | Blower Pos Dir Pressure Setpoint Max            | number  | Inches           | 8       | 1       | 20   
Blower02NegDirPressureSetpointMin            | Blower Neg Dir Pressure Setpoint Min            | number  | Inches           | 4       | 1       | 20   
Blower02NegDirPressureSetpointMax            | Blower Neg Dir Pressure Setpoint Max            | number  | Inches           | 8       | 1       | 20   
Blower02PressureSetpointHotZoneTrigger       | Pressure Setpoint Hot Zone Trigger              | number  | %                | 50      | 0       | 100  
Blower02PressureSetpointColdZoneTrigger      | Pressure Setpoint Cold Zone Trigger             | number  | %                | 50      | 0       | 100  
Blower02PressureSetpointChangeTimer          | Pressure Setpoint Change Timer                  | number  | Minutes          | 2       | 1       | 12  
Blower02PressureSetpointChangeInterval       | Pressure Setpoint Change Interval               | number  | Inches           | 2       | 1       | 15   
Blower02BlowerCyclePositiveTime              | Blower Cycle Positive Aeration Timer            | number  | Minutes          | 40      | 0       | 120  
Blower02BlowerCycleNegativeTime              | Blower Cycle Negative Aeration Timer            | number  | Minutes          | 40      | 0       | 120  
Blower01BiofilterForcePositiveTemperature    | Blower Biofilter Force Positive Temp            | number  | temperatureUnit  | 80      | 0       | 120  
Blower02BiofilterForcePositiveTemperature    | Blower Biofilter Force Positive Temp            | number  | temperatureUnit  | 80      | 0       | 120  

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
Zone01MinDamperValue                 | Zone 1 Mininum Damper Value             | number  | %                | 6       | 5       | 100  
Zone02MinDamperValue                 | Zone 2 Mininum Damper Value             | number  | %                | 6       | 5       | 100  
Zone03MinDamperValue                 | Zone 3 Mininum Damper Value             | number  | %                | 6       | 5       | 100  
Zone04MinDamperValue                 | Zone 4 Mininum Damper Value             | number  | %                | 6       | 5       | 100  
Zone05MinDamperValue                 | Zone 5 Mininum Damper Value             | number  | %                | 6       | 5       | 100  
Zone06MinDamperValue                 | Zone 6 Mininum Damper Value             | number  | %                | 6       | 5       | 100  

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
Zone06RegimeType                     | Zone 6 Regime Type                      | string  |                  | warmup  |         |

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
Biofilter01ProbePointID              | Biofilter 1 Probe                       | string  |                  |         |         |      
Biofilter02ProbePointID              | Biofilter 2 Probe                       | string  |                  |         |         |      
