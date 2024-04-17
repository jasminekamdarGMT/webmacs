# Allwood Facility Settings

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

## Blower Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerCycleOnTime                    | Blower On Time (each cycle)             | number  | Minutes          | 55      | 0       | 120  
BlowerCycleOffTime                   | Blower Off Time (each cycle)            | number  | Minutes          | 5       | 0       | 120  
MinVFDSpeed                          | Minimum VFD Speed                       | number  | %                | 25      | 20      | 100  
MaxVFDSpeed                          | Maximum VFD Speed                       | number  | %                | 100     | 20      | 100  
PressureSetpointMin                  | Blower Pressure Setpoint Min            | number  | Inches           | 4       | 1       | 15   
PressureSetpointMax                  | Blower Pressure Setpoint Max            | number  | Inches           | 8       | 1       | 15   
PressureSetpointHotZoneTrigger       | Pressure Setpoint Hot Zone Trigger      | number  | %                | 50      | 0       | 100  
PressureSetpointColdZoneTrigger      | Pressure Setpoint Cold Zone Trigger     | number  | %                | 50      | 0       | 100  
PressureSetpointChangeTimer          | Pressure Setpoint Change Timer          | number  | Minutes          | 2       | 1       | 12  
PressureSetpointChangeInterval       | Pressure Setpoint Change Interval       | number  | Inches           | 0.5     | 0.1     | 15   

## Blower PID Settings
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerDerivative                     | Blower Derivative                       | number  |                  | 0.5     | .1      | 2     
BlowerGain                           | Blower Gain                             | number  |                  | 0.5     | .1      | 2     
BlowerIntegral                       | Blower Integral                         | number  |                  | 1       | .1      | 2     
BlowerRate                           | Blower Rate                             | number  | Seconds          | 2       | 1       | 300   

## Damper Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
MinDamperValue                       | Mininum Damper Value                    | number  | %                | 6       | 5       | 100  

## Damper PID Settings
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
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
