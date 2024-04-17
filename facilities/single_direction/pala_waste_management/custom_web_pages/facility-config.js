const temperatureUnit = '°F';

var facilityConfig = {
  verifiedWithVersion: '1.0.54',
  dbPath: '',
  temperatureUnit: temperatureUnit,
  layoutType: 'card',
  displayPFRPTime: true,
  hasLocationalRegimeControl: true,
  hasIrrigationControl: true,
  overrideDisabledSettings: false,
  zoneProbeIds: ['A', 'B', 'C', 'D'],
  logFileHeaders: {
    'Damper': 'Damper Position'
  },
  IORegList: [
    'blower01run',
    'blower01fault',
    'blower01speed',
    'blower01control',
    'blower01override',
    'blower01value',
    'duct01presssptimer',
    'duct01pressure',
    'duct01pressuresp',
    'duct01pressureavg',
    'damper01position',
    'damper02position',
    'damper03position',
    'damper04position',
    'damper05position',
    'damper06position',
    'damper07position',
    'damper08position',
    'damper01override',
    'damper02override',
    'damper03override',
    'damper04override',
    'damper05override',
    'damper06override',
    'damper07override',
    'damper08override',
    'damper01value',
    'damper02value',
    'damper03value',
    'damper04value',
    'damper05value',
    'damper06value',
    'damper07value',
    'damper08value',
    'zone01pAtemp',
    'zone01pBtemp',
    'zone01pCtemp',
    'zone01pDtemp',
    'zone02pAtemp',
    'zone02pBtemp',
    'zone02pCtemp',
    'zone02pDtemp',
    'zone03pAtemp',
    'zone03pBtemp',
    'zone03pCtemp',
    'zone03pDtemp',
    'zone04pAtemp',
    'zone04pBtemp',
    'zone04pCtemp',
    'zone04pDtemp',
    'zone05pAtemp',
    'zone05pBtemp',
    'zone05pCtemp',
    'zone05pDtemp',
    'zone06pAtemp',
    'zone06pBtemp',
    'zone06pCtemp',
    'zone06pDtemp',
    'zone07pAtemp',
    'zone07pBtemp',
    'zone07pCtemp',
    'zone07pDtemp',
    'zone08pAtemp',
    'zone08pBtemp',
    'zone08pCtemp',
    'zone08pDtemp',
    'zone01pAlvtemp',
    'zone01pBlvtemp',
    'zone01pClvtemp',
    'zone01pDlvtemp',
    'zone02pAlvtemp',
    'zone02pBlvtemp',
    'zone02pClvtemp',
    'zone02pDlvtemp',
    'zone03pAlvtemp',
    'zone03pBlvtemp',
    'zone03pClvtemp',
    'zone03pDlvtemp',
    'zone04pAlvtemp',
    'zone04pBlvtemp',
    'zone04pClvtemp',
    'zone04pDlvtemp',
    'zone05pAlvtemp',
    'zone05pBlvtemp',
    'zone05pClvtemp',
    'zone05pDlvtemp',
    'zone06pAlvtemp',
    'zone06pBlvtemp',
    'zone06pClvtemp',
    'zone06pDlvtemp',
    'zone07pAlvtemp',
    'zone07pBlvtemp',
    'zone07pClvtemp',
    'zone07pDlvtemp',
    'zone08pAlvtemp',
    'zone08pBlvtemp',
    'zone08pClvtemp',
    'zone08pDlvtemp',
    'zone01pAavgtemp',
    'zone01pBavgtemp',
    'zone01pCavgtemp',
    'zone01pDavgtemp',
    'zone02pAavgtemp',
    'zone02pBavgtemp',
    'zone02pCavgtemp',
    'zone02pDavgtemp',
    'zone03pAavgtemp',
    'zone03pBavgtemp',
    'zone03pCavgtemp',
    'zone03pDavgtemp',
    'zone04pAavgtemp',
    'zone04pBavgtemp',
    'zone04pCavgtemp',
    'zone04pDavgtemp',
    'zone05pAavgtemp',
    'zone05pBavgtemp',
    'zone05pCavgtemp',
    'zone05pDavgtemp',
    'zone06pAavgtemp',
    'zone06pBavgtemp',
    'zone06pCavgtemp',
    'zone06pDavgtemp',
    'zone07pAavgtemp',
    'zone07pBavgtemp',
    'zone07pCavgtemp',
    'zone07pDavgtemp',
    'zone08pAavgtemp',
    'zone08pBavgtemp',
    'zone08pCavgtemp',
    'zone08pDavgtemp',
    'zone01control',
    'zone02control',
    'zone03control',
    'zone04control',
    'zone05control',
    'zone06control',
    'zone07control',
    'zone08control',
    'zone01reset',
    'zone02reset',
    'zone03reset',
    'zone04reset',
    'zone05reset',
    'zone06reset',
    'zone07reset',
    'zone08reset',
    'zone01print',
    'zone02print',
    'zone03print',
    'zone04print',
    'zone05print',
    'zone06print',
    'zone07print',
    'zone08print',
    'loadzone01active',
    'loadzone02active',
    'loadzone03active',
    'loadzone04active',
    'loadzone05active',
    'loadzone06active',
    'loadzone07active',
    'loadzone08active',
    'zone01avgdamper',
    'zone02avgdamper',
    'zone03avgdamper',
    'zone04avgdamper',
    'zone05avgdamper',
    'zone06avgdamper',
    'zone07avgdamper',
    'zone08avgdamper',
    'zone01avgtimer',
    'zone02avgtimer',
    'zone03avgtimer',
    'zone04avgtimer',
    'zone05avgtimer',
    'zone06avgtimer',
    'zone07avgtimer',
    'zone08avgtimer',
    'zone01pfrptime',
    'zone02pfrptime',
    'zone03pfrptime',
    'zone04pfrptime',
    'zone05pfrptime',
    'zone06pfrptime',
    'zone07pfrptime',
    'zone08pfrptime',
    'zone01moveto',
    'zone02moveto',
    'zone03moveto',
    'zone04moveto',
    'zone05moveto',
    'zone06moveto',
    'zone07moveto',
    'zone08moveto',
    'zone01movedfrom',
    'zone02movedfrom',
    'zone03movedfrom',
    'zone04movedfrom',
    'zone05movedfrom',
    'zone06movedfrom',
    'zone07movedfrom',
    'zone08movedfrom',
    'zone01regime',
    'zone02regime',
    'zone03regime',
    'zone04regime',
    'zone05regime',
    'zone06regime',
    'zone07regime',
    'zone08regime',
    'zone01regtimer',
    'zone02regtimer',
    'zone03regtimer',
    'zone04regtimer',
    'zone05regtimer',
    'zone06regtimer',
    'zone07regtimer',
    'zone08regtimer',
    'zone01irrcontrol',
    'zone02irrcontrol',
    'zone03irrcontrol',
    'zone04irrcontrol',
    'zone05irrcontrol',
    'zone06irrcontrol',
    'zone07irrcontrol',
    'zone08irrcontrol',
    'zone01irrigation',
    'zone02irrigation',
    'zone03irrigation',
    'zone04irrigation',
    'zone05irrigation',
    'zone06irrigation',
    'zone07irrigation',
    'zone08irrigation',
    'zone01irrtimer',
    'zone02irrtimer',
    'zone03irrtimer',
    'zone04irrtimer',
    'zone05irrtimer',
    'zone06irrtimer',
    'zone07irrtimer',
    'zone08irrtimer',
    'container01alarmage',
    'container02alarmage',
    'container01estop',
    'container02estop',
    'container01temp',
    'ambienttemp',
    'estopactive',
    'batchfilesinuse',
    'blowerstartupinuse',
    'settingsinuse',
    'zonestartupinuse',
    'refreshsettings'
  ],
  zoneGroups: [
    {
      groupBlower: {
        blowerId: '01',
        blowerLabel: 'Blower-1',
        containerId: '01'
      },
      groupZones: [
        {
          zoneId: '01',
          zoneLabel: '1-1',
          zoneTempALabel: '1-1-AT',
          zoneTempBLabel: '1-1-AB',
          zoneTempCLabel: '1-1-BT',
          zoneTempDLabel: '1-1-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        },
        {
          zoneId: '02',
          zoneLabel: '1-2',
          zoneTempALabel: '1-2-AT',
          zoneTempBLabel: '1-2-AB',
          zoneTempCLabel: '1-2-BT',
          zoneTempDLabel: '1-2-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        },
        {
          zoneId: '03',
          zoneLabel: '1-3',
          zoneTempALabel: '1-3-AT',
          zoneTempBLabel: '1-3-AB',
          zoneTempCLabel: '1-3-BT',
          zoneTempDLabel: '1-3-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        },
        {
          zoneId: '04',
          zoneLabel: '1-4',
          zoneTempALabel: '1-4-AT',
          zoneTempBLabel: '1-4-AB',
          zoneTempCLabel: '1-4-BT',
          zoneTempDLabel: '1-4-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        },
        {
          zoneId: '05',
          zoneLabel: '1-5',
          zoneTempALabel: '1-5-AT',
          zoneTempBLabel: '1-5-AB',
          zoneTempCLabel: '1-5-BT',
          zoneTempDLabel: '1-5-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        },
        {
          zoneId: '06',
          zoneLabel: '1-6',
          zoneTempALabel: '1-6-AT',
          zoneTempBLabel: '1-6-AB',
          zoneTempCLabel: '1-6-BT',
          zoneTempDLabel: '1-6-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        },
        {
          zoneId: '07',
          zoneLabel: '1-7',
          zoneTempALabel: '1-7-AT',
          zoneTempBLabel: '1-7-AB',
          zoneTempCLabel: '1-7-BT',
          zoneTempDLabel: '1-7-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        },
        {
          zoneId: '08',
          zoneLabel: '1-8',
          zoneTempALabel: '1-8-AT',
          zoneTempBLabel: '1-8-AB',
          zoneTempCLabel: '1-8-BT',
          zoneTempDLabel: '1-8-BB',
          setpointSettingName: 'RegimeXTempSetPoint'
        }
      ]
    }
  ],
  graphConfig: {
    largeDatasetMinSize: 0,
    dataExclusionList: ['PFRP Time'],
    displayReferenceTempOnGraph: true,
    referenceTempColor: 'orange',
    pfrpSectionColor: 'orange'
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
          settingMax: 180
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
          settingName: 'Regime3TempSetPoint',
          settingLabel: 'VAR Regime Temp Set Point',
          settingUnit: temperatureUnit,
          settingType: 'number',
          settingMin: 0,
          settingMax: 180
        },
        {
          settingName: 'Zone01RegimeType',
          settingLabel: 'Zone 1-1 Regime Type',
          settingType: 'string',
          settingHidden: true
        },
        {
          settingName: 'Zone02RegimeType',
          settingLabel: 'Zone 1-2 Regime Type',
          settingType: 'string',
          settingHidden: true
        },
        {
          settingName: 'Zone03RegimeType',
          settingLabel: 'Zone 1-3 Regime Type',
          settingType: 'string',
          settingHidden: true
        },
        {
          settingName: 'Zone04RegimeType',
          settingLabel: 'Zone 1-4 Regime Type',
          settingType: 'string',
          settingHidden: true
        },
        {
          settingName: 'Zone05RegimeType',
          settingLabel: 'Zone 1-5 Regime Type',
          settingType: 'string',
          settingHidden: true
        },
        {
          settingName: 'Zone06RegimeType',
          settingLabel: 'Zone 1-6 Regime Type',
          settingType: 'string',
          settingHidden: true
        },
        {
          settingName: 'Zone07RegimeType',
          settingLabel: 'Zone 1-7 Regime Type',
          settingType: 'string',
          settingHidden: true
        },
        {
          settingName: 'Zone08RegimeType',
          settingLabel: 'Zone 1-8 Regime Type',
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
        },
        {
          settingName: 'PressureSetpointMin',
          settingLabel: 'Blower Pressure Setpoint Min',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 15
        },
        {
          settingName: 'PressureSetpointMax',
          settingLabel: 'Blower Pressure Setpoint Max',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 15
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
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 15
        },
        {
          settingName: 'PressureSetpointHotZoneTrigger',
          settingLabel: 'Blower Pressure Setpoint Hot Zone Trigger',
          settingUnit: '%',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 0,
          settingMax: 100
        },
        {
          settingName: 'PressureSetpointColdZoneTrigger',
          settingLabel: 'Blower Pressure Setpoint Cold Zone Trigger',
          settingUnit: '%',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 0,
          settingMax: 100
        }
      ],
      groupAdvancedLabel: 'Blower PID Settings',
      groupAdvancedSettings: [
        {
          settingName: 'BlowerGain',
          settingLabel: 'Gain',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1
        },
        {
          settingName: 'BlowerIntegral',
          settingLabel: 'Integral',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1
        },
        {
          settingName: 'BlowerDerivative',
          settingLabel: 'Derivative',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1
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
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1
        },
        {
          settingName: 'DamperIntegral',
          settingLabel: 'Integral',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1
        },
        {
          settingName: 'DamperDerivative',
          settingLabel: 'Derivative',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1
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
    },
    {
      groupName: 'irrigationControl',
      groupLabel: 'Irrigation Control',
      groupTitle: 'Irrigation Settings',
      groupSettings: [
        {
          settingName: 'IrrigationOnTime',
          settingLabel: 'Irrigation On Time',
          settingUnit: 'Minutes',
          settingType: 'number',
          settingMin: 5,
          settingMax: 60
        }
      ]
    },
  ],
  inputMonitorGroups: [
    {
      groupName: 'Zone01-08pA-DTemps',
      groupLabel: 'Zone 1-8 Temps',
      groupInputs: [
        {
          inputName: 'zone01pAtemp',
          inputLabel: '1-1-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone01pBtemp',
          inputLabel: '1-1-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone01pCtemp',
          inputLabel: '1-1-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone01pDtemp',
          inputLabel: '1-1-BB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pAtemp',
          inputLabel: '1-2-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pBtemp',
          inputLabel: '1-2-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pCtemp',
          inputLabel: '1-2-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pDtemp',
          inputLabel: '1-2-BB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pAtemp',
          inputLabel: '1-3-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pBtemp',
          inputLabel: '1-3-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pCtemp',
          inputLabel: '1-3-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pDtemp',
          inputLabel: '1-3-BB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pAtemp',
          inputLabel: '1-4-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pBtemp',
          inputLabel: '1-4-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pCtemp',
          inputLabel: '1-4-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pDtemp',
          inputLabel: '1-4-BB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pAtemp',
          inputLabel: '1-5-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pBtemp',
          inputLabel: '1-5-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pCtemp',
          inputLabel: '1-5-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pDtemp',
          inputLabel: '1-5-BB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone06pAtemp',
          inputLabel: '1-6-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone06pBtemp',
          inputLabel: '1-6-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone06pCtemp',
          inputLabel: '1-6-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone06pDtemp',
          inputLabel: '1-6-BB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone07pAtemp',
          inputLabel: '1-7-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone07pBtemp',
          inputLabel: '1-7-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone07pCtemp',
          inputLabel: '1-7-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone07pDtemp',
          inputLabel: '1-7-BB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone08pAtemp',
          inputLabel: '1-8-AT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone08pBtemp',
          inputLabel: '1-8-AB',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone08pCtemp',
          inputLabel: '1-8-BT',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone08pDtemp',
          inputLabel: '1-8-BB',
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
          inputLabel: 'Damper 1-1 Position',
          inputUnit: '%'
        },
        {
          inputName: 'damper02position',
          inputLabel: 'Damper 1-2 Position',
          inputUnit: '%'
        },
        {
          inputName: 'damper03position',
          inputLabel: 'Damper 1-3 Position',
          inputUnit: '%'
        },
        {
          inputName: 'damper04position',
          inputLabel: 'Damper 1-4 Position',
          inputUnit: '%'
        },
        {
          inputName: 'damper05position',
          inputLabel: 'Damper 1-5 Position',
          inputUnit: '%'
        },
        {
          inputName: 'damper06position',
          inputLabel: 'Damper 1-6 Position',
          inputUnit: '%'
        },
        {
          inputName: 'damper07position',
          inputLabel: 'Damper 1-7 Position',
          inputUnit: '%'
        },
        {
          inputName: 'damper08position',
          inputLabel: 'Damper 1-8 Position',
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
          inputLabel: 'Blower-1 Run',
          inputTranslations: [
            { value: 0, translation: 'Stop' },
            { value: 1, translation: 'Start' }
          ]
        },
        {
          inputName: 'blower01fault',
          inputLabel: 'Blower-1 Fault',
          inputTranslations: [
            { value: 0, translation: 'Fault' },
            { value: 1, translation: 'Okay' }
          ]
        },
        {
          inputName: 'blower01value',
          inputLabel: 'Blower-1 Speed',
          inputUnit: '%'
        }
      ]
    },
    {
      groupName: 'Manifolds',
      groupLabel: 'Manifolds',
      groupInputs: [
        {
          inputName: 'duct01pressure',
          inputLabel: 'Duct-1 Pressure',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct01pressuresp',
          inputLabel: 'Duct-1 Pressure Setpoint',
          inputUnit: 'inches'
        }
      ]
    },
    {
      groupName: 'ContainerTemps',
      groupLabel: 'Container',
      groupInputs: [
        {
          inputName: 'container01temp',
          inputLabel: 'Container-1 Temp',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'ambienttemp',
          inputLabel: 'Ambient Temp',
          inputUnit: temperatureUnit
        }
      ]
    }
  ]
};
