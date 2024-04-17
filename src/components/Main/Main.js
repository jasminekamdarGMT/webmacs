import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { version } from '../../../package.json';
import FacilityMap from '../FacilityMap/FacilityMap';
import FacilityModules from '../FacilityModules/FacilityModules';
import FacilitySettings from '../FacilitySettings/FacilitySettings';
import FacilityLogs from '../FacilityLogs/FacilityLogs';
import FacilityTools from '../FacilityTools/FacilityTools';
import Footer from '../Footer/Footer';
import LoggedOutModal from '../LoggedOutModal/LoggedOutModal';
import './Main.css';

class ConfigAlerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
        x600: props.x600,
        facilityConfig: props.facilityConfig,
        validIOConfig: true,
        missingIOReg: [],
        validSettingsDBConfiguration: true,
        missingFacilitySettings: [],
        validSettingsConfiguration: true,
        missingFacilityDBSettings: []
    };

  }

  componentDidMount() {
    if (window.location.hash.length === 0) {
      setTimeout(() => this.state.x600.refreshData(this.verifySettingsAndIOConfiguration.bind(this)), 1000);
    }
  }

  unverifiedConfigVersion = () => {
    if (version !== this.state.facilityConfig.verifiedWithVersion) {
      return (
        <div className="alert">
          The current configuration has not been verified with this version of WebMACS ({version}).
        </div>
      )
    }
  }

  unverifiedIOConfiguration = () => {
    return (
      <div className="alert">
        The current configuration is missing the following IO and register names:
        {this.state.missingIOReg.map((item,index) =>
          <li key={index}>{item}</li>
        )}
      </div>
    )
  }

  unverifiedSettingsConfiguration = () => {
    return (
      <div className="alert">
        The following settings are missing from the facility configuration:
        {this.state.missingFacilitySettings.map((item,index) =>
          <li key={index}>{item}</li>
        )}
      </div>
    )
  }

  unverifiedSettingsDBConfiguration = () => {
    return (
      <div className="alert">
        The following settings are missing from the database:
        {this.state.missingFacilityDBSettings.map((item,index) =>
          <li key={index}>{item}</li>
        )}
      </div>
    )
  }

  verifySettingsAndIOConfiguration = () => {
    this.verifyIOConfiguration();
    this.verifySettingsConfiguration();
  }

  verifyIOConfiguration = () => {
    const x600 = this.state.x600;
    const requiredIOReg = this.state.facilityConfig.IORegList;
    if (requiredIOReg) {
      let validConfig = requiredIOReg.every(key => {
        return x600.doesIORegExist(key) === true;
      });
      if (!validConfig) {
        requiredIOReg.forEach(key => {
          if (x600.doesIORegExist(key) === false) {
            this.setState({
              missingIOReg: [...this.state.missingIOReg, key]
            })
          }
        });
      }
      this.setState({validIOConfig: validConfig});
    }
  }

  verifySettingsConfiguration = () => {
    const x600 = this.state.x600;
    const settingsDataKeys = Object.keys(x600.settingsData);
    const settingsGroups = this.state.facilityConfig.settingsGroups;
    const ignoredSettings = ['Username','Email','TemperatureUnits'];
    let settingsListFromFacilityConfig = [];
    let validSettingsDBConfig = true;
    let validSettingsConfig = true;
    let validGroupSettings = true;
    let validGroupAdvancedSettings = true;
    // find missing database settings
    if (settingsGroups) {
      settingsGroups.forEach(group => {
        group.groupSettings.forEach(groupSetting => {
          settingsListFromFacilityConfig.push(groupSetting.settingName);
          if (x600.doesSettingExist(groupSetting.settingName) === false) {
            if (!ignoredSettings.includes(groupSetting.settingName)) {
              validGroupSettings = false;
            }
          }
        })
        if (!validGroupSettings) {
          validSettingsDBConfig = false;
        }
        if (!validSettingsDBConfig) {
          group.groupSettings.forEach(groupSetting => {
            if (x600.doesSettingExist(groupSetting.settingName) === false) {
              if (!ignoredSettings.includes(groupSetting.settingName)) {
                this.setState({
                  missingFacilityDBSettings: [...this.state.missingFacilityDBSettings, groupSetting.settingName]
                });
              }
            }
          });
        }
        if (group.groupAdvancedSettings) {
          group.groupAdvancedSettings.forEach(groupAdvancedSetting => {
            settingsListFromFacilityConfig.push(groupAdvancedSetting.settingName);
            if (x600.doesSettingExist(groupAdvancedSetting.settingName) === false) {
              if (!ignoredSettings.includes(groupAdvancedSetting.settingName)) {
                validGroupAdvancedSettings = false;
              }
            }
          })
          if (!validGroupAdvancedSettings) {
            validSettingsDBConfig = false;
          }
          if (!validSettingsDBConfig) {
            group.groupAdvancedSettings.forEach(groupAdvancedSetting => {
              if (x600.doesSettingExist(groupAdvancedSetting.settingName) === false) {
                if (!ignoredSettings.includes(groupAdvancedSetting.settingName)) {
                  this.setState({
                    missingFacilityDBSettings: [...this.state.missingFacilityDBSettings, groupAdvancedSetting.settingName]
                  });
                }
              }
            });
          }
        }
      })
      // find missing facility config settings
      if (settingsDataKeys) {
        let validSettingsDataKeys = settingsDataKeys.every(setting => {
          return settingsListFromFacilityConfig.includes(setting);
        })
        if (!validSettingsDataKeys) {
          validSettingsConfig = false;
          settingsDataKeys.forEach(setting => {
            if (settingsListFromFacilityConfig.includes(setting) === false) {
              this.setState({
                missingFacilitySettings: [...this.state.missingFacilitySettings, setting]
              })
            }
          });
        }
      }
      this.setState({validSettingsDBConfiguration: validSettingsDBConfig});
      this.setState({validSettingsConfiguration: validSettingsConfig});
    }
  }

  renderAlerts = () => {
    return (
      <div>
        {this.unverifiedConfigVersion()}
        {!this.state.validIOConfig && this.unverifiedIOConfiguration()}
        {!this.state.validSettingsDBConfiguration && this.unverifiedSettingsDBConfiguration()}
        {!this.state.validSettingsConfiguration && this.unverifiedSettingsConfiguration()}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderAlerts()}
      </div>
    )
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    let defaultPage = 'map';
    if (props.facilityConfig && props.facilityConfig.defaultPage) {
      defaultPage = props.facilityConfig.defaultPage;
    }

    this.state = {
        x600: props.x600,
        facilityConfig: props.facilityConfig,
        defaultPage: defaultPage,
        loggedOut: false,
        receivedLoadSettingsResponse: false,
        receivedLoadZoneStartupResponse: false,
        receivedLoadBatchFilesResponse: false,
        loadSettingsError: false,
        loadZoneStartupError: false,
        loadBatchFilesError: false,
        facilityLayoutComponent: null,
        facilityCardLayoutComponent: null,
        zoneGroupFilter: null
    };

    this.handleDataLoaded = this.handleDataLoaded.bind(this);
    this.handleModuleClick = this.handleModuleClick.bind(this);
  }

  componentDidMount() {
    import('../FacilityLayout/FacilityLayout').then(FacilityLayout => {
      this.setState({ facilityLayoutComponent: FacilityLayout.default });
    });
    import('../FacilityCardLayout/FacilityCardLayout').then(FacilityCardLayout => {
      this.setState({ facilityCardLayoutComponent: FacilityCardLayout.default });
    });
    this.state.x600.setDataLoadedHandler(this.handleDataLoaded);
    this.state.x600.loadSettingsData(this.handleLoadSettingsResponse);
    this.state.x600.loadZoneStartupData(this.handleLoadZoneStartupDataResponse);
    this.state.x600.loadBatchFilesData(this.handleLoadBatchFilesResponse);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  handleLoadSettingsResponse = (response) => {
    this.setState({ receivedLoadSettingsResponse: true });
    if (response.substring(0,1) === '[') {
      this.state.x600.handleLoadSettingsCallback(response);
    } else {
      this.setState({ loadSettingsError: true });
    }
  }

  handleLoadZoneStartupDataResponse = (response) => {
    this.setState({ receivedLoadZoneStartupResponse: true });
    if (response.substring(0,1) === '[') {
      this.state.x600.handleLoadZoneStartupDataCallback(response);
    } else {
      this.setState({ loadZoneStartupError: true });
    }
  }

  handleLoadBatchFilesResponse = (response) => {
    this.setState({ receivedLoadBatchFilesResponse: true });
    if (response.substring(0,1) === '[') {
      this.state.x600.handleLoadBatchFilesCallback(response);
    } else {
      this.setState({ loadBatchFilesError: true });
    }
  }

  handleDataLoaded = (success) => {
    const {
      receivedLoadSettingsResponse,
      receivedLoadZoneStartupResponse,
      receivedLoadBatchFilesResponse,
      loadSettingsError,
      loadZoneStartupError,
      loadBatchFilesError
    } = this.state;

    const allResponsesReceived = receivedLoadSettingsResponse &&
                                 receivedLoadZoneStartupResponse &&
                                 receivedLoadBatchFilesResponse;
    const databaseErrorExists = loadSettingsError ||
                                loadZoneStartupError ||
                                loadBatchFilesError;

    if (allResponsesReceived) {
      if (databaseErrorExists) {
        console.log('Error while loading from database', this.state);
      } else {
        this.state.x600.setDataLoadedHandler(this.checkComm);
        this.timer = setTimeout(() => this.refreshZoneStartupData(), 10000);
      }
    }
    this.setState({ loggedOut: !success });
  }

  checkComm = (success) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (success) {
      this.timer = setTimeout(() => this.refreshZoneStartupData(), 10000);
    } else {
      this.setState({ loggedOut: true });
    }
  }

  refreshZoneStartupData = () => {
    this.state.x600.loadZoneStartupData();
  }

  handleModuleClick (moduleGroup) {
    this.setState({ zoneGroupFilter: moduleGroup });
  }

  renderFacilityLayout = () => {
    if (this.state.facilityConfig.layoutType === 'card' && this.state.facilityCardLayoutComponent != null) {
      const { facilityCardLayoutComponent: FacilityCardLayout } = this.state;
      return (
        <FacilityCardLayout x600={this.state.x600} facilityConfig={this.state.facilityConfig} zoneGroupFilter={this.state.zoneGroupFilter} />
      )
    } else if (this.state.facilityConfig.layoutType !== 'card' && this.state.facilityLayoutComponent != null) {
      const { facilityLayoutComponent: FacilityLayout } = this.state;
      return (
        <FacilityLayout x600={this.state.x600} facilityConfig={this.state.facilityConfig} />
      )
    }
  }

  render() {
    return (
      <div className="Main">
        <HashRouter hashType={"noslash"}>
          <NavBar x600={this.state.x600} facilityConfig={this.state.facilityConfig} zoneGroupFilter={this.state.zoneGroupFilter} />
          <div id="content" className="container">
            <ConfigAlerts x600={this.state.x600} facilityConfig={this.state.facilityConfig} />
            <Switch>
                <Route exact path='/'>
                  <Redirect to={this.state.defaultPage} />
                </Route>
                <Route exact path='/map' component={() =>
                  <FacilityMap facilityConfig={this.state.facilityConfig} onMapClick={this.handleMapClick} />}
                />
                <Route exact path='/modules' component={() =>
                  <FacilityModules facilityConfig={this.state.facilityConfig} onModuleClick={this.handleModuleClick} />}
                />
                <Route exact path='/status'>
                  {this.renderFacilityLayout()}
                </Route>
                <Route exact path='/settings' component={() =>
                  <FacilitySettings x600={this.state.x600} facilityConfig={this.state.facilityConfig} settingsGroups={this.state.facilityConfig.settingsGroups} />}
                />
                <Route exact path='/logs'>
                  <FacilityLogs x600={this.state.x600} facilityConfig={this.state.facilityConfig} />
                </Route>
                <Route exact path='/tools' component={() =>
                  <FacilityTools x600={this.state.x600} inputMonitorGroups={this.state.facilityConfig.inputMonitorGroups} />}
                />
            </Switch>
            <Footer />
            <LoggedOutModal show={this.state.loggedOut} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
