
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.39',
    temperatureUnit: temperatureUnit,
    dbPath: '',
    layoutType: 'card',
    displayPFRPTime: true,
    zoneProbeIds: [''],
    IORegList: [
      "blower01run",
      "blower02run",
      "blower03run",
      "blower01control",
      "blower02control",
      "blower03control",
      "blower01customcycle",
      "blower02customcycle",
      "blower03customcycle",
      "blower01cycle",
      "blower02cycle",
      "blower03cycle",
      "blower01cycleofftime",
      "blower02cycleofftime",
      "blower03cycleofftime",
      "blower01cycleontime",
      "blower02cycleontime",
      "blower03cycleontime",
      "blower01override",
      "blower02override",
      "blower03override",
      "zone01temp",
      "zone02temp",
      "zone03temp",
      "zone01lvtemp",
      "zone02lvtemp",
      "zone03lvtemp",
      "zone01avgtemp",
      "zone02avgtemp",
      "zone03avgtemp",
      "zone01pfrptime",
      "zone02pfrptime",
      "zone03pfrptime",
      "zone01moveto",
      "zone02moveto",
      "zone03moveto",
      "zone01movedfrom",
      "zone02movedfrom",
      "zone03movedfrom",
      "zone01control",
      "zone02control",
      "zone03control",
      "zone01regime",
      "zone02regime",
      "zone03regime",
      "zone01regtimer",
      "zone02regtimer",
      "zone03regtimer",
      "zone01reset",
      "zone02reset",
      "zone03reset",
      "zone01print",
      "zone02print",
      "zone03print",
      "zone01avgtimer",
      "zone02avgtimer",
      "zone03avgtimer",
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
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '01',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower 2',
                hasSpeedControl: false
            },
            groupZones: [
              {
                  zoneId: '02',
                  setpointSettingName: 'RegimeXTempSetPoint',
                  hasDamperControl: false
              }
            ]
        },
        {
            groupBlower: {
                blowerId: '03',
                blowerLabel: 'Blower 3',
                hasSpeedControl: false
            },
            groupZones: [
              {
                  zoneId: '03',
                  setpointSettingName: 'RegimeXTempSetPoint',
                  hasDamperControl: false
              }
            ]
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0,
        displayReferenceTempOnGraph: true,
        referenceTempColor: "orange"
    },
    settingsGroups: [
        {
            groupName: 'regime',
            groupLabel: 'Regime Control',
            groupTitle: 'Regime Settings',
            groupSettings: [
                {
                    settingName: 'Regime1TempSetPoint',
                    settingLabel: 'Warm Up Regime Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Regime1Duration',
                    settingLabel: 'Warm Up Regime Duration',
                    settingUnit: 'Days',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 30
                },
                {
                    settingName: 'Regime2TempSetPoint',
                    settingLabel: 'PFRP Regime Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Regime2Duration',
                    settingLabel: 'PFRP Regime Duration',
                    settingUnit: 'Days',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 30
                },
                {
                    settingName: 'Regime3TempSetPoint',
                    settingLabel: 'VAR Regime Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
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
                    settingName: 'DamperRate',
                    settingLabel: 'Rate',
                    settingUnit: 'Seconds',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 300,
                    settingHidden: true
                }
            ]
        },
        {
            groupName: 'graph',
            groupLabel: 'Graph Settings',
            groupTitle: 'Graph Settings',
            groupSettings: [
                {
                    settingName: 'GraphReferenceTemp',
                    settingLabel: 'Reference Temp',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'GraphReferenceTempLabel',
                    settingLabel: 'Reference Temp Label',
                    settingType: 'string'
                }
            ]
        },
    ],
    inputMonitorGroups: [
        {
            groupName: 'ZoneTemps',
            groupLabel: 'Zone Temps',
            groupInputs: [
                {
                    inputName: 'zone01lvtemp',
                    inputLabel: 'Zone 1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02lvtemp',
                    inputLabel: 'Zone 2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03lvtemp',
                    inputLabel: 'Zone 3 Temp',
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
                },
                {
                    inputName: 'blower03run',
                    inputLabel: 'Blower 3 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                }
            ]
        }
    ]
}
