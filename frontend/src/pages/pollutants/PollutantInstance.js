import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText, CardHeader,
         CardDeck, CardColumns, CardSubtitle, CardBody , NavLink, UncontrolledCarousel,
         Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Image, Col, Row, ListGroup } from 'react-bootstrap';
import IllnessInstance,{RelatedIllness} from '../illnesses/IllnessInstance';
import LocationInstance,{RelatedLocations} from '../locations/LocationInstance';
const fetch = require("node-fetch");


const ENDPOINT = 'https://api.howsmyair.me/pollutants';

export class RelatedPollutants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    // get location
    fetch(ENDPOINT + '/' + this.props.pollutant_name)
        .then(res => res.json())
        .then(data => { this.setState({
          data: data
      })
    })
  };

  render() {
    return (
      <div>
      <Card body style={{ backgroundColor: '#00', borderColor: '#2255', minHeight: '24rem' }}>
      <a style={{ cursor: 'pointer' }} href={"/Pollutant/" + this.state.data.chemical_name}>
         <CardHeader>
           <h5>{this.state.data.chemical_name}</h5>
         </CardHeader>
         <CardImg src={this.state.data.chemspider_id} />
      </a>
      </Card>
      </div>
    );
  }
}

export class Pollutant extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: {},
        isloaded : false,
        related_illnesses: [],
        related_locations: []
      };
    }

   componentDidMount() {
      const {key} = this.props.match.params;
      // get location
      fetch(ENDPOINT + '/' + key)
         .then(res => res.json())
         .then(data => { this.setState({
            data: data,
            isloaded : true,
            related_illnesses : data.related_illnesses,
            related_locations : data.related_locations
         })
      })
    };

   render() {
    if (this.state.isloaded) {
      return (
        <div>
          <Jumbotron>
            <Container>
            <h1 style={{color: '#1976d2'}}>{this.state.data.chemical_name}</h1>
            <br/>
            <Row>
              <Col>
              <ListGroup variant="flush" >
                <ListGroup.Item  style={{color: '#1976d2'}}>
                  Cancer Potency:
                  {this.state.data.inhalation_cancer_potency} {this.state.data.inhalation_cancer_potency_units}
                  <br/><i>Source: {this.state.data.inhalation_cancer_potency_source}</i>
                </ListGroup.Item>
                <ListGroup.Item style={{color: '#1976d2'}}>
                  Reference Concentration:
                  {this.state.data.inhalation_reference_concentration} {this.state.data.inhalation_reference_concentration_units}
                  <br/><i>Source: {this.state.data.inhalation_reference_concentration_source}</i>
                </ListGroup.Item>
                <ListGroup.Item style={{color: '#1976d2'}}>
                  National Ambient Air Quality:
                  {this.state.data.national_ambient_air_quality_std} {this.state.data.national_ambient_air_quality_std_units}
                  <br/><i>Source: {this.state.data.national_ambient_air_quality_std_source}</i>
                </ListGroup.Item>
              </ListGroup>
              </Col>
              <Col>
                <Card>
                  <Row className="justify-content-md-center" className="spacing">
                    <img width="50%" src={this.state.data.chemspider_id} alt="Italian Trulli"/>
                  </Row>
                </Card>
              </Col>
            </Row>
            </Container>
          </Jumbotron>
          <Container style={{ paddingBottom: '2rem' }}>
            <Row>
              <Col>
                <h1 style={{color: '#1976d2'}}>Related Illnesses</h1><br/>
                <Row className="justify-content-md-center" className="spacing">
                  {this.state.related_illnesses.map((illness) => (
                     <div class="col-sm-3">
                        <RelatedIllness illness_name={illness.illness_name} />
                        <p/>
                     </div>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <h1 style={{color: '#1976d2'}}>Related Locations</h1><br/>
                <Row className="justify-content-md-center" className="spacing">
                  {this.state.related_locations.map((location) => (
                     <div class="col-sm-3">
                        <RelatedLocations location_id={location.location_id} />
                        <p/>
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
