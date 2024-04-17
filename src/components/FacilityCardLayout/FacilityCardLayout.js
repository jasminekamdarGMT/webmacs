import React, { Component } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import AerationModal from '../AerationModal/AerationModal';
import BlowerModal from '../BlowerModal/BlowerModal';
import BiofilterBlowerModal from '../BiofilterBlowerModal/BiofilterBlowerModal';
import ZoneModal from '../ZoneModal/ZoneModal';
import ViewGraphModal from '../ViewGraphModal/ViewGraphModal';
import BatchModal from '../BatchModal/BatchModal';
import DrumRotationConfirmationModal from '../DrumRotationConfirmationModal/DrumRotationConfirmationModal';
import PumpModal from '../PumpModal/PumpModal';
import './FacilityCardLayout.css';
import ProcessingIndicator from '../ProcessingIndicator/ProcessingIndicator';

function DrumControl(props) {
  const ioName = 'drum' + props.drumId + 'control';
  const drumControlValue =
    props.x600.get_io_control_value(ioName) > 0 ? true : false;
  return (
    <div className='DrumControl pull-right'>
      {drumControlValue ? (
        <button
          className='btn btn-danger'
          onClick={props.onStopRotationClicked}
        >
          Stop Rotation
        </button>
      ) : (
        <button
          className='btn btn-success'
          onClick={props.onStartRotationClicked}
        >
          Start Rotation
        </button>
      )}
    </div>
  );
}

class FacilityCardLayoutManifold extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x600: props.x600,
      facilityConfig: props.facilityConfig,
      blower: props.blower,
      zonesPerGroup: props.zonesPerGroup,
      onAerationControlClicked: props.onAerationControlClicked,
    };
  }

  blowerAerationDirectionLabel = () => {
    let direction = Number(
      this.state.x600.get_blower_revdamper_value(this.state.blower.blowerId),
    );
    let isReversingDirection =
      this.state.x600.get_blower_idletimer_value(this.state.blower.blowerId) >
      0;
    direction = direction > 0 ? 'POSITIVE' : 'NEGATIVE';
    direction = isReversingDirection ? 'REVERSING' : direction;
    return <span className='label label-info'>{direction}</span>;
  };

  blowerAerationOverrideLabel = () => {
    let manual = this.state.x600.get_blower_aeration_override_value(
      this.state.blower.blowerId,
    );
    if (manual) {
      return <span className='label label-warning'>MANUAL</span>;
    } else {
      return <span className='label label-success'>AUTO</span>;
    }
  };

  misterControlLabel = () => {
    let control = this.state.x600.get_duct_mister_value(
      this.state.blower.blowerId,
    );
    if (control) {
      return <span className='label label-success'>ON</span>;
    } else {
      return <span className='label label-warning'>OFF</span>;
    }
  };

  handleAerationControlClicked = () => {
    this.state.onAerationControlClicked(
      this.state.blower,
      this.state.blower.blowerLabel,
    );
  };

  render() {
    let hasAerationReversingControl =
      this.state.blower.hasAerationReversingControl === true;
    let hasExhaustLVTemp = this.state.blower.hasExhaustTempSensor === true;
    let hasBiofilterLVTemp = this.state.blower.hasBiofilterTempSensor === true;
    let cardTitle = this.state.blower.blowerLabel.replace('Blower', 'Manifold');
    let hasDuctMisterControl = this.state.blower.hasMisterControl === true;
    return (
      <div className={this.state.zonesPerGroup === 3 ? 'span6' : 'span4'}>
        <div className='well'>
          {hasAerationReversingControl && (
            <div className='pull-right'>
              {this.blowerAerationOverrideLabel()}
              {this.blowerAerationDirectionLabel()}
            </div>
          )}
          {hasAerationReversingControl && (
            <div>
              <h3>{cardTitle}</h3>
              <button
                className='btn btn-info'
                onClick={this.handleAerationControlClicked}
              >
                Direction Control
              </button>
            </div>
          )}
          <br />
          <FacilityCardLayoutBlowerTemps
            blowerId={this.state.blower.blowerId}
            x600={this.state.x600}
            facilityConfig={this.state.facilityConfig}
            hasDuctMisterControl={hasDuctMisterControl}
            hasExhaustLVTemp={hasExhaustLVTemp}
            hasBiofilterLVTemp={hasBiofilterLVTemp}
          />
          {hasDuctMisterControl && (
            <span>Mister: {this.misterControlLabel()}</span>
          )}
        </div>
      </div>
    );
  }
}

class FacilityCardLayoutBiofilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x600: props.x600,
      facilityConfig: props.facilityConfig,
      biofilter: props.biofilter,
      zonesPerGroup: props.zonesPerGroup,
      group: props.group,
      onBiofilterBlowerControlClicked: props.onBiofilterBlowerControlClicked,
      onStartRotationClicked: props.onStartRotationClicked,
      onPumpClicked: props.onPumpClicked,
      hasDamperControl: props.biofilter.hasDamperControl === false ? false : true,
      turboModeEnabled: false
    };
  }

  blowerSpeed = () => {
    const { x600, biofilter } = this.state;
    let speed_value = 0;
    if (x600.get_biofilter_blower_run_value(biofilter.biofilterId)) {
      speed_value = x600.get_biofilter_blower_value_value(biofilter.biofilterId);
    }
    return <b>{speed_value}%</b>;
  };

  blowerOverrideLabel = (container_over_temp) => {
    let manual = this.state.x600.get_biofilter_blower_override_value(
      this.state.biofilter.biofilterId
    );
    if (!container_over_temp) {
      if (manual) {
        return <span className='label label-warning'>MANUAL</span>;
      } else {
        return <span className='label label-success'>AUTO</span>;
      }
    } else {
      return null;
    }
  };

  blowerControlLabel = (container_over_temp) => {
    let control = this.state.x600.get_biofilter_blower_control_value(
      this.state.biofilter.biofilterId,
    );
    if (!container_over_temp) {
      if (control) {
        return <span className='label label-success'>ON</span>;
      } else {
        return <span className='label label-warning'>OFF</span>;
      }
    } else {
      return null;
    }
  };

  containerOverTempLabel = (container_over_temp) => {
    if (container_over_temp) {
      return <span className='label label-warning'>HI-TEMP</span>;
    } else {
      return null;
    }
  };

  blowerFaultLabel = () => {
    let hasSpeedControl = this.state.biofilter.hasSpeedControl !== false;
    if (hasSpeedControl) {
      let fault = this.state.x600.get_biofilter_blower_fault_value(
        this.state.biofilter.biofilterId,
      );
      if (fault) {
        return <span className='label label-warning'>FAULT</span>;
      }
    }
  };

  blowerSpeedAndStatus = (running) => {
    if (this.state.biofilter.hasSpeedControl === false) {
      return (
        <div className='blower-display'>
          <strong>{running ? 'RUNNING' : 'STOPPED'}</strong>
        </div>
      );
    } else {
      return (
        <div className='blower-display'>
          VFD Speed: {this.blowerSpeed()} -{' '}
          <strong>{running ? 'RUNNING' : 'STOPPED'}</strong>
        </div>
      );
    }
  };

  handleBlowerControlClicked = () => {
    this.state.onBiofilterBlowerControlClicked(
      this.state.biofilter,
      this.state.biofilter.blowerLabel,
    );
  };

  biofilterPressureLabel = (biofilter) => {
    let biofilterId = biofilter.biofilterId;
    let pos_pressure_value = this.state.x600.get_biofilter_pos_pressure_value(biofilterId);
    let neg_pressure_value;
    let sign = '';
    if (biofilter.hasSuctionSensor) {
      neg_pressure_value = this.state.x600.get_biofilter_neg_pressure_value(biofilterId);
      console.log(neg_pressure_value)
      if (neg_pressure_value && neg_pressure_value > 0) {
        sign = '-'
      }
    }
    return (
      <React.Fragment>
        {pos_pressure_value !== undefined &&
          <div className='biofilter-pressure-display blower-display'>
            Positive Pressure:{' '}
            <b>
              {pos_pressure_value}
            </b>{' '}
            (in)
          </div>
        }
        {neg_pressure_value !== undefined &&
          <div className='biofilter-pressure-display blower-display'>
            Negative Pressure:{' '}
            <b>
              {sign}
              {neg_pressure_value}
            </b>{' '}
            (in)
          </div>
        }
      </React.Fragment>
    );
  };

  turboControlLabel = (hasTurboMode) => {
    let turboModeEnabled = this.state.turboModeEnabled;
    if (hasTurboMode) {
      turboModeEnabled = this.state.x600.get_turbo_run_value();
    }
    if (turboModeEnabled) {
      return <span className='label label-success'>ON</span>;
    } else {
      return <span className='label label-warning'>OFF</span>;
    }
  };

  extDoorStateLabel = (doorGroup) => {
    let doorIsClosedState = this.state.doorState;
    if (doorGroup) {
      doorIsClosedState = this.state.x600.get_external_door_switch_value(doorGroup.doorId) == 1 ? true : false;
    }
    if (doorIsClosedState) {
      return <span className='label label-success'>CLOSED</span>;
    } else {
      return <span className='label label-warning'>OPEN</span>;
    }
  };

  windowStateLabel = (windowGroup) => {
    let windowIsClosed = this.state.windowState;
    if (windowGroup) {
      windowIsClosed = this.state.x600.get_window_switch_value(windowGroup.windowId) == 1 ? true : false;
    }
    if (windowIsClosed) {
      return <span className='label label-success'>CLOSED</span>;
    } else {
      return <span className='label label-warning'>OPEN</span>;
    }
  };

  withManifoldInfo = () => {
    const biofilter = this.state.biofilter
    const hasDuctMisterControl = biofilter.hasMisterControl === true;
    const hasExhaustLVTemp = biofilter.hasExhaustTempSensor === true;
    const hasBiofilterLVTemp =
      biofilter.hasBiofilterTempSensor === true;
    const hasBlowerControl = biofilter.hasBlowerControl !== false;
    const running = this.state.x600.get_biofilter_blower_run_value(
      biofilter.biofilterId,
    );
    let groupDampers = this.state.group.groupDampers ? this.state.group.groupDampers : [];
    let hasTurboMode = this.state.facilityConfig.hasTurboMode
    let hasExternalDoors = this.state.group.groupBlower.hasExternalDoors;
    let hasWindows = this.state.group.groupBlower.hasWindows;
    let doorGroups = {};
    let windowGroup = {};
    if (hasExternalDoors) {
      doorGroups = this.state.group.groupExtDoors;
    }
    if (hasWindows) {
      windowGroup = this.state.group.groupWindows;
    }
    return (
      <div className='with-manifold-info'>
        <FacilityCardLayoutBlowerTemps
          blowerId={biofilter.biofilterId}
          x600={this.state.x600}
          facilityConfig={this.state.facilityConfig}
          hasDuctMisterControl={hasDuctMisterControl}
          hasExhaustLVTemp={hasExhaustLVTemp}
          hasBiofilterLVTemp={hasBiofilterLVTemp}
        />
        <div className='biofilter-status-items'>
          <div className='bio-label-group'>
            {hasTurboMode && (
              <div>
                Turbo Mode:{this.turboControlLabel(hasTurboMode)}
              </div>
            )}
            {hasWindows && windowGroup.map((group, index) => {
              return (
                <div>
                  {this.windowStatus(group)}
                </div>
              );
            })}
            {hasExternalDoors && doorGroups.map((group, index) => {
              return (
                <div>
                  {this.extDoorStatus(group)}
                </div>
              );
            })}
          </div>
          <div className='biodamper-status-group'>
            {hasBlowerControl && (
              <div className='biopressure-group'>
                {this.biofilterPressureLabel(biofilter)}
              </div>
            )}
            <div className='biodamper-group'>
              {groupDampers.map((group, index) => {
                return (
                  this.damperStatus(group)
                );
              })}
            </div>

          </div>
          {hasBlowerControl && (
            <div className='bioblower-status'>
              {this.blowerSpeedAndStatus(running)}
            </div>
          )}
        </div>
      </div>
    );
  };

  damperPosition = (damperId) => {
    let position = 0
    if (this.state.x600.get_biofilter_damper_position_value(damperId)) {
      position = this.state.x600.get_biofilter_damper_position_value(damperId);
    }
    let override = this.state.x600.get_biofilter_damper_override_value(
      damperId,
    );
    return (
      <div className='blower-display'>
        Damper {damperId} Position: <b>{position}%</b> -{' '}
        <strong>{override ? 'MANUAL' : 'AUTO'}</strong>
      </div>
    );
  };

  damperStatus = (group) => {
    let damperId = group.damperId;
    return (
      <div >
        {this.damperPosition(damperId)}
      </div>
    );
  };

  extDoorStatus = (group) => {
    let doorId = group.doorId;
    return (
      <div>
        External Door {doorId}:{this.extDoorStateLabel(group)}
      </div>
    );
  };

  windowStatus = (group) => {
    let windowId = group.windowId;
    return (
      <div>
        Window {windowId}:{this.windowStateLabel(group)}
      </div>
    );
  };

  render() {
    let running = this.state.x600.get_biofilter_blower_run_value(
      this.state.biofilter.biofilterId,
    );
    let hasBlowerControl = this.state.biofilter.hasBlowerControl !== false;
    let container_temp = this.state.x600.get_load_container_temp_value(
      this.state.biofilter.containerId,
    );
    let container_over_temp = false;
    if (container_temp) {
      container_over_temp =
        container_temp >= this.state.x600.settingsData['MaxContainerTemp'];
    }
    let blower_card_class = 'well';
    let estopActive = this.state.x600.get_estop_value();
    if (estopActive) {
      blower_card_class = blower_card_class + ' card-estop-active';
    };
    return (
      <div className='span12'>
        <div className={blower_card_class}>
          {hasBlowerControl && (
            <div className='pull-right'>
              {this.blowerOverrideLabel(container_over_temp)}
              {this.blowerControlLabel(container_over_temp)}
              {this.containerOverTempLabel(container_over_temp)}
              {this.blowerFaultLabel()}
              {estopActive && (
                <div className='pull-right'>
                  <span className='label label-important'>ESTOP ACTIVE</span>
                </div>
              )}
            </div>
          )}
          <h3>{this.state.biofilter.blowerLabel}</h3>
          {hasBlowerControl && (
            <div>
              <div>
                <button
                  className={running ? 'btn btn-success' : 'btn btn-danger'}
                  onClick={this.handleBlowerControlClicked}
                >
                  Blower Control
                </button>
              </div>
            </div>
          )}
          <br />
          {this.withManifoldInfo()}
        </div>
      </div>
    );
  }
}

class FacilityCardLayoutBlower extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x600: props.x600,
      facilityConfig: props.facilityConfig,
      blower: props.blower,
      zonesPerGroup: props.zonesPerGroup,
      groupPumps: props.groupPumps,
      onBlowerControlClicked: props.onBlowerControlClicked,
      onStartRotationClicked: props.onStartRotationClicked,
      onPumpClicked: props.onPumpClicked,
      tunnelDoorOpen: props.tunnelDoorOpen,
    };
  }

  blowerSpeed = () => {
    const { x600, blower } = this.state;
    let speed_value = 0;
    if (x600.get_blower_run_value(blower.blowerId)) {
      speed_value = x600.get_blower_value_value(blower.blowerId);
    }
    return <b>{speed_value}%</b>;
  };

  blowerOverrideLabel = (container_over_temp) => {
    let manual = this.state.x600.get_blower_override_value(
      this.state.blower.blowerId,
    );
    if (!container_over_temp) {
      if (manual) {
        return <span className='label label-warning'>MANUAL</span>;
      } else {
        return <span className='label label-success'>AUTO</span>;
      }
    } else {
      return null;
    }
  };

  blowerControlLabel = (container_over_temp) => {
    let control = this.state.x600.get_blower_control_value(
      this.state.blower.blowerId,
    );
    if (!container_over_temp) {
      if (control) {
        return <span className='label label-success'>ON</span>;
      } else {
        return <span className='label label-warning'>OFF</span>;
      }
    } else {
      return null;
    }
  };

  positionLabel = () => {
    let position = this.state.x600.get_headspace_damper_position_value(
      this.state.blower.blowerId,
    );
    if (position > 0) {
      return <span className='label label-success'>{position}%</span>;
    } else {
      return <span className='label label-warning'>OFF</span>;
    }
  };

  containerOverTempLabel = (container_over_temp) => {
    if (container_over_temp) {
      return <span className='label label-warning'>HI-TEMP</span>;
    } else {
      return null;
    }
  };

  blowerFaultLabel = () => {
    let hasSpeedControl = this.state.blower.hasSpeedControl !== false;
    if (hasSpeedControl) {
      let fault = this.state.x600.get_blower_fault_value(
        this.state.blower.blowerId,
      );
      if (fault) {
        return <span className='label label-warning'>FAULT</span>;
      }
    }
  };

  ductPressureLabel = () => {
    let hasAerationReversingControl =
      this.state.blower.hasAerationReversingControl === true;
    let blowerId = this.state.blower.blowerId;
    let pressure_value = this.state.x600.get_duct_pressureavg_value(blowerId);
    let sign = '';
    if (hasAerationReversingControl) {
      if (
        Number(this.state.x600.get_blower_revdamper_value(blowerId)) === 0 &&
        pressure_value > 0
      ) {
        sign = '-';
      }
    }
    if (pressure_value !== undefined) {
      return (
        <div className='duct-pressure-display'>
          Duct Pressure:{' '}
          <b>
            {sign}
            {pressure_value}
          </b>{' '}
          (in)
        </div>
      );
    }
  };

  DoorSwitchPositionIndicator = (blowerId) => {
    let tunnelDoorOpen = this.state.x600.get_tunnel_door_switch_value(blowerId);
    if (tunnelDoorOpen) {
      return <span className='label label-warning'>OPEN</span>;
    } else {
      return <span className='label label-success'>CLOSED</span>;
    }
  };

  tunnelDoorLabel = () => {
    let hasAerationReversingControl =
      this.state.blower.hasAerationReversingControl === true;
    let blowerId = this.state.blower.blowerId;
    let pressure_value = this.state.x600.get_duct_pressureavg_value(blowerId);
    let sign = '';
    if (hasAerationReversingControl) {
      if (
        Number(this.state.x600.get_blower_revdamper_value(blowerId)) === 0 &&
        pressure_value > 0
      ) {
        sign = '-';
      }
    }
    if (pressure_value !== undefined) {
      return (
        <div className='biofilter-status-items'>
          <span>
            Door Switch: {this.DoorSwitchPositionIndicator(blowerId)}
          </span>
        </div>
      );
    }
  };

  blowerSpeedAndStatus = (running) => {
    if (this.state.blower.hasSpeedControl === false) {
      return (
        <div className='blower-display'>
          <strong>{running ? 'RUNNING' : 'STOPPED'}</strong>
        </div>
      );
    } else {
      return (
        <div className='blower-display'>
          VFD Speed: {this.blowerSpeed()} -{' '}
          <strong>{running ? 'RUNNING' : 'STOPPED'}</strong>
        </div>
      );
    }
  };

  handleBlowerControlClicked = () => {
    this.state.onBlowerControlClicked(
      this.state.blower,
      this.state.blower.blowerLabel,
    );
  };

  handleBiofilterBlowerControlClicked = () => {
    this.state.onBiofilterBlowerControlClicked(
      this.state.blower,
      this.state.blower.blowerLabel,
    );
  };

  handleStartRotationClicked = (event) => {
    this.state.onStartRotationClicked(this.state.blower.drumId);
  };

  handleStopRotationClicked = (event) => {
    this.state.x600.set_drum_rotation_control_value(
      this.state.blower.drumId,
      false,
    );
  };

  toggleLogHeadSpaceTemp = () => {
    let drumId = this.state.blower.drumId;
    let control = this.state.x600.get_log_head_space_temp_value(drumId) ? 0 : 1;
    this.state.x600.set_log_head_space_temp_value(drumId, control);
  };

  logHeadSpaceTempLabel = () => {
    let drumId = this.state.blower.drumId;
    let control = this.state.x600.get_log_head_space_temp_value(drumId);
    if (drumId !== undefined) {
      if (control) {
        return (
          <button
            className='label label-success'
            onClick={this.toggleLogHeadSpaceTemp}
          >
            ON
          </button>
        );
      } else {
        return (
          <button
            className='label label-warning'
            onClick={this.toggleLogHeadSpaceTemp}
          >
            OFF
          </button>
        );
      }
    }
  };

  displayPumps = () => {
    let pumps = this.state.groupPumps;
    return pumps.map((pump, index) => {
      let pumpSpeed = Number(this.state.x600.get_pump_speed_value(pump.pumpId));
      if (pump.pumpId !== undefined) {
        if (pumpSpeed === 0) {
          return (
            <div>
              {pump.pumpLabel}:{' '}
              <button
                className='label label-warning'
                onClick={this.state.onPumpClicked.bind(this, pump)}
              >
                OFF{' '}
              </button>
            </div>
          );
        } else {
          return (
            <div>
              {pump.pumpLabel}:{' '}
              <button
                className='label label-success'
                onClick={this.state.onPumpClicked.bind(this, pump)}
              >
                Speed {pumpSpeed}
              </button>
            </div>
          );
        }
      }
      return null;
    });
  };

  misterControlLabel = () => {
    let control = this.state.x600.get_duct_mister_value(
      this.state.blower.blowerId,
    );
    if (control) {
      return <span className='label label-success'>ON</span>;
    } else {
      return <span className='label label-warning'>OFF</span>;
    }
  };

  withManifoldInfo = () => {
    const hasDuctMisterControl = this.state.blower.hasMisterControl === true;
    const hasExhaustLVTemp = this.state.blower.hasExhaustTempSensor === true;
    const hasBiofilterLVTemp =
      this.state.blower.hasBiofilterTempSensor === true;
    const hasBlowerControl = this.state.blower.hasBlowerControl !== false;
    const running = this.state.x600.get_blower_run_value(
      this.state.blower.blowerId,
    );
    return (
      <div className='with-manifold-info'>
        <FacilityCardLayoutBlowerTemps
          blowerId={this.state.blower.blowerId}
          x600={this.state.x600}
          facilityConfig={this.state.facilityConfig}
          hasDuctMisterControl={hasDuctMisterControl}
          hasExhaustLVTemp={hasExhaustLVTemp}
          hasBiofilterLVTemp={hasBiofilterLVTemp}
        />
        {hasDuctMisterControl && (
          <span className='pull-right'>
            Mister: {this.misterControlLabel()}
          </span>
        )}
        {hasBlowerControl && this.ductPressureLabel()}
        {hasBlowerControl && this.blowerSpeedAndStatus(running)}
      </div>
    );
  };

  withoutManifoldInfo = () => {
    const hasBlowerControl = this.state.blower.hasBlowerControl !== false;
    const hasTunnelDoor = this.state.blower.hasTunnelDoor !== false;
    const running = this.state.x600.get_blower_run_value(
      this.state.blower.blowerId,
    );
    return (
      <div>

        {hasTunnelDoor && this.tunnelDoorLabel()}

        {hasBlowerControl && this.ductPressureLabel()}

        {hasBlowerControl && this.blowerSpeedAndStatus(running)}
      </div>
    );
  };

  render() {
    let running = this.state.x600.get_blower_run_value(
      this.state.blower.blowerId,
    );
    let hasBlowerControl = this.state.blower.hasBlowerControl !== false;
    let hasDrumControl = this.state.blower.hasDrumControl
      ? this.state.blower.hasDrumControl
      : false;
    let hasLogHeadSpaceTempControl = this.state.blower
      .hasLogHeadSpaceTempControl
      ? this.state.blower.hasLogHeadSpaceTempControl
      : false;
    let hasPumpControl = this.state.blower.hasPumpControl
      ? this.state.blower.hasPumpControl
      : false;
    let showManifoldInfoOnBlowerCard = this.state.blower
      .showManifoldInfoOnBlowerCard
      ? this.state.blower.showManifoldInfoOnBlowerCard
      : false;
    let container_temp = this.state.x600.get_load_container_temp_value(
      this.state.blower.containerId,
    );
    let container_over_temp = false;
    if (container_temp) {
      container_over_temp =
        container_temp >= this.state.x600.settingsData['MaxContainerTemp'];
    }
    let blower_card_class = 'well';
    let estopActive = this.state.x600.get_estop_value();
    if (estopActive) {
      blower_card_class = blower_card_class + ' card-estop-active';
    };
    return (
      <div className={this.state.zonesPerGroup === 3 ? 'span6' : 'span4'}>
        <div className={blower_card_class}>
          {hasBlowerControl && (
            <div className='pull-right'>
              {this.blowerOverrideLabel(container_over_temp)}
              {this.blowerControlLabel(container_over_temp)}
              {this.positionLabel()}
              {this.containerOverTempLabel(container_over_temp)}
              {this.blowerFaultLabel()}
              {estopActive && (
                <div className='pull-right'>
                  <span className='label label-important'>ESTOP ACTIVE</span>
                </div>
              )}
            </div>
          )}
          <h3>{this.state.blower.blowerLabel}</h3>
          {hasBlowerControl && (
            <div>
              <div>
                <button
                  className={running ? 'btn btn-success' : 'btn btn-danger'}
                  onClick={this.handleBlowerControlClicked}
                >
                  Blower Control
                </button>
                {hasDrumControl && (
                  <DrumControl
                    onStartRotationClicked={this.handleStartRotationClicked}
                    onStopRotationClicked={this.handleStopRotationClicked}
                    drumId={this.state.blower.drumId}
                    x600={this.state.x600}
                  />
                )}
              </div>
              {hasLogHeadSpaceTempControl && (
                <span>Log Head Space Temp: {this.logHeadSpaceTempLabel()}</span>
              )}
            </div>
          )}
          <div className='pull-right'>
            {hasPumpControl && <div>{this.displayPumps()}</div>}
          </div>
          <br />
          {showManifoldInfoOnBlowerCard && this.withManifoldInfo()}
          {!showManifoldInfoOnBlowerCard && this.withoutManifoldInfo()}
        </div>
      </div>
    );
  }
}

class FacilityCardLayoutBlowerTemps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facilityConfig: props.facilityConfig,
      x600: props.x600,
      blowerId: props.blowerId,
      hasDuctMisterControl: props.hasDuctMisterControl,
      hasExhaustLVTemp: props.hasExhaustLVTemp,
      hasBiofilterLVTemp: props.hasBiofilterLVTemp,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  checkSensorAgeInAlarm = (sensor_prefix, probe_id) => {
    let sensorAge = this.state.x600.get_wireless_sensor_age_value(
      sensor_prefix,
      this.state.blowerId,
      probe_id,
    );
    let sensorAgeAlarm = this.state.x600.doesSettingExist(
      'WirelessSensorAgeAlarm',
    )
      ? this.state.x600.settingsData['WirelessSensorAgeAlarm'] * 60
      : 36000;
    if (sensorAge && sensorAge > sensorAgeAlarm) {
      return true;
    }
  };

  ductPremisterLVTemp = () => {
    const ambientTempReg = 'ambient' + this.state.blowerId + 'lvtemp';

    if (this.state.x600.doesIORegExist(ambientTempReg)) {
      if (this.checkSensorAgeInAlarm('ambient')) {
        return 'sensor age alarm';
      }
      return this.state.x600.get_duct_ambient_lvtemp_value(this.state.blowerId);
    } else {
      if (this.checkSensorAgeInAlarm('premister')) {
        return 'sensor age alarm';
      }
      return this.state.x600.get_duct_premister_lvtemp_value(
        this.state.blowerId,
      );
    }
  };

  blowerExhaustLVTemp = () => {
    if (this.checkSensorAgeInAlarm('exhaust')) {
      return 'sensor age alarm';
    }
    return this.state.x600.get_blower_exhaust_lvtemp_value(this.state.blowerId);
  };

  blowerBiofilterLVTemp = () => {
    const biofilterProbeIds = this.state.facilityConfig.biofilterProbeIds;
    if (biofilterProbeIds) {
      let tempValue = 0;
      let count = 0;
      let sensorsInAlarm = [];
      biofilterProbeIds.forEach((probeId, index) => {
        if (this.checkSensorAgeInAlarm('biofilter', probeId)) {
          sensorsInAlarm.push(probeId);
        } else {
          let probeTemp = Number(
            this.state.x600.get_blower_biofilter_lvtemp_value(
              this.state.blowerId,
              probeId,
            ),
          );
          if (!isNaN(probeTemp) && probeTemp > 0) {
            tempValue += probeTemp;
            count += 1;
          }
        }
      });
      if (sensorsInAlarm.length === biofilterProbeIds.length) {
        return 'sensor age alarm';
      } else if (tempValue > 0 && count > 0) {
        return tempValue / count;
      } else {
        return 0;
      }
    } else {
      if (this.checkSensorAgeInAlarm('biofilter')) {
        return 'sensor age alarm';
      }
      return this.state.x600.get_blower_biofilter_lvtemp_value(
        this.state.blowerId,
      );
    }
  };

  renderHeadings = () => {
    return (
      <thead>
        <tr>
          {this.state.hasDuctMisterControl && <th width='50%'>Ambient Temp</th>}
          {this.state.hasExhaustLVTemp && <th width='50%'>Exhaust Temp</th>}
          {this.state.hasBiofilterLVTemp && <th width='50%'>Biofilter Temp</th>}
        </tr>
      </thead>
    );
  };

  renderValue = (value) => {
    if (value === 'sensor age alarm') {
      return (
        <td className='reference-temp'>
          <span className='wireless-sensor-error'>
            <b>---</b> {this.state.facilityConfig.temperatureUnit}
          </span>
        </td>
      );
    } else if (isNaN(value)) {
      return (
        <td className='reference-temp'>
          <b>---</b> {this.state.facilityConfig.temperatureUnit}
        </td>
      );
    } else {
      return (
        <td className='reference-temp'>
          <b>{Math.round(value)}</b> {this.state.facilityConfig.temperatureUnit}
        </td>
      );
    }
  };

  renderBody = () => {
    return (
      <tbody>
        <tr>
          {this.state.hasDuctMisterControl &&
            this.renderValue(this.ductPremisterLVTemp())}
          {this.state.hasExhaustLVTemp &&
            this.renderValue(this.blowerExhaustLVTemp())}
          {this.state.hasBiofilterLVTemp &&
            this.renderValue(this.blowerBiofilterLVTemp())}
        </tr>
      </tbody>
    );
  };

  render() {
    return (
      <div>
        <table className='table-condensed table-temps'>
          {this.renderHeadings()}
          {this.renderBody()}
        </table>
      </div>
    );
  }
}

class FacilityCardLayoutZoneTemps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facilityConfig: props.facilityConfig,
      zoneProbeIds: props.facilityConfig.zoneProbeIds,
      x600: props.x600,
      zoneId: props.zoneId,
      setpointSettingName: props.setpointSettingName,
    };
  }

  getTempLabel = (id) => {
    const label = 'zoneTemp' + id + 'Label';
    if (this.props.zone[label]) {
      return this.props.zone[label];
    } else if (this.props.facilityConfig[label]) {
      return this.props.facilityConfig[label];
    } else {
      return 'Temp ' + id;
    }
  };

  zoneProbeIds = () => {
    if (this.props.zone.zoneProbeIds) {
      return this.props.zone.zoneProbeIds;
    } else {
      return this.state.zoneProbeIds;
    }
  };

  renderHeadings = () => {
    const probeIds = this.zoneProbeIds();
    const tempA = this.getTempLabel('A');
    const tempB = this.getTempLabel('B');
    const tempC = this.getTempLabel('C');
    const tempD = this.getTempLabel('D');
    if (probeIds.length === 0) {
      return (
        <thead>
          <tr></tr>
        </thead>
      );
    } else if (probeIds.length === 1) {
      let regime = this.state.x600.get_zone_regime_value(this.state.zoneId);
      if (regime !== undefined) {
        return (
          <thead>
            <tr>
              <th width='34%'>Temperature</th>
              <th width='33%'>Setpoint</th>
              <th width='33%'>Regime</th>
            </tr>
          </thead>
        );
      } else {
        return (
          <thead>
            <tr>
              <th width='50%'>Temperature</th>
              <th width='50%'>Setpoint</th>
            </tr>
          </thead>
        );
      }
    } else if (probeIds.length === 2) {
      return (
        <thead>
          <tr>
            <th width='25%'>{tempA}</th>
            <th width='25%'>{tempB}</th>
            <th width='25%'>Average</th>
            <th width='25%'>Setpoint</th>
          </tr>
        </thead>
      );
    } else if (probeIds.length === 3) {
      return (
        <thead>
          <tr style={{ fontSize: '14px' }}>
            <th width='20%'>{tempA}</th>
            <th width='20%'>{tempB}</th>
            <th width='20%'>{tempC}</th>
            <th width='20%'>Average</th>
            <th width='20%'>Setpoint</th>
          </tr>
        </thead>
      );
    } else {
      return (
        <thead>
          <tr style={{ fontSize: '13px', paddingRight: '0px' }}>
            <th width='16.66%'>{tempA}</th>
            <th width='16.66%'>{tempB}</th>
            <th width='16.66%'>{tempC}</th>
            <th width='16.66%'>{tempD}</th>
            <th width='16.66%'>Average</th>
            <th width='16.66%'>Setpoint</th>
          </tr>
        </thead>
      );
    }
  };

  renderValue = (value, sensorAge) => {
    let sensorAgeAlarm = this.state.x600.doesSettingExist(
      'WirelessSensorAgeAlarm',
    )
      ? this.state.x600.settingsData['WirelessSensorAgeAlarm'] * 60
      : 36000;
    let probeIds = this.zoneProbeIds();
    let allProbesOffline = probeIds.every(
      (probe, index) => this.getSensorAge(index) >= 65535,
    );
    let allProbesInAlarm = probeIds.every(
      (probe, index) => this.getSensorAge(index) >= sensorAgeAlarm,
    );
    let tempSpanClassName = '';
    if (allProbesOffline) {
      tempSpanClassName = 'wireless-sensor-error';
    } else if (sensorAge >= sensorAgeAlarm || allProbesInAlarm) {
      tempSpanClassName = 'wireless-sensor-warning';
    }
    let displayValue;
    if (isNaN(value) || allProbesOffline) {
      displayValue = '---';
    } else {
      displayValue = Math.round(value);
    }
    return (
      <td className='normal-temp'>
        <span className={tempSpanClassName}>
          <b>{displayValue}</b> {this.state.facilityConfig.temperatureUnit}
        </span>
      </td>
    );
  };

  getTempValues = () => {
    const probeIds = this.zoneProbeIds();
    return probeIds.map((probeId, index) => {
      return this.state.x600.get_zone_lvtemp_value(this.state.zoneId, probeId);
    });
  };

  tempValueByIndex = (valIndex) => {
    const temp_values = this.getTempValues();
    return temp_values[valIndex];
  };

  getSensorAge = (probeIndex) => {
    return this.state.x600.get_wireless_sensor_age_value(
      'zone',
      this.state.zoneId,
      this.state.zoneProbeIds[probeIndex],
    );
  };

  renderSetpoint = (value) => {
    let displayValue;
    if (isNaN(value)) {
      displayValue = '---';
    } else {
      displayValue = Math.round(value);
    }
    return (
      <td className='normal-temp'>
        <span>
          <b>{displayValue}</b> {this.state.facilityConfig.temperatureUnit}
        </span>
      </td>
    );
  };

  averageValues(arr) {
    let valid_values = [];
    arr.forEach((valIndex) => {
      let sensorAge = this.getSensorAge(valIndex);
      if (
        isNaN(this.tempValueByIndex(valIndex)) === false &&
        Number(this.tempValueByIndex(valIndex)) > 0
      ) {
        if (sensorAge < 65535) {
          valid_values.push(Number(this.tempValueByIndex(valIndex)));
        }
      }
    });
    return valid_values.reduce((a, b) => a + b, 0) / valid_values.length;
  }

  renderBody = () => {
    let spSettingName = this.state.setpointSettingName;
    let temp_setpoint = this.state.x600.settingsData[spSettingName];
    let regime = this.state.x600.get_zone_regime_value(this.state.zoneId);
    let regimeName = regime;
    if (regime !== undefined && this.state.facilityConfig.regimeNames) {
      regimeName = this.state.facilityConfig.regimeNames[regime];
    }
    if (spSettingName === 'RegimeXTempSetPoint') {
      spSettingName = spSettingName.replace('X', String(regime));
      temp_setpoint = this.state.x600.settingsData[spSettingName];
    }

    let probeIds = this.zoneProbeIds();
    if (probeIds.length === 0) {
      return <tbody></tbody>;
    } else if (probeIds.length === 1) {
      return (
        <tbody>
          <tr>
            {this.renderValue(this.tempValueByIndex(0), this.getSensorAge(0))}
            {this.renderSetpoint(temp_setpoint)}
            <td className='normal-temp'>
              <b>{regime !== undefined && regimeName}</b>
            </td>
          </tr>
        </tbody>
      );
    } else if (probeIds.length === 2) {
      let temp_avg = this.averageValues([0, 1]);
      return (
        <tbody>
          <tr>
            {this.renderValue(this.tempValueByIndex(0), this.getSensorAge(0))}
            {this.renderValue(this.tempValueByIndex(1), this.getSensorAge(1))}
            {this.renderValue(temp_avg)}
            {this.renderSetpoint(temp_setpoint)}
          </tr>
        </tbody>
      );
    } else if (probeIds.length === 3) {
      let temp_avg = this.averageValues([0, 1, 2]);
      return (
        <tbody>
          <tr>
            {this.renderValue(this.tempValueByIndex(0), this.getSensorAge(0))}
            {this.renderValue(this.tempValueByIndex(1), this.getSensorAge(1))}
            {this.renderValue(this.tempValueByIndex(2), this.getSensorAge(2))}
            {this.renderValue(temp_avg)}
            {this.renderSetpoint(temp_setpoint)}
          </tr>
        </tbody>
      );
    } else {
      let temp_avg = this.averageValues([0, 1, 2, 3]);
      return (
        <tbody>
          <tr style={{ fontSize: '13px', paddingRight: '0px' }}>
            {this.renderValue(this.tempValueByIndex(0), this.getSensorAge(0))}
            {this.renderValue(this.tempValueByIndex(1), this.getSensorAge(1))}
            {this.renderValue(this.tempValueByIndex(2), this.getSensorAge(2))}
            {this.renderValue(this.tempValueByIndex(3), this.getSensorAge(3))}
            {this.renderValue(temp_avg)}
            {this.renderSetpoint(temp_setpoint)}
          </tr>
        </tbody>
      );
    }
  };

  render() {
    return (
      <div>
        <table className='table-condensed table-temps'>
          {this.renderHeadings()}
          {this.renderBody()}
        </table>
      </div>
    );
  }
}

class FacilityCardLayoutZone extends Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromProps(props);
    this.getHasIrrigationControl = this.getHasIrrigationControl.bind(this);
  }

  getStateFromProps(props) {
    return {
      facilityConfig: props.facilityConfig,
      x600: props.x600,
      zone: props.zone,
      zoneId: props.zone.zoneId,
      group: props.group,
      damperId: props.x600.getZoneDamperId(
        props.zone.zoneId,
        props.facilityConfig,
      ),
      zonesPerGroup: props.zonesPerGroup,
      hasDamperControl: props.zone.hasDamperControl === false ? false : true,
      hasIrrigationControl: this.getHasIrrigationControl(props),
      setpointSettingName: props.zone.setpointSettingName,
      zoneLabel: props.zone.zoneLabel
        ? props.zone.zoneLabel
        : props.zone.zoneId.replace(/^[0]+/g, ''),
      onZoneControlClicked: props.onZoneControlClicked,
      onViewGraphClicked: props.onViewGraphClicked,
    };
  }

  getHasIrrigationControl = (props) => {
    let irrigationControl = false;
    if (props.zone.hasIrrigationControl) {
      irrigationControl = true
    } else if (props.facilityConfig.hasIrrigationControl) {
      irrigationControl = true
    }
    return irrigationControl
  }

  componentWillReceiveProps(nextProps) {
    let new_state = this.getStateFromProps(nextProps);
    this.setState(new_state);
  }

  handleBatchControlClicked = () => {
    this.state.onZoneControlClicked(this.state.zone, this.state.group);
  };

  handleViewGraphClicked = () => {
    this.state.onViewGraphClicked(this.state.zoneId);
  };

  modeLabel = () => {
    let override = this.state.x600.get_damper_override_value(
      this.state.damperId,
    );
    if (override) {
      return <span className='label label-warning'>MANUAL</span>;
    } else {
      return <span className='label label-success'>AUTO</span>;
    }
  };

  positionLabel = () => {
    let position = this.state.x600.get_damper_position_value(
      this.state.damperId,
    );
    if (position > 0) {
      return <span className='label label-success'>{position}%</span>;
    } else {
      return <span className='label label-warning'>OFF</span>;
    }
  };

  zoneDamperState = (damper) => {
    let damperControlState = this.state.x600.get_io_control_value(
      damper.ioName,
    );
    damperControlState = damperControlState === 1 ? 1 : 0;

    let found = damper.ioTranslations.find(function (element) {
      return element.value === damperControlState;
    });

    return found.translation;
  };

  damperStatus = () => {
    if (this.state.zone.ioDisplays) {
      const zone_dampers = this.state.zone.ioDisplays.filter(
        (display) => display.ioType === 'Damper',
      );
      const dampersList = zone_dampers.map((damper) => (
        <div key={damper.ioName} className='pull-right'>
          <span className='label label-inverse'>{damper.ioLabel}</span>{' '}
          <span className='label label-damper-status'>
            {this.zoneDamperState(damper)}
          </span>
        </div>
      ));
      return dampersList;
    } else {
      if (this.state.hasDamperControl) {
        return (
          <div className='pull-right'>
            {this.modeLabel()}
            {this.positionLabel()}
          </div>
        );
      }
    }
  };

  renderIrrigationControl = () => {
    const irrigationControl = this.state.x600.get_irrigation_control_value(this.state.zoneId)
    if (irrigationControl) {
      return (
        <strong>
          Irrigation:
          <span className='label label-success label-irrigation'>
            ON
          </span>
        </strong>
      );
    } else {
      return (
        <strong>
          Irrigation:
          <span className='label label-warning label-irrigation'>
            OFF
          </span>
        </strong>
      );
    }
  }

  renderBatchAge = () => {
    const moveTo = this.state.x600.get_zone_moveto_value(this.state.zoneId);
    const moveToLabel = this.state.x600.getZoneLabel(
      moveTo,
      this.state.facilityConfig,
    );
    const movedFrom = this.state.x600.get_zone_movedfrom_value(
      this.state.zoneId,
    );
    const movedFromLabel = this.state.x600.getZoneLabel(
      movedFrom,
      this.state.facilityConfig,
    );
    const batchMovingToThisZone = this.state.x600.batch_moving_to_this_zone(
      this.state.zoneId,
    );

    if (batchMovingToThisZone) {
      return (
        <div className='batch-age' colSpan='4'>
          Batch is moving from {movedFromLabel}
        </div>
      );
    } else if (Number(moveTo) > 0) {
      return (
        <div className='batch-age' colSpan='4'>
          Batch is moving to {moveToLabel}
        </div>
      );
    } else {
      return (
        <div className='batch-age' colSpan='4'>
          Batch <b>{this.state.x600.get_zone_batch_title(this.state.zoneId)}</b>{' '}
          started{' '}
          <b id='zone14age'>
            {this.state.x600.get_zone_batch_age_in_days(this.state.zoneId)}
          </b>{' '}
          days ago
        </div>
      );
    }
  };

  zoneCardClassName = () => {
    let classname = 'well'
    if (this.state.x600.get_estop_value()) {
      classname = classname + ' card-estop-active';
    }
    if (this.state.x600.get_load_zone_active_value(this.state.zoneId)) {
      classname = classname + ' load-zone-active';
    } else if (this.state.x600.get_zone_online_value(this.state.zoneId)) {
      classname = classname + ' active-zone';
    } else {
      if (this.state.x600.get_zone_batch_title(this.state.zoneId) !== '') {
        classname = classname + ' paused-zone';
      } else {
        classname = classname + ' inactive-zone';
      }
    }
    return classname;
  };

  pfrpVarCount = (units, time) => {
    if (units === 'days') {
      time = time / 1440;
    } else if (units === 'hours') {
      time = time / 60;
    }
    time = Math.floor(time * 10) / 10;
    if (isNaN(time)) {
      time = 0;
    }
    return time;
  };

  pfrpVarDuration = (value) => {
    if (typeof value === 'string') {
      return this.state.x600.settingsData[value] * 24;
    } else {
      return value;
    }
  };

  pfrpVarUnitsDisplay = (units) => {
    if (units === 'days') {
      return 'DAYS';
    } else if (units === 'hours') {
      return 'HRS';
    } else {
      return 'MINS';
    }
  };

  pfrpTime = () => {
    const { x600 } = this.state;
    const time = x600.get_zone_pfrptime_value(this.state.zoneId);
    const config = this.state.facilityConfig.pfrpVarConfig;
    let units = 'hours';
    let unitsDisplay = this.pfrpVarUnitsDisplay(units);
    let count = this.pfrpVarCount(units, time);
    let duration = this.pfrpVarDuration(72);
    if (config) {
      units = config.pfrpUnits;
      unitsDisplay = this.pfrpVarUnitsDisplay(units);
      count = this.pfrpVarCount(units, time);
      duration = this.pfrpVarDuration(config.pfrpDuration);
    }

    if (count < duration) {
      return (
        <span>
          <strong>
            PFRP: {count} {unitsDisplay}
          </strong>
        </span>
      );
    } else {
      return (
        <span>
          <strong>PFRP: MET</strong>
        </span>
      );
    }
  };

  render() {
    const { hasIrrigationControl } = this.state;
    const zone_online = this.state.x600.get_zone_online_value(
      this.state.zoneId,
    );
    const hasAssociatedBatch =
      this.state.x600.get_zone_batch_title(this.state.zoneId) !== '';
    const displayPFRPTime = this.state.facilityConfig.displayPFRPTime === true;
    const moveTo = this.state.x600.get_zone_moveto_value(this.state.zoneId);
    const batchMovingToThisZone = this.state.x600.batch_moving_to_this_zone(
      this.state.zoneId,
    );
    const showBatchControl = moveTo === '00' && !batchMovingToThisZone;
    let estopActive = this.state.x600.get_estop_value();
    return (
      <div className={this.state.zonesPerGroup === 3 ? 'span6' : 'span4'}>
        <div className={this.zoneCardClassName()}>
          {estopActive && (
            <div className='pull-right'>
              <span className='label label-important'>ESTOP ACTIVE</span>
            </div>
          )}
          {this.damperStatus()}
          <h3>Zone {this.state.zoneLabel}</h3>
          {showBatchControl && (
            <button
              className={zone_online ? 'btn btn-primary' : 'btn btn-inverse'}
              onClick={this.handleBatchControlClicked}
            >
              Batch Control
            </button>
          )}
          {!showBatchControl && (
            <div className='loading-container'>
              <div className='dot-flashing'></div>
            </div>
          )}
          {hasAssociatedBatch && showBatchControl && (
            <button
              className='btn btn-default'
              onClick={this.handleViewGraphClicked}
            >
              View Graph
            </button>
          )}
          <div className='zone-temps-table-container'>
            {zone_online && (
              <FacilityCardLayoutZoneTemps
                zone={this.state.zone}
                zoneId={this.state.zoneId}
                x600={this.state.x600}
                facilityConfig={this.state.facilityConfig}
                setpointSettingName={this.state.setpointSettingName}
              />
            )}
          </div>
          <div className='pfrp-row'>
            {displayPFRPTime &&
              <div className='pull-left'>
                {this.pfrpTime()}
              </div>
            }
            {hasIrrigationControl &&
              <div className='pull-right'>
                {this.renderIrrigationControl()}
              </div>
            }
          </div>
          {hasAssociatedBatch && this.renderBatchAge()}
        </div>
      </div>
    );
  }
}

class FacilityCardLayoutGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facilityConfig: props.facilityConfig,
      x600: props.x600,
      group: props.group,
      zonesPerGroup: props.group.groupZones.length,
      onAerationControlClicked: props.onAerationControlClicked,
      onBlowerControlClicked: props.onBlowerControlClicked,
      onBiofilterBlowerControlClicked: props.onBiofilterBlowerControlClicked,
      onZoneControlClicked: props.onZoneControlClicked,
      onViewGraphClicked: props.onViewGraphClicked,
      onStartRotationClicked: props.onStartRotationClicked,
      onPumpClicked: props.onPumpClicked,
    };
  }

  facilityLayoutZones = () => {
    return this.state.group.groupZones.map((zone, index) => {
      return (
        <FacilityCardLayoutZone
          onZoneControlClicked={this.state.onZoneControlClicked}
          onViewGraphClicked={this.state.onViewGraphClicked}
          key={index}
          zone={zone}
          x600={this.state.x600}
          group={this.state.group}
          facilityConfig={this.state.facilityConfig}
          zonesPerGroup={this.state.zonesPerGroup}
        />
      );
    });
  };

  render() {
    let blower = this.state.group.groupBlower;
    let secondaryBlower = this.state.group.secondaryBlower;
    let hasAerationReversingControl =
      blower && blower.hasAerationReversingControl === true;
    let biofilter = null;
    if (this.state.group.groupBlower.isBiofilter) {
      biofilter = blower;
      blower = null;
    }
    return (
      <div className='row'>
        {this.state.facilityConfig.hasBiofilterCard && biofilter && (
          <FacilityCardLayoutBiofilter
            biofilter={biofilter}
            x600={this.state.x600}
            onBiofilterBlowerControlClicked={this.state.onBiofilterBlowerControlClicked}
            zonesPerGroup={this.state.zonesPerGroup}
            facilityConfig={this.state.facilityConfig}
            group={this.state.group}
            onPumpClicked={this.state.onPumpClicked}
          />
        )}
        {blower && (
          <FacilityCardLayoutBlower
            blower={blower}
            x600={this.state.x600}
            onBlowerControlClicked={this.state.onBlowerControlClicked}
            zonesPerGroup={this.state.zonesPerGroup}
            facilityConfig={this.state.facilityConfig}
            groupPumps={this.state.group.groupPumps}
            onPumpClicked={this.state.onPumpClicked}
          />
        )}
        {secondaryBlower && (
          <FacilityCardLayoutBlower
            blower={secondaryBlower}
            x600={this.state.x600}
            onBlowerControlClicked={this.state.onBlowerControlClicked}
            zonesPerGroup={this.state.zonesPerGroup}
            facilityConfig={this.state.facilityConfig}
            onStartRotationClicked={this.state.onStartRotationClicked}
          />
        )}
        {hasAerationReversingControl && (
          <FacilityCardLayoutManifold
            blower={blower}
            x600={this.state.x600}
            onAerationControlClicked={this.state.onAerationControlClicked}
            zonesPerGroup={this.state.zonesPerGroup}
            facilityConfig={this.state.facilityConfig}
          />
        )}
        {this.facilityLayoutZones()}
      </div>
    );
  }
}

class FacilityCardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facilityConfig: props.facilityConfig,
      x600: props.x600,
      showAerationModal: false,
      showBlowerModal: false,
      showBiofilterBlowerModal: false,
      selectedBlowerId: null,
      selectedBlowerHasSpeedControl: false,
      selectedBlowerHasMisterControl: false,
      selectedBlowerHasCustomCycleControl: false,
      selectedBlowerHasManifoldInfo: false,
      selectedBlowerHasHeadspaceDamper: false,
      selectedBlowerHasAerationReversingControl: false,
      selectedBlowerHasTurboMode: false,
      showZoneModal: false,
      selectedZoneId: null,
      selectedZoneLabel: null,
      selectedZoneDamperId: null,
      selectedZoneHasDamperControl: false,
      selectedZoneHasIrrigationControl: false,
      showPumpModal: false,
      selectedPump: null,
      showViewGraphModal: false,
      showBatchModal: false,
      showDrumRotationConfirmationModal: false,
      zoneGroupFilter: null,
      refreshDelay: 1000,
      hasLoadZoneFeature: props.facilityConfig.hasLoadZoneFeature
        ? props.facilityConfig.hasLoadZoneFeature
        : false,
      remount: new Date().getTime(),
    };
  }

  componentDidMount() {
    this.refreshData(true);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  refreshData = (later) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (later === true) {
      this.timer = setTimeout(
        () => this.state.x600.refreshData(this.handleNewData.bind(this)),
        this.state.refreshDelay,
      );
    } else {
      this.state.x600.refreshData(this.handleNewData.bind(this));
    }
  };

  handleNewData = () => {
    this.refreshData(true);
    this.setState({
      refreshDelay: 3000,
      remount: new Date().getTime(),
    });
  };

  handleAerationControlClicked = (blower, blowerLabel) => {
    this.setState({
      selectedBlowerId: blower.blowerId,
      selectedBlowerLabel: blowerLabel,
      showAerationModal: true,
      selectedBlowerHasMisterControl: blower.hasMisterControl,
    });
  };

  handleAerationModalClosed = () => {
    this.setState({ showAerationModal: false });
    this.refreshData(false);
  };

  handleBlowerControlClicked = (blower, blowerLabel) => {
    this.setState({
      selectedBlowerId: blower.blowerId,
      selectedBlowerLabel: blowerLabel,
      selectedBlowerHasSpeedControl: blower.hasSpeedControl,
      selectedBlowerHasMisterControl: blower.hasMisterControl,
      selectedBlowerHasCustomCycleControl: blower.hasCustomCycleControl,
      selectedBlowerHasManifoldInfo: blower.showManifoldInfoOnBlowerCard,
      selectedBlowerHasHeadspaceDamper: blower.hasHeadspaceDamper,
      showBlowerModal: true,
    });
  };

  handleBlowerModalClosed = () => {
    this.setState({ showBlowerModal: false });
    this.refreshData(false);
  };

  handleBiofilterBlowerControlClicked = (blower, blowerLabel) => {
    this.setState({
      selectedBlowerId: blower.biofilterId,
      selectedBlowerLabel: blowerLabel,
      selectedBlowerHasSpeedControl: blower.hasSpeedControl,
      selectedBlowerHasMisterControl: blower.hasMisterControl,
      selectedBlowerHasTurboMode: blower.hasTurboMode,
      selectedBlowerHasManifoldInfo: blower.showManifoldInfoOnBlowerCard,
      showBiofilterBlowerModal: true,
    });
  }

  handleBiofilterBlowerModalClosed = () => {
    this.setState({ showBiofilterBlowerModal: false });
    this.refreshData(false);
  }

  handlePumpClicked = (pump) => {
    this.setState({
      selectedPump: pump,
      showPumpModal: true,
    });
  };

  handlePumpModalClosed = () => {
    this.setState({ showPumpModal: false });
    this.refreshData(false);
  };

  handleZoneControlClicked = (zone, group) => {
    const { x600, facilityConfig } = this.state;
    let damperId = x600.getZoneDamperId(zone.zoneId, facilityConfig);
    this.setState({
      selectedZoneId: zone.zoneId,
      selectedZoneLabel: zone.zoneLabel,
      selectedZoneDamperId: damperId,
      selectedZoneHasDamperControl: zone.hasDamperControl,
      selectedZoneHasIrrigationControl: zone.hasIrrigationControl,
      showZoneModal: true,
      selectedBlowerId: group.groupBlower.blowerId,
      selectedBlowerHasAerationReversingControl:
        group.groupBlower.hasAerationReversingControl === true,
    });
  };

  handleZoneModalClosed = () => {
    this.setState({ showZoneModal: false });
    this.refreshData(false);
  };

  handleViewGraphClicked = (zoneId) => {
    this.setState({
      selectedZoneId: zoneId,
      showViewGraphModal: true,
    });
  };

  handleViewGraphModalClosed = () => {
    this.setState({ showViewGraphModal: false });
  };

  handleStartBatchClicked = (zoneId) => {
    if (this.state.facilityConfig.hasBatchCappedFeature) {
      this.state.x600.set_zone_capped_value(zoneId, 0);
    }
    this.setState({
      selectedZoneId: zoneId,
      showBatchModal: true,
      isNewBatch: true,
      isEndingBatch: false,
    });
  };

  handleMoveBatchClicked = (zoneId) => {
    this.setState({
      selectedZoneId: zoneId,
      showBatchModal: true,
      isNewBatch: false,
      isEndingBatch: false,
    });
  };

  handleEndBatchClicked = (zoneId) => {
    this.setState({
      selectedZoneId: zoneId,
      showBatchModal: true,
      isNewBatch: false,
      isEndingBatch: true,
    });
  };

  handleBatchModalClosed = () => {
    this.setState({ showBatchModal: false });
    this.state.x600.loadZoneStartupData();
  };

  handleStartRotationClicked = (drumId) => {
    this.setState({
      selectedZoneId: drumId,
      showDrumRotationConfirmationModal: true,
    });
  };

  handleDrumRotationConfirmationModalClosed = () => {
    this.setState({ showDrumRotationConfirmationModal: false });
  };

  handleShowProcessingIndicator = (showProcessingIndicator = false) => {
    if (!this.state.showBatchModal) {
      this.state.x600.totalZones.forEach((zoneId, index) => {
        let zoneMoveTo = this.state.x600.get_zone_moveto_value(zoneId);
        let zoneMoving = zoneMoveTo !== '00';
        zoneMoving =
          zoneMoving && !this.state.x600.get_zone_online_value(zoneMoveTo);

        let settingFileName = this.state.x600.get_zone_reset_value(zoneId);
        settingFileName =
          settingFileName && this.state.x600.get_zone_online_value(zoneId);

        if (zoneMoving || settingFileName) {
          // showProcessingIndicator = true;
          showProcessingIndicator = false;
          return;
        }
      });
    }
    showProcessingIndicator = false;
    return showProcessingIndicator;
  };

  facilityLayoutGroups = () => {
    const qstring = qs.parse(this.props.location.search.slice(1), {
      strictNullHandling: true,
    });
    let groupFilter = this.state.zoneGroupFilter;
    if (qstring.moduleFilter) {
      groupFilter = qstring.moduleFilter;
    }
    let zoneGroups = this.state.facilityConfig.zoneGroups;
    if (groupFilter) {
      if (this.state.facilityConfig.hasModuleSelect) {
        zoneGroups = this.state.facilityConfig.moduleGroups.filter(
          (group) => group.moduleGroup === groupFilter,
        );
      } else {
        zoneGroups = this.state.facilityConfig.zoneGroups.filter(
          (group) => group.moduleGroup === groupFilter,
        );
      }
    }
    if (!zoneGroups) {
      return (
        <div></div>
      )
    }
    return (
      <div>
        {zoneGroups.map((group, index) => {
          return (
            <FacilityCardLayoutGroup
              key={index}
              group={group}
              facilityConfig={this.state.facilityConfig}
              x600={this.state.x600}
              onAerationControlClicked={this.handleAerationControlClicked}
              onBlowerControlClicked={this.handleBlowerControlClicked}
              onBiofilterBlowerControlClicked={this.handleBiofilterBlowerControlClicked}
              onZoneControlClicked={this.handleZoneControlClicked}
              onViewGraphClicked={this.handleViewGraphClicked}
              onStartRotationClicked={this.handleStartRotationClicked}
              onPumpClicked={this.handlePumpClicked}
            />
          );
        })}
      </div>
    );
  };

  render() {
    let zoneGroups = this.state.facilityConfig.hasModuleSelect
      ? this.state.facilityConfig.moduleGroups
      : this.state.facilityConfig.zoneGroups;
    let groupsWithBlowers = [];
    if (zoneGroups) {
      groupsWithBlowers = zoneGroups.filter((group) => {
        return group.groupBlower;
      });
    }
    let blowerId = this.state.selectedBlowerId;
    let containerId = null;
    if (blowerId) {
      let blowerGroup = zoneGroups.find(function (group) {
        return group.groupBlower.blowerId === blowerId;
      });
      let biofilterGroup = zoneGroups.find(function (group) {
        return group.groupBlower.biofilterId === blowerId;
      });
      if (blowerGroup) {
        containerId = blowerGroup.groupBlower.containerId;
      } else {
        containerId = biofilterGroup.groupBlower.containerId;
      }
    }
    let showProcessingIndicator = this.handleShowProcessingIndicator();
    let turboModeEnabled = this.state.turboModeEnabled;
    let hasTurboMode = false;
    if (this.state.facilityConfig.hasTurboMode) {
      turboModeEnabled = this.state.x600.get_turbo_run_value();
      hasTurboMode = this.state.selectedBlowerHasTurboMode
    }
    return (
      <div className='FacilityCardLayout'>
        {this.facilityLayoutGroups()}
        {this.state.showBiofilterBlowerModal &&
          <BiofilterBlowerModal
            show={this.state.showBiofilterBlowerModal}
            biofilter_id={blowerId}
            containerId={containerId}
            x600={this.state.x600}
            onClose={this.handleBiofilterBlowerModalClosed}
            blower_label={this.state.selectedBlowerLabel}
            hasSpeedControl={this.state.selectedBlowerHasSpeedControl}
            hasTurboMode={hasTurboMode}
            facilityConfig={this.state.facilityConfig}
          />
        }
        {groupsWithBlowers.length > 0 && (
          <BlowerModal
            show={this.state.showBlowerModal}
            blower_id={blowerId}
            containerId={containerId}
            x600={this.state.x600}
            onClose={this.handleBlowerModalClosed}
            blower_label={this.state.selectedBlowerLabel}
            hasSpeedControl={this.state.selectedBlowerHasSpeedControl}
            hasCustomCycleControl={
              this.state.selectedBlowerHasCustomCycleControl
            }
            hasManifoldInfo={this.state.selectedBlowerHasManifoldInfo}
            hasHeadspaceDamper={this.state.selectedBlowerHasHeadspaceDamper}
            hasMisterControl={this.state.selectedBlowerHasMisterControl}
            facilityConfig={this.state.facilityConfig}
          />
        )}
        {groupsWithBlowers.length > 0 && (
          <AerationModal
            show={this.state.showAerationModal}
            blower_id={this.state.selectedBlowerId}
            x600={this.state.x600}
            onClose={this.handleAerationModalClosed}
            blower_label={this.state.selectedBlowerLabel}
            hasMisterControl={this.state.selectedBlowerHasMisterControl}
            facilityConfig={this.state.facilityConfig}
          />
        )}
        <ZoneModal
          show={this.state.showZoneModal}
          zone_label={this.state.selectedZoneLabel}
          zone_id={this.state.selectedZoneId}
          zoneGroups={zoneGroups}
          damper_id={this.state.selectedZoneDamperId}
          x600={this.state.x600}
          onClose={this.handleZoneModalClosed}
          onViewGraphClicked={this.handleViewGraphClicked}
          onStartBatchClicked={this.handleStartBatchClicked}
          onMoveBatchClicked={this.handleMoveBatchClicked}
          onEndBatchClicked={this.handleEndBatchClicked}
          hasDamperControl={this.state.selectedZoneHasDamperControl}
          hasIrrigationControl={this.state.selectedZoneHasIrrigationControl}
          facilityConfig={this.state.facilityConfig}
          hasLoadZoneFeature={this.state.hasLoadZoneFeature}
          blower_id={this.state.selectedBlowerId}
          blowerHasAerationReversingControl={
            this.state.selectedBlowerHasAerationReversingControl
          }
        />
        <ViewGraphModal
          show={this.state.showViewGraphModal}
          zone_label={this.state.selectedZoneLabel}
          zone_id={this.state.selectedZoneId}
          x600={this.state.x600}
          facilityConfig={this.state.facilityConfig}
          onClose={this.handleViewGraphModalClosed}
        />
        <BatchModal
          show={this.state.showBatchModal}
          zone_label={this.state.selectedZoneLabel}
          zone_id={this.state.selectedZoneId}
          zoneGroups={zoneGroups}
          x600={this.state.x600}
          facilityConfig={this.state.facilityConfig}
          onClose={this.handleBatchModalClosed}
          isNewBatch={this.state.isNewBatch}
          isEndingBatch={this.state.isEndingBatch}
          blower_id={this.state.selectedBlowerId}
          damper_id={this.state.selectedZoneDamperId}
          blowerHasAerationReversingControl={
            this.state.selectedBlowerHasAerationReversingControl
          }
        />
        <DrumRotationConfirmationModal
          show={this.state.showDrumRotationConfirmationModal}
          onClose={this.handleDrumRotationConfirmationModalClosed}
          x600={this.state.x600}
          drumId={this.state.selectedZoneId}
        />
        <PumpModal
          show={this.state.showPumpModal}
          pump={this.state.selectedPump}
          x600={this.state.x600}
          onClose={this.handlePumpModalClosed}
        />
        <ProcessingIndicator
          show={showProcessingIndicator}
          onClose={this.handleProcessingIndicatorClosed}
        />
      </div>
    );
  }
}

export default withRouter(FacilityCardLayout);
