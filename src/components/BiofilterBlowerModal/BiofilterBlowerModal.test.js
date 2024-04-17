import 'jest-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import '../../enzyme-setup';

import BiofilterBlowerModal from './BiofilterBlowerModal';
import X600Mock from '../../helpers/X600/X600Mock';
import facilityConfig from '../../helpers/test/facility-configs/blower-has-speed-control-and-custom-cycle-control.js';
import zoneStartupData from '../../../facilities/single_direction/salinas/mocks/zone_startup.json';
import batchFiles from '../../../facilities/single_direction/salinas/mocks/batch_files.json';

function setUp(showBiofilterBlowerModal,selectedBlowerHasSpeedControl,selectedBlowerHasTurboMode) {
  const handleBiofilterBlowerModalClosed = jest.fn();
  let x600 = new X600Mock();
  x600.handleLoadZoneStartupDataCallback(JSON.stringify(zoneStartupData));
  x600.handleLoadBatchFilesCallback(JSON.stringify(batchFiles));
  return mount(
    <BiofilterBlowerModal
      show={showBiofilterBlowerModal}
      biofilter_id={'01'}
      x600={x600}
      onClose={handleBiofilterBlowerModalClosed}
      blower_label={'Blower 1'}
      hasSpeedControl={selectedBlowerHasSpeedControl}
      hasTurboMode={selectedBlowerHasTurboMode}
      facilityConfig={facilityConfig}
    />
  );
};

describe('BiofilterBlowerModal component', () => {
  it('includes all the stuff for blower that has speed control and turbo mode', () => {
    const wrapper = setUp(true,true,true);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Blower 1</h3>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Manual Control</strong></label>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Enable Turbo Mode</strong></label>');
    expect(html).toContain('<button class="btn">Cancel</button>');
    expect(html).toContain('<button class="btn btn-primary">Apply changes</button>');
    expect(wrapper.state().blowerOverride).toBeFalsy();
    let manualControlCheckbox = wrapper.find('input[type="checkbox"]').at(0);
    manualControlCheckbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().blowerOverride).toBeTruthy();
    expect(wrapper.state().blowerControl).toBeFalsy();
    html = wrapper.html();
    expect(html).toContain('<label class="control-label">Manual VFD speed:</label>');
    expect(html).toContain('<input type="number" name="blowerValue" min="20" max="100" value="">');
    expect(html).toContain('<label>Manual VFD status:</label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="on"> On</label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="off" checked=""> Off</label>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Enable Turbo Mode</strong></label>');
    let radioOptionOn = wrapper.find('input[type="radio"]').at(0);
    radioOptionOn.simulate('change', { target: { checked: true, value: radioOptionOn.instance().value } });
    expect(wrapper.state().blowerControl).toBeTruthy();
    expect(wrapper.state().turboModeEnabled).toBeFalsy();
    let manualVFDSpeedInput = wrapper.find('input[name="blowerValue"]');
    manualVFDSpeedInput.simulate('change', { target: { name: 'blowerValue', value: 40 } });
    expect(wrapper.state().values.blowerValue).toBe(40);
    let turboModeCheckbox = wrapper.find('input[type="checkbox"]').at(1);
    turboModeCheckbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().turboModeEnabled).toBeTruthy();
    html = wrapper.html();
    wrapper.instance().saveStateValues = jest.fn();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.instance().saveStateValues).toBeCalled();
  });

  it('includes all the stuff for blower that has speed control but no turbo mode', () => {
    const wrapper = setUp(true,true,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Blower 1</h3>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Manual Control</strong></label>');
    expect(html).not.toContain('<label class="checkbox"><input type="checkbox"><strong>Enable Turbo Mode</strong></label>');
    expect(html).toContain('<button class="btn">Cancel</button>');
    expect(html).toContain('<button class="btn btn-primary">Apply changes</button>');
    expect(wrapper.state().blowerOverride).toBeFalsy();
    let manualControlCheckbox = wrapper.find('input[type="checkbox"]').at(0);
    manualControlCheckbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().blowerOverride).toBeTruthy();
    expect(wrapper.state().blowerControl).toBeFalsy();
    html = wrapper.html();
    expect(html).toContain('<label class="control-label">Manual VFD speed:</label>');
    expect(html).toContain('<input type="number" name="blowerValue" min="20" max="100" value="">');
    expect(html).toContain('<label>Manual VFD status:</label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="on"> On</label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="off" checked=""> Off</label>');
    let radioOptionOn = wrapper.find('input[type="radio"]').at(0);
    radioOptionOn.simulate('change', { target: { checked: true, value: radioOptionOn.instance().value } });
    expect(wrapper.state().blowerControl).toBeTruthy();
    expect(wrapper.state().turboModeEnabled).toBeFalsy();
    let manualVFDSpeedInput = wrapper.find('input[name="blowerValue"]');
    manualVFDSpeedInput.simulate('change', { target: { name: 'blowerValue', value: 40 } });
    expect(wrapper.state().values.blowerValue).toBe(40);
    wrapper.instance().saveStateValues = jest.fn();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.instance().saveStateValues).toBeCalled();
  });

  it('includes all the stuff for blower that does not have speed control but has turbo mode', () => {
    const wrapper = setUp(true,false,true);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Blower 1</h3>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Manual Control</strong></label>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Enable Turbo Mode</strong></label>');
    expect(html).toContain('<button class="btn">Cancel</button>');
    expect(html).toContain('<button class="btn btn-primary">Apply changes</button>');
    expect(wrapper.state().blowerOverride).toBeFalsy();
    let manualControlCheckbox = wrapper.find('input[type="checkbox"]').at(0);
    manualControlCheckbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().blowerOverride).toBeTruthy();
    expect(wrapper.state().blowerControl).toBeFalsy();
    html = wrapper.html();
    expect(html).not.toContain('<label class="control-label">Manual VFD speed:</label>');
    expect(html).not.toContain('<input type="number" name="blowerValue" min="20" max="100" value="">');
    expect(html).not.toContain('<label>Manual VFD status:</label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="on"> On</label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="off" checked=""> Off</label>');
    let turboModeCheckbox = wrapper.find('input[type="checkbox"]').at(1);
    turboModeCheckbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().turboModeEnabled).toBeTruthy();
    html = wrapper.html();
    wrapper.instance().saveStateValues = jest.fn();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.instance().saveStateValues).toBeCalled();
  });
});
