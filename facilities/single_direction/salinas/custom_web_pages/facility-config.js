const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.54',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    showMap: false,
    layoutType: 'card',
    hasLoadZoneFeature: true,
    displayPFRPTime: true,
    zoneProbeIds: ['A', 'B'],
    IORegList: [
        "duct01presssptimer",
        "duct02presssptimer",
        "duct03presssptimer",
        "duct04presssptimer",
        "duct01pressure",
        "duct02pressure",
        "duct03pressure",
        "duct04pressure",
        "duct01pressuresp",
        "duct02pressuresp",
        "duct03pressuresp",
        "duct04pressuresp",
        "duct01pressureavg",
        "duct02pressureavg",
        "duct03pressureavg",
        "duct04pressureavg",
        "blower01run",
        "blower02run",
        "blower03run",
        "blower04run",
        "blower01fault",
        "blower02fault",
        "blower03fault",
        "blower04fault",
        "blower01speed",
        "blower02speed",
        "blower03speed",
        "blower04speed",
        "blower01control",
        "blower02control",
        "blower03control",
        "blower04control",
        "blower01cycle",
        "blower02cycle",
        "blower03cycle",
        "blower04cycle",
        "blower01override",
        "blower02override",
        "blower03override",
        "blower04override",
        "blower01value",
        "blower02value",
        "blower03value",
        "blower04value",
        "blower01customcycle",
        "blower02customcycle",
        "blower03customcycle",
        "blower04customcycle",
        "blower01cycleontime",
        "blower02cycleontime",
        "blower03cycleontime",
        "blower04cycleontime",
        "blower01cycleofftime",
        "blower02cycleofftime",
        "blower03cycleofftime",
        "blower04cycleofftime",
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
        "zone12regime",
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
        "zone12regtimer",
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
        "batchfilesinuse",
        "blowerstartupinuse",
        "settingsinuse",
        "zonestartupinuse",
        "refreshsettings",
        "wirelesscommfailure"
    ],
    zoneGroups: [{
        groupBlower: {
            blowerId: '01',
            blowerLabel: 'Blower 1 - Zones A-C'
        },
        groupZones: [{
            zoneId: '01',
            zoneLabel: 'A',
            zoneTempALabel: 'A1',
            zoneTempBLabel: 'A2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '02',
            zoneLabel: 'B',
            zoneTempALabel: 'B1',
            zoneTempBLabel: 'B2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '03',
            zoneLabel: 'C',
            zoneTempALabel: 'C1',
            zoneTempBLabel: 'C2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }]
    }, {
        groupBlower: {
            blowerId: '02',
            blowerLabel: 'Blower 2 - Zones D-F'
        },
        groupZones: [{
            zoneId: '04',
            zoneLabel: 'D',
            zoneTempALabel: 'D1',
            zoneTempBLabel: 'D2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '05',
            zoneLabel: 'E',
            zoneTempALabel: 'E1',
            zoneTempBLabel: 'E2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '06',
            zoneLabel: 'F',
            zoneTempALabel: 'F1',
            zoneTempBLabel: 'F2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }]
    }, {
        groupBlower: {
            blowerId: '03',
            blowerLabel: 'Blower 3 - Zones G-I',
            tempSetpointSettingName: 'Blower03TempSetPoint'
        },
        groupZones: [{
            zoneId: '07',
            zoneLabel: 'G',
            zoneTempALabel: 'G1',
            zoneTempBLabel: 'G2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '08',
            zoneLabel: 'H',
            zoneTempALabel: 'H1',
            zoneTempBLabel: 'H2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '09',
            zoneLabel: 'I',
            zoneTempALabel: 'I1',
            zoneTempBLabel: 'I2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }]
    }, {
        groupBlower: {
            blowerId: '04',
            blowerLabel: 'Blower 4 - Zones J-L',
            tempSetpointSettingName: 'Blower04TempSetPoint'
        },
        groupZones: [{
            zoneId: '10',
            zoneLabel: 'J',
            zoneTempALabel: 'J1',
            zoneTempBLabel: 'J2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '11',
            zoneLabel: 'K',
            zoneTempALabel: 'K1',
            zoneTempBLabel: 'K2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }, {
            zoneId: '12',
            zoneLabel: 'L',
            zoneTempALabel: 'L1',
            zoneTempBLabel: 'L2',
            setpointSettingName: 'RegimeXTempSetPoint',
        }]
    }],
    graphConfig: {
        largeDatasetMinSize: 0,
        displayReferenceTempOnGraph: true,
        referenceTempColor: "orange"
    },
    settingsGroups: [{
        groupName: 'regime',
        groupLabel: 'Regime Control',
        groupTitle: 'Regime Settings',
        groupSettings: [{
            settingName: 'Regime1TempSetPoint',
            settingLabel: 'Warm Up Regime Temp Set Point',
            settingUnit: temperatureUnit,
            settingType: 'number',
            settingMin: 0,
            settingMax: 180
        }, {
            settingName: 'Regime1ReferenceTemp',
            settingLabel: 'Warm Up Regime Reference Temp',
            settingType: 'radio',
            settingOptions: [{
                label: 'Lowest',
                value: 'Lowest'
            }, {
                label: 'Highest',
                value: 'Highest'
            }, {
                label: 'Average',
                value: 'Average'
            }]
        }, {
            settingName: 'Regime1Duration',
            settingLabel: 'Warm Up Regime Duration',
            settingUnit: 'Days',
            settingType: 'number',
            settingMin: 0,
            settingMax: 30
        }, {
            settingName: 'Regime2TempSetPoint',
            settingLabel: 'PFRP Regime Temp Set Point',
            settingUnit: temperatureUnit,
            settingType: 'number',
            settingMin: 0,
            settingMax: 180
        }, {
            settingName: 'Regime2ReferenceTemp',
            settingLabel: 'PFRP Regime Reference Temp',
            settingType: 'radio',
            settingOptions: [{
                label: 'Lowest',
                value: 'Lowest'
            }, {
                label: 'Highest',
                value: 'Highest'
            }, {
                label: 'Average',
                value: 'Average'
            }]
        }, {
            settingName: 'Regime2Duration',
            settingLabel: 'PFRP Regime Duration',
            settingUnit: 'Days',
            settingType: 'number',
            settingMin: 0,
            settingMax: 30
        }, {
            settingName: 'Regime3TempSetPoint',
            settingLabel: 'VAR Regime Temp Set Point',
            settingUnit: temperatureUnit,
            settingType: 'number',
            settingMin: 0,
            settingMax: 180
        }, {
            settingName: 'Regime3ReferenceTemp',
            settingLabel: 'VAR Regime Reference Temp',
            settingType: 'radio',
            settingOptions: [{
                label: 'Lowest',
                value: 'Lowest'
            }, {
                label: 'Highest',
                value: 'Highest'
            }, {
                label: 'Average',
                value: 'Average'
            }]
        }, ]
    }, {
        groupName: 'blower',
        groupLabel: 'Blower Control',
        groupTitle: 'Blower Settings',
        groupSettings: [{
            settingName: 'MinVFDSpeed',
            settingLabel: 'Minimum VFD Speed',
            settingUnit: '%',
            settingType: 'number',
            settingMin: 20,
            settingMax: 100
        }, {
            settingName: 'MaxVFDSpeed',
            settingLabel: 'Maximum VFD Speed',
            settingUnit: '%',
            settingType: 'number',
            settingMin: 20,
            settingMax: 100
        }, {
            settingName: 'BlowerCycleOnTime',
            settingLabel: 'Blower On Time (each cycle)',
            settingUnit: 'Minutes',
            settingType: 'number',
            settingMin: 0,
            settingMax: 120
        }, {
            settingName: 'BlowerCycleOffTime',
            settingLabel: 'Blower Off Time (each cycle)',
            settingUnit: 'Minutes',
            settingType: 'number',
            settingMin: 0,
            settingMax: 120
        }, {
            settingName: 'PressureSetpointMin',
            settingLabel: 'Blower Pressure Setpoint Min',
            settingUnit: 'Inches',
            settingType: 'number',
            settingIncrementStep: .1,
            settingMin: 1,
            settingMax: 15
        }, {
            settingName: 'PressureSetpointMax',
            settingLabel: 'Blower Pressure Setpoint Max',
            settingUnit: 'Inches',
            settingType: 'number',
            settingIncrementStep: .1,
            settingMin: 1,
            settingMax: 15
        }, {
            settingName: 'PressureSetpointHotZoneTrigger',
            settingLabel: 'Blower Pressure Setpoint Hot Zone Trigger',
            settingUnit: '%',
            settingType: 'number',
            settingIncrementStep: .1,
            settingMin: 0,
            settingMax: 100
        }, {
            settingName: 'PressureSetpointColdZoneTrigger',
            settingLabel: 'Blower Pressure Setpoint Cold Zone Trigger',
            settingUnit: '%',
            settingType: 'number',
            settingIncrementStep: .1,
            settingMin: 0,
            settingMax: 100
        }, {
            settingName: 'PressureSetpointChangeTimer',
            settingLabel: 'Blower Pressure Setpoint Change Timer',
            settingUnit: 'Minutes',
            settingType: 'number',
            settingIncrementStep: 1,
            settingMin: 1,
            settingMax: 720
        }, {
            settingName: 'PressureSetpointChangeInterval',
            settingLabel: 'Blower Pressure Setpoint Change Interval',
            settingUnit: 'Inches',
            settingType: 'number',
            settingIncrementStep: .1,
            settingMin: .1,
            settingMax: 15
        }],
        groupAdvancedLabel: 'Blower PID Settings',
        groupAdvancedSettings: [{
            settingName: 'BlowerGain',
            settingLabel: 'Gain',
            settingType: 'number',
            settingMin: .1,
            settingMax: 2,
            settingIncrementStep: .1,
        }, {
            settingName: 'BlowerIntegral',
            settingLabel: 'Integral',
            settingType: 'number',
            settingMin: .1,
            settingMax: 2,
            settingIncrementStep: .1,
        }, {
            settingName: 'BlowerDerivative',
            settingLabel: 'Derivative',
            settingType: 'number',
            settingMin: .1,
            settingMax: 2,
            settingIncrementStep: .1,
        }, {
            settingName: 'BlowerDerivativeTime',
            settingLabel: 'Derivative Time',
            settingType: 'number',
            settingMin: 1,
            settingMax: 10
        }, {
            settingName: 'BlowerRate',
            settingLabel: 'Rate',
            settingUnit: 'Seconds',
            settingType: 'number',
            settingMin: 1,
            settingMax: 300
        }]
    }, {
        groupName: 'damper',
        groupLabel: 'Damper Control',
        groupTitle: 'Damper Settings',
        groupSettings: [{
            settingName: 'MinDamperValue',
            settingLabel: 'Minimum Damper Value',
            settingUnit: '%',
            settingType: 'number',
            settingMin: 5,
            settingMax: 100
        }],
        groupAdvancedLabel: 'Damper PID Settings',
        groupAdvancedSettings: [{
            settingName: 'DamperGain',
            settingLabel: 'Gain',
            settingType: 'number',
            settingMin: .1,
            settingMax: 2,
            settingIncrementStep: .1,
        }, {
            settingName: 'DamperIntegral',
            settingLabel: 'Integral',
            settingType: 'number',
            settingMin: .1,
            settingMax: 2,
            settingIncrementStep: .1,
        }, {
            settingName: 'DamperDerivative',
            settingLabel: 'Derivative',
            settingType: 'number',
            settingMin: .1,
            settingMax: 2,
            settingIncrementStep: .1,
        }, {
            settingName: 'DamperDerivativeTime',
            settingLabel: 'Derivative Time',
            settingType: 'number',
            settingMin: 1,
            settingMax: 10
        }, {
            settingName: 'DamperRate',
            settingLabel: 'Rate',
            settingUnit: 'Seconds',
            settingType: 'number',
            settingMin: 1,
            settingMax: 300
        }]
    }, {
        groupName: 'wireless',
        groupLabel: 'Wireless Probes',
        groupTitle: 'Sensor Point IDs',
        groupInfo: "Formatted as <sensor_id>_<point_number> (example: 0000000040B04AE3_1)",
        groupSettings: [{
            settingName: 'Zone01ProbeAPointID',
            settingLabel: 'Zone A Probe 1',
            settingType: 'string',
            settingDisabled: false
				}, {
            settingName: 'Zone01ProbeBPointID',
            settingLabel: 'Zone A Probe 2',
            settingType: 'string',
            settingDisabled: false
				}, {
            settingName: 'Zone02ProbeAPointID',
            settingLabel: 'Zone B Probe 1',
            settingType: 'string',
            settingDisabled: false
				}, {
            settingName: 'Zone02ProbeBPointID',
            settingLabel: 'Zone B Probe 2',
            settingType: 'string',
            settingDisabled: false
				}, {
            settingName: 'Zone03ProbeAPointID',
            settingLabel: 'Zone C Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone03ProbeBPointID',
            settingLabel: 'Zone C Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone04ProbeAPointID',
            settingLabel: 'Zone D Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone04ProbeBPointID',
            settingLabel: 'Zone D Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone05ProbeAPointID',
            settingLabel: 'Zone E Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone05ProbeBPointID',
            settingLabel: 'Zone E Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone06ProbeAPointID',
            settingLabel: 'Zone F Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone06ProbeBPointID',
            settingLabel: 'Zone F Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone07ProbeAPointID',
            settingLabel: 'Zone G Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone07ProbeBPointID',
            settingLabel: 'Zone G Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone08ProbeAPointID',
            settingLabel: 'Zone H Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone08ProbeBPointID',
            settingLabel: 'Zone H Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone09ProbeAPointID',
            settingLabel: 'Zone I Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone09ProbeBPointID',
            settingLabel: 'Zone I Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone10ProbeAPointID',
            settingLabel: 'Zone J Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone10ProbeBPointID',
            settingLabel: 'Zone J Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone11ProbeAPointID',
            settingLabel: 'Zone K Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone11ProbeBPointID',
            settingLabel: 'Zone K Probe 2',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone12ProbeAPointID',
            settingLabel: 'Zone L Probe 1',
            settingType: 'string',
            settingDisabled: false
        }, {
            settingName: 'Zone12ProbeBPointID',
            settingLabel: 'Zone L Probe 2',
            settingType: 'string',
            settingDisabled: false
        }]
    }, {
        groupName: 'graph',
        groupLabel: 'Graph Settings',
        groupTitle: 'Graph Settings',
        groupSettings: [{
            settingName: 'GraphReferenceTemp',
            settingLabel: 'Reference Temp',
            settingUnit: temperatureUnit,
            settingType: 'number',
            settingMin: 0,
            settingMax: 180
        }, {
            settingName: 'GraphReferenceTempLabel',
            settingLabel: 'Reference Temp Label',
            settingType: 'string',
            settingRequired: true
        }]
    }, {
        groupName: 'admin',
        groupLabel: 'Administration',
        groupTitle: 'Administration Settings',
        groupSettings: [{
            settingName: 'FacilityName',
            settingLabel: 'Facility Name',
            settingType: 'string'
        }, {
            settingName: 'Username',
            settingLabel: 'Username *',
            settingType: 'string',
            settingDisabled: true
        }, {
            settingName: 'Email',
            settingLabel: 'Email/SMS Address *',
            settingType: 'string',
            settingDisabled: true
        }, {
            settingName: 'TemperatureUnits',
            settingLabel: 'Temperature Units *',
            settingType: 'string',
            settingDisabled: true
        }, {
            settingName: 'MaxTemperatureAlarm',
            settingLabel: 'High Temperature Alarm',
            settingUnit: temperatureUnit,
            settingType: 'number',
            settingMin: 0,
            settingMax: 180
        }, {
            settingName: 'MinTemperatureAlarm',
            settingLabel: 'Low Temperature Alarm',
            settingUnit: temperatureUnit,
            settingType: 'number',
            settingMin: 0,
            settingMax: 180
        }, {
            settingName: 'DataLoggingRate',
            settingLabel: 'Data Logging Rate',
            settingUnit: 'Minutes',
            settingType: 'number',
            settingMin: 0,
            settingMax: 720
        }, {
            settingName: 'WirelessSensorAgeAlarm',
            settingLabel: 'Temperature Sensor Offline Alarm',
            settingUnit: 'Minutes',
            settingType: 'number',
            settingMin: 5,
            settingMax: 720
        }, {
            settingName: 'WirelessBaseStationIP',
            settingLabel: 'Wireless Base Station IP',
            settingType: 'string',
            settingDisabled: true
        }]
    }],
    inputMonitorGroups: [{
        groupName: 'ZoneA-LTemps',
        groupLabel: 'Zone A-L Temps',
        groupInputs: [{
            inputName: 'zone01pAlvtemp',
            inputLabel: 'Zone A Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone01pBlvtemp',
            inputLabel: 'Zone A Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone02pAlvtemp',
            inputLabel: 'Zone B Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone02pBlvtemp',
            inputLabel: 'Zone B Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone03pAlvtemp',
            inputLabel: 'Zone C Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone03pBlvtemp',
            inputLabel: 'Zone C Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone04pAlvtemp',
            inputLabel: 'Zone D Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone04pBlvtemp',
            inputLabel: 'Zone D Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone05pAlvtemp',
            inputLabel: 'Zone E Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone05pBlvtemp',
            inputLabel: 'Zone E Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone06pAlvtemp',
            inputLabel: 'Zone F Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone06pBlvtemp',
            inputLabel: 'Zone F Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone07pAlvtemp',
            inputLabel: 'Zone G Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone07pBlvtemp',
            inputLabel: 'Zone G Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone08pAlvtemp',
            inputLabel: 'Zone H Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone08pBlvtemp',
            inputLabel: 'Zone H Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone09pAlvtemp',
            inputLabel: 'Zone I Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone09pBlvtemp',
            inputLabel: 'Zone I Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone10pAlvtemp',
            inputLabel: 'Zone J Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone10pBlvtemp',
            inputLabel: 'Zone J Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone11pAlvtemp',
            inputLabel: 'Zone K Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone11pBlvtemp',
            inputLabel: 'Zone K Probe 2',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone12pAlvtemp',
            inputLabel: 'Zone L Probe 1',
            inputUnit: temperatureUnit
        }, {
            inputName: 'zone12pBlvtemp',
            inputLabel: 'Zone L Probe 2',
            inputUnit: temperatureUnit
        }]
    }, {
        groupName: 'ZoneDampers',
        groupLabel: 'Zone Dampers',
        groupInputs: [{
            inputName: 'damper01position',
            inputLabel: 'Damper A Position',
            inputUnit: '%'
        }, {
            inputName: 'damper02position',
            inputLabel: 'Damper B Position',
            inputUnit: '%'
        }, {
            inputName: 'damper03position',
            inputLabel: 'Damper C Position',
            inputUnit: '%'
        }, {
            inputName: 'damper04position',
            inputLabel: 'Damper D Position',
            inputUnit: '%'
        }, {
            inputName: 'damper05position',
            inputLabel: 'Damper E Position',
            inputUnit: '%'
        }, {
            inputName: 'damper06position',
            inputLabel: 'Damper F Position',
            inputUnit: '%'
        }, {
            inputName: 'damper07position',
            inputLabel: 'Damper G Position',
            inputUnit: '%'
        }, {
            inputName: 'damper08position',
            inputLabel: 'Damper H Position',
            inputUnit: '%'
        }, {
            inputName: 'damper09position',
            inputLabel: 'Damper I Position',
            inputUnit: '%'
        }, {
            inputName: 'damper10position',
            inputLabel: 'Damper J Position',
            inputUnit: '%'
        }, {
            inputName: 'damper11position',
            inputLabel: 'Damper K Position',
            inputUnit: '%'
        }, {
            inputName: 'damper12position',
            inputLabel: 'Damper L Position',
            inputUnit: '%'
        }]
    }, {
        groupName: 'Blowers',
        groupLabel: 'Blowers',
        groupInputs: [{
            inputName: 'blower01run',
            inputLabel: 'Blower 1 Run',
            inputTranslations: [{
                value: 0,
                translation: 'Stop'
            }, {
                value: 1,
                translation: 'Start'
            }]
        }, {
            inputName: 'blower02run',
            inputLabel: 'Blower 2 Run',
            inputTranslations: [{
                value: 0,
                translation: 'Stop'
            }, {
                value: 1,
                translation: 'Start'
            }]
        }, {
            inputName: 'blower03run',
            inputLabel: 'Blower 3 Run',
            inputTranslations: [{
                value: 0,
                translation: 'Stop'
            }, {
                value: 1,
                translation: 'Start'
            }]
        }, {
            inputName: 'blower04run',
            inputLabel: 'Blower 4 Run',
            inputTranslations: [{
                value: 0,
                translation: 'Stop'
            }, {
                value: 1,
                translation: 'Start'
            }]
        }, {
            inputName: 'blower01fault',
            inputLabel: 'Blower 1 Fault',
            inputTranslations: [{
                value: 0,
                translation: 'Fault'
            }, {
                value: 1,
                translation: 'Okay'
            }]
        }, {
            inputName: 'blower02fault',
            inputLabel: 'Blower 2 Fault',
            inputTranslations: [{
                value: 0,
                translation: 'Fault'
            }, {
                value: 1,
                translation: 'Okay'
            }]
        }, {
            inputName: 'blower03fault',
            inputLabel: 'Blower 3 Fault',
            inputTranslations: [{
                value: 0,
                translation: 'Fault'
            }, {
                value: 1,
                translation: 'Okay'
            }]
        }, {
            inputName: 'blower04fault',
            inputLabel: 'Blower 4 Fault',
            inputTranslations: [{
                value: 0,
                translation: 'Fault'
            }, {
                value: 1,
                translation: 'Okay'
            }]
        }, {
            inputName: 'blower01value',
            inputLabel: 'Blower 1 Speed',
            inputUnit: '%'
        }, {
            inputName: 'blower02value',
            inputLabel: 'Blower 2 Speed',
            inputUnit: '%'
        }, {
            inputName: 'blower03value',
            inputLabel: 'Blower 3 Speed',
            inputUnit: '%'
        }, {
            inputName: 'blower04value',
            inputLabel: 'Blower 4 Speed',
            inputUnit: '%'
        }]
    }, {
        groupName: 'Manifolds',
        groupLabel: 'Manifolds',
        groupInputs: [{
            inputName: 'duct01pressure',
            inputLabel: 'Duct 1 Pressure',
            inputUnit: 'inches'
        }, {
            inputName: 'duct02pressure',
            inputLabel: 'Duct 2 Pressure',
            inputUnit: 'inches'
        }, {
            inputName: 'duct03pressure',
            inputLabel: 'Duct 3 Pressure',
            inputUnit: 'inches'
        }, {
            inputName: 'duct04pressure',
            inputLabel: 'Duct 4 Pressure',
            inputUnit: 'inches'
        }, {
            inputName: 'duct01pressuresp',
            inputLabel: 'Duct 1 Pressure Setpoint',
            inputUnit: 'inches'
        }, {
            inputName: 'duct02pressuresp',
            inputLabel: 'Duct 2 Pressure Setpoint',
            inputUnit: 'inches'
        }, {
            inputName: 'duct03pressuresp',
            inputLabel: 'Duct 3 Pressure Setpoint',
            inputUnit: 'inches'
        }, {
            inputName: 'duct04pressuresp',
            inputLabel: 'Duct 4 Pressure Setpoint',
            inputUnit: 'inches'
        }]
    }]
}
