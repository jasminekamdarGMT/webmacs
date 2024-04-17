import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './BatchModal.css';

function ModalHeader (props) {
    const zoneLabel = "Zone " + props.zoneLabel;
    const zoneControlTitle = zoneLabel + " - " + props.batchActionLabel + ' ' + props.batchLabel;
    return (
        <div className="modal-header">
		    { props.onCloseClicked ? <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button> : null }
		    <h3 id="zone-control-title">{zoneControlTitle}</h3>
  		</div>
    )
}

function ModalFooter (props) {
    return (
        <div className="modal-footer">
            {props.canClose ? <button className="btn" onClick={props.onCloseClicked}>Close</button> : null}
            {props.showBatchAction &&
              <button className="btn btn-primary" onClick={props.batchAction} disabled={props.disableAction}>{props.batchActionLabel}</button>
            }
		    </div>
    )
}

class BatchModal extends Component {
    constructor(props) {
        super(props);

        this.state = this.getStateFromProps(props);

        this.close = this.close.bind(this);
        this.handleBatchNameChanged = this.handleBatchNameChanged.bind(this);
        this.resetZone = this.resetZone.bind(this);
    }

    getStateFromProps (props) {
        return {
            x600: props.x600,
            facilityConfig: props.facilityConfig,
            zoneGroups: props.zoneGroups,
            zone_id: props.zone_id,
            damper_id: props.damper_id,
            blower_id: props.blower_id,
            isNewBatch: props.isNewBatch,
            isEndingBatch: props.isEndingBatch,
            filename: props.filename ? props.filename : props.x600.get_zone_filename(props.zone_id),
            zoneLabel: props.zone_label ? props.zone_label : props.zone_id ? props.zone_id.replace(/^[0]+/g,"") : "",
            batchLabel: props.zone_id ? props.x600.get_zone_batch_title(props.zone_id) : "",
            show: props.show,
            onClose: props.onClose,
            toZone: props.zone_id,
            newBatchName: props.newBatchName || '',
            showBatchNameError: props.showBatchNameError,
            showBatchNameSaveError: props.showBatchNameSaveError,
            blowerHasAerationReversingControl: props.blowerHasAerationReversingControl,
            startingBatch: props.startingBatch,
            movingBatch: props.movingBatch,
            endingBatch: props.endingBatch
        };
    }

    componentWillReceiveProps(nextProps) {
        let new_state = this.getStateFromProps(nextProps);
        if (this.state.show === false && new_state !== this.state) {
            this.setState(new_state);
        }
    }

    close () {
        this.setState({ show: false });
        this.state.onClose();
    }

    handleStartBatchClicked = () => {
      let validBatchName = this.state.newBatchName.match(/^(?=.*[a-zA-Z0-9])([a-zA-Z0-9\s-_]+)$/);
      if(validBatchName) {
        this.setState({
          startingBatch: true
        }, () => {
          this.startBatch();
        });
      } else {
        this.setState({
          showBatchNameError: true,
          showBatchNameSaveError: false
        });
      }
    }

    startBatch = () => {
      const _this2 = this;
      this.state.x600.updateZoneBatchTitle(
        this.state.zone_id,
        this.state.newBatchName,
        function(success,error) {
          if (success) {
            _this2.state.x600.set_zone_reset_value(
              _this2.state.zone_id,
              _this2.state.resetBatch
            );
            _this2.state.x600.set_zone_control_value(
              _this2.state.zone_id,
              true
            );
            if (_this2.state.x600.get_load_zone_active_value(_this2.state.zone_id)) {
              _this2.state.x600.set_load_zone_active_value(_this2.state.zone_id, 0);
              _this2.state.x600.loadZoneStartupData(function(response) {
                _this2.state.x600.restorePreLoadZoneSnapshot(
                  response,
                  _this2.state.zone_id,
                  _this2.state.x600.facilityConfig
                );
              });
            }
            _this2.setState({
              startingBatch: false
            });
            _this2.close();
          } else {
            _this2.setState({
              showBatchNameSaveError: true,
              showBatchNameError: false,
              startingBatch: false
            });
          }
        }
      )
    }

    handleMoveBatchClicked = () => {
      this.setState({
        movingBatch: true
      }, () => {
        this.moveBatch();
      });
    }

    moveBatch = () => {
      const _this2 = this;
      const {
        zone_id,
        toZone,
        x600,
        facilityConfig
      } = this.state;

      x600.set_zone_moveto_value(
        zone_id,
        toZone
      );
      x600.set_zone_movedfrom_value(
        toZone,
        zone_id
      );
      x600.clear_other_zone_moved_from(zone_id,toZone);
      x600.updateZoneBatchTitle(
        toZone,
        x600.get_zone_batch_title(zone_id),
        function(success,error) {
          if (facilityConfig.hasLoadZoneFeature) {
            x600.preLoadZoneSnapshot(
              [zone_id,toZone],
              facilityConfig,
              function() {
                _this2.setLoadZoneValues(zone_id);
                _this2.setToZoneLoadZoneValues(toZone);
              });
          }
          _this2.resetZone(_this2.state.zone_id);
          _this2.setState({
            movingBatch: false
          });
          _this2.close();
        }
      )
    }

    setLoadZoneValues = (zone_id) => {
      const {
        x600,
        damper_id,
        blower_id,
        blowerHasAerationReversingControl
      } = this.state;

      x600.set_load_zone_active_value(zone_id, 1);
      x600.set_damper_value_value(damper_id, 100);
      x600.set_damper_override_value(damper_id, 1);
      if (!blowerHasAerationReversingControl) {
        x600.set_blower_control_value(blower_id, 1);
        x600.set_blower_override_value(blower_id, 1);
        const maxSpeed = x600.get_max_vfd_speed_setting(blower_id) ?
                       x600.get_max_vfd_speed_setting(blower_id) :
                       100;
        x600.set_blower_value_value(blower_id, maxSpeed);
        x600.set_blower_speed_value(blower_id, maxSpeed);
      }
    }

    setToZoneLoadZoneValues = (toZone) => {
      const {
        x600,
        facilityConfig
      } = this.state;

      const toZoneDamperId = x600.getZoneDamperId(toZone,facilityConfig);
      const toZoneBlower = x600.getZoneBlower(toZone,facilityConfig);
      x600.set_load_zone_active_value(toZone, 1);
      x600.set_damper_value_value(toZoneDamperId, 100);
      x600.set_damper_override_value(toZoneDamperId, 1);
      x600.set_blower_override_value(toZoneBlower.blowerId, 1);
      if (toZoneBlower.hasAerationReversingControl) {
        x600.set_blower_aeration_override_value(toZoneBlower.blowerId, 1);
      }
    }

    handleEndBatchClicked = () => {
      this.setState({
        endingBatch: true
      }, () => {
        this.endBatch();
      });
    }

    endBatch = () => {
      this.resetZone(this.state.zone_id);
      this.state.x600.set_zone_moveto_value(
        this.state.zone_id,
        -1
      );
      this.setState({
        endingBatch: false
      });
      this.close();
    }

    resetZone (zone_id) {
      const _this2 = this;
      this.state.x600.updateZoneBatchTitle(
        zone_id,
        '',
        function(success,error) {
          _this2.state.x600.set_zone_reset_value(
              zone_id,
              true
          );
          _this2.state.x600.set_zone_control_value(
              zone_id,
              false
          );
        }
      )
    }

    getAvailableZones () {
      let allZones = [];
      this.state.facilityConfig.zoneGroups.forEach(group => {
        group.groupZones.forEach(zone => {
          allZones.push(zone);
        })
      });

      return this.state.x600.get_zones_without_associated_batch().filter(zone_id => this.state.zone_id !== zone_id).map(id => {
        let label;
        allZones.forEach(zn => {
          if (zn.zoneId === id) {
            label = zn.zoneLabel ? zn.zoneLabel : Number(id);
          }
        });
        return {id,label};
      });
    }

    zoneSelected (_this, event, index) {
      let toZone = _this.getAvailableZones()[index];
      this.setState({toZone: toZone.id});
    }

    handleBatchNameChanged (event) {
      let newValue = event.target.value;
      this.setState({
          newBatchName: newValue
      });
    }

    render () {
      if(!this.state.show) {
        return(<div></div>)
      }
      const availableZones = this.getAvailableZones();
      const hasAvailableZones = availableZones.length > 0;
      const isNewBatch = this.state.isNewBatch;
      const isEndingBatch = this.state.isEndingBatch;
      if(isNewBatch) {
        const batchActionLabel = 'Start New Batch';
        const disableAction = this.state.newBatchName.length < 1 ||
                              this.state.startingBatch;
        return (
            <Modal className="BatchModal" show={this.state.show} onHide={!this.state.startingBatch ? this.close : null}>
                <ModalHeader zoneLabel={this.state.zoneLabel} batchLabel={this.state.batchLabel}
                batchActionLabel={batchActionLabel} onCloseClicked={!this.state.startingBatch ? this.close : null} />
                <div className="modal-body">
                  <div>
                    Batch Name:<br/>
                    <input type='text' value={this.state.newBatchName} onChange={this.handleBatchNameChanged} />
                  </div>
                  {
                    this.state.startingBatch &&
                    <div>
                      Starting batch. Please wait.
                    </div>
                  }
                  {
                    this.state.showBatchNameError &&
                    <div>
                      Batch Name must contain at least one letter or number.<br/>
                      Batch Name may only include letters, numbers, spaces, hyphens, and underscores.
                    </div>
                  }
                  {
                    this.state.showBatchNameSaveError &&
                    <div>
                      An error occurred with starting a new batch. Please try again.
                    </div>
                  }
                </div>
                <ModalFooter onCloseClicked={this.close} canClose={!this.state.startingBatch} batchAction={this.handleStartBatchClicked}
                batchActionLabel='Start New Batch' showBatchAction={isNewBatch}
                disableAction={disableAction} />
            </Modal>
        )
      } else if(isEndingBatch) {
        const batchActionLabel = 'End Batch';
        return (
          <Modal className="BatchModal" show={this.state.show} onHide={this.close}>
              <ModalHeader zoneLabel={this.state.zoneLabel} batchLabel={this.state.batchLabel}
              batchActionLabel={batchActionLabel} onCloseClicked={this.close} />
              <div className="modal-body" style={{minHeight: '50vh'}}>
                Are you sure want to end batch <b>{this.state.x600.get_zone_batch_title(this.state.zone_id)}</b> in this zone?
              </div>
              <ModalFooter onCloseClicked={this.close} canClose={!this.state.startingBatch} batchAction={this.handleEndBatchClicked}
              batchActionLabel={batchActionLabel} showBatchAction={isEndingBatch} />
          </Modal>
        )
      } else {
        const batchActionLabel = 'Move Batch';
        const disableAction = this.state.zoneId === this.state.toZone;
        return (
            <Modal className="BatchModal" show={this.state.show} onHide={!this.state.movingBatch ? this.close : null}>
                <ModalHeader zoneLabel={this.state.zoneLabel} batchLabel={this.state.batchLabel}
                batchActionLabel={batchActionLabel} onCloseClicked={!this.state.movingBatch ? this.close : null} />
                <div className="modal-body" style={{minHeight: '40vh'}}>
                  {hasAvailableZones && <div>
                      <div style={{marginLeft: '10px'}}>
                        {!this.state.movingBatch && <div>
                          Click <b>Move Batch</b> to move batch <b>{this.state.batchLabel}</b> to the selected zone.
                        </div>}
                      </div>
                      {!this.state.movingBatch && availableZones.map((zone, index) => {
                        const checkedZone = this.state.toZone === zone.id;
                        return (
                          <div key={index} className={checkedZone ? "zone-card well selected-zone" : "zone-card well"} onClick={(evt) => this.zoneSelected(this, evt, index)}>
                            <h3>{'Zone ' + zone.label}</h3>
                          </div>
                        )
                      })}
                      {this.state.movingBatch && <div>
                        Moving batch <b>{this.state.batchLabel}</b> to the selected zone. Please wait.
                      </div>}
                  </div>}
                  {!hasAvailableZones && <div>
                    <h3>All zones currently have associated batches.</h3> Please End Batch in the zone you would like to move this batch to and try again.
                  </div>}
                </div>
                <ModalFooter onCloseClicked={this.close} canClose={!this.state.movingBatch} batchAction={this.handleMoveBatchClicked}
                batchActionLabel={batchActionLabel} showBatchAction={hasAvailableZones}
                disableAction={disableAction} />
            </Modal>
        )
      }

    }
}

export default BatchModal;
