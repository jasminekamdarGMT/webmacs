import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import PumpModal from './PumpModal';
import X600Mock from '../../helpers/X600/X600Mock';

const mockPump = {
  pumpId: '01',
  pumpLabel: 'Pump 1'
}

describe('PumpModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<PumpModal x600={new X600Mock()} pump={mockPump} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<PumpModal x600={new X600Mock()} pump={mockPump} />);
    expect(wrapper).toBeTruthy();
  });
});
