import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './PumpModal.css';

function ModalHeader (props) {
  return (
    <div className="modal-header">
      <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
      <h3>{props.pumpLabel}</h3>
    </div>
  )
}

class ModalBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pumpSpeed: Number(props.pumpSpeed),
      onPumpSpeedChanged: props.onPumpSpeedChanged
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pumpSpeed: Number(nextProps.pumpSpeed)
    });
  }

  render () {
    return (
      <div className="modal-body BlowerSettings">
        <label>Pump speed:</label>
        <label className="radio inline">
          <input type="radio" value='0' checked={this.state.pumpSpeed === 0} onChange={this.state.onPumpSpeedChanged} /> Off
        </label>
        <label className="radio inline">
          <input type="radio" value='1' checked={this.state.pumpSpeed === 1} onChange={this.state.onPumpSpeedChanged} /> Speed 1
        </label>
        <label className="radio inline">
          <input type="radio" value='2' checked={this.state.pumpSpeed === 2} onChange={this.state.onPumpSpeedChanged} /> Speed 2
        </label>
        <label className="radio inline">
          <input type="radio" value='3' checked={this.state.pumpSpeed === 3} onChange={this.state.onPumpSpeedChanged} /> Speed 3
        </label>
      </div>
    )
  }
}

function ModalFooter (props) {
  return (
    <div className="modal-footer">
      <button className="btn" onClick={props.onCancelClicked}>Cancel</button>
      <button className="btn btn-primary" onClick={props.onApplyChangesClicked}>Apply changes</button>
    </div>
  )
}

class PumpModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x600: props.x600,
      show: props.show,
      pump: props.pump,
      pumpSpeed: 0,
      handleClose: props.onClose
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show === false && nextProps.show === true) {
      this.setState({
        show: nextProps.show,
        pump: nextProps.pump,
        pumpSpeed: nextProps.pump ? nextProps.x600.get_pump_speed_value(nextProps.pump.pumpId) : 0
      });
    }
  }

  handlePumpSpeedChanged = (event) => {
    this.setState({
      pumpSpeed: Number(event.target.value)
    })
  }

  close = () => {
    this.setState({ show: false });
    this.state.handleClose();
  }

  handleApplyChangesClicked = () => {
    this.state.x600.set_pump_speed_value(this.state.pump.pumpId, this.state.pumpSpeed);
    this.close();
  }

  render () {
    return (
      <Modal show={this.state.show} onHide={this.close}>
        <ModalHeader pumpLabel={this.state.pump ? this.state.pump.pumpLabel : 'Unknown'} onCloseClicked={this.close} />
        <ModalBody x600={this.state.x600} pumpSpeed={this.state.pumpSpeed} onPumpSpeedChanged={this.handlePumpSpeedChanged} />
        <ModalFooter onCancelClicked={this.close} onApplyChangesClicked={this.handleApplyChangesClicked} />
      </Modal>
    )
  }
}

export default PumpModal;
