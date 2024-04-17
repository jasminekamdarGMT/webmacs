import React, { Component } from 'react';
import MonitorInputsModal from '../MonitorInputsModal/MonitorInputsModal';
import EjectModal from '../EjectModal/EjectModal';
import './FacilityTools.css';
import { version } from '../../../package.json'

class FacilityTools extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onMapClick: props.onMapClick,
            x600: props.x600,
            inputMonitorGroups: props.inputMonitorGroups,
            showMonitorInputsModal: false,
            showEjectModal: false
        }
    }

    handleMonitorInputsClicked = () => {
        this.setState({ showMonitorInputsModal: true })
    }

    handleMonitorInputsClose = () => {
        this.setState({ showMonitorInputsModal: false })
    }

    handleEjectClicked = () => {
        this.setState({ showEjectModal: true })
    }

    handleEjectModalClose = () => {
        this.setState({ showEjectModal: false })
    }

    render () {
        return (
            <div className="FacilityTools row">
                <div className="span12 text-center">
                    <fieldset>
        						<legend>System Tools</legend>
                    <div>
                      <button className="btn btn-default" onClick={this.handleMonitorInputsClicked}>Monitor Inputs</button>
                    </div>
                    <div>
                      <button className="btn btn-default" onClick={this.handleEjectClicked}>Eject External Storage</button>
                    </div>
        					</fieldset>
                    <hr />
                    <p><strong>WebMACS version {version}</strong></p>
                    <p>&copy; 2019 Green Mountain Technologies, Inc.</p>
                </div>
                <MonitorInputsModal show={this.state.showMonitorInputsModal} onClose={this.handleMonitorInputsClose}
                    x600={this.state.x600} inputMonitorGroups={this.state.inputMonitorGroups} />
                <EjectModal show={this.state.showEjectModal} onClose={this.handleEjectModalClose}
                    x600={this.state.x600} />
            </div>
        )
    }
}

export default FacilityTools;
