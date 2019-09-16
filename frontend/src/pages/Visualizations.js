import React, { Component, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText, CardHeader,
         CardDeck, CardColumns, CardSubtitle, CardBody , NavLink, UncontrolledCarousel,
         Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Col, Row, Pagination, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import * as d3 from "d3";
import { Element } from "react-faux-dom";

import BarChart from "../visualizations/visual1"
import Visual2 from "../visualizations/visual2"
import App from "../visualizations/visual3"
import Visual4 from "../visualizations/visual4"
import Bills from "../visualizations/visual6"

export default class Visualizations extends Component {
   render() {

      return (
        <div>
        <p />
        <Container>
        <h3>States and their average air quality</h3>
        <BarChart
            data={{
               AL: 45,
               CA: 50,
               CT: 31,
               FL: 24,
               GA: 45,
               LA: 40,
               MD: 37,
               MA: 32,
               NM: 30,
               NY: 44,
               NC: 33,
               OH: 38,
               PA: 41,
               SC: 30,
               TX: 42,
            }}
            x="State (State Abbreviation)"
            y="Average PM2.5 Air Quality Index"
         />
      </Container>
      <p />
      <Container>
      <h3>Number of illnesses and pollutants in each state</h3>

      

      <Visual2 />
      </Container>
      <Container>
      <h3> Comparison of Pollutants With the Highest Concentration in our Air (ug/m3)  </h3>
      <App/>
      </Container>
      <Jumbotron>
      <center><h1> Engage Climate Change Visualizations </h1> </center>
      </Jumbotron>
      <Container>
      <center>
        <h3> Top Ten States With The Most Emmissions</h3>
        <BarChart
            data={{
           
               CA: 5756484,
               FL: 3459349,
               IL: 2961832,
               IN: 2412837,
               LA: 3862861,
               MI: 2255569,
               NY: 2590246,
               OH: 2936929,
               PA: 3274268,
               TX: 11959352,
            }}
            x="State (State Abbreviation)"
            y="Fossil Fuel Consumtion (Billion BTU)"
        />
      </center>
      <Bills/>
        <center><h3>Number of Environemental Bills in Each Group</h3></center>
      <Visual4 />      
      </Container>
      </div>
      );
  }
}
