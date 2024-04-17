import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import MonitorInputsModal from './MonitorInputsModal';
import X600Mock from '../../helpers/X600/X600Mock';

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

describe('MonitorInputsModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MonitorInputsModal x600={new X600Mock()} inputMonitorGroups={inputMonitorGroups} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<MonitorInputsModal x600={new X600Mock()} inputMonitorGroups={inputMonitorGroups} />);
    expect(wrapper).toBeTruthy();
  });
});
