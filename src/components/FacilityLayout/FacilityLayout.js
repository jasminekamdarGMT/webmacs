import React, { Component } from 'react';
import ZoneModal from '../ZoneModal/ZoneModal';
import BlowerModal from '../BlowerModal/BlowerModal';
import ViewGraphModal from '../ViewGraphModal/ViewGraphModal';
import FacilityLayoutPump from './FacilityLayoutPump';
import PumpModal from '../PumpModal/PumpModal';
import './FacilityLayout.css';

class FacilityLayoutBlower extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x600: props.x600,
            blower: props.blower,
            blower_label: props.blower_id.replace(/^[0]+/g,""),
            blower_id: props.blower_id,
            zoneCount: props.zoneCount,
            onBlowerClicked: props.onBlowerClicked
        };

        this.blowerPressure = this.blowerPressure.bind(this);
        this.blowerSpeed = this.blowerSpeed.bind(this);
        this.blowerControl = this.blowerControl.bind(this);
        this.handleBlowerClicked = this.handleBlowerClicked.bind(this);
    }

    blowerPressure () {
        let pressure_value = this.state.x600.get_duct_pressure_value(this.state.blower_id);
        if (pressure_value !== undefined) {
            return (
                <div>Pressure: <span>{pressure_value}</span> in</div>
            )
        } else {
            return null;
        }
    }

    blowerSpeed () {
        let speed_value = this.state.x600.get_blower_speed_value(this.state.blower_id);
        return (
            <div>Speed: <span>{speed_value}</span> %</div>
        )
    }

    blowerControl () {
        let manual = this.state.x600.get_blower_override_value(this.state.blower_id);
        return (
            <div>Control: <span>{manual ? "Manual" : "Auto"}</span></div>
        )
    }

    blowerState () {
        let fault = this.state.x600.get_blower_fault_value(this.state.blower_id);
        let running = this.state.x600.get_blower_run_value(this.state.blower_id);
        let label = "OFF";
        let color = "black";
        if (fault) {
            label = "FAULT";
            color = "red";
        } else if (running) {
            label = "ON";
            color = "green";
        }
        let style = { color: color }
        return (
            <span className="state" style={style}>{label}</span>
        )
    }

    blowerPipe = () => {
        if (this.state.zoneCount > 1) {
            return (
                <div className='pipe'></div>
            )
        } else {
            return (
                <div className='pipe' style={{ width: 220 }}></div>
            )
        }
    }

    handleBlowerClicked () {
        this.state.onBlowerClicked(this.state.blower);
    }

    render () {
        return (
            <div className='FacilityLayoutBlower'>
                <br />
				<div className='blowerValues' onClick={this.handleBlowerClicked}>
                    {this.blowerPressure()}
                    {this.blowerSpeed()}
                    {this.blowerControl()}
				</div>
				<div className='blowerImage' onClick={this.handleBlowerClicked}>
                    {this.blowerState()}
                    <div className="blowerText">BLOWER {this.state.blower_label}</div>
                </div>
				{this.blowerPipe()}
            </div>
        );
    }
}

class FacilityLayoutZone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            probe_ids: props.probe_ids,
            x600: props.x600,
            temp_units: 'F',
            zone: props.zone,
            zone_label: props.zone.zoneId.replace(/^[0]+/g,""),
            zone_id: props.zone.zoneId,
            damper_id: props.zone.damperId || props.zone.zoneId,
            hasDamperControl: props.zone.hasDamperControl === false ? false : true,
            handleZoneClick: props.onZoneClick
        };

        this.probeTemps = this.probeTemps.bind(this);
        this.zoneRegime = this.zoneRegime.bind(this);
        this.zoneDamper = this.zoneDamper.bind(this);
        this.zoneBox = this.zoneBox.bind(this);
        this.handleZoneClick = this.handleZoneClick.bind(this);
        this.handleDamperClick = this.handleDamperClick.bind(this);
    }

    handleZoneClick () {
        this.state.handleZoneClick(this.state.zone);
    }

    handleDamperClick () {
        this.state.handleZoneClick(this.state.zone);
    }

    probeTemps() {
        return this.state.probe_ids.map((probe_id, index) => {
            let data_name = 'zone'+this.state.zone_id+'p'+probe_id+'lvtemp';
            let temp_value = this.state.x600.get_zone_lvtemp_value(this.state.zone_id, probe_id);
            return (
                <p key={data_name}>
                    <span>{temp_value}</span>°{this.state.temp_units}
                </p>
            )
        });
    }

    zoneRegime() {
        let regime_value = this.state.x600.get_zone_regime_value(this.state.zone_id);
        return (
            <p>
                REG #<span>{regime_value}</span>
            </p>
        )
    }

    zoneDamper() {
        if (this.state.hasDamperControl === true) {
            let override = this.state.x600.get_damper_override_value(this.state.damper_id);
            let position = this.state.x600.get_damper_position_value(this.state.damper_id);
            let style = override ? { backgroundColor: 'orange' } : { backgroundColor: 'white' }
            return (
                <div className='damperCircle' style={style} onClick={this.handleDamperClick}>
                    <p className='damper'><span>{position}</span>%</p>
                </div>
            )
        } else {
            return null;
        }
    }

    zoneAge () {
        return (
            <p>
                <span>{this.state.x600.get_zone_batch_age_in_days(this.state.zone_id)}</span> DAYS
            </p>
        )
    }

    zoneBox () {
        let zone_online = this.state.x600.get_zone_online_value(this.state.zone_id);
        let zone_style = zone_online ? { backgroundColor: 'green' } : { backgroundColor: 'grey' }
        if (zone_online) {
            return (
                <div className='zoneBox' style={zone_style} onClick={this.handleZoneClick}>
                    {this.probeTemps()}
                    {this.zoneRegime()}
                    {this.zoneAge()}
                </div>
            )
        } else {
            return (
                <div className='zoneBox' style={zone_style}  onClick={this.handleZoneClick}>
                </div>
            )
        }
    }

    render () {
        let zone_style = { 'background-color': 'grey' }
        let zone_online = this.state.x600.get_zone_online_value(this.state.zone_id);
        if (zone_online) {
            zone_style['background-color'] = 'green';
        }
        return (
            <div className="FacilityLayoutZone">
                <p id="zone1name">ZONE {this.state.zone_label}</p>
                {this.zoneBox()}
                <div className='zonepipe'></div>
                {this.zoneDamper()}
            </div>
        );
    }
}

class FacilityLayoutGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facilityConfig:  props.facilityConfig,
            x600: props.x600,
            group: props.group,
            handleZoneClick: props.onZoneClick,
            handleBlowerClick: props.onBlowerClick,
            handlePumpClick: props.onPumpClick
        };

        this.facilityLayoutBlower = this.facilityLayoutBlower.bind(this);
        this.facilityLayoutZones = this.facilityLayoutZones.bind(this);
        this.handleZoneClick = this.handleZoneClick.bind(this);
    }

    handleZoneClick(zone_id) {
        this.state.handleZoneClick(zone_id);
    }

    facilityLayoutBlower () {
        let blower = this.state.group.groupBlower;
        return (
            <FacilityLayoutBlower blower={blower} blower_id={blower.blowerId}  x600={this.state.x600}
                zoneCount={this.state.group.groupZones.length} onBlowerClicked={this.state.handleBlowerClick}/>
        );
    }

    facilityLayoutZones () {
        return this.state.group.groupZones.map((zone, index) => {
            return (
                <FacilityLayoutZone onZoneClick={this.handleZoneClick} key={index} zone={zone}
                    probe_ids={this.state.facilityConfig.zoneProbeIds} x600={this.state.x600} />
            )
        });
    }

    facilityLayoutPumps = () => {
        if (this.state.group.groupPumps) {
            return this.state.group.groupPumps.map((pump, index) => {
                return (
                    <FacilityLayoutPump key={index} pump={pump} onClick={this.state.handlePumpClick}
                        x600={this.state.x600} />
                )
            });
        }
    }

    render () {
        return (
            <div className='FacilityLayoutGroup'>
                {this.facilityLayoutBlower()}
                {this.facilityLayoutZones()}
                {this.facilityLayoutPumps()}
            </div>
        );
    }
}

class FacilityLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facilityConfig: props.facilityConfig,
            x600: props.x600,
            showZoneModal: false,
            showBlowerModal: false,
            showViewGraphModal: false,
            selectedZoneId: null,
            selectedZoneHasDamperControl: false,
            showPumpModal: false,
            selectedPump: null,
            selectedBlowerId: null,
            selectedBlowerHasSpeedControl: false,
            selectedBlowerHasCustomCycleControl: false
        };

        this.refreshData = this.refreshData.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
        this.handleZoneClick = this.handleZoneClick.bind(this);
        this.handleZoneModalClosed = this.handleZoneModalClosed.bind(this);
        this.handleBlowerClick = this.handleBlowerClick.bind(this);
        this.handleBlowerModalClosed = this.handleBlowerModalClosed.bind(this);
        this.facilityLayoutGroups = this.facilityLayoutGroups.bind(this);
        this.handleViewGraphClicked = this.handleViewGraphClicked.bind(this);
        this.handleViewGraphModalClosed = this.handleViewGraphModalClosed.bind(this);
    }

    handleZoneClick(zone) {
        this.setState({
            selectedZoneId: zone.zoneId,
            selectedZoneHasDamperControl: zone.hasDamperControl,
            showZoneModal: true
        });
    }

    handleZoneModalClosed () {
        this.setState({ showZoneModal: false });
        this.refreshData(false);
    }

    handleViewGraphClicked (zone_id) {
        this.setState({
            selectedZoneId: zone_id,
            showViewGraphModal: true
        });
    }

    handleBlowerClick (blower) {
        this.setState({
            selectedBlowerId: blower.blowerId,
            selectedBlowerHasSpeedControl: blower.hasSpeedControl,
            selectedBlowerHasCustomCycleControl: blower.hasCustomCycleControl,
            showBlowerModal: true,
        });
    }

    handleBlowerModalClosed () {
        this.setState({ showBlowerModal: false });
        this.refreshData(false);
    }

    handlePumpClick = (pump) => {
        this.setState({
            selectedPump: pump,
            showPumpModal: true
        });
    }

    handlePumpModalClosed = () => {
        this.setState({ showPumpModal: false });
        this.refreshData(false);
    }

    handleViewGraphModalClosed () {
        this.setState({ showViewGraphModal: false });
    }

    componentDidMount() {
        this.refreshData(false);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    refreshData(later) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (later === true) {
            this.timer = setTimeout(() => this.state.x600.refreshData(this.handleNewData.bind(this)), 3000);
        } else {
            this.state.x600.refreshData(this.handleNewData.bind(this));
        }
    }

    handleNewData() {
        this.forceUpdate();
        this.refreshData(true);
    }

    facilityLayoutGroups () {
        return this.state.facilityConfig.zoneGroups.map((group, index) => {
            return (
                <FacilityLayoutGroup key={index} group={group} facilityConfig={this.state.facilityConfig} x600={this.state.x600}
                    onZoneClick={this.handleZoneClick} onBlowerClick={this.handleBlowerClick} onPumpClick={this.handlePumpClick} />
            )
        });
    }

    render() {
        return (
            <div className="FacilityLayout">
                {this.facilityLayoutGroups()}
                <ZoneModal
                    show={this.state.showZoneModal}
                    zone_id={this.state.selectedZoneId}
                    x600={this.state.x600}
                    onClose={this.handleZoneModalClosed}
                    facilityConfig={this.state.facilityConfig}
                    onViewGraphClicked={this.handleViewGraphClicked}
                    hasDamperControl={this.state.selectedZoneHasDamperControl} />
                <BlowerModal
                    show={this.state.showBlowerModal}
                    blower_id={this.state.selectedBlowerId}
                    x600={this.state.x600}
                    onClose={this.handleBlowerModalClosed}
                    hasSpeedControl={this.state.selectedBlowerHasSpeedControl}
                    hasCustomCycleControl={this.state.selectedBlowerHasCustomCycleControl}
                    facilityConfig={this.state.facilityConfig} />
                <ViewGraphModal
                    show={this.state.showViewGraphModal}
                    zone_id={this.state.selectedZoneId}
                    x600={this.state.x600}
                    facilityConfig={this.state.facilityConfig}
                    onClose={this.handleViewGraphModalClosed} />
                <PumpModal
                    show={this.state.showPumpModal}
                    pump={this.state.selectedPump}
                    x600={this.state.x600}
                    onClose={this.handlePumpModalClosed} />
            </div>
        );
    }
}

export default FacilityLayout;
