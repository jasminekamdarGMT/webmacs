import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

function ModalHeader(props) {
  let zoneControlTitle = "Batch";
  let startDateStr = "";
  if (props.zoneStartDate) {
    startDateStr = new Intl.DateTimeFormat('en-US').format(props.zoneStartDate);
  }
  if (props.batchLabel.length > 0) {
    zoneControlTitle = "Batch " + props.batchLabel
  } else if (props.zone && props.zone.zoneLabel && props.zone.zoneLabel.length > 0) {
    zoneControlTitle = "Zone " + props.zone.zoneLabel
  }
  return (
    <div className="modal-header">
      <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
      <h3 id="zone-control-title">{zoneControlTitle} - Started {startDateStr}</h3>
    </div>
  )
}

class ModalBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      facilityConfig: props.facilityConfig,
      zone: props.zone
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      facilityConfig: nextProps.facilityConfig,
      zone: nextProps.zone
    });
  }

  getZoneProbeIds = (zone) => {
    return zone && zone.zoneProbeIds ?
      zone.zoneProbeIds :
      this.state.facilityConfig.zoneProbeIds;
  }

  tempProbeLabel = (probeId, zone, defaultLabel) => {
    let label = "zoneTemp" + probeId + "Label";
    if (zone && zone[label]) {
      return zone[label];
    } else if (this.state.facilityConfig[label]) {
      return this.state.facilityConfig[label];
    } else if (defaultLabel !== undefined) {
      return defaultLabel;
    }
  }

  batchFileHeaderName = (name, zone) => {
    name = name.trim()
    let headerName = name.replace("Temperature", "Temp");
    let probeIds = this.getZoneProbeIds(zone);
    switch (name) {
      case 'Temperature A':
        if (probeIds.length > 1) {
          headerName = this.tempProbeLabel('A', zone, headerName);
        } else {
          headerName = 'Temperature';
        }
        break;
      case 'Temperature B':
        if (probeIds.length > 1) {
          headerName = this.tempProbeLabel('B', zone, headerName);
        } else {
          headerName = 'N/A';
        }
        break;
      case 'Temperature C':
        if (probeIds.length > 2) {
          headerName = this.tempProbeLabel('C', zone, headerName);
        } else {
          headerName = 'N/A';
        }
        break;
      case 'Temperature D':
        if (probeIds.length > 3) {
          headerName = this.tempProbeLabel('D', zone, headerName);
        } else {
          headerName = 'N/A';
        }
        break;
      case 'Damper':
        let logFileHeaders = this.state.facilityConfig.logFileHeaders;
        let customHeader = logFileHeaders ? logFileHeaders[name] : false;
        headerName = customHeader ? customHeader : name;
        break;
      default:
        return headerName;
    }
    return headerName;
  }

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
  }

  renderHeaders(titles) {
    let zone = this.props.zone;
    let probeIds = this.getZoneProbeIds(zone);
    let excludedCols = [];
    return titles.map((title, index) => {
      let showVal = true;
      title = this.batchFileHeaderName(title, zone)
      if (!title === "Temperature") {
        if (title.startsWith("Temperature") || title.startsWith("Temp")) {
          if (!probeIds.includes(title.slice(-1))) {
            showVal = false;
          }
        } else if (title === 'N/A') {
          showVal = false;
        }
      }
      if (showVal) {
        return (
          <th key={title}>{title}</th>
        )
      }
      return null;
    });
  }

  renderHead = () => {
    if (this.state.data.length > 0) {
      return (
        <thead>
          <tr>
            {this.renderHeaders(this.state.data[0])}
          </tr>
        </thead>
      )
    }
  }

  getZoneGroups(facilityConfig) {
    const zoneGroups = facilityConfig.hasModuleSelect ?
      facilityConfig.moduleGroups :
      facilityConfig.zoneGroups;

    return zoneGroups;
  }

  getZoneLabel(zoneId) {
    const zoneGroups = this.getZoneGroups(this.state.facilityConfig);

    let zoneLabel = zoneId.replace(/^[0]+/g, "");
    zoneGroups.forEach(group => {
      group.groupZones.forEach(groupZone => {
        if (String(groupZone.zoneId).padStart(2, 0) === String(zoneId).padStart(2, 0)) {
          if (groupZone.zoneLabel) {
            zoneLabel = groupZone.zoneLabel;
          }
        }
      });
    });
    return zoneLabel;
  }

  renderValues(row, row_index, pfrpIndex) {
    let zoneIndex = null;
    let aerationDirIndex = null;
    let temperatureIndices = [];
    let excludedCols = [];
    let probeIds = this.getZoneProbeIds(this.state.zone);
    let headerRow = this.state.data[0];
    if (headerRow) {
      headerRow.forEach((col, i) => {
        if (col.match(/Temperature|Temp/)) {
          temperatureIndices.push(i);
        }
        if (col.startsWith("Temperature") || col.startsWith("Temp")) {
          if (!probeIds.includes(col.slice(-1))) {
            excludedCols.push(i)
          }
        }
      });
      zoneIndex = headerRow.indexOf('Zone');
      aerationDirIndex = headerRow.indexOf('Aeration Direction');
    }
    return row.map((value, index) => {
      if (pfrpIndex >= 0 && pfrpIndex === index) {
        const config = this.state.facilityConfig.pfrpVarConfig;
        let pfrpMet = value >= 4320
        let units = 'hours';
        let count = this.pfrpVarCount(units, value);
        if (config) {
          units = config.pfrpUnits;
          count = this.pfrpVarCount(units, value);
        }
        value = pfrpMet ? 'PFRP Met' : count;
      }
      if (zoneIndex && zoneIndex === index) {
        value = this.getZoneLabel(value);
      }
      if (aerationDirIndex && aerationDirIndex === index) {
        value = value > 0 ? 'Positive' : 'Negative';
      }
      if (temperatureIndices.includes(index)) {
        if (value < 0) {
          value = 0;
        }
      }

      if (!excludedCols.includes(index)) {
        return (
          <td key={[row_index, index]}>{value}</td>
        )
      }
      return null;
    });
  }

  renderRows = () => {
    let pfrpIndex = null;
    let pfrpStart = null;
    let pfrpEnd = null;
    let headerRow = this.state.data[0];
    if (headerRow) {
      let trimmedHeaders = headerRow.map(str => str.trim());
      pfrpIndex = trimmedHeaders.indexOf('PFRP Time');
    }
    let rows = this.state.data.slice(1, this.state.data.length - 1);
    if (pfrpIndex >= 0) {
      rows.reduceRight(function (prev, row, index) {
        if (Number(row[pfrpIndex]) >= 4320) {
          pfrpEnd = index;
        }
        if (!pfrpStart && Number(row[pfrpIndex]) === 0) {
          pfrpStart = index + 1;
        }
        return null;
      }, []);
    }
    return rows.map((row, index) => {
      let highlight = "";
      if (pfrpIndex >= 0) {
        if (index >= pfrpStart && index <= pfrpEnd) {
          highlight = "palegreen";
        }
      }
      return (
        <tr key={index} style={{ backgroundColor: highlight }}>
          {this.renderValues(row, index, pfrpIndex)}
        </tr>
      )
    });
  }

  render() {
    return (
      <div className="modal-body">
        <table className="table table-bordered">
          {this.renderHead()}
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

class ViewLogFileModal extends Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromProps(props);
  }

  getStateFromProps(props) {
    return {
      x600: props.x600,
      facilityConfig: props.facilityConfig,
      zone_id: props.zone_id ? props.zone_id : props.x600.get_zone_id_by_filename(props.filename),
      filename: props.filename ? props.filename : props.x600.get_zone_filename(props.zone_id),
      batchLabel: props.batch_title,
      zoneStartDate: "",
      show: props.show,
      data: [],
      onClose: props.onClose
    };
  }

  componentWillReceiveProps(nextProps) {
    let new_state = this.getStateFromProps(nextProps);
    if (this.state.show === false && new_state !== this.state) {
      this.setState(new_state);
    }
  }

  close = () => {
    this.setState({ show: false });
    this.state.onClose();
  }

  loadBatchFile = () => {
    this.state.x600.loadBatchFile(
      this.state.filename,
      this.handleBatchFileLoaded,
      true
    );
  }

  getZone = (zoneIdOrLabel) => {
    let zoneGroups = this.state.facilityConfig.hasModuleSelect ?
      this.state.facilityConfig.moduleGroups :
      this.state.facilityConfig.zoneGroups;

    let zone;
    if (zoneGroups) {
      zoneGroups.forEach(grp => {
        grp.groupZones.find(zn => {
          let parsedZnId = Number.parseInt(zn.zoneId, 10);
          let parsedStateZnId = Number.parseInt(this.state.zone_id, 10);
          if (parsedZnId === parsedStateZnId) {
            zone = zn;
          } else if (this.state.zone_id && this.state.zone_id === zn.zoneLabel) {
            zone = zn;
          } else if (zoneIdOrLabel) {
            let parsedZoneIdOrLabel = Number.parseInt(zoneIdOrLabel, 10);
            if (parsedZoneIdOrLabel === parsedZnId || zoneIdOrLabel === zn.zoneLabel) {
              zone = zn;
            }
          }
          return null;
        })
      });
    }
    return zone;
  }

  getUnit(name) {
    if (name.includes("Damper")) {
      return '(%)';
    } else if (name.includes("Speed")) {
      return '(%)';
    } else if (name.includes("Pressure")) {
      return '(In)';
    } else if (name.includes("Temperature")) {
      return "(" + this.state.facilityConfig.temperatureUnit + ")";
    } else {
      return '';
    }
  }

  handleBatchFileLoaded = (batchFileData, batchFileName, batchZoneId) => {
    let newStartDate = null;
    let zoneId = null;
    if (this.state.filename) {
      newStartDate = this.state.x600.parseDateFromFilename(this.state.filename);
      zoneId = this.state.x600.get_zone_id_by_filename(this.state.filename);
      if (!zoneId) {
        zoneId = batchZoneId;
      }
    } else {
      newStartDate = this.state.x600.get_zone_start_date(this.state.zone_id);
      let zoneIdOrLabel;
      if (this.state.zone_id === undefined) {
        let batchFileZoneCol = batchFileData[0].indexOf('Zone')
        if (batchFileZoneCol !== -1) {
          zoneIdOrLabel = batchFileData[batchFileData.length - 2][batchFileZoneCol]
        }
      }
      zoneId = this.getZone(zoneIdOrLabel);
    }
    this.setState({
      data: batchFileData,
      zoneStartDate: newStartDate,
      zone_id: zoneId
    });
  }


  render() {
    let zone = this.getZone(this.state.zone_id);
    return (
      <Modal className="ViewLogModal" show={this.state.show} onHide={this.close} onShow={this.loadBatchFile}>
        <ModalHeader
          batchLabel={this.state.batchLabel}
          zoneStartDate={this.state.zoneStartDate}
          onCloseClicked={this.close}
          zone={zone} />
        <ModalBody
          data={this.state.data}
          facilityConfig={this.state.facilityConfig}
          zone={zone} />
      </Modal>
    )
  }
}

export default ViewLogFileModal;
