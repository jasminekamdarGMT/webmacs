
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.39',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    logFilesPerPage: 16,
    hasLoadZoneFeature: true,
    displayPFRPTime: true,
    canEditRegime: false,
    showMap: false,
    defaultPage: 'status',
    layoutType: 'card',
    zoneProbeIds: ['A', 'B'],
    zoneTempALabel: 'Temp A',
    zoneTempBLabel: 'Temp B',
    IORegList: [
      "duct01presssptimer",
      "duct02presssptimer",
      "duct03presssptimer",
      "duct04presssptimer",
      "duct01pressuresp",
      "duct02pressuresp",
      "duct03pressuresp",
      "duct04pressuresp",
      "duct01pospressuresp",
      "duct02pospressuresp",
      "duct03pospressuresp",
      "duct04pospressuresp",
      "duct01negpressuresp",
      "duct02negpressuresp",
      "duct03negpressuresp",
      "duct04negpressuresp",
      "duct01pressureavg",
      "duct02pressureavg",
      "duct03pressureavg",
      "duct04pressureavg",
      "duct01pospressure",
      "duct01negpressure",
      "duct02pospressure",
      "duct02negpressure",
      "duct03pospressure",
      "duct03negpressure",
      "duct04pospressure",
      "duct04negpressure",
      "duct01pospressureavg",
      "duct02pospressureavg",
      "duct03pospressureavg",
      "duct04pospressureavg",
      "duct01negpressureavg",
      "duct02negpressureavg",
      "duct03negpressureavg",
      "duct04negpressureavg",
      "duct01mister",
      "duct02mister",
      "duct03mister",
      "duct04mister",
      "duct01mistertimer",
      "duct02mistertimer",
      "duct03mistertimer",
      "duct04mistertimer",
      "blower01run",
      "blower02run",
      "blower03run",
      "blower04run",
      "blower01fault",
      "blower02fault",
      "blower03fault",
      "blower04fault",
      "blower01cycle",
      "blower02cycle",
      "blower03cycle",
      "blower04cycle",
      "blower01speed",
      "blower02speed",
      "blower03speed",
      "blower04speed",
      "blower01prerevspeed",
      "blower02prerevspeed",
      "blower03prerevspeed",
      "blower04prerevspeed",
      "blower01control",
      "blower02control",
      "blower03control",
      "blower04control",
      "blower01override",
      "blower02override",
      "blower03override",
      "blower04override",
      "blower01value",
      "blower02value",
      "blower03value",
      "blower04value",
      "blower01revoverride",
      "blower02revoverride",
      "blower03revoverride",
      "blower04revoverride",
      "blower01direction",
      "blower02direction",
      "blower03direction",
      "blower04direction",
      "blower01revtimer",
      "blower02revtimer",
      "blower03revtimer",
      "blower04revtimer",
      "blower01idletimer",
      "blower02idletimer",
      "blower03idletimer",
      "blower04idletimer",
      "blower01revdamper",
      "blower02revdamper",
      "blower03revdamper",
      "blower04revdamper",
      "premister01temp",
      "premister02temp",
      "premister03temp",
      "premister04temp",
      "premister01lvtemp",
      "premister02lvtemp",
      "premister03lvtemp",
      "premister04lvtemp",
      "premister01tempage",
      "premister02tempage",
      "premister03tempage",
      "premister04tempage",
      "exhaust01temp",
      "exhaust02temp",
      "exhaust03temp",
      "exhaust04temp",
      "exhaust01lvtemp",
      "exhaust02lvtemp",
      "exhaust03lvtemp",
      "exhaust04lvtemp",
      "exhaust01avgtemp",
      "exhaust02avgtemp",
      "exhaust03avgtemp",
      "exhaust04avgtemp",
      "exhaust01tempage",
      "exhaust02tempage",
      "exhaust03tempage",
      "exhaust04tempage",
      "biofilter01temp",
      "biofilter02temp",
      "biofilter03temp",
      "biofilter04temp",
      "biofilter01lvtemp",
      "biofilter02lvtemp",
      "biofilter03lvtemp",
      "biofilter04lvtemp",
      "biofilter01avgtemp",
      "biofilter02avgtemp",
      "biofilter03avgtemp",
      "biofilter04avgtemp",
      "biofilter01tempage",
      "biofilter02tempage",
      "biofilter03tempage",
      "biofilter04tempage",
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
      "damper15position",
      "damper16position",
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
      "damper15override",
      "damper16override",
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
      "damper15value",
      "damper16value",
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
      "zone15pAtemp",
      "zone15pBtemp",
      "zone16pAtemp",
      "zone16pBtemp",
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
      "zone15pAlvtemp",
      "zone15pBlvtemp",
      "zone16pAlvtemp",
      "zone16pBlvtemp",
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
      "zone15pAavgtemp",
      "zone15pBavgtemp",
      "zone16pAavgtemp",
      "zone16pBavgtemp",
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
      "zone15pAtempage",
      "zone15pBtempage",
      "zone16pAtempage",
      "zone16pBtempage",
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
      "zone15moveto",
      "zone16moveto",
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
      "zone15control",
      "zone16control",
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
      "zone13regime",
      "zone14regime",
      "zone15regime",
      "zone16regime",
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
      "zone13regtimer",
      "zone14regtimer",
      "zone15regtimer",
      "zone16regtimer",
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
      "zone15reset",
      "zone16reset",
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
      "zone15print",
      "zone16print",
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
      "zone15avgdamper",
      "zone16avgdamper",
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
      "zone15avgtimer",
      "zone16avgtimer",
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
      "loadzone15active",
      "loadzone16active",
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
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasBiofilterTempSensor: true,
                hasExhaustTempSensor: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '01',
                    zoneLabel: '1',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '02',
                    zoneLabel: '2',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '03',
                    zoneLabel: '3',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '04',
                    zoneLabel: '4',
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
                hasBiofilterTempSensor: true,
                hasExhaustTempSensor: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '05',
                    zoneLabel: '5',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '06',
                    zoneLabel: '6',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '07',
                    zoneLabel: '7',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '08',
                    zoneLabel: '8',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '03',
                blowerLabel: 'Blower 3',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasBiofilterTempSensor: true,
                hasExhaustTempSensor: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '13',
                    zoneLabel: '13',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '14',
                    zoneLabel: '14',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '15',
                    zoneLabel: '15',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '16',
                    zoneLabel: '16',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '04',
                blowerLabel: 'Blower 4',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasBiofilterTempSensor: true,
                hasExhaustTempSensor: true,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '09',
                    zoneLabel: '9',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '10',
                    zoneLabel: '10',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '11',
                    zoneLabel: '11',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '12',
                    zoneLabel: '12',
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
                    settingMax: 15
                },
                {
                    settingName: 'PosDirPressureSetpointMax',
                    settingLabel: 'Positive Aeration Direction Pressure Setpoint Max',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 15
                },
                {
                    settingName: 'NegDirPressureSetpointMin',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Min',
                    settingUnit: 'Inches',
                    settingType: 'number',
                    settingIncrementStep: .1,
                    settingMin: 1,
                    settingMax: 15
                },
                {
                    settingName: 'NegDirPressureSetpointMax',
                    settingLabel: 'Negative Aeration Direction Pressure Setpoint Max',
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
                    settingName: 'Mister01PosTempSetPoint',
                    settingLabel: 'Mister 1 Positive Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister02PosTempSetPoint',
                    settingLabel: 'Mister 2 Positive Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister03PosTempSetPoint',
                    settingLabel: 'Mister 3 Positive Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister04PosTempSetPoint',
                    settingLabel: 'Mister 4 Positive Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister01NegHighTempSetPoint',
                    settingLabel: 'Mister 1 Negative High Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister02NegHighTempSetPoint',
                    settingLabel: 'Mister 2 Negative High Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister03NegHighTempSetPoint',
                    settingLabel: 'Mister 3 Negative High Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister04NegHighTempSetPoint',
                    settingLabel: 'Mister 4 Negative High Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister01NegLowTempSetPoint',
                    settingLabel: 'Mister 1 Negative Low Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister02NegLowTempSetPoint',
                    settingLabel: 'Mister 2 Negative Low Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister03NegLowTempSetPoint',
                    settingLabel: 'Mister 3 Negative Low Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Mister04NegLowTempSetPoint',
                    settingLabel: 'Mister 4 Negative Low Temp Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
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
                },
                {
                    settingName: 'Zone12ProbeAPointID',
                    settingLabel: 'Zone 12 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone12ProbeBPointID',
                    settingLabel: 'Zone 12 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone13ProbeAPointID',
                    settingLabel: 'Zone 13 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone13ProbeBPointID',
                    settingLabel: 'Zone 13 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone14ProbeAPointID',
                    settingLabel: 'Zone 14 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone14ProbeBPointID',
                    settingLabel: 'Zone 14 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone15ProbeAPointID',
                    settingLabel: 'Zone 15 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone15ProbeBPointID',
                    settingLabel: 'Zone 15 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone16ProbeAPointID',
                    settingLabel: 'Zone 16 Probe A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone16ProbeBPointID',
                    settingLabel: 'Zone 16 Probe B',
                    settingType: 'string',
                    settingDisabled: true
                },
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
                    settingName: 'Biofilter03ProbePointID',
                    settingLabel: 'Biofilter 3 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter04ProbePointID',
                    settingLabel: 'Biofilter 4 Probe',
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
            groupName: 'Zone1-16Temps',
            groupLabel: 'Zone 1-16 Temps',
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
                },
                {
                    inputName: 'zone12pAlvtemp',
                    inputLabel: 'Zone 12 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone12pBlvtemp',
                    inputLabel: 'Zone 12 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pAlvtemp',
                    inputLabel: 'Zone 13 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pBlvtemp',
                    inputLabel: 'Zone 13 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pAlvtemp',
                    inputLabel: 'Zone 14 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pBlvtemp',
                    inputLabel: 'Zone 14 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone15pAlvtemp',
                    inputLabel: 'Zone 15 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone15pBlvtemp',
                    inputLabel: 'Zone 15 Probe B',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone16pAlvtemp',
                    inputLabel: 'Zone 16 Probe A',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone16pBlvtemp',
                    inputLabel: 'Zone 16 Probe B',
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
                },
                {
                    inputName: 'damper15position',
                    inputLabel: 'Damper 15 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper16position',
                    inputLabel: 'Damper 16 Position',
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
                  inputName: 'biofilter03lvtemp',
                  inputLabel: 'Biofilter 3 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilter04lvtemp',
                  inputLabel: 'Biofilter 4 Last Valid Temp',
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
                  inputName: 'exhaust03temp',
                  inputLabel: 'Exhaust 3 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust04temp',
                  inputLabel: 'Exhaust 4 Temp',
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
                  inputName: 'duct02pressuresp',
                  inputLabel: 'Duct 2 Pressure Setpoint',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct03pospressure',
                  inputLabel: 'Duct 3 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct03negpressure',
                  inputLabel: 'Duct 3 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct03pressuresp',
                  inputLabel: 'Duct 3 Pressure Setpoint',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct04pospressure',
                  inputLabel: 'Duct 4 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct04negpressure',
                  inputLabel: 'Duct 4 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct04pressuresp',
                  inputLabel: 'Duct 4 Pressure Setpoint',
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
                  inputName: 'blower03revdamper',
                  inputLabel: 'Blower 3 Reverse Damper Position'
                },
                {
                  inputName: 'blower04revdamper',
                  inputLabel: 'Blower 4 Reverse Damper Position'
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
                },
                {
                  inputName: 'duct03mister',
                  inputLabel: 'Duct 3 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'duct04mister',
                  inputLabel: 'Duct 4 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                }
            ]
        }
    ]
}
