import React, { Component } from 'react';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText,
        CardHeader,  CardDeck, CardColumns, CardSubtitle, CardBody,
        Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Col, Row, Pagination, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
const fetch = require("node-fetch");

export const Locationcards = ( props ) => {
  console.log("what the fuck",props.locations)
  if(props != null && props.locations != null){
    return(
      <Container>
        <Row className="justify-content-md-center" className="spacing">
        {props.locations.map((location) => (
          <Col className="spacing" lg="4" sm="6" xs="12">
          <Card body style={{ borderColor: '#2255', boxShadow: "0px 3px 0px #14428E", minHeight: '38rem' }}>
          <a style={{ cursor: 'pointer', color: 'black' }} href={"/Location/" + location.id}>
          <CardImg src={
             "https://maps.googleapis.com/maps/api/staticmap?center="+
                             location.latitude+","+location.longitude+
                             "&zoom=12&size=400x400"+
                             "&markers=color:green%7Clabel:G%7C"+
                             location.latitude+","+location.longitude +
                             "&key=AIzaSyB-U0Z7cqufI-MHmRwfLmgqDCyQmOlIq48"}

                             alt="Italian Trulli" />
            <CardHeader>
              {/* The dynamic link is arranged this way through the NavBar.js
              and back to the Location component*/}
              <h5 class="text-primary">{location.city}</h5>
              <h6 style={{ color: '#535353' }}>{location.state_name}</h6>
            </CardHeader>
            <CardBody>
            <CardText>
              County: {location.county_name}
              <br/>Latitude: {location.latitude}
              <br/>Longitude: {location.longitude}
              <br/>Population: {location.population}
              <br/>Density (per sq. mile): {location.density}
              <br/>Time Zone: {location.timezone}
            </CardText>
            </CardBody>
         </a>
         </Card>
          <p />
          </Col>
        ))}
        </Row>
      </Container>
    )
  } else {
    return(<div>shit ain't loading</div>);
  }
};

export const LocationTable = (props) => {
  if(props.locations != null && props.locations != null && typeof props.searchstring != "undefined"){
    return (
      <Table striped bordered hover responsive >
        <th><center>City</center></th>
        <th><center>County</center></th>
        <th><center>State</center></th>
        <th><center>Time Zone</center></th>
        <th><center>Latitude</center></th>
        <th><center>Longitude</center></th>
        <th><center>Population</center></th>
        <th><center>Density per sq. mile</center></th>
        <tbody>
        {props.locations.map((location) => (
          <tr>
            <td>
              <center>
                <Link to={"/Location/" + location.id}>
                  <Highlighter
                    highlightStyle={{backgroundColor: 'lightblue'}}
                    searchWords={[props.searchstring]}
                    autoEscape={true}
                    textToHighlight= {location.city}
                  />
                </Link>
              </center>
            </td>
            <td>
              <center>
                <Link to={"/Location/" + location.id}>
                  <Highlighter
                    highlightStyle={{backgroundColor: 'lightblue'}}
                    searchWords={[props.searchstring]}
                    autoEscape={true}
                    textToHighlight= {location.county_name}
                  />                
                </Link>
              </center>
            </td>
            <td>
              <center>
                <Link to={"/Location/" + location.id}>
                  <Highlighter
                    highlightStyle={{backgroundColor: 'lightblue'}}
                    searchWords={[props.searchstring]}
                    autoEscape={true}
                    textToHighlight={location.state_name}
                  />                              
                </Link>
              </center>
            </td>
            <td>
              <center>
                <Highlighter
                  highlightStyle={{backgroundColor: 'lightblue'}}
                  searchWords={[props.searchstring]}
                  autoEscape={true}
                  textToHighlight={location.timezone}
                />                                            
              </center>
            </td>
            <td><center>{location.latitude}</center></td>
            <td><center>{location.longitude}</center></td>
            <td><center>{location.population}</center></td>
            <td><center>{location.density}</center></td>
          </tr>
        ))}
        </tbody>
      </Table>
    );
  } else {
    return(<div>shit ain't loading</div>);
  }
}
