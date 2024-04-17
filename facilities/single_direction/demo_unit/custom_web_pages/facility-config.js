const temperatureUnit = '°F';
var facilityConfig = {
    verifiedWithVersion: '1.0.35',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    logFilesPerPage: 2,
    showMap: false,
    layoutType: 'card',
    zoneProbeIds: [''],
    IORegList: [
      "blower01run",
      "blower02run",
      "blower01control",
      "blower02control",
      "blower01customcycle",
      "blower02customcycle",
      "blower01cycle",
      "blower02cycle",
      "blower01cycleofftime",
      "blower02cycleofftime",
      "blower01cycleontime",
      "blower02cycleontime",
      "blower01override",
      "blower02override",
      "zone01temp",
      "zone01temp",
      "zone02temp",
      "zone02temp",
      "zone01moveto",
      "zone02moveto",
      "zone01control",
      "zone02control",
      "zone01reset",
      "zone02reset",
      "zone01print",
      "zone02print",
      "zone01avgtimer",
      "zone02avgtimer",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse",
      "refreshsettings"
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: '01',
                blowerLabel: 'Blower 1',
              	tempSetpointSettingName: 'Blower01TempSetPoint',
                hasSpeedControl: false,
                hasLogHeadSpaceTempControl: true,
                drumId: '01'
            },
            groupZones: [
                {
                    zoneId: '01',
                    setpointSettingName: 'Blower01TempSetPoint',
                    hasDamperControl: false
                }
            ],
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower 2',
              	tempSetpointSettingName: 'Blower02TempSetPoint',
                hasSpeedControl: false,
                drumId: '02'
            },
            groupZones: [
                {
                    zoneId: '02',
                    setpointSettingName: 'Blower02TempSetPoint',
                    hasDamperControl: false
                }
            ],
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0
    },
    settingsGroups: [
      	{
            groupName: 'zone',
            groupLabel: 'Zone Control',
            groupTitle: 'Zone Settings',
            groupSettings: [
                {
                    settingName: 'Blower01TempSetPoint',
                    settingLabel: 'Zone 1 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 300
                },
                {
                    settingName: 'Blower02TempSetPoint',
                    settingLabel: 'Zone 2 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 300
                }
            ]
        },
        {
            groupName: 'blower',
            groupLabel: 'Blower Control',
            groupTitle: 'Blower Settings',
            groupSettings: [
                {
                    settingName: 'BlowerCycleOnTime',
                    settingLabel: 'Blower On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'BlowerCycleOffTime',
                    settingLabel: 'Blower Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                }
            ],
            groupAdvancedLabel: 'Blower PID Settings',
            groupAdvancedSettings: [
                {
                    settingName: 'BlowerGain',
                    settingLabel: 'Gain',
                    settingType: 'number',
                    settingMin: .1,
                    settingMax: 2,
                    settingIncrementStep: .1,
                },
                {
                    settingName: 'BlowerIntegral',
                    settingLabel: 'Integral',
                    settingType: 'number',
                    settingMin: .1,
                    settingMax: 2,
                    settingIncrementStep: .1,
                },
                {
                    settingName: 'BlowerDerivative',
                    settingLabel: 'Derivative',
                    settingType: 'number',
                    settingMin: .1,
                    settingMax: 2,
                    settingIncrementStep: .1,
                },
              	{
                    settingName: 'BlowerDerivativeTime',
                    settingLabel: 'Derivative Time',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 10
                },
                {
                    settingName: 'BlowerRate',
                    settingLabel: 'Rate',
                    settingUnit: 'Seconds',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 300
                },
              	{
                    settingName: 'DamperRate',
                    settingLabel: 'Rate',
                    settingUnit: 'Seconds',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 300
                }
            ]
        },
        {
            groupName: 'admin',
            groupLabel: 'Administration',
            groupTitle: 'Administration Settings',
            groupSettings: [
                {
                    settingName: 'FacilityName',
                    settingLabel: 'Facility Name',
                    settingType: 'string'
                },
                {
                    settingName: 'Username',
                    settingLabel: 'Username *',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Email',
                    settingLabel: 'Email/SMS Address *',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'TemperatureUnits',
                    settingLabel: 'Temperature Units *',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'MaxTemperatureAlarm',
                    settingLabel: 'High Temperature Alarm',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'MinTemperatureAlarm',
                    settingLabel: 'Low Temperature Alarm',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'DataLoggingRate',
                    settingLabel: 'Data Logging Rate',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 720
                }
            ]
        }
    ],
    inputMonitorGroups: [
        {
            groupName: 'ZoneTemps',
            groupLabel: 'Zone Temps',
            groupInputs: [
                {
                    inputName: 'zone01temp',
                    inputLabel: 'Zone 1 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02temp',
                    inputLabel: 'Zone 2 Probe A',
                    inputUnit: temperatureUnit
                },
              	{
                    inputName: 'headspace01temp',
                    inputLabel: 'Head Space 1 Temp',
                    inputUnit: temperatureUnit
                }
            ]
        },
        {
            groupName: 'Blowers',
            groupLabel: 'Blowers',
            groupInputs: [
                {
                    inputName: 'blower01run',
                    inputLabel: 'Blower 1 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower02run',
                    inputLabel: 'Blower 2 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                }
            ]
        }
    ]
}
