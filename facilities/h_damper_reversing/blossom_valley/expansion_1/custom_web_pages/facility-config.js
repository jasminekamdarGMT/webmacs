
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.53',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    defaultPage: 'modules',
    showMap: true,
    hasModuleSelect: true,
    logFilesPerPage: 24,
    overrideDisabledSettings: true,
    hasLoadZoneFeature: true,
    hasBatchCappedFeature: true,
    displayPFRPTime: true,
    hasReversingLogicOptions: true,
    hasLocationalRegimeControl: true,
    hasIndependentVFDSpeeds: true,
    layoutType: 'card',
    regimeNames: ['','Warm Up','PFRP','VAR'],
    zoneProbeIds: ['A', 'B'],
    zoneTempALabel: 'Top',
    zoneTempBLabel: 'Bottom',
    biofilterProbeIds: ['A'],
    IORegList: [
      "ductP7presssptimer",
      "ductS7presssptimer",
      "ductP7pressuresp",
      "ductS7pressuresp",
      "ductP7pressureavg",
      "ductS7pressure",
      "ductS7pressureavg",
      "ductP7pospressure",
      "ductP7negpressure",
      "ductP7pospressuresp",
      "ductP7negpressuresp",
      "ductP7pospressureavg",
      "ductP7negpressureavg",
      "ductP7mister",
      "ductP7misteroverride",
      "ductP7mistercontrol",
      "ductP7mistertimer",
      "blowerP7run",
      "blowerS7run",
      "blowerP7fault",
      "blowerS7fault",
      "blowerP7speed",
      "blowerS7speed",
      "blowerP7prerevspeed",
      "blowerS7prerevspeed",
      "blowerP7control",
      "blowerS7control",
      "blowerP7override",
      "blowerS7override",
      "blowerP7value",
      "blowerS7value",
      "blowerP7revoverride",
      "blowerP7direction",
      "blowerP7idletimer",
      "blowerP7revtimer",
      "blowerP7revdamper",
      "blowerP7revlogic",
      "blowerP7cycle",
      "blowerS7cycle",
      "blowerP7cycleontime",
      "blowerS7cycleontime",
      "blowerP7cycleofftime",
      "blowerS7cycleofftime",
      "blowerS7customcycle",
      "premisterP7temp",
      "premisterP7lvtemp",
      "exhaustP7temp",
      "exhaustP7lvtemp",
      "exhaustP7avgtemp",
      "biofilterP7pAlvtemp",
      "biofilterP7pAavgtemp",
      "biofilterP7pAtempage",
      "damperP7Aposition",
      "damperP7Bposition",
      "damperS7Aposition",
      "damperS7Bposition",
      "damperP7Aoverride",
      "damperP7Boverride",
      "damperS7Aoverride",
      "damperS7Boverride",
      "damperP7Avalue",
      "damperP7Bvalue",
      "damperS7Avalue",
      "damperS7Bvalue",
      "zone25pAlvtemp",
      "zone25pBlvtemp",
      "zone26pAlvtemp",
      "zone26pBlvtemp",
      "zone27pAlvtemp",
      "zone27pBlvtemp",
      "zone28pAlvtemp",
      "zone28pBlvtemp",
      "zone25pAavgtemp",
      "zone25pBavgtemp",
      "zone26pAavgtemp",
      "zone26pBavgtemp",
      "zone27pAavgtemp",
      "zone27pBavgtemp",
      "zone28pAavgtemp",
      "zone28pBavgtemp",
      "zone25pAtempage",
      "zone25pBtempage",
      "zone26pAtempage",
      "zone26pBtempage",
      "zone27pAtempage",
      "zone27pBtempage",
      "zone28pAtempage",
      "zone28pBtempage",
      "zone25moveto",
      "zone26moveto",
      "zone27moveto",
      "zone28moveto",
      "zone25movedfrom",
      "zone26movedfrom",
      "zone27movedfrom",
      "zone28movedfrom",
      "zone25control",
      "zone26control",
      "zone27control",
      "zone28control",
      "zone25regime",
      "zone26regime",
      "zone27regime",
      "zone28regime",
      "zone25regtimer",
      "zone26regtimer",
      "zone27regtimer",
      "zone28regtimer",
      "zone25reset",
      "zone26reset",
      "zone27reset",
      "zone28reset",
      "zone25print",
      "zone26print",
      "zone27print",
      "zone28print",
      "zone25avgdamper",
      "zone26avgdamper",
      "zone27avgdamper",
      "zone28avgdamper",
      "zone25avgtimer",
      "zone26avgtimer",
      "zone27avgtimer",
      "zone28avgtimer",
      "zone25pfrptime",
      "zone26pfrptime",
      "zone27pfrptime",
      "zone28pfrptime",
      "loadzone25active",
      "loadzone26active",
      "loadzone27active",
      "loadzone28active",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse",
      "refreshsettings",
      "wirelesscommfailure",
      "pollwirelesstemps",
      "zone25capped",
      "zone26capped",
      "zone27capped",
      "zone28capped"
    ],
    moduleGroups: [
        {
            moduleGroup: '7',
            moduleLabel: 'Module 7',
            groupBlower: {
                blowerId: 'P7',
                blowerLabel: 'Blower P7',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '25',
                    zoneLabel: 'P7A',
                    damperId: 'P7A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '26',
                    zoneLabel: 'P7B',
                    damperId: 'P7B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '7',
            moduleLabel: 'Module 7',
            groupBlower: {
                blowerId: 'S7',
                blowerLabel: 'Blower S7',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '27',
                    zoneLabel: 'S7A',
                    zoneTempALabel: 'S7A-1',
                    zoneTempBLabel: 'S7A-2',
                    damperId: 'S7A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '28',
                    zoneLabel: 'S7B',
                    zoneTempALabel: 'S7B-1',
                    zoneTempBLabel: 'S7B-2',
                    damperId: 'S7B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        }
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: 'P7',
                blowerLabel: 'Blower P7',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '25',
                    zoneLabel: 'P7A',
                    damperId: 'P7A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '26',
                    zoneLabel: 'P7B',
                    damperId: 'P7B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'S7',
                blowerLabel: 'Blower S7',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '27',
                    zoneLabel: 'S7A',
                    zoneTempALabel: 'S7A-1',
                    zoneTempBLabel: 'S7A-2',
                    damperId: 'S7A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '28',
                    zoneLabel: 'S7B',
                    zoneTempALabel: 'S7B-1',
                    zoneTempBLabel: 'S7B-2',
                    damperId: 'S7B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0,
        dataExclusionList: [
          'Biofilter Temp',
          'Exhaust Temp',
          'PFRP Time',
          'Regime'
        ],
        displayReferenceTempOnGraph: true,
        referenceTempColor: "orange"
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
                    settingName: 'Regime1Duration',
                    settingLabel: 'Warm Up Regime Duration',
                    settingUnit: 'Days',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 30,
                    settingHidden: true
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
                    settingName: 'Zone25RegimeType',
                    settingLabel: 'Zone 25 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone26RegimeType',
                    settingLabel: 'Zone 26 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone27RegimeType',
                    settingLabel: 'Zone 27 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone28RegimeType',
                    settingLabel: 'Zone 28 Regime Type',
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
                    settingName: 'PrimaryMinVFDSpeed',
                    settingLabel: 'Primary Minimum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'PrimaryMaxVFDSpeed',
                    settingLabel: 'Primary Maximum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'SecondaryMinVFDSpeed',
                    settingLabel: 'Secondary Minimum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'SecondaryMaxVFDSpeed',
                    settingLabel: 'Secondary Maximum VFD Speed',
                    settingUnit: '%',
                    settingType: 'number',
                    settingMin: 20,
                    settingMax: 100
                },
                {
                    settingName: 'BlowerCyclePositiveTime',
                    settingLabel: 'Blower Cycle Positive Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 0,
                    settingMax: 720
                },
                {
                    settingName: 'BlowerCycleNegativeTime',
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
            groupName: 'manifold',
            groupLabel: 'Manifold Control',
            groupTitle: 'Manifold Settings',
            groupSettings: [
              {
                  settingName: 'PosDirPressureSetpointMin',
                  settingLabel: 'Primary Blowers Positive Pressure Setpoint Min',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'PosDirPressureSetpointMax',
                  settingLabel: 'Primary Blowers Positive Pressure Setpoint Max',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'NegDirPressureSetpointMin',
                  settingLabel: 'Primary Blowers Negative Pressure Setpoint Min',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'NegDirPressureSetpointMax',
                  settingLabel: 'Primary Blowers Negative Pressure Setpoint Max',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
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
                  settingName: 'BiofilterForcePositiveTemperature',
                  settingLabel: 'Biofilter Force Positive Temperature',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200
              },
              {
                  settingName: 'PrimaryPadPosDirectionTempSetPoint',
                  settingLabel: 'Primary Pads Positive Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200
              },
              {
                  settingName: 'PrimaryPadNegDirectionTempSetPoint',
                  settingLabel: 'Primary Pads Negative Direction Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 200
              },
              {
                  settingName: 'PressureSetpointMin',
                  settingLabel: 'Secondary Blowers Pressure Setpoint Min',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
              {
                  settingName: 'PressureSetpointMax',
                  settingLabel: 'Secondary Blowers Pressure Setpoint Max',
                  settingUnit: 'Inches',
                  settingType: 'number',
                  settingIncrementStep: .1,
                  settingMin: 1,
                  settingMax: 24
              },
            ]
        },
        {
            groupName: 'mister',
            groupLabel: 'Mister Control',
            groupTitle: 'Mister Settings',
            groupSettings: [
              {
                  settingName: 'MisterRelayType',
                  settingLabel: 'Mister Relay Type',
                  settingType: 'string',
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
              },
              {
                  settingName: 'MisterP7PosTempSetPoint',
                  settingLabel: 'Mister P7 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP7NegTempSetPoint',
                  settingLabel: 'Mister P7 Negative Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
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
                    settingName: 'Zone25ProbeAPointID',
                    settingLabel: 'Zone P7A Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone25ProbeBPointID',
                    settingLabel: 'Zone P7A Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone26ProbeAPointID',
                    settingLabel: 'Zone P7B Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone26ProbeBPointID',
                    settingLabel: 'Zone P7B Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone27ProbeAPointID',
                    settingLabel: 'Zone S7A-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone27ProbeBPointID',
                    settingLabel: 'Zone S7A-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone28ProbeAPointID',
                    settingLabel: 'Zone S7B-1Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone28ProbeBPointID',
                    settingLabel: 'Zone S7B-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'BiofilterP7ProbeAPointID',
                    settingLabel: 'Biofilter P7 Temp',
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
            groupName: 'ZoneTemps',
            groupLabel: 'Zone Temps',
            groupInputs: [
                {
                    inputName: 'zone25pAlvtemp',
                    inputLabel: 'Zone P7A Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone25pBlvtemp',
                    inputLabel: 'Zone P7A Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone26pAlvtemp',
                    inputLabel: 'Zone P7B Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone26pBlvtemp',
                    inputLabel: 'Zone P7B Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone27pAlvtemp',
                    inputLabel: 'Zone S7A-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone27pBlvtemp',
                    inputLabel: 'Zone S7A-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone28pAlvtemp',
                    inputLabel: 'Zone S7B-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone28pBlvtemp',
                    inputLabel: 'Zone S7B-2 Temp',
                    inputUnit: temperatureUnit
                }
            ]
        },
        {
            groupName: 'ZoneDampers',
            groupLabel: 'Zone Dampers',
            groupInputs: [
                {
                    inputName: 'damperP7Aposition',
                    inputLabel: 'Damper P7A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP7Bposition',
                    inputLabel: 'Damper P7B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS7Aposition',
                    inputLabel: 'Damper S7A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS7Bposition',
                    inputLabel: 'Damper S7B Position',
                    inputUnit: '%'
                }
            ]
        },
        {
            groupName: 'Blowers',
            groupLabel: 'Blowers',
            groupInputs: [
                {
                    inputName: 'blowerP7run',
                    inputLabel: 'Blower P7 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerS7run',
                    inputLabel: 'Blower S7 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerP7fault',
                    inputLabel: 'Blower P7 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerS7fault',
                    inputLabel: 'Blower S7 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerP7speed',
                    inputLabel: 'Blower P7 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerS7speed',
                    inputLabel: 'Blower S7 Speed',
                    inputUnit: '%'
                }
            ]
        },
        {
            groupName: 'Manifolds',
            groupLabel: 'Manifolds',
            groupInputs: [
                {
                  inputName: 'biofilterP7pAlvtemp',
                  inputLabel: 'Biofilter P7 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaustP7temp',
                  inputLabel: 'Exhaust P7 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'ductP7pospressure',
                  inputLabel: 'Duct P7 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP7negpressure',
                  inputLabel: 'Duct P7 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductS7pressure',
                  inputLabel: 'Duct S7 Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'blowerP7revdamper',
                  inputLabel: 'Blower P7 Reverse Damper Position'
                },
                {
                  inputName: 'ductP7mister',
                  inputLabel: 'Duct P7 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                }
            ]
        }
    ]
}
