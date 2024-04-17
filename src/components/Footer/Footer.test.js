import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import Footer from './Footer';

describe('Footer component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the footer stuff', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper).toBeTruthy();
  });
});
