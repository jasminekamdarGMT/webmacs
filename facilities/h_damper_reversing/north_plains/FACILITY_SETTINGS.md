# North Plains Facility Settings

## Administration
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
FacilityName                         | Facility Name                           | string  |                  |         |         |      
Username                             | Username                                | string  |                  |         |         |      
Email                                | Email/SMS Address                       | string  |                  |         |         |      
TemperatureUnits                     | Temperature Units                       | string  |                  | F       |         |      
WirelessBaseStationIP                | Wireless Base Station IP Address        | string  |                  |         |         |      
MaxTemperatureAlarm                  | High Temperature Alarm                  | number  | temperatureUnit  | 176     | 0       | 180  
MinTemperatureAlarm                  | Low Temperature Alarm                   | number  | temperatureUnit  | 32      | 0       | 180  
DataLoggingRate                      | Data Logging Rate                       | number  | Minutes          | 120     | 0       | 720  
WirelessSensorAgeAlarm               | Wireless Sensor Age Alarm               | number  | Minutes          | 10      | 5       | 720     

## Blower Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
MinVFDSpeed                          | Minimum VFD Speed                       | number  | %                | 25      | 20      | 100  
MaxVFDSpeed                          | Maximum VFD Speed                       | number  | %                | 100     | 20      | 100  
PosDirPressureSetpointMin            | Blower Pos Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 20   
PosDirPressureSetpointMax            | Blower Pos Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 20   
NegDirPressureSetpointMin            | Blower Neg Dir Pressure Setpoint Min    | number  | Inches           | 4       | 1       | 20   
NegDirPressureSetpointMax            | Blower Neg Dir Pressure Setpoint Max    | number  | Inches           | 8       | 1       | 20   
PressureSetpointHotZoneTrigger       | Pressure Setpoint Hot Zone Trigger      | number  | %                | 50      | 0       | 100  
PressureSetpointColdZoneTrigger      | Pressure Setpoint Cold Zone Trigger     | number  | %                | 50      | 0       | 100  
PressureSetpointChangeTimer          | Pressure Setpoint Change Timer          | number  | Minutes          | 2       | 1       | 12  
PressureSetpointChangeInterval       | Pressure Setpoint Change Interval       | number  | Inches           | 2       | 1       | 15   
BiofilterForcePositiveTemperature    | Biofilter Force Positive Temp           | number  | temperatureUnit  | 80      | 0       | 120  
BlowerCyclePositiveTime              | Blower Cycle Positive Aeration Timer    | number  | Minutes          | 40      | 0       | 120  
BlowerCycleNegativeTime              | Blower Cycle Negative Aeration Timer    | number  | Minutes          | 40      | 0       | 120   
Mister01PosTempSetPoint              | Mister 1 Pos Temp Set Point             | number  | temperatureUnit  | 100     | 0       | 200  
Mister02PosTempSetPoint              | Mister 2 Pos Temp Set Point             | number  | temperatureUnit  | 100     | 0       | 200
Mister03PosTempSetPoint              | Mister 3 Pos Temp Set Point             | number  | temperatureUnit  | 100     | 0       | 200  
Mister04PosTempSetPoint              | Mister 4 Pos Temp Set Point             | number  | temperatureUnit  | 100     | 0       | 200
Mister01NegTempSetPoint              | Mister 1 Neg Temp Set Point             | number  | temperatureUnit  | 95      | 0       | 200  
Mister02NegTempSetPoint              | Mister 2 Neg Temp Set Point             | number  | temperatureUnit  | 95      | 0       | 200
Mister03NegTempSetPoint              | Mister 3 Neg Temp Set Point             | number  | temperatureUnit  | 95      | 0       | 200  
Mister04NegTempSetPoint              | Mister 4 Neg Temp Set Point             | number  | temperatureUnit  | 95      | 0       | 200
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
Zone01AProbeAPointID                 | Zone 1 Probe A                          | string  |                  |         |         |      
Zone01BProbeBPointID                 | Zone 1 Probe B                          | string  |                  |         |         |      
Zone02AProbeAPointID                 | Zone 2 Probe A                          | string  |                  |         |         |      
Zone02BProbeBPointID                 | Zone 2 Probe B                          | string  |                  |         |         |      
Zone03AProbeAPointID                 | Zone 3 Probe A                          | string  |                  |         |         |      
Zone03BProbeBPointID                 | Zone 3 Probe B                          | string  |                  |         |         |      
Zone04AProbeAPointID                 | Zone 4 Probe A                          | string  |                  |         |         |      
Zone04BProbeBPointID                 | Zone 4 Probe B                          | string  |                  |         |         |      
Zone05AProbeAPointID                 | Zone 5 Probe A                          | string  |                  |         |         |      
Zone05BProbeBPointID                 | Zone 5 Probe B                          | string  |                  |         |         |      
Zone06AProbeAPointID                 | Zone 6 Probe A                          | string  |                  |         |         |      
Zone06BProbeBPointID                 | Zone 6 Probe B                          | string  |                  |         |         |      
Zone07AProbeAPointID                 | Zone 7 Probe A                          | string  |                  |         |         |      
Zone07BProbeBPointID                 | Zone 7 Probe B                          | string  |                  |         |         |      
Zone08AProbeAPointID                 | Zone 8 Probe A                          | string  |                  |         |         |      
Zone08BProbeBPointID                 | Zone 8 Probe B                          | string  |                  |         |         |      
Zone09AProbeAPointID                 | Zone 9 Probe A                          | string  |                  |         |         |      
Zone09BProbeBPointID                 | Zone 9 Probe B                          | string  |                  |         |         |      
Zone10AProbeAPointID                 | Zone 10 Probe A                         | string  |                  |         |         |      
Zone10BProbeBPointID                 | Zone 10 Probe B                         | string  |                  |         |         |      
Zone11AProbeAPointID                 | Zone 11 Probe A                         | string  |                  |         |         |      
Zone11BProbeBPointID                 | Zone 11 Probe B                         | string  |                  |         |         |      
Zone12AProbeAPointID                 | Zone 12 Probe A                         | string  |                  |         |         |      
Zone12BProbeBPointID                 | Zone 12 Probe B                         | string  |                  |         |         |      
Zone13AProbeAPointID                 | Zone 13 Probe A                         | string  |                  |         |         |      
Zone13BProbeBPointID                 | Zone 13 Probe B                         | string  |                  |         |         |      
Zone14AProbeAPointID                 | Zone 14 Probe A                         | string  |                  |         |         |      
Zone14BProbeBPointID                 | Zone 14 Probe B                         | string  |                  |         |         |      
Zone15AProbeAPointID                 | Zone 15 Probe A                         | string  |                  |         |         |      
Zone15BProbeBPointID                 | Zone 15 Probe B                         | string  |                  |         |         |      
Zone16AProbeAPointID                 | Zone 16 Probe A                         | string  |                  |         |         |      
Zone16BProbeBPointID                 | Zone 16 Probe B                         | string  |                  |         |         |      
Zone17AProbeAPointID                 | Zone 17 Probe A                         | string  |                  |         |         |      
Zone17BProbeBPointID                 | Zone 17 Probe B                         | string  |                  |         |         |      
Zone18AProbeAPointID                 | Zone 18 Probe A                         | string  |                  |         |         |      
Zone18BProbeBPointID                 | Zone 18 Probe B                         | string  |                  |         |         |      
Zone19AProbeAPointID                 | Zone 19 Probe A                         | string  |                  |         |         |      
Zone19BProbeBPointID                 | Zone 19 Probe B                         | string  |                  |         |         |      
Zone20AProbeAPointID                 | Zone 20 Probe A                         | string  |                  |         |         |      
Zone20BProbeBPointID                 | Zone 20 Probe B                         | string  |                  |         |         |      
Biofilter01ProbePointID              | Biofilter 01 Probe                      | string  |                  |         |         |      
Biofilter02ProbePointID              | Biofilter 02 Probe                      | string  |                  |         |         |      
Biofilter03ProbePointID              | Biofilter 03 Probe                      | string  |                  |         |         |      
Biofilter04ProbePointID              | Biofilter 04 Probe                      | string  |                  |         |         |      
