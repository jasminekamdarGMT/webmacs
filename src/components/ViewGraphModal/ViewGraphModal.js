import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { XYPlot, FlexibleWidthXYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, Highlight, Crosshair, AreaSeries} from 'react-vis';
import DiscreteColorLegend from '../../../node_modules/react-vis/dist/legends/discrete-color-legend';
import './ViewGraphModal.css';

const tickLabelDateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day:'numeric' });
const tooltipDateFormat = new Intl.DateTimeFormat('en-US', { month: 'numeric', day:'numeric', year: 'numeric' });
const tooltipTimeFormat = new Intl.DateTimeFormat('en-US', { month: 'numeric', day:'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

function ModalHeader (props) {
  let zoneControlTitle = "Batch";
  let startDateStr = "";
  if (props.zoneStartDate) {
    startDateStr = new Intl.DateTimeFormat('en-US').format(props.zoneStartDate);
  }
  if (props.batchLabel.length > 0) {
    zoneControlTitle = "Batch " + props.batchLabel
  } else if (props.zone && props.zone.zoneLabel && props.zone.zoneLabel.length > 0) {
    zoneControlTitle = "Zone " + props.zone.zoneLabel
  } else if (props.zoneLabel.length > 0) {
    zoneControlTitle = "Zone " + props.zoneLabel
  }
  return (
    <div className="modal-header">
	    <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
	    <h3 id="zone-control-title">{zoneControlTitle} - Started {startDateStr}</h3>
		</div>
  )
}

function ModalFooter (props) {
  return (
    <div className="modal-footer">
      <button className="btn pull-left" style={{marginRight: '10px'}} onClick={props.onResetZoomClicked}>Reset Zoom</button>
      {props.largeDataset && props.largeDatasetMinSize > 0 &&
        <span className="graph-modal-note pull-left">
          Because of the size of this dataset, displayed values are daily averages.
        </span>
      }
      {props.largeDataset && props.largeDatasetMinSize < 1 &&
        <span className="graph-modal-note pull-left">
          Displayed values are daily averages.
        </span>
      }
      <button className="btn" onClick={props.onCloseClicked}>Close</button>
      <button className="btn btn-primary" onClick={props.saveGraph}>Print / Save</button>
    </div>
  )
}

class ViewGraphModal extends Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromProps(props);

    this.close = this.close.bind(this);
    this.loadBatchFile = this.loadBatchFile.bind(this)
    this.handleBatchFileLoaded = this.handleBatchFileLoaded.bind(this);
    this.getUnit = this.getUnit.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.saveGraph = this.saveGraph.bind(this);
  }

  displayReferenceTemp = () => {
    return this.state.facilityConfig.graphConfig ?
           this.state.facilityConfig.graphConfig.displayReferenceTempOnGraph === true :
           false;
  }

  graphPDF () {
    const {lastDrawLocation, legendItems, totalTicksX, horizontalTicks, crosshairValues, printWidth, printHeight} = this.state;
    const minBodyHeight = printHeight + 50;
    return (
      <div id="graphToSave" className="modal-body" style={{minHeight: minBodyHeight}} >
        <XYPlot
          xDomain={
            lastDrawLocation && [
              lastDrawLocation.left,
              lastDrawLocation.right
            ]
          }
          yDomain={
            lastDrawLocation && [
              lastDrawLocation.bottom,
              lastDrawLocation.top
            ]
          }
          width={printWidth}
          height={printHeight}
          margin={{left: 40, right: 10, top: 10, bottom: 55}}
        >
          <HorizontalGridLines />
          <VerticalGridLines />
          {this.displayPFRPDataSet()}
          {this.displayDataSets()}
          {this.displayReferenceTemp() &&
           this.referenceTempLine()}
          <XAxis
            tickTotal={totalTicksX}
            tickFormat={this.renderHorizontalTickLabel}
            tickValues={horizontalTicks}
            tickLabelAngle={-45}
            style={{ticks: {fontSize: "10px"}}}
          />
          <YAxis />
          <Highlight
            onBrushEnd={area => this.setState({lastDrawLocation: area})}
            onDrag={area => {
              this.setState({
                lastDrawLocation: {
                  bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                  left: lastDrawLocation.left - (area.right - area.left),
                  right: lastDrawLocation.right - (area.right - area.left),
                  top: lastDrawLocation.top + (area.top - area.bottom)
                }
              });
            }}
          />
          {crosshairValues && <Crosshair values={crosshairValues}>
            {this.renderCrosshairValues()}
          </Crosshair>}
        </XYPlot>
        <DiscreteColorLegend
          orientation="horizontal"
          width={printWidth}
          onItemClick={this._clickHandler}
          items={legendItems}
        />
      </div>
    )
  }

  getBatchTitleFromFilename = (filename) => {
    let sections = filename.split('_');
    let batch_title = '';
    if (sections.length >= 5) {
      batch_title = sections[4];
      batch_title = batch_title.slice(0,batch_title.length - 4);
    }
    return batch_title;
  }

  saveGraph () {
    import('html2canvas').then(html2canvas => {
      import('jspdf').then(jsPDF => {
        let startDateStr = "";
        if (this.state.zoneStartDate) {
          startDateStr = new Intl.DateTimeFormat('en-US').format(this.state.zoneStartDate);
        }
        let zoneLabel = this.state.zoneLabel ? this.state.zoneLabel : this.getBatchTitleFromFilename(this.state.filename);
        let titleStr = "Zone "+zoneLabel+" - Started "+startDateStr;
        const graphToSave = document.getElementById('graphToSave');
        html2canvas(graphToSave).then((canvas) => {
          let filename = this.state.filename.slice(0,-4);
          let context = canvas.getContext('2d');
          context.scale(2,2);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l','pt');
          pdf.setFontSize(16);
          pdf.text(titleStr, 28, 50);
          pdf.addImage(imgData, 'PNG', 15, 80, this.state.printWidth, this.state.printHeight);
          pdf.save(filename + ".pdf");
        });
      });
    });
  }

  getStateFromProps (props) {
    return {
      x600: props.x600,
      facilityConfig: props.facilityConfig,
      zone_id: props.zone_id ? props.zone_id : props.x600.get_zone_id_by_filename(props.filename),
      filename: props.filename ? props.filename : props.x600.get_zone_filename(props.zone_id),
      zoneLabel: props.zone_id ? props.zone_id.replace(/^[0]+/g,"") : "",
      batchLabel: props.batch_title ? props.batch_title : props.x600.get_zone_batch_title(props.zone_id),
      zoneStartDate: "",
      show: props.show,
      dataSets: [],
      horizontalTicks: [],
      horizontalLabelTicks: [],
      largeDataset: false,
      onClose: props.onClose,
      lastDrawLocation: null,
      legendItems: [],
      totalTicksX: 0,
      printWidth: 815,
      printHeight: 512
    };
  }

  componentWillReceiveProps(nextProps) {
    let new_state = this.getStateFromProps(nextProps);
    if (this.state.show === false && new_state !== this.state) {
      this.setState(new_state);
    }
    this.updateDimensions();
  }

  close () {
    this.setState({ show: false, crosshairValues: null });
    this.state.onClose();
  }

  loadBatchFile () {
    this.state.x600.loadBatchFile(
      this.state.filename,
      this.handleBatchFileLoaded,
      true
    );
  }

  getUnit(name) {
    if (name.includes("Damper")) {
      return '(%)';
    } else if (name.includes("Speed")) {
      return '(%)';
    } else if (name.includes("Pressure")) {
      return '(In)';
    } else if (name.includes("Temperature")) {
      return "("+this.state.facilityConfig.temperatureUnit+")";
    } else {
      return '';
    }
  }

  getLargeDatasetMinSize = () => {
    if (this.state.facilityConfig.graphConfig && (this.state.facilityConfig.graphConfig.largeDatasetMinSize > 0)) {
      return this.state.facilityConfig.graphConfig.largeDatasetMinSize;
    } else {
      return 1680;
    }
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

  getZoneProbeIds = (zone) => {
    return zone && zone.zoneProbeIds ?
           zone.zoneProbeIds :
           this.state.facilityConfig.zoneProbeIds;
  }

  tempProbeLabel = (probeId,zone,defaultLabel) => {
    let label = "zoneTemp"+probeId+"Label";
    if (zone && zone[label]) {
      return zone[label];
    } else if (this.state.facilityConfig[label]) {
      return this.state.facilityConfig[label];
    } else if (defaultLabel !== undefined) {
      return defaultLabel;
    }
  }

  batchFileHeaderName = (name,zone) => {
    name = name.trim()
    let headerName = name.replace("Temperature", "Temp");
    let probeIds = this.getZoneProbeIds(zone);
    switch (name) {
      case 'Temperature A':
        if (probeIds.length > 1) {
          headerName = this.tempProbeLabel('A',zone,headerName);
        } else {
          headerName = 'Temperature';
        }
        break;
      case 'Temperature B':
        if (probeIds.length > 1) {
          headerName = this.tempProbeLabel('B',zone,headerName);
        } else {
          headerName = 'N/A';
        }
        break;
      case 'Temperature C':
        if (probeIds.length > 2) {
          headerName = this.tempProbeLabel('C',zone,headerName);
        } else {
          headerName = 'N/A';
        }
        break;
      case 'Temperature D':
        if (probeIds.length > 3) {
          headerName = this.tempProbeLabel('D',zone,headerName);
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

  graphTextAsNum (dataAry, col_index) {
    if (col_index !== -1){
      if (['Yes', 'On'].includes(dataAry[col_index])) {
        dataAry[col_index] = 10
      } else if (['No', 'Off'].includes(dataAry[col_index])) {
        dataAry[col_index] = 0
      }
    }
    return dataAry
  }

  handleBatchFileLoaded = (batchFileData, batchFile, batchZoneId, success) => {
    if (success === false) {
      window.location = '/';
      return;
    }
    let trimmedHeaders = batchFileData[0].map(str => str.trim());
    let zoneIdOrLabel;
    if (this.state.zone_id === undefined){
      let batchFileZoneCol = trimmedHeaders.indexOf('Zone')
      if (batchFileZoneCol !== -1){
        zoneIdOrLabel = batchFileData[batchFileData.length - 2][batchFileZoneCol]
      }
    }
    if (!zoneIdOrLabel) {
      zoneIdOrLabel = batchZoneId;
    }
    let colors = [
      'black','red','blue','green','gold','magenta',
      'turquoise','tan','salmon','gray','brown','teal'
    ];
    let newDataSets = [];
    let newLegendItems = [];
    let dailyDataSets = [];
    let pfrpTimeArr = [];
    let pfrpMet = false;
    let lastTime = null;
    let zone = this.getZone(zoneIdOrLabel);
    let probeIds = this.getZoneProbeIds(zone);
    let zoneTempColumns = [];
    probeIds.forEach((probeId, i) => {
      zoneTempColumns.push('Temperature ' + probeId)
    });
    let batchFileCappedCol = trimmedHeaders.indexOf('Capped')
    let batchFileBlowerRunCol = trimmedHeaders.indexOf('Blower Run')
    let canBeAveraged = false;
    let valueIndex = [];
    let largeDataset = (batchFileData.length >= this.getLargeDatasetMinSize());
    let exclusionList = this.state.facilityConfig.graphConfig.dataExclusionList ?
                        this.state.facilityConfig.graphConfig.dataExclusionList : [];
    let headerRow = batchFileData[0];
    headerRow.forEach((name, index) => {
      if (zoneTempColumns.length > 1 && zoneTempColumns.includes(name)) {
        canBeAveraged = true
        valueIndex.push(index)
        if (name === zoneTempColumns[zoneTempColumns.length - 1]) {
          if (headerRow[index + 1] !== 'Average Temperature') {
            headerRow.splice(index + 1,0,'Average Temperature')
          }
        }
      }
      if (index > 0) {
        let headerName = this.batchFileHeaderName(name,zone);
        if (headerName === 'N/A') {
          exclusionList.push(headerName);
        }
        
        newDataSets.push({ name: headerName.trim(), data: [], color: colors[index], unit: this.getUnit(name) });
        dailyDataSets.push({ data: [] });
        newLegendItems.push({
          title: headerName.trim()+" "+this.getUnit(name),
          name: headerName.trim(),
          color: colors[index-2]
        });
      }
    });
    let pfrpElement = trimmedHeaders.indexOf('PFRP Time');
    batchFileData.forEach((dataAry, topIndex) => {
      if (topIndex > 0 && dataAry.length >= 2) {
        dataAry = this.graphTextAsNum(dataAry, batchFileCappedCol)
        dataAry = this.graphTextAsNum(dataAry, batchFileBlowerRunCol)
        let time = Date.parse(dataAry[0]);
        let pfrpTime = Number(dataAry[pfrpElement]);
        let pfrpDurationMins = 4320;
        let tempPairs = [];
        let minTemp = 0;
        valueIndex.forEach((columnIndex, i) => {
          if (parseFloat(dataAry[columnIndex]) > 0) {
            tempPairs.push(parseFloat(dataAry[columnIndex]));
          } else {
            dataAry[columnIndex] = 0
          }
        });
        if (canBeAveraged) {
          let tempPairSum = tempPairs.reduce((a, b) => a + b, 0);
          let tempPairsAvg = tempPairs;
          if (tempPairSum > 0) {
            tempPairsAvg = (tempPairSum / tempPairsAvg.length).toFixed(2);
          } else {
            tempPairsAvg = 0;
          }
          dataAry.splice(valueIndex[valueIndex.length -1] + 1,0,tempPairsAvg);
        }
        if (tempPairs.length) {
          minTemp = Math.min(...tempPairs);
        }
        if (!pfrpMet) {
          if (!pfrpTime || pfrpTime === 0) {
            pfrpTimeArr = [];
          } else if (pfrpTime >= pfrpDurationMins) {
            pfrpMet = true;
          } else {
            pfrpTimeArr.push({ x: time, y: minTemp });
          }
        }
        
        if (largeDataset) {
          if (lastTime && new Date(lastTime).getDate() !== new Date(time).getDate()) {
            let dateTime = new Date(lastTime);
            let date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
            dailyDataSets.forEach((set, index) => {
              if (set.data.length > 0) {
                let sum = set.data.reduce(function(a, b) { return a + b; });
                let average = sum / set.data.length;
                newDataSets[index].data.push({
                  x: date.valueOf(),
                  y: average
                });
                dailyDataSets[index].data = [];
              }
            });
          }
          dataAry.forEach((value, index) => {
            if (index > 0 && index <= newDataSets.length) {
              dailyDataSets[index-1].data.push(Number(value));
            }
          });
          lastTime = time;
        } else {
          dataAry.forEach((value, index) => {
            if (index > 0 && index <= newDataSets.length) {
              newDataSets[index-1].data.push({ x: time, y: Number(value)});
            }
          });
        }
      }
    });
    if (this.displayReferenceTemp()) {
      const title = this.state.x600.settingsData["GraphReferenceTempLabel"] ?
                    this.state.x600.settingsData["GraphReferenceTempLabel"] :
                    "Reference Temp";
      newLegendItems.push({
        title: title,
        color: this.state.facilityConfig.graphConfig.referenceTempColor,
        strokeDasharray: "4 4"
      });
    }
    let newStartDate = null;
    if (this.state.filename) {
      newStartDate = this.state.x600.parseDateFromFilename(this.state.filename);
    } else if (this.state.batchLabel.length > 0) {
      newStartDate = this.state.x600.get_zone_start_date_by_batch_title(this.state.batchLabel);
    } else {
      newStartDate = this.state.x600.get_zone_start_date(this.state.zone_id);
    }
    let horizontalTicks = this.getHorizontalTicks(newDataSets);
    newDataSets = newDataSets.filter(item => !exclusionList.includes(item.name));
    newLegendItems = newLegendItems.filter(item => !exclusionList.includes(item.name));
    this.setState({
      dataSets: newDataSets.slice(1),
      legendItems: newLegendItems.slice(1),
      pfrpDataSet: pfrpTimeArr,
      zoneStartDate: newStartDate,
      largeDataset: largeDataset,
      horizontalTicks: horizontalTicks,
      totalTicksX: newDataSets[0].data.length,
      zone_id: zoneIdOrLabel
    });
  }

  roundedTime(timeValue) {
    let dateObject = new Date(Number(timeValue));
    return new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()).valueOf();
  }

  getHorizontalTicks = (dataSets) => {
    let ticks = [];
    if (dataSets.length > 0 && dataSets[0].data.length > 0) {
      let firstTime = dataSets[0].data[0].x;
      let lastTime = dataSets[0].data[dataSets[0].data.length-1].x;
      let timeValue = this.roundedTime(firstTime);
      while (timeValue <= lastTime.valueOf()) {
          timeValue += 86400000;
          ticks.push(this.roundedTime(timeValue));
      }
    }
    return ticks;
  }

  renderHorizontalTickLabel = (tickValue, index) => {
      let ticks = this.state.totalTicksX;
      let labelCount = Math.round(window.innerWidth * .85);
      let labelInterval = Math.ceil(ticks / labelCount);
      if (this.state.largeDataset) {
        return tickLabelDateFormat.format(tickValue);
      } else {
        if (this.state.horizontalTicks.includes(tickValue) && index % labelInterval === 0) {
            return tickLabelDateFormat.format(tickValue);
        } else {
            return '';
        }
      }
  }

  renderCrosshairValues = () => {
    let date;
    if (this.state.largeDataset) {
      date = tooltipDateFormat.format(this.state.crosshairValues[0].x);
    } else {
      date = tooltipTimeFormat.format(this.state.crosshairValues[0].x);
    }
    if (this.state.dataSets.length > 0) {
      const values = this.state.crosshairValues.map((value,index) => {
        if (value && this.state.dataSets[index]) {
          let data = this.state.dataSets[index]
          if (data.name === "Aeration Direction") {
            value = value.y > 0 ? "Pos" : "Neg";
          } else {
            value = value.y.toFixed(2)
          }
          return (
            <p>{data.name}: {value} {data.unit}</p>
          )
        }
        return null;
      });
      return (
        <div style={{background: 'black', width: '160px', padding: '6px 0px 1px 10px', borderRadius: '4px'}}>
          <p>Date: {date}</p>
          {values}
        </div>
      )
    }
  }

  displayDataSets = () => {
    return this.state.dataSets.map ((dataSet,index) => {
      let color = this.state.legendItems[index].color;
      let opacity = this.state.legendItems[index].disabled ? "0" : "1";
      let plots = [];
      dataSet.data.forEach(points => {
        plots.push(points);
      });
      return (
        <LineMarkSeries
          color={color}
          lineStyle={{fill:"none", opacity: opacity}}
          markStyle={{opacity: opacity}}
          data={plots}
          size={3}
          onNearestX={this._onNearestX}
        />
      )
    })
  }

  referenceTempLine = () => {
    const [lastItem] = this.state.legendItems.slice(-1);
    if (!lastItem) {
      return;
    }
    const referenceTemp = this.state.x600.settingsData["GraphReferenceTemp"];
    const color = this.state.facilityConfig.graphConfig.referenceTempColor;
    const opacity = lastItem.disabled ? "0" : "1";
    return this.state.dataSets.map ((dataSet,index) => {
      if (!dataSet.data[0]) {
        return null;
      }
      let plots = [];
      plots.push(
        {x: dataSet.data[0].x, y: referenceTemp},
        {x: dataSet.data[dataSet.data.length - 1].x, y: referenceTemp}
      );
      return (
        <LineMarkSeries
          color={color}
          lineStyle={{fill:"none", opacity: opacity}}
          markStyle={{opacity: opacity}}
          strokeDasharray="4, 4"
          data={plots}
          size={0}
        />
      )
    })
  }

  displayPFRPDataSet = () => {
    return (
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        opacity={0.2}
        color={this.state.facilityConfig.graphConfig.pfrpSectionColor}
        data={this.state.pfrpDataSet}
      />
    )
  }

  _onNearestX = (value, {index}) => {
    this.setState({crosshairValues: this.state.dataSets.map(d => {
      return d.data[index];
    })});
  };

  _clickHandler = item => {
    const {legendItems} = this.state;
    item.disabled = !item.disabled;
    this.setState({legendItems});
  };

  getLegendWidth = () => {
    let xyPlot = document.getElementsByClassName('rv-xy-plot')[0];
    if (xyPlot) {
      return xyPlot.style.width.slice(0,xyPlot.style.width.length-2);
    }
    return window.innerWidth * 0.7;
  }

  render () {
    const {lastDrawLocation, legendItems, totalTicksX, chartHeight, horizontalTicks, crosshairValues, largeDataset, dataSets} = this.state;
    const hasDataSets = dataSets.length > 0 ? true : false;
    const legendWidth = this.getLegendWidth();
    const legendOrientation = "horizontal";
    const zone = this.getZone(this.state.zone_id);
    return (
      <Modal className="ViewGraphModal" show={this.state.show} onHide={this.close} onShow={this.loadBatchFile}>
        <ModalHeader zone={zone} zoneLabel={this.state.zoneLabel} batchLabel={this.state.batchLabel} zoneStartDate={this.state.zoneStartDate} onCloseClicked={this.close} />
          <div className="modal-body" style={{minHeight: this.state.bodyHeight}} >
            <FlexibleWidthXYPlot
              xDomain={
                lastDrawLocation && [
                  lastDrawLocation.left,
                  lastDrawLocation.right
                ]
              }
              yDomain={
                lastDrawLocation && [
                  lastDrawLocation.bottom,
                  lastDrawLocation.top
                ]
              }
              height={chartHeight}
              margin={{left: 40, right: 20, top: 10, bottom: 55}}
            >
              <HorizontalGridLines />
              <VerticalGridLines />
              {this.displayPFRPDataSet()}
              {this.displayDataSets()}
              {this.displayReferenceTemp() &&
               this.referenceTempLine()}
              <XAxis
                tickTotal={totalTicksX}
                tickFormat={this.renderHorizontalTickLabel}
                tickValues={horizontalTicks}
                tickLabelAngle={-45}
              />
              <YAxis />
              <Highlight
                onBrushEnd={area => this.setState({lastDrawLocation: area})}
                onDrag={area => {
                  this.setState({
                    lastDrawLocation: {
                      bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                      left: lastDrawLocation.left - (area.right - area.left),
                      right: lastDrawLocation.right - (area.right - area.left),
                      top: lastDrawLocation.top + (area.top - area.bottom)
                    }
                  });
                }}
              />
              {hasDataSets && crosshairValues && <Crosshair values={crosshairValues}>
                {this.renderCrosshairValues()}
              </Crosshair>}
            </FlexibleWidthXYPlot>
            <DiscreteColorLegend
              orientation={legendOrientation}
              width={legendWidth}
              onItemClick={this._clickHandler}
              items={legendItems}
            />
          </div>
          {this.graphPDF()}
        <ModalFooter onResetZoomClicked={() => this.setState({lastDrawLocation: null})} onCloseClicked={this.close} saveGraph={this.saveGraph} largeDataset={largeDataset}
            largeDatasetMinSize={this.getLargeDatasetMinSize()} />
      </Modal>
    )
  }

  updateDimensions() {
    let w = window,
      height = (w.innerHeight * .75) - 100,
      bodyHeight = (w.innerHeight * .8) - 60

    if (height < 360) {
      height = 360;
      bodyHeight = 260;
    }

    this.setState({bodyHeight: bodyHeight, chartHeight: height});
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default ViewGraphModal;
