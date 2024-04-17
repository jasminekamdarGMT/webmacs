
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.38',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    dbPath: '',
    showMap: false,
    layoutType: 'card',
    displayPFRPTime: true,
    zoneProbeIds: ['A', 'B'],
    IORegList: [
      "blower01run",
      "blower02run",
      "blower03run",
      "blower04run",
      "blower05run",
      "blower06run",
      "blower07run",
      "blower08run",
      "blower09run",
      "blower10run",
      "blower11run",
      "blower01fault",
      "blower02fault",
      "blower03fault",
      "blower04fault",
      "blower05fault",
      "blower06fault",
      "blower07fault",
      "blower08fault",
      "blower09fault",
      "blower10fault",
      "blower11fault",
      "blower01control",
      "blower02control",
      "blower03control",
      "blower04control",
      "blower05control",
      "blower06control",
      "blower07control",
      "blower08control",
      "blower09control",
      "blower10control",
      "blower11control",
      "blower01customcycle",
      "blower02customcycle",
      "blower03customcycle",
      "blower04customcycle",
      "blower05customcycle",
      "blower06customcycle",
      "blower07customcycle",
      "blower08customcycle",
      "blower09customcycle",
      "blower10customcycle",
      "blower11customcycle",
      "blower01cycle",
      "blower02cycle",
      "blower03cycle",
      "blower04cycle",
      "blower05cycle",
      "blower06cycle",
      "blower07cycle",
      "blower08cycle",
      "blower09cycle",
      "blower10cycle",
      "blower11cycle",
      "blower01cycleofftime",
      "blower02cycleofftime",
      "blower03cycleofftime",
      "blower04cycleofftime",
      "blower05cycleofftime",
      "blower06cycleofftime",
      "blower07cycleofftime",
      "blower08cycleofftime",
      "blower09cycleofftime",
      "blower10cycleofftime",
      "blower11cycleofftime",
      "blower01cycleontime",
      "blower02cycleontime",
      "blower03cycleontime",
      "blower04cycleontime",
      "blower05cycleontime",
      "blower06cycleontime",
      "blower07cycleontime",
      "blower08cycleontime",
      "blower09cycleontime",
      "blower10cycleontime",
      "blower11cycleontime",
      "blower01override",
      "blower02override",
      "blower03override",
      "blower04override",
      "blower05override",
      "blower06override",
      "blower07override",
      "blower08override",
      "blower09override",
      "blower10override",
      "blower11override",
      "zone01pAtemp",
      "zone01pBtemp",
      "zone02pAtemp",
      "zone02pBtemp",
      "zone03pAtemp",
      "zone03pBtemp",
      "zone04pAtemp",
      "zone04pBtemp",
      "zone05pAtemp",
      "zone05pBtemp",
      "zone06pAtemp",
      "zone06pBtemp",
      "zone07pAtemp",
      "zone07pBtemp",
      "zone08pAtemp",
      "zone08pBtemp",
      "zone09pAtemp",
      "zone09pBtemp",
      "zone10pAtemp",
      "zone10pBtemp",
      "zone11pAtemp",
      "zone11pBtemp",
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
      "zone09pAlvtemp",
      "zone09pBlvtemp",
      "zone10pAlvtemp",
      "zone10pBlvtemp",
      "zone11pAlvtemp",
      "zone11pBlvtemp",
      "zone01pAtempage",
      "zone01pBtempage",
      "zone02pAtempage",
      "zone02pBtempage",
      "zone03pAtempage",
      "zone03pBtempage",
      "zone04pAtempage",
      "zone04pBtempage",
      "zone05pAtempage",
      "zone05pBtempage",
      "zone06pAtempage",
      "zone06pBtempage",
      "zone07pAtempage",
      "zone07pBtempage",
      "zone08pAtempage",
      "zone08pBtempage",
      "zone09pAtempage",
      "zone09pBtempage",
      "zone10pAtempage",
      "zone10pBtempage",
      "zone11pAtempage",
      "zone11pBtempage",
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
      "zone09pAavgtemp",
      "zone09pBavgtemp",
      "zone10pAavgtemp",
      "zone10pBavgtemp",
      "zone11pAavgtemp",
      "zone11pBavgtemp",
      "zone01moveto",
      "zone02moveto",
      "zone03moveto",
      "zone04moveto",
      "zone05moveto",
      "zone06moveto",
      "zone07moveto",
      "zone08moveto",
      "zone09moveto",
      "zone10moveto",
      "zone11moveto",
      "zone01movedfrom",
      "zone02movedfrom",
      "zone03movedfrom",
      "zone04movedfrom",
      "zone05movedfrom",
      "zone06movedfrom",
      "zone07movedfrom",
      "zone08movedfrom",
      "zone09movedfrom",
      "zone10movedfrom",
      "zone11movedfrom",
      "zone01control",
      "zone02control",
      "zone03control",
      "zone04control",
      "zone05control",
      "zone06control",
      "zone07control",
      "zone08control",
      "zone09control",
      "zone10control",
      "zone11control",
      "zone01regime",
      "zone02regime",
      "zone03regime",
      "zone04regime",
      "zone05regime",
      "zone06regime",
      "zone07regime",
      "zone08regime",
      "zone09regime",
      "zone10regime",
      "zone11regime",
      "zone01regtimer",
      "zone02regtimer",
      "zone03regtimer",
      "zone04regtimer",
      "zone05regtimer",
      "zone06regtimer",
      "zone07regtimer",
      "zone08regtimer",
      "zone09regtimer",
      "zone10regtimer",
      "zone11regtimer",
      "zone01reset",
      "zone02reset",
      "zone03reset",
      "zone04reset",
      "zone05reset",
      "zone06reset",
      "zone07reset",
      "zone08reset",
      "zone09reset",
      "zone10reset",
      "zone11reset",
      "zone01print",
      "zone02print",
      "zone03print",
      "zone04print",
      "zone05print",
      "zone06print",
      "zone07print",
      "zone08print",
      "zone09print",
      "zone10print",
      "zone11print",
      "zone01avgtimer",
      "zone02avgtimer",
      "zone03avgtimer",
      "zone04avgtimer",
      "zone05avgtimer",
      "zone06avgtimer",
      "zone07avgtimer",
      "zone08avgtimer",
      "zone09avgtimer",
      "zone10avgtimer",
      "zone11avgtimer",
      "zone01pfrptime",
      "zone02pfrptime",
      "zone03pfrptime",
      "zone04pfrptime",
      "zone05pfrptime",
      "zone06pfrptime",
      "zone07pfrptime",
      "zone08pfrptime",
      "zone09pfrptime",
      "zone10pfrptime",
      "zone11pfrptime",
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
            ],
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
            ],
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
            ],
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
            ],
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
            ],
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
            ],
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
            ],
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
            ],
        },
        {
            groupBlower: {
                blowerId: '09',
                blowerLabel: 'Blower 9',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '09',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ],
        },
        {
            groupBlower: {
                blowerId: '10',
                blowerLabel: 'Blower 10',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '10',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ],
        },
        {
            groupBlower: {
                blowerId: '11',
                blowerLabel: 'Blower 11',
                hasSpeedControl: false
            },
            groupZones: [
                {
                    zoneId: '11',
                    setpointSettingName: 'RegimeXTempSetPoint',
                    hasDamperControl: false
                }
            ],
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
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone 2 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeBPointID',
                    settingLabel: 'Zone 2 Probe B',
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
                    settingName: 'Zone03ProbeBPointID',
                    settingLabel: 'Zone 3 Probe B',
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
                    settingName: 'Zone04ProbeBPointID',
                    settingLabel: 'Zone 4 Probe B',
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
                    settingName: 'Zone05ProbeBPointID',
                    settingLabel: 'Zone 5 Probe B',
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
                    settingName: 'Zone06ProbeBPointID',
                    settingLabel: 'Zone 6 Probe B',
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
                    settingName: 'Zone07ProbeBPointID',
                    settingLabel: 'Zone 7 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeAPointID',
                    settingLabel: 'Zone 8 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeBPointID',
                    settingLabel: 'Zone 8 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeAPointID',
                    settingLabel: 'Zone 9 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeBPointID',
                    settingLabel: 'Zone 9 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeAPointID',
                    settingLabel: 'Zone 10 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeBPointID',
                    settingLabel: 'Zone 10 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone11ProbeAPointID',
                    settingLabel: 'Zone 11 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone11ProbeBPointID',
                    settingLabel: 'Zone 11 Probe B',
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
                    settingMax: 200
                },
                {
                    settingName: 'MinTemperatureAlarm',
                    settingLabel: 'Low Temperature Alarm',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
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
                },
                {
                    settingName: 'DamperRate',
                    settingLabel: 'Rate',
                    settingUnit: 'Seconds',
                    settingType: 'number',
                    settingMin: 1,
                    settingMax: 300,
                    settingDisabled: true
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
                },
                {
                    inputName: 'zone09pAlvtemp',
                    inputLabel: 'Zone 9 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pBlvtemp',
                    inputLabel: 'Zone 9 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pAlvtemp',
                    inputLabel: 'Zone 10 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pBlvtemp',
                    inputLabel: 'Zone 10 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pAlvtemp',
                    inputLabel: 'Zone 11 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pBlvtemp',
                    inputLabel: 'Zone 11 Probe B',
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
                },
                {
                    inputName: 'blower09run',
                    inputLabel: 'Blower 9 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower10run',
                    inputLabel: 'Blower 10 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower11run',
                    inputLabel: 'Blower 11 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                }
            ]
        }
    ]
}
