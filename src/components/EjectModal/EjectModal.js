import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

class EjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x600: props.x600,
            show: props.show,
            isEjecting: false,
            isEjected: false,
            ejectionError: false,
            onClose: props.onClose
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          show: nextProps.show,
          isEjecting: nextProps.isEjecting,
          isEjected: nextProps.isEjected,
          ejectionError: nextProps.ejectionError
        });
    }

    close = () => {
        this.state.onClose();
    }

    eject = () => {
        this.setState({ isEjecting: true });
        Object.entries(this.state.x600.zoneStartupData).forEach(zoneData => {
          if (zoneData[1].filename !== '') {
            this.state.x600.set_zone_moveto_value(
                zoneData[0],
                -1
            );
            this.state.x600.set_zone_control_value(
                zoneData[0],
                false
            );
          }
        });
        setTimeout(() => this.ejectStorage(), 3000);
    }

    ejectStorage = () => {
      const ejectUrl = '/eject.php';
      axios.get(ejectUrl).then(this.handleEjectCallback).catch((error) => {
          this.setState({ ejectionError: true, isEjecting: false });
      });
    }

    handleEjectCallback = () => {
      this.setState({ isEjected: true, isEjecting: false })
    }

    renderEjectionStatus = () => {
      if (this.state.ejectionError) {
        return (
          <div>
            An error occurred while trying to eject the external storage.
          </div>
        )
      } else if (this.state.isEjected) {
        return (
          <div>
            <div>
              External storage has been ejected.
            </div>
            <div>
              To resume normal operation, the external storage drive will need to be reconnected.
            </div>
            <div>
              Two power cycles may be necessary to resume normal operation.
            </div>
          </div>
        )
      } else if (this.state.isEjecting) {
        return (
          <div>
            Ejecting external storage. Please wait.
          </div>
        )
      } else {
        return (
          <div>
            <div>
              Continuing will stop all batches and logging.
            </div>
            <div>
              Would you like to continue?
            </div>
          </div>
        )
      }
    }

    render () {
        return (
            <Modal className="EjectModal" show={this.state.show} onHide={!this.state.isEjecting ? this.close : null}>
                <div className="modal-header">
    			         { !this.state.isEjecting ? <button type="button" className="close" aria-hidden="true" onClick={this.close}>&times;</button> : null }
    		           <h3>Eject External Storage</h3>
    		        </div>
                <div className="modal-body">
                    {this.renderEjectionStatus()}
                </div>
                <div className="modal-footer">
                   {!this.state.isEjecting ? <button className="btn" onClick={this.close}>Close</button> : null}
                    {!this.state.isEjected && !this.state.isEjecting && !this.state.ejectionError &&
                      <button className="btn btn-primary" onClick={this.eject}>Continue</button>
                    }
        		    </div>
            </Modal>
        )
    }
}

export default EjectModal;
