const temperatureUnit = '°F';

var facilityConfig = {
  verifiedWithVersion: '1.0.53',
  dbPath: '',
  temperatureUnit: temperatureUnit,
  layoutType: 'card',
  displayPFRPTime: true,
  hasLocationalRegimeControl: true,
  overrideDisabledSettings: false,
  zoneProbeIds: ['A', 'B', 'C', 'D'],
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
    'zone01irrigate',
    'zone01irrtimer',
    'zone01irrcontrol',
    'damper01position',
    'damper02position',
    'damper03position',
    'damper04position',
    'damper05position',
    'damper01override',
    'damper02override',
    'damper03override',
    'damper04override',
    'damper05override',
    'damper01value',
    'damper02value',
    'damper03value',
    'damper04value',
    'damper05value',
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
    'zone01control',
    'zone02control',
    'zone03control',
    'zone04control',
    'zone05control',
    'zone01reset',
    'zone02reset',
    'zone03reset',
    'zone04reset',
    'zone05reset',
    'zone01print',
    'zone02print',
    'zone03print',
    'zone04print',
    'zone05print',
    'loadzone01active',
    'loadzone02active',
    'loadzone03active',
    'loadzone04active',
    'loadzone05active',
    'zone01avgdamper',
    'zone02avgdamper',
    'zone03avgdamper',
    'zone04avgdamper',
    'zone05avgdamper',
    'zone01avgtimer',
    'zone02avgtimer',
    'zone03avgtimer',
    'zone04avgtimer',
    'zone05avgtimer',
    'zone01pfrptime',
    'zone02pfrptime',
    'zone03pfrptime',
    'zone04pfrptime',
    'zone05pfrptime',
    'zone01moveto',
    'zone02moveto',
    'zone03moveto',
    'zone04moveto',
    'zone05moveto',
    'zone01movedfrom',
    'zone02movedfrom',
    'zone03movedfrom',
    'zone04movedfrom',
    'zone05movedfrom',
    'zone01regime',
    'zone02regime',
    'zone03regime',
    'zone04regime',
    'zone05regime',
    'zone01regtimer',
    'zone02regtimer',
    'zone03regtimer',
    'zone04regtimer',
    'zone05regtimer',
    'container01alarmage',
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
        blowerLabel: 'Blower 1',
        containerId: '01'
      },
      groupZones: [
        {
          zoneId: '01',
          zoneLabel: '1',
          zoneTempALabel: '1A-Top',
          zoneTempBLabel: '1A-Bottom',
          zoneTempCLabel: '1B-Top',
          zoneTempDLabel: '1B-Bottom',
          setpointSettingName: 'RegimeXTempSetPoint',
          hasIrrigationControl: true
        },
        {
          zoneId: '02',
          zoneLabel: '2',
          zoneTempALabel: '2A-Top',
          zoneTempBLabel: '2A-Bottom',
          zoneTempCLabel: '2B-Top',
          zoneTempDLabel: '2B-Bottom',
          setpointSettingName: 'RegimeXTempSetPoint',
          hasIrrigationControl: true
        },
        {
          zoneId: '03',
          zoneLabel: '3',
          zoneTempALabel: '3A-Top',
          zoneTempBLabel: '3A-Bottom',
          zoneTempCLabel: '3B-Top',
          zoneTempDLabel: '3B-Bottom',
          setpointSettingName: 'RegimeXTempSetPoint',
          hasIrrigationControl: true
        },
        {
          zoneId: '04',
          zoneLabel: '4',
          zoneTempALabel: '4A-Top',
          zoneTempBLabel: '4A-Bottom',
          zoneTempCLabel: '4B-Top',
          zoneTempDLabel: '4B-Bottom',
          setpointSettingName: 'RegimeXTempSetPoint',
          hasIrrigationControl: true
        },
        {
          zoneId: '05',
          zoneLabel: '5',
          zoneTempALabel: '5A-Top',
          zoneTempBLabel: '5A-Bottom',
          zoneTempCLabel: '5B-Top',
          zoneTempDLabel: '5B-Bottom',
          setpointSettingName: 'RegimeXTempSetPoint',
          hasIrrigationControl: true
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
        },
        {
          settingName: 'IrrigationOffTime',
          settingLabel: 'Irrigation Off Time',
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
      groupName: 'Zone1-5Temps',
      groupLabel: 'Zone 01-5 Temps',
      groupInputs: [
        {
          inputName: 'zone01pAtemp',
          inputLabel: '1A-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone01pBtemp',
          inputLabel: '1A-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone01pCtemp',
          inputLabel: '1B-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone01pDtemp',
          inputLabel: '1B-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pAtemp',
          inputLabel: '2A-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pBtemp',
          inputLabel: '2A-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pCtemp',
          inputLabel: '2B-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone02pDtemp',
          inputLabel: '2B-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pAtemp',
          inputLabel: '3A-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pBtemp',
          inputLabel: '3A-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pCtemp',
          inputLabel: '3B-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone03pDtemp',
          inputLabel: '3B-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pAtemp',
          inputLabel: '4A-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pBtemp',
          inputLabel: '4A-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pCtemp',
          inputLabel: '4B-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone04pDtemp',
          inputLabel: '4B-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pAtemp',
          inputLabel: '5A-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pBtemp',
          inputLabel: '5A-Bottom',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pCtemp',
          inputLabel: '5B-Top',
          inputUnit: temperatureUnit
        },
        {
          inputName: 'zone05pDtemp',
          inputLabel: '5B-Bottom',
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
        }
      ]
    },
    {
      groupName: 'ZoneIrrigation',
      groupLabel: 'Zone Irrigation',
      groupInputs: [
        {
          inputName: 'zone01irrigation',
          inputLabel: 'Zone 01 Irrigation',
          inputTranslations: [
            { value: 0, translation: 'Off' },
            { value: 1, translation: 'On' }
          ]
        },
        {
          inputName: 'zone02irrigation',
          inputLabel: 'Zone 02 Irrigation',
          inputTranslations: [
            { value: 0, translation: 'Off' },
            { value: 1, translation: 'On' }
          ]
        },
        {
          inputName: 'zone03irrigation',
          inputLabel: 'Zone 03 Irrigation',
          inputTranslations: [
            { value: 0, translation: 'Off' },
            { value: 1, translation: 'On' }
          ]
        },
        {
          inputName: 'zone04irrigation',
          inputLabel: 'Zone 04 Irrigation',
          inputTranslations: [
            { value: 0, translation: 'Off' },
            { value: 1, translation: 'On' }
          ]
        },
        {
          inputName: 'zone05irrigation',
          inputLabel: 'Zone 05 Irrigation',
          inputTranslations: [
            { value: 0, translation: 'Off' },
            { value: 1, translation: 'On' }
          ]
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
          inputName: 'duct01pressure',
          inputLabel: 'Duct 1 Pressure',
          inputUnit: 'inches'
        },
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
        }
      ]
    },
  ]
}
