import React from 'react';
import logo from './logo.svg';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Container, Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody
  } from 'reactstrap';
import { Form, FormControl } from "react-bootstrap"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SketchPicker } from 'react-color';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Locations } from './pages/locations/Locations'
import { Location } from './pages/locations/LocationInstance'
import { Illnesses } from './pages/illnesses/Illnesses'
import { Illness } from './pages/illnesses/IllnessInstance'
import { Pollutants } from './pages/pollutants/Pollutants'
import { Pollutant } from './pages/pollutants/PollutantInstance'
import {Search} from './pages/Search'
import Visualizations from './pages/Visualizations'
import About from './pages/About'
import Home from './App';
import AirLogo from './assets/airlogo.png'

export default class NavBar extends React.Component {

  state = {
    searchstring: null
  }

  handleChange = event => {
    this.setState({searchstring: event.target.value })
  }

  render(){
    return (
        <Router>
          <Navbar className="navibar" >

            <NavbarBrand href="/" className="logo">
            <img src={AirLogo} width="36" height="36"
               alt="logo" className="d-inline-block align-center" style={{ marginRight: '0.5rem' }} />

              {' How\'s my air?'}
            </NavbarBrand>
              <Nav pills>
                <NavItem>
                  <NavLink href="/Locations">Locations</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Illnesses">Illnesses</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Pollutants">Pollutants</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Visualizations">Visuals</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/About">About</NavLink>
                </NavItem>
              <Form inline>
                {/*Have this also work on pressing the Enter key*/}
                <FormControl type="text" placeholder="Search" className="mr-sm-2"
                onChange = {this.handleChange}/>
                <Button variant="outline-info" href={"/Search/"+this.state.searchstring}>
                  Search
                </Button>
              </Form>
              </Nav>
          </Navbar>
        <Route exact path="/" component={Home} />
        <Route path="/Locations" component={Locations} />
        <Route path="/Location/:key" component={Location} />
        <Route path="/Pollutants" component={Pollutants} />
        <Route path="/Pollutant/:key" component={Pollutant} />
        <Route path="/Illnesses" component={Illnesses} />
        <Route path="/Illness/:key" component={Illness} />
        <Route path="/Visualizations" component={Visualizations} />
        <Route path="/About" component={About} />
        <Route path="/Search/:key" component={Search} />
        </Router>
    );
  }
}
