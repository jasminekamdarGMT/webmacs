import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './ZoneModal.css';

function ModalHeader(props) {
  const zoneLabel = 'Zone ' + props.zoneLabel;
  const zoneControlTitle = props.hasAssociatedBatch
    ? zoneLabel + ' - Batch ' + props.batchLabel
    : zoneLabel;
  return (
    <div className='modal-header'>
      <button
        type='button'
        className='close'
        aria-hidden='true'
        onClick={props.onCloseClicked}
      >
        &times;
      </button>
      <h3 id='zone-control-title'>{zoneControlTitle}</h3>
    </div>
  );
}

function ZoneSettings(props) {
  if (props.zoneOnline) {
    return (
      <div>
        Click <b>Pause Batch</b> to pause aeration control and temperature
        logging for this zone.
        <br />
        <br />
        <div className='btn-toolbar'>
          <button
            className='btn btn-default pull-right'
            onClick={props.onViewGraphClicked}
          >
            View Graph
          </button>
          <button className='btn btn-info' onClick={props.onPauseBatchClicked}>
            Pause Batch
          </button>
          <button
            className='btn btn-secondary'
            onClick={props.onMoveBatchClicked}
          >
            Move Batch
          </button>
          <button className='btn btn-danger' onClick={props.onEndBatchClicked}>
            End Batch
          </button>
        </div>
      </div>
    );
  } else if (!props.hasAssociatedBatch) {
    return (
      <div>
        Click <b>Start New Batch</b> to turn on aeration control and temperature
        logging for this zone.
        <br />
        <br />
        <div className='btn-toolbar'>
          <button
            className='btn btn-success'
            onClick={props.onStartBatchClicked}
          >
            Start New Batch
          </button>
          {!props.loadZoneActive && props.hasLoadZoneFeature && (
            <button className='btn btn-info' onClick={props.onLoadZoneClicked}>
              Load Zone
            </button>
          )}
          {props.loadZoneActive && props.hasLoadZoneFeature && (
            <button
              className='btn btn-info'
              onClick={props.onCancelLoadZoneClicked}
            >
              Cancel Load Zone
            </button>
          )}
        </div>
      </div>
    );
  } else {
    const start_batch_label = props.resetBatch
      ? 'Start New Batch'
      : 'Resume Batch';
    const start_batch_label_action = props.resetBatch ? 'turn on' : 'resume';
    const action = props.resetBatch
      ? props.onStartBatchClicked
      : props.onResumeBatchClicked;
    return (
      <div>
        Click <b>{start_batch_label}</b> to {start_batch_label_action} aeration
        control and temperature logging for this zone.
        <br />
        <br />
        <label className='checkbox'>
          <input
            type='checkbox'
            checked={props.resetBatch}
            onChange={props.onResetBatchChanged}
          />{' '}
          Reset temperature records and start date
        </label>
        <br />
        {props.resetBatch && props.hasAssociatedBatch && (
          <div className='btn-toolbar'>
            <button className='btn btn-success' onClick={action}>
              {start_batch_label}
            </button>
          </div>
        )}
        {!props.resetBatch && props.hasAssociatedBatch && (
          <div className='btn-toolbar'>
            <button className='btn btn-success' onClick={action}>
              {start_batch_label}
            </button>
            <button
              className='btn btn-secondary'
              onClick={props.onMoveBatchClicked}
            >
              Move Batch
            </button>
            <button
              className='btn btn-danger'
              onClick={props.onEndBatchClicked}
            >
              End Batch
            </button>
          </div>
        )}
      </div>
    );
  }
}

function DamperSettings(props) {
  return (
    <div className='DamperSettings'>
      <h4>Damper Settings</h4>
      <label className='checkbox'>
        <input
          type='checkbox'
          checked={props.damperOverride}
          onChange={props.onDamperOverrideChanged}
        />{' '}
        Manual Control
      </label>
      <br />
      {props.damperOverride && (
        <div
          className={
            props.damperValueIsValid ? 'control-group' : 'control-group error'
          }
        >
          <label className='control-label'>Manual damper position:</label>
          <div className='input-append'>
            <input
              type='number'
              value={props.damperValue}
              min={0}
              max={100}
              onChange={props.onDamperValueChanged}
            />
            <span className='add-on'>%</span>
          </div>
          {!props.damperValueIsValid && (
            <span class='help-inline'>Value must be between 0 and 100</span>
          )}
        </div>
      )}
    </div>
  );
}

function IrrigationSettings(props) {
  return (
    <div className='IrrigationSettings'>
      <h4>Irrigation Settings</h4>
      <label className='checkbox'>
        <input
          type='checkbox'
          checked={props.irrigationControl}
          onChange={props.onIrrigationControlChanged}
        />{' '}
        Irrigation On
      </label>
    </div>
  );
}

function EditRegime(props) {
  return (
    <div className='EditRegime'>
      <h4>Regime</h4>
      <label className='checkbox'>
        <input
          type='checkbox'
          checked={props.regimeOverride}
          onChange={props.onRegimeOverrideChanged}
        />{' '}
        Change Regime
      </label>
      <br />
      {props.regimeOverride && (
        <div
          className={
            props.regimeDayIsValid ? 'control-group' : 'control-group error'
          }
        >
          <label className='control-label'>Day:</label>
          <div className='input-append'>
            <input
              type='number'
              value={props.regimeDay}
              min={0}
              max={100}
              onChange={props.onRegimeValueChanged}
            />
          </div>
          {!props.regimeDayIsValid && (
            <span className='help-inline'>Value must be between 0 and 100</span>
          )}
        </div>
      )}
    </div>
  );
}

function LocationalRegimeControl(props) {
  return (
    <div>
      <br />
      <h4>Regime Control Settings</h4>
      <label>
        <strong>Locational Regime Control:</strong>
      </label>
      <label className='radio inline'>
        <input
          type='radio'
          value='warmup'
          checked={props.zoneRegimeType === 'warmup'}
          onChange={props.onLocationalRegimeControlChanged}
        />{' '}
        Warm Up Regime
      </label>
      <label className='radio inline'>
        <input
          type='radio'
          value='pfrp'
          checked={props.zoneRegimeType === 'pfrp'}
          onChange={props.onLocationalRegimeControlChanged}
        />{' '}
        PFRP & VAR Regimes
      </label>
    </div>
  );
}

function ModalFooter(props) {
  return (
    <div className='modal-footer'>
      <button className='btn' onClick={props.onCancelClicked}>
        Close
      </button>
      {props.hasDamperControl && (
        <button
          className='btn btn-primary'
          onClick={props.onApplyDamperSettingsClicked}
        >
          Apply damper settings
        </button>
      )}
      {!props.hasDamperControl && props.hasBatchCappedFeature && (
        <button
          className='btn btn-primary'
          onClick={props.onApplySettingsClicked}
        >
          Apply settings
        </button>
      )}
    </div>
  );
}

class ZoneModal extends Component {
  constructor(props) {
    super(props);

    this.state = this.stateFromProps(props);

    this.close = this.close.bind(this);
    this.handleDamperOverrideChanged =
      this.handleDamperOverrideChanged.bind(this);
    this.handleIrrigationControlChanged =
      this.handleIrrigationControlChanged.bind(this);
    this.handleDamperValueChanged = this.handleDamperValueChanged.bind(this);
    this.handleApplyDamperSettingsClicked =
      this.handleApplyDamperSettingsClicked.bind(this);
    this.handleApplySettingsClicked =
      this.handleApplySettingsClicked.bind(this);
    this.handleResetBatchChanged = this.handleResetBatchChanged.bind(this);
    this.handleStartBatchClicked = this.handleStartBatchClicked.bind(this);
    this.handleResumeBatchClicked = this.handleResumeBatchClicked.bind(this);
    this.handlePauseBatchClicked = this.handlePauseBatchClicked.bind(this);
    this.handleMoveBatchClicked = this.handleMoveBatchClicked.bind(this);
    this.handleEndBatchClicked = this.handleEndBatchClicked.bind(this);
    this.handleViewGraphClicked = this.handleViewGraphClicked.bind(this);
    this.handleCappedChanged = this.handleCappedChanged.bind(this);
    this.getHasIrrigationControl = this.getHasIrrigationControl.bind(this);
  }

  stateFromProps(props) {
    return {
      x600: props.x600,
      facilityConfig: props.facilityConfig,
      damper_id: props.damper_id,
      damperOverride: props.x600.get_damper_override_value(props.damper_id),
      irrigationControl: props.x600.get_irrigation_control_value(props.zone_id),
      damperValue: props.x600.get_damper_value_value(props.damper_id),
      damperValueIsValid: true,
      zoneOnline: props.x600.get_zone_online_value(props.zone_id),
      zoneBatch: props.x600.get_zone_batch_title(props.zone_id),
      resetBatch: false,
      show: props.show,
      zoneGroups: props.zoneGroups,
      zone_id: props.zone_id,
      movedfrom: props.x600.get_zone_movedfrom_value(props.zone_id),
      blower_id: props.blower_id,
      blowerHasAerationReversingControl:
        props.blowerHasAerationReversingControl,
      zone_label: props.zone_label
        ? props.zone_label
        : props.zone_id
        ? props.zone_id.replace(/^[0]+/g, '')
        : '',
      hasDamperControl: props.hasDamperControl === false ? false : true,
      hasIrrigationControl: this.getHasIrrigationControl(props),
      zoneStartDate: props.x600.get_zone_start_date(props.zone_id),
      hasLoadZoneFeature: props.hasLoadZoneFeature,
      canEditRegime: props.facilityConfig.canEditRegime === true,
      hasLocationalRegimeControl:
        props.facilityConfig.hasLocationalRegimeControl === true,
      zoneRegimeType: props.x600.get_zone_regime_type_value(props.zone_id),
      regimeOverride: false,
      regimeDay: 0,
      regimeDayIsValid: true,
      handleClose: props.onClose,
      onViewGraphClicked: props.onViewGraphClicked,
      onStartBatchClicked: props.onStartBatchClicked,
      onMoveBatchClicked: props.onMoveBatchClicked,
      onEndBatchClicked: props.onEndBatchClicked,
      isCapped: props.x600.get_zone_capped_value(props.zone_id),
      hasBatchCappedFeature: props.facilityConfig.hasBatchCappedFeature
        ? props.facilityConfig.hasBatchCappedFeature
        : false,
    };
  }

  getHasIrrigationControl = (props) => {
    let irrigationControl = false;
    if (props.hasIrrigationControl) {
      irrigationControl = true
    } else if (props.facilityConfig.hasIrrigationControl) {
      irrigationControl = true
    }
    return irrigationControl
  }

  componentWillReceiveProps(nextProps) {
    let new_state = this.stateFromProps(nextProps);
    if (this.state.show === false && new_state !== this.state) {
      this.setState(new_state);
    }
  }

  close() {
    this.setState({ show: false });
    this.state.handleClose();
  }

  handleResetBatchChanged(event) {
    this.setState({
      resetBatch: event.target.checked,
    });
  }

  handleStartBatchClicked(event) {
    this.close();
    this.state.onStartBatchClicked(this.state.zone_id);
  }

  handleResumeBatchClicked(event) {
    if (this.state.facilityConfig.hasLoadZoneFeature) {
      this.resumeFromLoadState();
    }
    this.state.x600.set_zone_reset_value(this.state.zone_id, false);
    this.state.x600.set_zone_control_value(this.state.zone_id, true);
    this.close();
  }

  resumeFromLoadState = () => {
    const { x600, facilityConfig, zone_id, movedfrom } = this.state;

    x600.set_load_zone_active_value(movedfrom, 0);
    x600.set_zone_movedfrom_value(movedfrom, 0);
    x600.loadZoneStartupData(function (response) {
      x600.restorePreLoadZoneSnapshot(response, movedfrom, facilityConfig);
    });

    x600.set_load_zone_active_value(zone_id, 0);
    x600.set_zone_movedfrom_value(zone_id, 0);
    x600.loadZoneStartupData(function (response) {
      x600.restorePreLoadZoneSnapshot(response, zone_id, facilityConfig);
    });
  };

  handlePauseBatchClicked(event) {
    this.state.x600.set_zone_control_value(this.state.zone_id, false);
    this.close();
  }

  handleMoveBatchClicked(event) {
    this.close();
    this.state.onMoveBatchClicked(this.state.zone_id, this.state.zone_label);
  }

  handleEndBatchClicked(event) {
    this.close();
    this.state.onEndBatchClicked(this.state.zone_id, this.state.zone_label);
  }

  handleDamperOverrideChanged(event) {
    this.setState({
      damperOverride: event.target.checked,
    });
  }

  handleIrrigationControlChanged(event) {
    this.setState({
      irrigationControl: event.target.checked,
    });
  }

  handleDamperValueChanged(event) {
    let newValue = event.target.value;
    let damperValueIsValid = Number(newValue) >= 0 && Number(newValue) <= 100;
    this.setState({
      damperValue: newValue,
      damperValueIsValid: damperValueIsValid,
    });
  }

  applyDamperSettings = () => {
    if (this.state.damperValueIsValid) {
      this.state.x600.set_damper_override_value(
        this.state.damper_id,
        this.state.damperOverride,
      );
      this.state.x600.set_damper_value_value(
        this.state.damper_id,
        Number(this.state.damperValue),
      );
    }
  };

  applyRegimeSettings = () => {
    const regime1Duration = Number(
      this.state.x600.settingsData['Regime1Duration'],
    );
    const regime2Duration = Number(
      this.state.x600.settingsData['Regime2Duration'],
    );
    let regime = 0;
    let regtimer = 0;
    if (this.state.regimeDay >= regime2Duration + regime1Duration) {
      regime = 3;
    } else if (this.state.regimeDay >= regime1Duration) {
      let daydiff = this.state.regimeDay - regime1Duration;
      regtimer = regime2Duration * 24 * 60 * 60 - daydiff * 86400;
      regime = 2;
    } else {
      let daydiff = this.state.regimeDay;
      regtimer = regime1Duration * 24 * 60 * 60 - daydiff * 86400;
      regime = 1;
    }
    if (this.state.regimeDayIsValid) {
      this.state.x600.set_zone_regime_value(this.state.zone_id, regime);
      this.state.x600.set_zone_regtimer_value(this.state.zone_id, regtimer);
    }
  };

  applyLocationalRegimeControlSettings = () => {
    const { x600, zone_id, zoneRegimeType } = this.state;
    const settingName = 'Zone' + zone_id + 'RegimeType';
    const settingValue = zoneRegimeType;
    const currentRegimeType = x600.settingsData[settingName];
    if (currentRegimeType !== settingValue) {
      x600.set_zone_regime_value(zone_id, 0);
      x600.set_zone_regtimer_value(zone_id, 0);
    }
    x600.saveSettingValue(settingName, settingValue, () => {
      x600.set_refresh_settings_value(1);
    });
  };

  applyCappedSettings = () => {
    let cappedValue = this.state.isCapped === true ? 1 : 0;
    this.state.x600.set_zone_capped_value(this.state.zone_id, cappedValue);
  };

  applyIrrigationSettings = () => {
    let irrigationControl = this.state.irrigationControl === true ? 1 : 0;
    this.state.x600.set_irrigation_control_value(
      this.state.zone_id,
      irrigationControl,
    );
  };

  handleApplyDamperSettingsClicked() {
    this.applyDamperSettings();
    if (this.state.canEditRegime) {
      this.applyRegimeSettings();
    }
    if (this.state.hasLocationalRegimeControl) {
      this.applyLocationalRegimeControlSettings();
    }
    if (this.state.hasBatchCappedFeature) {
      this.applyCappedSettings();
    }
    if (this.state.hasIrrigationControl) {
      this.applyIrrigationSettings();
    }
    this.close();
  }

  handleApplySettingsClicked() {
    if (this.state.hasBatchCappedFeature) {
      this.applyCappedSettings();
    }
    this.close();
  }

  handleLocationalRegimeControlChanged = (event) => {
    this.setState({ zoneRegimeType: event.target.value });
  };

  handleRegimeValueChanged = (event) => {
    let newValue = event.target.value;
    let min = event.target.min;
    let max = event.target.max;
    let regimeDayIsValid = Number(newValue) >= min && Number(newValue) <= max;
    this.setState({
      regimeDay: newValue,
      regimeDayIsValid: regimeDayIsValid,
    });
  };

  handleRegimeOverrideChanged = (event) => {
    this.setState({
      regimeOverride: event.target.checked,
    });
  };

  handleLoadZoneClicked = () => {
    const {
      x600,
      facilityConfig,
      zone_id,
      damper_id,
      blower_id,
      blowerHasAerationReversingControl,
    } = this.state;

    x600.set_load_zone_active_value(zone_id, 1);
    x600.preLoadZoneSnapshot([zone_id], facilityConfig, function () {
      if (blowerHasAerationReversingControl) {
        x600.set_damper_value_value(damper_id, 100);
        x600.set_damper_override_value(damper_id, 1);
      } else {
        x600.set_blower_control_value(blower_id, 1);
        x600.set_blower_override_value(blower_id, 1);
        const maxSpeed = x600.get_max_vfd_speed_setting(blower_id)
          ? x600.get_max_vfd_speed_setting(blower_id)
          : 100;
        x600.set_blower_value_value(blower_id, maxSpeed);
        x600.set_blower_speed_value(blower_id, maxSpeed);
        x600.set_damper_value_value(damper_id, 100);
        x600.set_damper_override_value(damper_id, 1);
      }
    });
    this.close();
  };

  handleCancelLoadZoneClicked = () => {
    const { x600, facilityConfig, zone_id } = this.state;

    x600.set_load_zone_active_value(zone_id, 0);
    x600.loadZoneStartupData(function (response) {
      x600.restorePreLoadZoneSnapshot(response, zone_id, facilityConfig);
    });
    const move_to = x600.get_zone_moveto_value(zone_id);
    x600.set_zone_movedfrom_value(move_to, 0);
    this.close();
  };

  handleViewGraphClicked() {
    this.close();
    this.state.onViewGraphClicked(this.state.zone_id);
  }

  handleCappedChanged(event) {
    this.setState({
      isCapped: event.target.checked,
    });
  }

  displayCappedCheckbox() {
    if (this.state.hasBatchCappedFeature) {
      return (
        <div>
          <label className='checkbox'>
            <input
              type='checkbox'
              checked={this.state.isCapped}
              onChange={this.handleCappedChanged}
            />{' '}
            Capped
          </label>
          <hr />
        </div>
      );
    }
  }

  render() {
    const hasAssociatedBatch =
      this.state.x600.get_zone_batch_title(this.state.zone_id) !== '';
    const batchLabel = this.state.x600.get_zone_batch_title(this.state.zone_id);
    const loadZoneActive = this.state.x600.get_load_zone_active_value(
      this.state.zone_id,
    );
    let startDateStr = '';
    if (this.state.zoneStartDate) {
      startDateStr =
        'Started ' +
        new Intl.DateTimeFormat('en-US').format(this.state.zoneStartDate);
    }
    return (
      <Modal show={this.state.show} onHide={this.close}>
        <ModalHeader
          zoneLabel={this.state.zone_label}
          zoneStartDate={this.state.zoneStartDate}
          hasAssociatedBatch={hasAssociatedBatch}
          batchLabel={batchLabel}
          onCloseClicked={this.close}
        />
        <div className='modal-body'>
          {hasAssociatedBatch && <h4>{startDateStr}</h4>}
          <ZoneSettings
            zoneOnline={this.state.zoneOnline}
            zoneBatch={this.state.zoneBatch}
            resetBatch={this.state.resetBatch}
            hasAssociatedBatch={hasAssociatedBatch}
            onResetBatchChanged={this.handleResetBatchChanged}
            onStartBatchClicked={this.handleStartBatchClicked}
            onResumeBatchClicked={this.handleResumeBatchClicked}
            onPauseBatchClicked={this.handlePauseBatchClicked}
            onMoveBatchClicked={this.handleMoveBatchClicked}
            onEndBatchClicked={this.handleEndBatchClicked}
            onViewGraphClicked={this.handleViewGraphClicked}
            hasLoadZoneFeature={this.state.hasLoadZoneFeature}
            onLoadZoneClicked={this.handleLoadZoneClicked}
            loadZoneActive={loadZoneActive}
            onCancelLoadZoneClicked={this.handleCancelLoadZoneClicked}
          />
          <hr />
          {this.displayCappedCheckbox()}
          {this.state.hasDamperControl && (
            <DamperSettings
              damperOverride={this.state.damperOverride}
              damperValue={this.state.damperValue}
              onDamperValueChanged={this.handleDamperValueChanged}
              onDamperOverrideChanged={this.handleDamperOverrideChanged}
              damperValueIsValid={this.state.damperValueIsValid}
            />
          )}
          {this.state.hasIrrigationControl && (
            <IrrigationSettings
              irrigationControl={this.state.irrigationControl}
              onIrrigationControlChanged={this.handleIrrigationControlChanged}
            />
          )}
          {this.state.canEditRegime && (
            <EditRegime
              x600={this.state.x600}
              zoneId={this.state.zone_id}
              regimeDay={this.state.regimeDay}
              regimeOverride={this.state.regimeOverride}
              regimeDayIsValid={this.state.regimeDayIsValid}
              onRegimeValueChanged={this.handleRegimeValueChanged}
              onRegimeOverrideChanged={this.handleRegimeOverrideChanged}
            />
          )}
          {this.state.hasLocationalRegimeControl && (
            <LocationalRegimeControl
              zoneRegimeType={this.state.zoneRegimeType}
              onLocationalRegimeControlChanged={
                this.handleLocationalRegimeControlChanged
              }
            />
          )}
        </div>
        <ModalFooter
          onCancelClicked={this.close}
          onApplyDamperSettingsClicked={this.handleApplyDamperSettingsClicked}
          onApplySettingsClicked={this.handleApplySettingsClicked}
          hasDamperControl={this.state.hasDamperControl}
          hasBatchCappedFeature={this.state.hasBatchCappedFeature}
        />
      </Modal>
    );
  }
}

export default ZoneModal;
