import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

function ModalHeader (props) {
    const drumId = props.drumId ? props.drumId.replace(/^[0]+/g,"") : "";
    return (
        <div className="modal-header">
            <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
            <h3>Drum {drumId} - Start Rotation</h3>
        </div>
    )
}

function ModalBody (props) {
  return (
      <div className="modal-body">
          Ensure that drum is closed and ready before continuing. Start drum rotation now?
      </div>
  )
}

function ModalFooter (props) {
  return (
      <div className="modal-footer">
          <button className="btn btn-default" onClick={props.onCancelClicked}>Cancel</button>
          <button className="btn btn-success" onClick={props.onStartRotationClicked}>Start Rotation</button>
      </div>
  )
}

class DrumRotationConfirmationModal extends Component {
    constructor(props) {
        super(props);

        this.state = this.stateFromProps(props);

        this.handleStartRotationClicked = this.handleStartRotationClicked.bind(this);
    }

    stateFromProps (props) {
        return {
            show: props.show,
            filename: props.filename,
            x600: props.x600,
            drumId: props.drumId,
            onClose: props.onClose
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

    handleStartRotationClicked = () => {
      this.state.x600.set_drum_rotation_control_value(
        this.state.drumId,
        true
      );
      this.close();
    }

    render () {
        return (
            <Modal show={this.state.show} onHide={this.close}>
                <ModalHeader onCloseClicked={this.close} drumId={this.state.drumId} />
                <ModalBody />
                <ModalFooter onCancelClicked={this.close} onStartRotationClicked={this.handleStartRotationClicked} />
	        </Modal>
        )
    }
}

export default DrumRotationConfirmationModal;
