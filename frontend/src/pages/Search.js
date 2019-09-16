import React, { Component, useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText, CardHeader,
         CardDeck, CardColumns, CardSubtitle, CardBody , NavLink, UncontrolledCarousel,
         Form,FormGroup, Label, Input, FormText} from 'reactstrap';
import { Image, Col, Row, Pagination, Nav, Tabs, Tab, DropdownButton, Dropdown, ButtonToolbar, Table} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link , Switch, BrowserHistory } from 'react-router-dom';
import { Locations, LocationsController } from './locations/Locations'
import { LocationTable } from './locations/LocationItems'
import { Illnesses, IllnessesController } from './illnesses/Illnesses'
import { IllnessTable } from './illnesses/IllnessItems'
import { Pollutants, PollutantsController } from './pollutants/Pollutants'
import { PollutantTable } from './pollutants/PollutantItems'

import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import Highlighter from 'react-highlight-words';
/*
https://stackoverflow.com/questions/35976167/find-unique-values-from-an-array-in-react-js
*/

export class Search extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      searchstring : null
    };
  }

    componentDidMount() {
      const key = this.props.match.params;
    }

  render(){
    const {key} = this.props.match.params;
    return(
        <div>
        {/*Make tabs not look shitty*/}
        <Tabs justify = "center" style = {{color:"blue"}}>
          <Tab.Content eventKey="location" title="Location" >
            <LocationResults fieldname = "city" searchstring = {key}/>
          </Tab.Content>
          <Tab eventKey="illness" title="Illness">
            <IllnessResults fieldname = "illness_desc" searchstring = {key}/>
          </Tab>
          <Tab eventKey="pollutants" title="Pollutants">
            <PollutantResults fieldname = "chemical_name" searchstring = {key}/>
          </Tab>
          </Tabs>
          </div>
    );
  }
}

export class LocationResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchfield : "city",
      searchfieldDisplay : "City",
      locations : null
    }
  }

  componentDidMount(){
    this.setState({
      isloaded: true,
    })
  }

  setLocations = (objects) => {
    this.setState({
      locations : objects,
    })
  }
  render(){
    // really hacky but it works for calling back without infinite looping
    if (this.state.isloaded){
      return(
        <div>
          <br/>
          <row>
            <center>
              <DropdownButton id="dropdown-basic-button" title="Select Search Field">
                <Dropdown.Item onClick={() => {this.setState({ searchfield : "city", searchfieldDisplay : "City", isloaded : false});}}>
                  City
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {this.setState({ searchfield : "county_name", searchfieldDisplay : "County", isloaded : false});}}>
                  County
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {this.setState({ searchfield : "state_name", searchfieldDisplay : "State", isloaded : false});}}>
                  State
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {this.setState({ searchfield : "timezone", searchfieldDisplay : "Time Zone", isloaded : false});}}>
                  TimeZone
                </Dropdown.Item>
              </DropdownButton>
              <h6 style={{color: '#1976d2'}}> {this.state.searchfieldDisplay} </h6>        
            </center>            
          </row>            
          <LocationsController setObjects = {this.setLocations} searchfield = {this.state.searchfield} searchstring = {this.props.searchstring}>
            <LocationTable locations = {this.state.locations} searchstring = {this.props.searchstring}/>
          </LocationsController>
        </div>
      );            
    } else {
      this.componentDidMount();
      return(
        <div/>
      );
    }
  }
}

export class IllnessResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield : "illness_name",
      searchfieldDisplay : "Name",      
      illnesses : null,
    }
  }

  componentDidMount(){
    this.setState({
      isloaded: true
    })
  }

  setIllnesses = (objects) => {
    this.setState({
      illnesses : objects,
    })
  }

  render(){
    // really hacky but it works for calling back without infinite looping
    if(this.state.isloaded){
      return(
        <div>
          <br/>
          <row>
            <center>
              <DropdownButton id="dropdown-basic-button" title="Select Search Field">
                <Dropdown.Item onClick={() => {this.setState({ searchfield : "illness_name", searchfieldDisplay : "Name", isloaded : false});}}>
                  Name
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {this.setState({ searchfield : "illness_symptoms", searchfieldDisplay : "Symptoms", isloaded : false});}}>
                  Symptoms
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {this.setState({ searchfield : "illness_desc", searchfieldDisplay : "Description", isloaded : false});}}>
                  Description
                </Dropdown.Item>
              </DropdownButton>
              <h6 style={{color: '#1976d2'}}> {this.state.searchfieldDisplay} </h6>        
            </center>            
          </row>        
          <IllnessesController setObjects = {this.setIllnesses} searchfield = {this.state.searchfield} searchstring = {this.props.searchstring}>
            <IllnessTable illnesses = {this.state.illnesses} searchstring = {this.props.searchstring}/>
          </IllnessesController>
        </div>
      );      
    } else {
      this.componentDidMount();      
      return(
        <div/>
      );
    }
  }
}

export class PollutantResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollutants : null,
    }
  }

  componentDidMount(){
    this.setState({
      isloaded: true
    })
  }

  setPollutants = (objects) => {
    this.setState({
      pollutants : objects,
    })
  }

  render(){
    // really hacky but it works for calling back without infinite looping
    if(this.state.Objects == null){
      return(
        <div>
          <PollutantsController setObjects = {this.setPollutants} searchstring = {this.props.searchstring.toUpperCase()}>
            <PollutantTable pollutants = {this.state.pollutants} searchstring = {this.props.searchstring.toUpperCase()}/>
          </PollutantsController>
        </div>
      );      
    } else {
      return(
        <div>
          <PollutantsController setObjects = {null} searchstring = {this.props.searchstring.toUpperCase()}>
            <PollutantTable pollutants = {this.state.pollutants} searchstring = {this.props.searchstring.toUpperCase()}/>
          </PollutantsController>
        </div>
      );
    }
  }
}



