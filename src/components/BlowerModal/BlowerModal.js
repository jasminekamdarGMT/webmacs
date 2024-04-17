import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './BlowerModal.css';

function ModalHeader (props) {
    return (
        <div className="modal-header">
            <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
            <h3>{props.blowerLabel}</h3>
        </div>
    )
}

function NumberInputControl (props) {
    return (
        <div className={props.valid ? "control-group" : "control-group error"}>
            <label className="control-label">{props.label}:</label>
            <div className="input-append">
                <input type="number" name={props.name} min={props.min} max={props.max} value={props.value} onChange={props.onValueChanged} />
                <span className="add-on">{props.unit}</span>
            </div>
            {!props.valid &&
                <span className="help-inline">Value must be between {props.min} and {props.max}</span>
            }
        </div>
    )
}

function ManualSpeedControl (props) {
    let minValue = (props.x600.get_min_vfd_speed_setting(props.blowerId) || 20);
    let maxValue = (props.x600.get_max_vfd_speed_setting(props.blowerId) || 100);
    return (
        <NumberInputControl
          name="blowerValue"
          label="Manual VFD speed"
          valid={props.values.blowerValueIsValid}
          min={minValue}
          max={maxValue}
          value={props.values.blowerValue}
          onValueChanged={props.onInputValueChanged} unit="%" />
    )
}

function TempSetpointControl (props) {
    return (
        <NumberInputControl name="tempSetpoint" label={props.tempSetting.settingLabel} valid={props.values.tempSetpointIsValid}
            min={props.tempSetting.settingMin} max={props.tempSetting.settingMax}
            value={props.values.tempSetpoint} onValueChanged={props.onInputValueChanged} unit={props.tempSetting.settingUnit} />
    )
}

function CustomCycleTimeInputs (props) {
    return (
        <div>
            <NumberInputControl name="cycleOnTime" label="Blower On Time (each cycle)" valid={props.values.cycleOnTimeIsValid}
                min={0} max={100} value={props.values.cycleOnTime} onValueChanged={props.onInputValueChanged} unit="Minutes" />
            <NumberInputControl name="cycleOffTime" label="Blower Off Time (each cycle)" valid={props.values.cycleOffTimeIsValid}
                min={0} max={100} value={props.values.cycleOffTime} onValueChanged={props.onInputValueChanged} unit="Minutes" />
        </div>
    )
}

function HeadspaceDamperSettings(props) {
    return (
      <div className='HeadspaceDamperSettings'>
        <label className='checkbox'>
          <input
             name="headspaceDamperOverride"
            type='checkbox'
            checked={props.headspaceDamperOverride}
            onChange={props.onHeadspaceDamperOverrideChanged}
          />{' '}
          <strong>Headspace Damper Manual Control</strong>
        </label>
        <br />
        {props.headspaceDamperOverride && (
             <NumberInputControl
             name="headspaceDamperValue"
             label="Manual Headspace Damper position"
             valid={props.headspaceDamperValueIsValid}
             min={0}
             max={100}
             value={props.headspaceDamperValue}
             onValueChanged={props.onHeadspaceDamperValueChanged} unit="%" />
        )}
      </div>
    );
  }

class ModalBody extends Component {
    constructor(props) {
        super(props);

        this.state = this.stateFromProps(props);
    }

    stateFromProps (props) {
        return {
            x600: props.x600,
            blowerId: props.blowerId,
            containerId: props.containerId,
            containerOverTemp: props.containerOverTemp,
            blowerOverride: props.blowerOverride,
            blowerControl: props.blowerControl,
            misterOverride: props.misterOverride,
            misterControl: props.misterControl,
            hasSpeedControl: props.hasSpeedControl,
            hasCustomCycleControl: props.hasCustomCycleControl,
            hasManifoldInfo: props.hasManifoldInfo,
            onBlowerOverrideChanged: props.onBlowerOverrideChanged,
            onInputValueChanged: props.onInputValueChanged,
            onBlowerControlChanged: props.onBlowerControlChanged,
            onMisterControlChanged: props.onMisterControlChanged,
            onMisterOverrideChanged: props.onMisterOverrideChanged,
            headspaceDamperOverride: props.headspaceDamperOverride,
            headspaceDamperValue: props.headspaceDamperValue,
            onHeadspaceDamperValueChanged: props.onHeadspaceDamperValueChanged,
            onHeadspaceDamperOverrideChanged: props.onHeadspaceDamperOverrideChanged,
            headspaceDamperValueIsValid: props.headspaceDamperValueIsValid,
            hasHeadspaceDamper: props.hasHeadspaceDamper,
            customCycle: props.customCycle,
            onCustomCycleChanged: props.onCustomCycleChanged,
            tempSetting: props.tempSetting,
            values: props.values
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.stateFromProps(nextProps));
    }

    misterStatus = () => {
      return (
        <div>
            <hr />
            <label className="checkbox">
                <input type="checkbox" checked={this.state.misterOverride} onChange={this.state.onMisterOverrideChanged} />
                <strong>Manual Mister Control</strong>
            </label>
            { this.state.misterOverride &&
              <div>
                <label>Mister status:</label>
                <label className="radio inline">
                    <input type="radio" value='on' checked={this.state.misterControl === true} onChange={this.state.onMisterControlChanged} /> On
                </label>
                <label className="radio inline">
                    <input type="radio" value='off' checked={this.state.misterControl !== true} onChange={this.state.onMisterControlChanged} /> Off
                </label>
              </div>
            }
        </div>
      )
    }

    render () {
        return (
            <span>
                { !this.state.containerOverTemp ?
                    <div className="modal-body BlowerSettings">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.blowerOverride} onChange={this.state.onBlowerOverrideChanged} />
                            <strong>Manual Control</strong>
                        </label>
                        <br />
                        { !this.state.blowerOverride && this.state.tempSetting &&
                            <TempSetpointControl tempSetting={this.state.tempSetting} values={this.state.values} onInputValueChanged={this.state.onInputValueChanged} />
                        }
                        { this.state.blowerOverride &&
                            <div>
                                {this.state.hasSpeedControl &&
                                    <ManualSpeedControl
                                        blowerId={this.state.blowerId}
                                        values={this.state.values}
                                        x600={this.state.x600}
                                        onInputValueChanged={this.state.onInputValueChanged} />
                                }
                                <label>Manual {this.state.hasSpeedControl ? 'VFD' : 'blower'} status:</label>
                                <label className="radio inline">
                                    <input type="radio" value='on' checked={this.state.blowerControl === true} onChange={this.state.onBlowerControlChanged} /> On
                                </label>
                                <label className="radio inline">
                                    <input type="radio" value='off' checked={this.state.blowerControl !== true} onChange={this.state.onBlowerControlChanged} /> Off
                                </label>
                            </div>
                        }
                        {this.state.hasHeadspaceDamper && (
                            <HeadspaceDamperSettings
                                headspaceDamperOverride={this.state.headspaceDamperOverride}
                                headspaceDamperValue={this.state.headspaceDamperValue}
                                onHeadspaceDamperValueChanged={this.state.onHeadspaceDamperValueChanged}
                                onHeadspaceDamperOverrideChanged={this.state.onHeadspaceDamperOverrideChanged}
                                headspaceDamperValueIsValid={this.state.headspaceDamperValueIsValid}
                            />
                        )}
                        { this.state.hasCustomCycleControl &&
                            <div>
                                <hr />
                                <label className="checkbox">
                                    <input type="checkbox" checked={this.state.customCycle} onChange={this.state.onCustomCycleChanged} />
                                    <strong>Custom Cycle Times</strong>
                                </label>
                                <br />
                                { this.state.customCycle &&
                                    <CustomCycleTimeInputs values={this.state.values} onInputValueChanged={this.state.onInputValueChanged} />
                                }
                            </div>
                        }
                        { this.state.hasManifoldInfo && this.misterStatus() }
                    </div>
                    :
                    <div className="modal-body BlowerSettings">
                        This blower has been shut down due to excessive heat in container {this.state.containerId}.
                    </div>
                }
            </span>
        )
    }
}

function ModalFooter (props) {
    return (
        <span>
            { !props.containerOverTemp ?
            <div className="modal-footer">
                <button className="btn" onClick={props.onCancelClicked}>Cancel</button>
                <button className="btn btn-primary" onClick={props.onApplyChangesClicked}>Apply changes</button>
            </div>
            :
            <div className="modal-footer">
                <button className="btn" onClick={props.onCancelClicked}>Close</button>
            </div>
            }
        </span>
    )
}

class BlowerModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = this.stateFromProps(props);
    }

    stateFromProps(props) {
        let blower_label = "";
        if (props.blower_label) {
            blower_label = props.blower_label;
        } else if (props.blower_id) {
            blower_label = 'Blower '+props.blower_id.replace(/^[0]+/g,"");
        }
        let tempSetting = this.getTempSettingFromProps(props);
        return {
            x600: props.x600,
            show: props.show,
            blower_id: props.blower_id,
            containerId: props.containerId,
            tempSetting: tempSetting,
            blower_label: blower_label,
            hasSpeedControl: props.hasSpeedControl === false ? false : true,
            hasMisterControl: props.hasMisterControl === true ? true : false,
            hasCustomCycleControl: props.hasCustomCycleControl ? props.hasCustomCycleControl : false,
            hasManifoldInfo: props.hasManifoldInfo,
            hasHeadspaceDamper: props.hasHeadspaceDamper,
            blowerOverride: props.x600.get_blower_override_value(props.blower_id),
            customCycle: props.x600.get_blower_custom_cycle_value(props.blower_id),
            values: {
                blowerValue: props.x600.get_blower_value_value(props.blower_id),
                blowerValueIsValid: true,
                tempSetpoint: tempSetting ? props.x600.settingsData[tempSetting.settingName] : null,
                tempSetpointIsValid: true,
                cycleOnTime: props.x600.get_blower_cycle_on_time_value(props.blower_id),
                cycleOnTimeIsValid: true,
                cycleOffTime: props.x600.get_blower_cycle_off_time_value(props.blower_id),
                cycleOffTimeIsValid: true
            },
            blowerControl: props.x600.get_blower_control_value(props.blower_id),
            misterOverride: props.x600.get_duct_mister_override_value(props.blower_id),
            misterControl: props.x600.get_duct_mister_control_value(props.blower_id),
            headspaceDamperOverride: props.x600.get_headspace_damper_override_value(props.blower_id),
            headspaceDamperValue: props.x600.get_headspace_damper_value_value(props.blower_id),
            headspaceDamperValueIsValid: true,
            handleClose: props.onClose
        }
    }

    componentWillReceiveProps(nextProps) {
        let new_state = this.stateFromProps(nextProps);
        if (this.state.show === false && new_state !== this.state) {
            this.setState(new_state);
        }
    }

    getTempSettingFromProps (props) {
        let matchingSetting = null;
        props.facilityConfig.zoneGroups.forEach((z_group) => {
            if (z_group.groupBlower.blowerId === props.blower_id && z_group.groupBlower.tempSetpointSettingName) {
                props.facilityConfig.settingsGroups.forEach((s_group) => {
                    s_group.groupSettings.forEach((setting) => {
                        if (setting.settingName === z_group.groupBlower.tempSetpointSettingName) {
                            matchingSetting = setting;
                        }
                    });
                });
            }
        });
        return matchingSetting;
    }

    close = () => {
        this.setState({ show: false });
        this.state.handleClose();
    }

    handleBlowerOverrideChanged = (event) => {
        this.setState({ blowerOverride: event.target.checked });
    }

    handleInputValueChanged = (event) => {
        let values = this.state.values;
        let newValue = Number(event.target.value);
        let isValid = (newValue >= event.target.min && newValue <= event.target.max);
        if (event.target.name === 'blowerValue') {
            values.blowerValueIsValid = isValid;
            values.blowerValue = event.target.value;
            this.setState({ values: values });
        } else if (event.target.name === 'tempSetpoint') {
            values.tempSetpointIsValid = isValid;
            values.tempSetpoint = event.target.value;
            this.setState({ values: values });
        } else if (event.target.name === 'cycleOnTime') {
            values.cycleOnTimeIsValid = isValid;
            values.cycleOnTime = event.target.value;
            this.setState({ values: values });
        } else if (event.target.name === 'cycleOffTime') {
            values.cycleOffTimeIsValid = isValid;
            values.cycleOffTime = event.target.value;
            this.setState({ values: values });
        }
    }

    handleBlowerControlChanged = (event) => {
        if (event.target.checked === true) {
            this.setState({ blowerControl: (event.target.value === 'on') });
        }
    }

    handleHeadspaceDamperOverrideChanged = (event) => {
        this.setState({
            headspaceDamperOverride: event.target.checked,
        });
    }
    
    handleHeadspaceDamperValueChanged = (event) => {
        let newValue = event.target.value;
        let headspaceDamperValueIsValid = Number(newValue) >= 0 && Number(newValue) <= 100;
        this.setState({
            headspaceDamperValue: newValue,
            headspaceDamperValueIsValid: headspaceDamperValueIsValid,
        });
    }

    applyHeadspaceDamperSettings = () => {
        if (this.state.headspaceDamperValueIsValid) {
          this.state.x600.set_headspace_damper_override_value(
            this.state.blower_id,
            this.state.headspaceDamperOverride,
          );
          this.state.x600.set_headspace_damper_value_value(
            this.state.blower_id,
            Number(this.state.headspaceDamperValue),
          );
        }
      };

    handleMisterOverrideChanged = (event) => {
        this.setState({ misterOverride: event.target.checked });
    }

    handleMisterControlChanged = (event) => {
      if (event.target.checked === true) {
          this.setState({ misterControl: (event.target.value === 'on') });
      }
    }

    handleCustomCycleChanged = (event) => {
        this.setState({ customCycle: event.target.checked });
    }

    handleApplyChangesClicked = () => {
        if (this.state.blowerOverride !== true && this.state.tempSetting && this.state.values.tempSetpoint) {
            if (this.state.values.tempSetpointIsValid) {
                this.state.x600.saveSettingValue(this.state.tempSetting.settingName, this.state.values.tempSetpoint, this.saveStateValues);
            } else {
                alert("Please enter a valid temperature setpoint!");
            }
        } else {
            this.saveStateValues();
        }
    }

    saveStateValues = () => {
        if (this.state.hasSpeedControl) {
            if (this.state.values.blowerValueIsValid) {
                this.state.x600.set_blower_override_value(this.state.blower_id, this.state.blowerOverride);
                if (this.state.blowerOverride === true) {
                    this.state.x600.set_blower_value_value(this.state.blower_id, this.state.values.blowerValue);
                    this.state.x600.set_blower_control_value(this.state.blower_id, this.state.blowerControl);
                }
                this.state.x600.set_blower_custom_cycle_value(this.state.blower_id, this.state.customCycle);
                if (this.state.customCycle === true) {
                    this.state.x600.set_blower_cycle_on_time_value(this.state.blower_id, this.state.values.cycleOnTime);
                    this.state.x600.set_blower_cycle_off_time_value(this.state.blower_id, this.state.values.cycleOffTime);
                }
                if (this.state.hasManifoldInfo === true && this.state.hasMisterControl) {
                    this.state.x600.set_duct_mister_override_value(this.state.blower_id, this.state.misterOverride);
                    if (this.state.misterOverride === true) {
                        this.state.x600.set_duct_mister_timer_value(this.state.blower_id, 0);
                        this.state.x600.set_duct_mister_control_value(this.state.blower_id, this.state.misterControl);
                        this.state.x600.set_duct_mister_value(this.state.blower_id, this.state.misterControl);
                    }
                }
                if (this.state.hasHeadspaceDamper === true) {
                    this.applyHeadspaceDamperSettings();
                }
                this.close();
            } else {
                alert("Please enter a valid VFD speed!")
            }
        } else {
            this.state.x600.set_blower_override_value(this.state.blower_id, this.state.blowerOverride);
            if (this.state.blowerOverride === true) {
                this.state.x600.set_blower_control_value(this.state.blower_id, this.state.blowerControl);
            }
            this.state.x600.set_blower_custom_cycle_value(this.state.blower_id, this.state.customCycle);
            if (this.state.customCycle === true) {
                this.state.x600.set_blower_cycle_on_time_value(this.state.blower_id, this.state.values.cycleOnTime);
                this.state.x600.set_blower_cycle_off_time_value(this.state.blower_id, this.state.values.cycleOffTime);
            }
            if (this.state.hasManifoldInfo === true && this.state.hasMisterControl) {
                this.state.x600.set_duct_mister_override_value(this.state.blower_id, this.state.misterOverride);
                if (this.state.misterOverride === true) {
                    this.state.x600.set_duct_mister_timer_value(this.state.blower_id, 0);
                    this.state.x600.set_duct_mister_control_value(this.state.blower_id, this.state.misterControl);
                    this.state.x600.set_duct_mister_value(this.state.blower_id, this.state.misterControl);
                }
            }
            if (this.state.hasHeadspaceDamper === true) {
                this.applyHeadspaceDamperSettings();
            }
            this.close();
        }
    }

    render () {
        let container_temp = this.state.x600.get_load_container_temp_value(this.state.containerId);
        let containerOverTemp = false;
        if (container_temp) {
            containerOverTemp = container_temp >= this.state.x600.settingsData["MaxContainerTemp"];
        }
        return (
            <Modal show={this.state.show} onHide={this.close}>
                <ModalHeader blowerLabel={this.state.blower_label} onCloseClicked={this.close} />
                <ModalBody
                    blowerOverride={this.state.blowerOverride}
                    blowerId={this.state.blower_id}
                    containerId={this.state.containerId}
                    containerOverTemp={containerOverTemp}
                    values={this.state.values}
                    blowerControl={this.state.blowerControl}
                    misterOverride={this.state.misterOverride}
                    misterControl={this.state.misterControl}
                    onBlowerOverrideChanged={this.handleBlowerOverrideChanged}
                    onInputValueChanged={this.handleInputValueChanged}
                    onBlowerControlChanged={this.handleBlowerControlChanged}
                    onMisterOverrideChanged={this.handleMisterOverrideChanged}
                    onMisterControlChanged={this.handleMisterControlChanged}
                    hasSpeedControl={this.state.hasSpeedControl}
                    hasMisterControl={this.state.hasMisterControl}
                    hasCustomCycleControl={this.state.hasCustomCycleControl}
                    hasManifoldInfo={this.state.hasManifoldInfo}
                    hasHeadspaceDamper={this.state.hasHeadspaceDamper}
                    headspaceDamperOverride={this.state.headspaceDamperOverride}
                    headspaceDamperValue={this.state.headspaceDamperValue}
                    headspaceDamperValueIsValid={this.state.headspaceDamperValueIsValid}
                    onHeadspaceDamperValueChanged={this.handleHeadspaceDamperValueChanged}
                    onHeadspaceDamperOverrideChanged={this.handleHeadspaceDamperOverrideChanged}
                    customCycle={this.state.customCycle}
                    onCustomCycleChanged={this.handleCustomCycleChanged}
                    tempSetting={this.state.tempSetting}
                    x600={this.state.x600} />
                <ModalFooter onCancelClicked={this.close} onApplyChangesClicked={this.handleApplyChangesClicked} containerOverTemp={containerOverTemp} />
	        </Modal>
        )
    }
}

export default BlowerModal;
