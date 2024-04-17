
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.53',
    dbPath: '',
    overrideDisabledSettings: false,
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    hasLoadZoneFeature: true,
    displayPFRPTime: true,
    hasReversingLogicOptions: true,
    hasLocationalRegimeControl: true,
    layoutType: 'card',
    zoneProbeIds: ['A', 'B'],
    zoneTempALabel: 'Top',
    zoneTempBLabel: 'Bottom',
    IORegList: [
      "duct01presssptimer",
      "duct02presssptimer",
      "duct03presssptimer",
      "duct04presssptimer",
      "duct01pressureavg",
      "duct02pressureavg",
      "duct03pressureavg",
      "duct04pressureavg",
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
      "duct01pospressure",
      "duct02pospressure",
      "duct03pospressure",
      "duct04pospressure",
      "duct01negpressure",
      "duct02negpressure",
      "duct03negpressure",
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
      "duct01mistercontrol",
      "duct02mistercontrol",
      "duct03mistercontrol",
      "duct04mistercontrol",
      "duct01misteroverride",
      "duct02misteroverride",
      "duct03misteroverride",
      "duct04misteroverride",
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
      "blower01cycle",
      "blower02cycle",
      "blower03cycle",
      "blower04cycle",
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
      "blower01revlogic",
      "blower02revlogic",
      "blower03revlogic",
      "blower04revlogic",
      "ambient01temp",
      "ambient02temp",
      "ambient03temp",
      "ambient04temp",
      "ambient01lvtemp",
      "ambient02lvtemp",
      "ambient03lvtemp",
      "ambient04lvtemp",
      "ambient01tempage",
      "ambient02tempage",
      "ambient03tempage",
      "ambient04tempage",
      "ambient01avgtemp",
      "ambient02avgtemp",
      "ambient03avgtemp",
      "ambient04avgtemp",
      "exhaust01temp",
      "exhaust02temp",
      "exhaust03temp",
      "exhaust04temp",
      "exhaust01lvtemp",
      "exhaust02lvtemp",
      "exhaust03lvtemp",
      "exhaust04lvtemp",
      "exhaust01tempage",
      "exhaust02tempage",
      "exhaust03tempage",
      "exhaust04tempage",
      "exhaust01avgtemp",
      "exhaust02avgtemp",
      "exhaust03avgtemp",
      "exhaust04avgtemp",
      "biofilter01lvtemp",
      "biofilter02lvtemp",
      "biofilter03lvtemp",
      "biofilter04lvtemp",
      "biofilter01tempage",
      "biofilter02tempage",
      "biofilter03tempage",
      "biofilter04tempage",
      "biofilter01avgtemp",
      "biofilter02avgtemp",
      "biofilter03avgtemp",
      "biofilter04avgtemp",
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
      "damper17position",
      "damper18position",
      "damper19position",
      "damper20position",
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
      "damper17override",
      "damper18override",
      "damper19override",
      "damper20override",
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
      "damper17value",
      "damper18value",
      "damper19value",
      "damper20value",
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
      "zone17pAlvtemp",
      "zone17pBlvtemp",
      "zone18pAlvtemp",
      "zone18pBlvtemp",
      "zone19pAlvtemp",
      "zone19pBlvtemp",
      "zone20pAlvtemp",
      "zone20pBlvtemp",
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
      "zone17pAtempage",
      "zone17pBtempage",
      "zone18pAtempage",
      "zone18pBtempage",
      "zone19pAtempage",
      "zone19pBtempage",
      "zone20pAtempage",
      "zone20pBtempage",
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
      "zone17pAavgtemp",
      "zone17pBavgtemp",
      "zone18pAavgtemp",
      "zone18pBavgtemp",
      "zone19pAavgtemp",
      "zone19pBavgtemp",
      "zone20pAavgtemp",
      "zone20pBavgtemp",
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
      "zone17moveto",
      "zone18moveto",
      "zone19moveto",
      "zone20moveto",
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
      "zone15movedfrom",
      "zone16movedfrom",
      "zone17movedfrom",
      "zone18movedfrom",
      "zone19movedfrom",
      "zone20movedfrom",
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
      "zone17control",
      "zone18control",
      "zone19control",
      "zone20control",
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
      "zone17regime",
      "zone18regime",
      "zone19regime",
      "zone20regime",
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
      "zone17regtimer",
      "zone18regtimer",
      "zone19regtimer",
      "zone20regtimer",
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
      "zone17reset",
      "zone18reset",
      "zone19reset",
      "zone20reset",
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
      "zone17print",
      "zone18print",
      "zone19print",
      "zone20print",
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
      "zone17avgdamper",
      "zone18avgdamper",
      "zone19avgdamper",
      "zone20avgdamper",
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
      "zone17avgtimer",
      "zone18avgtimer",
      "zone19avgtimer",
      "zone20avgtimer",
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
      "zone15pfrptime",
      "zone16pfrptime",
      "zone17pfrptime",
      "zone18pfrptime",
      "zone19pfrptime",
      "zone20pfrptime",
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
      "loadzone17active",
      "loadzone18active",
      "loadzone19active",
      "loadzone20active",
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
                hasBiofilterTempSensor: true,
                hasMisterControl: true
            },
            groupZones: [
                {
                    zoneId: '01',
                    zoneLabel: 'P1',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '02',
                    zoneLabel: 'P2',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '03',
                    zoneLabel: 'P3',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '04',
                    zoneLabel: 'P4',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '05',
                    zoneLabel: 'P5',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '03',
                blowerLabel: 'Blower S1',
                hasAerationReversingControl: true,
                hasCustomCycleControl: false,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasMisterControl: true
            },
            groupZones: [
                {
                    zoneId: '11',
                    zoneLabel: 'S1',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '12',
                    zoneLabel: 'S2',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '13',
                    zoneLabel: 'S3',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '14',
                    zoneLabel: 'S4',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '15',
                    zoneLabel: 'S5',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '04',
                blowerLabel: 'Blower P2',
                hasAerationReversingControl: true,
                hasCustomCycleControl: false,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasMisterControl: true
            },
            groupZones: [
                {
                    zoneId: '16',
                    zoneLabel: 'P6',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '17',
                    zoneLabel: 'P7',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '18',
                    zoneLabel: 'P8',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '19',
                    zoneLabel: 'P9',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '20',
                    zoneLabel: 'P10',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower S2',
                hasAerationReversingControl: true,
                hasCustomCycleControl: false,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasMisterControl: true
            },
            groupZones: [
                {
                    zoneId: '06',
                    zoneLabel: 'S6',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '07',
                    zoneLabel: 'S7',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '08',
                    zoneLabel: 'S8',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '09',
                    zoneLabel: 'S9',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '10',
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
                    settingLabel: 'Zones P1 - P5 Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower01NegDirectionTempSetPoint',
                    settingLabel: 'Zones P1 - P5 Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower02PosDirectionTempSetPoint',
                    settingLabel: 'Zones S6 - S10 Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower02NegDirectionTempSetPoint',
                    settingLabel: 'Zones S6 - S10 Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower03PosDirectionTempSetPoint',
                    settingLabel: 'Zones S11 - S15 Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower03NegDirectionTempSetPoint',
                    settingLabel: 'Zones S11 - S15 Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower04PosDirectionTempSetPoint',
                    settingLabel: 'Zones P6 - P10 Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Blower04NegDirectionTempSetPoint',
                    settingLabel: 'Zones P6 - P10 Negative Aeration Setpoint',
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
                    settingLabel: 'Duct P1 Mister Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister02PosTempSetPoint',
                    settingLabel: 'Duct S2 Mister Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister02NegTempSetPoint',
                    settingLabel: 'Duct S2 Mister Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister03PosTempSetPoint',
                    settingLabel: 'Duct S1 Mister Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister03NegTempSetPoint',
                    settingLabel: 'Duct S1 Mister Negative Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister04PosTempSetPoint',
                    settingLabel: 'Duct P2 Mister Positive Aeration Setpoint',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
                },
                {
                    settingName: 'Mister04NegTempSetPoint',
                    settingLabel: 'Duct P2 Mister Negative Aeration Setpoint',
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
                    settingName: 'Zone01ProbeAPointID',
                    settingLabel: 'Zone P1 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeBPointID',
                    settingLabel: 'Zone P1 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone P2 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeBPointID',
                    settingLabel: 'Zone P2 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeAPointID',
                    settingLabel: 'Zone P3 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeBPointID',
                    settingLabel: 'Zone P3 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeAPointID',
                    settingLabel: 'Zone P4 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeBPointID',
                    settingLabel: 'Zone P4 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
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
                    settingLabel: 'Zone S6 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeBPointID',
                    settingLabel: 'Zone S6 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeAPointID',
                    settingLabel: 'Zone S7 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeBPointID',
                    settingLabel: 'Zone S7 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeAPointID',
                    settingLabel: 'Zone S8 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeBPointID',
                    settingLabel: 'Zone S8 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeAPointID',
                    settingLabel: 'Zone S9 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeBPointID',
                    settingLabel: 'Zone S9 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeAPointID',
                    settingLabel: 'Zone S10 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeBPointID',
                    settingLabel: 'Zone S10 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone11ProbeAPointID',
                    settingLabel: 'Zone S1 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone11ProbeBPointID',
                    settingLabel: 'Zone S1 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone12ProbeAPointID',
                    settingLabel: 'Zone S2 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone12ProbeBPointID',
                    settingLabel: 'Zone S2 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone13ProbeAPointID',
                    settingLabel: 'Zone S3 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone13ProbeBPointID',
                    settingLabel: 'Zone S3 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone14ProbeAPointID',
                    settingLabel: 'Zone S4 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone14ProbeBPointID',
                    settingLabel: 'Zone S4 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone15ProbeAPointID',
                    settingLabel: 'Zone S5 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone15ProbeBPointID',
                    settingLabel: 'Zone S5 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone16ProbeAPointID',
                    settingLabel: 'Zone P6 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone16ProbeBPointID',
                    settingLabel: 'Zone P6 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone17ProbeAPointID',
                    settingLabel: 'Zone P7 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone17ProbeBPointID',
                    settingLabel: 'Zone P7 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone18ProbeAPointID',
                    settingLabel: 'Zone P8 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone18ProbeBPointID',
                    settingLabel: 'Zone P8 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone19ProbeAPointID',
                    settingLabel: 'Zone P9 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone19ProbeBPointID',
                    settingLabel: 'Zone P9 Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone20ProbeAPointID',
                    settingLabel: 'Zone P10 Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone20ProbeBPointID',
                    settingLabel: 'Zone P10 Bottom Temp',
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
                    settingLabel: 'Biofilter S2 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter03ProbePointID',
                    settingLabel: 'Biofilter S1 Probe',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Biofilter04ProbePointID',
                    settingLabel: 'Biofilter P2 Probe',
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
                    inputName: 'zone01pAlvtemp',
                    inputLabel: 'Zone P1 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pBlvtemp',
                    inputLabel: 'Zone P1 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAlvtemp',
                    inputLabel: 'Zone P2 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBlvtemp',
                    inputLabel: 'Zone P2 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAlvtemp',
                    inputLabel: 'Zone P3 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pBlvtemp',
                    inputLabel: 'Zone P3 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAlvtemp',
                    inputLabel: 'Zone P4 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pBlvtemp',
                    inputLabel: 'Zone P4 Bottom Temp',
                    inputUnit: temperatureUnit
                },
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
                    inputLabel: 'Zone S6 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pBlvtemp',
                    inputLabel: 'Zone S6 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pAlvtemp',
                    inputLabel: 'Zone S7 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pBlvtemp',
                    inputLabel: 'Zone S7 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pAlvtemp',
                    inputLabel: 'Zone S8 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pBlvtemp',
                    inputLabel: 'Zone S8 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pAlvtemp',
                    inputLabel: 'Zone S9 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pBlvtemp',
                    inputLabel: 'Zone S9 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pAlvtemp',
                    inputLabel: 'Zone S10 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pBlvtemp',
                    inputLabel: 'Zone S10 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pAlvtemp',
                    inputLabel: 'Zone S1 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pBlvtemp',
                    inputLabel: 'Zone S1 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone12pAlvtemp',
                    inputLabel: 'Zone S2 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone12pBlvtemp',
                    inputLabel: 'Zone S2 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pAlvtemp',
                    inputLabel: 'Zone S3 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pBlvtemp',
                    inputLabel: 'Zone S3 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pAlvtemp',
                    inputLabel: 'Zone S4 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pBlvtemp',
                    inputLabel: 'Zone S4 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone15pAlvtemp',
                    inputLabel: 'Zone S5 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone15pBlvtemp',
                    inputLabel: 'Zone S5 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone16pAlvtemp',
                    inputLabel: 'Zone P6 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone16pBlvtemp',
                    inputLabel: 'Zone P6 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone17pAlvtemp',
                    inputLabel: 'Zone P7 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone17pBlvtemp',
                    inputLabel: 'Zone P7 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone18pAlvtemp',
                    inputLabel: 'Zone P8 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone18pBlvtemp',
                    inputLabel: 'Zone P8 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone19pAlvtemp',
                    inputLabel: 'Zone P9 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone19pBlvtemp',
                    inputLabel: 'Zone P9 Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone20pAlvtemp',
                    inputLabel: 'Zone P10 Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone20pBlvtemp',
                    inputLabel: 'Zone P10 Bottom Temp',
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
                    inputLabel: 'Damper P1 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper02position',
                    inputLabel: 'Damper P2 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper03position',
                    inputLabel: 'Damper P3 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper04position',
                    inputLabel: 'Damper P4 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper05position',
                    inputLabel: 'Damper P5 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper06position',
                    inputLabel: 'Damper S6 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper07position',
                    inputLabel: 'Damper S7 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper08position',
                    inputLabel: 'Damper S8 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper09position',
                    inputLabel: 'Damper S9 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper10position',
                    inputLabel: 'Damper S10 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper11position',
                    inputLabel: 'Damper S1 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper12position',
                    inputLabel: 'Damper S2 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper13position',
                    inputLabel: 'Damper S3 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper14position',
                    inputLabel: 'Damper S4 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper15position',
                    inputLabel: 'Damper S5 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper16position',
                    inputLabel: 'Damper P6 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper17position',
                    inputLabel: 'Damper P7 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper18position',
                    inputLabel: 'Damper P8 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper19position',
                    inputLabel: 'Damper P9 Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damper20position',
                    inputLabel: 'Damper P10 Position',
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
                    inputLabel: 'Blower S2 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower03run',
                    inputLabel: 'Blower S1 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower04run',
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
                    inputLabel: 'Blower S2 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower03fault',
                    inputLabel: 'Blower S1 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blower04fault',
                    inputLabel: 'Blower P2 Fault',
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
                    inputLabel: 'Blower S2 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower03speed',
                    inputLabel: 'Blower S1 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blower04speed',
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
                  inputName: 'biofilter01lvtemp',
                  inputLabel: 'Biofilter P1 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilter02lvtemp',
                  inputLabel: 'Biofilter S2 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilter03lvtemp',
                  inputLabel: 'Biofilter S1 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilter04lvtemp',
                  inputLabel: 'Biofilter P2 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust01temp',
                  inputLabel: 'Exhaust P1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust02temp',
                  inputLabel: 'Exhaust S2 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust03temp',
                  inputLabel: 'Exhaust S1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaust04temp',
                  inputLabel: 'Exhaust P2 Temp',
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
                  inputLabel: 'Duct S2 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct02negpressure',
                  inputLabel: 'Duct S2 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct03pospressure',
                  inputLabel: 'Duct S1 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct03negpressure',
                  inputLabel: 'Duct S1 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct04pospressure',
                  inputLabel: 'Duct P2 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'duct04negpressure',
                  inputLabel: 'Duct P2 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'blower01revdamper',
                  inputLabel: 'Blower P1 Reverse Damper Position'
                },
                {
                  inputName: 'blower02revdamper',
                  inputLabel: 'Blower S2 Reverse Damper Position'
                },
                {
                  inputName: 'blower03revdamper',
                  inputLabel: 'Blower S1 Reverse Damper Position'
                },
                {
                  inputName: 'blower04revdamper',
                  inputLabel: 'Blower P2 Reverse Damper Position'
                }
            ]
        }
    ]
}
