
const temperatureUnit = '°C';

var facilityConfig = {
    verifiedWithVersion: '1.0.42',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    layoutType: 'card',
    displayPFRPTime: true,
    hasLoadZoneFeature: true,
    zoneProbeIds: ['A', 'B'],
    IORegList: [
      "blower01run",
      "blower02run",
      "blower03run",
      "blower04run",
      "blower05run",
      "blower06run",
      "blower07run",
      "blower01fault",
      "blower02fault",
      "blower03fault",
      "blower04fault",
      "blower05fault",
      "blower06fault",
      "blower07fault",
      "blower01speed",
      "blower02speed",
      "blower03speed",
      "blower04speed",
      "blower05speed",
      "blower06speed",
      "blower07speed",
      "blower01control",
      "blower02control",
      "blower03control",
      "blower04control",
      "blower05control",
      "blower06control",
      "blower07control",
      "blower01cycle",
      "blower02cycle",
      "blower03cycle",
      "blower04cycle",
      "blower05cycle",
      "blower06cycle",
      "blower07cycle",
      "blower01override",
      "blower02override",
      "blower03override",
      "blower04override",
      "blower05override",
      "blower06override",
      "blower07override",
      "blower01value",
      "blower02value",
      "blower03value",
      "blower04value",
      "blower05value",
      "blower06value",
      "blower07value",
      "blower01customcycle",
      "blower02customcycle",
      "blower03customcycle",
      "blower04customcycle",
      "blower05customcycle",
      "blower06customcycle",
      "blower07customcycle",
      "blower01cycleontime",
      "blower02cycleontime",
      "blower03cycleontime",
      "blower04cycleontime",
      "blower05cycleontime",
      "blower06cycleontime",
      "blower07cycleontime",
      "blower01cycleofftime",
      "blower02cycleofftime",
      "blower03cycleofftime",
      "blower04cycleofftime",
      "blower05cycleofftime",
      "blower06cycleofftime",
      "blower07cycleofftime",
      "damper01position",
      "damper02position",
      "damper03position",
      "damper04position",
      "damper05position",
      "damper06position",
      "damper07position",
      "damper08position",
      "damper09position",
      "damper10position",
      "damper11position",
      "damper12position",
      "damper13position",
      "damper14position",
      "damper01override",
      "damper02override",
      "damper03override",
      "damper04override",
      "damper05override",
      "damper06override",
      "damper07override",
      "damper08override",
      "damper09override",
      "damper10override",
      "damper11override",
      "damper12override",
      "damper13override",
      "damper14override",
      "damper01value",
      "damper02value",
      "damper03value",
      "damper04value",
      "damper05value",
      "damper06value",
      "damper07value",
      "damper08value",
      "damper09value",
      "damper10value",
      "damper11value",
      "damper12value",
      "damper13value",
      "damper14value",
      "loadzone01active",
      "loadzone02active",
      "loadzone03active",
      "loadzone04active",
      "loadzone05active",
      "loadzone06active",
      "loadzone07active",
      "loadzone08active",
      "loadzone09active",
      "loadzone10active",
      "loadzone11active",
      "loadzone12active",
      "loadzone13active",
      "loadzone14active",
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
      "zone12pAtemp",
      "zone12pBtemp",
      "zone13pAtemp",
      "zone13pBtemp",
      "zone14pAtemp",
      "zone14pBtemp",
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
      "zone12pAlvtemp",
      "zone12pBlvtemp",
      "zone13pAlvtemp",
      "zone13pBlvtemp",
      "zone14pAlvtemp",
      "zone14pBlvtemp",
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
      "zone12pAavgtemp",
      "zone12pBavgtemp",
      "zone13pAavgtemp",
      "zone13pBavgtemp",
      "zone14pAavgtemp",
      "zone14pBavgtemp",
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
      "zone12pAtempage",
      "zone12pBtempage",
      "zone13pAtempage",
      "zone13pBtempage",
      "zone14pAtempage",
      "zone14pBtempage",
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
      "zone12control",
      "zone13control",
      "zone14control",
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
      "zone12reset",
      "zone13reset",
      "zone14reset",
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
      "zone12print",
      "zone13print",
      "zone14print",
      "zone01avgdamper",
      "zone02avgdamper",
      "zone03avgdamper",
      "zone04avgdamper",
      "zone05avgdamper",
      "zone06avgdamper",
      "zone07avgdamper",
      "zone08avgdamper",
      "zone09avgdamper",
      "zone10avgdamper",
      "zone11avgdamper",
      "zone12avgdamper",
      "zone13avgdamper",
      "zone14avgdamper",
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
      "zone12avgtimer",
      "zone13avgtimer",
      "zone14avgtimer",
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
      "zone12pfrptime",
      "zone13pfrptime",
      "zone14pfrptime",
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
      "zone12moveto",
      "zone13moveto",
      "zone14moveto",
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
      "zone12movedfrom",
      "zone13movedfrom",
      "zone14movedfrom",
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
                blowerLabel: 'Blower 1/2',
                tempSetpointSettingName: 'Blower01TempSetPoint'
            },
            groupZones: [
                {
                    zoneId: '01',
                    zoneLabel: '1',
                    setpointSettingName: 'Blower01TempSetPoint'
                },
                {
                    zoneId: '02',
                    zoneLabel: '2',
                    setpointSettingName: 'Blower01TempSetPoint'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower 3/4',
                tempSetpointSettingName: 'Blower02TempSetPoint'
            },
            groupZones: [
                {
                    zoneId: '03',
                    zoneLabel: '3',
                    setpointSettingName: 'Blower02TempSetPoint'
                },
                {
                    zoneId: '04',
                    zoneLabel: '4',
                    setpointSettingName: 'Blower02TempSetPoint'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '03',
                blowerLabel: 'Blower 5/6',
                tempSetpointSettingName: 'Blower03TempSetPoint'
            },
            groupZones: [
                {
                    zoneId: '05',
                    zoneLabel: '5',
                    setpointSettingName: 'Blower03TempSetPoint'
                },
                {
                    zoneId: '06',
                    zoneLabel: '6',
                    setpointSettingName: 'Blower03TempSetPoint'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '04',
                blowerLabel: 'Blower 7/8',
                tempSetpointSettingName: 'Blower04TempSetPoint'
            },
            groupZones: [
                {
                    zoneId: '07',
                    zoneLabel: '7',
                    setpointSettingName: 'Blower04TempSetPoint'
                },
                {
                    zoneId: '08',
                    zoneLabel: '8',
                    setpointSettingName: 'Blower04TempSetPoint'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '05',
                blowerLabel: 'Blower 9/10',
                tempSetpointSettingName: 'Blower05TempSetPoint'
            },
            groupZones: [
                {
                    zoneId: '09',
                    zoneLabel: '9',
                    setpointSettingName: 'Blower05TempSetPoint'
                },
                {
                    zoneId: '10',
                    zoneLabel: '10',
                    setpointSettingName: 'Blower05TempSetPoint'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '06',
                blowerLabel: 'Blower 11/12',
                tempSetpointSettingName: 'Blower06TempSetPoint'
            },
            groupZones: [
                {
                    zoneId: '11',
                    zoneLabel: '11',
                    setpointSettingName: 'Blower06TempSetPoint'
                },
                {
                    zoneId: '12',
                    zoneLabel: '12',
                    setpointSettingName: 'Blower06TempSetPoint'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '07',
                blowerLabel: 'Blower 13/14',
                tempSetpointSettingName: 'Blower07TempSetPoint'
            },
            groupZones: [
                {
                    zoneId: '13',
                    zoneLabel: '13',
                    setpointSettingName: 'Blower07TempSetPoint'
                },
                {
                    zoneId: '14',
                    zoneLabel: '14',
                    setpointSettingName: 'Blower07TempSetPoint'
                }
            ]
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0,
        dataExclusionList: [
          'PFRP Time'
        ],
        displayReferenceTempOnGraph: true,
        referenceTempColor: "orange",
        pfrpSectionColor: "orange"
    },
    settingsGroups: [
        {
            groupName: 'zone',
            groupLabel: 'Zone Control',
            groupTitle: 'Zone Settings',
            groupSettings: [
                {
                    settingName: 'Blower01TempSetPoint',
                    settingLabel: 'Zones 1 & 2 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 80
                },
                {
                    settingName: 'Blower02TempSetPoint',
                    settingLabel: 'Zones 3 & 4 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 80
                },
                {
                    settingName: 'Blower03TempSetPoint',
                    settingLabel: 'Zones 5 & 6 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 80
                },
                {
                    settingName: 'Blower04TempSetPoint',
                    settingLabel: 'Zones 7 & 8 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 80
                },
                {
                    settingName: 'Blower05TempSetPoint',
                    settingLabel: 'Zones 9 & 10 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 80
                },
                {
                    settingName: 'Blower06TempSetPoint',
                    settingLabel: 'Zones 11 & 12 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 80
                },
                {
                    settingName: 'Blower07TempSetPoint',
                    settingLabel: 'Zones 13 & 14 - Compost Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 80
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
                }
            ],
            groupAdvancedLabel: 'Blower PID Settings',
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
            groupName: 'damper',
            groupLabel: 'Damper Control',
            groupTitle: 'Damper Settings',
            groupSettings: [
                {
                    settingName: 'MinDamperValue',
                    settingLabel: 'Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
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
            groupName: 'Zone1-7Temps',
            groupLabel: 'Zone 1-7 Temps',
            groupInputs: [
                {
                    inputName: 'zone01pAtemp',
                    inputLabel: 'Zone 1 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pBtemp',
                    inputLabel: 'Zone 1 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAtemp',
                    inputLabel: 'Zone 2 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBtemp',
                    inputLabel: 'Zone 2 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAtemp',
                    inputLabel: 'Zone 3 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pBtemp',
                    inputLabel: 'Zone 3 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAtemp',
                    inputLabel: 'Zone 4 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pBtemp',
                    inputLabel: 'Zone 4 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pAtemp',
                    inputLabel: 'Zone 5 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pBtemp',
                    inputLabel: 'Zone 5 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pAtemp',
                    inputLabel: 'Zone 6 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pBtemp',
                    inputLabel: 'Zone 6 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pAtemp',
                    inputLabel: 'Zone 7 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pBtemp',
                    inputLabel: 'Zone 7 Probe B',
                    inputUnit: temperatureUnit
                }
            ]
        },
        {
            groupName: 'Zone8-14Temps',
            groupLabel: 'Zone 8-14 Temps',
            groupInputs: [
                {
                    inputName: 'zone08pAtemp',
                    inputLabel: 'Zone 8 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pBtemp',
                    inputLabel: 'Zone 8 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pAtemp',
                    inputLabel: 'Zone 9 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pBtemp',
                    inputLabel: 'Zone 9 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pAtemp',
                    inputLabel: 'Zone 10 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pBtemp',
                    inputLabel: 'Zone 10 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pAtemp',
                    inputLabel: 'Zone 11 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pBtemp',
                    inputLabel: 'Zone 11 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone12pAtemp',
                    inputLabel: 'Zone 12 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone12pBtemp',
                    inputLabel: 'Zone 12 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pAtemp',
                    inputLabel: 'Zone 13 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pBtemp',
                    inputLabel: 'Zone 13 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pAtemp',
                    inputLabel: 'Zone 14 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pBtemp',
                    inputLabel: 'Zone 14 Probe B',
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
                },
                {
                    inputName: 'damper09position',
                    inputLabel: 'Damper 9 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper10position',
                    inputLabel: 'Damper 10 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper11position',
                    inputLabel: 'Damper 11 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper12position',
                    inputLabel: 'Damper 12 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper13position',
                    inputLabel: 'Damper 13 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper14position',
                    inputLabel: 'Damper 14 Position',
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
                    inputName: 'blower03fault',
                    inputLabel: 'Blower 3 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower04fault',
                    inputLabel: 'Blower 4 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower05fault',
                    inputLabel: 'Blower 5 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower06fault',
                    inputLabel: 'Blower 6 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower07fault',
                    inputLabel: 'Blower 7 Fault',
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
                    inputName: 'blower02value',
                    inputLabel: 'Blower 2 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower03value',
                    inputLabel: 'Blower 3 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower04value',
                    inputLabel: 'Blower 4 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower05value',
                    inputLabel: 'Blower 5 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower06value',
                    inputLabel: 'Blower 6 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower07value',
                    inputLabel: 'Blower 7 Speed',
                    inputUnit: '%'
                }
            ]
        }
    ]
}
