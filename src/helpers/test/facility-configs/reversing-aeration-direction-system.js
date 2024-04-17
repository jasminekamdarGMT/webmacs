
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.9',
    temperatureUnit: temperatureUnit,
    layoutType: 'card',
    zoneProbeIds: ['A', 'B'],
    IORegList: [
      "duct01pressure",
      "duct02pressure",
      "duct01pospressure",
      "duct01negpressure",
      "duct02pospressure",
      "duct02negpressure",
      "duct01mister",
      "duct02mister",
      "duct01mistertimer",
      "duct02mistertimer",
      "blower01run",
      "blower02run",
      "blower01fault",
      "blower02fault",
      "blower01speed",
      "blower02speed",
      "blower01control",
      "blower02control",
      "blower01override",
      "blower02override",
      "blower01value",
      "blower02value",
      "blower01revoverride",
      "blower02revoverride",
      "blower01direction",
      "blower02direction",
      "blower01revtimer",
      "blower02revtimer",
      "blower01idletimer",
      "blower02idletimer",
      "premister01temp",
      "premister02temp",
      "premister01lvtemp",
      "premister02lvtemp",
      "exhaust01temp",
      "exhaust02temp",
      "exhaust01lvtemp",
      "exhaust02lvtemp",
      "biofilter01lvtemp",
      "biofilter02lvtemp",
      "damper01position",
      "damper02position",
      "damper03position",
      "damper04position",
      "damper05position",
      "damper06position",
      "damper07position",
      "damper08position",
      "damper01override",
      "damper02override",
      "damper03override",
      "damper04override",
      "damper05override",
      "damper06override",
      "damper07override",
      "damper08override",
      "damper01value",
      "damper02value",
      "damper03value",
      "damper04value",
      "damper05value",
      "damper06value",
      "damper07value",
      "damper08value",
      "zone01pAlvtemp",
      "zone01pBlvtemp",
      "zone02pAlvtemp",
      "zone02pBlvtemp",
      "zone03pAlvtemp",
      "zone03pBlvtemp",
      "zone04pAlvtemp",
      "zone04pBlvtemp",
      "zone05pAlvtemp",
      "zone05pBlvtemp",
      "zone06pAlvtemp",
      "zone06pBlvtemp",
      "zone07pAlvtemp",
      "zone07pBlvtemp",
      "zone08pAlvtemp",
      "zone08pBlvtemp",
      "zone01pAavgtemp",
      "zone01pBavgtemp",
      "zone02pAavgtemp",
      "zone02pBavgtemp",
      "zone03pAavgtemp",
      "zone03pBavgtemp",
      "zone04pAavgtemp",
      "zone04pBavgtemp",
      "zone05pAavgtemp",
      "zone05pBavgtemp",
      "zone06pAavgtemp",
      "zone06pBavgtemp",
      "zone07pAavgtemp",
      "zone07pBavgtemp",
      "zone08pAavgtemp",
      "zone08pBavgtemp",
      "zone01moveto",
      "zone02moveto",
      "zone03moveto",
      "zone04moveto",
      "zone05moveto",
      "zone06moveto",
      "zone07moveto",
      "zone08moveto",
      "zone01control",
      "zone02control",
      "zone03control",
      "zone04control",
      "zone05control",
      "zone06control",
      "zone07control",
      "zone08control",
      "zone01regime",
      "zone02regime",
      "zone03regime",
      "zone04regime",
      "zone05regime",
      "zone06regime",
      "zone07regime",
      "zone08regime",
      "zone01regtimer",
      "zone02regtimer",
      "zone03regtimer",
      "zone04regtimer",
      "zone05regtimer",
      "zone06regtimer",
      "zone07regtimer",
      "zone08regtimer",
      "zone01reset",
      "zone02reset",
      "zone03reset",
      "zone04reset",
      "zone05reset",
      "zone06reset",
      "zone07reset",
      "zone08reset",
      "zone01print",
      "zone02print",
      "zone03print",
      "zone04print",
      "zone05print",
      "zone06print",
      "zone07print",
      "zone08print",
      "zone01avgdamper",
      "zone02avgdamper",
      "zone03avgdamper",
      "zone04avgdamper",
      "zone05avgdamper",
      "zone06avgdamper",
      "zone07avgdamper",
      "zone08avgdamper",
      "zone01avgtimer",
      "zone02avgtimer",
      "zone03avgtimer",
      "zone04avgtimer",
      "zone05avgtimer",
      "zone06avgtimer",
      "zone07avgtimer",
      "zone08avgtimer"
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: '01',
                blowerLabel: 'Blower 1',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasCustomCycleControl: false
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
                blowerLabel: 'Blower 2',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasCustomCycleControl: false
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
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0
    },
    settingsGroups: [
        {
            groupName: 'regime',
            groupLabel: 'Regime Control',
            groupTitle: 'Regime Settings',
            groupSettings: [
                {
                    settingName: 'Regime1TempSetPoint',
                    settingLabel: 'Regime 1 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Regime1Duration',
                    settingLabel: 'Regime 1 Duration',
                    settingUnit: 'Days',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 30
                },
                {
                    settingName: 'Regime2TempSetPoint',
                    settingLabel: 'Regime 2 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Regime2Duration',
                    settingLabel: 'Regime 2 Duration',
                    settingUnit: 'Days',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 30
                },
                {
                    settingName: 'Regime3TempSetPoint',
                    settingLabel: 'Regime 3 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                }
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
                    settingMin: 1,
                    settingMax: 15
                },
                {
                    settingName: 'Mister01TempSetPoint',
                    settingLabel: 'Mister 1 Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister02TempSetPoint',
                    settingLabel: 'Mister 2 Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister01MinOnTime',
                    settingLabel: 'Mister 1 On Timer',
                    settingUnit: "Minutes",
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 15
                },
                {
                    settingName: 'Mister02MinOnTime',
                    settingLabel: 'Mister 2 On Timer',
                    settingUnit: "Minutes",
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 15
                },
                {
                    settingName: 'BiofilterForcePositiveTemperature',
                    settingLabel: 'Biofilter Force Positive Temperature',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'BlowerCyclePositiveTime',
                    settingLabel: 'Blower Cycle Positive Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'BlowerCycleNegativeTime',
                    settingLabel: 'Blower Cycle Negative Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
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
                }
                ,
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
            groupName: 'wireless',
            groupLabel: 'Wireless Probes',
            groupTitle: 'Sensor Point IDs',
            groupInfo: "Formatted as <sensor_id>_<point_number> (example: 0000000040B04AE3_1)",
            groupSettings: [
                {
                    settingName: 'Zone01ProbeAPointID',
                    settingLabel: 'Zone 1 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone01ProbeBPointID',
                    settingLabel: 'Zone 1 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone 2 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone02ProbeBPointID',
                    settingLabel: 'Zone 2 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone03ProbeAPointID',
                    settingLabel: 'Zone 3 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone03ProbeBPointID',
                    settingLabel: 'Zone 3 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone04ProbeAPointID',
                    settingLabel: 'Zone 4 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone04ProbeBPointID',
                    settingLabel: 'Zone 4 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone05ProbeAPointID',
                    settingLabel: 'Zone 5 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone05ProbeBPointID',
                    settingLabel: 'Zone 5 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone06ProbeAPointID',
                    settingLabel: 'Zone 6 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone06ProbeBPointID',
                    settingLabel: 'Zone 6 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone07ProbeAPointID',
                    settingLabel: 'Zone 7 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone07ProbeBPointID',
                    settingLabel: 'Zone 7 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone08ProbeAPointID',
                    settingLabel: 'Zone 8 Probe A',
                    settingType: 'string'
                },
                {
                    settingName: 'Zone08ProbeBPointID',
                    settingLabel: 'Zone 8 Probe B',
                    settingType: 'string'
                },
                {
                    settingName: 'Biofilter01ProbePointID',
                    settingLabel: 'Biofilter 1 Probe',
                    settingType: 'string'
                },
                {
                    settingName: 'Biofilter02ProbePointID',
                    settingLabel: 'Biofilter 2 Probe',
                    settingType: 'string'
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
            groupName: 'Zone1-8Temps',
            groupLabel: 'Zone 1-8 Temps',
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
                    inputName: 'zone02pAlvtemp',
                    inputLabel: 'Zone 2 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBlvtemp',
                    inputLabel: 'Zone 2 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAlvtemp',
                    inputLabel: 'Zone 3 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pBlvtemp',
                    inputLabel: 'Zone 3 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAlvtemp',
                    inputLabel: 'Zone 4 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pBlvtemp',
                    inputLabel: 'Zone 4 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pAlvtemp',
                    inputLabel: 'Zone 5 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pBlvtemp',
                    inputLabel: 'Zone 5 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pAlvtemp',
                    inputLabel: 'Zone 6 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pBlvtemp',
                    inputLabel: 'Zone 6 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pAlvtemp',
                    inputLabel: 'Zone 7 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pBlvtemp',
                    inputLabel: 'Zone 7 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pAlvtemp',
                    inputLabel: 'Zone 8 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pBlvtemp',
                    inputLabel: 'Zone 8 Probe B',
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
                    inputName: 'blower02run',
                    inputLabel: 'Blower 2 Run',
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
                    inputName: 'blower02fault',
                    inputLabel: 'Blower 2 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower01speed',
                    inputLabel: 'Blower 1 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower02speed',
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
                  inputName: 'biofilter01lvtemp',
                  inputLabel: 'Biofilter 1 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilter02lvtemp',
                  inputLabel: 'Biofilter 2 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust01temp',
                  inputLabel: 'Exhaust 1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust02temp',
                  inputLabel: 'Exhaust 2 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'duct01pospressure',
                  inputLabel: 'Duct 1 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct01negpressure',
                  inputLabel: 'Duct 1 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02pospressure',
                  inputLabel: 'Duct 2 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02negpressure',
                  inputLabel: 'Duct 2 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'blower01revdamper',
                  inputLabel: 'Blower 1 Reverse Damper Position'
                },
                {
                  inputName: 'blower02revdamper',
                  inputLabel: 'Blower 2 Reverse Damper Position'
                },
                {
                  inputName: 'duct01mister',
                  inputLabel: 'Duct 1 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'duct02mister',
                  inputLabel: 'Duct 2 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                }
            ]
        }
    ]
}

export default facilityConfig;
