import 'jest-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import '../../enzyme-setup';

import BatchModal from '../BatchModal/BatchModal';
import X600Mock from '../../helpers/X600/X600Mock';

import facilityConfig from '../../helpers/test/facility-configs/reversing-aeration-direction-system.js';
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

function setUpX600(zoneStartup) {
  let x600 = new X600Mock();
  x600.handleLoadZoneStartupDataCallback(JSON.stringify(zoneStartup));
  return x600;
}

function setUpMount(x600,show,isNewBatch,isEndingBatch) {
  const handleBatchModalClosed = jest.fn();
  x600.handleLoadBatchFilesCallback(JSON.stringify(batchFiles));
  return mount(
    <BatchModal
      x600={x600}
      show={show}
      zone_id={'01'}
      isNewBatch={isNewBatch}
      isEndingBatch={isEndingBatch}
      onClose={handleBatchModalClosed}
      facilityConfig={facilityConfig}
    />);
}

describe('BatchModal component', () => {
  it('includes all the stuff for Start New Batch', () => {
    for (var i in zoneStartupData) {
      if (zoneStartupData[i].name == 'zone01batch') {
        zoneStartupData[i].state = '';
        break;
      }
    }
    let zoneStartup = zoneStartupData;
    let x600 = setUpX600(zoneStartup);
    const wrapper = setUpMount(x600,true,true,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3 id="zone-control-title">Zone 1 - Start New Batch </h3>');
    expect(html).toContain('<div>Batch Name:<br><input type="text" value=""></div>');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).toContain('<button class="btn btn-primary" disabled="">Start New Batch</button>');
    let batchNameInput = wrapper.find('input');
    batchNameInput.instance().value = 'testbatch1';
    batchNameInput.simulate('change');
    html = wrapper.html();
    expect(html).toContain('<button class="btn btn-primary">Start New Batch</button>');
    wrapper.find('button[children="Start New Batch"]').simulate('click');
    expect(wrapper.state().x600.zoneStartupData['01'].batchTitle).toBe('testbatch1');
  });

  it('includes all the stuff for Move Batch when all zones have associated batches', () => {
    for (var i in zoneStartupData) {
      if (zoneStartupData[i].name == 'zone01batch') {
        zoneStartupData[i].state = '07_30_2017_zone01.csv';
        break;
      }
    }
    let zoneStartup = zoneStartupData;
    let x600 = setUpX600(zoneStartup);
    const wrapper = setUpMount(x600,true,false,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3 id="zone-control-title">Zone 1 - Move Batch 07_30_2017_zone01.csv</h3>');
    expect(html).toContain('<div><h3>All zones currently have associated batches.</h3> Please End Batch in the zone you would like to move this batch to and try again.</div>');
    expect(html).toContain('<button class="btn">Close</button>');
  });

  it('includes all the stuff for Move Batch when not all zones have associated batches', () => {
    for (var i in zoneStartupData) {
      if (zoneStartupData[i].name === 'zone01batch') {
        zoneStartupData[i].state = 'testbatch1';
      }
      if (zoneStartupData[i].name != 'zone01batch' &&
          zoneStartupData[i].name.match(/zone..batch/)) {
        zoneStartupData[i].state = '';
      }
      if (zoneStartupData[i].name === 'zone01control') {
        zoneStartupData[i].state = '1';
      }
      if (zoneStartupData[i].name != 'zone01control' &&
          zoneStartupData[i].name.match(/zone..control/)) {
        zoneStartupData[i].state = '0';
      }
    }
    let zoneStartup = zoneStartupData;
    let x600 = setUpX600(zoneStartup);
    x600.currentData = {
      'zone01control': 1,
      'zone02control': 0,
      'zone03control': 0,
      'zone04control': 0,
      'zone05control': 0,
      'zone06control': 0,
      'zone07control': 0,
      'zone08control': 0,
      'zone01moveto': 0,
      'zone02moveto': 0,
      'zone03moveto': 0,
      'zone04moveto': 0,
      'zone05moveto': 0,
      'zone06moveto': 0,
      'zone07moveto': 0,
      'zone08moveto': 0
    }
    const wrapper = setUpMount(x600,true,false,false);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3 id="zone-control-title">Zone 1 - Move Batch testbatch1</h3>');
    expect(html).toContain('<div style=\"margin-left: 10px;\"><div>Click <b>Move Batch</b> to move batch <b>testbatch1</b> to the selected zone.</div></div>');
    expect(html).toContain('<div class="zone-card well"><h3>Zone 2</h3></div>');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).toContain('<button class="btn btn-primary">Move Batch</button>');
    wrapper.find('h3[children="Zone 2"]').simulate('click');
    html = wrapper.html();
    expect(html).toContain('<div class="zone-card well selected-zone"><h3>Zone 2</h3></div>');
    wrapper.find('button[children="Move Batch"]').simulate('click');
    expect(wrapper.state().x600.zoneStartupData['01'].batchTitle).toBe('');
    expect(wrapper.state().x600.zoneStartupData['02'].batchTitle).toBe('testbatch1');
  });

  it('includes all the stuff for End Batch', () => {
    let zoneStartup = zoneStartupData;
    let x600 = setUpX600(zoneStartup);
    const wrapper = setUpMount(x600,true,false,true);
    expect(wrapper).toBeTruthy();
    let html = wrapper.html();
    expect(html).toContain('<h3 id=\"zone-control-title\">Zone 1 - End Batch testbatch1</h3>');
    expect(html).toContain('<div class=\"modal-body\" style=\"min-height: 50vh;\">Are you sure want to end batch <b>testbatch1</b> in this zone?</div>');
    expect(html).toContain('<button class="btn">Close</button>');
    expect(html).toContain('<button class=\"btn btn-primary\">End Batch</button>');
  });
});
