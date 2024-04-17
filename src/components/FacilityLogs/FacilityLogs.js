import React, { Component } from 'react';
import ViewGraphModal from '../ViewGraphModal/ViewGraphModal';
import ViewLogFileModal from '../ViewLogFileModal/ViewLogFileModal';
import DeleteLogFileModal from '../DeleteLogFileModal/DeleteLogFileModal';
import Pagination from "react-js-pagination";
import './FacilityLogs.css';

class FacilityLogsRow extends Component {
  constructor(props) {
      super(props);

      this.state = {
          fileName: props.data.name,
          onViewGraphClicked: props.onViewGraphClicked,
          onDeleteClicked: props.onDeleteClicked,
          onDownloadClicked: props.onDownloadClicked,
          onViewFileClicked: props.onViewFileClicked
      }
  }

  handleDeleteClicked = () => {
    this.state.onDeleteClicked(this.state.fileName);
  }

  handleDownloadClicked = () => {
    this.state.onDownloadClicked(this.state.fileName);
  }

  handleViewGraphClicked = () => {
    this.state.onViewGraphClicked(this.state.fileName);
  }

  handleViewFileClicked = () => {
    this.state.onViewFileClicked(this.state.fileName);
  }

  render () {
    return (
      <tr className="FacilityLogsRow">
        <td>
          <div className="span5 fileName">{this.state.fileName}</div>
          <div className="span6 text-right">
            <button className="btn btn-small btn-danger" onClick={this.handleDeleteClicked}>Delete</button>
            <button className="btn btn-small btn-default" onClick={this.handleDownloadClicked}>Download</button>
            <button className="btn btn-small btn-default" onClick={this.handleViewFileClicked}>View File</button>
            <button className="btn btn-small btn-primary" onClick={this.handleViewGraphClicked}>View Graph</button>
          </div>
        </td>
      </tr>
    )
  }
}

class FacilityLogs extends Component {
    constructor(props) {
        super(props);

        this.state = {
          x600: props.x600,
          facilityConfig: props.facilityConfig,
          showViewGraphModal: false,
          showViewLogFileModal: false,
          showDeleteLogFileModal: false,
          selectedBatchTitle: null,
          selectedFilename: null,
          currentPage: 1,
          logFilesPerPage: props.facilityConfig.logFilesPerPage ? props.facilityConfig.logFilesPerPage : 10,
          remount: new Date().getTime()
        }
    }

    componentDidMount() {
      this.state.x600.loadZoneStartupData();
      this.state.x600.loadBatchFilesData();
    }

    handleViewGraphClicked = (filename) => {
      let batch_title = this.getBatchTitleFromFilename(filename);
      this.setState({
        selectedFilename: filename,
        selectedBatchTitle: batch_title,
        showViewGraphModal: true
      });
    }

    handleViewGraphModalClosed = () => {
      this.setState({ showViewGraphModal: false });
    }

    handleDeleteClicked = (filename) => {
      let batch_title = this.getBatchTitleFromFilename(filename);
      this.setState({
        selectedFilename: filename,
        selectedBatchTitle: batch_title,
        showDeleteLogFileModal: true
      });
    }

    handleNewData = () => {
      this.setState({
        remount: new Date().getTime()
      });
    }

    handleDeleteLogFileModalClosed = () => {
      this.state.x600.setDataLoadedHandler(this.handleNewData);
      this.setState({
        showDeleteLogFileModal: false
      });
      this.state.x600.loadZoneStartupData();
      this.state.x600.loadBatchFilesData();
    }

    handleDownloadClicked = (filename) => {
      this.state.x600.loadBatchFile(filename, this.handleDownloadedFileData);
    }

    handleDownloadAllClicked = () => {
      import('jszip').then(jszip => {
        let zip = jszip();
        let zipFilename = "batch_files.zip";
        this.state.x600.batchFiles.forEach((file) => {
          let url = file.name;
          let fn_parts = url.split('/');
          zip.file(fn_parts[fn_parts.length-1], this.urlToPromise(url));
        });
        zip.generateAsync({type:"blob"})
        .then((content) => {
            this.saveAs(content, zipFilename);
        });
      });
    }

    urlToPromise(url) {
      return new Promise((resolve, reject) => {
          this.state.x600.loadBatchFile(url, function(data) {
            resolve(data);
          });
      });
    }

    saveAs(blob, filename) {
      if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(blob, filename);
      } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(blob, filename);
      } else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        elem.style = 'display:none;opacity:0;color:transparent;';
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === 'function') {
          elem.click();
        } else {
          elem.target = '_blank';
          elem.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          }));
        }
        URL.revokeObjectURL(elem.href);
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
            if (zoneIdOrLabel) {
              if (zoneIdOrLabel === zn.zoneId || zoneIdOrLabel === zn.zoneLabel) {
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

    pfrpVarCount = (units,time) => {
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

    handleDownloadedFileData = (data, filename) => {
      let pfrpIndex = -1;
      let batchFileData = data.split('\n');
      let headers = batchFileData[0].split(',').map(header => header.trim());
      let zoneId = this.state.x600.get_zone_id_by_filename(filename);
      let zone = this.getZone(zoneId);
      headers.forEach((name, index) => {
        let headerName = this.batchFileHeaderName(name,zone);
        headers[index] = headerName;
        pfrpIndex = headerName == "PFRP Time" ? index : pfrpIndex;
      });
      headers = headers.join(', ');
      batchFileData[0] = headers;
      if (pfrpIndex >= 0) {
        batchFileData.map((row, rowIndex) => {
          if (rowIndex !== 0) {
            row = row.split(',')
            row.map((value, valueIndex) => {
              if (pfrpIndex === valueIndex) {
                const config = this.state.facilityConfig.pfrpVarConfig;
                let pfrpMet = value >= 4320;
                let units = 'hours';
                let count = this.pfrpVarCount(units,value);
                if (config) {
                  units = config.pfrpUnits;
                  count = this.pfrpVarCount(units,value);
                }
                value = pfrpMet ? 'PFRP Met' : count;
              }
              row[valueIndex] = value;
            });
            row = row.join();
            batchFileData[rowIndex] = row;
          }
        });
      }
      data = batchFileData.join('\n')

      import('js-file-download').then(fileDownload => {
        let fn_parts = filename.split('/');
        filename = fn_parts[fn_parts.length - 1].split('_');
        filename = filename[filename.length - 1]
        if (filename === '.csv') {
          filename = fn_parts[fn_parts.length - 1]
        }
        fileDownload(data, filename);
      });
    }

    handleViewFileClicked = (filename) => {
      let batch_title = this.getBatchTitleFromFilename(filename);
      this.setState({
        selectedFilename: filename,
        selectedBatchTitle: batch_title,
        showViewLogFileModal: true
      });
    }

    handleViewLogFileModalClosed = () => {
      this.setState({ showViewLogFileModal: false });
    }

    handlePageChange = (pageNumber) => {
      this.setState({currentPage: pageNumber});
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

    render () {
       let { currentPage, logFilesPerPage } = this.state;

       let indexOfLastBatchFile = currentPage * logFilesPerPage,
           indexOfFirstBatchFile = indexOfLastBatchFile - logFilesPerPage,
           currentBatchFiles = this.state.x600.batchFiles.slice(indexOfFirstBatchFile, indexOfLastBatchFile);

        return (
          <div className='row'>
            <div className="span12">
              <h3>Batch Temperature Logs</h3>
              <table className="table table-hover">
                <tbody>
                  {this.state.x600.batchFiles.length > 0 && <tr className="FacilityLogsRow">
                    <td>
                      <div className="span5 fileName">{this.state.x600.batchFiles.length} Total Batch Files</div>
                      <div className="span6 text-right">
                        <button className="btn btn-small btn-default" onClick={this.handleDownloadAllClicked}>Download All</button>
                      </div>
                    </td>
                  </tr>}
                  {currentBatchFiles.map((object) => {
                    return (
                      <FacilityLogsRow key={object.id} data={object} onViewGraphClicked={this.handleViewGraphClicked}
                        onDeleteClicked={this.handleDeleteClicked} onDownloadClicked={this.handleDownloadClicked} onViewFileClicked={this.handleViewFileClicked} />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="pagination pagination-centered">
              <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.logFilesPerPage}
                totalItemsCount={this.state.x600.batchFiles.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            </div>
            <ViewGraphModal show={this.state.showViewGraphModal} batch_title={this.state.selectedBatchTitle} x600={this.state.x600}
              facilityConfig={this.state.facilityConfig} onClose={this.handleViewGraphModalClosed} filename={this.state.selectedFilename} />
            <ViewLogFileModal show={this.state.showViewLogFileModal} batch_title={this.state.selectedBatchTitle} x600={this.state.x600}
              facilityConfig={this.state.facilityConfig} onClose={this.handleViewLogFileModalClosed} filename={this.state.selectedFilename} />
            <DeleteLogFileModal show={this.state.showDeleteLogFileModal} onClose={this.handleDeleteLogFileModalClosed}
              batch_title={this.state.selectedBatchTitle} filename={this.state.selectedFilename} x600={this.state.x600} />
          </div>
        )
    }
}

export default FacilityLogs;
