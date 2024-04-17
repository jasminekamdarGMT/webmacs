import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './BiofilterBlowerModal.css';

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

class ModalBody extends Component {
    constructor(props) {
        super(props);

        this.state = this.stateFromProps(props);
    }

    stateFromProps (props) {
        return {
            x600: props.x600,
            containerId: props.containerId,
            containerOverTemp: props.containerOverTemp,
            blowerOverride: props.blowerOverride,
            blowerControl: props.blowerControl,
            hasSpeedControl: props.hasSpeedControl,
            onBlowerOverrideChanged: props.onBlowerOverrideChanged,
            onInputValueChanged: props.onInputValueChanged,
            onBlowerControlChanged: props.onBlowerControlChanged,
            hasTurboMode: props.hasTurboMode,
            turboModeEnabled: props.turboModeEnabled,
            onTurboModeChanged: props.onTurboModeChanged,
            values: props.values
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.stateFromProps(nextProps));
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
                        { this.state.hasTurboMode &&
                            <div>
                                <hr />
                                <label className="checkbox">
                                    <input type="checkbox" checked={this.state.turboModeEnabled} onChange={this.state.onTurboModeChanged} />
                                    <strong>Enable Turbo Mode</strong>
                                </label>
                            </div>
                        }
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

class BiofilterBlowerModal extends Component {
    constructor(props) {
        super(props);

        this.state = this.stateFromProps(props);
    }

    stateFromProps(props) {
        let blower_label = "";
        if (props.blower_label) {
            blower_label = props.blower_label;
        } else if (props.biofilter_id) {
            blower_label = 'Blower '+props.biofilter_id.replace(/^[0]+/g,"");
        }
        return {
            x600: props.x600,
            show: props.show,
            biofilter_id: props.biofilter_id,
            containerId: props.containerId,
            blower_label: blower_label,
            hasSpeedControl: props.hasSpeedControl === false ? false : true,
            hasTurboMode: props.hasTurboMode === true ? true : false,
            turboModeEnabled: props.x600.get_turbo_control_value(),
            blowerOverride: props.x600.get_biofilter_blower_override_value(props.biofilter_id),
            values: {
                blowerValue: props.x600.get_biofilter_blower_value_value(props.biofilter_id),
                blowerValueIsValid: true,
            },
            blowerControl: props.x600.get_biofilter_blower_control_value(props.biofilter_id),
            handleClose: props.onClose
        }
    }

    componentWillReceiveProps(nextProps) {
        let new_state = this.stateFromProps(nextProps);
        if (this.state.show === false && new_state !== this.state) {
            this.setState(new_state);
        }
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
        }
    }

    handleBlowerControlChanged = (event) => {
        if (event.target.checked === true) {
            this.setState({ blowerControl: (event.target.value === 'on') });
        }
    }

    handleTurboModeChanged = (event) => {
        this.setState({ turboModeEnabled: event.target.checked });
    }

    handleApplyChangesClicked = () => {
        this.saveStateValues();
    }

    saveStateValues = () => {
        if (this.state.hasTurboMode === true) {
            let turboMode = this.state.turboModeEnabled ? 1 : 0;
            this.state.x600.set_turbo_control_value(turboMode);
        }
        if (this.state.hasSpeedControl) {
            if (this.state.values.blowerValueIsValid) {
                this.state.x600.set_biofilter_blower_override_value(this.state.biofilter_id, this.state.blowerOverride);
                if (this.state.blowerOverride === true) {
                    this.state.x600.set_biofilter_blower_value_value(this.state.biofilter_id, this.state.values.blowerValue);
                    this.state.x600.set_biofilter_blower_control_value(this.state.biofilter_id, this.state.blowerControl);
                }
                this.close();
            } else {
                alert("Please enter a valid VFD speed!")
            }
        } else {
            this.state.x600.set_blower_override_value(this.state.biofilter_id, this.state.blowerOverride);
            if (this.state.blowerOverride === true) {
                this.state.x600.set_biofilter_blower_control_value(this.state.biofilter_id, this.state.blowerControl);
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
                    x600={this.state.x600}
                    containerId={this.state.containerId}
                    containerOverTemp={containerOverTemp}
                    blowerOverride={this.state.blowerOverride}
                    blowerControl={this.state.blowerControl}
                    hasSpeedControl={this.state.hasSpeedControl}
                    onBlowerOverrideChanged={this.handleBlowerOverrideChanged}
                    onInputValueChanged={this.handleInputValueChanged}
                    onBlowerControlChanged={this.handleBlowerControlChanged}
                    hasTurboMode={this.state.hasTurboMode}
                    turboModeEnabled={this.state.turboModeEnabled}
                    onTurboModeChanged={this.handleTurboModeChanged}
                    values={this.state.values} />
                <ModalFooter onCancelClicked={this.close} onApplyChangesClicked={this.handleApplyChangesClicked} containerOverTemp={containerOverTemp} />
	        </Modal>
        )
    }
}

export default BiofilterBlowerModal;
