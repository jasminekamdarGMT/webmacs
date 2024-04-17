import 'jest-enzyme';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import FacilityMap from './FacilityMap';

let facilityConfig = {
  temperatureUnit: '°C',
  layoutType: 'card',
  zoneProbeIds: ['A', 'B'],
  zoneGroups: [
    {
      groupBlower: {
        blowerId: '01',
        blowerLabel: 'Blower 1'
      },
      groupZones: [
        {
          zoneId: '01'
        },
        {
          zoneId: '02'
        }
      ]
    }
  ]
};

describe('FacilityMap component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FacilityMap facilityConfig={facilityConfig} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(
      <HashRouter>
        <FacilityMap facilityConfig={facilityConfig} />
      </HashRouter>
    );
    expect(wrapper).toBeTruthy();
  });
});
