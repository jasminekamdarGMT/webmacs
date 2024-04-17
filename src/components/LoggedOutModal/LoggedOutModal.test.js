import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import LoggedOutModal from './LoggedOutModal';

describe('LoggedOutModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoggedOutModal />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<LoggedOutModal />);
    expect(wrapper).toBeTruthy();
  });
});
