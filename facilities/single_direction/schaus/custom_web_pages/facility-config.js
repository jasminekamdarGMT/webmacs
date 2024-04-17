const temperatureUnit = '°C';

var facilityConfig = {
    verifiedWithVersion: '1.0.54',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    showMap: false,
    dbPath: '',
    layoutType: 'card',
    displayPFRPTime: true,
    zoneProbeIds: ['A','B'],
    IORegList: [
      "blower01run",
      "blower01control",
      "blower01customcycle",
      "blower01offtimer",
      "blower01cycle",
      "blower01cycleofftime",
      "blower01cycleontime",
      "blower01override",
      "blower02run",
      "blower02control",
      "blower02customcycle",
      "blower02offtimer",
      "blower02cycle",
      "blower02cycleofftime",
      "blower02cycleontime",
      "blower02override",
      "blower03run",
      "blower03control",
      "blower03customcycle",
      "blower03offtimer",
      "blower03cycle",
      "blower03cycleofftime",
      "blower03cycleontime",
      "blower03override",
      "blower04run",
      "blower04control",
      "blower04customcycle",
      "blower04offtimer",
      "blower04cycle",
      "blower04cycleofftime",
      "blower04cycleontime",
      "blower04override",
      "damper01control",
      "damper02control",
      "damper03control",
      "damper04control",
      "zone01pAtemp",
      "zone01pBtemp",
      "zone01pAlvtemp",
      "zone01pBlvtemp",
      "zone01pAavgtemp",
      "zone01pBavgtemp",
      "zone01pfrptime",
      "zone01moveto",
      "zone01movedfrom",
      "zone01dampercycle",
      "zone01avgdamper",
      "zone01control",
      "zone01regime",
      "zone01regtimer",
      "zone01reset",
      "zone01print",
      "zone01avgtimer",
      "zone02pAtemp",
      "zone02pBtemp",
      "zone02pAlvtemp",
      "zone02pBlvtemp",
      "zone02pAavgtemp",
      "zone02pBavgtemp",
      "zone02pfrptime",
      "zone02moveto",
      "zone02movedfrom",
      "zone02dampercycle",
      "zone02avgdamper",
      "zone02control",
      "zone02regime",
      "zone02regtimer",
      "zone02reset",
      "zone02print",
      "zone02avgtimer",
      "zone03pAtemp",
      "zone03pBtemp",
      "zone03pAlvtemp",
      "zone03pBlvtemp",
      "zone03pAavgtemp",
      "zone03pBavgtemp",
      "zone03pfrptime",
      "zone03moveto",
      "zone03movedfrom",
      "zone03dampercycle",
      "zone03avgdamper",
      "zone03control",
      "zone03regime",
      "zone03regtimer",
      "zone03reset",
      "zone03print",
      "zone03avgtimer",
      "zone04pAtemp",
      "zone04pBtemp",
      "zone04pAlvtemp",
      "zone04pBlvtemp",
      "zone04pAavgtemp",
      "zone04pBavgtemp",
      "zone04pfrptime",
      "zone04moveto",
      "zone04movedfrom",
      "zone04dampercycle",
      "zone04avgdamper",
      "zone04control",
      "zone04regime",
      "zone04regtimer",
      "zone04reset",
      "zone04print",
      "zone04avgtimer",
      "group01startdelay",
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
                    zoneTempALabel: '1 Top',
                    zoneTempBLabel: '1 Bottom',
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
                    zoneTempALabel: '2 Top',
                    zoneTempBLabel: '2 Bottom',
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
                    zoneTempALabel: '3 Top',
                    zoneTempBLabel: '3 Bottom',
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
                    zoneTempALabel: '4 Top',
                    zoneTempBLabel: '4 Bottom',
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
                },
                {
                    settingName: 'BlowerRate',
                    settingLabel: 'Rate',
                    settingUnit: 'Seconds',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 300,
                    settingHidden: true
                },
                {
                    settingName: 'ManualBlowerDamperCycleTime',
                    settingLabel: 'Manual Blower Damper Cycle Time',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 30
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
                    inputName: 'zone01pAtemp',
                    inputLabel: 'Zone 1 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pBtemp',
                    inputLabel: 'Zone 1 Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAtemp',
                    inputLabel: 'Zone 2 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBtemp',
                    inputLabel: 'Zone 2 Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAtemp',
                    inputLabel: 'Zone 3 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pBtemp',
                    inputLabel: 'Zone 3 Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAtemp',
                    inputLabel: 'Zone 4 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pBtemp',
                    inputLabel: 'Zone 4 Bottom',
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
                }
            ]
        }
    ]
}
