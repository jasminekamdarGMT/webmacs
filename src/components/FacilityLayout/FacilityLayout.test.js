import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import FacilityLayout from './FacilityLayout';
import X600Mock from '../../helpers/X600/X600Mock';

let facilityConfig = {
  temperatureUnit: '°C',
  zoneProbeIds: ['A', 'B'],
  zoneGroups: [
    {
      groupBlower: {
        blowerId: '01'
      },
      groupZones: [
        {
          zoneId: '03'
        },
        {
          zoneId: '02'
        },
        {
          zoneId: '01'
        }
      ]
    }
  ],
  graphConfig: {
    largeDatasetMinSize: 0
  },
};

describe('FacilityLayout component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FacilityLayout x600={new X600Mock()} facilityConfig={facilityConfig} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the facility layout stuff', () => {
    const wrapper = mount(<FacilityLayout x600={new X600Mock()} facilityConfig={facilityConfig} />);
    expect(wrapper).toBeTruthy();
  });
});
