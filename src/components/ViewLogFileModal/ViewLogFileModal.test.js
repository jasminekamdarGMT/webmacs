import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import ViewLogFileModal from './ViewLogFileModal';
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
  ]
};

describe('ViewLogFileModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ViewLogFileModal x600={new X600Mock()} facilityConfig={facilityConfig} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<ViewLogFileModal x600={new X600Mock()} facilityConfig={facilityConfig} />);
    expect(wrapper).toBeTruthy();
  });
});
