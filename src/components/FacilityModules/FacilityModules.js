import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FacilityModules extends Component {
  constructor(props) {
    super(props);

    this.state = {
        onModuleClick: props.onModuleClick,
        facilityConfig: props.facilityConfig
    }

    this.handleModuleClick = this.handleModuleClick.bind(this);
  }

  handleModuleClick (moduleGroup) {
    this.state.onModuleClick(moduleGroup);
  }

  getModuleGroups = () => {
    const moduleGroups = this.state.facilityConfig.moduleGroups.map(group => group.moduleGroup);

    return [...new Set(moduleGroups)];
  }

  render () {
    const moduleGroups = this.getModuleGroups();
    const externalPanels = this.state.facilityConfig.externalPanels;

    return (
      <div className="row">
        <div className="span12 text-center">
          <Link to="status" onClick={this.handleModuleClick.bind(this,null)}>All</Link>
        </div>
        {moduleGroups.map((moduleGroup,index) =>
          <div key={index} className="span12 text-center">
            {moduleGroup &&
              <Link to={`status?moduleFilter=${moduleGroup}`} onClick={this.handleModuleClick.bind(this,moduleGroup)}>Module {moduleGroup}</Link>}
          </div>
        )}
        {externalPanels && externalPanels.map((panel,index) =>
          <div key={index} className="span12 text-center">
            {panel &&
              <a href={`//${panel.panelAddress}`} onClick={this.handleModuleClick.bind(this,null)}>{panel.panelLabel}</a>
            }
          </div>
        )}
      </div>
    )
  }
}

export default FacilityModules;
