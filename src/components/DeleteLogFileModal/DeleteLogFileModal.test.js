import 'jest-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import '../../enzyme-setup';

import DeleteLogFileModal from './DeleteLogFileModal';
import X600Mock from '../../helpers/X600/X600Mock';

describe('DeleteLogFileModal component', () => {
  it('includes all the stuff', () => {
    const handleDeleteLogFileModalClosed = jest.fn();
    let x600 = new X600Mock();
    const wrapper = mount(
      <DeleteLogFileModal
      show={true}
      onClose={handleDeleteLogFileModalClosed}
      batch_title={'Batch 1'}
      filename={'/usb/06_21_2017_zone01.csv'}
      x600={x600}
      />
    );
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Delete Batch Log File</h3>');
    expect(html).toContain('Are you sure you want to delete /usb/06_21_2017_zone01.csv?');
    expect(html).toContain('<button class="btn btn-default">Cancel</button>');
    expect(html).toContain('<button class="btn btn-danger">Delete</button>');
    wrapper.state().x600.deleteBatchFile = jest.fn();
    wrapper.instance().handleDeleteFileComplete = jest.fn();
    wrapper.find('button[children="Delete"]').simulate('click');
    expect(wrapper.state().x600.deleteBatchFile).toBeCalledWith(wrapper.state().filename, wrapper.instance().handleDeleteFileComplete);
  });
});
