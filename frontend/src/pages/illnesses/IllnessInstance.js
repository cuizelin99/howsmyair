import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText, CardHeader,
         CardDeck, CardColumns, CardSubtitle, CardBody , NavLink, UncontrolledCarousel,
         Form,FormGroup, Label, Input, FormText} from 'reactstrap';
import { Image, Col, Row, ListGroup } from 'react-bootstrap';
import LocationInstance, {RelatedLocations} from '../locations/LocationInstance';
import PollutantInstance,{RelatedPollutants} from '../pollutants/PollutantInstance';
const fetch = require("node-fetch");


const ENDPOINT = 'https://api.howsmyair.me/illness';

export class RelatedIllness extends Component {

  constructor(props) {
      super(props);
      this.state = {
      data: {}
    };
  }

  componentDidMount() {
     // get illness
     fetch(ENDPOINT + '/' + this.props.illness_name)
        .then(res => res.json())
        .then(data => { this.setState({
           data: data
        })
     })
   };

  render() {
     return (
      <div>
      <Card body style={{ backgroundColor: '#00', borderColor: '#2255', width:'16rem' }}>
      <a style={{ cursor: 'pointer' }} href={"/Illness/" + this.state.data.illness_name}>
         <CardHeader>
           <h5>{this.state.data.illness_name}</h5>
         </CardHeader>
         <CardImg src={this.state.data.illness_image} />
      </a>
      </Card>
      </div>
     );
  }
}

export class Illness extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: {},
        isloaded : false,
        related_locations: [],
        related_pollutants: []
      };
      this.componentDidMount = this.componentDidMount.bind(this)
    }

   componentDidMount() {
      const {key} = this.props.match.params;
      // get location
      fetch(ENDPOINT + '/' + key)
         .then(res => res.json())
         .then(data => { this.setState({
            data: data,
            isloaded : true,
            related_locations : data.related_locations,
            related_pollutants : data.related_pollutants
         })
      })
    };

   render() {
      if (this.state.isloaded) {
         return (
           <div>
             <Jumbotron>
               <Container>
               <Row>
                 <Col>
                 <h1 style={{color: '#1976d2'}}>{this.state.data.illness_name}</h1>
                 <h6 class="card-subtitle mb-2 text-muted">{this.state.data.illness_desc}</h6>
                 <br/>
                   <ListGroup variant="flush" >
                   <ListGroup.Item  style={{color: '#1976d2'}}>
                     Lethality: {this.state.data.illness_lethality}
                   </ListGroup.Item>
                   <ListGroup.Item style={{color: '#1976d2'}}>
                     Symptoms: {this.state.data.illness_symptoms}
                   </ListGroup.Item>
                   <ListGroup.Item style={{color: '#1976d2'}}>
                     Contagious: {this.state.data.illness_contagious}
                   </ListGroup.Item>
                   <ListGroup.Item style={{color: '#1976d2'}}>
                     Treatable: {this.state.data.illness_treatable}
                   </ListGroup.Item>
                 </ListGroup>
                 </Col>
                 <Col>
                  <img width="70%" src={this.state.data.illness_image} alt="Italian Trulli"/>
                 </Col>
               </Row>
               </Container>
             </Jumbotron>

             <Container style={{ paddingBottom: '2rem' }}>
               <Row>
                 <Col>
                   <h1 style={{color: '#1976d2'}}>Related Locations</h1><br/>
                   <Row className="justify-content-md-center" className="spacing">
                   {this.state.related_locations.map((location) => (
                     <div class="col-sm-3">
                         <RelatedLocations location_id={location.location_id} />
                         <p />
                     </div>
                   ))}
                   </Row>
                 </Col>
               </Row>
             </Container>
             <Container>
               <Row>
                 <Col>
                   <h1 style={{color: '#1976d2'}}>Related Pollutants</h1><br/>
                   <Row className="justify-content-md-center" className="spacing">
                   {this.state.related_pollutants.map((pollutant) => (
                      <div class="col-sm-3">
                       <RelatedPollutants pollutant_name={pollutant.pollutant_name} />
                       <p />
                    </div>
                   ))}
                   </Row>
                 </Col>
               </Row>
             </Container>
           </div>
         );
    } else {
      this.componentDidMount();
      return(
        <div>
         <center><img src = "https://i.makeagif.com/media/9-30-2017/bhAyTs.gif"/></center>
        </div>
      )
    }
  }
}
