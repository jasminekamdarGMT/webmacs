import 'jest-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import '../../enzyme-setup';

import BlowerModal from './BlowerModal';
import X600Mock from '../../helpers/X600/X600Mock';
import facilityConfig from '../../helpers/test/facility-configs/blower-has-speed-control-and-custom-cycle-control.js';
import zoneStartupData from '../../../facilities/single_direction/salinas/mocks/zone_startup.json';
import batchFiles from '../../../facilities/single_direction/salinas/mocks/batch_files.json';

function setUp(showBlowerModal,selectedBlowerHasSpeedControl,selectedBlowerHasCustomCycleControl) {
  const handleBlowerModalClosed = jest.fn();
  let x600 = new X600Mock();
  x600.handleLoadZoneStartupDataCallback(JSON.stringify(zoneStartupData));
  x600.handleLoadBatchFilesCallback(JSON.stringify(batchFiles));
  return mount(
    <BlowerModal
      show={showBlowerModal}
      blower_id={'01'}
      x600={x600}
      onClose={handleBlowerModalClosed}
      blower_label={'Blower 1'}
      hasSpeedControl={selectedBlowerHasSpeedControl}
      hasCustomCycleControl={selectedBlowerHasCustomCycleControl}
      facilityConfig={facilityConfig}
    />
  );
};

describe('BlowerModal component', () => {
  it('includes all the stuff for blower that has speed control and has custom cycle control', () => {
    const wrapper = setUp(true,true,true);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Blower 1</h3>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Manual Control</strong></label>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Custom Cycle Times</strong></label>');
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
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Custom Cycle Times</strong></label>');
    let radioOptionOn = wrapper.find('input[type="radio"]').at(0);
    radioOptionOn.simulate('change', { target: { checked: true, value: radioOptionOn.instance().value } });
    expect(wrapper.state().blowerControl).toBeTruthy();
    expect(wrapper.state().customCycle).toBeFalsy();
    let manualVFDSpeedInput = wrapper.find('input[name="blowerValue"]');
    manualVFDSpeedInput.simulate('change', { target: { name: 'blowerValue', value: 40 } });
    expect(wrapper.state().values.blowerValue).toBe(40);
    let customCycleTimesCheckbox = wrapper.find('input[type="checkbox"]').at(1);
    customCycleTimesCheckbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().customCycle).toBeTruthy();
    html = wrapper.html();
    expect(html).toContain('<div class="control-group"><label class="control-label">Blower On Time (each cycle):</label><div class="input-append"><input type="number" name="cycleOnTime" min="0" max="100" value=""><span class="add-on">Minutes</span></div></div>');
    expect(html).toContain('<div class="control-group"><label class="control-label">Blower Off Time (each cycle):</label><div class="input-append"><input type="number" name="cycleOffTime" min="0" max="100" value=""><span class="add-on">Minutes</span></div>');
    let cycleOnTimeInput = wrapper.find('input[name="cycleOnTime"]');
    cycleOnTimeInput.simulate('change', { target: { name: 'cycleOnTime', value: 30 } });
    expect(wrapper.state().values.cycleOnTime).toBe(30);
    let cycleOffTimeInput = wrapper.find('input[name="cycleOffTime"]');
    cycleOffTimeInput.simulate('change', { target: { name: 'cycleOffTime', value: 10 } });
    expect(wrapper.state().values.cycleOffTime).toBe(10);
    wrapper.instance().saveStateValues = jest.fn();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.instance().saveStateValues).toBeCalled();
  });

  it('includes all the stuff for blower that has speed control but no custom cycle control', () => {
    const wrapper = setUp(true,true,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Blower 1</h3>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Manual Control</strong></label>');
    expect(html).not.toContain('<label class="checkbox"><input type="checkbox"><strong>Custom Cycle Times</strong></label>');
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
    expect(wrapper.state().customCycle).toBeFalsy();
    let manualVFDSpeedInput = wrapper.find('input[name="blowerValue"]');
    manualVFDSpeedInput.simulate('change', { target: { name: 'blowerValue', value: 40 } });
    expect(wrapper.state().values.blowerValue).toBe(40);
    wrapper.instance().saveStateValues = jest.fn();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.instance().saveStateValues).toBeCalled();
  });

  it('includes all the stuff for blower that does not have speed control but has custom cycle control', () => {
    const wrapper = setUp(true,false,true);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Blower 1</h3>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Manual Control</strong></label>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"><strong>Custom Cycle Times</strong></label>');
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
    let customCycleTimesCheckbox = wrapper.find('input[type="checkbox"]').at(1);
    customCycleTimesCheckbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().customCycle).toBeTruthy();
    html = wrapper.html();
    expect(html).toContain('<div class="control-group"><label class="control-label">Blower On Time (each cycle):</label><div class="input-append"><input type="number" name="cycleOnTime" min="0" max="100" value=""><span class="add-on">Minutes</span></div></div>');
    expect(html).toContain('<div class="control-group"><label class="control-label">Blower Off Time (each cycle):</label><div class="input-append"><input type="number" name="cycleOffTime" min="0" max="100" value=""><span class="add-on">Minutes</span></div>');
    let cycleOnTimeInput = wrapper.find('input[name="cycleOnTime"]');
    cycleOnTimeInput.simulate('change', { target: { name: 'cycleOnTime', value: 30 } });
    expect(wrapper.state().values.cycleOnTime).toBe(30);
    let cycleOffTimeInput = wrapper.find('input[name="cycleOffTime"]');
    cycleOffTimeInput.simulate('change', { target: { name: 'cycleOffTime', value: 10 } });
    expect(wrapper.state().values.cycleOffTime).toBe(10);
    wrapper.instance().saveStateValues = jest.fn();
    wrapper.find('button[children="Apply changes"]').simulate('click');
    expect(wrapper.instance().saveStateValues).toBeCalled();
  });
});
