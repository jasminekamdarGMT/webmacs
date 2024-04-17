
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.54',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    showMap: false,
    overrideDisabledSettings: true,
    layoutType: 'card',
    hasLoadZoneFeature: true,
    displayPFRPTime: true,
    zoneProbeIds: ['A'],
    IORegList: [
      "duct01presssptimer",
      "duct01pressure",
      "duct01pressuresp",
      "duct01pressureavg",
      "blower01run",
      "blower01fault",
      "blower01speed",
      "blower01control",
      "blower01cycle",
      "blower01override",
      "blower01value",
      "blower01customcycle",
      "blower01cycleontime",
      "blower01cycleofftime",
      "duct02presssptimer",
      "duct02pressure",
      "duct02pressuresp",
      "duct02pressureavg",
      "blower02run",
      "blower02fault",
      "blower02speed",
      "blower02control",
      "blower02cycle",
      "blower02override",
      "blower02value",
      "blower02customcycle",
      "blower02cycleontime",
      "blower02cycleofftime",
      "damper01position",
      "damper02position",
      "damper03position",
      "damper04position",
      "damper01override",
      "damper02override",
      "damper03override",
      "damper04override",
      "damper01value",
      "damper02value",
      "damper03value",
      "damper04value",
      "zone01pAlvtemp",
      "zone02pAlvtemp",
      "zone03pAlvtemp",
      "zone04pAlvtemp",
      "zone01pAavgtemp",
      "zone02pAavgtemp",
      "zone03pAavgtemp",
      "zone04pAavgtemp",
      "zone01pAtempage",
      "zone02pAtempage",
      "zone03pAtempage",
      "zone04pAtempage",
      "zone01moveto",
      "zone02moveto",
      "zone03moveto",
      "zone04moveto",
      "zone01movedfrom",
      "zone02movedfrom",
      "zone03movedfrom",
      "zone04movedfrom",
      "zone01control",
      "zone02control",
      "zone03control",
      "zone04control",
      "zone01regime",
      "zone02regime",
      "zone03regime",
      "zone04regime",
      "zone01regtimer",
      "zone02regtimer",
      "zone03regtimer",
      "zone04regtimer",
      "zone01reset",
      "zone02reset",
      "zone03reset",
      "zone04reset",
      "zone01print",
      "zone02print",
      "zone03print",
      "zone04print",
      "zone01avgdamper",
      "zone02avgdamper",
      "zone03avgdamper",
      "zone04avgdamper",
      "zone01avgtimer",
      "zone02avgtimer",
      "zone03avgtimer",
      "zone04avgtimer",
      "zone01pfrptime",
      "zone02pfrptime",
      "zone03pfrptime",
      "zone04pfrptime",
      "damper05position",
      "damper06position",
      "damper07position",
      "damper08position",
      "damper05override",
      "damper06override",
      "damper07override",
      "damper08override",
      "damper05value",
      "damper06value",
      "damper07value",
      "damper08value",
      "zone05pAlvtemp",
      "zone06pAlvtemp",
      "zone07pAlvtemp",
      "zone08pAlvtemp",
      "zone05pAavgtemp",
      "zone06pAavgtemp",
      "zone07pAavgtemp",
      "zone08pAavgtemp",
      "zone05pAtempage",
      "zone06pAtempage",
      "zone07pAtempage",
      "zone08pAtempage",
      "zone05moveto",
      "zone06moveto",
      "zone07moveto",
      "zone08moveto",
      "zone05movedfrom",
      "zone06movedfrom",
      "zone07movedfrom",
      "zone08movedfrom",
      "zone05control",
      "zone06control",
      "zone07control",
      "zone08control",
      "zone05regime",
      "zone06regime",
      "zone07regime",
      "zone08regime",
      "zone05regtimer",
      "zone06regtimer",
      "zone07regtimer",
      "zone08regtimer",
      "zone05reset",
      "zone06reset",
      "zone07reset",
      "zone08reset",
      "zone05print",
      "zone06print",
      "zone07print",
      "zone08print",
      "zone05avgdamper",
      "zone06avgdamper",
      "zone07avgdamper",
      "zone08avgdamper",
      "zone05avgtimer",
      "zone06avgtimer",
      "zone07avgtimer",
      "zone08avgtimer",
      "zone05pfrptime",
      "zone06pfrptime",
      "zone07pfrptime",
      "zone08pfrptime",
      "loadzone01active",
      "loadzone02active",
      "loadzone03active",
      "loadzone04active",
      "loadzone05active",
      "loadzone06active",
      "loadzone07active",
      "loadzone08active",
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
                blowerLabel: 'Blower 1'
            },
            groupZones: [
                {
                    zoneId: '01',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '02',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '03',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '04',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower 2'
            },
            groupZones: [
                {
                    zoneId: '05',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '06',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '07',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '08',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
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
                    settingMax: 180
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
                    settingMax: 180
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
                    settingMax: 180
                },
            ]
        },
        {
            groupName: 'blower',
            groupLabel: 'Blower Control',
            groupTitle: 'Blower Settings',
            groupSettings: [
                {
                    settingName: 'MinVFDSpeed',
                    settingLabel: 'Minimum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'MaxVFDSpeed',
                    settingLabel: 'Maximum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
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
                    settingName: 'PressureSetpointMin',
                    settingLabel: 'Blower Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 15
                },
                {
                    settingName: 'PressureSetpointMax',
                    settingLabel: 'Blower Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 15
                },
                {
                    settingName: 'PressureSetpointHotZoneTrigger',
                    settingLabel: 'Blower Pressure Setpoint Hot Zone Trigger',
                    settingUnit: '%',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 0,
                    settingMax: 100
                },
                {
                    settingName: 'PressureSetpointColdZoneTrigger',
                    settingLabel: 'Blower Pressure Setpoint Cold Zone Trigger',
                    settingUnit: '%',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 0,
                    settingMax: 100
                },
                {
                    settingName: 'PressureSetpointChangeTimer',
                    settingLabel: 'Blower Pressure Setpoint Change Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 1,
                    settingMax: 720
                },
                {
                    settingName: 'PressureSetpointChangeInterval',
                    settingLabel: 'Blower Pressure Setpoint Change Interval',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: .1,
                    settingMax: 15
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
            groupName: 'damper',
            groupLabel: 'Damper Control',
            groupTitle: 'Damper Settings',
            groupSettings: [
                {
                    settingName: 'MinDamperValue',
                    settingLabel: 'Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 100
                }
            ],
            groupAdvancedLabel: 'Damper PID Settings',
            groupAdvancedSettings: [
                {
                    settingName: 'DamperGain',
                    settingLabel: 'Gain',
                    settingType: 'number',
                    settingMin: .1,
                    settingMax: 2,
                    settingIncrementStep: .1,
                },
                {
                    settingName: 'DamperIntegral',
                    settingLabel: 'Integral',
                    settingType: 'number',
                    settingMin: .1,
                    settingMax: 2,
                    settingIncrementStep: .1,
                },
                {
                    settingName: 'DamperDerivative',
                    settingLabel: 'Derivative',
                    settingType: 'number',
                    settingMin: .1,
                    settingMax: 2,
                    settingIncrementStep: .1,
                },
                {
                    settingName: 'DamperDerivativeTime',
                    settingLabel: 'Derivative Time',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 10
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
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone 2 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeAPointID',
                    settingLabel: 'Zone 3 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeAPointID',
                    settingLabel: 'Zone 4 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeAPointID',
                    settingLabel: 'Zone 5 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeAPointID',
                    settingLabel: 'Zone 6 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeAPointID',
                    settingLabel: 'Zone 7 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeAPointID',
                    settingLabel: 'Zone 8 Probe A',
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
                    settingMax: 180
                },
                {
                    settingName: 'GraphReferenceTempLabel',
                    settingLabel: 'Reference Temp Label',
                    settingType: 'string',
                    settingRequired: true
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
        }
    ],
    inputMonitorGroups: [
        {
            groupName: 'Zone1-8Temps',
            groupLabel: 'Zone 1-8 Temps',
            groupInputs: [
                {
                    inputName: 'zone01pAlvtemp',
                    inputLabel: 'Zone 1 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAlvtemp',
                    inputLabel: 'Zone 2 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAlvtemp',
                    inputLabel: 'Zone 3 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAlvtemp',
                    inputLabel: 'Zone 4 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pAlvtemp',
                    inputLabel: 'Zone 5 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pAlvtemp',
                    inputLabel: 'Zone 6 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pAlvtemp',
                    inputLabel: 'Zone 7 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pAlvtemp',
                    inputLabel: 'Zone 8 Probe A',
                    inputUnit: temperatureUnit
                }
            ]
        },
        {
            groupName: 'ZoneDampers',
            groupLabel: 'Zone Dampers',
            groupInputs: [
                {
                    inputName: 'damper01position',
                    inputLabel: 'Damper 1 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper02position',
                    inputLabel: 'Damper 2 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper03position',
                    inputLabel: 'Damper 3 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper04position',
                    inputLabel: 'Damper 4 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper05position',
                    inputLabel: 'Damper 5 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper06position',
                    inputLabel: 'Damper 6 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper07position',
                    inputLabel: 'Damper 7 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper08position',
                    inputLabel: 'Damper 8 Position',
                    inputUnit: '%'
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
                    inputName: 'blower01fault',
                    inputLabel: 'Blower 1 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower01value',
                    inputLabel: 'Blower 1 Speed',
                    inputUnit: '%'
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
                    inputName: 'blower02fault',
                    inputLabel: 'Blower 2 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower02value',
                    inputLabel: 'Blower 2 Speed',
                    inputUnit: '%'
                }
            ]
        },
        {
            groupName: 'Manifolds',
            groupLabel: 'Manifolds',
            groupInputs: [
                {
                  inputName: 'duct01pressure',
                  inputLabel: 'Duct 1 Pressure',
                  inputUnit: 'inches'
                },
                {
                    inputName: 'duct02pressure',
                    inputLabel: 'Duct 2 Pressure',
                    inputUnit: 'inches'
                  },
            ]
        }
    ]
}
