import 'jest-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import '../../enzyme-setup';

import DrumRotationConfirmationModal from './DrumRotationConfirmationModal';
import X600Mock from '../../helpers/X600/X600Mock';

describe('DrumRotationConfirmationModal component', () => {
  it('includes all the stuff', () => {
    const handleDrumRotationConfirmationModalClosed = jest.fn();
    let x600 = new X600Mock();
    const wrapper = mount(
      <DrumRotationConfirmationModal
      show={true}
      onClose={handleDrumRotationConfirmationModalClosed}
      x600={x600}
      drumId={'01'}
      />
    );
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Drum 1 - Start Rotation</h3>');
    expect(html).toContain('<div class="modal-body">Ensure that drum is closed and ready before continuing. Start drum rotation now?</div>');
    expect(html).toContain('<button class="btn btn-default">Cancel</button>');
    expect(html).toContain('<button class="btn btn-success">Start Rotation</button>');
    wrapper.state().x600.set_drum_rotation_control_value = jest.fn();
    wrapper.find('button[children="Start Rotation"]').simulate('click');
    expect(wrapper.state().x600.set_drum_rotation_control_value).toBeCalledWith('01', true);
  });
});
