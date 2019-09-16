import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React from 'react';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText,
        CardHeader, CardDeck, CardColumns, CardSubtitle, CardBody,
        Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BrowserRouter as Router, Route, Link , Switch,BrowserHistory } from 'react-router-dom';
import LocIcon from './assets/locationsicon.png'
import IllIcon from './assets/illicon.png'
import PolIcon from './assets/pollicon.png'


export default class Home extends React.Component {
  render(){
    return (
      <div>
      <div className="bg">
      <Container style={{color: 'white', paddingTop: '3rem'}}>
         <h3>Welcome</h3>
         <br/>
         <p>The air we breathe is becoming increasingly polluted.
         <br/>Click around to learn more.
         <br/>
         <br/>And don't forget to … </p>
      </Container>
      </div>
      <Jumbotron fluid>
      <Container>
          <h1 className="display-5" style={{ textAlign: 'center' }}>Our Models</h1>
          <Container>
          <CardColumns>

            <a style={{ cursor: 'pointer' }} href={"/Locations"}>
            <Card>
               <CardImg src={LocIcon} />
               <h5 style={{ textAlign: 'center' }}>Locations</h5>
            </Card>
            </a>
            <a style={{ cursor: 'pointer' }} href={"/Illnesses"}>
            <Card>
               <CardImg src={IllIcon} />
               <h5 style={{ textAlign: 'center' }}>Illnesses</h5>
            </Card>
            </a>
            <a style={{ cursor: 'pointer' }} href={"/Pollutants"}>
            <Card>
               <CardImg src={PolIcon} />
               <h5 style={{ textAlign: 'center' }}>Pollutants</h5>
            </Card>
            </a>
          </CardColumns>
          </Container>
          <br/>
      </Container>
      </Jumbotron>
      </div>
    );
  }
}
