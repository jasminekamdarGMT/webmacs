import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FacilityMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facilityConfig: props.facilityConfig
        }

    }

    render () {
        return (
            <div className="row">
              <div className="span12 text-center">
                  <Link to="status">
                      <img alt="Facility map" src="/facility.png" />
                  </Link>
              </div>
            </div>
        )
    }
}

export default FacilityMap;
