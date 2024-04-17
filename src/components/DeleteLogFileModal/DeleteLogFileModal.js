import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

function ModalHeader (props) {
    return (
        <div className="modal-header">
            { !props.deleting &&
                <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
            }
            <h3>Delete Batch Log File</h3>
        </div>
    )
}

function ModalBody (props) {
    if (props.deleting) {
        return (
            <div className="modal-body">
                Deleting {props.filename}...
            </div>
        )
    } else if (props.failed) {
        return (
            <div className="modal-body">
                <div className="alert alert-error">
                    <h4>Error!</h4>
                    There was an error while attempting to delete {props.filename}.
                </div>
            </div>
        )
    } else if (props.isACurrentBatch) {
        return (
            <div className="modal-body">
              <div className="alert alert-warning">
                <h4>Warning!</h4>
                {props.isACurrentBatch &&
                  <div>This log file is associated with a currently running batch. Deleting this file will reset the batch and its current zone.</div>}
              </div>
              <div>Are you sure you want to delete {props.filename}?</div>
            </div>
        )
    } else {
        return (
            <div className="modal-body">
                <div>Are you sure you want to delete {props.filename}?</div>
            </div>
        )
    }
}

function ModalFooter (props) {
    if (props.deleting) {
        return (
            <div className="modal-footer">
            </div>
        )
    } else if (props.failed) {
        return (
            <div className="modal-footer">
                <button className="btn btn-default" onClick={props.onCancelClicked}>Dismiss</button>
            </div>
        )
    } else {
        return (
            <div className="modal-footer">
                <button className="btn btn-default" onClick={props.onCancelClicked}>Cancel</button>
                <button className="btn btn-danger" onClick={props.onDeleteClicked}>Delete</button>
            </div>
        )
    }
}

class DeleteLogFileModal extends Component {
    constructor(props) {
        super(props);

        this.state = this.stateFromProps(props);
    }

    stateFromProps (props) {
        return {
            show: props.show,
            filename: props.filename,
            x600: props.x600,
            onClose: props.onClose,
            deleting: false,
            failed: false
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
        this.state.onClose();
    }

    resetZone (zone_id) {
      this.state.x600.updateZoneBatchTitle(
        zone_id,
        '',
        (success,error) => {
          this.state.x600.set_zone_reset_value(
              zone_id,
              true
          );
          this.state.x600.set_zone_control_value(
              zone_id,
              false
          );
          this.state.x600.set_zone_moveto_value(
              zone_id,
              -1
          );
        }
      )
    }

    handleDeleteClicked = () => {
        this.setState({ deleting: true })
        let startupData = Object.entries(this.state.x600.zoneStartupData);
        startupData.forEach(zoneData => {
          if (zoneData[1].filename === this.state.filename) {
            this.resetZone(zoneData[0]);
          }
        });
        this.state.x600.deleteBatchFile(this.state.filename, this.handleDeleteFileComplete);
    }

    handleDeleteFileComplete = (success) => {
        if (success) {
            this.close();
        } else {
            this.setState({ deleting: false, failed: true });
        }
    }

    render () {
        let isACurrentBatch = false;
        Object.entries(this.state.x600.zoneStartupData).forEach(zoneData => {
          if (zoneData[1].filename === this.state.filename) {
            isACurrentBatch = true;
          }
        });
        return (
            <Modal show={this.state.show} onHide={this.close}>
                <ModalHeader onCloseClicked={this.close}  deleting={this.state.deleting} failed={this.state.failed} />
                <ModalBody filename={this.state.filename} deleting={this.state.deleting} failed={this.state.failed}
                    isACurrentBatch={isACurrentBatch} />
                <ModalFooter onCancelClicked={this.close} deleting={this.state.deleting} failed={this.state.failed}
                    onDeleteClicked={this.handleDeleteClicked} />
	        </Modal>
        )
    }
}

export default DeleteLogFileModal;
