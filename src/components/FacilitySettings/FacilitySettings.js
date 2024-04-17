import React, { Component } from 'react';
import SavingSettingsModal from '../SavingSettingsModal/SavingSettingsModal';
import settingsDefinitions from '../../helpers/settingsDefinitions';
import './FacilitySettings.css';
import ToolTip from '../ToolTip/ToolTip';

class FacilitySettingInput extends Component {
    constructor(props) {
        super(props);

        this.state = this.stateFromProps(props);

        this.handleValueChanged = this.handleValueChanged.bind(this);
        this.numberInputWithUnit = this.numberInputWithUnit.bind(this);
        this.numberInputWithoutUnit = this.numberInputWithoutUnit.bind(this);
        this.timeInput = this.timeInput.bind(this);
        this.stringInput = this.stringInput.bind(this);
        this.radioInput = this.radioInput.bind(this);
    }

    stateFromProps (props) {
        return {
            value: props.value,
            setting: props.setting,
            facilityConfig: props.facilityConfig,
            numberInputWithUnit: (props.setting.settingType === 'number' && props.setting.settingUnit),
            numberInputWithoutUnit: (props.setting.settingType === 'number' && !props.setting.settingUnit),
            timeInput: (props.setting.settingType === 'time'),
            stringInput: (props.setting.settingType === 'string'),
            radioInput: (props.setting.settingType === 'radio'),
            onValueChanged: props.onValueChanged,
            isValid: true,
            settingsDefinitions: props.settingsDefinitions
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.stateFromProps(nextProps));
    }

    isValid = (event, otherTimeInput=null) => {
        let newValue = event.target.value;
        if (this.state.setting.settingType === 'number') {
            if (newValue !== '' && newValue >= this.state.setting.settingMin && newValue <= this.state.setting.settingMax) {
                return true;
            }
        } else if (otherTimeInput && this.state.setting.settingType === 'time') {
            if (event.target.id.includes('Start')) {
                if (newValue <= otherTimeInput.value) {
                    return true;
                }
            } else if (event.target.id.includes('End')) {
                if (newValue >= otherTimeInput.value) {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
        return false;
    }

    handleValueChanged (event, otherTimeInput=null) {
        let isValid = this.isValid(event, otherTimeInput);
        let newValue = event.target.value;
        this.setState({
            value: newValue,
            isValid: isValid
        });
        if (isValid === true) {
            this.state.onValueChanged(this.state.setting.settingName, newValue);
        }
    }

    numberInputWithUnit () {
        let disabledSetting = this.state.setting.settingDisabled;
        if (this.state.facilityConfig.overrideDisabledSettings) {
          disabledSetting = false;
        }
        return (
            <div className="controls input-append">
                <input id={this.state.setting.settingName} min={this.state.setting.settingMin} max={this.state.setting.settingMax}
                    step={this.state.setting.settingIncrementStep} type={this.state.setting.settingType} disabled={disabledSetting}
                    value={this.state.value} onChange={this.handleValueChanged} />
                <span className="add-on">{this.state.setting.settingUnit}</span>
            </div>
        )
    }

    numberInputWithoutUnit () {
        let disabledSetting = this.state.setting.settingDisabled;
        if (this.state.facilityConfig.overrideDisabledSettings) {
          disabledSetting = false;
        }
        return (
            <div className="controls">
                <input id={this.state.setting.settingName} min={this.state.setting.settingMin} max={this.state.setting.settingMax}
                    step={this.state.setting.settingIncrementStep} type={this.state.setting.settingType} disabled={disabledSetting}
                    value={this.state.value} onChange={this.handleValueChanged} />
                <br />
            </div>
        )
    }

    timeInput () {
        let disabledSetting = this.state.setting.settingDisabled;
        if (this.state.facilityConfig.overrideDisabledSettings) {
          disabledSetting = false;
        }
        let min = '00:00';
        let max = '23:59';
        let otherTimeInput = null;
        if (document.getElementById(this.state.setting.settingMinId)) {
            otherTimeInput = document.getElementById(this.state.setting.settingMinId);
            min = otherTimeInput.value;
        }
        if (document.getElementById(this.state.setting.settingMaxId)) {
            otherTimeInput = document.getElementById(this.state.setting.settingMaxId);
            max = otherTimeInput.value;
        }
        return (
            <div className="controls">
                <input id={this.state.setting.settingName}
                    min={min}
                    max={max}
                    type={this.state.setting.settingType}
                    disabled={disabledSetting}
                    value={this.state.value}
                    onChange={(e) => this.handleValueChanged(e, otherTimeInput)} />
                <br />
            </div>
        )
    }

    stringInput () {
        let disabledSetting = this.state.setting.settingDisabled;
        if (this.state.facilityConfig.overrideDisabledSettings) {
          disabledSetting = false;
        }
        return (
            <div className="controls">
                <input id={this.state.setting.settingName} type='text' disabled={disabledSetting}
                    value={this.state.value} onChange={this.handleValueChanged} /><br />
            </div>
        )
    }

    radioInput () {
        return (
            <div className="controls">
              <div className="setting-options-container">
                {this.state.setting.settingOptions.map((option) => {
                  const isChecked = this.state.value === option.value;
                  return (
                    <label key={option.label} className="radio inline">
                      <input id={option.settingName} type='radio'
                             value={option.value} onChange={this.handleValueChanged}
                             checked={isChecked} />
                      {option.label}
                    </label>
                  )
                 })}
              </div>
            </div>
        )
    }

    controlGroupClasses = () => {
        if (this.state.isValid) {
            return "control-group";
        } else {
            return "control-group error";
        }
    }

    setSettingsDefinition = () => {
        let currentDefinition = this.state.settingsDefinitions.definitions[this.state.setting.settingName]
        if (currentDefinition == null) {
            currentDefinition = this.state.settingsDefinitions.getCurrentDefinition(this.state.setting.settingName);
        }
        return currentDefinition;
    }

    render () {
        return (
            <div className={this.controlGroupClasses()}>
                <label className="control-label" htmlFor={this.state.setting.settingName}>
                    {this.state.setting.settingLabel}
                    <ToolTip definition={this.setSettingsDefinition()} />
                </label>
                { this.state.numberInputWithUnit && this.numberInputWithUnit() }
                { this.state.numberInputWithoutUnit && this.numberInputWithoutUnit() }
                { this.state.timeInput && this.timeInput() }
                { this.state.stringInput && this.stringInput() }
                { this.state.radioInput && this.radioInput() }
                { !this.state.isValid &&
                    <span className="help-inline">Value must be between {this.state.setting.settingMin} and {this.state.setting.settingMax}</span>
                }
            </div>
        )
    }
}

class FacilitySettingsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x600: props.x600,
            facilityConfig: props.facilityConfig,
            values: this.getSettingsValues(props.x600, props.facilityConfig, props.settingsGroup),
            group: props.settingsGroup,
            active: props.active,
            displayAdvancedSettings: false,
            onSaveSettings: props.onSaveSettings,
            settingsDefinitions: new settingsDefinitions()
        };

        this.handleSaveClicked = this.handleSaveClicked.bind(this);
        this.regularSettingsInputs = this.regularSettingsInputs.bind(this);
        this.advancedSettingsInputs = this.advancedSettingsInputs.bind(this);
        this.toggleDisplayAdvancedSettings = this.toggleDisplayAdvancedSettings.bind(this);
        this.displayAdvancedSettingsButton = this.displayAdvancedSettingsButton.bind(this);
        this.handleInputValueChanged = this.handleInputValueChanged.bind(this);
    }

    getSettingsValues (x600, facilityConfig, group) {
        let values = {};
        group.groupSettings.forEach((setting) => {
            if (setting.settingDisabled) {
                if (setting.settingName === "Username") {
                    values[setting.settingName] = x600.user.name;
                } else if (setting.settingName === "Email") {
                    values[setting.settingName] = x600.user.email;
                } else if (setting.settingName === "TemperatureUnits") {
                    values[setting.settingName] = facilityConfig.temperatureUnit;
                } else {
                    values[setting.settingName] = x600.settingsData[setting.settingName];
                }
            } else {
                values[setting.settingName] = x600.settingsData[setting.settingName];
            }
        })
        if (group.groupAdvancedSettings) {
            group.groupAdvancedSettings.forEach((setting) => {
                values[setting.settingName] = x600.settingsData[setting.settingName];
            })
        }
        return values;
    }

    handleInputValueChanged (settingName, newValue) {
        let new_values = this.state.values;
        new_values[settingName] = newValue;
        this.setState({ values: new_values });
    }

    removeDisabledValues (values, group) {
        const { facilityConfig } = this.state;
        let remaining_values = {};
        group.groupSettings.forEach((setting) => {
            if (facilityConfig.overrideDisabledSettings || !setting.settingDisabled) {
                remaining_values[setting.settingName] = values[setting.settingName];
            }
        });
        if (group.groupAdvancedSettings) {
            group.groupAdvancedSettings.forEach((setting) => {
                remaining_values[setting.settingName] = values[setting.settingName];
            })
        }
        return remaining_values;
    }

    handleSaveClicked () {
        this.state.onSaveSettings(
            this.removeDisabledValues(this.state.values, this.state.group),
            this.state.group.groupTitle
        );
    }

    regularSettingsInputs () {
        let settings = this.state.group.groupSettings;
        return settings.map((setting, index) => {
            if (setting.settingHidden !== true) {
              return (
                  <FacilitySettingInput key={setting.settingName} settingsDefinitions={this.state.settingsDefinitions} value={this.state.values[setting.settingName]}
                      setting={setting} facilityConfig={this.state.facilityConfig}
                      onValueChanged={this.handleInputValueChanged} />
              )
            }
            return null;
        });
    }

    advancedSettingsInputs () {
        let settings = this.state.group.groupAdvancedSettings;
        return settings.map((setting, index) => {
            if (setting.settingHidden !== true) {
              return (
                  <FacilitySettingInput key={setting.settingName} settingsDefinitions={this.state.settingsDefinitions} value={this.state.values[setting.settingName]}
                      setting={setting} facilityConfig={this.state.facilityConfig}
                      onValueChanged={this.handleInputValueChanged} />
              )
            }
            return null;
        });
    }

    toggleDisplayAdvancedSettings () {
        this.setState({ displayAdvancedSettings: (this.state.displayAdvancedSettings === false)})
    }

    displayAdvancedSettingsButton () {
        if (this.state.displayAdvancedSettings === true) {
            return (
                <button className="btn" onClick={this.toggleDisplayAdvancedSettings} >
                    <i className="icon-chevron-up"></i> Hide {this.state.group.groupAdvancedLabel}
                </button>
            )
        } else {
            return (
                <button className="btn" onClick={this.toggleDisplayAdvancedSettings} >
                    <i className="icon-chevron-down"></i> Show {this.state.group.groupAdvancedLabel}
                </button>
            )
        }
    }

    render () {
        return (
            <div className={this.state.active ? "tab-pane active" : "tab-pane"} id={this.state.group.groupName+"SettingsPane"}>
                <fieldset>
                    <legend>{this.state.group.groupTitle}</legend>
                    { this.state.group.groupInfo &&
                        <div className="alert alert-info">
                            {this.state.group.groupInfo}
                        </div>
                    }
                    {this.regularSettingsInputs()}
                </fieldset>
                { this.state.group.groupAdvancedSettings &&
                    <fieldset id='advancedB' hidden={this.state.displayAdvancedSettings === false} >
                        <legend>{this.state.group.groupAdvancedLabel}</legend>
                        {this.advancedSettingsInputs()}
                    </fieldset>
                }
                <br />
                { this.state.group.groupAdvancedSettings && this.displayAdvancedSettingsButton() }
				<button className='btn btn-primary' onClick={this.handleSaveClicked}>Save {this.state.group.groupTitle}</button>
            </div>
        )
    }
}

class FacilitySettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x600: props.x600,
            facilityConfig: props.facilityConfig,
            settingsGroups: props.settingsGroups,
            activeGroupName: props.settingsGroups[0].groupName,
            showSavingModal: false,
            unsavedValues: null,
            unsavedGroupTitle: ''
        };

        this.settingsTabs = this.settingsTabs.bind(this);
        this.settingsPanes = this.settingsPanes.bind(this);
        this.handleSaveSettings = this.handleSaveSettings.bind(this);
        this.handleSavingModalClosed = this.handleSavingModalClosed.bind(this);
    }

    settingsTabs() {
        let groups = this.state.settingsGroups;
        return groups.map((group, index) => {
            let active = group.groupName === this.state.activeGroupName;
            return (
                <li key={group.groupName+"SettingsTab"} className={active ? "active" : ""}>
                    <a href={"#"+group.groupName+"SettingsPane"} data-toggle="tab">{group.groupLabel}</a>
                </li>
            )
        });
    }

    settingsPanes() {
        let groups = this.state.settingsGroups;
        return groups.map((group, index) => {
            let active = group.groupName === this.state.activeGroupName;
            return (
                <FacilitySettingsPane key={group.groupName+"SettingsPane"} x600={this.state.x600} settingsGroup={group}
                    active={active} onSaveSettings={this.handleSaveSettings} facilityConfig={this.state.facilityConfig} />
            )
        });
    }

    handleSaveSettings (values, groupTitle) {
        this.setState({
            unsavedValues: values,
            unsavedGroupTitle: groupTitle,
            showSavingModal: true
        })
        setTimeout(() => this.state.x600.set_refresh_settings_value(1), 500);
    }

    handleSavingModalClosed () {
        this.setState({
            unsavedValues: null,
            showSavingModal: false
        })
    }

    render() {
        return (
            <div className="FacilitySettings">
                <div className="tabbable">
                    <ul className="nav nav-tabs">
                        {this.settingsTabs()}
                    </ul>
                    <div className="tab-content">
                        {this.settingsPanes()}
                    </div>
                </div>
                <SavingSettingsModal show={this.state.showSavingModal} unsavedValues={this.state.unsavedValues}
                    groupTitle={this.state.unsavedGroupTitle} onClose={this.handleSavingModalClosed} x600={this.state.x600} />
            </div>
        );
    }
}

export default FacilitySettings;
