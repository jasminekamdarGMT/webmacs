import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import Main from './Main';
import X600Mock from '../../helpers/X600/X600Mock';

describe('Main component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Main x600={new X600Mock()} facilityConfig={{}} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<Main x600={new X600Mock()} facilityConfig={{}} />);
    expect(wrapper).toBeTruthy();
  });
});
