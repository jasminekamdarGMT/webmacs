const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.42',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    showMap: false,
    dbPath: '',
    layoutType: 'card',
    displayPFRPTime: true,
    zoneProbeIds: ['A'],
    IORegList: [
      "blower01run",
      "blower01control",
      "blower01customcycle",
      "blower01cycle",
      "blower01cycleofftime",
      "blower01cycleontime",
      "blower01override",
      "blower02run",
      "blower02control",
      "blower02customcycle",
      "blower02cycle",
      "blower02cycleofftime",
      "blower02cycleontime",
      "blower02override",
      "blower03run",
      "blower03control",
      "blower03customcycle",
      "blower03cycle",
      "blower03cycleofftime",
      "blower03cycleontime",
      "blower03override",
      "blower04run",
      "blower04control",
      "blower04customcycle",
      "blower04cycle",
      "blower04cycleofftime",
      "blower04cycleontime",
      "blower04override",
      "blower05run",
      "blower05control",
      "blower05customcycle",
      "blower05cycle",
      "blower05cycleofftime",
      "blower05cycleontime",
      "blower05override",
      "blower06run",
      "blower06control",
      "blower06customcycle",
      "blower06cycle",
      "blower06cycleofftime",
      "blower06cycleontime",
      "blower06override",
      "blower07run",
      "blower07control",
      "blower07customcycle",
      "blower07cycle",
      "blower07cycleofftime",
      "blower07cycleontime",
      "blower07override",
      "zone01pAtempage",
      "zone01pAlvtemp",
      "zone01pAavgtemp",
      "zone01pfrptime",
      "zone01moveto",
      "zone01control",
      "zone01regime",
      "zone01regtimer",
      "zone01reset",
      "zone01print",
      "zone01avgtimer",
      "zone02pAtempage",
      "zone02pAlvtemp",
      "zone02pAavgtemp",
      "zone02pfrptime",
      "zone02moveto",
      "zone02control",
      "zone02regime",
      "zone02regtimer",
      "zone02reset",
      "zone02print",
      "zone02avgtimer",
      "zone03pAtempage",
      "zone03pAlvtemp",
      "zone03pAavgtemp",
      "zone03pfrptime",
      "zone03moveto",
      "zone03control",
      "zone03regime",
      "zone03regtimer",
      "zone03reset",
      "zone03print",
      "zone03avgtimer",
      "zone04pAtempage",
      "zone04pAlvtemp",
      "zone04pAavgtemp",
      "zone04pfrptime",
      "zone04moveto",
      "zone04control",
      "zone04regime",
      "zone04regtimer",
      "zone04reset",
      "zone04print",
      "zone04avgtimer",
      "zone05pAtempage",
      "zone05pAlvtemp",
      "zone05pAavgtemp",
      "zone05pfrptime",
      "zone05moveto",
      "zone05control",
      "zone05regime",
      "zone05regtimer",
      "zone05reset",
      "zone05print",
      "zone05avgtimer",
      "zone06pAtempage",
      "zone06pAlvtemp",
      "zone06pAavgtemp",
      "zone06pfrptime",
      "zone06moveto",
      "zone06control",
      "zone06regime",
      "zone06regtimer",
      "zone06reset",
      "zone06print",
      "zone06avgtimer",
      "zone07pAtempage",
      "zone07pAlvtemp",
      "zone07pAavgtemp",
      "zone07pfrptime",
      "zone07moveto",
      "zone07control",
      "zone07regime",
      "zone07regtimer",
      "zone07reset",
      "zone07print",
      "zone07avgtimer",
      "refreshsettings",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse",
      "refreshsettings",
      "wirelesscommfailure"
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
                },
                {
                    settingName: 'WirelessSensorAgeAlarm',
                    settingLabel: 'Temperature Sensor Offline Alarm',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 720
                },
                {
                    settingName: 'WirelessBaseStationIP',
                    settingLabel: 'Wireless Base Station IP',
                    settingType: 'string',
                    settingDisabled: true
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
                    settingLabel: 'Zone 1 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone 2 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeAPointID',
                    settingLabel: 'Zone 3 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeAPointID',
                    settingLabel: 'Zone 4 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeAPointID',
                    settingLabel: 'Zone 5 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeAPointID',
                    settingLabel: 'Zone 6 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeAPointID',
                    settingLabel: 'Zone 7 Probe',
                    settingType: 'string',
                    settingDisabled: true
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
                    inputName: 'zone01pAlvtemp',
                    inputLabel: 'Zone 1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAlvtemp',
                    inputLabel: 'Zone 2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAlvtemp',
                    inputLabel: 'Zone 3 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAlvtemp',
                    inputLabel: 'Zone 4 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pAlvtemp',
                    inputLabel: 'Zone 5 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pAlvtemp',
                    inputLabel: 'Zone 6 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pAlvtemp',
                    inputLabel: 'Zone 7 Temp',
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
                }
            ]
        }
    ]
}
