
const temperatureUnit = '°C';

var facilityConfig = {
  verifiedWithVersion: '1.0.54',
  dbPath: '',
  temperatureUnit: temperatureUnit,
  layoutType: 'card',
  displayPFRPTime: true,
  hasTurboMode: true,
  hasBiofilterCard: true,
  zoneProbeIds: ['A'],
  IORegList: [
    "duct01presssptimer",
    "duct02presssptimer",
    "duct03presssptimer",
    "duct04presssptimer",
    "duct05presssptimer",
    "duct06presssptimer",
    "duct01pressure",
    "duct02pressure",
    "duct03pressure",
    "duct04pressure",
    "duct05pressure",
    "duct06pressure",
    "duct01pressuresp",
    "duct02pressuresp",
    "duct03pressuresp",
    "duct04pressuresp",
    "duct05pressuresp",
    "duct06pressuresp",
    "duct01pressureavg",
    "duct02pressureavg",
    "duct03pressureavg",
    "duct04pressureavg",
    "duct05pressureavg",
    "duct06pressureavg",
    "blower01run",
    "blower02run",
    "blower03run",
    "blower04run",
    "blower05run",
    "blower06run",
    "blower01fault",
    "blower02fault",
    "blower03fault",
    "blower04fault",
    "blower05fault",
    "blower06fault",
    "blower01speed",
    "blower02speed",
    "blower03speed",
    "blower04speed",
    "blower05speed",
    "blower06speed",
    "blower01control",
    "blower02control",
    "blower03control",
    "blower04control",
    "blower05control",
    "blower06control",
    "blower01override",
    "blower02override",
    "blower03override",
    "blower04override",
    "blower05override",
    "blower06override",
    "blower01value",
    "blower02value",
    "blower03value",
    "blower04value",
    "blower05value",
    "blower06value",
    "bioblower01fault",
    "bioblower01run",
    "bioblower01speed",
    "bioblower01speedsp",
    "bioblower01pospress",
    "bioblower01negpress",
    "biopospressure01avg",
    "bionegpressure01avg",
    "bioblower01control",
    "bioblower01override",
    "bioblower01value",
    "biodamper01position",
    "biodamper02position",
    "biodamper01value",
    "biodamper02value",
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
    "zone01pAtemp",
    "zone02pAtemp",
    "zone03pAtemp",
    "zone04pAtemp",
    "zone05pAtemp",
    "zone06pAtemp",
    "zone07pAtemp",
    "zone08pAtemp",
    "zone09pAtemp",
    "zone10pAtemp",
    "zone11pAtemp",
    "zone12pAtemp",
    "zone01pAlvtemp",
    "zone02pAlvtemp",
    "zone03pAlvtemp",
    "zone04pAlvtemp",
    "zone05pAlvtemp",
    "zone06pAlvtemp",
    "zone07pAlvtemp",
    "zone08pAlvtemp",
    "zone09pAlvtemp",
    "zone10pAlvtemp",
    "zone11pAlvtemp",
    "zone12pAlvtemp",
    "zone01pAavgtemp",
    "zone02pAavgtemp",
    "zone03pAavgtemp",
    "zone04pAavgtemp",
    "zone05pAavgtemp",
    "zone06pAavgtemp",
    "zone07pAavgtemp",
    "zone08pAavgtemp",
    "zone09pAavgtemp",
    "zone10pAavgtemp",
    "zone11pAavgtemp",
    "zone12pAavgtemp",
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
    "tunnel01door",
    "tunnel02door",
    "tunnel03door",
    "tunnel04door",
    "tunnel05door",
    "tunnel06door",
    "hsdamper01position",
    "hsdamper02position",
    "hsdamper03position",
    "hsdamper04position",
    "hsdamper05position",
    "hsdamper06position",
    "hsdamper01override",
    "hsdamper02override",
    "hsdamper03override",
    "hsdamper04override",
    "hsdamper05override",
    "hsdamper06override",
    "hsdamper01value",
    "hsdamper02value",
    "hsdamper03value",
    "hsdamper04value",
    "hsdamper05value",
    "hsdamper06value",
    "extrdoor01open",
    "extrdoor02open",
    "window01open",
    "turbocontrol",
    "turborun",
    "turbotimer",
    "batchfilesinuse",
    "blowerstartupinuse",
    "settingsinuse",
    "zonestartupinuse",
    "refreshsettings",
  ],
  zoneGroups: [
    {
      groupBlower: {
        biofilterId: '01',
        blowerLabel: 'B',
        hasCustomCycleControl: false,
        isBiofilter: true,
        hasDamperControl: true,
        hasBlowerControl: true,
        hasSuctionSensor: true,
        hasExternalDoors: true,
        hasWindows: true,
        hasTurboMode: true
      },
      groupDampers: [
        {
          damperId: '01',
        },
        {
          damperId: '02',
        }
      ],
      groupExtDoors: [
        {
          doorId: '01',
        },
        {
          doorId: '02',
        }
      ],
      groupWindows: [
        {
          windowId: '01',
        }
      ],
      groupZones: [
      ]
    },
    {
      groupBlower: {
        blowerId: '01',
        blowerLabel: 'T1',
        hasCustomCycleControl: false,
        hasTunnelDoor: true,
        hasHeadspaceDamper: true,
      },
      groupZones: [
        {
          zoneId: '01',
          zoneLabel: 'T1A',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '02',
          zoneLabel: 'T1B',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
      ]
    },
    {
      groupBlower: {
        blowerId: '02',
        blowerLabel: 'T2',
        hasCustomCycleControl: false,
        hasTunnelDoor: true,
        hasHeadspaceDamper: true,
      },
      groupZones: [
        {
          zoneId: '03',
          zoneLabel: 'T2A',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '04',
          zoneLabel: 'T2B',
          setpointSettingName: 'RegimeXTempSetPoint',
        }
      ]
    },
    {
      groupBlower: {
        blowerId: '03',
        blowerLabel: 'T3',
        hasCustomCycleControl: false,
        hasTunnelDoor: true,
        hasHeadspaceDamper: true,
      },
      groupZones: [
        {
          zoneId: '05',
          zoneLabel: 'T3A',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '06',
          zoneLabel: 'T3B',
          setpointSettingName: 'RegimeXTempSetPoint',
        }
      ]
    },
    {
      groupBlower: {
        blowerId: '04',
        blowerLabel: 'T4',
        hasCustomCycleControl: false,
        hasTunnelDoor: true,
        hasHeadspaceDamper: true,
      },
      groupZones: [
        {
          zoneId: '07',
          zoneLabel: 'T4A',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '08',
          zoneLabel: 'T4B',
          setpointSettingName: 'RegimeXTempSetPoint',
        }
      ]
    },
    {
      groupBlower: {
        blowerId: '05',
        blowerLabel: 'T5',
        hasCustomCycleControl: false,
        hasTunnelDoor: true,
        hasHeadspaceDamper: true,
      },
      groupZones: [
        {
          zoneId: '09',
          zoneLabel: 'T5A',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '10',
          zoneLabel: 'T5B',
          setpointSettingName: 'RegimeXTempSetPoint',
        }
      ]
    },
    {
      groupBlower: {
        blowerId: '06',
        blowerLabel: 'T6',
        hasCustomCycleControl: false,
        hasTunnelDoor: true,
        hasHeadspaceDamper: true,
      },
      groupZones: [
        {
          zoneId: '11',
          zoneLabel: 'T6A',
          setpointSettingName: 'RegimeXTempSetPoint',
        },
        {
          zoneId: '12',
          zoneLabel: 'T6B',
          setpointSettingName: 'RegimeXTempSetPoint',
        }
      ]
    }
  ],
  graphConfig: {
    largeDatasetMinSize: 0,
    displayReferenceTempOnGraph: true,
    referenceTempColor: "orange",
    dataExclusionList: [
      'Biofilter Temp',
      'PFRP Time'
    ],
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
          settingName: 'PressureSetpointMin',
          settingLabel: 'Blower Pressure Setpoint Min',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: .1,
          settingMin: 1,
          settingMax: 27
        },
        {
          settingName: 'PressureSetpointMax',
          settingLabel: 'Blower Pressure Setpoint Max',
          settingUnit: 'Inches',
          settingType: 'number',
          settingIncrementStep: .1,
          settingMin: 1,
          settingMax: 27
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
          settingMin: .1,
          settingMax: 15
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
      groupName: 'biofilter',
      groupLabel: 'Biofilter Control',
      groupTitle: 'Biofilter Settings',
      groupSettings: [,
        {
          settingName: 'TurboFailsafeTimer',
          settingLabel: 'Turbo Mode Fail Safe Timer',
          settingUnit: 'Minutes',
          settingType: 'number',
          settingIncrementStep: 1,
          settingMin: 1,
          settingMax: 720
        },
        {
          settingName: 'MinBiofilterVFDSpeed',
          settingLabel: 'Minimum Biofilter VFD Speed',
          settingUnit: '%',
          settingType: 'number',
          settingMin: 20,
          settingMax: 100
        },
        // {
        //   settingName: 'MaxBiofilterVFDSpeed',
        //   settingLabel: 'Maximum Biofilter VFD Speed',
        //   settingUnit: '%',
        //   settingType: 'number',
        //   settingMin: 20,
        //   settingMax: 100
        // },
        // {
        //   settingName: 'MinBiofilterDamperValue',
        //   settingLabel: 'Minimum Biofilter Damper Value',
        //   settingUnit: '%',
        //   settingType: 'number',
        //   settingMin: 5,
        //   settingMax: 100
        // },
      ],
    //   groupAdvancedLabel: 'Biofilter Blower PID Settings',
    //   groupAdvancedSettings: [
    //     {
    //       settingName: 'BiofilterBlowerGain',
    //       settingLabel: 'Gain',
    //       settingType: 'number',
    //       settingMin: .1,
    //       settingMax: 2,
    //       settingIncrementStep: .1,
    //     },
    //     {
    //       settingName: 'BiofilterBlowerIntegral',
    //       settingLabel: 'Integral',
    //       settingType: 'number',
    //       settingMin: .1,
    //       settingMax: 2,
    //       settingIncrementStep: .1,
    //     },
    //     {
    //       settingName: 'BiofilterBlowerDerivative',
    //       settingLabel: 'Derivative',
    //       settingType: 'number',
    //       settingMin: .1,
    //       settingMax: 2,
    //       settingIncrementStep: .1,
    //     },
    //     {
    //       settingName: 'BiofilterBlowerDerivativeTime',
    //       settingLabel: 'Derivative Time',
    //       settingType: 'number',
    //       settingMin: 1,
    //       settingMax: 10
    //     },
    //     {
    //       settingName: 'BiofilterBlowerRate',
    //       settingLabel: 'Rate',
    //       settingUnit: 'Seconds',
    //       settingType: 'number',
    //       settingMin: 1,
    //       settingMax: 300
    //     }
    //   ]
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
          settingName: 'OperatingHoursStart',
          settingLabel: 'Operating Hours Start Time',
          settingType: 'time',
          settingMaxId: 'OperatingHoursEnd'
        },
        {
          settingName: 'OperatingHoursEnd',
          settingLabel: 'Operating Hours End Time',
          settingType: 'time',
          settingMinId: 'OperatingHoursStart'
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
                inputName: 'zone01pAtemp',
                inputLabel: 'Zone 1 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone02pAtemp',
                inputLabel: 'Zone 2 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone03pAtemp',
                inputLabel: 'Zone 3 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone04pAtemp',
                inputLabel: 'Zone 4 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone05pAtemp',
                inputLabel: 'Zone 5 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone06pAtemp',
                inputLabel: 'Zone 6 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone07pAtemp',
                inputLabel: 'Zone 7 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone08pAtemp',
                inputLabel: 'Zone 8 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone09pAtemp',
                inputLabel: 'Zone 9 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone10pAtemp',
                inputLabel: 'Zone 10 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone11pAtemp',
                inputLabel: 'Zone 11 Temp',
                inputUnit: temperatureUnit
            },
            {
                inputName: 'zone12pAtemp',
                inputLabel: 'Zone 12 Temp',
                inputUnit: temperatureUnit
            },
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
          inputName: 'blower05run',
          inputLabel: 'Blower 5 Run',
          inputTranslations: [
            { value: 0, translation: 'Stop' },
            { value: 1, translation: 'Start' }
          ]
        },
        {
          inputName: 'blower06run',
          inputLabel: 'Blower 6 Run',
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
          inputName: 'blower05fault',
          inputLabel: 'Blower 5 Fault',
          inputTranslations: [
            { value: 0, translation: 'Fault' },
            { value: 1, translation: 'Okay' }
          ]
        },
        {
          inputName: 'blower06fault',
          inputLabel: 'Blower 6 Fault',
          inputTranslations: [
            { value: 0, translation: 'Fault' },
            { value: 1, translation: 'Okay' }
          ]
        },
        {
          inputName: 'blower01speed',
          inputLabel: 'Blower 1 Speed',
          inputUnit: '%'
        },
        {
          inputName: 'blower02speed',
          inputLabel: 'Blower 2 Speed',
          inputUnit: '%'
        },
        {
          inputName: 'blower03speed',
          inputLabel: 'Blower 3 Speed',
          inputUnit: '%'
        },
        {
          inputName: 'blower04speed',
          inputLabel: 'Blower 4 Speed',
          inputUnit: '%'
        },
        {
          inputName: 'blower05speed',
          inputLabel: 'Blower 5 Speed',
          inputUnit: '%'
        },
        {
          inputName: 'blower06speed',
          inputLabel: 'Blower 6 Speed',
          inputUnit: '%'
        }
      ]
    },
    {
      groupName: 'Biofilter',
      groupLabel: 'Biofilter',
      groupInputs: [
        {
          inputName: 'bioblower01run',
          inputLabel: 'Biofilter blower Run',
          inputTranslations: [
            { value: 0, translation: 'Stop' },
            { value: 1, translation: 'Start' }
          ]
        },
        {
          inputName: 'bioblower01fault',
          inputLabel: 'Biofilter blower Fault',
          inputTranslations: [
            { value: 0, translation: 'Fault' },
            { value: 1, translation: 'Okay' }
          ]
        },
        {
          inputName: 'bioblower01speed',
          inputLabel: 'Biofilter blower Speed',
          inputUnit: '%'
        },
        {
          inputName: 'bioblower01pospress',
          inputLabel: 'Positive Biofilter Pressure',
          inputUnit: 'inches'
        },
        {
          inputName: 'bioblower01negpress',
          inputLabel: 'Negative Biofilter Pressure',
          inputUnit: 'inches'
        },
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
        {
          inputName: 'duct02pressure',
          inputLabel: 'Duct 2 Pressure',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct03pressure',
          inputLabel: 'Duct 3 Pressure',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct04pressure',
          inputLabel: 'Duct 4 Pressure',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct05pressure',
          inputLabel: 'Duct 5 Pressure',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct06pressure',
          inputLabel: 'Duct 6 Pressure',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct01pressuresp',
          inputLabel: 'Duct 1 Pressure Setpoint',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct02pressuresp',
          inputLabel: 'Duct 2 Pressure Setpoint',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct03pressuresp',
          inputLabel: 'Duct 3 Pressure Setpoint',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct04pressuresp',
          inputLabel: 'Duct 4 Pressure Setpoint',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct05pressuresp',
          inputLabel: 'Duct 5 Pressure Setpoint',
          inputUnit: 'inches'
        },
        {
          inputName: 'duct06pressuresp',
          inputLabel: 'Duct 6 Pressure Setpoint',
          inputUnit: 'inches'
        }
      ]
    },
  ]
}
