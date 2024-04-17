import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import FacilityLogs from './FacilityLogs';
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

describe('FacilityLogs component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FacilityLogs x600={new X600Mock()} facilityConfig={facilityConfig} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<FacilityLogs x600={new X600Mock()} facilityConfig={facilityConfig} />);
    expect(wrapper.find('h3').text()).toEqual('Batch Temperature Logs');
    expect(wrapper).toBeTruthy();
  });
});
