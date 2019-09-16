import React, { Component } from 'react';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText,
        CardHeader,  CardDeck, CardColumns, CardSubtitle, CardBody,
        Form,FormGroup, Label, Input, FormText } from 'reactstrap';
import {Col, Row, Pagination, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { setUnknownAttributes } from './Pollutants'

const fetch = require("node-fetch");

export const Pollutantcards = ( props ) => {
  console.log(props.searchstring)
  if(props != null && props.pollutants != null){
    return(
      <Container>
        <Row className="justify-content-md-center" className="spacing">
          {props.pollutants.map((pollutant) => (
             <Col className="spacing" lg="4" sm="6" xs="12">
             <a style={{ cursor: 'pointer', color: 'black' }} href={"/Pollutant/" + pollutant.chemical_name}>
              <Card body style={{ borderColor: '#2255', boxShadow: "0px 3px 0px #14428E", minHeight: '45rem' }}>
               <CardImg src = {pollutant.chemspider_id}/>
               <CardHeader>
                 {/* The dynamic link is arranged this way through the NavBar.js
                 and back to the Location component*/}
                 <h5 class="text-primary">{pollutant.chemical_name}</h5>
               </CardHeader>
               <CardBody>
               <CardText>
                 <b>Cancer Potency</b>
                 <br/>Potency: {setUnknownAttributes(pollutant.inhalation_cancer_potency)} {pollutant.inhalation_cancer_potency_units}
                 <br/>Source: {setUnknownAttributes(pollutant.inhalation_cancer_potency_source)}
                 <br/><b>Inhalation Reference Concentration</b>
                 <br/>Concentration: {setUnknownAttributes(pollutant.inhalation_reference_concentration)} {pollutant.inhalation_reference_concentration_units}
                 <br/>Source: {setUnknownAttributes(pollutant.inhalation_reference_concentration_source)}
                 <br/><b>National Ambient Air Quality</b>
                 <br/>Standard: {setUnknownAttributes(pollutant.national_ambient_air_quality_std)} {pollutant.national_ambient_air_quality_std_units}
                 <br/>Source: {setUnknownAttributes(pollutant.national_ambient_air_quality_std_source)}
               </CardText>
               </CardBody>
            </Card>
            </a>
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


export const PollutantTable = (props) => {
  if(props.pollutants != null && props.pollutants != null && typeof props.searchstring != "undefined"){
    return (
      <Table striped bordered hover responsive >
        <th><center>Chemical Name</center></th>
        <th><center>Inhalation Cancer Potency</center></th>
        <th><center>Inhalation Cancer Source</center></th>
        <th><center>Inhalation Reference Concentration</center></th>
        <th><center>Inhalation Reference Source</center></th>
        <th><center>National Ambient Air Quality Standards</center></th>
        <th><center>National Ambient Air Quality Source</center></th>
        <tbody>
        {props.pollutants.map((pollutant) => (
          <tr>
          <td>
            <center>
              <Link to={"/Pollutant/" + pollutant.chemical_name}>
                  <Highlighter
                    highlightStyle={{backgroundColor: 'lightblue'}}
                    searchWords={[props.searchstring]}
                    autoEscape={true}
                    textToHighlight= {pollutant.chemical_name}
                  />
              </Link>
            </center>
          </td>
          <td><center>{pollutant.inhalation_cancer_potency} {pollutant.inhalation_cancer_potency_units}</center></td>
          <td><center>{pollutant.inhalation_cancer_potency_source}</center></td>
          <td><center>{pollutant.inhalation_reference_concentration} {pollutant.inhalation_reference_concentration_units}</center></td>
          <td><center>{pollutant.inhalation_reference_concentration_source}</center></td>
          <td><center>{pollutant.national_ambient_air_quality_std} {pollutant.national_ambient_air_quality_std_units}</center></td>
          <td><center>{pollutant.national_ambient_air_quality_std_source}</center></td>
          </tr>
        ))}
        </tbody>
      </Table>
    );
  } else {
    return(<div>shit ain't loading</div>);
  }
}
