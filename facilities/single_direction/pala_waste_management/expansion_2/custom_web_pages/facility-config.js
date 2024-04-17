const temperatureUnit = '°F';

var facilityConfig = {
  verifiedWithVersion: '1.0.54',
  dbPath: '',
  temperatureUnit: temperatureUnit,
  layoutType: 'card',
  isPumpPanel: true,
  overrideDisabledSettings: false,
  ductProbeIds: ['A', 'B'],
  logFileHeaders: {
    'Damper': 'Damper Position'
  },
  IORegList: [
    'tank01level',
    'tank02level',
    'tank01presssptimer',
    'tank02presssptimer',
    'tank01pressure',
    'tank02pressure',
    'tank01pressuresp',
    'tank02pressuresp',
    'tank01pressureavg',
    'tank02pressureavg',
    'tank01alarm',
    'tank02alarm',
    'tank01alarmage',
    'tank02alarmage',
    'pump01print',
    'pump02print',
    'pump01run',
    'pump02run',
    'pump01fault',
    'pump02fault',
    'pump01alarm',
    'pump02alarm',
    'pump01alarmage',
    'pump02alarmage',
    'pump01reset',
    'pump02reset',
    'pump01control',
    'pump02control',
    'duct01Apresssptimer',
    'duct01Bpresssptimer',
    'duct02Apresssptimer',
    'duct02Bpresssptimer',
    'duct01Apressure',
    'duct01Bpressure',
    'duct02Apressure',
    'duct02Bpressure',
    'duct01Apressuresp',
    'duct01Bpressuresp',
    'duct02Apressuresp',
    'duct02Bpressuresp',
    'duct01Apressureavg',
    'duct01Bpressureavg',
    'duct02Apressureavg',
    'duct02Bpressureavg',
    'irrigation01run',
    'irrigation02run',
    'pumpfilesinuse'
  ],
  tankGroups: [
    {
      groupPump: {
        pumpId: '01',
        pumpLabel: 'HV',
        pumpType: 'High volume'
      },
      groupTanks: [
        {
          tankId: '01',
          tankLabel: '1-1'
        },
      ]
    },
    {
      groupPump: {
        pumpId: '02',
        pumpLabel: 'LV',
        pumpType: 'Low volume'
      },
      groupTanks: [
        {
          tankId: '02',
          tankLabel: '2-2'
        },
      ]
    }
  ],
  graphConfig: {
    largeDatasetMinSize: 0,
    dataExclusionList: [''],
  },
  settingsGroups: [
    {
      groupName: 'pump',
      groupLabel: 'Pump Control',
      groupTitle: 'Pump Settings',
      groupSettings: [
        {
          settingName: 'Pump01PressureAlarmSetpoint',
          settingLabel: 'Pump 1 Pressure Alarm Setpoint',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
          settingDisabled: true,
        },
        {
          settingName: 'Pump02PressureAlarmSetpoint',
          settingLabel: 'Pump 2 Pressure Alarm Setpoint',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
          settingDisabled: true,
        },
        {
          settingName: 'Pump01PressureSetpointMin',
          settingLabel: 'Pump 1 Pressure Setpoint Min',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
        },
        {
          settingName: 'Pump02PressureSetpointMin',
          settingLabel: 'Pump 2 Pressure Setpoint Min',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
        },
        {
          settingName: 'Pump01PressureSetpointMax',
          settingLabel: 'Pump 1 Pressure Setpoint Max',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
        },
        {
          settingName: 'Pump02PressureSetpointMax',
          settingLabel: 'Pump 2 Pressure Setpoint Max',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
        },
        {
          settingName: 'Pump01ShutoffTimer',
          settingLabel: 'Pump 1 Shutoff Timer',
          settingUnit: 'seconds',
          settingType: 'number',
          settingMin: 1,
          settingMax: 300,
        },
        {
          settingName: 'Pump02ShutoffTimer',
          settingLabel: 'Pump 2 Shutoff Timer',
          settingUnit: 'seconds',
          settingType: 'number',
          settingMin: 1,
          settingMax: 300,
        },
      ],
    },
    {
      groupName: 'tank',
      groupLabel: 'Tank Control',
      groupTitle: 'Tank Settings',
      groupSettings: [
        {
          settingName: 'Tank01LowLevel',
          settingLabel: 'Percentage at which tank 1 is considered low',
          settingUnit: '%',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
          settingDisabled: true,
        },
        {
          settingName: 'Tank02LowLevel',
          settingLabel: 'Percentage at which tank 2 is considered low',
          settingUnit: '%',
          settingType: 'number',
          settingIncrementStep: 0.1,
          settingMin: 1,
          settingMax: 100,
          settingDisabled: true,
        },
        {
          settingName: 'Tank01CriticalLowLevel',
          settingLabel: 'Percentage at which tank 01 is considered critical low',
          settingUnit: '%',
          settingType: 'number',
          settingMin: 1,
          settingMax: 100,
          settingDisabled: true,
        },
        {
          settingName: 'Tank02CriticalLowLevel',
          settingLabel: 'Percentage at which tank 02 is considered critical low',
          settingUnit: '%',
          settingType: 'number',
          settingMin: 1,
          settingMax: 100,
          settingDisabled: true,
        },
      ],
    },
    // {
    //   groupName: 'graph',
    //   groupLabel: 'Graph Settings',
    //   groupTitle: 'Graph Settings',
    //   groupSettings: [
    //     {
    //       settingName: 'GraphReferenceTemp',
    //       settingLabel: 'Reference Temp',
    //       settingUnit: temperatureUnit,
    //       settingType: 'number',
    //       settingMin: 0,
    //       settingMax: 200,
    //     },
    //     {
    //       settingName: 'GraphReferenceTempLabel',
    //       settingLabel: 'Reference Temp Label',
    //       settingType: 'string',
    //     },
    //   ],
    // },
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
      groupName: 'Pump',
      groupLabel: 'Pump',
      groupInputs: [
        {
          inputName: 'pump01run',
          inputLabel: 'Pump-1 Run',
          inputTranslations: [
            { value: 0, translation: 'Stop' },
            { value: 1, translation: 'Start' },
          ],
        },
        {
          inputName: 'pump02run',
          inputLabel: 'Pump-2 Run',
          inputTranslations: [
            { value: 0, translation: 'Stop' },
            { value: 1, translation: 'Start' },
          ],
        },
        {
          inputName: 'pump01fault',
          inputLabel: 'Pump-1 Fault',
          inputTranslations: [
            { value: 0, translation: 'Fault' },
            { value: 1, translation: 'Okay' },
          ],
        },
        {
          inputName: 'pump02fault',
          inputLabel: 'Pump-2 Fault',
          inputTranslations: [
            { value: 0, translation: 'Fault' },
            { value: 1, translation: 'Okay' },
          ],
        },
      ],
    },
  ],
};
