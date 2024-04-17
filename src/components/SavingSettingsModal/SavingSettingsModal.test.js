import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import SavingSettingsModal from './SavingSettingsModal';
import X600Mock from '../../helpers/X600/X600Mock';

let unsavedValues = {
  Regime1TempSetPoint: "131",
  Regime1Duration: "5",
  Regime2TempSetPoint: "144",
  Regime2Duration: "7",
  Regime3TempSetPoint: "134"
};

let unsavedGroupTitle = "Regime Settings";

describe('SavingSettingsModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SavingSettingsModal show={true} x600={new X600Mock()} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff when no settings values are updated', () => {
    const wrapper = mount(<SavingSettingsModal show={true} x600={new X600Mock()} />);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Saving </h3>');
    expect(html).toContain('No updated values to save.');
    expect(html).toContain('<button class="btn btn-primary">Okay</button>');
  });

  it('includes all the stuff when settings values are updated', () => {
    const wrapper = mount(
      <SavingSettingsModal
        show={true}
        unsavedValues={unsavedValues}
        groupTitle={unsavedGroupTitle}
        x600={new X600Mock()} />
      );
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Saving Regime Settings</h3>');
    expect(html).toContain('Regime Settings saved successfully!');
    expect(html).toContain('<button class="btn btn-primary">Okay</button>');
  });
});
