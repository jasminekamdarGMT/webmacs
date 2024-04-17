import 'jest-enzyme';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import NavBar from './NavBar';
import X600Mock from '../../helpers/X600/X600Mock';
import '../../enzyme-setup';

describe('NavBar component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NavBar x600={ new X600Mock() } currentPage={'status'} facilityConfig={{}} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the nav stuff', () => {
    const wrapper = mount(
      <HashRouter>
        <NavBar x600={ new X600Mock() } currentPage={'status'} facilityConfig={{}} />
      </HashRouter>
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('<a class="brand" href="#/map"></a>');
    expect(wrapper.html()).toContain('<li><a href="#/map">Map</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/status">Status</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/settings">Settings</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/logs">Logs</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/tools">Tools</a></li>');
  });
});

describe('NavBar component for a facility with no map', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <HashRouter>
        <NavBar x600={ new X600Mock() } currentPage={'status'} facilityConfig={{showMap: false}} />
      </HashRouter>
      );
    expect(wrapper).toBeTruthy();
  });

  it('does not include Map link and brand link has href #status', () => {
    const wrapper = mount(
      <HashRouter>
        <NavBar x600={ new X600Mock() } currentPage={'status'} facilityConfig={{showMap: false}} />
      </HashRouter>
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).not.toContain('<a class="brand" href="#/map"></a>');
    expect(wrapper.html()).toContain('<a class="brand" href="#/status"></a>');
    expect(wrapper.html()).not.toContain('<li><a href="#/map">Map</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/status">Status</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/settings">Settings</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/logs">Logs</a></li>');
    expect(wrapper.html()).toContain('<li><a href="#/tools">Tools</a></li>');
  });
});
