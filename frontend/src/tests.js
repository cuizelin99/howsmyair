
import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Locations from '../pages/locations/Locations'
import Illnesses from '../pages/illnesses/Illnesses'
import Pollutants from '../pages/pollutants/Pollutants'
import Home from '../App';
import NavBar from '../NavBar';

var assert = require('assert');
//const app = require('../app');
const Navbar = require('../NavBar');

//Sample test
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


describe('<NavBar/>', function () {
  it('Navigation Bar contains Home', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Home')).to.have.length(1);
  });

  it('Navigation Bar contains Locations', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Locations')).to.have.length(1);
  });

  it('Navigation Bar contains Pollutants', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Pollutants')).to.have.length(1);
  });

  it('Navigation Bar contains Illnesses', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Illnesses')).to.have.length(1);
  });

  it('Navigation Bar contains About', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('About')).to.have.length(1);
  });

});
