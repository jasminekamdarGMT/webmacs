import axios from 'axios';

class X600 {
    constructor () {
        this.currentPage = (window.currentPage || null);
        this.io = (window.io || null);
        this.sqlite = (window.sqlite || null);
        this.file = (window.file || null);
        this.user = (window.x600user || { name: '', email: '' })
        this.currentData = {};
        this.zoneStartupData = {};
        this.settingsData = {};
        this.batchFiles = [];
        this.totalZones = [];
        this.handleNewData = this.handleNewData.bind(this);
        this.handleIOCallback = this.handleIOCallback.bind(this);
        this.loadZoneStartupData = this.loadZoneStartupData.bind(this);
        this.handleLoadZoneStartupDataCallback = this.handleLoadZoneStartupDataCallback.bind(this);
        this.handleLoadSettingsCallback = this.handleLoadSettingsCallback.bind(this);
        this.handleLoadBatchFilesCallback = this.handleLoadBatchFilesCallback.bind(this);
        this.dataLoadedHandler = null;
        this.get_zone_start_date = this.get_zone_start_date.bind(this);
        this.get_zone_batch_age_in_days = this.get_zone_batch_age_in_days.bind(this);
        this.get_zone_batch_title = this.get_zone_batch_title.bind(this);
        this.get_zone_filename = this.get_zone_filename.bind(this);
        this.dbPath = window.facilityConfig &&
                      window.facilityConfig.dbPath !== undefined ?
                      window.facilityConfig.dbPath :
                      '/usb/';
        this.logsPath = window.facilityConfig &&
                        window.facilityConfig.logsPath !== undefined ?
                        window.facilityConfig.logsPath :
                        '/usb/';
        this.minSetIORetries = 5;
        this.maxSetIORetries = 10;
        this.defaultTimeout = 300;
    }

    refreshData (newDataReceivedHandler) {
        this.newDataReceived = newDataReceivedHandler;
        this.currentPage.setIOFields = this.handleNewData;
        this.currentPage.refreshIOFields("state.json", 0, "content");
    }

    handleNewData (data) {
        for (let name in data) {
            this.currentData[name] = data[name];
        }
        this.newDataReceived();
    }

    async setIOValue (name, value, callback, retries) {
        const fileName = "secureState.xml?"+name+"State="+value;
        if (!retries) {
          retries = this.minSetIORetries;
        }
        try {
          const data = await axios.get(fileName);
          if(callback){
            callback(data);
          }
        } catch (error) {
          if (retries > 0) {
            setTimeout(() => this.setIOValue(name, value, callback, retries - 1), this.defaultTimeout);
          } else if(callback) {
            console.error(`${error} occurred while setting ${name} to ${value}`);
            callback("No response");
          }
        }
    }

    handleIOCallback (result) {
        console.log(result.substring(2));
    }

    doesSettingExist(name) {
        return this.settingsData[name] !== undefined;
    }

    doesIORegExist(name) {
        return this.currentData[name] !== undefined;
    }

    getZoneGroups(facilityConfig) {
      const zoneGroups = facilityConfig.hasModuleSelect ?
                         facilityConfig.moduleGroups :
                         facilityConfig.zoneGroups;

      return zoneGroups;
    }

    getZoneBlower(zoneId,facilityConfig) {
      const zoneGroups = this.getZoneGroups(facilityConfig);

      let blower = {};
      zoneGroups.forEach(group => {
        group.groupZones.forEach(groupZone => {
          if (String(groupZone.zoneId).padStart(2,0) === String(zoneId).padStart(2,0)) {
            blower = group.groupBlower;
          }
        });
      });
      return blower;
    }

    getZoneDamperId(zoneId,facilityConfig) {
      const zoneGroups = this.getZoneGroups(facilityConfig);

      let damperid = "";
      zoneGroups.forEach(group => {
        group.groupZones.forEach(groupZone => {
          if (String(groupZone.zoneId).padStart(2,0) === String(zoneId).padStart(2,0)) {
            if (groupZone.multipleDampers) {
              const damperChoice = Number(this.currentData[groupZone.damperDeterminer]);
              damperid = groupZone.damperIds[damperChoice];
            } else {
              damperid = groupZone.damperId || groupZone.zoneId;
            }
          }
        });
      });
      return damperid;
    }

    getZoneLabel(zoneId,facilityConfig) {
      const zoneGroups = this.getZoneGroups(facilityConfig);

      let zoneLabel = zoneId.replace(/^[0]+/g,"");
      zoneGroups.forEach(group => {
        group.groupZones.forEach(groupZone => {
          if (String(groupZone.zoneId).padStart(2,0) === String(zoneId).padStart(2,0)) {
            if (groupZone.zoneLabel) {
              zoneLabel = groupZone.zoneLabel;
            }
          }
        });
      });
      return "Zone " + zoneLabel;
    }

    get_min_vfd_speed_setting(blower_id) {
      if (window.facilityConfig && window.facilityConfig.hasIndependentVFDSpeeds === true) {
        const zoneGroups = window.facilityConfig.hasModuleSelect ?
                           window.facilityConfig.moduleGroups :
                           window.facilityConfig.zoneGroups;

        let blower = {};
        zoneGroups.forEach(group => {
          if (group.groupBlower.blowerId === blower_id) {
            blower = group.groupBlower;
          }
        });
        return this.settingsData[blower.minVFDSpeedSettingName];
      } else {
        return this.settingsData["MinVFDSpeed"] || 0;
      }
    }

    get_max_vfd_speed_setting(blower_id) {
      if (window.facilityConfig && window.facilityConfig.hasIndependentVFDSpeeds === true) {
        const zoneGroups = window.facilityConfig.hasModuleSelect ?
                           window.facilityConfig.moduleGroups :
                           window.facilityConfig.zoneGroups;

        let blower = {};
        zoneGroups.forEach(group => {
          if (group.groupBlower.blowerId === blower_id) {
            blower = group.groupBlower;
          }
        });
        return this.settingsData[blower.maxVFDSpeedSettingName];
      } else {
        return this.settingsData["MaxVFDSpeed"] || 100;
      }
    }

    set_refresh_settings_value(new_value) {
        this.setIOValue('refreshsettings', new_value);
    }

    get_wireless_sensor_age_value(prefix,id,probe_id) {
        let probe = id;
        if (probe_id) {
            probe = id+'p'+probe_id;
        }
        let sensorAge = this.currentData[prefix+probe+'tempage'];
        return sensorAge ? sensorAge : 0;
    }

    get_duct_mister_value(blower_id) {
        const misterRelayType = this.settingsData["MisterRelayType"];
        if (misterRelayType !== undefined && misterRelayType === 'NC') {
          return (String(this.currentData['duct'+blower_id+'mister']) === '0');
        } else {
          return (String(this.currentData['duct'+blower_id+'mister']) === '1');
        }
    }
    set_duct_mister_value(blower_id, control_value) {
        const misterRelayType = this.settingsData["MisterRelayType"];
        if (misterRelayType !== undefined && misterRelayType === 'NC') {
          control_value = !control_value;
        }
        this.setIOValue('duct'+blower_id+'mister', control_value ? 1 : 0);
    }
    get_duct_mister_control_value(blower_id) {
        const misterRelayType = this.settingsData["MisterRelayType"];
        if (misterRelayType !== undefined && misterRelayType === 'NC') {
          return (String(this.currentData['duct'+blower_id+'mistercontrol']) === '0');
        } else {
          return (String(this.currentData['duct'+blower_id+'mistercontrol']) === '1');
        }
    }
    set_duct_mister_control_value(blower_id, control_value) {
        const misterRelayType = this.settingsData["MisterRelayType"];
        if (misterRelayType !== undefined && misterRelayType === 'NC') {
          control_value = !control_value;
        }
        this.setIOValue('duct'+blower_id+'mistercontrol', control_value ? 1 : 0);
    }

    get_duct_mister_override_value(blower_id) {
        return (String(this.currentData['duct'+blower_id+'misteroverride']) === '1');
    }

    set_duct_mister_override_value(blower_id, control_value) {
        this.setIOValue('duct'+blower_id+'misteroverride', control_value ? 1 : 0);
    }

    set_duct_mister_timer_value(blower_id, new_value) {
        this.setIOValue('duct'+blower_id+'mistertimer', new_value);
    }

    get_duct_pressure_value(blower_id) {
        return this.currentData['duct'+blower_id+'pressure'];
    }

    get_duct_pressureavg_value(blower_id) {
        return this.currentData['duct'+blower_id+'pressureavg'];
    }

    get_biofilter_pos_pressure_value(biofilter_id) {
        return this.currentData['biopospressure'+biofilter_id+'avg'];
    }

    get_biofilter_neg_pressure_value(biofilter_id) {
        return this.currentData['bionegpressure'+biofilter_id+'avg'];
    }

    get_blower_revdamper_value(blower_id) {
        return this.currentData['blower'+blower_id+'revdamper'];
    }

    get_blower_aeration_direction_value(blower_id) {
        return (String(this.currentData['blower'+blower_id+'direction']) === '1');
    }

    set_blower_aeration_direction_value(blower_id, new_value) {
        this.setIOValue('blower'+blower_id+'direction', new_value ? 1 : 0);
    }

    get_blower_aeration_override_value(blower_id) {
        return (String(this.currentData['blower'+blower_id+'revoverride']) === '1');
    }

    set_blower_aeration_override_value(blower_id, override_value) {
        this.setIOValue('blower'+blower_id+'revoverride', override_value ? 1 : 0);
    }

    get_blower_revlogic_string(logic_choice) {
      let logicType = '';
      switch (Number(logic_choice)) {
        case 0:
          logicType = 'temp';
          break;
        case 1:
          logicType = 'cycle';
          break;
        default:
          logicType = 'temp';
      }
      return logicType;
    }

    get_blower_reversing_logic_value(blower_id) {
      return this.currentData['blower'+blower_id+'revlogic'];
    }

    set_blower_reversing_logic_value(blower_id, logic_choice) {
      switch (logic_choice) {
        case 'temp':
          this.setIOValue('blower'+blower_id+'revlogic', 0);
          break;
        case 'cycle':
          this.setIOValue('blower'+blower_id+'revlogic', 1);
          break;
        default:
          this.setIOValue('blower'+blower_id+'revlogic', 0);
      }
    }

    get_blower_idletimer_value(blower_id) {
        return this.currentData['blower'+blower_id+'idletimer'];
    }

    get_duct_ambient_lvtemp_value(blower_id) {
        return this.currentData['ambient'+blower_id+'lvtemp'];
    }

    get_duct_premister_lvtemp_value(blower_id) {
        return this.currentData['premister'+blower_id+'lvtemp'];
    }

    get_blower_exhaust_lvtemp_value(blower_id) {
        return this.currentData['exhaust'+blower_id+'lvtemp'];
    }

    get_blower_biofilter_lvtemp_value(blower_id,probe_id) {
        if (probe_id) {
            return this.currentData['biofilter'+blower_id+'p'+probe_id+'lvtemp'];
        } else {
            return this.currentData['biofilter'+blower_id+'lvtemp'];
        }
    }

    get_blower_speed_value(blower_id) {
        return this.currentData['blower'+blower_id+'speed'];
    }

    set_blower_speed_value(blower_id, new_value) {
        this.setIOValue('blower'+blower_id+'speed', new_value);
    }

    get_biofilter_blower_value_value(biofilter_id) {
        return this.currentData['bioblower'+biofilter_id+'value'];
    }

    set_biofilter_blower_value_value(biofilter_id, new_value) {
        this.setIOValue('bioblower'+biofilter_id+'value', new_value);
    }

    get_tunnel_door_switch_value(blower_id) {
        return (String(this.currentData['tunnel'+blower_id+'door']) === '1');
    }

    get_external_door_switch_value(door_id) {
        return (String(this.currentData['extrdoor'+door_id+'open']) === '1');
    }

    get_window_switch_value(window_id) {
        return (String(this.currentData['window'+window_id+'open']) === '1');
    }

    get_blower_value_value(blower_id) {
        return this.currentData['blower'+blower_id+'value'];
    }

    set_blower_value_value(blower_id, new_value) {
        this.setIOValue('blower'+blower_id+'value', new_value);
    }

    get_biofilter_blower_control_value(biofilter_id) {
        return (String(this.currentData['bioblower'+biofilter_id+'control']) === '1');
    }

    set_biofilter_blower_control_value(biofilter_id, control_value) {
        this.setIOValue('bioblower'+biofilter_id+'control', control_value ? 1 : 0);
    }

    get_blower_control_value(blower_id) {
        return (String(this.currentData['blower'+blower_id+'control']) === '1');
    }

    set_blower_control_value(blower_id, control_value) {
        this.setIOValue('blower'+blower_id+'control', control_value ? 1 : 0);
    }

    get_load_zone_active_value(zone_id) {
        zone_id = String(zone_id).padStart(2,0);
        return (String(this.currentData['loadzone'+zone_id+'active']) === '1');
    }

    set_load_zone_active_value(zone_id, override_value) {
        zone_id = String(zone_id).padStart(2,0);
        this.setIOValue('loadzone'+zone_id+'active', override_value ? 1 : 0);
    }

    get_biofilter_blower_override_value(biofilter_id) {
        return (String(this.currentData['bioblower'+biofilter_id+'override']) === '1');
    }

    set_biofilter_blower_override_value(biofilter_id, override_value) {
        this.setIOValue('bioblower'+biofilter_id+'override', override_value ? 1 : 0);
    }

    get_blower_override_value(blower_id) {
        return (String(this.currentData['blower'+blower_id+'override']) === '1');
    }

    set_blower_override_value(blower_id, override_value) {
        this.setIOValue('blower'+blower_id+'override', override_value ? 1 : 0);
    }

    get_blower_custom_cycle_value(blower_id) {
        return (String(this.currentData['blower'+blower_id+'customcycle']) === '1');
    }

    set_blower_custom_cycle_value(blower_id, custom_cycle_value) {
        this.setIOValue('blower'+blower_id+'customcycle', custom_cycle_value ? 1 : 0);
    }

    get_blower_cycle_on_time_value(blower_id) {
        return this.currentData['blower'+blower_id+'cycleontime'];
    }

    set_blower_cycle_on_time_value(blower_id, new_value) {
        this.setIOValue('blower'+blower_id+'cycleontime', new_value);
    }

    get_blower_cycle_off_time_value(blower_id) {
        return this.currentData['blower'+blower_id+'cycleofftime'];
    }

    set_blower_cycle_off_time_value(blower_id, new_value) {
        this.setIOValue('blower'+blower_id+'cycleofftime', new_value);
    }

    get_biofilter_blower_fault_value(biofilter_id) {
        return (String(this.currentData['bioblower'+biofilter_id+'fault']) === '0');
    }

    get_blower_fault_value(blower_id) {
        return (String(this.currentData['blower'+blower_id+'fault']) === '0');
    }
  
    get_estop_value() {
        return (String(this.currentData['estopactive']) === '1');
    }

    get_biofilter_blower_run_value(biofilter_id) {
        return (String(this.currentData['bioblower'+biofilter_id+'run']) === '1');
    }

    get_blower_run_value(blower_id) {
        return (String(this.currentData['blower'+blower_id+'run']) === '1');
    }

    get_zone_online_value(zone_id) {
        return (String(this.currentData['zone'+zone_id+'control']) === '1');
    }

    get_zone_lvtemp_value(zone_id, probe_id) {
        if (probe_id === '') {
            return this.currentData['zone'+zone_id+'lvtemp'];
        } else {
            return this.currentData['zone'+zone_id+'p'+probe_id+'lvtemp'];
        }
    }

    get_zone_regime_value(zone_id) {
        return this.currentData['zone'+zone_id+'regime'];
    }

    set_zone_regime_value(zone_id, new_value) {
        this.setIOValue('zone'+zone_id+'regime', new_value);
    }

    get_zone_regtimer_value(zone_id) {
        return this.currentData['zone'+zone_id+'regtimer'];
    }

    set_zone_regtimer_value(zone_id, new_value) {
        this.setIOValue('zone'+zone_id+'regtimer', new_value);
    }

    get_zone_regime_type_value(zone_id) {
        return this.settingsData['Zone'+zone_id+'RegimeType'];
    }

    set_zone_regime_type_value(zone_id, new_value) {
        let self = this;
        this.saveSettingValue(
          'Zone'+zone_id+'RegimeType',
          new_value,
          function() {
            self.set_refresh_settings_value(1)
          }
        );
    }

    get_zone_pfrptime_value(zone_id) {
        return this.currentData['zone'+zone_id+'pfrptime'];
    }

    get_io_control_value(io_name) {
        return this.currentData[io_name];
    }

    get_biofilter_damper_override_value(damper_id) {
        return (String(this.currentData['biodamper'+damper_id+'override']) === '1');
    }

    get_damper_override_value(damper_id) {
        return (String(this.currentData['damper'+damper_id+'override']) === '1');
    }

    get_irrigation_control_value(zone_id) {
        return (String(this.currentData['zone'+zone_id+'irrcontrol']) === '1');
    }

    set_irrigation_control_value(zone_id, new_value) {
        this.setIOValue('zone'+zone_id+'irrcontrol', new_value);
    }

    get_headspace_damper_override_value(blower_id) {
      return (String(this.currentData['hsdamper'+blower_id+'override']) === '1');
    }

    set_headspace_damper_override_value(blower_id, override_value) {
      this.setIOValue('hsdamper'+blower_id+'override', override_value ? 1 : 0);
    }

    get_headspace_damper_position_value(blower_id) {
        return this.currentData['hsdamper'+blower_id+'position'];
    }

    get_headspace_damper_value_value(blower_id) {
        return this.currentData['hsdamper'+blower_id+'value'];
    }

    set_headspace_damper_value_value(blower_id, new_value) {
        this.setIOValue('hsdamper'+blower_id+'value', new_value);
    }

    get_biofilter_damper_position_value(damper_id) {
        return this.currentData['biodamper'+damper_id+'damper'];
    }

    get_damper_position_value(damper_id) {
        return this.currentData['damper'+damper_id+'position'];
    }

    get_damper_value_value(damper_id) {
        return this.currentData['damper'+damper_id+'value'];
    }

    set_damper_override_value(damper_id, override_value) {
        this.setIOValue('damper'+damper_id+'override', override_value ? 1 : 0);
    }

    set_damper_value_value(damper_id, new_value) {
        this.setIOValue('damper'+damper_id+'value', new_value);
    }

    set_zone_control_value(zone_id, control_value) {
        this.setIOValue('zone'+zone_id+'control', control_value ? 1 : 0);
    }

    set_zone_reset_value(zone_id, reset_value) {
        this.setIOValue('zone'+zone_id+'reset', reset_value ? 1 : 0);
    }

    get_zone_reset_value(zone_id) {
      return this.currentData['zone'+zone_id+'reset'];
    }

    set_zone_moveto_value(zone_id, moveto_value) {
        zone_id = String(zone_id).padStart(2,0);
        this.setIOValue('zone'+zone_id+'moveto', moveto_value);
    }

    get_zone_moveto_value(zone_id) {
        return String(this.currentData['zone'+zone_id+'moveto']).padStart(2,0);
    }

    set_zone_movedfrom_value(zone_id, movedfrom_value) {
        zone_id = String(zone_id).padStart(2,0);
        this.setIOValue('zone'+zone_id+'movedfrom', movedfrom_value);
    }

    get_zone_movedfrom_value(zone_id) {
        return String(this.currentData['zone'+zone_id+'movedfrom']).padStart(2,0);
    }

    get_zone_capped_value(zone_id) {
        return String(this.currentData['zone'+zone_id+'capped']) === '1';
    }

    set_zone_capped_value(zone_id, new_value) {
        this.setIOValue('zone'+zone_id+'capped', new_value);
    }

    get_load_container_temp_value(ctnr_id) {
        return this.currentData['container'+ctnr_id+'temp'];
    }

    set_load_container_temp_value(ctnr_id, override_value) {
        this.setIOValue('container'+ctnr_id+'temp', override_value);
    }

    get_pump_speed_value(pump_id) {
        return this.currentData['pump'+pump_id+'speed'];
    }

    set_pump_speed_value(pump_id, new_value) {
        this.setIOValue('pump'+pump_id+'speed', new_value);
    }

    set_drum_rotation_control_value(zone_id, control_value) {
        this.setIOValue('drum'+zone_id+'control', control_value ? 1 : 0);
    }

    get_log_head_space_temp_value(drumId) {
        return (String(this.currentData['headspace'+drumId+'logtemp']) === '1');
    }

    set_log_head_space_temp_value(drumId, control_value) {
        this.setIOValue('headspace'+drumId+'logtemp', control_value);
    }

    set_turbo_control_value(new_value) {
        this.setIOValue('turbocontrol', new_value);
    }

    get_turbo_control_value() {
        return (this.currentData['turbocontrol']);
    }

    get_turbo_run_value() {
      return (String(this.currentData['turborun']) === '1');
  }

    get_turbo_timer_value() {
        return (this.currentData['turbotimer']);
    }

    /* database related functions */

    setDataLoadedHandler (fnc) {
        this.dataLoadedHandler = fnc;
    }

    loadSettingsData (cb) {
      let tryLater = false;
      if (String(this.currentData['settingsinuse']) === '1') {
        tryLater = true;
      } else {
        const callback = cb ? cb : this.handleLoadSettingsCallback;
        this.setIOValue('settingsinuse', 1, async (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            await this.sqlite.exec(`${this.dbPath}settings.db`, "SELECT name, value FROM settings;", callback);
            this.setIOValue('settingsinuse', 0, (result) => {
              if (result === "No response") {
                console.log(`Failed to set settingsinuse to 0`);
              }
            }, this.maxSetIORetries);
          }
        });
      }
      if (tryLater) {
        if (this.loadSettingsLater) {
          clearTimeout(this.loadSettingsLater);
        }
        this.loadSettingsLater = setTimeout(() => this.loadSettingsData(cb), this.defaultTimeout);
      }
    }

    handleLoadSettingsCallback (response) {
        let success = false;
        if (response.substring(0,1) === '[') {
            success = true;
            let data = JSON.parse(response);
            data.forEach((setting) => {
                this.settingsData[setting['name']] = setting['value'];
            });
        }
        if (this.dataLoadedHandler) {
            this.dataLoadedHandler(success);
        }
    }

    parseDateFromFilename(filename) {
        let cleaned_filename = filename;
        if (filename.substring(0, 5) === '/usb/') {
            cleaned_filename = filename.substring(5, filename.length);
        }
        let sections = cleaned_filename.split("_");
        if (sections.length >= 3) {
            return new Date(Number(sections[2]), Number(sections[0])-1, Number(sections[1]));
        } else {
            return Date.now();
        }
    }

    updateZoneBatchTitle (zone_id, batch_title, onSaveComplete) {
        let tryLater = false;
        if (String(this.currentData['zonestartupinuse']) === '1') {
          tryLater = true;
        } else {
          const name = `zone${zone_id}batch`;
          let failure_messages = [];
          let query = "UPDATE zone_startup SET `state`='" + batch_title + "' WHERE `name`='" + name + "';";
          this.setIOValue('zonestartupinuse', 1, async (result) => {
            if (result === "No response") {
              tryLater = true;
            } else {
              await this.sqlite.exec(`${this.dbPath}zone_startup.db`, query, (info) => {
                  if (info !== 'SUCESS') {
                      failure_messages.push(info);
                  } else {
                      let zone_startup = (this.zoneStartupData[zone_id] || {});
                      zone_startup['batchTitle'] = batch_title;
                      this.zoneStartupData[zone_id] = zone_startup;
                  }
              });
              this.setIOValue('zonestartupinuse', 0, (result) => {
                if (result === "No response") {
                  const err = `Failed to set zonestartupinuse to 0`;
                  console.log(err);
                  failure_messages.push(err);
                }
                onSaveComplete((failure_messages.length < 1), failure_messages);
              }, this.maxSetIORetries);
            }
          });
        }
        if (tryLater) {
          if (this.updateBatchTitleLater) {
            clearTimeout(this.updateBatchTitleLater);
          }
          this.updateBatchTitleLater = setTimeout(() => this.updateZoneBatchTitle(zone_id, batch_title, onSaveComplete), this.defaultTimeout);
        }
    }

    loadZoneStartupData (cb) {
      let tryLater = false;
      if (String(this.currentData['zonestartupinuse']) === '1') {
        tryLater = true;
      } else {
        const callback = cb ? cb : this.handleLoadZoneStartupDataCallback;
        this.setIOValue('zonestartupinuse', 1, async (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            await this.sqlite.exec(`${this.dbPath}zone_startup.db`, "SELECT * FROM zone_startup;", callback);
            this.setIOValue('zonestartupinuse', 0, (result) => {
              if (result === "No response") {
                console.log(`Failed to set zonestartupinuse to 0`);
              }
            }, this.maxSetIORetries);
          }
        });
      }
      if (tryLater) {
        if (this.loadZoneStartupDataLater) {
          clearTimeout(this.loadZoneStartupDataLater);
        }
        this.loadZoneStartupDataLater = setTimeout(() => this.loadZoneStartupData(cb), this.defaultTimeout);
      }
    }

    handleLoadZoneStartupDataCallback (response) {
        let success = false;
        if (response.substring(0,1) === '[') {
            success = true;
            let data = JSON.parse(response);
            this.totalZones = [];
            data.forEach((dataRecord) => {
                if (dataRecord.name.match(/zone..filename/)) {
                    let zone_id = dataRecord.name.substring(4, 6);
                    let zone_startup = (this.zoneStartupData[zone_id] || {});
                    zone_startup['filename'] = dataRecord['state'];
                    if (zone_startup['file_name'] === '') {
                      // zone is not associated with a batch file
                      zone_startup['startDate'] = null;
                      zone_startup['batchAgeInDays'] = null;
                    } else {
                      zone_startup['startDate'] = this.parseDateFromFilename(zone_startup['filename']);
                      zone_startup['batchAgeInDays'] = Math.floor(( Date.now() - zone_startup['startDate'] ) / 86400000);
                    }
                    this.zoneStartupData[zone_id] = zone_startup;
                    if (!this.totalZones.includes(zone_id)) {
                      this.totalZones.push(zone_id);
                    }
                } else if (dataRecord.name.match(/zone..batch/)) {
                  let zone_id = dataRecord.name.substring(4, 6);
                  let zone_startup = (this.zoneStartupData[zone_id] || {});
                  zone_startup['batchTitle'] = dataRecord['state'];
                  this.zoneStartupData[zone_id] = zone_startup;
                  if (!this.totalZones.includes(zone_id)) {
                    this.totalZones.push(zone_id);
                  }
                }
            });
        }
        if (this.dataLoadedHandler) {
            this.dataLoadedHandler(success);
        }
    }

    get_zone_start_date (zone_id) {
        if (this.zoneStartupData[zone_id] && this.zoneStartupData[zone_id].startDate) {
            return this.zoneStartupData[zone_id].startDate
        } else {
            return Date.now();
        }
    }

    get_zone_start_date_by_batch_title (batch_title) {
      return this.zoneStartupData.filter(zone_id => {
        if (this.zoneStartupData[zone_id] && this.zoneStartupData[zone_id].batchTitle === batch_title && this.zoneStartupData[zone_id].startDate) {
            return this.zoneStartupData[zone_id].startDate
        } else {
            return Date.now();
        }
      })
    }

    get_zone_batch_title (zone_id) {
        if (this.zoneStartupData[zone_id] && this.zoneStartupData[zone_id].batchTitle) {
            return this.zoneStartupData[zone_id].batchTitle
        } else {
            return '';
        }
    }

    get_zone_batch_age_in_days (zone_id) {
        if (this.zoneStartupData[zone_id] && this.zoneStartupData[zone_id].batchAgeInDays) {
            return this.zoneStartupData[zone_id].batchAgeInDays
        } else {
            return 0;
        }
    }

    get_zone_filename (zone_id) {
        if (this.zoneStartupData[zone_id] && this.zoneStartupData[zone_id].filename) {
            return this.zoneStartupData[zone_id].filename
        } else {
            return '';
        }
    }

    get_zone_id_by_filename(filename) {
      return this.totalZones.find(zone_id => {
        if (this.zoneStartupData[zone_id].filename === filename) {
          return zone_id;
        }
        return null;
      })
    }

    get_zones_without_associated_batch() {
      return this.totalZones.filter(zone_id => {
        const movingBatch = String(this.currentData['zone'+zone_id+'moveto']) !== '0';
        return this.zoneStartupData[zone_id] &&
               !this.zoneStartupData[zone_id].batchTitle &&
               String(this.currentData['zone'+zone_id+'control']) === '0' &&
               !movingBatch;
      })
    }

    clear_other_zone_moved_from(zone_id, toZone) {
      this.totalZones.forEach((zoneId) => {
        if (String(zoneId) !== String(zone_id)) {
          let otherZoneMovedFrom = this.currentData['zone'+zoneId+'movedfrom'];
          if (String(otherZoneMovedFrom) !== '0') {
            if (Number(otherZoneMovedFrom) === Number(toZone)) {
              this.set_zone_movedfrom_value(zoneId, 0);
            }
          }
        }
      });
      this.set_zone_movedfrom_value(zone_id, 0);
    }

    batch_moving_to_this_zone(zone_id) {
      let movedFrom = this.get_zone_movedfrom_value(zone_id);
      if (Number(movedFrom) === Number(zone_id)) {
        this.set_zone_movedfrom_value(zone_id, 0);
        return false;
      }
      return Number(movedFrom) > 0 && this.zoneStartupData[zone_id].filename === "";
    }

    saveSettingValue (settingName, settingValue, onSaveComplete) {
      let tryLater = false;
      if (String(this.currentData['settingsinuse']) === '1') {
        tryLater = true;
      } else {
        let failure_messages = [];
        let query = "UPDATE settings SET `value`='" + settingValue + "' WHERE `name`='" + settingName + "';";
        this.setIOValue('settingsinuse', 1, async (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            await this.sqlite.exec(`${this.dbPath}settings.db`, query, (info) => {
              if (info !== 'SUCESS') {
                failure_messages.push(info);
              } else {
                this.settingsData[settingName] = String(settingValue);
              }
            });
            this.setIOValue('settingsinuse', 0, (result) => {
              if (result === "No response") {
                let err = `Failed to set settingsinuse to 0`;
                console.log(err);
                failure_messages.push(err);
              }
              onSaveComplete((failure_messages.length < 1), failure_messages);
            }, this.maxSetIORetries);
          }
        });
      }
      if (tryLater) {
        if (this.saveSettingLater) {
          clearTimeout(this.saveSettingLater);
        }
        this.saveSettingLater = setTimeout(() => this.saveSettingValue(settingName, settingValue, onSaveComplete), this.defaultTimeout);
      }
    }

    saveSettingsValues (values, onSaveComplete) {
      let tryLater = false;
      if (String(this.currentData['settingsinuse']) === '1') {
        tryLater = true;
      } else {
        this.setIOValue('settingsinuse', 1, (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            let failure_messages = [];
            for (let settingName in values) {
              let query = "UPDATE settings SET `value`='" + values[settingName] + "' WHERE `name`='" + settingName + "';";
              if (query !== "") {
                this.sqlite.exec(`${this.dbPath}settings.db`, query, (info) => {
                  if (info !== 'SUCESS') {
                    failure_messages.push(info);
                  } else {
                    for (let settingName in values) {
                      this.settingsData[settingName] = String(values[settingName]);
                    }
                    this.setIOValue('settingsinuse', 0, (result) => {
                      if (result === "No response") {
                        const err = `Failed to set settingsinuse to 0`;
                        console.log(err);
                        failure_messages.push(err);
                      }
                      onSaveComplete((failure_messages.length < 1), failure_messages);
                    }, this.maxSetIORetries);
                  }
                });
              } else {
                onSaveComplete((failure_messages.length < 1), failure_messages);
              }
            }
          }
        });
      }
      if (tryLater) {
        if (this.saveSettingsLater) {
          clearTimeout(this.saveSettingsLater);
        }
        this.saveSettingsLater = setTimeout(() => this.saveSettingsValues(values, onSaveComplete), this.defaultTimeout);
      }
    }

    loadBatchFilesData (cb) {
      let tryLater = false;
      if (String(this.currentData['batchfilesinuse']) === '1') {
        tryLater = true;
      } else {
        const callback = cb ? cb : this.handleLoadBatchFilesCallback;
        this.setIOValue('batchfilesinuse', 1, async (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            await this.sqlite.exec(`${this.dbPath}batch_files.db`, "SELECT * FROM batch_files ORDER BY id DESC;", callback);
            this.setIOValue('batchfilesinuse', 0, (result) => {
              if (result === "No response") {
                console.log(`Failed to set batchfilesinuse to 0`);
              }
            }, this.maxSetIORetries);
          }
        });
      }
      if (tryLater) {
        if (this.loadBatchFilesLater) {
          clearTimeout(this.loadBatchFilesLater);
        }
        this.loadBatchFilesLater = setTimeout(() => this.loadBatchFilesData(cb), this.defaultTimeout);
      }
    }

    handleLoadBatchFilesCallback (response) {
        let success = false;
        if (response.substring(0,1) === '[') {
            success = true;
            let data = JSON.parse(response);
            let batchFiles = [];
            data.forEach((batch_file) => {
                batchFiles.push({ 'id':batch_file['id'], 'name': batch_file['name'], 'title': batch_file['title'] });
            });
            this.batchFiles = batchFiles;
        } else if (response === 'SUCESS') {
            success = true;
            this.batchFiles = [];
        }
        if (this.dataLoadedHandler) {
            this.dataLoadedHandler(success);
        }
    }

    loadBatchFile (batchFile, onBatchFileLoaded, parseArrays) {
        let file_to_read = '/usb/'+batchFile;
        if (batchFile.substring(0,5) === '/usb/') {
            file_to_read = batchFile;
        }
        this.file.read(file_to_read, 0, 1000000, function(fileData){
            if (fileData === 'LOGGED_OUT') {
                onBatchFileLoaded(fileData, batchFile, null, false);
            } else if (parseArrays) {
                let lines = fileData.split("\n");
                let batchData = [];
                lines.forEach((line) => {
                    batchData.push(line.split(', '));
                });
                let zoneId = batchData[batchData.length - 2][1];
                onBatchFileLoaded(batchData, batchFile, zoneId, true);
            } else {
                onBatchFileLoaded(fileData, batchFile, null, true);
            }
        });
    }

    deleteBatchFile (filename, onBatchFileDeleted) {
        this.filenameToDelete = filename;
        this.onBatchFileDeleted = onBatchFileDeleted;
        let delete_url = "/deleteFile.php?filename=/usb/"+filename;
        if (filename.substring(0,5) === '/usb/') {
            delete_url = "/deleteFile.php?filename="+filename;
        }
        axios.get(delete_url).then(this.handleDeleteBatchFileCallback).catch((error) => {
            onBatchFileDeleted(false);
        });
    }

    handleDeleteBatchFileCallback = (response) => {
      let tryLater = false;
      if (String(this.currentData['batchfilesinuse']) === '1') {
        tryLater = true;
      } else {
        this.setIOValue('batchfilesinuse', 1, (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            const filename = this.filenameToDelete;
            this.sqlite.exec(
                `${this.dbPath}batch_files.db`, "DELETE FROM batch_files WHERE name='" + filename + "';",
                (response) => {
                    this.filenameToDelete = null;
                    this.onBatchFileDeleted(true);
                    this.setIOValue('batchfilesinuse', 0, (result) => {
                      if (result === "No response") {
                        console.log(`Failed to set batchfilesinuse to 0`);
                      }
                    }, this.maxSetIORetries);
                }
            );
          }
        });
      }
      if (tryLater) {
        if (this.deleteBatchFileLater) {
          clearTimeout(this.deleteBatchFileLater);
        }
        this.deleteBatchFileLater = setTimeout(() => this.handleDeleteBatchFileCallback(response), this.defaultTimeout);
      }
    }

    resetBatchFilesDB = (response) => {
      let tryLater = false;
      if (String(this.currentData['batchfilesinuse']) === '1') {
        tryLater = true;
      } else {
        this.setIOValue('batchfilesinuse', 1, (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            this.sqlite.exec(
                `${this.dbPath}batch_files.db`, "CREATE TABLE batch_files (id INTEGER PRIMARY KEY, name, title);",
                (response) => {
                    this.onBatchFileDeleted(true);
                    this.setIOValue('batchfilesinuse', 0, (result) => {
                      if (result === "No response") {
                        console.log(`Failed to set batchfilesinuse to 0`);
                      }
                    }, this.maxSetIORetries);
                }
            );
          }
        });
      }
      if (tryLater) {
        if (this.deleteBatchFileLater) {
          clearTimeout(this.deleteBatchFileLater);
        }
        this.deleteBatchFileLater = setTimeout(() => this.handleDeleteBatchFileCallback(response), this.defaultTimeout);
      }
    }

    execQuerylater = (dbReg, dbFile, qry, failure_messages, onSaveComplete) => {
      let tryLater = false;
      if (String(this.currentData[dbReg]) === '1') {
        tryLater = true;
      } else {
        this.setIOValue(dbReg, 1, (result) => {
          if (result === "No response") {
            tryLater = true;
          } else {
            this.sqlite.exec(`${this.dbPath}zone_startup.db`, qry, (info) => {
              if (info !== 'SUCESS') {
                  failure_messages.push(info);
              }
            });
            this.setIOValue(dbReg, 0, (result) => {
              if (result === "No response") {
                failure_messages.push(result);
              }
              onSaveComplete((failure_messages.length < 1), failure_messages);
            }, this.maxSetIORetries);
          }
        });
      }
      if (tryLater) {
        if (this.execLater) {
          clearTimeout(this.execLater);
        }
        this.execLater = setTimeout(() => this.execQuerylater(
          dbReg,
          `${this.dbPath}zone_startup.db`,
          qry,
          failure_messages,
          onSaveComplete
        ), this.defaultTimeout);
      }
    }

    preLoadZoneSnapshot = (zonesArray, facilityConfig, onSaveComplete) => {
      const blowerRegs = [
        'override',
        'value',
        'direction',
        'revoverride'
      ];
      const damperRegs = [
        'override',
        'value'
      ];
      let failure_messages = [];
      let regPrefix = "";
      let blower = "";
      let regId = "";
      let qry = "";
      zonesArray.forEach(zoneId => {
        regPrefix = 'blower';
        blower = this.getZoneBlower(zoneId,facilityConfig);
        regId = blower.blowerId;
        blowerRegs.forEach(regSuffix => {
          if (this.doesIORegExist(regPrefix+regId+regSuffix)) {
            let regVal = String(this.currentData[regPrefix+regId+regSuffix]);
            zoneId = String(zoneId).padStart(2,0);
            let snapshotName = `zone${zoneId}prelz${regPrefix}${regSuffix}`;
            qry = qry + "UPDATE zone_startup SET `state`='" + regVal + "' WHERE `name`='" + snapshotName + "';"
          }
        });
        regPrefix = 'damper';
        regId = this.getZoneDamperId(zoneId,facilityConfig);
        damperRegs.forEach(regSuffix => {
          if (this.doesIORegExist(regPrefix+regId+regSuffix)) {
            let regVal = String(this.currentData[regPrefix+regId+regSuffix]);
            zoneId = String(zoneId).padStart(2,0);
            let snapshotName = `zone${zoneId}prelz${regPrefix}${regSuffix}`;
            qry = qry + "UPDATE zone_startup SET `state`='" + regVal + "' WHERE `name`='" + snapshotName + "';"
          }
        });
      });
      if (qry !== "") {
        const dbReg = 'zonestartupinuse';
        let tryLater = false;
        if (String(this.currentData[dbReg]) === '1') {
          tryLater = true;
        } else {
          this.setIOValue(dbReg, 1, async (result) => {
            if (result === "No response") {
              tryLater = true;
            } else {
              await this.sqlite.exec(`${this.dbPath}zone_startup.db`, qry, (info) => {
                if (info !== 'SUCESS') {
                    failure_messages.push(info);
                }
              });
              this.setIOValue(dbReg, 0, (result) => {
                if (result === "No response") {
                  failure_messages.push(result);
                }
                onSaveComplete((failure_messages.length < 1), failure_messages);
              }, this.maxSetIORetries);
            }
          });
        }
        if (tryLater) {
          this.execQuerylater(
            dbReg,
            `${this.dbPath}zone_startup.db`,
            qry,
            failure_messages,
            onSaveComplete
          )
        }
      }
    }

    restorePreLoadZoneSnapshot = (response,zoneId,facilityConfig) => {
      let success = false;
      if (response.substring(0,1) === '[') {
        success = true;
        const data = JSON.parse(response);
        const prelzPrefix = 'zone'+zoneId+'prelz';
        const blowerPrefix = 'blower';
        const damperPrefix = 'damper';
        const blowerRegex = new RegExp(blowerPrefix);
        const damperRegex = new RegExp(damperPrefix);
        data.forEach((dataRecord) => {
          let name = dataRecord.name;
          let value = dataRecord.state;
          if (name.match(prelzPrefix)) {
            if (name.match(blowerRegex)) {
              let blowerId = this.getZoneBlower(zoneId,facilityConfig).blowerId;
              let regSuffix = name.slice(prelzPrefix.length+blowerPrefix.length);
              let reg = blowerPrefix+blowerId+regSuffix;
              if (this.doesIORegExist(reg)) {
                this.setIOValue(reg,value, (result) => {
                  if (result === "No response") {
                    console.log(`Failed to restore pre-loadzone value of ${value} for ${reg}`);
                  }
                });
              }
            } else if (name.match(damperRegex)) {
              let damperId = this.getZoneDamperId(zoneId,facilityConfig);
              let regSuffix = name.slice(prelzPrefix.length+damperPrefix.length);
              let reg = damperPrefix+damperId+regSuffix;
              if (this.doesIORegExist(reg)) {
                this.setIOValue(reg,value, (result) => {
                  if (result === "No response") {
                    console.log(`Failed to restore pre-loadzone value of ${value} for ${reg}`);
                  }
                });
              }
            }
          }
        });
      }
      if (!success) {
        console.log('Restore from pre load zone snapshot failed for zone '+zoneId);
      }
    }
}

export default X600;
