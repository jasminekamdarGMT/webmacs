import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

function ModalHeader (props) {
  let modalTitle = props.blowerLabel.replace("Blower", "Manifold");
    return (
        <div className="modal-header">
            <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
            <h3>{modalTitle}</h3>
        </div>
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
            aerationOverride: props.aerationOverride,
            aerationDirection: props.aerationDirection,
            onAerationOverrideChanged: props.onAerationOverrideChanged,
            onAerationDirectionChanged: props.onAerationDirectionChanged,
            onInputValueChanged: props.onInputValueChanged,
            hasReversingLogicOptions: props.hasReversingLogicOptions,
            onReversingLogicChanged: props.onReversingLogicChanged,
            reversingLogicChoice: props.reversingLogicChoice,
            misterOverride: props.misterOverride,
            onMisterOverrideChanged: props.onMisterOverrideChanged,
            hasMisterControl: props.hasMisterControl,
            misterControl: props.misterControl,
            onMisterControlChanged: props.onMisterControlChanged
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.stateFromProps(nextProps));
    }

    misterStatus = () => {
      return (
        <div>
            <br />
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
            <div className="modal-body AerationSettings">
                {this.state.hasReversingLogicOptions &&
                  <div>
                    <br />
                    <label><strong>Aeration Reversing Logic:</strong></label>
                    <label className="radio inline">
                        <input type="radio" value='temp' checked={this.state.reversingLogicChoice === "temp"} onChange={this.state.onReversingLogicChanged} /> Temperature Set Point Controlled
                    </label>
                    <label className="radio inline">
                        <input type="radio" value='cycle' checked={this.state.reversingLogicChoice === "cycle"} onChange={this.state.onReversingLogicChanged} /> Aeration Direction Cycle Time Controlled
                    </label>
                  </div>
                }
                <div>
                  <br />
                  <label className="checkbox">
                    <input type="checkbox" checked={this.state.aerationOverride} onChange={this.state.onAerationOverrideChanged} />
                    <strong>Manual Direction Control</strong>
                  </label>
                </div>
                { this.state.aerationOverride &&
                  <div>
                    <br />
                    <label><strong>Manual Aeration Direction:</strong></label>
                    <label className="radio inline">
                        <input type="radio" value='positive' checked={this.state.aerationDirection === true} onChange={this.state.onAerationDirectionChanged} /> Positive
                    </label>
                    <label className="radio inline">
                        <input type="radio" value='negative' checked={this.state.aerationDirection !== true} onChange={this.state.onAerationDirectionChanged} /> Negative
                    </label>
                  </div>
                }
                {this.state.hasMisterControl && this.misterStatus()}
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

class AerationModal extends Component {
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
        return {
            x600: props.x600,
            facilityConfig: props.facilityConfig,
            show: props.show,
            blower_id: props.blower_id,
            blower_label: blower_label,
            aerationOverride: props.x600.get_blower_aeration_override_value(props.blower_id),
            aerationDirection: props.x600.get_blower_aeration_direction_value(props.blower_id),
            hasReversingLogicOptions: props.facilityConfig.hasReversingLogicOptions ? props.facilityConfig.hasReversingLogicOptions : false,
            handleClose: props.onClose,
            reversingLogicChoice: this.getReversingLogicChoice(props),
            hasMisterControl: props.hasMisterControl === true ? true : false,
            misterOverride: props.x600.get_duct_mister_override_value(props.blower_id),
            misterControl: props.x600.get_duct_mister_control_value(props.blower_id),
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

    getReversingLogicChoice = (props) => {
      const revLogicChoice = props.x600.get_blower_reversing_logic_value(props.blower_id);
      return props.x600.get_blower_revlogic_string(revLogicChoice);
    }

    handleAerationOverrideChanged = (event) => {
        this.setState({ aerationOverride: event.target.checked });
    }

    handleAerationDirectionChanged = (event) => {
      this.setState({ aerationDirection: (event.target.value === 'positive') });
    }

    handleReversingLogicChanged = (event) => {
      this.setState({ reversingLogicChoice: event.target.value });
    }

    handleMisterOverrideChanged = (event) => {
        this.setState({ misterOverride: event.target.checked });
    }

    handleMisterControlChanged = (event) => {
      if (event.target.checked === true) {
          this.setState({ misterControl: (event.target.value === 'on') });
      }
    }

    handleApplyChangesClicked = () => {
        this.saveStateValues();
    }

    saveStateValues = () => {
      this.state.x600.set_blower_aeration_override_value(this.state.blower_id, this.state.aerationOverride);
      if (this.state.aerationOverride === true) {
          this.state.x600.set_blower_aeration_direction_value(this.state.blower_id, this.state.aerationDirection);
      }
      this.state.x600.set_blower_reversing_logic_value(this.state.blower_id, this.state.reversingLogicChoice);
      if (this.state.hasMisterControl) {
          this.state.x600.set_duct_mister_override_value(this.state.blower_id, this.state.misterOverride);
          if (this.state.misterOverride === true) {
              this.state.x600.set_duct_mister_timer_value(this.state.blower_id, 0);
              this.state.x600.set_duct_mister_control_value(this.state.blower_id, this.state.misterControl);
              this.state.x600.set_duct_mister_value(this.state.blower_id, this.state.misterControl);
          }
      }
      this.close();
    }

    render () {
      return (
        <Modal show={this.state.show} onHide={this.close}>
          <ModalHeader blowerLabel={this.state.blower_label} onCloseClicked={this.close} />
          <ModalBody
            aerationOverride={this.state.aerationOverride}
            aerationDirection={this.state.aerationDirection}
            x600={this.state.x600}
            onAerationOverrideChanged={this.handleAerationOverrideChanged}
            onAerationDirectionChanged={this.handleAerationDirectionChanged}
            hasReversingLogicOptions={this.state.hasReversingLogicOptions}
            onReversingLogicChanged={this.handleReversingLogicChanged}
            reversingLogicChoice={this.state.reversingLogicChoice}
            misterOverride={this.state.misterOverride}
            onMisterOverrideChanged={this.handleMisterOverrideChanged}
            hasMisterControl={this.state.hasMisterControl}
            misterControl={this.state.misterControl}
            onMisterControlChanged={this.handleMisterControlChanged}
          />
          <ModalFooter onCancelClicked={this.close} onApplyChangesClicked={this.handleApplyChangesClicked} />
        </Modal>
      )
    }
}

export default AerationModal;
