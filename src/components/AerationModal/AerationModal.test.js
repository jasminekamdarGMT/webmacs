import 'jest-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import '../../enzyme-setup';

import AerationModal from './AerationModal';
import X600Mock from '../../helpers/X600/X600Mock';
import facilityConfig from '../../helpers/test/facility-configs/reversing-aeration-direction-system.js';

function setUp(show) {
  const handleAerationModalClosed = jest.fn();
  return mount(
    <AerationModal
      x600={new X600Mock()}
      show={show}
      blower_id={'01'}
      blower_label={'Blower 1'}
      onClose={handleAerationModalClosed}
      facilityConfig={facilityConfig}
    />);
}

describe('AerationModal component', () => {
  it('includes all the stuff', () => {
    const wrapper = setUp(true);
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('<h3>Manifold 1</h3>');
    expect(wrapper.html()).toContain('<label class="checkbox"><input type="checkbox"><strong>Manual Direction Control</strong></label>');
    expect(wrapper.html()).toContain('<button class="btn">Cancel</button>');
    expect(wrapper.html()).toContain('<button class="btn btn-primary">Apply changes</button>');
  });

  it('does not render html if show is false', () => {
    const wrapper = setUp(false);
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toBeFalsy();
  });

  it('calls handleClose if Cancel button is clicked', () => {
    const wrapper = setUp(true);
    expect(wrapper).toBeTruthy();
    wrapper.find('button[children="Cancel"]').simulate('click');
    expect(wrapper.state().handleClose).toBeCalled();
  });

  it('calls saveStateValues if Apply button is clicked', () => {
    const wrapper = setUp(true);
    wrapper.instance().saveStateValues = jest.fn();
    expect(wrapper).toBeTruthy();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.instance().saveStateValues).toBeCalled();
  });

  it('sets aerationOverride to true when Manual Direction Control is checked', () => {
    const wrapper = setUp(true);
    expect(wrapper.state().aerationOverride).toBeFalsy();
    expect(wrapper.state().x600.currentData.blower01revoverride).toBeFalsy();
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.state().aerationOverride).toBeTruthy();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.state().x600.currentData.blower01revoverride).toBeTruthy();
  });

  it('sets aerationDirection to true when positive direction is selected', () => {
    const wrapper = setUp(true);
    expect(wrapper.state().aerationDirection).toBeFalsy();
    expect(wrapper.state().x600.currentData.blower01direction).toBeFalsy();
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    wrapper.find('input[value="positive"]').simulate('change');
    expect(wrapper.state().aerationDirection).toBeTruthy();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.state().x600.currentData.blower01direction).toBeTruthy();
  });

  it('sets aerationDirection to false when negative direction is selected', () => {
    const wrapper = setUp(true);
    wrapper.state().aerationDirection = true;
    wrapper.state().x600.currentData.blower01direction = true;
    expect(wrapper.state().aerationDirection).toBeTruthy();
    expect(wrapper.state().x600.currentData.blower01direction).toBeTruthy();
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    wrapper.find('input[value="negative"]').simulate('change');
    expect(wrapper.state().aerationDirection).toBeFalsy();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.state().x600.currentData.blower01direction).toBeFalsy();
  });
});
