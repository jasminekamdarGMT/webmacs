const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.53',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    showMap: false,
    dbPath: '',
    layoutType: 'card',
    displayPFRPTime: true,
    hasLoadZoneFeature: true,
    zoneProbeIds: [''],
    IORegList: [
      "blower01run",
      "blower02run",
      "blower03run",
      "blower04run",
      "blower05run",
      "blower06run",
      "blower01control",
      "blower02control",
      "blower03control",
      "blower04control",
      "blower05control",
      "blower06control",
      "blower01customcycle",
      "blower02customcycle",
      "blower03customcycle",
      "blower04customcycle",
      "blower05customcycle",
      "blower06customcycle",
      "blower01cycle",
      "blower02cycle",
      "blower03cycle",
      "blower04cycle",
      "blower05cycle",
      "blower06cycle",
      "blower01cycleofftime",
      "blower02cycleofftime",
      "blower03cycleofftime",
      "blower04cycleofftime",
      "blower05cycleofftime",
      "blower06cycleofftime",
      "blower01cycleontime",
      "blower02cycleontime",
      "blower03cycleontime",
      "blower04cycleontime",
      "blower05cycleontime",
      "blower06cycleontime",
      "blower01override",
      "blower02override",
      "blower03override",
      "blower04override",
      "blower05override",
      "blower06override",
      "zone01lvtemp",
      "zone02lvtemp",
      "zone03lvtemp",
      "zone04lvtemp",
      "zone05lvtemp",
      "zone06lvtemp",
      "zone01temp",
      "zone02temp",
      "zone03temp",
      "zone04temp",
      "zone05temp",
      "zone06temp",
      "zone01avgtemp",
      "zone02avgtemp",
      "zone03avgtemp",
      "zone04avgtemp",
      "zone05avgtemp",
      "zone06avgtemp",
      "zone01pfrptime",
      "zone02pfrptime",
      "zone03pfrptime",
      "zone04pfrptime",
      "zone05pfrptime",
      "zone06pfrptime",
      "zone01moveto",
      "zone02moveto",
      "zone03moveto",
      "zone04moveto",
      "zone05moveto",
      "zone06moveto",
      "zone01movedfrom",
      "zone02movedfrom",
      "zone03movedfrom",
      "zone04movedfrom",
      "zone05movedfrom",
      "zone06movedfrom",
      "zone01control",
      "zone02control",
      "zone03control",
      "zone04control",
      "zone05control",
      "zone06control",
      "zone01regime",
      "zone02regime",
      "zone03regime",
      "zone04regime",
      "zone05regime",
      "zone06regime",
      "zone01regtimer",
      "zone02regtimer",
      "zone03regtimer",
      "zone04regtimer",
      "zone05regtimer",
      "zone06regtimer",
      "zone01reset",
      "zone02reset",
      "zone03reset",
      "zone04reset",
      "zone05reset",
      "zone06reset",
      "zone01avgtimer",
      "zone02avgtimer",
      "zone03avgtimer",
      "zone04avgtimer",
      "zone05avgtimer",
      "zone06avgtimer",
      "zone01print",
      "zone02print",
      "zone03print",
      "zone04print",
      "zone05print",
      "zone06print",
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
                    setpointSettingName: 'Regime1TempSetPoint',
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
                    setpointSettingName: 'Regime2TempSetPoint',
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
                    setpointSettingName: 'Regime3TempSetPoint',
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
                    setpointSettingName: 'Regime4TempSetPoint',
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
                    setpointSettingName: 'Regime5TempSetPoint',
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
                    setpointSettingName: 'Regime6TempSetPoint',
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
                },
                {
                    settingName: 'BlowerRate',
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
                    inputName: 'zone01temp',
                    inputLabel: 'Zone 1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02temp',
                    inputLabel: 'Zone 2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03temp',
                    inputLabel: 'Zone 3 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04temp',
                    inputLabel: 'Zone 4 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05temp',
                    inputLabel: 'Zone 5 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06temp',
                    inputLabel: 'Zone 6 Temp',
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
                }
            ]
        }
    ]
}
