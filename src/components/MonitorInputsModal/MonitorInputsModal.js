import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './MonitorInputsModal.css';

class MonitorInputsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x600: props.x600,
            group: props.inputsGroup,
            active: props.active
        };
    }

    renderInputStatusLabel = (inputName) => {
      let displayStatusClassName = '';
      let displayStatus= '';
      if (inputName.match(/lvtemp/)) {
        let sensorAgeInput = inputName.substring(0,inputName.length-6)+'tempage';
        let sensorAge= this.state.x600.currentData[sensorAgeInput];
        let sensorAgeAlarm = this.state.x600.doesSettingExist('WirelessSensorAgeAlarm') ? this.state.x600.settingsData['WirelessSensorAgeAlarm'] * 60 : 36000;
        if (Number(sensorAge) >= 65535) {
          displayStatusClassName = 'label label-important';
          displayStatus= 'Offline';
        } else if (Number(sensorAge) > sensorAgeAlarm) {
          displayStatusClassName = 'label label-warning';
          displayStatus= 'Offline';
        }
      }
      return (
        <span className={displayStatusClassName}>{displayStatus}</span>
      )
    }

    renderInputs = () => {
        return this.state.group.groupInputs.map((input, index) => {
            let displayValue = this.state.x600.currentData[input.inputName];
            if (input.inputTranslations) {
                input.inputTranslations.forEach((set, index) => {
                    if (set.value === displayValue) {
                        displayValue = set.translation;
                    }
                });
            }
            if (input.inputName.match('pospressure')) {
              if (displayValue < 0) {
                displayValue = 0;
              }
            } else if (input.inputName.match('negpressure')) {
              if (displayValue > 0) {
                displayValue = 0;
              }
            }
            return (
                <tr key={input.inputName}>
                    <td>{input.inputLabel}</td>
                    <td>
                      <strong>{displayValue} </strong>
                      {input.inputUnit} {this.renderInputStatusLabel(input.inputName)}
                    </td>
                </tr>
            )
        })
    }

    render () {
        return (
            <div className={this.state.active ? "tab-pane active" : "tab-pane"} id={this.state.group.groupName+"InputsPane"}>
                <table className="table table-bordered">
                    <tbody>
                        {this.renderInputs()}
                    </tbody>
                </table>
            </div>
        )
    }
}

class MonitorInputsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x600: props.x600,
            inputMonitorGroups: props.inputMonitorGroups,
            activeGroupName: props.inputMonitorGroups[0].groupName,
            show: false,
            onClose: props.onClose
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show === true && this.state.show === false) {
            this.refreshData(false);
        }
        this.setState({ show: nextProps.show });
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    refreshData = (later) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (later === true) {
            this.timer = setTimeout(() => this.state.x600.refreshData(this.handleNewData.bind(this)), 3000);
        } else {
            this.state.x600.refreshData(this.handleNewData.bind(this));
        }
    }

    handleNewData = () => {
        this.forceUpdate();
        this.refreshData(true);
    }

    close = () => {
        clearTimeout(this.timer);
        this.state.onClose();
    }

    inputsTabs = () => {
        let groups = this.state.inputMonitorGroups;
        return groups.map((group, index) => {
            let active = group.groupName === this.state.activeGroupName;
            return (
                <li key={group.groupName+"InputsTab"} className={active ? "active" : ""}>
                    <a href={"#"+group.groupName+"InputsPane"} data-toggle="tab">{group.groupLabel}</a>
                </li>
            )
        });
    }

    inputsPanes = () => {
        let groups = this.state.inputMonitorGroups;
        return groups.map((group, index) => {
            let active = group.groupName === this.state.activeGroupName;
            return (
                <MonitorInputsPane key={group.groupName+"InputsPane"} x600={this.state.x600} inputsGroup={group}
                    active={active} />
            )
        });
    }

    render () {
        return (
            <Modal className="MonitorInputsModal" show={this.state.show} onHide={this.close}>
                <div className="modal-header">
			        <button type="button" className="close" aria-hidden="true" onClick={this.close}>&times;</button>
		            <h3>Monitor Inputs</h3>
		        </div>
                <div className="modal-body">
                    <div className="tabbable">
                        <ul className="nav nav-tabs">
                            {this.inputsTabs()}
                        </ul>
                        <div className="tab-content">
                            {this.inputsPanes()}
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default MonitorInputsModal;
