import X600 from './X600';

let test_state = {};

class X600Mock extends X600 {
    refreshData (newDataReceivedHandler) {
        this.newDataReceived = newDataReceivedHandler;
        this.currentData = test_state;
        this.newDataReceived();
    }

    handleNewData (data) {
        this.newDataReceived();
    }

    setIOValue (name, value) {
        this.currentData[name] = value;
    }

    loadSettingsData () {
        this.settingsData = {};
        if (this.dataLoadedHandler) {
            this.dataLoadedHandler(true);
        }
    }

    loadZoneStartupData () {
        this.zoneStartupData = {};
        if (this.dataLoadedHandler) {
            this.dataLoadedHandler(true);
        }
    }

    loadBatchFilesData () {
        this.batchFiles = {};
        if (this.dataLoadedHandler) {
            this.dataLoadedHandler(true);
        }
    }

    updateZoneBatchTitle (zone_id, batch_title, onSaveComplete) {
        let failure_messages = [];
        let zone_startup = (this.zoneStartupData[zone_id] || {});
        zone_startup['batchTitle'] = batch_title;
        this.zoneStartupData[zone_id] = zone_startup;
        onSaveComplete((failure_messages.length < 1), failure_messages);
    }

    saveSettingsValues (values, onSaveComplete) {
        let failure_messages = [];
        for (let settingName in values) {
          for (let settingName in values) {
              this.settingsData[settingName] = String(values[settingName]);
          }
        }
        onSaveComplete((failure_messages.length < 1), failure_messages);
    }
}

export default X600Mock;
