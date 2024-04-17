
const temperatureUnit = '°F';

var facilityConfig = {
    verifiedWithVersion: '1.0.8',
    temperatureUnit: temperatureUnit,
    defaultPage: 'status',
    showMap: false,
    layoutType: 'card',
    zoneProbeIds: [],
    zoneGroups: [
        {
            groupBlower: {
                blowerId: '01',
                blowerLabel: 'Blower 1',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '01',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper01control',
                        ioLabel: 'Damper 1',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '02',
                blowerLabel: 'Blower 2',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '02',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper02control',
                        ioLabel: 'Damper 2',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '03',
                blowerLabel: 'Blower 3',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '03',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper03control',
                        ioLabel: 'Damper 3',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '04',
                blowerLabel: 'Blower 4',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '04',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper04control',
                        ioLabel: 'Damper 4',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '05',
                blowerLabel: 'Blower 5',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '05',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper05control',
                        ioLabel: 'Damper 5',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '06',
                blowerLabel: 'Blower 6',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '06',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper06control',
                        ioLabel: 'Damper 6',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '07',
                blowerLabel: 'Blower 7',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '07',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper07control',
                        ioLabel: 'Damper 6',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '08',
                blowerLabel: 'Blower 8',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '08',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper08control',
                        ioLabel: 'Damper 8',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '09',
                blowerLabel: 'Blower 9',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '09',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper09control',
                        ioLabel: 'Damper 9',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        },
        {
            groupBlower: {
                blowerId: '10',
                blowerLabel: 'Blower 10',
                hasSpeedControl: false,
                hasCustomCycleControl: false
            },
            groupZones: [
                {
                    zoneId: '10',
                    hasDamperControl: false,
                    ioDisplays: [
                      {
                        ioType: 'Damper',
                        ioName: 'damper10control',
                        ioLabel: 'Damper 10',
                        ioTranslations: [
                          { value: 0, translation: 'A' },
                          { value: 1, translation: 'B' }
                        ]
                      }
                    ]
                }
            ]
        }
    ],
    graphConfig: {
        largeDatasetMinSize: 0
    },
    settingsGroups: [
        {
            groupName: 'blower',
            groupLabel: 'Blower Control',
            groupTitle: 'Blower Settings',
            groupSettings: [
                {
                    settingName: 'Blower01CycleOnTime',
                    settingLabel: 'Blower 1 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower02CycleOnTime',
                    settingLabel: 'Blower 2 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower03CycleOnTime',
                    settingLabel: 'Blower 3 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower04CycleOnTime',
                    settingLabel: 'Blower 4 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower05CycleOnTime',
                    settingLabel: 'Blower 5 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower06CycleOnTime',
                    settingLabel: 'Blower 6 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower07CycleOnTime',
                    settingLabel: 'Blower 7 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower08CycleOnTime',
                    settingLabel: 'Blower 8 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower09CycleOnTime',
                    settingLabel: 'Blower 9 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower10CycleOnTime',
                    settingLabel: 'Blower 10 On Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower01CycleOffTime',
                    settingLabel: 'Blower 1 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower02CycleOffTime',
                    settingLabel: 'Blower 2 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower03CycleOffTime',
                    settingLabel: 'Blower 3 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower04CycleOffTime',
                    settingLabel: 'Blower 4 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower05CycleOffTime',
                    settingLabel: 'Blower 5 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower06CycleOffTime',
                    settingLabel: 'Blower 6 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower07CycleOffTime',
                    settingLabel: 'Blower 7 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower08CycleOffTime',
                    settingLabel: 'Blower 8 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower09CycleOffTime',
                    settingLabel: 'Blower 9 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'Blower10CycleOffTime',
                    settingLabel: 'Blower 10 Off Time (each cycle)',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                },
                {
                    settingName: 'ManualBlowerDamperCycleTime',
                    settingLabel: 'Manual Blower Damper Cycle Time',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 30
                }
            ]
        },
        {
            groupName: 'damper',
            groupLabel: 'Damper Control',
            groupTitle: 'Damper Settings',
            groupSettings: [
                {
                    settingName: 'DamperAdvance',
                    settingLabel: 'Damper Transition Time',
                    settingUnit: 'Seconds',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 120
                }
            ],
            groupAdvancedLabel: 'Damper PID Settings',
            groupAdvancedSettings: [
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
                    settingName: 'DataLoggingRate',
                    settingLabel: 'Data Logging Rate',
                    settingUnit: 'Minutes',
                    settingType: 'number',
                    settingMin: 0,
                    settingMax: 720
                }
            ]
        }
    ],
    inputMonitorGroups: [
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
                    inputName: 'blower07run',
                    inputLabel: 'Blower 7 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower08run',
                    inputLabel: 'Blower 8 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower09run',
                    inputLabel: 'Blower 9 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                },
                {
                    inputName: 'blower10run',
                    inputLabel: 'Blower 10 Run',
                    inputTranslations: [
                        { value: 0, translation: 'Stop' },
                        { value: 1, translation: 'Start' }
                    ]
                }
            ]
        },
        {
            groupName: 'Dampers',
            groupLabel: 'Dampers',
            groupInputs: [
                {
                    inputName: 'damper01control',
                    inputLabel: 'Damper 1 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper02control',
                    inputLabel: 'Damper 2 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper03control',
                    inputLabel: 'Damper 3 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper04control',
                    inputLabel: 'Damper 4 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper05control',
                    inputLabel: 'Damper 5 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper06control',
                    inputLabel: 'Damper 6 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper07control',
                    inputLabel: 'Damper 7 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper08control',
                    inputLabel: 'Damper 8 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper09control',
                    inputLabel: 'Damper 9 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                },
                {
                    inputName: 'damper10control',
                    inputLabel: 'Damper 10 Status',
                    inputTranslations: [
                        { value: 1, translation: 'A' },
                        { value: 0, translation: 'B' }
                    ]
                }
            ]
        }
    ]
}
