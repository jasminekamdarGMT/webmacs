
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.53',
    dbPath: '',
    temperatureUnit: temperatureUnit,
    defaultPage: 'modules',
    showMap: true,
    hasModuleSelect: true,
    logFilesPerPage: 24,
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
      "ductP1presssptimer",
      "ductP2presssptimer",
      "ductP3presssptimer",
      "ductP4presssptimer",
      "ductP5presssptimer",
      "ductP6presssptimer",
      "ductS1presssptimer",
      "ductS2presssptimer",
      "ductS3presssptimer",
      "ductP1pressuresp",
      "ductP2pressuresp",
      "ductP3pressuresp",
      "ductP4pressuresp",
      "ductP5pressuresp",
      "ductP6pressuresp",
      "ductS1pressuresp",
      "ductS2pressuresp",
      "ductS3pressuresp",
      "ductP1pressureavg",
      "ductP2pressureavg",
      "ductP3pressureavg",
      "ductP4pressureavg",
      "ductP5pressureavg",
      "ductP6pressureavg",
      "ductS1pressure",
      "ductS2pressure",
      "ductS3pressure",
      "ductS1pressureavg",
      "ductS2pressureavg",
      "ductS3pressureavg",
      "ductP1pospressure",
      "ductP2pospressure",
      "ductP3pospressure",
      "ductP4pospressure",
      "ductP5pospressure",
      "ductP6pospressure",
      "ductP1negpressure",
      "ductP2negpressure",
      "ductP3negpressure",
      "ductP4negpressure",
      "ductP5negpressure",
      "ductP6negpressure",
      "ductP1pospressuresp",
      "ductP2pospressuresp",
      "ductP3pospressuresp",
      "ductP4pospressuresp",
      "ductP5pospressuresp",
      "ductP6pospressuresp",
      "ductP1negpressuresp",
      "ductP2negpressuresp",
      "ductP3negpressuresp",
      "ductP4negpressuresp",
      "ductP5negpressuresp",
      "ductP6negpressuresp",
      "ductP1pospressureavg",
      "ductP2pospressureavg",
      "ductP3pospressureavg",
      "ductP4pospressureavg",
      "ductP5pospressureavg",
      "ductP6pospressureavg",
      "ductP1negpressureavg",
      "ductP2negpressureavg",
      "ductP3negpressureavg",
      "ductP4negpressureavg",
      "ductP5negpressureavg",
      "ductP6negpressureavg",
      "ductP1mister",
      "ductP2mister",
      "ductP3mister",
      "ductP4mister",
      "ductP5mister",
      "ductP6mister",
      "ductP1misteroverride",
      "ductP2misteroverride",
      "ductP3misteroverride",
      "ductP4misteroverride",
      "ductP5misteroverride",
      "ductP6misteroverride",
      "ductP1mistercontrol",
      "ductP2mistercontrol",
      "ductP3mistercontrol",
      "ductP4mistercontrol",
      "ductP5mistercontrol",
      "ductP6mistercontrol",
      "ductP1mistertimer",
      "ductP2mistertimer",
      "ductP3mistertimer",
      "ductP4mistertimer",
      "ductP5mistertimer",
      "ductP6mistertimer",
      "blowerP1run",
      "blowerP2run",
      "blowerP3run",
      "blowerP4run",
      "blowerP5run",
      "blowerP6run",
      "blowerS1run",
      "blowerS2run",
      "blowerS3run",
      "blowerP1fault",
      "blowerP2fault",
      "blowerP3fault",
      "blowerP4fault",
      "blowerP5fault",
      "blowerP6fault",
      "blowerS1fault",
      "blowerS2fault",
      "blowerS3fault",
      "blowerP1speed",
      "blowerP2speed",
      "blowerP3speed",
      "blowerP4speed",
      "blowerP5speed",
      "blowerP6speed",
      "blowerS1speed",
      "blowerS2speed",
      "blowerS3speed",
      "blowerP1prerevspeed",
      "blowerP2prerevspeed",
      "blowerP3prerevspeed",
      "blowerP4prerevspeed",
      "blowerP5prerevspeed",
      "blowerP6prerevspeed",
      "blowerS1prerevspeed",
      "blowerS2prerevspeed",
      "blowerS3prerevspeed",
      "blowerP1control",
      "blowerP2control",
      "blowerP3control",
      "blowerP4control",
      "blowerP5control",
      "blowerP6control",
      "blowerS1control",
      "blowerS2control",
      "blowerS3control",
      "blowerP1override",
      "blowerP2override",
      "blowerP3override",
      "blowerP4override",
      "blowerP5override",
      "blowerP6override",
      "blowerS1override",
      "blowerS2override",
      "blowerS3override",
      "blowerP1value",
      "blowerP2value",
      "blowerP3value",
      "blowerP4value",
      "blowerP5value",
      "blowerP6value",
      "blowerS1value",
      "blowerS2value",
      "blowerS3value",
      "blowerP1revoverride",
      "blowerP2revoverride",
      "blowerP3revoverride",
      "blowerP4revoverride",
      "blowerP5revoverride",
      "blowerP6revoverride",
      "blowerP1direction",
      "blowerP2direction",
      "blowerP3direction",
      "blowerP4direction",
      "blowerP5direction",
      "blowerP6direction",
      "blowerP1idletimer",
      "blowerP2idletimer",
      "blowerP3idletimer",
      "blowerP4idletimer",
      "blowerP5idletimer",
      "blowerP6idletimer",
      "blowerP1revtimer",
      "blowerP2revtimer",
      "blowerP3revtimer",
      "blowerP4revtimer",
      "blowerP5revtimer",
      "blowerP6revtimer",
      "blowerP1revdamper",
      "blowerP2revdamper",
      "blowerP3revdamper",
      "blowerP4revdamper",
      "blowerP5revdamper",
      "blowerP6revdamper",
      "blowerP1revlogic",
      "blowerP2revlogic",
      "blowerP3revlogic",
      "blowerP4revlogic",
      "blowerP5revlogic",
      "blowerP6revlogic",
      "premisterP1temp",
      "premisterP2temp",
      "premisterP3temp",
      "premisterP4temp",
      "premisterP5temp",
      "premisterP6temp",
      "premisterP1lvtemp",
      "premisterP2lvtemp",
      "premisterP3lvtemp",
      "premisterP4lvtemp",
      "premisterP5lvtemp",
      "premisterP6lvtemp",
      "exhaustP1temp",
      "exhaustP2temp",
      "exhaustP3temp",
      "exhaustP4temp",
      "exhaustP5temp",
      "exhaustP6temp",
      "exhaustP1lvtemp",
      "exhaustP2lvtemp",
      "exhaustP3lvtemp",
      "exhaustP4lvtemp",
      "exhaustP5lvtemp",
      "exhaustP6lvtemp",
      "exhaustP1avgtemp",
      "exhaustP2avgtemp",
      "exhaustP3avgtemp",
      "exhaustP4avgtemp",
      "exhaustP5avgtemp",
      "exhaustP6avgtemp",
      "biofilterP1pAlvtemp",
      "biofilterP1pBlvtemp",
      "biofilterP2pAlvtemp",
      "biofilterP2pBlvtemp",
      "biofilterP3pAlvtemp",
      "biofilterP3pBlvtemp",
      "biofilterP4pAlvtemp",
      "biofilterP4pBlvtemp",
      "biofilterP5pAlvtemp",
      "biofilterP5pBlvtemp",
      "biofilterP6pAlvtemp",
      "biofilterP6pBlvtemp",
      "biofilterP1avgtemp",
      "biofilterP2avgtemp",
      "biofilterP3avgtemp",
      "biofilterP4avgtemp",
      "biofilterP5avgtemp",
      "biofilterP6avgtemp",
      "biofilterP1pAtempage",
      "biofilterP1pBtempage",
      "biofilterP2pAtempage",
      "biofilterP2pBtempage",
      "biofilterP3pAtempage",
      "biofilterP3pBtempage",
      "biofilterP4pAtempage",
      "biofilterP4pBtempage",
      "biofilterP5pAtempage",
      "biofilterP5pBtempage",
      "biofilterP6pAtempage",
      "biofilterP6pBtempage",
      "damperP1Aposition",
      "damperP1Bposition",
      "damperP2Aposition",
      "damperP2Bposition",
      "damperP3Aposition",
      "damperP3Bposition",
      "damperP4Aposition",
      "damperP4Bposition",
      "damperP5Aposition",
      "damperP5Bposition",
      "damperP6Aposition",
      "damperP6Bposition",
      "damperS1Aposition",
      "damperS1Bposition",
      "damperS1Cposition",
      "damperS2Aposition",
      "damperS2Bposition",
      "damperS2Cposition",
      "damperS3Aposition",
      "damperS3Bposition",
      "damperS3Cposition",
      "damperP1Aoverride",
      "damperP1Boverride",
      "damperP2Aoverride",
      "damperP2Boverride",
      "damperP3Aoverride",
      "damperP3Boverride",
      "damperP4Aoverride",
      "damperP4Boverride",
      "damperP5Aoverride",
      "damperP5Boverride",
      "damperP6Aoverride",
      "damperP6Boverride",
      "damperS1Aoverride",
      "damperS1Boverride",
      "damperS1Coverride",
      "damperS2Aoverride",
      "damperS2Boverride",
      "damperS2Coverride",
      "damperS3Aoverride",
      "damperS3Boverride",
      "damperS3Coverride",
      "damperP1Avalue",
      "damperP1Bvalue",
      "damperP2Avalue",
      "damperP2Bvalue",
      "damperP3Avalue",
      "damperP3Bvalue",
      "damperP4Avalue",
      "damperP4Bvalue",
      "damperP5Avalue",
      "damperP5Bvalue",
      "damperP6Avalue",
      "damperP6Bvalue",
      "damperS1Avalue",
      "damperS1Bvalue",
      "damperS1Cvalue",
      "damperS2Avalue",
      "damperS2Bvalue",
      "damperS2Cvalue",
      "damperS3Avalue",
      "damperS3Bvalue",
      "damperS3Cvalue",
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
      "zone21pAlvtemp",
      "zone21pBlvtemp",
      "zone22pAlvtemp",
      "zone22pBlvtemp",
      "zone23pAlvtemp",
      "zone23pBlvtemp",
      "zone24pAlvtemp",
      "zone24pBlvtemp",
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
      "zone21pAavgtemp",
      "zone21pBavgtemp",
      "zone22pAavgtemp",
      "zone22pBavgtemp",
      "zone23pAavgtemp",
      "zone23pBavgtemp",
      "zone24pAavgtemp",
      "zone24pBavgtemp",
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
      "zone21pAtempage",
      "zone21pBtempage",
      "zone22pAtempage",
      "zone22pBtempage",
      "zone23pAtempage",
      "zone23pBtempage",
      "zone24pAtempage",
      "zone24pBtempage",
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
      "zone21moveto",
      "zone22moveto",
      "zone23moveto",
      "zone24moveto",
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
      "zone21movedfrom",
      "zone22movedfrom",
      "zone23movedfrom",
      "zone24movedfrom",
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
      "zone21control",
      "zone22control",
      "zone23control",
      "zone24control",
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
      "zone21regime",
      "zone22regime",
      "zone23regime",
      "zone24regime",
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
      "zone21regtimer",
      "zone22regtimer",
      "zone23regtimer",
      "zone24regtimer",
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
      "zone21reset",
      "zone22reset",
      "zone23reset",
      "zone24reset",
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
      "zone21print",
      "zone22print",
      "zone23print",
      "zone24print",
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
      "zone21avgdamper",
      "zone22avgdamper",
      "zone23avgdamper",
      "zone24avgdamper",
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
      "zone21avgtimer",
      "zone22avgtimer",
      "zone23avgtimer",
      "zone24avgtimer",
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
      "zone21pfrptime",
      "zone22pfrptime",
      "zone23pfrptime",
      "zone24pfrptime",
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
      "loadzone21active",
      "loadzone22active",
      "loadzone23active",
      "loadzone24active",
      "batchfilesinuse",
      "blowerstartupinuse",
      "settingsinuse",
      "zonestartupinuse",
      "refreshsettings",
      "wirelesscommfailure",
      "pollwirelesstemps",
      "zone01capped",
      "zone02capped",
      "zone03capped",
      "zone04capped",
      "zone05capped",
      "zone06capped",
      "zone07capped",
      "zone08capped",
      "zone09capped",
      "zone10capped",
      "zone11capped",
      "zone12capped",
      "zone13capped",
      "zone14capped",
      "zone15capped",
      "zone16capped",
      "zone17capped",
      "zone18capped",
      "zone19capped",
      "zone20capped",
      "zone21capped",
      "zone22capped",
      "zone23capped",
      "zone24capped",
      "container01alarmage",
      "container02alarmage"
    ],
    moduleGroups: [
        {
            moduleGroup: '1',
            moduleLabel: 'Module 1',
            groupBlower: {
                blowerId: 'P1',
                blowerLabel: 'Blower P1',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '01',
                    zoneLabel: 'P1A',
                    damperId: 'P1A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '02',
                    zoneLabel: 'P1B',
                    damperId: 'P1B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '2',
            moduleLabel: 'Module 2',
            groupBlower: {
                blowerId: 'P2',
                blowerLabel: 'Blower P2',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '03',
                    zoneLabel: 'P2A',
                    damperId: 'P2A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '04',
                    zoneLabel: 'P2B',
                    damperId: 'P2B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '3',
            moduleLabel: 'Module 3',
            groupBlower: {
                blowerId: 'P3',
                blowerLabel: 'Blower P3',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '05',
                    zoneLabel: 'P3A',
                    damperId: 'P3A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '06',
                    zoneLabel: 'P3B',
                    damperId: 'P3B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '4',
            moduleLabel: 'Module 4',
            groupBlower: {
                blowerId: 'P4',
                blowerLabel: 'Blower P4',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '15',
                    zoneLabel: 'P4A',
                    damperId: 'P4A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '16',
                    zoneLabel: 'P4B',
                    damperId: 'P4B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '5',
            moduleLabel: 'Module 5',
            groupBlower: {
                blowerId: 'P5',
                blowerLabel: 'Blower P5',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '02',
            },
            groupZones: [
                {
                    zoneId: '17',
                    zoneLabel: 'P5A',
                    damperId: 'P5A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '18',
                    zoneLabel: 'P5B',
                    damperId: 'P5B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '6',
            moduleLabel: 'Module 6',
            groupBlower: {
                blowerId: 'P6',
                blowerLabel: 'Blower P6',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '02',
            },
            groupZones: [
                {
                    zoneId: '19',
                    zoneLabel: 'P6A',
                    damperId: 'P6A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '20',
                    zoneLabel: 'P6B',
                    damperId: 'P6B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '1',
            moduleLabel: 'Module 1',
            groupBlower: {
                blowerId: 'S1',
                blowerLabel: 'Blower S1',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '07',
                    zoneLabel: 'S1A',
                    zoneTempALabel: 'S1A-1',
                    zoneTempBLabel: 'S1A-2',
                    damperId: 'S1A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '08',
                    zoneLabel: 'S1B',
                    zoneTempALabel: 'S1B-1',
                    zoneTempBLabel: 'S1B-2',
                    damperId: 'S1B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '2',
            moduleLabel: 'Module 2',
            groupBlower: {
                blowerId: 'S1',
                blowerLabel: 'Blower S1',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '09',
                    zoneLabel: 'S2A',
                    zoneTempALabel: 'S2A-1',
                    zoneTempBLabel: 'S2A-2',
                    damperId: 'S1C',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '10',
                    zoneLabel: 'S2B',
                    zoneTempALabel: 'S2B-1',
                    zoneTempBLabel: 'S2B-2',
                    damperId: 'S1C',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            moduleGroup: '3',
            moduleLabel: 'Module 3',
            groupBlower: {
                blowerId: 'S2',
                blowerLabel: 'Blower S2',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
              {
                  zoneId: '11',
                  zoneLabel: 'S3A',
                  zoneTempALabel: 'S3A-1',
                  zoneTempBLabel: 'S3A-2',
                  damperId: 'S2A',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '12',
                  zoneLabel: 'S3B',
                  zoneTempALabel: 'S3B-1',
                  zoneTempBLabel: 'S3B-2',
                  damperId: 'S2B',
                  setpointSettingName: 'RegimeXTempSetPoint',
              }
            ]
        },
        {
            moduleGroup: '4',
            moduleLabel: 'Module 4',
            groupBlower: {
                blowerId: 'S2',
                blowerLabel: 'Blower S2',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
              {
                  zoneId: '13',
                  zoneLabel: 'S4A',
                  zoneTempALabel: 'S4A-1',
                  zoneTempBLabel: 'S4A-2',
                  damperId: 'S2C',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '14',
                  zoneLabel: 'S4B',
                  zoneTempALabel: 'S4B-1',
                  zoneTempBLabel: 'S4B-2',
                  damperId: 'S2C',
                  setpointSettingName: 'RegimeXTempSetPoint',
              }
            ]
        },
        {
            moduleGroup: '5',
            moduleLabel: 'Module 5',
            groupBlower: {
                blowerId: 'S3',
                blowerLabel: 'Blower S3',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '02',
            },
            groupZones: [
              {
                  zoneId: '21',
                  zoneLabel: 'S5A',
                  zoneTempALabel: 'S5A-1',
                  zoneTempBLabel: 'S5A-2',
                  damperId: 'S3A',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '22',
                  zoneLabel: 'S5B',
                  zoneTempALabel: 'S5B-1',
                  zoneTempBLabel: 'S5B-2',
                  damperId: 'S3B',
                  setpointSettingName: 'RegimeXTempSetPoint',
              }
            ]
        },
        {
            moduleGroup: '6',
            moduleLabel: 'Module 6',
            groupBlower: {
                blowerId: 'S3',
                blowerLabel: 'Blower S3',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '02',
            },
            groupZones: [
              {
                  zoneId: '23',
                  zoneLabel: 'S6A',
                  zoneTempALabel: 'S6A-1',
                  zoneTempBLabel: 'S6A-2',
                  damperId: 'S3C',
                  setpointSettingName: 'RegimeXTempSetPoint',
              },
              {
                  zoneId: '24',
                  zoneLabel: 'S6B',
                  zoneTempALabel: 'S6B-1',
                  zoneTempBLabel: 'S6B-2',
                  damperId: 'S3C',
                  setpointSettingName: 'RegimeXTempSetPoint',
              }
            ]
        }
    ],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: 'P1',
                blowerLabel: 'Blower P1',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '01',
                    zoneLabel: 'P1A',
                    damperId: 'P1A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '02',
                    zoneLabel: 'P1B',
                    damperId: 'P1B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'P2',
                blowerLabel: 'Blower P2',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '03',
                    zoneLabel: 'P2A',
                    damperId: 'P2A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '04',
                    zoneLabel: 'P2B',
                    damperId: 'P2B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'P3',
                blowerLabel: 'Blower P3',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '05',
                    zoneLabel: 'P3A',
                    damperId: 'P3A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '06',
                    zoneLabel: 'P3B',
                    damperId: 'P3B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'S1',
                blowerLabel: 'Blower S1',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '07',
                    zoneLabel: 'S1A',
                    zoneTempALabel: 'S1A-1',
                    zoneTempBLabel: 'S1A-2',
                    damperId: 'S1A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '08',
                    zoneLabel: 'S1B',
                    zoneTempALabel: 'S1B-1',
                    zoneTempBLabel: 'S1B-2',
                    damperId: 'S1B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '09',
                    zoneLabel: 'S2A',
                    zoneTempALabel: 'S2A-1',
                    zoneTempBLabel: 'S2A-2',
                    damperId: 'S1C',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '10',
                    zoneLabel: 'S2B',
                    zoneTempALabel: 'S2B-1',
                    zoneTempBLabel: 'S2B-2',
                    damperId: 'S1C',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'S2',
                blowerLabel: 'Blower S2',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '11',
                    zoneLabel: 'S3A',
                    zoneTempALabel: 'S3A-1',
                    zoneTempBLabel: 'S3A-2',
                    damperId: 'S2A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '12',
                    zoneLabel: 'S3B',
                    zoneTempALabel: 'S3B-1',
                    zoneTempBLabel: 'S3B-2',
                    damperId: 'S2B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '13',
                    zoneLabel: 'S4A',
                    zoneTempALabel: 'S4A-1',
                    zoneTempBLabel: 'S4A-2',
                    damperId: 'S2C',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '14',
                    zoneLabel: 'S4B',
                    zoneTempALabel: 'S4B-1',
                    zoneTempBLabel: 'S4B-2',
                    damperId: 'S2C',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'P4',
                blowerLabel: 'Blower P4',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '01',
            },
            groupZones: [
                {
                    zoneId: '15',
                    zoneLabel: 'P4A',
                    damperId: 'P4A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '16',
                    zoneLabel: 'P4B',
                    damperId: 'P4B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'P5',
                blowerLabel: 'Blower P5',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '02',
            },
            groupZones: [
                {
                    zoneId: '17',
                    zoneLabel: 'P5A',
                    damperId: 'P5A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '18',
                    zoneLabel: 'P5B',
                    damperId: 'P5B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'P6',
                blowerLabel: 'Blower P6',
                minVFDSpeedSettingName: 'PrimaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'PrimaryMaxVFDSpeed',
                hasAerationReversingControl: true,
                hasMisterControl: true,
                hasExhaustTempSensor: true,
                hasBiofilterTempSensor: true,
                hasCustomCycleControl: false,
                containerId: '02',
            },
            groupZones: [
                {
                    zoneId: '19',
                    zoneLabel: 'P6A',
                    damperId: 'P6A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '20',
                    zoneLabel: 'P6B',
                    damperId: 'P6B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                }
            ]
        },
        {
            groupBlower: {
                blowerId: 'S3',
                blowerLabel: 'Blower S3',
                minVFDSpeedSettingName: 'SecondaryMinVFDSpeed',
                maxVFDSpeedSettingName: 'SecondaryMaxVFDSpeed',
                hasCustomCycleControl: false,
                containerId: '02',
            },
            groupZones: [
                {
                    zoneId: '21',
                    zoneLabel: 'S5A',
                    zoneTempALabel: 'S5A-1',
                    zoneTempBLabel: 'S5A-2',
                    damperId: 'S3A',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '22',
                    zoneLabel: 'S5B',
                    zoneTempALabel: 'S5B-1',
                    zoneTempBLabel: 'S5B-2',
                    damperId: 'S3B',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '23',
                    zoneLabel: 'S6A',
                    zoneTempALabel: 'S6A-1',
                    zoneTempBLabel: 'S6A-2',
                    damperId: 'S3C',
                    setpointSettingName: 'RegimeXTempSetPoint',
                },
                {
                    zoneId: '24',
                    zoneLabel: 'S6B',
                    zoneTempALabel: 'S6B-1',
                    zoneTempBLabel: 'S6B-2',
                    damperId: 'S3C',
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
                {
                    settingName: 'Zone07RegimeType',
                    settingLabel: 'Zone 7 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone08RegimeType',
                    settingLabel: 'Zone 8 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone09RegimeType',
                    settingLabel: 'Zone 9 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone10RegimeType',
                    settingLabel: 'Zone 10 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone11RegimeType',
                    settingLabel: 'Zone 11 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone12RegimeType',
                    settingLabel: 'Zone 12 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone13RegimeType',
                    settingLabel: 'Zone 13 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone14RegimeType',
                    settingLabel: 'Zone 14 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone15RegimeType',
                    settingLabel: 'Zone 15 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone16RegimeType',
                    settingLabel: 'Zone 16 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone17RegimeType',
                    settingLabel: 'Zone 17 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone18RegimeType',
                    settingLabel: 'Zone 18 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone19RegimeType',
                    settingLabel: 'Zone 19 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone20RegimeType',
                    settingLabel: 'Zone 20 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone21RegimeType',
                    settingLabel: 'Zone 21 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone22RegimeType',
                    settingLabel: 'Zone 22 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone23RegimeType',
                    settingLabel: 'Zone 23 Regime Type',
                    settingType: 'string',
                    settingHidden: true
                },
                {
                    settingName: 'Zone24RegimeType',
                    settingLabel: 'Zone 24 Regime Type',
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
                  settingName: 'MisterP1PosTempSetPoint',
                  settingLabel: 'Mister P1 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP2PosTempSetPoint',
                  settingLabel: 'Mister P2 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP3PosTempSetPoint',
                  settingLabel: 'Mister P3 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP4PosTempSetPoint',
                  settingLabel: 'Mister P4 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP5PosTempSetPoint',
                  settingLabel: 'Mister P5 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP6PosTempSetPoint',
                  settingLabel: 'Mister P6 Positive Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP1NegTempSetPoint',
                  settingLabel: 'Mister P1 Negative Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP2NegTempSetPoint',
                  settingLabel: 'Mister P2 Negative Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP3NegTempSetPoint',
                  settingLabel: 'Mister P3 Negative Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP4NegTempSetPoint',
                  settingLabel: 'Mister P4 Negative Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP5NegTempSetPoint',
                  settingLabel: 'Mister P5 Negative Temp Setpoint',
                  settingUnit: temperatureUnit,
                  settingType: 'number',
                  settingMin: 0,
                  settingMax: 120
              },
              {
                  settingName: 'MisterP6NegTempSetPoint',
                  settingLabel: 'Mister P6 Negative Temp Setpoint',
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
                    settingName: 'Zone01ProbeAPointID',
                    settingLabel: 'Zone P1A Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone01ProbeBPointID',
                    settingLabel: 'Zone P1A Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeAPointID',
                    settingLabel: 'Zone P1B Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone02ProbeBPointID',
                    settingLabel: 'Zone P1B Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeAPointID',
                    settingLabel: 'Zone P2A Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone03ProbeBPointID',
                    settingLabel: 'Zone P2A Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeAPointID',
                    settingLabel: 'Zone P2B Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone04ProbeBPointID',
                    settingLabel: 'Zone P2B Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeAPointID',
                    settingLabel: 'Zone P3A Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone05ProbeBPointID',
                    settingLabel: 'Zone P3A Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeAPointID',
                    settingLabel: 'Zone P3B Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone06ProbeBPointID',
                    settingLabel: 'Zone P3B Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeAPointID',
                    settingLabel: 'Zone S1A-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone07ProbeBPointID',
                    settingLabel: 'Zone S1A-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeAPointID',
                    settingLabel: 'Zone S1B-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone08ProbeBPointID',
                    settingLabel: 'Zone S1B-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeAPointID',
                    settingLabel: 'Zone S2A-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone09ProbeBPointID',
                    settingLabel: 'Zone S2A-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeAPointID',
                    settingLabel: 'Zone S2B-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone10ProbeBPointID',
                    settingLabel: 'Zone S2B-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone11ProbeAPointID',
                    settingLabel: 'Zone S3A-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone11ProbeBPointID',
                    settingLabel: 'Zone S3A-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone12ProbeAPointID',
                    settingLabel: 'Zone S3B-1Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone12ProbeBPointID',
                    settingLabel: 'Zone S3B-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone13ProbeAPointID',
                    settingLabel: 'Zone S4A-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone13ProbeBPointID',
                    settingLabel: 'Zone S4A-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone14ProbeAPointID',
                    settingLabel: 'Zone S4B-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone14ProbeBPointID',
                    settingLabel: 'Zone S4B-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone15ProbeAPointID',
                    settingLabel: 'Zone P4A Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone15ProbeBPointID',
                    settingLabel: 'Zone P4A Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone16ProbeAPointID',
                    settingLabel: 'Zone P4B Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone16ProbeBPointID',
                    settingLabel: 'Zone P4B Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone17ProbeAPointID',
                    settingLabel: 'Zone P5A Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone17ProbeBPointID',
                    settingLabel: 'Zone P5A Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone18ProbeAPointID',
                    settingLabel: 'Zone P5B Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone18ProbeBPointID',
                    settingLabel: 'Zone P5B Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone19ProbeAPointID',
                    settingLabel: 'Zone P6A Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone19ProbeBPointID',
                    settingLabel: 'Zone P6A Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone20ProbeAPointID',
                    settingLabel: 'Zone P6B Top Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone20ProbeBPointID',
                    settingLabel: 'Zone P6B Bottom Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone21ProbeAPointID',
                    settingLabel: 'Zone S5A-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone21ProbeBPointID',
                    settingLabel: 'Zone S5A-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone22ProbeAPointID',
                    settingLabel: 'Zone S5B-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone22ProbeBPointID',
                    settingLabel: 'Zone S5B-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone23ProbeAPointID',
                    settingLabel: 'Zone S6A-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone23ProbeBPointID',
                    settingLabel: 'Zone S6A-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone24ProbeAPointID',
                    settingLabel: 'Zone S6B-1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'Zone24ProbeBPointID',
                    settingLabel: 'Zone S6B-2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'BiofilterP1ProbeAPointID',
                    settingLabel: 'Biofilter P1 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'BiofilterP2ProbeAPointID',
                    settingLabel: 'Biofilter P2 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'BiofilterP3ProbeAPointID',
                    settingLabel: 'Biofilter P3 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'BiofilterP4ProbeAPointID',
                    settingLabel: 'Biofilter P4 Temp',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'BiofilterP5ProbeAPointID',
                    settingLabel: 'Biofilter P5 Temp A',
                    settingType: 'string',
                    settingDisabled: true
                },
                {
                    settingName: 'BiofilterP6ProbeAPointID',
                    settingLabel: 'Biofilter P6 Temp A',
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
                    settingName: 'MaxContainerTemp',
                    settingLabel: 'Max Container Temperature',
                    settingUnit: temperatureUnit,
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 200
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
                    inputName: 'zone01pAlvtemp',
                    inputLabel: 'Zone P1A Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone01pBlvtemp',
                    inputLabel: 'Zone P1A Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pAlvtemp',
                    inputLabel: 'Zone P1B Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone02pBlvtemp',
                    inputLabel: 'Zone P1B Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pAlvtemp',
                    inputLabel: 'Zone P2A Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone03pBlvtemp',
                    inputLabel: 'Zone P2A Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pAlvtemp',
                    inputLabel: 'Zone P2B Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone04pBlvtemp',
                    inputLabel: 'Zone P2B Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pAlvtemp',
                    inputLabel: 'Zone P3A Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone05pBlvtemp',
                    inputLabel: 'Zone P3A Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pAlvtemp',
                    inputLabel: 'Zone P3B Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone06pBlvtemp',
                    inputLabel: 'Zone P3B Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pAlvtemp',
                    inputLabel: 'Zone S1A-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone07pBlvtemp',
                    inputLabel: 'Zone S1A-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pAlvtemp',
                    inputLabel: 'Zone S1B-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone08pBlvtemp',
                    inputLabel: 'Zone S1B-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pAlvtemp',
                    inputLabel: 'Zone S2A-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone09pBlvtemp',
                    inputLabel: 'Zone S2A-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pAlvtemp',
                    inputLabel: 'Zone S2B-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone10pBlvtemp',
                    inputLabel: 'Zone S2B-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pAlvtemp',
                    inputLabel: 'Zone S3A-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone11pBlvtemp',
                    inputLabel: 'Zone S3A-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone12pAlvtemp',
                    inputLabel: 'Zone S3B-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone12pBlvtemp',
                    inputLabel: 'Zone S3B-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pAlvtemp',
                    inputLabel: 'Zone S4A-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone13pBlvtemp',
                    inputLabel: 'Zone S4A-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pAlvtemp',
                    inputLabel: 'Zone S4B-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone14pBlvtemp',
                    inputLabel: 'Zone S4B-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone15pAlvtemp',
                    inputLabel: 'Zone P4A Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone15pBlvtemp',
                    inputLabel: 'Zone P4A Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone16pAlvtemp',
                    inputLabel: 'Zone P4B Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone16pBlvtemp',
                    inputLabel: 'Zone P4B Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone17pAlvtemp',
                    inputLabel: 'Zone P5A Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone17pBlvtemp',
                    inputLabel: 'Zone P5A Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone18pAlvtemp',
                    inputLabel: 'Zone P5B Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone18pBlvtemp',
                    inputLabel: 'Zone P5B Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone19pAlvtemp',
                    inputLabel: 'Zone P6A Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone19pBlvtemp',
                    inputLabel: 'Zone P6A Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone20pAlvtemp',
                    inputLabel: 'Zone P6B Top Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone20pBlvtemp',
                    inputLabel: 'Zone P6B Bottom Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone21pAlvtemp',
                    inputLabel: 'Zone S5A-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone21pBlvtemp',
                    inputLabel: 'Zone S5A-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone22pAlvtemp',
                    inputLabel: 'Zone S5B-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone22pBlvtemp',
                    inputLabel: 'Zone S5B-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone23pAlvtemp',
                    inputLabel: 'Zone S6A-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone23pBlvtemp',
                    inputLabel: 'Zone S6A-2 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone24pAlvtemp',
                    inputLabel: 'Zone S6B-1 Temp',
                    inputUnit: temperatureUnit
                },
                {
                    inputName: 'zone24pBlvtemp',
                    inputLabel: 'Zone S6B-2 Temp',
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
                    inputName: 'damperP5Aposition',
                    inputLabel: 'Damper P5A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP5Bposition',
                    inputLabel: 'Damper P5B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP6Aposition',
                    inputLabel: 'Damper P6A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperP6Bposition',
                    inputLabel: 'Damper P6B Position',
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
                },
                {
                    inputName: 'damperS1Cposition',
                    inputLabel: 'Damper S1C Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS2Aposition',
                    inputLabel: 'Damper S2A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS2Bposition',
                    inputLabel: 'Damper S2B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS2Cposition',
                    inputLabel: 'Damper S2C Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS3Aposition',
                    inputLabel: 'Damper S3A Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS3Bposition',
                    inputLabel: 'Damper S3B Position',
                    inputUnit: '%'
                },
                {
                    inputName: 'damperS3Cposition',
                    inputLabel: 'Damper S3C Position',
                    inputUnit: '%'
                }
            ]
        },
        {
            groupName: 'Blowers',
            groupLabel: 'Blowers',
            groupInputs: [
                {
                    inputName: 'blowerP1run',
                    inputLabel: 'Blower P1 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerP2run',
                    inputLabel: 'Blower P2 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerP3run',
                    inputLabel: 'Blower P3 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerP4run',
                    inputLabel: 'Blower P4 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerP5run',
                    inputLabel: 'Blower P5 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerP6run',
                    inputLabel: 'Blower P6 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerS1run',
                    inputLabel: 'Blower S1 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerS2run',
                    inputLabel: 'Blower S2 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerS3run',
                    inputLabel: 'Blower S3 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blowerP1fault',
                    inputLabel: 'Blower P1 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerP2fault',
                    inputLabel: 'Blower P2 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerP3fault',
                    inputLabel: 'Blower P3 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerP4fault',
                    inputLabel: 'Blower P4 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerP5fault',
                    inputLabel: 'Blower P5 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerP6fault',
                    inputLabel: 'Blower P6 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerS1fault',
                    inputLabel: 'Blower S1 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerS2fault',
                    inputLabel: 'Blower S2 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerS3fault',
                    inputLabel: 'Blower S3 Fault',
                    inputTranslations: [
                        { value: 0, translation: 'Fault' },
                        { value: 1, translation: 'Okay' }
                    ]
                },
                {
                    inputName: 'blowerP1speed',
                    inputLabel: 'Blower P1 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerP2speed',
                    inputLabel: 'Blower P2 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerP3speed',
                    inputLabel: 'Blower P3 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerP4speed',
                    inputLabel: 'Blower P4 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerP5speed',
                    inputLabel: 'Blower P5 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerP6speed',
                    inputLabel: 'Blower P6 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerS1speed',
                    inputLabel: 'Blower S1 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerS2speed',
                    inputLabel: 'Blower S2 Speed',
                    inputUnit: '%'
                },
                {
                    inputName: 'blowerS3speed',
                    inputLabel: 'Blower S3 Speed',
                    inputUnit: '%'
                }
            ]
        },
        {
            groupName: 'Manifolds',
            groupLabel: 'Manifolds',
            groupInputs: [
                {
                  inputName: 'biofilterP1pAlvtemp',
                  inputLabel: 'Biofilter P1 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilterP2pAlvtemp',
                  inputLabel: 'Biofilter P2 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilterP3pAlvtemp',
                  inputLabel: 'Biofilter P3 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilterP4pAlvtemp',
                  inputLabel: 'Biofilter P4 Last Valid Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilterP5pAlvtemp',
                  inputLabel: 'Biofilter P5 Last Valid Temp A',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'biofilterP6pAlvtemp',
                  inputLabel: 'Biofilter P6 Last Valid Temp A',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaustP1temp',
                  inputLabel: 'Exhaust P1 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaustP2temp',
                  inputLabel: 'Exhaust P2 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaustP3temp',
                  inputLabel: 'Exhaust P3 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaustP4temp',
                  inputLabel: 'Exhaust P4 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaustP5temp',
                  inputLabel: 'Exhaust P5 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'exhaustP6temp',
                  inputLabel: 'Exhaust P6 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'ductP1pospressure',
                  inputLabel: 'Duct P1 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP1negpressure',
                  inputLabel: 'Duct P1 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP2pospressure',
                  inputLabel: 'Duct P2 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP2negpressure',
                  inputLabel: 'Duct P2 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP3pospressure',
                  inputLabel: 'Duct P3 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP3negpressure',
                  inputLabel: 'Duct P3 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP4pospressure',
                  inputLabel: 'Duct P4 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP4negpressure',
                  inputLabel: 'Duct P4 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP5pospressure',
                  inputLabel: 'Duct P5 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP5negpressure',
                  inputLabel: 'Duct P5 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP6pospressure',
                  inputLabel: 'Duct P6 Positive Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductP6negpressure',
                  inputLabel: 'Duct P6 Negative Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductS1pressure',
                  inputLabel: 'Duct S1 Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductS2pressure',
                  inputLabel: 'Duct S2 Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'ductS3pressure',
                  inputLabel: 'Duct S3 Pressure',
                  inputUnit: 'inches'
                },
                {
                  inputName: 'blowerP1revdamper',
                  inputLabel: 'Blower P1 Reverse Damper Position'
                },
                {
                  inputName: 'blowerP2revdamper',
                  inputLabel: 'Blower P2 Reverse Damper Position'
                },
                {
                  inputName: 'blowerP3revdamper',
                  inputLabel: 'Blower P3 Reverse Damper Position'
                },
                {
                  inputName: 'blowerP4revdamper',
                  inputLabel: 'Blower P4 Reverse Damper Position'
                },
                {
                  inputName: 'blowerP5revdamper',
                  inputLabel: 'Blower P5 Reverse Damper Position'
                },
                {
                  inputName: 'blowerP6revdamper',
                  inputLabel: 'Blower P6 Reverse Damper Position'
                },
                {
                  inputName: 'ductP1mister',
                  inputLabel: 'Duct P1 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'ductP2mister',
                  inputLabel: 'Duct P2 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'ductP3mister',
                  inputLabel: 'Duct P3 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'ductP4mister',
                  inputLabel: 'Duct P4 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'ductP5mister',
                  inputLabel: 'Duct P5 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                },
                {
                  inputName: 'ductP6mister',
                  inputLabel: 'Duct P6 Mister',
                  inputTranslations: [
                      { value: 0, translation: 'Off' },
                      { value: 1, translation: 'On' }
                  ]
                }
            ]
        },
        {
            groupName: 'ContainerTemps',
            groupLabel: 'Container Temps',
            groupInputs: [
                {
                  inputName: 'container01temp',
                  inputLabel: 'Container 01 Temp',
                  inputUnit: temperatureUnit
                },
                {
                  inputName: 'container02temp',
                  inputLabel: 'Container 02 Temp',
                  inputUnit: temperatureUnit
                },
            ]
        }
    ]
}
