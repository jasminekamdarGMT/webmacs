import 'jest-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../enzyme-setup';

import ZoneModal from './ZoneModal';
import X600Mock from '../../helpers/X600/X600Mock';
import batchFiles from '../../../facilities/h_damper_reversing/grimms_fuel_expansion/mocks/batch_files.json';

let zoneStartupData = [
  {"id":"1","name":"zone01control","state":"0"},
  {"id":"2","name":"zone02control","state":"0"},
  {"id":"3","name":"zone03control","state":"0"},
  {"id":"4","name":"zone04control","state":"0"},
  {"id":"5","name":"zone05control","state":"0"},
  {"id":"6","name":"zone06control","state":"0"},
  {"id":"7","name":"zone07control","state":"0"},
  {"id":"8","name":"zone08control","state":"0"},
  {"id":"9","name":"zone01batch","state":"07_30_2017_zone01.csv"},
  {"id":"10","name":"zone02batch","state":"07_29_2017_zone02.csv"},
  {"id":"11","name":"zone03batch","state":"07_29_2017_zone03.csv"},
  {"id":"12","name":"zone04batch","state":"07_29_2017_zone04.csv"},
  {"id":"13","name":"zone05batch","state":"07_29_2017_zone05.csv"},
  {"id":"14","name":"zone06batch","state":"07_29_2017_zone06.csv"},
  {"id":"15","name":"zone07batch","state":"07_29_2017_zone07.csv"},
  {"id":"16","name":"zone08batch","state":"07_29_2017_zone08.csv"}
];

let facilityConfig = {
  temperatureUnit: '°C'
};

function setUp(
  facilityConfig, showZoneModal, hasDamperControl, hasLoadZoneFeature,
  override, batchStarted, zoneControl
) {
  const handleZoneModalClosed = jest.fn();
  let x600 = new X600Mock();
  x600.setIOValue('damper01override', override);
  if (batchStarted) {
    x600.setIOValue('zone01control', zoneControl);
    x600.handleLoadZoneStartupDataCallback(JSON.stringify(zoneStartupData));
    x600.handleLoadBatchFilesCallback(JSON.stringify(batchFiles));
  }
  return mount(
    <ZoneModal
      show={showZoneModal}
      zone_id={'01'}
      damper_id={'01'}
      x600={x600}
      onClose={handleZoneModalClosed}
      blower_label={'Blower 1'}
      hasDamperControl={hasDamperControl}
      hasLoadZoneFeature={hasLoadZoneFeature}
      facilityConfig={facilityConfig}
    />
  );
};

describe('ZoneModal component', () => {
  // Batch has not been started
  it('includes all the basic stuff', () => {
    let wrapper = setUp(facilityConfig,true,false,false,0,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<button class="btn btn-success">Start New Batch</button>');
    expect(html).not.toContain('<button class="btn btn-info">Load Zone</button>');
    expect(html).not.toContain('<label class="checkbox"><input type="checkbox"> Manual Control</label>');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).not.toContain('<button class="btn btn-primary">Apply damper settings</button>');
  });
  it('includes all the damper control stuff', () => {
    let wrapper = setUp(facilityConfig,true,true,false,0,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<button class="btn btn-success">Start New Batch</button>');
    expect(html).not.toContain('<button class="btn btn-info">Load Zone</button>');
    expect(html).toContain('<label class="checkbox"><input type="checkbox"> Manual Control</label>');
    expect(html).not.toContain('<label class="control-label">Manual damper position:</label>');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).toContain('<button class="btn btn-primary">Apply damper settings</button>');

    wrapper = setUp(facilityConfig,true,true,false,1,false)
    html = wrapper.html();
    expect(wrapper.state('damperOverride')).toEqual(true);
    expect(html).toContain('<label class="control-label">Manual damper position:</label>');
  });
  it('includes all the load zone stuff', () => {
    let wrapper = setUp(facilityConfig,true,false,true,0,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<button class="btn btn-success">Start New Batch</button>');
    expect(html).toContain('<button class="btn btn-info">Load Zone</button>');
    expect(html).not.toContain('<label class="checkbox"><input type="checkbox"> Manual Control</label>');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).not.toContain('<button class="btn btn-primary">Apply damper settings</button>');
  });
  //Batch has been started
  it('includes all the batch started stuff', () => {
    let wrapper = setUp(facilityConfig,true,false,true,0,true,1);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<button class="btn btn-info">Pause Batch</button>');
    expect(html).not.toContain('<button class="btn btn-success">Resume Batch</button>');
    expect(html).toContain('<button class="btn btn-secondary">Move Batch</button>');
    expect(html).toContain('<button class="btn btn-danger">End Batch</button>');
    expect(html).toContain('<button class="btn btn-default pull-right">View Graph</button>');
    expect(html).toContain('<button class="btn">Close</button>');

    wrapper = setUp(facilityConfig,true,false,true,0,true,0);
    expect(wrapper).toBeTruthy();
    html = wrapper.html();
    expect(html).not.toContain('<button class="btn btn-info">Pause Batch</button>');
    expect(html).toContain('<button class="btn btn-success">Resume Batch</button>');
    expect(html).toContain('<button class="btn btn-secondary">Move Batch</button>');
    expect(html).toContain('<button class="btn btn-danger">End Batch</button>');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).not.toContain('<button class="btn btn-default pull-right">View Graph</button>');

    expect(html).not.toContain('<button class="btn btn-success">Start New Batch</button>');
    expect(html).not.toContain('<button class="btn btn-info">Load Zone</button>');
    expect(html).not.toContain('<label class="checkbox"><input type="checkbox"> Manual Control</label>');
    expect(html).not.toContain('<button class="btn btn-primary">Apply damper settings</button>');
  });
  it('includes all the locational regime control stuff', () => {
    let config = {
      temperatureUnit: '°C',
      hasLocationalRegimeControl: true
    };
    let wrapper = setUp(config,true,false,true,0,false,true);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('h4>Regime Control Settings</h4>');
    expect(html).toContain('<label><strong>Locational Regime Control:</strong></label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="warmup"> Warm Up Regime</label>');
    expect(html).toContain('<label class="radio inline"><input type="radio" value="pfrp"> PFRP &amp; VAR Regimes</label>');
  });
});
