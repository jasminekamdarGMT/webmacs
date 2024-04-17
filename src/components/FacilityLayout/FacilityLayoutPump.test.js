import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import FacilityLayoutPump from './FacilityLayoutPump';
import X600Mock from '../../helpers/X600/X600Mock';

const mockPump = {
  pumpId: '01',
  pumpLabel: 'Pump 1'
}

describe('FacilityLayoutPump component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FacilityLayoutPump x600={new X600Mock()} pump={mockPump} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the facility layout stuff', () => {
    const wrapper = mount(<FacilityLayoutPump x600={new X600Mock()} pump={mockPump} />);
    expect(wrapper).toBeTruthy();
  });
});
