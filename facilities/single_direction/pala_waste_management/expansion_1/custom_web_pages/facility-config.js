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
    'blower02run',
    'blower02fault',
    'blower02speed',
    'blower02control',
    'blower02override',
    'blower02value',
    'duct02presssptimer',
    'duct02pressure',
    'duct02pressuresp',
    'duct02pressureavg',
    'damper09position',
    'damper10position',
    'damper11position',
    'damper12position',
    'damper13position',
    'damper14position',
    'damper15position',
    'damper16position',
    'damper09override',
    'damper10override',
    'damper11override',
    'damper12override',
    'damper13override',
    'damper14override',
    'damper15override',
    'damper16override',
    'damper09value',
    'damper10value',
    'damper11value',
    'damper12value',
    'damper13value',
    'damper14value',
    'damper15value',
    'damper16value',
    'zone09pAtemp',
    'zone09pBtemp',
    'zone09pCtemp',
    'zone09pDtemp',
    'zone10pAtemp',
    'zone10pBtemp',
    'zone10pCtemp',
    'zone10pDtemp',
    'zone11pAtemp',
    'zone11pBtemp',
    'zone11pCtemp',
    'zone11pDtemp',
    'zone12pAtemp',
    'zone12pBtemp',
    'zone12pCtemp',
    'zone12pDtemp',
    'zone13pAtemp',
    'zone13pBtemp',
    'zone13pCtemp',
    'zone13pDtemp',
    'zone14pAtemp',
    'zone14pBtemp',
    'zone14pCtemp',
    'zone14pDtemp',
    'zone15pAtemp',
    'zone15pBtemp',
    'zone15pCtemp',
    'zone15pDtemp',
    'zone16pAtemp',
    'zone16pBtemp',
    'zone16pCtemp',
    'zone16pDtemp',
    'zone09pAlvtemp',
    'zone09pBlvtemp',
    'zone09pClvtemp',
    'zone09pDlvtemp',
    'zone10pAlvtemp',
    'zone10pBlvtemp',
    'zone10pClvtemp',
    'zone10pDlvtemp',
    'zone11pAlvtemp',
    'zone11pBlvtemp',
    'zone11pClvtemp',
    'zone11pDlvtemp',
    'zone12pAlvtemp',
    'zone12pBlvtemp',
    'zone12pClvtemp',
    'zone12pDlvtemp',
    'zone13pAlvtemp',
    'zone13pBlvtemp',
    'zone13pClvtemp',
    'zone13pDlvtemp',
    'zone14pAlvtemp',
    'zone14pBlvtemp',
    'zone14pClvtemp',
    'zone14pDlvtemp',
    'zone15pAlvtemp',
    'zone15pBlvtemp',
    'zone15pClvtemp',
    'zone15pDlvtemp',
    'zone16pAlvtemp',
    'zone16pBlvtemp',
    'zone16pClvtemp',
    'zone16pDlvtemp',
    'zone09pAavgtemp',
    'zone09pBavgtemp',
    'zone09pCavgtemp',
    'zone09pDavgtemp',
    'zone10pAavgtemp',
    'zone10pBavgtemp',
    'zone10pCavgtemp',
    'zone10pDavgtemp',
    'zone11pAavgtemp',
    'zone11pBavgtemp',
    'zone11pCavgtemp',
    'zone11pDavgtemp',
    'zone12pAavgtemp',
    'zone12pBavgtemp',
    'zone12pCavgtemp',
    'zone12pDavgtemp',
    'zone13pAavgtemp',
    'zone13pBavgtemp',
    'zone13pCavgtemp',
    'zone13pDavgtemp',
    'zone14pAavgtemp',
    'zone14pBavgtemp',
    'zone14pCavgtemp',
    'zone14pDavgtemp',
    'zone15pAavgtemp',
    'zone15pBavgtemp',
    'zone15pCavgtemp',
    'zone15pDavgtemp',
    'zone16pAavgtemp',
    'zone16pBavgtemp',
    'zone16pCavgtemp',
    'zone16pDavgtemp',
    'zone09control',
    'zone10control',
    'zone11control',
    'zone12control',
    'zone13control',
    'zone14control',
    'zone15control',
    'zone16control',
    'zone09reset',
    'zone10reset',
    'zone11reset',
    'zone12reset',
    'zone13reset',
    'zone14reset',
    'zone15reset',
    'zone16reset',
    'zone09print',
    'zone10print',
    'zone11print',
    'zone12print',
    'zone13print',
    'zone14print',
    'zone15print',
    'zone16print',
    'loadzone09active',
    'loadzone10active',
    'loadzone11active',
    'loadzone12active',
    'loadzone13active',
    'loadzone14active',
    'loadzone15active',
    'loadzone16active',
    'zone09avgdamper',
    'zone10avgdamper',
    'zone11avgdamper',
    'zone12avgdamper',
    'zone13avgdamper',
    'zone14avgdamper',
    'zone15avgdamper',
    'zone16avgdamper',
    'zone09avgtimer',
    'zone10avgtimer',
    'zone11avgtimer',
    'zone12avgtimer',
    'zone13avgtimer',
    'zone14avgtimer',
    'zone15avgtimer',
    'zone16avgtimer',
    'zone09pfrptime',
    'zone10pfrptime',
    'zone11pfrptime',
    'zone12pfrptime',
    'zone13pfrptime',
    'zone14pfrptime',
    'zone15pfrptime',
    'zone16pfrptime',
    'zone09moveto',
    'zone10moveto',
    'zone11moveto',
    'zone12moveto',
    'zone13moveto',
    'zone14moveto',
    'zone15moveto',
    'zone16moveto',
    'zone09movedfrom',
    'zone10movedfrom',
    'zone11movedfrom',
    'zone12movedfrom',
    'zone13movedfrom',
    'zone14movedfrom',
    'zone15movedfrom',
    'zone16movedfrom',
    'zone09regime',
    'zone10regime',
    'zone11regime',
    'zone12regime',
    'zone13regime',
    'zone14regime',
    'zone15regime',
    'zone16regime',
    'zone09regtimer',
    'zone10regtimer',
    'zone11regtimer',
    'zone12regtimer',
    'zone13regtimer',
    'zone14regtimer',
    'zone15regtimer',
    'zone16regtimer',
    'zone09irrcontrol',
    'zone10irrcontrol',
    'zone11irrcontrol',
    'zone12irrcontrol',
    'zone13irrcontrol',
    'zone14irrcontrol',
    'zone15irrcontrol',
    'zone16irrcontrol',
    'zone09irrigation',
    'zone10irrigation',
    'zone11irrigation',
    'zone12irrigation',
    'zone13irrigation',
    'zone14irrigation',
    'zone15irrigation',
    'zone16irrigation',
    'zone09irrtimer',
    'zone10irrtimer',
    'zone11irrtimer',
    'zone12irrtimer',
    'zone13irrtimer',
    'zone14irrtimer',
    'zone15irrtimer',
    'zone16irrtimer',
    'container01alarmage',
    'container02alarmage',
    'container01estop',
    'container02estop',
    'container02temp',
    'estopactive',
    'batchfilesinuse',
    'blowerstartupinuse',
    'settingsinuse',
    'zonestartupinuse',
    'refreshsettings',
  ],
  zoneGroups: [
    {
      groupBlower: {
        blowerId: '02',
        blowerLabel: 'Blower-2',
        containerId: '02',
      },
      groupZones: [
        {
          zoneId: '09',
          zoneLabel: '2-1',
          zoneTempALabel: '2-1-AT',
          zoneTempBLabel: '2-1-AB',
          zoneTempCLabel: '2-1-BT',
          zoneTempDLabel: '2-1-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '10',
          zoneLabel: '2-2',
          zoneTempALabel: '2-2-AT',
          zoneTempBLabel: '2-2-AB',
          zoneTempCLabel: '2-2-BT',
          zoneTempDLabel: '2-2-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '11',
          zoneLabel: '2-3',
          zoneTempALabel: '2-3-AT',
          zoneTempBLabel: '2-3-AB',
          zoneTempCLabel: '2-3-BT',
          zoneTempDLabel: '2-3-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '12',
          zoneLabel: '2-4',
          zoneTempALabel: '2-4-AT',
          zoneTempBLabel: '2-4-AB',
          zoneTempCLabel: '2-4-BT',
          zoneTempDLabel: '2-4-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '13',
          zoneLabel: '2-5',
          zoneTempALabel: '2-5-AT',
          zoneTempBLabel: '2-5-AB',
          zoneTempCLabel: '2-5-BT',
          zoneTempDLabel: '2-5-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '14',
          zoneLabel: '2-6',
          zoneTempALabel: '2-6-AT',
          zoneTempBLabel: '2-6-AB',
          zoneTempCLabel: '2-6-BT',
          zoneTempDLabel: '2-6-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '15',
          zoneLabel: '2-7',
          zoneTempALabel: '2-7-AT',
          zoneTempBLabel: '2-7-AB',
          zoneTempCLabel: '2-7-BT',
          zoneTempDLabel: '2-7-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '16',
          zoneLabel: '2-8',
          zoneTempALabel: '2-8-AT',
          zoneTempBLabel: '2-8-AB',
          zoneTempCLabel: '2-8-BT',
          zoneTempDLabel: '2-8-BB',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
      ],
    },
  ],
  graphConfig: {
    largeDatasetMinSize: 0,
    dataExclusionList: ['PFRP Time'],
    displayReferenceTempOnGraph: true,
    referenceTempColor: 'orange',
    pfrpSectionColor: 'orange',
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
          settingMax: 180,
        },
        {
          settingName: 'Regime2TempSetPoint',
          settingLabel: 'PFRP Regime Temp Set Point',
          settingUnit: temperatureUnit,
          settingType: 'number',
          settingMin: 0,
          settingMax: 180,
        },
        {
          settingName: 'Regime3TempSetPoint',
          settingLabel: 'VAR Regime Temp Set Point',
          settingUnit: temperatureUnit,
          settingType: 'number',
          settingMin: 0,
          settingMax: 180,
        },
        {
          settingName: 'Zone09RegimeType',
          settingLabel: 'Zone 2-1 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
        {
          settingName: 'Zone10RegimeType',
          settingLabel: 'Zone 2-2 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
        {
          settingName: 'Zone11RegimeType',
          settingLabel: 'Zone 2-3 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
        {
          settingName: 'Zone12RegimeType',
          settingLabel: 'Zone 2-4 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
        {
          settingName: 'Zone13RegimeType',
          settingLabel: 'Zone 2-5 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
        {
          settingName: 'Zone14RegimeType',
          settingLabel: 'Zone 2-6 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
        {
          settingName: 'Zone15RegimeType',
          settingLabel: 'Zone 2-7 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
        {
          settingName: 'Zone16RegimeType',
          settingLabel: 'Zone 2-8 Regime Type',
          settingType: 'string',
          settingHidden: true,
        },
      ],
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
          settingMax: 100,
        },
        {
          settingName: 'MaxVFDSpeed',
          settingLabel: 'Maximum VFD Speed',
          settingUnit: '%',
          settingType: 'number',
          settingMin: 20,
          settingMax: 100,
        },
        {
          settingName: 'PressureSetpointMin',
          settingLabel: 'Blower Pressure Setpoint Min',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 15,
        },
        {
          settingName: 'PressureSetpointMax',
          settingLabel: 'Blower Pressure Setpoint Max',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 15,
        },
        {
          settingName: 'PressureSetpointChangeTimer',
          settingLabel: 'Blower Pressure Setpoint Change Timer',
          settingUnit: 'Minutes',
          settingType: 'number',
          settingIncrementStep: 1,
          settingMin: 1,
          settingMax: 720,
        },
        {
          settingName: 'PressureSetpointChangeInterval',
          settingLabel: 'Blower Pressure Setpoint Change Interval',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 15,
        },
        {
          settingName: 'PressureSetpointHotZoneTrigger',
          settingLabel: 'Blower Pressure Setpoint Hot Zone Trigger',
          settingUnit: '%',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 0,
          settingMax: 100,
        },
        {
          settingName: 'PressureSetpointColdZoneTrigger',
          settingLabel: 'Blower Pressure Setpoint Cold Zone Trigger',
          settingUnit: '%',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 0,
          settingMax: 100,
        },
      ],
      groupAdvancedLabel: 'Blower PID Settings',
      groupAdvancedSettings: [
        {
          settingName: 'BlowerGain',
          settingLabel: 'Gain',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1,
        },
        {
          settingName: 'BlowerIntegral',
          settingLabel: 'Integral',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1,
        },
        {
          settingName: 'BlowerDerivative',
          settingLabel: 'Derivative',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1,
        },
        {
          settingName: 'BlowerDerivativeTime',
          settingLabel: 'Derivative Time',
          settingType: 'number',
          settingMin: 1,
          settingMax: 10,
        },
        {
          settingName: 'BlowerRate',
          settingLabel: 'Rate',
          settingUnit: 'Seconds',
          settingType: 'number',
          settingMin: 1,
          settingMax: 300,
        },
      ],
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
          settingMax: 100,
        },
      ],
      groupAdvancedLabel: 'Damper PID Settings',
      groupAdvancedSettings: [
        {
          settingName: 'DamperGain',
          settingLabel: 'Gain',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1,
        },
        {
          settingName: 'DamperIntegral',
          settingLabel: 'Integral',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1,
        },
        {
          settingName: 'DamperDerivative',
          settingLabel: 'Derivative',
          settingType: 'number',
          settingMin: 0.1,
          settingMax: 2,
          settingIncrementStep: 0.1,
        },
        {
          settingName: 'DamperDerivativeTime',
          settingLabel: 'Derivative Time',
          settingType: 'number',
          settingMin: 1,
          settingMax: 10,
        },
        {
          settingName: 'DamperRate',
          settingLabel: 'Rate',
          settingUnit: 'Seconds',
          settingType: 'number',
          settingMin: 1,
          settingMax: 300,
        },
      ],
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
          settingMax: 200,
        },
        {
          settingName: 'GraphReferenceTempLabel',
          settingLabel: 'Reference Temp Label',
          settingType: 'string',
        },
      ],
    },
    {
      groupName: 'admin',
      groupLabel: 'Administration',
      groupTitle: 'Administration Settings',
      groupSettings: [
        {
          settingName: 'FacilityName',
          settingLabel: 'Facility Name',
          settingType: 'string',
        },
        {
          settingName: 'Username',
          settingLabel: 'Username *',
          settingType: 'string',
          settingDisabled: true,
        },
        {
          settingName: 'Email',
          settingLabel: 'Email/SMS Address *',
          settingType: 'string',
          settingDisabled: true,
        },
        {
          settingName: 'TemperatureUnits',
          settingLabel: 'Temperature Units *',
          settingType: 'string',
          settingDisabled: true,
        },
        {
          settingName: 'MaxContainerTemp',
          settingLabel: 'Max Container Temperature',
          settingUnit: temperatureUnit,
          settingType: 'number',
          settingMin: 0,
          settingMax: 200,
        },
        {
          settingName: 'MaxTemperatureAlarm',
          settingLabel: 'High Temperature Alarm',
          settingUnit: temperatureUnit,
          settingType: 'number',
          settingMin: 0,
          settingMax: 180,
        },
        {
          settingName: 'MinTemperatureAlarm',
          settingLabel: 'Low Temperature Alarm',
          settingUnit: temperatureUnit,
          settingType: 'number',
          settingMin: 0,
          settingMax: 180,
        },
        {
          settingName: 'DataLoggingRate',
          settingLabel: 'Data Logging Rate',
          settingUnit: 'Minutes',
          settingType: 'number',
          settingMin: 0,
          settingMax: 720,
        },
      ],
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
      groupName: 'Zone09-16pA-DTemps',
      groupLabel: 'Zone 1-8 Temps',
      groupInputs: [
        {
          inputName: 'zone09pAtemp',
          inputLabel: '2-1-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone09pBtemp',
          inputLabel: '2-1-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone09pCtemp',
          inputLabel: '2-1-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone09pDtemp',
          inputLabel: '2-1-BB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone10pAtemp',
          inputLabel: '2-2-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone10pBtemp',
          inputLabel: '2-2-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone10pCtemp',
          inputLabel: '2-2-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone10pDtemp',
          inputLabel: '2-2-BB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone11pAtemp',
          inputLabel: '2-3-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone11pBtemp',
          inputLabel: '2-3-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone11pCtemp',
          inputLabel: '2-3-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone11pDtemp',
          inputLabel: '2-3-BB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone12pAtemp',
          inputLabel: '2-4-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone12pBtemp',
          inputLabel: '2-4-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone12pCtemp',
          inputLabel: '2-4-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone12pDtemp',
          inputLabel: '2-4-BB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone13pAtemp',
          inputLabel: '2-5-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone13pBtemp',
          inputLabel: '2-5-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone13pCtemp',
          inputLabel: '2-5-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone13pDtemp',
          inputLabel: '2-5-BB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone14pAtemp',
          inputLabel: '2-6-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone14pBtemp',
          inputLabel: '2-6-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone14pCtemp',
          inputLabel: '2-6-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone14pDtemp',
          inputLabel: '2-6-BB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone15pAtemp',
          inputLabel: '2-7-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone15pBtemp',
          inputLabel: '2-7-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone15pCtemp',
          inputLabel: '2-7-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone15pDtemp',
          inputLabel: '2-7-BB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone16pAtemp',
          inputLabel: '2-8-AT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone16pBtemp',
          inputLabel: '2-8-AB',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone16pCtemp',
          inputLabel: '2-8-BT',
          inputUnit: temperatureUnit,
        },
        {
          inputName: 'zone16pDtemp',
          inputLabel: '2-8-BB',
          inputUnit: temperatureUnit,
        },
      ],
    },
    {
      groupName: 'ZoneDampers',
      groupLabel: 'Zone Dampers',
      groupInputs: [
        {
          inputName: 'damper09position',
          inputLabel: 'Damper 2-1 Position',
          inputUnit: '%',
        },
        {
          inputName: 'damper10position',
          inputLabel: 'Damper 2-2 Position',
          inputUnit: '%',
        },
        {
          inputName: 'damper11position',
          inputLabel: 'Damper 2-3 Position',
          inputUnit: '%',
        },
        {
          inputName: 'damper12position',
          inputLabel: 'Damper 2-4 Position',
          inputUnit: '%',
        },
        {
          inputName: 'damper13position',
          inputLabel: 'Damper 2-5 Position',
          inputUnit: '%',
        },
        {
          inputName: 'damper14position',
          inputLabel: 'Damper 2-6 Position',
          inputUnit: '%',
        },
        {
          inputName: 'damper15position',
          inputLabel: 'Damper 2-7 Position',
          inputUnit: '%',
        },
        {
          inputName: 'damper16position',
          inputLabel: 'Damper 2-8 Position',
          inputUnit: '%',
        },
      ],
    },
    {
      groupName: 'Blowers',
      groupLabel: 'Blowers',
      groupInputs: [
        {
          inputName: 'blower02run',
          inputLabel: 'Blower-2 Run',
          inputTranslations: [
            { value: 0, translation: 'Stop' },
            { value: 1, translation: 'Start' },
          ],
        },
        {
          inputName: 'blower02fault',
          inputLabel: 'Blower-2 Fault',
          inputTranslations: [
            { value: 0, translation: 'Fault' },
            { value: 1, translation: 'Okay' },
          ],
        },
        {
          inputName: 'blower02value',
          inputLabel: 'Blower-2 Speed',
          inputUnit: '%',
        },
      ],
    },
    {
      groupName: 'Manifolds',
      groupLabel: 'Manifolds',
      groupInputs: [
        {
          inputName: 'duct02pressure',
          inputLabel: 'Duct-2 Pressure',
          inputUnit: 'inches',
        },
      ],
    },
    {
      groupName: 'ContainerTemps',
      groupLabel: 'Container Temps',
      groupInputs: [
        {
          inputName: 'container02temp',
          inputLabel: 'Container-02 Temp',
          inputUnit: temperatureUnit,
        }
      ],
    },
  ],
};