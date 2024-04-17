
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.39',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    showMap: false,
    dbPath: '',
    layoutType: 'card',
    displayPFRPTime: true,
    zoneProbeIds: [''],
    IORegList: [
      "blower01run",
      "blower01control",
      "blower01customcycle",
      "blower01cycle",
      "blower01cycleofftime",
      "blower01cycleontime",
      "blower01override",
      "zone01temp",
      "zone01lvtemp",
      "zone01avgtemp",
      "zone01pfrptime",
      "zone01moveto",
      "zone01movedfrom",
      "zone01control",
      "zone01regime",
      "zone01regtimer",
      "zone01reset",
      "zone01print",
      "zone01avgtimer",
      "blower02run",
      "blower02control",
      "blower02customcycle",
      "blower02cycle",
      "blower02cycleofftime",
      "blower02cycleontime",
      "blower02override",
      "zone02temp",
      "zone02lvtemp",
      "zone02avgtemp",
      "zone02pfrptime",
      "zone02moveto",
      "zone02movedfrom",
      "zone02control",
      "zone02regime",
      "zone02regtimer",
      "zone02reset",
      "zone02print",
      "zone02avgtimer",
      "blower03run",
      "blower03control",
      "blower03customcycle",
      "blower03cycle",
      "blower03cycleofftime",
      "blower03cycleontime",
      "blower03override",
      "zone03temp",
      "zone03lvtemp",
      "zone03avgtemp",
      "zone03pfrptime",
      "zone03moveto",
      "zone03movedfrom",
      "zone03control",
      "zone03regime",
      "zone03regtimer",
      "zone03reset",
      "zone03print",
      "zone03avgtimer",
      "blower04run",
      "blower04control",
      "blower04customcycle",
      "blower04cycle",
      "blower04cycleofftime",
      "blower04cycleontime",
      "blower04override",
      "zone04temp",
      "zone04lvtemp",
      "zone04avgtemp",
      "zone04pfrptime",
      "zone04moveto",
      "zone04movedfrom",
      "zone04control",
      "zone04regime",
      "zone04regtimer",
      "zone04reset",
      "zone04print",
      "zone04avgtimer",
      "blower05run",
      "blower05control",
      "blower05customcycle",
      "blower05cycle",
      "blower05cycleofftime",
      "blower05cycleontime",
      "blower05override",
      "zone05temp",
      "zone05lvtemp",
      "zone05avgtemp",
      "zone05pfrptime",
      "zone05moveto",
      "zone05movedfrom",
      "zone05control",
      "zone05regime",
      "zone05regtimer",
      "zone05reset",
      "zone05print",
      "zone05avgtimer",
      "blower06run",
      "blower06control",
      "blower06customcycle",
      "blower06cycle",
      "blower06cycleofftime",
      "blower06cycleontime",
      "blower06override",
      "zone06temp",
      "zone06lvtemp",
      "zone06avgtemp",
      "zone06pfrptime",
      "zone06moveto",
      "zone06movedfrom",
      "zone06control",
      "zone06regime",
      "zone06regtimer",
      "zone06reset",
      "zone06print",
      "zone06avgtimer",
      "blower07run",
      "blower07control",
      "blower07customcycle",
      "blower07cycle",
      "blower07cycleofftime",
      "blower07cycleontime",
      "blower07override",
      "zone07temp",
      "zone07lvtemp",
      "zone07avgtemp",
      "zone07pfrptime",
      "zone07moveto",
      "zone07movedfrom",
      "zone07control",
      "zone07regime",
      "zone07regtimer",
      "zone07reset",
      "zone07print",
      "zone07avgtimer",
      "zone08temp",
      "zone08lvtemp",
      "zone08avgtemp",
      "zone08pfrptime",
      "zone08moveto",
      "zone08movedfrom",
      "zone08control",
      "zone08regime",
      "zone08regtimer",
      "zone08reset",
      "zone08print",
      "zone08avgtimer",
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
        },
        {
            groupBlower: {
                blowerId: '04',
                blowerLabel: 'Blower 4',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '04',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '05',
                blowerLabel: 'Blower 5',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '05',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '06',
                blowerLabel: 'Blower 6',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '06',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '07',
                blowerLabel: 'Blower 7',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '07',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '08',
                blowerLabel: 'Blower 8',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '08',
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
            groupAdvancedLabel: 'Advanced Settings',
            groupAdvancedSettings: [
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
                },
                {
                    inputName: 'zone04lvtemp',
                    inputLabel: 'Zone 4 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05lvtemp',
                    inputLabel: 'Zone 5 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06lvtemp',
                    inputLabel: 'Zone 6 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07lvtemp',
                    inputLabel: 'Zone 7 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08lvtemp',
                    inputLabel: 'Zone 8 Temp',
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
                },
                {
                    inputName: 'blower04run',
                    inputLabel: 'Blower 4 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower05run',
                    inputLabel: 'Blower 5 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower06run',
                    inputLabel: 'Blower 6 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower07run',
                    inputLabel: 'Blower 7 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower08run',
                    inputLabel: 'Blower 8 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                }
            ]
        }
    ]
}
