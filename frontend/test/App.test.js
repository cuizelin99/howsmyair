import 'jsdom-global/register';
import React, { Component } from 'react';
import { configure, shallow, render, mount} from 'enzyme';
import chai, { expect } from 'chai';
import Home from '../src/App.js';
import NavBar from '../src/NavBar.js'
import chaiEnzyme from 'chai-enzyme';

import 'bootstrap/dist/css/bootstrap.css';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText, CardHeader,
         CardDeck, CardColumns, CardSubtitle, CardBody , NavLink, UncontrolledCarousel,
         Form,FormGroup, Label, Input, FormText} from 'reactstrap';
import { Image, Col, Row, Pagination} from 'react-bootstrap';
import { BrowserRouter as BrowserRouter, Router, Route, Link , Switch,BrowserHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination';
import ReactDOM from 'react-dom';
import Illness from '../src/pages/illnesses/Illnesses';
import Illnesses from '../src/pages/illnesses/Illnesses';
import IllnessInstance,{RelatedIllness} from '../src/pages/illnesses/IllnessInstance';
import Pollutants from '../src/pages/pollutants/Pollutants';
import Pollutant from '../src/pages/pollutants/Pollutants';
import PollutantInstance, {RelatedPollutants} from '../src/pages/pollutants/PollutantInstance';
import Locations from '../src/pages/locations/Locations';
import Location from '../src/pages/locations/Locations';
import LocationInstance, {RelatedLocations} from '../src/pages/locations/LocationInstance';
import {Search} from '../src/pages/Search';
import LocationResults from '../src/pages/Search';
import IllnessResults from '../src/pages/Search';
import PollutantResults from '../src/pages/Search';
import Highlighter from 'react-highlight-words';

import Adapter from 'enzyme-adapter-react-16';



configure({ adapter: new Adapter() });

// describe('App Component testing', function() {

//   it('App renders main message', () => {
//     const wrapper = shallow(<Home />);
//     const editText = <p>Edit <code>src/App.js</code> and save to reload.</p>;
//     expect(wrapper).to.contain(editText);

// });

//NavBar tests
  describe('<NavBar/>', function () {
  it('Navigation Bar contains Home', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Home'));
  });

  it('Navigation Bar contains Locations', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Locations'));
  });

  it('Navigation Bar contains Pollutants', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Pollutants'));
  });

  it('Navigation Bar contains Illnesses', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('Illnesses'));
  });

  it('Navigation Bar contains About', function () {
    const wrapper = shallow(<NavBar/>);
    expect(wrapper.find('About'));
  });

  chai.use(chaiEnzyme())
});

//Illnesses tests
// describe('tests for Illnesses page', () => {
//   it('renders Illnesses page', () => {
//     const wrapper = shallow(<Illnesses />);
//     expect(wrapper.find('Illnesses')).to.have.lengthOf(1)
//
//   });
//
//   it('renders Illness component', () => {
//     const wrapper =shallow(<Illness />);
//     expect(wrapper.exists()).toBe(true);
//   });
//   it('has DropDownButtons on page', () => {
//     const wrapper = shallow(<Illness />);
//     expect(wrapper.find('DropdownButton')).to.not.have.lengthOf(0);
//   });
//
//   chai.use(chaiEnzyme())
//   // it('has filter on page', () => {
//   //   const wrapper = mount(<BrowserRouter><Illnesses /></BrowserRouter>);
//   //   expect(wrapper.find('StateFilter')).to.have.lengthOf(1);
//   // });
// });

//Illness Instance Page tests
describe('tests for Illness Instance page', () => {
  it('renders Illness Instance page', () => {
    const wrapper = shallow(<IllnessInstance />);
    expect(wrapper.find('IllnessInstance'));
  });

  it('has lethality description', () => {
    const wrapper = shallow(<IllnessInstance />);
    expect(wrapper.find('Lethality'));
  });

  it('has Symptoms description', () => {
    const wrapper = shallow(<IllnessInstance />);
    expect(wrapper.find('Symptoms'));
  });

  it('has Contagious description', () => {
    const wrapper = shallow(<IllnessInstance />);
    expect(wrapper.find('Contagious'));
  });

  it('has Treatable description', () => {
    const wrapper = shallow(<IllnessInstance />);
    expect(wrapper.find('Treatable'));
  });

  it('image renders', () => {
    const wrapper = shallow(<CardImg />);
    expect(wrapper.find('img')).to.have.length(1);
   });
  chai.use(chaiEnzyme())
});

//Pollutant Instance Page tests
describe('tests for Pollutant Instance page', () => {
  it('renders Pollutants Instance page', () => {
    const wrapper = shallow(<PollutantInstance />);
    expect(wrapper.find('PollutantInstance'));
  });

  it('has Potency description', () => {
    const wrapper = shallow(<PollutantInstance />);
    expect(wrapper.find('Potency'));
  });

  it('has Source description', () => {
    const wrapper = shallow(<PollutantInstance />);
    expect(wrapper.find('Source'));
  });

  it('has Concentration description', () => {
    const wrapper = shallow(<PollutantInstance />);
    expect(wrapper.find('Concentration'));
  });

  it('has Standard description', () => {
    const wrapper = shallow(<PollutantInstance />);
    expect(wrapper.find('Standard'));
  });

  it('image renders', () => {
    const wrapper = shallow(<CardImg />);
    expect(wrapper.find('img')).to.have.length(1);
   });
  chai.use(chaiEnzyme())
});


// Location model tests
describe('tests for Location Instance page', () => {
  it('renders Location Instance', () => {
    const wrapper = shallow(<LocationInstance />);
    expect(wrapper.find('LocationInstance'));
  });

  it('renders Related Location', () => {
    const wrapper = shallow(<RelatedLocations />);
    expect(wrapper.find('RelatedLocations'));
  });


  it('has County description', () => {
    const wrapper = shallow(<LocationInstance />);
    expect(wrapper.find('County'));
  });

  it('has Latitude description', () => {
    const wrapper = shallow(<LocationInstance />);
    expect(wrapper.find('Latitude'));
  });

  it('has Longitude description', () => {
    const wrapper = shallow(<LocationInstance />);
    expect(wrapper.find('Longitude'));
  });

  it('has Population description', () => {
    const wrapper = shallow(<LocationInstance />);
    expect(wrapper.find('Population'));
  });

  it('has Density description', () => {
    const wrapper = shallow(<LocationInstance />);
    expect(wrapper.find('Density'));
  });

  it('has Time Zone description', () => {
    const wrapper = shallow(<LocationInstance />);
    expect(wrapper.find('Time Zone'));
  });

  it('image renders', () => {
    const wrapper = shallow(<CardImg />);
    expect(wrapper.find('img')).to.have.length(1);
   });

  chai.use(chaiEnzyme())
});

//Search Page tests
describe('tests for Search page', () => {
  it('renders has a Search component', () => {
    const wrapper = shallow(<BrowserRouter><Search searchstring = "re"/></BrowserRouter>);
    expect(wrapper.find('Search'));
    expect(wrapper.find('IllnessResults'));
    expect(wrapper.find('LocationResults'));
    expect(wrapper.find('IllnessResults'));
  });



  chai.use(chaiEnzyme())
});

//Location Page tests
describe('tests for Locations page', () => {
   describe('<Locations>', () => {
      it('component renders', () => {
        const wrapper = shallow(<BrowserRouter><Locations /></BrowserRouter>);
        expect(wrapper.exists());
      });
    });

   describe('<Location>', () => {
      it('component renders', () => {
         const wrapper = shallow(<BrowserRouter><Location /></BrowserRouter>);
         expect(wrapper.exists());
      });
   });
});

//Illness Page tests
describe('tests for Illnesses page', () => {
   describe('<Illnesses>', () => {
      it('component Illnesses renders', () => {
        const wrapper = shallow(<BrowserRouter><Illnesses /></BrowserRouter>);
        expect(wrapper.exists());
      });
    });

   describe('<Illness>', () => {
      it('component Illness renders', () => {
         const wrapper = shallow(<BrowserRouter><Illness /></BrowserRouter>);
         expect(wrapper.exists());
      });
   });
});

//Pollutant Page tests
describe('tests for Pollutants page', () => {
   describe('<Illnesses>', () => {
      it('component Pollutants renders', () => {
        const wrapper = shallow(<BrowserRouter><Pollutants /></BrowserRouter>);
        expect(wrapper.exists());
      });
    });

   describe('<Pollutant>', () => {
      it('component Pollutant renders', () => {
         const wrapper = shallow(<BrowserRouter><Pollutant /></BrowserRouter>);
         expect(wrapper.exists());
      });
   });
});

// });
 // describe('buildFilter(fieldname, operator, value)', function() {
 //   it('should build a url to a filtered locations JSON', function() {
 //      expect(buildFilter("city", "eq", "Rochester")).toBe('{%22name%22:%22city%22,%22op%22:%22eq%22,%22val%22:%22Rochester%22}');
 //   });
 // });
