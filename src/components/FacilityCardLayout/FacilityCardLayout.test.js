import 'jest-enzyme';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import FacilityCardLayout from './FacilityCardLayout';
import X600Mock from '../../helpers/X600/X600Mock';

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
  ],
  graphConfig: {
    largeDatasetMinSize: 0
  },
};

describe('FacilityCardLayout component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FacilityCardLayout x600={new X600Mock()} facilityConfig={facilityConfig} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the facility layout stuff', () => {
    const wrapper = mount(
      <HashRouter>
        <FacilityCardLayout x600={new X600Mock()} facilityConfig={facilityConfig} />
      </HashRouter>
    );
    expect(wrapper).toBeTruthy();
  });
});
