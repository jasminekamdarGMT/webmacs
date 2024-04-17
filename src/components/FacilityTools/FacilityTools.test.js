import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import FacilityTools from './FacilityTools';

const inputMonitorGroups = [
  {
    groupName: 'Zone123Temps',
    groupLabel: 'Zone 1-3 Temps',
    groupInputs: [
      {
          inputName: 'zone01pAtemp',
          inputLabel: 'Zone 1 Probe A',
          inputUnit: 'F'
      },
      {
          inputName: 'zone01pBtemp',
          inputLabel: 'Zone 1 Probe B',
          inputUnit: 'F'
      }
    ]
  }
];

describe('FacilityTools component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FacilityTools inputMonitorGroups={inputMonitorGroups} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<FacilityTools inputMonitorGroups={inputMonitorGroups} />);
    expect(wrapper).toBeTruthy();
  });
});
