# Olympic Organics Facility Settings

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
BlowerCycleOnTime                    | Blower On Time (each cycle)             | number  | Minutes          | 55      | 0       | 120  
BlowerCycleOffTime                   | Blower Off Time (each cycle)            | number  | Minutes          | 5       | 0       | 120  

## Blower PID Settings
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerDerivativeTime                 | Blower Derivative Time                  | number  |                  | 10      | 1       | 10    
BlowerDerivative                     | Blower Derivative                       | number  |                  | 0.3     | .1      | 2     
BlowerGain                           | Blower Gain                             | number  |                  | 1       | .1      | 2     
BlowerIntegral                       | Blower Integral                         | number  |                  | 1       | .1      | 2     
BlowerRate                           | Blower Rate                             | number  | Seconds          | 2       | 1       | 300   

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
