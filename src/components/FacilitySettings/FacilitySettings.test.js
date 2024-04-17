import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import FacilitySettings from './FacilitySettings';
import X600Mock from '../../helpers/X600/X600Mock';
import facilityConfig from '../../helpers/test/facility-configs/blower-has-speed-control-and-custom-cycle-control.js';

const temperatureUnit = facilityConfig.temperatureUnit;

const settingsGroups = [
    {
        groupName: 'regime',
        groupLabel: 'Regime Control',
        groupTitle: 'Regime Settings',
        groupSettings: [
            {
                settingName: 'Regime1TempSetPoint',
                settingLabel: 'Regime 1 Temp Set Point',
                settingUnit: temperatureUnit,
                settingType: 'number',
                settingMin: 0,
                settingMax: 180
            }
        ],
        groupAdvancedLabel: 'Advanced PID Settings',
        groupAvancedSettings: [
            {
                settingName: 'DamperGain',
                settingLabel: 'Damper Gain',
                settingType: 'number',
                settingMin: 0.1,
                settingMax: 2,
                settingIncrementStep: .1,
            }
        ]
    },
    {
        groupName: 'admin',
        groupLabel: 'Administration',
        groupTitle: 'Administration Settings',
        groupSettings: [
            {
                settingName: 'FacilityName',
                settingLabel: 'Facility Name',
                settingType: 'string'
            }
        ]
    }
];

describe('FacilitySettings component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <FacilitySettings
        settingsGroups={settingsGroups}
        x600={new X600Mock()}
        facilityConfig={facilityConfig}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it('includes all the facility settings stuff', () => {
    const wrapper = mount(
      <FacilitySettings
        settingsGroups={settingsGroups}
        x600={new X600Mock()}
        facilityConfig={facilityConfig}
      />
    );
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<li class="active"><a href="#regimeSettingsPane" data-toggle="tab">Regime Control</a></li>');
    expect(html).toContain('<li class=""><a href="#adminSettingsPane" data-toggle="tab">Administration</a></li>');
    expect(html).toContain('<div class="tab-pane active" id="regimeSettingsPane"><fieldset><legend>Regime Settings</legend>');
    expect(html).toContain('<label class="control-label" for="Regime1TempSetPoint">Regime 1 Temp Set Point<div class="settings-tooltip"><span><i class="icon-question-sign"></i></span><div class="settings-tooltiptext">Target temperature setpoint for a zone that is in the warmup regime</div></div></label>');
    expect(html).toContain('<div class="controls input-append"><input id="Regime1TempSetPoint" min="0" max="180" type="number" value=""><span class="add-on">°F</span></div>');
    expect(html).toContain('<button class="btn btn-primary">Save Regime Settings</button>');
    expect(html).toContain('<div class="tab-pane" id="adminSettingsPane"><fieldset><legend>Administration Settings</legend>');
    expect(html).toContain('<label class="control-label" for="FacilityName">Facility Name<div class="settings-tooltip"><span><i class="icon-question-sign"></i></span><div class="settings-tooltiptext">Name of facility</div></div></label>');
    expect(html).toContain('<input id="FacilityName" type="text" value="">');
    expect(html).toContain('<button class="btn btn-primary">Save Administration Settings</button>');
    wrapper.state().x600.saveSettingsValues = jest.fn();
    let button = wrapper.find('button').first();
    button.simulate('click');
    expect(wrapper.state().x600.saveSettingsValues).toBeCalled();
  });
});
