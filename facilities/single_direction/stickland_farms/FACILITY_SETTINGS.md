# Stickland Farms Facility Settings

## Administration
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
FacilityName                         | Facility Name                           | string  |                  |         |         |      
Username                             | Username                                | string  |                  |         |         |      
Email                                | Email/SMS Address                       | string  |                  |         |         |      
TemperatureUnits                     | Temperature Units                       | string  |                  | C       |         |      
MaxTemperatureAlarm                  | High Temperature Alarm                  | number  | temperatureUnit  | 80      | 0       | 180  
MinTemperatureAlarm                  | Low Temperature Alarm                   | number  | temperatureUnit  | 0       | 0       | 180  
DataLoggingRate                      | Data Logging Rate                       | number  | Minutes          | 120     | 0       | 720  

## Blower Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerCycleOnTime                    | Blower On Time (each cycle)             | number  | Minutes          | 55      | 0       | 120  
BlowerCycleOffTime                   | Blower Off Time (each cycle)            | number  | Minutes          | 5       | 0       | 120  

## Blower PID Settings
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
BlowerRate                           | Blower Rate                             | number  | Seconds          | 2       | 1       | 300   

## Regime Control
SETTING NAME                         | DESCRIPTION                             | TYPE    | UNIT             | DEFAULT | MIN     | MAX  
------------------------------------ | --------------------------------------- | ------- | ---------------- | ------- | ------- | -------
Regime1Duration                      | Regime 1 Duration                       | number  | Days             | 5       | 0       | 30   
Regime2Duration                      | Regime 2 Duration                       | number  | Days             | 7       | 0       | 30   
Regime1TempSetPoint                  | Regime 1 Temp Set Point                 | number  | temperatureUnit  | 131     | 0       | 180  
Regime2TempSetPoint                  | Regime 2 Temp Set Point                 | number  | temperatureUnit  | 144     | 0       | 180  
Regime3TempSetPoint                  | Regime 3 Temp Set Point                 | number  | temperatureUnit  | 134     | 0       | 180  
