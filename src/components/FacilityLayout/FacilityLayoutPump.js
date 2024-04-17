import React, { Component } from 'react';
import './FacilityLayoutPump.css';

class FacilityLayoutPump extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x600: props.x600,
      pump: props.pump,
      pumpId: props.pump.pumpId,
      pumpLabel: props.pump.pumpLabel,
      handleClick: props.onClick
    };
  }

  handleClick = () => {
    this.state.handleClick(this.state.pump);
  }

  pumpStatus = () => {
    let pumpSpeed = Number(this.state.x600.get_pump_speed_value(this.state.pumpId));
    if (pumpSpeed === 0) {
      return (
        <div className="pumpStatus">OFF</div>
      )
    } else {
      return (
        <div className="pumpStatus">SPD {pumpSpeed}</div>
      )
    }
  }

  render () {
    return (
      <div className="facilityLayoutPump" onClick={this.handleClick}>
        <div className="pumpMotor">
          <div className="pumpLabel">{this.state.pumpLabel}</div>
          {this.pumpStatus()}
        </div>
        <div className="pumpNeck"></div>
        <div className="pumpBody"></div>
        <div className="pumpFlange"></div>
      </div>
    )
  }
}

export default FacilityLayoutPump;
