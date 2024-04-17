
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.54',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    layoutType: 'card',
    hasLocationalRegimeControl: true,
    displayPFRPTime: true,
    overrideDisabledSettings: true,
    hasIndependentVFDSpeeds: true,
    zoneProbeIds: ['A', 'B'],
    IORegList: [
      "duct01presssptimer",
      "duct02presssptimer",
      "duct01pressuresp",
      "duct02pressuresp",
      "duct01pospressuresp",
      "duct02pospressuresp",
      "duct01negpressuresp",
      "duct02negpressuresp",
      "duct01pressureavg",
      "duct02pressureavg",
      "duct01pospressure",
      "duct01negpressure",
      "duct02pospressure",
      "duct02negpressure",
      "duct01pospressureavg",
      "duct02pospressureavg",
      "duct01negpressureavg",
      "duct02negpressureavg",
      "blower01run",
      "blower02run",
      "blower01fault",
      "blower02fault",
      "blower01speed",
      "blower02speed",
      "blower01prerevspeed",
      "blower02prerevspeed",
      "blower01control",
      "blower02control",
      "blower01override",
      "blower02override",
      "blower01value",
      "blower02value",
      "blower01cycle",
      "blower02cycle",
      "blower01revoverride",
      "blower02revoverride",
      "blower01direction",
      "blower02direction",
      "blower01revtimer",
      "blower02revtimer",
      "blower01idletimer",
      "blower02idletimer",
      "blower01revdamper",
      "blower02revdamper",
      "exhaust01temp",
      "exhaust02temp",
      "exhaust01lvtemp",
      "exhaust02lvtemp",
      "exhaust01avgtemp",
      "exhaust02avgtemp",
      "biofilter01lvtemp",
      "biofilter02lvtemp",
      "biofilter01tempage",
      "biofilter02tempage",
      "biofilter01avgtemp",
      "biofilter02avgtemp",
      "biofilter01mister",
      "biofilter02mister",
      "biofilter01misttimer",
      "biofilter02misttimer",
      "biofilter01mistdelay",
      "biofilter02mistdelay",
      "damper01position",
      "damper02position",
      "damper03position",
      "damper04position",
      "damper05position",
      "damper06position",
      "damper01override",
      "damper02override",
      "damper03override",
      "damper04override",
      "damper05override",
      "damper06override",
      "damper01value",
      "damper02value",
      "damper03value",
      "damper04value",
      "damper05value",
      "damper06value",
      "zone01pAlvtemp",
      "zone01pBlvtemp",
      "zone01pClvtemp",
      "zone01pDlvtemp",
      "zone02pAlvtemp",
      "zone02pBlvtemp",
      "zone02pClvtemp",
      "zone02pDlvtemp",
      "zone03pAlvtemp",
      "zone03pBlvtemp",
      "zone03pClvtemp",
      "zone03pDlvtemp",
      "zone04pAlvtemp",
      "zone04pBlvtemp",
      "zone04pClvtemp",
      "zone04pDlvtemp",
      "zone05pAlvtemp",
      "zone05pBlvtemp",
      "zone05pClvtemp",
      "zone05pDlvtemp",
      "zone06pAlvtemp",
      "zone06pBlvtemp",
      "zone06pClvtemp",
      "zone06pDlvtemp",
      "zone01pAtempage",
      "zone01pBtempage",
      "zone01pCtempage",
      "zone01pDtempage",
      "zone02pAtempage",
      "zone02pBtempage",
      "zone02pCtempage",
      "zone02pDtempage",
      "zone03pAtempage",
      "zone03pBtempage",
      "zone03pCtempage",
      "zone03pDtempage",
      "zone04pAtempage",
      "zone04pBtempage",
      "zone04pCtempage",
      "zone04pDtempage",
      "zone05pAtempage",
      "zone05pBtempage",
      "zone05pCtempage",
      "zone05pDtempage",
      "zone06pAtempage",
      "zone06pBtempage",
      "zone06pCtempage",
      "zone06pDtempage",
      "zone01pAavgtemp",
      "zone01pBavgtemp",
      "zone01pCavgtemp",
      "zone01pDavgtemp",
      "zone02pAavgtemp",
      "zone02pBavgtemp",
      "zone02pCavgtemp",
      "zone02pDavgtemp",
      "zone03pAavgtemp",
      "zone03pBavgtemp",
      "zone03pCavgtemp",
      "zone03pDavgtemp",
      "zone04pAavgtemp",
      "zone04pBavgtemp",
      "zone04pCavgtemp",
      "zone04pDavgtemp",
      "zone05pAavgtemp",
      "zone05pBavgtemp",
      "zone05pCavgtemp",
      "zone05pDavgtemp",
      "zone06pAavgtemp",
      "zone06pBavgtemp",
      "zone06pCavgtemp",
      "zone06pDavgtemp",
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
      "zone01reset",
      "zone02reset",
      "zone03reset",
      "zone04reset",
      "zone05reset",
      "zone06reset",
      "zone01print",
      "zone02print",
      "zone03print",
      "zone04print",
      "zone05print",
      "zone06print",
      "zone01avgdamper",
      "zone02avgdamper",
      "zone03avgdamper",
      "zone04avgdamper",
      "zone05avgdamper",
      "zone06avgdamper",
      "zone01avgtimer",
      "zone02avgtimer",
      "zone03avgtimer",
      "zone04avgtimer",
      "zone05avgtimer",
      "zone06avgtimer",
      "zone01pfrptime",
      "zone02pfrptime",
      "zone03pfrptime",
      "zone04pfrptime",
      "zone05pfrptime",
      "zone06pfrptime",
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
      "pump01speed",
      "pump02speed",
      "pump03speed",
      "pump01run",
      "pump02run",
      "pump03run",
      "pump01speed1",
      "pump02speed1",
      "pump03speed1",
      "pump01speed2",
      "pump02speed2",
      "pump03speed2",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse",
      "refreshsettings",
      "wirelesscommfailure",
      "pollwirelesstemps"
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: '01',
                blowerLabel: 'Blower 1',
                minVFDSpeedSettingName: 'Blower01MinVFDSpeed',
                maxVFDSpeedSettingName: 'Blower01MaxVFDSpeed',
                hasAerationReversingControl: true,
                hasCustomCycleControl: false,
                hasBiofilterTempSensor: true,
                hasExhaustTempSensor: true,
                hasPumpControl: true
            },
            groupZones: [
                {
                    zoneId: '01',
                    setpointSettingName: 'Zone01TempSetPoint',
                },
                {
                    zoneId: '02',
                    setpointSettingName: 'Zone02TempSetPoint',
                    zoneProbeIds: ['A','B','C'],
                    zoneTempALabel: '2A1',
                    zoneTempBLabel: '2A2',
                    zoneTempCLabel: '2B'
                }
            ],
            groupPumps: [
                {
                    pumpId: '01',
                    pumpLabel: 'Pad Pump'
                },
                {
                    pumpId: '02',
                    pumpLabel: 'Cure Pump'
                },
                {
                    pumpId: '03',
                    pumpLabel: 'PreProcess Pump'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower 2',
                minVFDSpeedSettingName: 'Blower02MinVFDSpeed',
                maxVFDSpeedSettingName: 'Blower02MaxVFDSpeed',
                hasAerationReversingControl: true,
                hasCustomCycleControl: false,
                hasBiofilterTempSensor: true,
                hasExhaustTempSensor: true,
                hasPumpControl: true
            },
            groupZones: [
                {
                    zoneId: '03',
                    setpointSettingName: 'Zone03TempSetPoint',
                },
                {
                    zoneId: '04',
                    setpointSettingName: 'Zone04TempSetPoint',
                },
                {
                    zoneId: '05',
                    setpointSettingName: 'Zone05TempSetPoint',
                },
                {
                    zoneId: '06',
                    setpointSettingName: 'Zone06TempSetPoint',
                    zoneProbeIds: ['A','B','C'],
                    zoneTempALabel: '6A',
                    zoneTempBLabel: '6B1',
                    zoneTempCLabel: '6B2'
                }
            ],
            groupPumps: [

            ]
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0,
        displayReferenceTempOnGraph: true,
        referenceTempColor: "orange",
        dataExclusionList: [
          'Average Temp',
          'PFRP Time',
          'Regime'
        ],
    },
    settingsGroups: [
        {
            groupName: 'zoneTempSetPoints',
            groupLabel: 'Temperature Setpoints',
            groupTitle: 'Zone Temperature Setpoints',
            groupSettings: [
                {
                    settingName: 'Zone01TempSetPoint',
                    settingLabel: 'Zone 1 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Zone02TempSetPoint',
                    settingLabel: 'Zone 2 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Zone03TempSetPoint',
                    settingLabel: 'Zone 3 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Zone04TempSetPoint',
                    settingLabel: 'Zone 4 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Zone05TempSetPoint',
                    settingLabel: 'Zone 5 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Zone06TempSetPoint',
                    settingLabel: 'Zone 6 Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 180
                },
                {
                    settingName: 'Zone01RegimeType',
                    settingLabel: 'Zone 1 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone02RegimeType',
                    settingLabel: 'Zone 2 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone03RegimeType',
                    settingLabel: 'Zone 3 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone04RegimeType',
                    settingLabel: 'Zone 4 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone05RegimeType',
                    settingLabel: 'Zone 5 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone06RegimeType',
                    settingLabel: 'Zone 6 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
            ]
        },
        {
            groupName: 'blower01',
            groupLabel: 'Blower 1 Control',
            groupTitle: 'Blower 1 Settings',
            groupSettings: [
                {
                    settingName: 'Blower01MinVFDSpeed',
                    settingLabel: 'Minimum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'Blower01MaxVFDSpeed',
                    settingLabel: 'Maximum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'Blower01PosDirPressureSetpointMin',
                    settingLabel: 'Positive Aeration Direction Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower01PosDirPressureSetpointMax',
                    settingLabel: 'Positive Aeration Direction Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower01NegDirPressureSetpointMin',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower01NegDirPressureSetpointMax',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower01PressureSetpointHotZoneTrigger',
                    settingLabel: 'Blower Pressure Setpoint Hot Zone Trigger',
                    settingUnit: '%',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 0,
                    settingMax: 100
                },
                {
                    settingName: 'Blower01PressureSetpointColdZoneTrigger',
                    settingLabel: 'Blower Pressure Setpoint Cold Zone Trigger',
                    settingUnit: '%',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 0,
                    settingMax: 100
                },
                {
                    settingName: 'Blower01PressureSetpointChangeTimer',
                    settingLabel: 'Blower Pressure Setpoint Change Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 1,
                    settingMax: 720
                },
                {
                    settingName: 'Blower01PressureSetpointChangeInterval',
                    settingLabel: 'Blower Pressure Setpoint Change Interval',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 15
                },
                {
                    settingName: 'Blower01BiofilterForcePositiveTemperature',
                    settingLabel: 'Biofilter Force Positive Temperature',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower01BlowerCyclePositiveTime',
                    settingLabel: 'Blower Cycle Positive Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 0,
                    settingMax: 720
                },
                {
                    settingName: 'Blower01BlowerCycleNegativeTime',
                    settingLabel: 'Blower Cycle Negative Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 0,
                    settingMax: 720
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
            groupName: 'blower02',
            groupLabel: 'Blower 2 Control',
            groupTitle: 'Blower 2 Settings',
            groupSettings: [
                {
                    settingName: 'Blower02MinVFDSpeed',
                    settingLabel: 'Minimum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'Blower02MaxVFDSpeed',
                    settingLabel: 'Maximum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'Blower02PosDirPressureSetpointMin',
                    settingLabel: 'Positive Aeration Direction Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower02PosDirPressureSetpointMax',
                    settingLabel: 'Positive Aeration Direction Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower02NegDirPressureSetpointMin',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower02NegDirPressureSetpointMax',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'Blower02PressureSetpointHotZoneTrigger',
                    settingLabel: 'Blower Pressure Setpoint Hot Zone Trigger',
                    settingUnit: '%',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 0,
                    settingMax: 100
                },
                {
                    settingName: 'Blower02PressureSetpointColdZoneTrigger',
                    settingLabel: 'Blower Pressure Setpoint Cold Zone Trigger',
                    settingUnit: '%',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 0,
                    settingMax: 100
                },
                {
                    settingName: 'Blower02PressureSetpointChangeTimer',
                    settingLabel: 'Blower Pressure Setpoint Change Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 1,
                    settingMax: 720
                },
                {
                    settingName: 'Blower02PressureSetpointChangeInterval',
                    settingLabel: 'Blower Pressure Setpoint Change Interval',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 15
                },
                {
                    settingName: 'Blower02BiofilterForcePositiveTemperature',
                    settingLabel: 'Biofilter Force Positive Temperature',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower02BlowerCyclePositiveTime',
                    settingLabel: 'Blower Cycle Positive Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 0,
                    settingMax: 720
                },
                {
                    settingName: 'Blower02BlowerCycleNegativeTime',
                    settingLabel: 'Blower Cycle Negative Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 0,
                    settingMax: 720
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
                    settingLabel: 'Zone 2A1 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeBPointID',
                    settingLabel: 'Zone 2A2 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeCPointID',
                    settingLabel: 'Zone 2B Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                // {
                //     settingName: 'Zone02ProbeDPointID',
                //     settingLabel: 'Zone 2 Probe D',
                //     settingType: 'string',
                //     settingDisabled: true
                // },
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
                    settingLabel: 'Zone 6A Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeBPointID',
                    settingLabel: 'Zone 6B1 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeCPointID',
                    settingLabel: 'Zone 6B2 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                // {
                //     settingName: 'Zone06ProbeDPointID',
                //     settingLabel: 'Zone 6 Probe D',
                //     settingType: 'string',
                //     settingDisabled: true
                // },
                {
                    settingName: 'Biofilter01ProbePointID',
                    settingLabel: 'Biofilter 1 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter02ProbePointID',
                    settingLabel: 'Biofilter 2 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter01MisterTimer',
                    settingLabel: 'Biofilter 1 Mister Timer',
                    settingType: 'string'
                },
                {
                    settingName: 'Biofilter02MisterTimer',
                    settingLabel: 'Biofilter 2 Mister Timer',
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
                    settingName: 'Zone01MinDamperValue',
                    settingLabel: 'Zone 1 Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 100
                },
                {
                    settingName: 'Zone02MinDamperValue',
                    settingLabel: 'Zone 2 Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 100
                },
                {
                    settingName: 'Zone03MinDamperValue',
                    settingLabel: 'Zone 3 Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 100
                },
                {
                    settingName: 'Zone04MinDamperValue',
                    settingLabel: 'Zone 4 Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 100
                },
                {
                    settingName: 'Zone05MinDamperValue',
                    settingLabel: 'Zone 5 Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 100
                },
                {
                    settingName: 'Zone06MinDamperValue',
                    settingLabel: 'Zone 6 Minimum Damper Value',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 100
                },
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
                    settingName: 'WirelessTempsPollInterval',
                    settingLabel: 'Wireless Temps Poll Interval',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 5,
                    settingMax: 60,
                    settingHidden: true
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
            groupName: 'Zone1-6Temps',
            groupLabel: 'Zone 1-6 Temps',
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
                    inputLabel: 'Zone 2 Probe 2A1',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBlvtemp',
                    inputLabel: 'Zone 2 Probe 2A2',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pClvtemp',
                    inputLabel: 'Zone 2 Probe 2B',
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
                    inputLabel: 'Zone 6 Probe 6A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pBlvtemp',
                    inputLabel: 'Zone 6 Probe 6B1',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pClvtemp',
                    inputLabel: 'Zone 6 Probe 6B2',
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
                    inputName: 'blower01value',
                    inputLabel: 'Blower 1 Speed',
                    inputUnit: '%'
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
                  inputName: 'duct01pressuresp',
                  inputLabel: 'Duct 1 Pressure Setpoint',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02pressuresp',
                  inputLabel: 'Duct 2 Pressure Setpoint',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'blower01revdamper',
                  inputLabel: 'Blower 1 Reverse Damper Position'
                },
                {
                  inputName: 'blower02revdamper',
                  inputLabel: 'Blower 2 Reverse Damper Position'
                }
            ]
        }
    ]
}
