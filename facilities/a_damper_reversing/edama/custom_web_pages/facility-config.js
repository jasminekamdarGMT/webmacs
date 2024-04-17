
const temperatureUnit = '°C';

var facilityConfig = {
    verifiedWithVersion: '1.0.53',
    temperatureUnit: temperatureUnit,
    dbPath: '',
    layoutType: 'card',
    // hasLoadZoneFeature: true,
    displayPFRPTime: true,
    hasLocationalRegimeControl: true,
    hasReversingLogicOptions: true,
    overrideDisabledSettings: false,
    biofilterProbeIds: ['A', 'B', 'C', 'D'],
    zoneProbeIds: ['A', 'B', 'C', 'D'],
    zoneTempALabel: 'Top',
    zoneTempBLabel: 'Bottom',
    IORegList: [
      "duct01presssptimer",
      "duct01pressuresp",
      "duct01pressureavg",
      "duct01pospressure",
      "duct01negpressure",
      "duct01pospressureavg",
      "duct01negpressureavg",
      "duct01pospressuresp",
      "duct01negpressuresp",
      "duct01mister",
      "duct01misteroverride",
      "duct01mistercontrol",
      "duct01mistertimer",
      "duct01inletdamper",
      "loadzone01active",
      "loadzone02active",
      "loadzone03active",
      "loadzone04active",
      "loadzone05active",
      "blower01run",
      "blower01fault",
      "blower01speed",
      "blower01prerevspeed",
      "blower01control",
      "blower01override",
      "blower01value",
      "blower01revoverride",
      "blower01direction",
      "blower01idletimer",
      "blower01revdamper",
      "blower01revtimer",
      "blower01revlogic",
      "premister01temp",
      "premister01lvtemp",
      "premister01tempage",
      "biofilter01pAlvtemp",
      "biofilter01pBlvtemp",
      "biofilter01pClvtemp",
      "biofilter01pDlvtemp",
      "biofilter01pAtempage",
      "biofilter01pBtempage",
      "biofilter01pCtempage",
      "biofilter01pDtempage",
      "biofilter01pAavgtemp",
      "biofilter01pBavgtemp",
      "biofilter01pCavgtemp",
      "biofilter01pDavgtemp",
      "exhaust01temp",
      "exhaust01lvtemp",
      "exhaust01tempage",
      "exhaust01avgtemp",
      "exhaust01damper",
      "damperP1Aposition",
      "damperP1Bposition",
      "damperP2Aposition",
      "damperP2Bposition",
      "damperP3Aposition",
      "damperP3Bposition",
      "damperP4Aposition",
      "damperP4Bposition",
      "damperS1Aposition",
      "damperS1Bposition",
      "damperP1Aoverride",
      "damperP1Boverride",
      "damperP2Aoverride",
      "damperP2Boverride",
      "damperP3Aoverride",
      "damperP3Boverride",
      "damperP4Aoverride",
      "damperP4Boverride",
      "damperS1Aoverride",
      "damperS1Boverride",
      "damperP1Avalue",
      "damperP1Bvalue",
      "damperP2Avalue",
      "damperP2Bvalue",
      "damperP3Avalue",
      "damperP3Bvalue",
      "damperP4Avalue",
      "damperP4Bvalue",
      "damperS1Avalue",
      "damperS1Bvalue",
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
      "zone01pfrptime",
      "zone02pfrptime",
      "zone03pfrptime",
      "zone04pfrptime",
      "zone05pfrptime",
      "zone01moveto",
      "zone02moveto",
      "zone03moveto",
      "zone04moveto",
      "zone05moveto",
      "zone01control",
      "zone02control",
      "zone03control",
      "zone04control",
      "zone05control",
      "zone01reset",
      "zone02reset",
      "zone03reset",
      "zone04reset",
      "zone05reset",
      "zone01print",
      "zone02print",
      "zone03print",
      "zone04print",
      "zone05print",
      "zone01avgdamper",
      "zone02avgdamper",
      "zone03avgdamper",
      "zone04avgdamper",
      "zone05avgdamper",
      "zone01avgtimer",
      "zone02avgtimer",
      "zone03avgtimer",
      "zone04avgtimer",
      "zone05avgtimer",
      "zone01regime",
      "zone02regime",
      "zone03regime",
      "zone04regime",
      "zone05regime",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse",
      "refreshsettings",
      "wirelesscommfailure",
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: '01',
                blowerLabel: 'Blower 1',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '01',
                    zoneLabel: 'P1',
                    multipleDampers: true,
                    damperDeterminer: 'blower01revdamper',
                    damperIds: ['P1A','P1B'],
                    zoneTempALabel: 'P1-A Top',
                    zoneTempBLabel: 'P1-A Bottom',
                    zoneTempCLabel: 'P1-B Top',
                    zoneTempDLabel: 'P1-B Bottom',
                    setpointSettingName: 'RegimeXTempSetPoint'
                },
                {
                    zoneId: '02',
                    zoneLabel: 'P2',
                    multipleDampers: true,
                    damperDeterminer: 'blower01revdamper',
                    damperIds: ['P2A','P2B'],
                    zoneTempALabel: 'P2-A Top',
                    zoneTempBLabel: 'P2-A Bottom',
                    zoneTempCLabel: 'P2-B Top',
                    zoneTempDLabel: 'P2-B Bottom',
                    setpointSettingName: 'RegimeXTempSetPoint'
                },
                {
                    zoneId: '03',
                    zoneLabel: 'P3',
                    multipleDampers: true,
                    damperDeterminer: 'blower01revdamper',
                    damperIds: ['P3A','P3B'],
                    zoneTempALabel: 'P3-A Top',
                    zoneTempBLabel: 'P3-A Bottom',
                    zoneTempCLabel: 'P3-B Top',
                    zoneTempDLabel: 'P3-B Bottom',
                    setpointSettingName: 'RegimeXTempSetPoint'
                },
                {
                    zoneId: '04',
                    zoneLabel: 'P4',
                    multipleDampers: true,
                    damperDeterminer: 'blower01revdamper',
                    damperIds: ['P4A','P4B'],
                    zoneTempALabel: 'P4-A Top',
                    zoneTempBLabel: 'P4-A Bottom',
                    zoneTempCLabel: 'P4-B Top',
                    zoneTempDLabel: 'P4-B Bottom',
                    setpointSettingName: 'RegimeXTempSetPoint'
                },
                {
                    zoneId: '05',
                    zoneLabel: 'S1',
                    multipleDampers: true,
                    damperDeterminer: 'blower01revdamper',
                    damperIds: ['S1A','S1B'],
                    zoneTempALabel: 'S1-A Top',
                    zoneTempBLabel: 'S1-A Bottom',
                    zoneTempCLabel: 'S1-B Top',
                    zoneTempDLabel: 'S1-B Bottom',
                    setpointSettingName: 'RegimeXTempSetPoint'
                }
            ]
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0,
        dataExclusionList: [
          'PFRP Time',
          'Regime'
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
                    settingName: 'Regime1TempSetPoint',
                    settingLabel: 'Warm Up Regime Temp Set Point',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
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
            groupName: 'manifold',
            groupLabel: 'Manifold Control',
            groupTitle: 'Manifold Settings',
            groupSettings: [
              {
                  settingName: 'PosDirPressureSetpointMin',
                  settingLabel: 'Blower 1 Positive Pressure Setpoint Min',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'PosDirPressureSetpointMax',
                  settingLabel: 'Blower 1 Positive Pressure Setpoint Max',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'NegDirPressureSetpointMin',
                  settingLabel: 'Blower 1 Negative Pressure Setpoint Min',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'NegDirPressureSetpointMax',
                  settingLabel: 'Blower 1 Negative Pressure Setpoint Max',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
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
                  settingName: 'BiofilterForcePositiveTemperature',
                  settingLabel: 'Biofilter Force Positive Temperature',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200
              },
              {
                  settingName: 'Blower01PosDirectionTempSetPoint',
                  settingLabel: 'Blower 1 Positive Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200
              },
              {
                  settingName: 'Blower01NegDirectionTempSetPoint',
                  settingLabel: 'Blower 1 Negative Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200
              },
              {
                  settingName: 'BlowerCyclePositiveTime',
                  settingLabel: 'Blower Cycle Positive Time',
                  settingUnit: 'Minutes',
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 1440
              },
              {
                  settingName: 'BlowerCycleNegativeTime',
                  settingLabel: 'Blower Cycle Negative Time',
                  settingUnit: 'Minutes',
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 1440
              }
            ]
        },
        {
            groupName: 'misterControl',
            groupLabel: 'Mister Control',
            groupTitle: 'Mister Settings',
            groupSettings: [
              {
                  settingName: 'Mister01PosTempSetPoint',
                  settingLabel: 'Mister 1 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'Mister01NegTempSetPoint',
                  settingLabel: 'Mister 1 Negative Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterOnTime',
                  settingLabel: 'Mister On Time',
                  settingUnit: 'Minutes',
                  settingType: 'number',
                  settingMin: 5,
                  settingMax: 60
              },
              {
                  settingName: 'MisterOffTime',
                  settingLabel: 'Mister Off Time',
                  settingUnit: 'Minutes',
                  settingType: 'number',
                  settingMin: 5,
                  settingMax: 60
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
                    settingLabel: 'Zone P1-A Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeBPointID',
                    settingLabel: 'Zone P1-A Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeCPointID',
                    settingLabel: 'Zone P1-B Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeDPointID',
                    settingLabel: 'Zone P1-B Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone P2-A Top ',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeBPointID',
                    settingLabel: 'Zone P2-A Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeCPointID',
                    settingLabel: 'Zone P2-B Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeDPointID',
                    settingLabel: 'Zone P2-B Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeAPointID',
                    settingLabel: 'Zone P3-A Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeBPointID',
                    settingLabel: 'Zone P3-A Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeCPointID',
                    settingLabel: 'Zone P3-B Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeDPointID',
                    settingLabel: 'Zone P3-B Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeAPointID',
                    settingLabel: 'Zone P4-A Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeBPointID',
                    settingLabel: 'Zone P4-A Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeCPointID',
                    settingLabel: 'Zone P4-B Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeDPointID',
                    settingLabel: 'Zone P4-B Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeAPointID',
                    settingLabel: 'Zone S1-A Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeBPointID',
                    settingLabel: 'Zone S1-A Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeCPointID',
                    settingLabel: 'Zone S1-B Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeDPointID',
                    settingLabel: 'Zone S1-B Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter01ProbeAPointID',
                    settingLabel: 'Biofilter 1 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter01ProbeBPointID',
                    settingLabel: 'Biofilter 1 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter01ProbeCPointID',
                    settingLabel: 'Biofilter 1 Probe C',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter01ProbeDPointID',
                    settingLabel: 'Biofilter 1 Probe D',
                    settingType: 'string',
                    settingDisabled: true
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
                    inputLabel: 'Zone P1-A Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pBlvtemp',
                    inputLabel: 'Zone P1-A Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pClvtemp',
                    inputLabel: 'Zone P1-B Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pDlvtemp',
                    inputLabel: 'Zone P1-B Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAlvtemp',
                    inputLabel: 'Zone P2-A Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBlvtemp',
                    inputLabel: 'Zone P2-A Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pClvtemp',
                    inputLabel: 'Zone P2-B Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pDlvtemp',
                    inputLabel: 'Zone P2-B Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAlvtemp',
                    inputLabel: 'Zone P3-A Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pBlvtemp',
                    inputLabel: 'Zone P3-A Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pClvtemp',
                    inputLabel: 'Zone P3-B Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pDlvtemp',
                    inputLabel: 'Zone P3-B Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAlvtemp',
                    inputLabel: 'Zone P4-A Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pBlvtemp',
                    inputLabel: 'Zone P4-A Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pClvtemp',
                    inputLabel: 'Zone P4-B Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pDlvtemp',
                    inputLabel: 'Zone P4-B Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pAlvtemp',
                    inputLabel: 'Zone S1-A Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pBlvtemp',
                    inputLabel: 'Zone S1-A Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pClvtemp',
                    inputLabel: 'Zone S1-B Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pDlvtemp',
                    inputLabel: 'Zone S1-B Bottom',
                    inputUnit: temperatureUnit
                }
            ]
        },
        {
            groupName: 'ZoneDampers',
            groupLabel: 'Zone Dampers',
            groupInputs: [
                {
                    inputName: 'damperP1Aposition',
                    inputLabel: 'Damper P1A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP1Bposition',
                    inputLabel: 'Damper P1B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP2Aposition',
                    inputLabel: 'Damper P2A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP2Bposition',
                    inputLabel: 'Damper P2B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP3Aposition',
                    inputLabel: 'Damper P3A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP3Bposition',
                    inputLabel: 'Damper P3B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP4Aposition',
                    inputLabel: 'Damper P4A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP4Bposition',
                    inputLabel: 'Damper P4B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS1Aposition',
                    inputLabel: 'Damper S1A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS1Bposition',
                    inputLabel: 'Damper S1B Position',
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
                }
            ]
        },
        {
            groupName: 'Manifolds',
            groupLabel: 'Manifolds',
            groupInputs: [
                {
                  inputName: 'exhaust01temp',
                  inputLabel: 'Exhaust 1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'premister01temp',
                  inputLabel: 'Ambient Temp',
                  inputUnit: temperatureUnit
                },
                {
                    inputName: 'biofilter01pAlvtemp',
                    inputLabel: 'Biofilter 1 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'biofilter01pBlvtemp',
                    inputLabel: 'Biofilter 1 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'biofilter01pClvtemp',
                    inputLabel: 'Biofilter 1 Probe C',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'biofilter01pDlvtemp',
                    inputLabel: 'Biofilter 1 Probe D',
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
                  inputName: 'duct01pressuresp',
                  inputLabel: 'Duct 1 Pressure Setpoint',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct01mister',
                  inputLabel: 'Duct 1 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                }
            ]
        }
    ]
}
