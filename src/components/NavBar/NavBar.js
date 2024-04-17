import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import './NavBar.css';

function ButtonNavBar (props) {
    return (
        <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
    )
}

function FacilityNameLink (props) {
    let href = props.showMap ? "map" : "status";
    return (
        <Link className="brand" to={href}>{props.facilityName}</Link>
    )
}

class NavBarItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: props.pageName,
            pageLabel: props.pageLabel,
            location: props.location,
            query: props.query
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPage: nextProps.currentPage,
            pageName: nextProps.pageName,
            pageLabel: nextProps.pageLabel,
            location: nextProps.location,
            query: nextProps.query
        });
    }

    render () {
        let pathname = this.state.location.pathname.slice(1);
        let active = (pathname === this.state.pageName);
        let page = this.state.pageName;
        if (this.state.query) {
          page += this.state.query;
        }
        if (active === true) {
            return (
                <li className="active"><Link to={page} >{this.state.pageLabel}</Link></li>
            )
        } else {
            return (
                <li><Link to={page} >{this.state.pageLabel}</Link></li>
            )
        }
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = this.getStateFromProps(props);

    }

    getStateFromProps(props) {
        return {
            x600: props.x600,
            facilityName: props.x600.settingsData['FacilityName'],
            showMap: (props.facilityConfig && props.facilityConfig.showMap === false) ? false : true,
            hasModuleSelect: props.facilityConfig.hasModuleSelect === true,
            zoneGroupFilter: props.zoneGroupFilter

        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container">
                        <ButtonNavBar></ButtonNavBar>
                        <FacilityNameLink facilityName={this.state.facilityName} showMap={this.state.showMap} />
                        <div className="nav-collapse collapse">
                            <ul className="nav pull-right">
                                { this.state.showMap &&
                                    <NavBarItem location={this.props.location} pageName='map' pageLabel='Map' />
                                }
                                {
                                  this.state.hasModuleSelect &&
                                    <NavBarItem location={this.props.location} pageName='modules' pageLabel='Modules' />
                                }
                                {
                                  this.state.zoneGroupFilter &&
                                    <NavBarItem location={this.props.location} pageName='status' pageLabel='Status' query={`?moduleFilter=${this.state.zoneGroupFilter}`} />
                                }
                                {
                                  !this.state.zoneGroupFilter &&
                                    <NavBarItem location={this.props.location} pageName='status' pageLabel='Status' />
                                }
                                <NavBarItem location={this.props.location} pageName='settings' pageLabel='Settings' />
                                <NavBarItem location={this.props.location} pageName='logs' pageLabel='Logs' />
                                <NavBarItem location={this.props.location} pageName='tools' pageLabel='Tools' />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NavBar);
