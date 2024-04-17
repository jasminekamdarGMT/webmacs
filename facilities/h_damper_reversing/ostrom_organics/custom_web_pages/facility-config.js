
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.50',
    temperatureUnit: temperatureUnit,
    dbPath: '',
    layoutType: 'card',
    hasLoadZoneFeature: true,
    hasBatchCappedFeature: true,
    displayPFRPTime: true,
    hasLocationalRegimeControl: true,
    overrideDisabledSettings: false,
    zoneProbeIds: ['A', 'B'],
    zoneTempALabel: 'Top',
    zoneTempBLabel: 'Bottom',
    IORegList: [
      "duct01presssptimer",
      "duct02presssptimer",
      "duct01pressuresp",
      "duct02pressuresp",
      "duct01pressureavg",
      "duct02pressureavg",
      "duct01pospressure",
      "duct02pospressure",
      "duct01negpressure",
      "duct02negpressure",
      "duct01pospressureavg",
      "duct02pospressureavg",
      "duct01negpressureavg",
      "duct02negpressureavg",
      "duct01pospressuresp",
      "duct02pospressuresp",
      "duct01negpressuresp",
      "duct02negpressuresp",
      "duct01mister",
      "duct02mister",
      "duct01misteroverride",
      "duct02misteroverride",
      "duct01mistercontrol",
      "duct02mistercontrol",
      "duct01mistertimer",
      "duct02mistertimer",
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
      "blower01idletimer",
      "blower02idletimer",
      "blower01revdamper",
      "blower02revdamper",
      "premister01temp",
      "premister02temp",
      "premister01lvtemp",
      "premister02lvtemp",
      "premister01tempage",
      "premister02tempage",
      "biofilter01lvtemp",
      "biofilter02lvtemp",
      "biofilter01tempage",
      "biofilter02tempage",
      "biofilter01avgtemp",
      "biofilter02avgtemp",
      "exhaust01temp",
      "exhaust02temp",
      "exhaust01lvtemp",
      "exhaust02lvtemp",
      "exhaust01tempage",
      "exhaust02tempage",
      "exhaust01avgtemp",
      "exhaust02avgtemp",
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
      "loadzone01active",
      "loadzone02active",
      "loadzone03active",
      "loadzone04active",
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
      "zone01pfrptime",
      "zone02pfrptime",
      "zone03pfrptime",
      "zone04pfrptime",
      "zone01moveto",
      "zone02moveto",
      "zone03moveto",
      "zone04moveto",
      "zone01control",
      "zone02control",
      "zone03control",
      "zone04control",
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
      "zone01regime",
      "zone02regime",
      "zone03regime",
      "zone04regime",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse",
      "refreshsettings",
      "wirelesscommfailure",
      "zone01capped",
      "zone02capped",
      "zone03capped",
      "zone04capped"
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: '01',
                blowerLabel: 'Blower P1',
                showManifoldInfoOnBlowerCard: true,
                hasAerationReversingControl: false,
                hasMisterControl: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '01',
                    zoneLabel: 'P1A',
                    zoneTempALabel: 'P1A-1',
                    zoneTempBLabel: 'P1A-2',
                    setpointSettingName: 'RegimeXTempSetPoint'
                },
                {
                    zoneId: '02',
                    zoneLabel: 'P1B',
                    zoneTempALabel: 'P1B-1',
                    zoneTempBLabel: 'P1B-2',
                    setpointSettingName: 'RegimeXTempSetPoint'
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower P2',
                showManifoldInfoOnBlowerCard: true,
                hasAerationReversingControl: false,
                hasMisterControl: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '03',
                    zoneLabel: 'P2A',
                    zoneProbeIds: ['A','B','C','D'],
                    zoneTempALabel: 'P2A-1 Top',
                    zoneTempBLabel: 'P2A-1 Bottom',
                    zoneTempCLabel: 'P2A-2 Top',
                    zoneTempDLabel: 'P2A-2 Bottom',
                    setpointSettingName: 'RegimeXTempSetPoint'
                },
                {
                    zoneId: '04',
                    zoneLabel: 'P2B',
                    zoneProbeIds: ['A','B','C','D'],
                    zoneTempALabel: 'P2B-1 Top',
                    zoneTempBLabel: 'P2B-1 Bottom',
                    zoneTempCLabel: 'P2B-2 Top',
                    zoneTempDLabel: 'P2B-2 Bottom',
                    setpointSettingName: 'RegimeXTempSetPoint'
                }
            ]
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0,
        dataExclusionList: [
          'Aeration Direction',
          'Biofilter Temp',
          'Exhaust Temp',
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
                  settingLabel: 'Blowers Pressure Setpoint Min',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'PosDirPressureSetpointMax',
                  settingLabel: 'Blowers Pressure Setpoint Max',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'NegDirPressureSetpointMin',
                  settingLabel: 'Blowers Negative Pressure Setpoint Min',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24,
                  settingHidden: true
              },
              {
                  settingName: 'NegDirPressureSetpointMax',
                  settingLabel: 'Blowers Negative Pressure Setpoint Max',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24,
                  settingHidden: true
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
                  settingMax: 200,
                  settingHidden: true
              },
              {
                  settingName: 'Blower01PosDirectionTempSetPoint',
                  settingLabel: 'Blower P1 Positive Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200,
                  settingHidden: true
              },
              {
                  settingName: 'Blower02PosDirectionTempSetPoint',
                  settingLabel: 'Blower P2 Positive Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200,
                  settingHidden: true
              },
              {
                  settingName: 'Blower01NegDirectionTempSetPoint',
                  settingLabel: 'Blower P1 Negative Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200,
                  settingHidden: true
              },
              {
                  settingName: 'Blower02NegDirectionTempSetPoint',
                  settingLabel: 'Blower P2 Negative Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200,
                  settingHidden: true
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
                  settingLabel: 'Mister P1 Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'Mister02PosTempSetPoint',
                  settingLabel: 'Mister P2 Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'Mister01NegHighTempSetPoint',
                  settingLabel: 'Mister P1 Negative High Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120,
                  settingHidden: true
              },
              {
                  settingName: 'Mister02NegHighTempSetPoint',
                  settingLabel: 'Mister P2 Negative High Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120,
                  settingHidden: true
              },
              {
                  settingName: 'Mister01NegLowTempSetPoint',
                  settingLabel: 'Mister P1 Negative Low Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120,
                  settingHidden: true
              },
              {
                  settingName: 'Mister02NegLowTempSetPoint',
                  settingLabel: 'Mister P2 Negative Low Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120,
                  settingHidden: true
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
                    settingLabel: 'Zone P1A-1',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeBPointID',
                    settingLabel: 'Zone P1A-2',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone P1B-1',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeBPointID',
                    settingLabel: 'Zone P1B-2',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeAPointID',
                    settingLabel: 'Zone P2A-1 Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeBPointID',
                    settingLabel: 'Zone P2A-1 Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeCPointID',
                    settingLabel: 'Zone P2A-2 Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeDPointID',
                    settingLabel: 'Zone P2A-2 Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeAPointID',
                    settingLabel: 'Zone P2B-1 Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeBPointID',
                    settingLabel: 'Zone P2B-1 Bottom',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeCPointID',
                    settingLabel: 'Zone P2B-2 Top',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeDPointID',
                    settingLabel: 'Zone P2B-2 Bottom',
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
                    inputLabel: 'Zone P1A-1',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pBlvtemp',
                    inputLabel: 'Zone P1A-2',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAlvtemp',
                    inputLabel: 'Zone P1B-1',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBlvtemp',
                    inputLabel: 'Zone P1B-2',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAlvtemp',
                    inputLabel: 'Zone P2A-1 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pBlvtemp',
                    inputLabel: 'Zone P2A-1 Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pClvtemp',
                    inputLabel: 'Zone P2A-2 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pDlvtemp',
                    inputLabel: 'Zone P2A-2 Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAlvtemp',
                    inputLabel: 'Zone P2B-1 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pBlvtemp',
                    inputLabel: 'Zone P2B-1 Bottom',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pClvtemp',
                    inputLabel: 'Zone P2B-2 Top',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pDlvtemp',
                    inputLabel: 'Zone P2B-2 Bottom',
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
                    inputLabel: 'Damper P1A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper02position',
                    inputLabel: 'Damper P1B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper03position',
                    inputLabel: 'Damper P2A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper04position',
                    inputLabel: 'Damper P2B Position',
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
                    inputLabel: 'Blower P1 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower02run',
                    inputLabel: 'Blower P2 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower01fault',
                    inputLabel: 'Blower P1 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower02fault',
                    inputLabel: 'Blower P2 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower01value',
                    inputLabel: 'Blower P1 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower02value',
                    inputLabel: 'Blower P2 Speed',
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
                  inputLabel: 'Exhaust P1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust02temp',
                  inputLabel: 'Exhaust P2 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'duct01pospressure',
                  inputLabel: 'Duct P1 Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct01pressuresp',
                  inputLabel: 'Duct P1 Pressure Setpoint',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02pospressure',
                  inputLabel: 'Duct P2 Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02pressuresp',
                  inputLabel: 'Duct P2 Pressure Setpoint',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct01mister',
                  inputLabel: 'Duct P1 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'duct02mister',
                  inputLabel: 'Duct P2 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                }
            ]
        }
    ]
}
