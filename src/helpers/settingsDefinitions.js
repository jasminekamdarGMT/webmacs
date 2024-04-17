class settingsDefinitions {
  constructor () {
    this.facilityConfig = window.facilityConfig;
    this.definitions = {
      // VFD Definitions
      "MinVFDSpeed": "Minimum allowed speed for blowers",
      "MaxVFDSpeed": "Maximum allowed speed for blowers",
      "PrimaryMinVFDSpeed": "Minimum allowed speed for the blowers in the primary pad",
      "PrimaryMaxVFDSpeed": "Maximum allowed speed for the blowers in the primary pad",
      "SecondaryMinVFDSpeed": "Minimum allowed speed for the blowers in the secondary pad",
      "SecondaryMaxVFDSpeed": "Maximum allowed speed for the blowers in the secondary pad",
      // Pressure Definitions
      "PressureSetpointMin": "Minimum allowed setpoint for aeration pressure",
      "PressureSetpointMax": "Maximum allowed setpoint for aeration pressure",
      "NegDirPressureSetpointMax": "Maximum allowed setpoint for negative direction aeration pressure",
      "PosDirPressureSetpointMin": "Minimum allowed setpoint for positive direction aeration pressure",
      "PosDirPressureSetpointMax": "Maximum allowed setpoint for positive direction aeration pressure",
      "NegDirPressureSetpointMin": "Minimum allowed setpoint for negative direction aeration pressure",
      "PressureSetpointHotZoneTrigger": "Percentage of hot zones required to trigger an increase of duct pressure",
      "PressureSetpointColdZoneTrigger": "Percentage of cold zones required to trigger a decrease of duct pressure",
      "PressureSetpointChangeTimer": "Minutes between automatic duct pressure setpoint adjustments",
      "PressureSetpointChangeInterval": "Value at which the hot/cold zone trigger will increment/decrement the duct pressure",
      // Blower Definitions
      "BlowerGain": "Blower gain value",
      "BlowerIntegral": "Blower integral value",
      "BlowerDerivative": "Blower derivative value",
      "BlowerDerivativeTime": "Blower derivative time value",
      "BlowerRate": "Blower rate value",
      "BlowerCyclePositiveTime": "Amount of time the blower remains in the positive aeration cycle before it is allowed to switch to the negative aeration cycle",
      "BlowerCycleNegativeTime": "Amount of time the blower remains in the negative aeration cycle before it is allowed to switch to the positive aeration cycle",
      "ManualBlowerDamperCycleTime": "Manual blower damper cycle time value",
      // Biofilter Definitions
      "MinBiofilterVFDSpeed": "Minimum allowed speed for biofilter blowers",
      "MaxBiofilterVFDSpeed": "Maximum allowed speed for biofilter  blowers",
      "MinBiofilterDamperValue": "The minimum value for which the biofilter damper will be open",
      "BiofilterBlowerGain": "Biofilter blower gain value",
      "BiofilterBlowerIntegral": "Biofilter blower integral value",
      "BiofilterBlowerDerivative": "Biofilter blower derivative value",
      "BiofilterBlowerDerivativeTime": "Biofilter blower derivative time value",
      "BiofilterBlowerRate": "Biofilter blower rate value",
      "TurboFailsafeTimer": "Fail Safe Timer Duration for Turbo Mode",
      // Regime Definitions
      'Regime1TempSetPoint': "Target temperature setpoint for a zone that is in the warmup regime",
      'Regime1ReferenceTemp': "Determines which temperature reading will be referenced as the target temperature setpoint for a zone that is in the warmup regime",
      "Regime1Duration": "The minimum amount of time a zone will remain in the warmup regime",
      "Regime2TempSetPoint": "Target temperature setpoint for a zone that is in the PFRP regime",
      'Regime2ReferenceTemp': "Determines which temperature reading will be referenced as the target temperature setpoint for a zone that is in the PFRP regime",
      'Regime2Duration': "The minimum amount of time a zone will remain in the PFRP regime",
      "Regime3TempSetPoint": "Target temperature setpoint for a zone that is in the VAR regime",
      'Regime3ReferenceTemp': "Determines which temperature reading will be referenced as the target temperature setpoint for a zone that is in the VAR regime",
      // Damper Definitions
      "MinDamperValue": "The minimum value for which the damper will be open",
      "DamperGain": "Damper gain value",
      "DamperIntegral": "Damper integral value",
      "DamperDerivative": "Damper derivative value",
      "DamperDerivativeTime": "Damper derivative time value",
      "DamperRate": "Damper rate value",
      "DamperAdvance": "Damper transition time value",
      // Administration Definitions
      "FacilityName": "Name of facility",
      "Username": "Admin username",
      "Email": "Admin email address",
      "TemperatureUnits": "Temperature unit for facility (°F/°C)",
      "DataLoggingRate": "Interval for how often data will be logged for a zone",
      "MaxTemperatureAlarm": "Zone temperatures above this value will trigger alarm notifications",
      "MinTemperatureAlarm": "Zone temperatures below this value will trigger alarm notifications",
      "WirelessSensorAgeAlarm": "Amount of time that the wireless sensor can go without communication before triggering alarm notifications",
      "WirelessBaseStationIP": "IP address for the wireless base station",
      "OperatingHoursStart": "Scheduled start time for facility operating hours (Determines when biofilter blower will start ramping up to maximum speed)",
      "OperatingHoursEnd": "Scheduled end time for facility operating hours (Determines when biofilter blower will start ramping down to minimum speed)",
      // Misc. Definitions
      "PrimaryPadPosDirectionTempSetPoint": "Temperature setpoint for primary pad positive direction",
      "PrimaryPadNegDirectionTempSetPoint": "Temperature setpoint for primary pad negative direction",
      "BiofilterForcePositiveTemperature": "Biofilter temperatures above this value will force the blower into positive direction",
      "MisterOnTime": "Amount of time that the mister will stay on per cycle",
      "MisterOffTime": "Amount of time that the mister will stay off per cycle",
      "GraphReferenceTemp": "Reference temperature on graph",
      "GraphReferenceTempLabel": "Reference temperature label on graph",
      "WirelessTempsPollInterval": "Interval of time between polling wireless sensor data",
      "MisterRelayType": "Relay type for mister",
      "MaxContainerTemp": "Maximum container temperature"
    }
  }

  getCurrentDefinition (settingName) {
    if (settingName.startsWith("Zone")) {
      return this.getZoneDefinitions(settingName);
    } else if (settingName.startsWith("Mister")) {
        return this.getMisterTempSetPointDefinitions(settingName);
    } else if (settingName.startsWith("Biofilter")) {
        return this.getBiofilterSettingsDefinition(settingName);
    } else if (settingName.startsWith("Blower")) {
        return this.getBlowerSettingsDefinitions(settingName);
    }
    return "";
  }

  getZoneDefinitions(settingName) {
    if (settingName.includes("PointID") ) {
      return "ID number for zone temperature probes";
    } else if (settingName.includes("TempSetPoint")) {
      return "Setpoint for zone temperature control";
    } else if (settingName.includes("MinDamperValue")) {
      return this.definitions["MinDamperValue"];
    } 
    return "";
  }

  getMisterTempSetPointDefinitions(settingName) {
    if (settingName.includes("PosTempSetPoint") ) {
      return "Positive setpoint for mister temperature control";
    } else if (settingName.includes("NegTempSetPoint") ) {
      return "Negative setpoint for mister temperature control";
    } else if (settingName.includes("NegHighTempSetPoint") ) {
      return "Negative high temperature setpoint for mister temperature control";
    } else if (settingName.includes("NegLowTempSetPoint") ) {
      return "Negative low temperature setpoint for mister temperature control";
    }
    return "";
  }
  
  getBlowerSettingsDefinitions(settingName) {
    if (settingName.includes("PosDirectionTempSetPoint") ) {
      return "Positive setpoint for blower temperature control";
    } else if (settingName.includes("NegDirectionTempSetPoint") ) {
      return "Negative setpoint for blower temperature control";
    } else if (settingName.includes("TempSetPoint") ) {
      return "Setpoint for blower temperature control";
    } else if (settingName.includes("CycleOnTime") ) {
      return "Amount of time the blower remains on in the aeration cycle";
    } else if (settingName.includes("CycleOffTime") ) {
      return "Amount of time the blower remains off in the aeration cycle";
    } else if (settingName.includes("MinVFDSpeed")) {
      return this.definitions["MinVFDSpeed"];
    } else if (settingName.includes("MaxVFDSpeed")) {
      return this.definitions["MaxVFDSpeed"];
    } else if (settingName.includes("PressureSetpointMin")) {
      return this.definitions["PressureSetpointMin"];
    } else if (settingName.includes("PressureSetpointMax")) {
      return this.definitions["PressureSetpointMax"];
    } else if (settingName.includes("NegDirPressureSetpointMax")) {
      return this.definitions["NegDirPressureSetpointMax"];
    } else if (settingName.includes("PosDirPressureSetpointMin")) {
      return this.definitions["PosDirPressureSetpointMin"];
    } else if (settingName.includes("PosDirPressureSetpointMax")) {
      return this.definitions["PosDirPressureSetpointMax"];
    } else if (settingName.includes("NegDirPressureSetpointMin")) {
      return this.definitions["NegDirPressureSetpointMin"];
    } else if (settingName.includes("PressureSetpointHotZoneTrigger")) {
      return this.definitions["PressureSetpointHotZoneTrigger"];
    } else if (settingName.includes("PressureSetpointColdZoneTrigger")) {
      return this.definitions["PressureSetpointColdZoneTrigger"];
    } else if (settingName.includes("PressureSetpointChangeTimer")) {
      return this.definitions["PressureSetpointChangeTimer"];
    } else if (settingName.includes("PressureSetpointChangeInterval")) {
      return this.definitions["PressureSetpointChangeInterval"];
    } else if (settingName.includes("BlowerCyclePositiveTime")) {
      return this.definitions["BlowerCyclePositiveTime"];
    } else if (settingName.includes("BlowerCycleNegativeTime")) {
      return this.definitions["BlowerCycleNegativeTime"];
    } else if (settingName.includes("BiofilterForcePositiveTemperature")) {
      return this.definitions["BiofilterForcePositiveTemperature"];
    } return "";
  }

  getBiofilterSettingsDefinition(settingName) {
    if (settingName.includes("PointID") ) {
      return "ID number for biofilter temperature probes";       
    } else if (settingName.includes("MisterTimer") ) {
      return "Amount of time the biofilter mister will stay on";       
    } return "";
  }                   

}

export default settingsDefinitions;
