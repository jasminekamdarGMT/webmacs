
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.42',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    hasLoadZoneFeature: true,
    displayPFRPTime: true,
    hasReversingLogicOptions: true,
    layoutType: 'card',
    zoneProbeIds: ['A', 'B'],
    zoneTempALabel: 'Top',
    zoneTempBLabel: 'Bottom',
    IORegList: [
      "duct01presssptimer",
      "duct02presssptimer",
      "duct01pressureavg",
      "duct02pressureavg",
      "duct01pressuresp",
      "duct02pressuresp",
      "duct01pospressuresp",
      "duct02pospressuresp",
      "duct01negpressuresp",
      "duct02negpressuresp",
      "duct01pospressure",
      "duct02pospressure",
      "duct01negpressure",
      "duct02negpressure",
      "duct01pospressureavg",
      "duct02pospressureavg",
      "duct01negpressureavg",
      "duct02negpressureavg",
      "duct01mister",
      "duct02mister",
      "duct01mistertimer",
      "duct02mistertimer",
      "duct01mistercontrol",
      "duct02mistercontrol",
      "duct01misteroverride",
      "duct02misteroverride",
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
      "blower01revtimer",
      "blower02revtimer",
      "blower01revlogic",
      "blower02revlogic",
      "premister01temp",
      "premister02temp",
      "premister01lvtemp",
      "premister02lvtemp",
      "premister01tempage",
      "premister02tempage",
      "premister01avgtemp",
      "premister02avgtemp",
      "exhaust01temp",
      "exhaust02temp",
      "exhaust01lvtemp",
      "exhaust02lvtemp",
      "exhaust01tempage",
      "exhaust02tempage",
      "exhaust01avgtemp",
      "exhaust02avgtemp",
      "biofilter01lvtemp",
      "biofilter02lvtemp",
      "biofilter01tempage",
      "biofilter02tempage",
      "biofilter01avgtemp",
      "biofilter02avgtemp",
      "damper05position",
      "damper06position",
      "damper07position",
      "damper08position",
      "damper09position",
      "damper10position",
      "damper17position",
      "damper18position",
      "damper19position",
      "damper20position",
      "damper21position",
      "damper22position",
      "damper05override",
      "damper06override",
      "damper07override",
      "damper08override",
      "damper09override",
      "damper10override",
      "damper17override",
      "damper18override",
      "damper19override",
      "damper20override",
      "damper21override",
      "damper22override",
      "damper05value",
      "damper06value",
      "damper07value",
      "damper08value",
      "damper09value",
      "damper10value",
      "damper17value",
      "damper18value",
      "damper19value",
      "damper20value",
      "damper21value",
      "damper22value",
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
      "zone17pAlvtemp",
      "zone17pBlvtemp",
      "zone18pAlvtemp",
      "zone18pBlvtemp",
      "zone19pAlvtemp",
      "zone19pBlvtemp",
      "zone20pAlvtemp",
      "zone20pBlvtemp",
      "zone21pAlvtemp",
      "zone21pBlvtemp",
      "zone22pAlvtemp",
      "zone22pBlvtemp",
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
      "zone17pAtempage",
      "zone17pBtempage",
      "zone18pAtempage",
      "zone18pBtempage",
      "zone19pAtempage",
      "zone19pBtempage",
      "zone20pAtempage",
      "zone20pBtempage",
      "zone21pAtempage",
      "zone21pBtempage",
      "zone22pAtempage",
      "zone22pBtempage",
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
      "zone17pAavgtemp",
      "zone17pBavgtemp",
      "zone18pAavgtemp",
      "zone18pBavgtemp",
      "zone19pAavgtemp",
      "zone19pBavgtemp",
      "zone20pAavgtemp",
      "zone20pBavgtemp",
      "zone21pAavgtemp",
      "zone21pBavgtemp",
      "zone22pAavgtemp",
      "zone22pBavgtemp",
      "zone05moveto",
      "zone06moveto",
      "zone07moveto",
      "zone08moveto",
      "zone09moveto",
      "zone10moveto",
      "zone17moveto",
      "zone18moveto",
      "zone19moveto",
      "zone20moveto",
      "zone21moveto",
      "zone22moveto",
      "zone05movedfrom",
      "zone06movedfrom",
      "zone07movedfrom",
      "zone08movedfrom",
      "zone09movedfrom",
      "zone10movedfrom",
      "zone17movedfrom",
      "zone18movedfrom",
      "zone19movedfrom",
      "zone20movedfrom",
      "zone21movedfrom",
      "zone22movedfrom",
      "zone05control",
      "zone06control",
      "zone07control",
      "zone08control",
      "zone09control",
      "zone10control",
      "zone17control",
      "zone18control",
      "zone19control",
      "zone20control",
      "zone21control",
      "zone22control",
      "zone05regime",
      "zone06regime",
      "zone07regime",
      "zone08regime",
      "zone09regime",
      "zone10regime",
      "zone17regime",
      "zone18regime",
      "zone19regime",
      "zone20regime",
      "zone21regime",
      "zone22regime",
      "zone05regtimer",
      "zone06regtimer",
      "zone07regtimer",
      "zone08regtimer",
      "zone09regtimer",
      "zone10regtimer",
      "zone17regtimer",
      "zone18regtimer",
      "zone19regtimer",
      "zone20regtimer",
      "zone21regtimer",
      "zone22regtimer",
      "zone05reset",
      "zone06reset",
      "zone07reset",
      "zone08reset",
      "zone09reset",
      "zone10reset",
      "zone17reset",
      "zone18reset",
      "zone19reset",
      "zone20reset",
      "zone21reset",
      "zone22reset",
      "zone05print",
      "zone06print",
      "zone07print",
      "zone08print",
      "zone09print",
      "zone10print",
      "zone17print",
      "zone18print",
      "zone19print",
      "zone20print",
      "zone21print",
      "zone22print",
      "zone05avgdamper",
      "zone06avgdamper",
      "zone07avgdamper",
      "zone08avgdamper",
      "zone09avgdamper",
      "zone10avgdamper",
      "zone17avgdamper",
      "zone18avgdamper",
      "zone19avgdamper",
      "zone20avgdamper",
      "zone21avgdamper",
      "zone22avgdamper",
      "zone05avgtimer",
      "zone06avgtimer",
      "zone07avgtimer",
      "zone08avgtimer",
      "zone09avgtimer",
      "zone10avgtimer",
      "zone17avgtimer",
      "zone18avgtimer",
      "zone19avgtimer",
      "zone20avgtimer",
      "zone21avgtimer",
      "zone22avgtimer",
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
                blowerLabel: 'Blower P1',
                hasAerationReversingControl: true,
                hasCustomCycleControl: false,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true
            },
            groupZones: [
                {
                    zoneId: '05',
                    zoneLabel: 'P5',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '06',
                    zoneLabel: 'P6',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '07',
                    zoneLabel: 'P7',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '08',
                    zoneLabel: 'P8',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '09',
                    zoneLabel: 'P9',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '10',
                    zoneLabel: 'P10',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower S1',
                hasAerationReversingControl: true,
                hasCustomCycleControl: false,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true
            },
            groupZones: [
              {
                  zoneId: '17',
                  zoneLabel: 'S5',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '18',
                  zoneLabel: 'S6',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '19',
                  zoneLabel: 'S7',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '20',
                  zoneLabel: 'S8',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '21',
                  zoneLabel: 'S9',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '22',
                  zoneLabel: 'S10',
                  setpointSettingName: 'RegimeXTempSetPoint',
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
            groupName: 'zone',
            groupLabel: 'Zone Control',
            groupTitle: 'Zone Settings',
            groupSettings: [
                {
                    settingName: 'Blower01PosDirectionTempSetPoint',
                    settingLabel: 'Zones P5 - P10 Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower01NegDirectionTempSetPoint',
                    settingLabel: 'Zones P5 - P10 Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower02PosDirectionTempSetPoint',
                    settingLabel: 'Zones S5 - S10 Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower02NegDirectionTempSetPoint',
                    settingLabel: 'Zones S5 - S10 Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                }
            ]
        },
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
                    settingName: 'PosDirPressureSetpointMin',
                    settingLabel: 'Positive Aeration Direction Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'PosDirPressureSetpointMax',
                    settingLabel: 'Positive Aeration Direction Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'NegDirPressureSetpointMin',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
                },
                {
                    settingName: 'NegDirPressureSetpointMax',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 20
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
                    settingMax: 120
                },
                {
                    settingName: 'BlowerCyclePositiveTime',
                    settingLabel: 'Blower Cycle Positive Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 30,
                    settingMax: 1440
                },
                {
                    settingName: 'BlowerCycleNegativeTime',
                    settingLabel: 'Blower Cycle Negative Aeration Timer',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingIncrementStep: 1,
                    settingMin: 30,
                    settingMax: 1440
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
            groupName: 'mister',
            groupLabel: 'Mister Control',
            groupTitle: 'Mister Settings',
            groupSettings: [
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
                    settingName: 'Mister01PosTempSetPoint',
                    settingLabel: 'Duct P1 Mister Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister01NegTempSetPoint',
                    settingLabel: 'Duct P1 Negative Aeration Mister On Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister02PosTempSetPoint',
                    settingLabel: 'Duct S1 Mister Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister02NegTempSetPoint',
                    settingLabel: 'Duct S1 Negative Aeration Mister On Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
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
                    settingName: 'Zone05ProbeAPointID',
                    settingLabel: 'Zone P5 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeBPointID',
                    settingLabel: 'Zone P5 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeAPointID',
                    settingLabel: 'Zone P6 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeBPointID',
                    settingLabel: 'Zone P6 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeAPointID',
                    settingLabel: 'Zone P7 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeBPointID',
                    settingLabel: 'Zone P7 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeAPointID',
                    settingLabel: 'Zone P8 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeBPointID',
                    settingLabel: 'Zone P8 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeAPointID',
                    settingLabel: 'Zone P9 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeBPointID',
                    settingLabel: 'Zone P9 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeAPointID',
                    settingLabel: 'Zone P10 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeBPointID',
                    settingLabel: 'Zone P10 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone17ProbeAPointID',
                    settingLabel: 'Zone S5 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone17ProbeBPointID',
                    settingLabel: 'Zone S5 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone18ProbeAPointID',
                    settingLabel: 'Zone S6 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone18ProbeBPointID',
                    settingLabel: 'Zone S6 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone19ProbeAPointID',
                    settingLabel: 'Zone S7 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone19ProbeBPointID',
                    settingLabel: 'Zone S7 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone20ProbeAPointID',
                    settingLabel: 'Zone S8 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone20ProbeBPointID',
                    settingLabel: 'Zone S8 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone21ProbeAPointID',
                    settingLabel: 'Zone S9 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone21ProbeBPointID',
                    settingLabel: 'Zone S9 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone22ProbeAPointID',
                    settingLabel: 'Zone S10 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone22ProbeBPointID',
                    settingLabel: 'Zone S10 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter01ProbePointID',
                    settingLabel: 'Biofilter P1 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter02ProbePointID',
                    settingLabel: 'Biofilter S1 Probe',
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
                    settingMin: 0,
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
                    inputName: 'zone05pAlvtemp',
                    inputLabel: 'Zone P5 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pBlvtemp',
                    inputLabel: 'Zone P5 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pAlvtemp',
                    inputLabel: 'Zone P6 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pBlvtemp',
                    inputLabel: 'Zone P6 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pAlvtemp',
                    inputLabel: 'Zone P7 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pBlvtemp',
                    inputLabel: 'Zone P7 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pAlvtemp',
                    inputLabel: 'Zone P8 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pBlvtemp',
                    inputLabel: 'Zone P8 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pAlvtemp',
                    inputLabel: 'Zone P9 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pBlvtemp',
                    inputLabel: 'Zone P9 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pAlvtemp',
                    inputLabel: 'Zone P10 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pBlvtemp',
                    inputLabel: 'Zone P10 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone17pAlvtemp',
                    inputLabel: 'Zone S5 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone17pBlvtemp',
                    inputLabel: 'Zone S5 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone18pAlvtemp',
                    inputLabel: 'Zone S6 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone18pBlvtemp',
                    inputLabel: 'Zone S6 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone19pAlvtemp',
                    inputLabel: 'Zone S7 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone19pBlvtemp',
                    inputLabel: 'Zone S7 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone20pAlvtemp',
                    inputLabel: 'Zone S8 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone20pBlvtemp',
                    inputLabel: 'Zone S8 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone21pAlvtemp',
                    inputLabel: 'Zone S9 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone21pBlvtemp',
                    inputLabel: 'Zone S9 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone22pAlvtemp',
                    inputLabel: 'Zone S10 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone22pBlvtemp',
                    inputLabel: 'Zone S10 Bottom Temp',
                    inputUnit: temperatureUnit
                }
            ]
        },
        {
            groupName: 'ZoneDampers',
            groupLabel: 'Zone Dampers',
            groupInputs: [
                {
                    inputName: 'damper05position',
                    inputLabel: 'Damper P5 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper06position',
                    inputLabel: 'Damper P6 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper07position',
                    inputLabel: 'Damper P7 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper08position',
                    inputLabel: 'Damper P8 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper09position',
                    inputLabel: 'Damper P9 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper10position',
                    inputLabel: 'Damper P10 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper17position',
                    inputLabel: 'Damper S5 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper18position',
                    inputLabel: 'Damper S6 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper19position',
                    inputLabel: 'Damper S7 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper20position',
                    inputLabel: 'Damper S8 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper21position',
                    inputLabel: 'Damper S9 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper22position',
                    inputLabel: 'Damper S10 Position',
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
                    inputLabel: 'Blower S1 Run',
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
                    inputLabel: 'Blower S1 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower01speed',
                    inputLabel: 'Blower P1 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower02speed',
                    inputLabel: 'Blower S1 Speed',
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
                  inputLabel: 'Biofilter P1 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilter02lvtemp',
                  inputLabel: 'Biofilter S1 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust01temp',
                  inputLabel: 'Exhaust P1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust02temp',
                  inputLabel: 'Exhaust S1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'duct01pospressure',
                  inputLabel: 'Duct P1 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct01negpressure',
                  inputLabel: 'Duct P1 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02pospressure',
                  inputLabel: 'Duct S1 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02negpressure',
                  inputLabel: 'Duct S1 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'blower01revdamper',
                  inputLabel: 'Blower P1 Reverse Damper Position'
                },
                {
                  inputName: 'blower02revdamper',
                  inputLabel: 'Blower S1 Reverse Damper Position'
                }
            ]
        }
    ]
}
