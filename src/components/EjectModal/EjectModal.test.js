import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import EjectModal from './EjectModal';
import X600Mock from '../../helpers/X600/X600Mock';

describe('EjectModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<EjectModal show={true} x600={new X600Mock()} />);
    expect(wrapper).toBeTruthy();
  });

  it('includes all the stuff', () => {
    const wrapper = mount(<EjectModal show={true} x600={new X600Mock()} />);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Eject External Storage</h3>');
    expect(html).toContain('Continuing will stop all batches and logging.');
    expect(html).toContain('Would you like to continue?');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).toContain('<button class="btn btn-primary">Continue</button>');
    wrapper.find('button[children="Continue"]').simulate('click');
    expect(wrapper.state().isEjecting).toBeTruthy();
  });

  it('includes all the stuff when external storage is ejecting', () => {
    const wrapper = mount(<EjectModal show={true} x600={new X600Mock()} />);
    wrapper.setState({ isEjecting: true });
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Eject External Storage</h3>');
    expect(html).toContain('Ejecting external storage. Please wait.');
    expect(html).not.toContain('<button class="btn">Close</button>');
  });

  it('includes all the stuff when external storage is ejected', () => {
    const wrapper = mount(<EjectModal show={true} x600={new X600Mock()} />);
    wrapper.setState({ isEjected: true });
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Eject External Storage</h3>');
    expect(html).toContain('External storage has been ejected.');
    expect(html).toContain('To resume normal operation, the external storage drive will need to be reconnected.');
    expect(html).toContain('Two power cycles may be necessary to resume normal operation.');
    expect(html).toContain('<button class="btn">Close</button>');
  });

  it('includes all the stuff when ejection error occurs', () => {
    const wrapper = mount(<EjectModal show={true} x600={new X600Mock()} />);
    wrapper.setState({ ejectionError: true });
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3>Eject External Storage</h3>');
    expect(html).toContain('An error occurred while trying to eject the external storage.');
    expect(html).toContain('<button class="btn">Close</button>');
  });
});
