import React, { Component } from 'react';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText,
        CardHeader,  CardDeck, CardColumns, CardSubtitle, CardBody,
        Form,FormGroup, Label, Input, FormText } from 'reactstrap';
import {Col, Row, Pagination, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
const fetch = require("node-fetch");

export const Illnesscards = ( props ) => {
  if(props != null && props.illnesses != null){
    return(
      <Container>
        <Row className="justify-content-md-center" className="spacing">
          {props.illnesses.map((illness) => (
             <Col className="spacing" lg="4" sm="6" xs="12">
             <a style={{ cursor: 'pointer', color: 'black' }} href={"/Illness/" + illness.illness_name}>
             <Card body style={{ borderColor: '#2255', boxShadow: "0px 3px 0px #14428E", height: '36rem'}}>
                <CardImg style={{ maxHeight: '16rem' }} src={illness.illness_image} />
                <CardHeader>
                  {/* The dynamic link is arranged this way through the NavBar.js
                  and back to the Location component*/}
                  <h5 class="text-primary">{illness.illness_name}</h5>
                </CardHeader>
                <CardBody>
                <CardText>
                  <p>Lethality: {illness.illness_lethality}
                  <br/>Symptoms: {illness.illness_symptoms}
                  <br/>Contagious: {illness.illness_contagious}
                  <br/>Treatable: {illness.illness_treatable}
                  </p>
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
}


export const IllnessTable = (props) => {
  if(props.illnesses != null && props.illnesses != null && typeof props.searchstring != "undefined"){
    return (
      <Table striped bordered hover responsive >
        <th><center>Illness</center></th>
        <th><center>Illness Description</center></th>
        <th><center>Lethality</center></th>
        <th><center>Symptoms</center></th>
        <th><center>Contagious</center></th>
        <th><center>Treatable</center></th>
        <tbody>
        {props.illnesses.map((illness) => (
          <tr>
          <td>
            <center>
              <Link to={"/Illness/" + illness.illness_name}>
                  <Highlighter
                    highlightStyle={{backgroundColor: 'lightblue'}}
                    searchWords={[props.searchstring]}
                    autoEscape={true}
                    textToHighlight= {illness.illness_name}
                  />
              </Link>
            </center>
          </td>
          <td>
            <center>
              <Link to={"/Illness/" + illness.illness_name}>
                  <Highlighter
                    highlightStyle={{backgroundColor: 'lightblue'}}
                    searchWords={[props.searchstring]}
                    autoEscape={true}
                    textToHighlight= {illness.illness_desc}
                  />
              </Link>
            </center>
          </td>
          <td><center>{illness.illness_lethality}</center></td>
          <td>
            <center>
              <Link to={"/Illness/" + illness.illness_name}>
                  <Highlighter
                    highlightStyle={{backgroundColor: 'lightblue'}}
                    searchWords={[props.searchstring]}
                    autoEscape={true}
                    textToHighlight= {illness.illness_symptoms}
                  />
              </Link>          
            </center>
          </td>
          <td><center>{illness.illness_contagious}</center></td>
          <td><center>{illness.illness_treatable}</center></td>
          </tr>
        ))}
        </tbody>
      </Table>
    );
  } else {
    return(<div>shit ain't loading</div>);
  }
}
