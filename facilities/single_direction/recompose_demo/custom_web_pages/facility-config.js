
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.15',
    temperatureUnit: temperatureUnit,
    showMap: false,
    defaultPage: 'status',
    layoutType: 'card',
    zoneProbeIds: ['A', 'B', 'C'],
    IORegList: [
      "blower01run",
      "blower02run",
      "blower01control",
      "blower02control",
      "blower01override",
      "blower02override",
      "blower01customcycle",
      "blower02customcycle",
      "blower01cycle",
      "blower02cycle",
      "blower01cycleofftime",
      "blower02cycleofftime",
      "blower01cycleontime",
      "blower02cycleontime",
      "drum01limitswitch",
      "drum01ignorels",
      "drum01rotationls",
      "drum01logrotation",
      "drum01pistoncycle",
      "drum01pistonout",
      "drum01pistonin",
      "headspace01probe",
      "headspace01temp",
      "zone01pAlvtemp",
      "zone01pBlvtemp",
      "zone01pClvtemp",
      "zone01pAavgtemp",
      "zone01pBavgtemp",
      "zone01pCavgtemp",
      "zone01moveto",
      "zone01movedfrom",
      "zone01control",
      "zone01reset",
      "zone01print",
      "zone01avgtimer",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse"
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: '01',
                blowerLabel: 'Drum 1 PAS',
                tempSetpointSettingName: 'Blower01TempSetPoint',
                hasCustomCycleControl: true,
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '01',
                    setpointSettingName: 'Blower01TempSetPoint',
                    hasDamperControl: false
                }
            ],
            secondaryBlower: {
                blowerId: '02',
                blowerLabel: 'Drum 1 Vent Blower',
                hasCustomCycleControl: true,
                hasSpeedControl: false,
                hasLogHeadSpaceTempControl: true,
                hasDrumControl: true,
                drumId: '01'
            },
        },
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
                    settingMax: 170
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
                    settingName: 'BlowerRate',
                    settingLabel: 'Rate',
                    settingUnit: 'Seconds',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 300
                },
                {
                    settingName: 'DamperRate'
                }
            ]
        },
        {
            groupName: 'drum',
            groupLabel: 'Drum Control',
            groupTitle: 'Drum Settings',
            groupSettings: [
              {
                settingName: 'DrumLimitSwitchIgnoreTime',
                settingLabel: 'Drum Limit Switch Detection Delay',
                settingUnit: 'Seconds',
                settingType: 'number',
                settingMin: 0,
                settingMax: 120
              },
              {
                settingName: 'DrumPistonExtensionCycleTime',
                settingLabel: 'Drum Rotation Piston Extension Cycle Time',
                settingUnit: 'Seconds',
                settingType: 'number',
                settingMin: 0,
                settingMax: 30
              },
              {
                settingName: 'DrumPistonRetractionCycleTime',
                settingLabel: 'Drum Rotation Piston Retraction Cycle Time',
                settingUnit: 'Seconds',
                settingType: 'number',
                settingMin: 0,
                settingMax: 30
              }
            ]
        },
        {
            groupName: 'wireless',
            groupLabel: 'Wireless Probes',
            groupTitle: 'Sensor Point IDs',
            groupInfo: "Formatted as <sensor_id>_<point_number> (example: 0000000040B04AE3_1)",
            groupSettings: [
                {
                    settingName: 'Zone01ProbeAPointID',
                    settingLabel: 'Zone 1 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeBPointID',
                    settingLabel: 'Zone 1 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeCPointID',
                    settingLabel: 'Zone 1 Probe C',
                    settingType: 'string',
                    settingDisabled: true
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
                },
                {
                    settingName: 'WirelessBaseStationIP',
                    settingLabel: 'Wireless Base Station IP',
                    settingType: 'string',
                    settingDisabled: true
                }
            ]
        }
    ],
    inputMonitorGroups: [
        {
            groupName: 'Zone1Temps',
            groupLabel: 'Zone 1 Temps',
            groupInputs: [
                {
                    inputName: 'zone01pAlvtemp',
                    inputLabel: 'Zone 1 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pBlvtemp',
                    inputLabel: 'Zone 1 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pClvtemp',
                    inputLabel: 'Zone 1 Probe C',
                    inputUnit: temperatureUnit
                }
            ]
        },
        {
            groupName: 'Zone1Drum',
            groupLabel: 'Zone 1 Drum',
            groupInputs: [
                {
                    inputName: 'drum01limitswitch',
                    inputLabel: 'Drum 1 Rotation',
                    inputTranslations: [
                        { value: 0, translation: '' },
                        { value: 1, translation: 'Complete' }
                    ]
                },
                {
                    inputName: 'headspace01probe',
                    inputLabel: 'Drum 1 Head Space Temperature',
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
