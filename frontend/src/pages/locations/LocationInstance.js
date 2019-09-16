import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText, CardHeader,
         CardDeck, CardColumns, CardSubtitle, CardBody , NavLink, UncontrolledCarousel,
         Form,FormGroup, Label, Input, FormText} from 'reactstrap';
import { Image, Col, Row, ListGroup } from 'react-bootstrap';
import PollutantInstance,{RelatedPollutants} from '../pollutants/PollutantInstance';
import IllnessInstance,{RelatedIllness} from '../illnesses/IllnessInstance';
import Axios from 'axios';
const fetch = require("node-fetch");


const ENDPOINT = 'https://api.howsmyair.me/location';

export class RelatedLocations extends Component {

  constructor(props){
    super(props);
      this.state = {
        data: {},
        location_url : null
      };
  }

  componentDidMount() {
    // get location
    fetch(ENDPOINT + '/' + this.props.location_id)
       .then(res => res.json())
       .then(data => { this.setState({
          data : data,
          location_url : "https://maps.googleapis.com/maps/api/staticmap?center="+
                          data.latitude+","+data.longitude+
                          "&zoom=12&size=400x400"+
                          "&markers=color:green%7Clabel:G%7C"+
                          data.latitude+","+data.longitude +
                          "&key=AIzaSyB-U0Z7cqufI-MHmRwfLmgqDCyQmOlIq48"
       })
    })
  }
   render() {
      return (
        <div>
          <Card body style={{ backgroundColor: '#00', borderColor: '#2255' }}>
            <a style={{ cursor: 'pointer' }} href={"/Location/" + this.props.location_id}>
               <CardHeader>
                  <h5>{this.state.data.city}</h5>
                  <h6 class = "card-subtitle mb-2 text-muted">{this.state.data.state_name}</h6>
               </CardHeader>
               <CardImg src={this.state.location_url}/>
            </a>
          </Card>
        </div>
      );
  }

}

export class Location extends Component {

   constructor(props) {
      super(props);
      this.state = {
        data: {},
        location_url : null,
        isloaded : false,
        related_illnesses: [],
        related_pollutants: []
      };
   }

   componentDidMount() {

      const {key} = this.props.match.params;

      // get location
      fetch(ENDPOINT + '/' + key)
         .then(res => res.json())
         .then(data => { this.setState({
            data: data,
            location_url : "https://maps.googleapis.com/maps/api/staticmap?center="+
                            data.latitude+","+data.longitude+
                            "&zoom=12&size=600x295"+
                            "&markers=color:green%7Clabel:G%7C"+
                            data.latitude+","+data.longitude +
                            "&key=AIzaSyB-U0Z7cqufI-MHmRwfLmgqDCyQmOlIq48",
            isloaded : true,
            related_illnesses : data.related_illnesses,
            related_pollutants : data.related_pollutants
         })
      })
   };

   render() {
      if(this.state.isloaded){
        return (
          <div>
            <Jumbotron>
              <Container>
              <br/>
              <Row>
                <Col>
                  <h1 style={{color: '#1976d2'}}>{this.state.data.city}</h1>
                  <h2 class = "card-subtitle mb-2 text-muted">{this.state.data.state_name}</h2>
                </Col>
                  <AQI latitude = {this.state.data.latitude} longitude = {this.state.data.longitude}/>
              </Row>
              <br/>
              <Row>
                <Col>
                <ListGroup variant="flush" >
                  <ListGroup.Item  style={{color: '#1976d2'}}>
                    County: {this.state.data.county_name}
                  </ListGroup.Item>
                  <ListGroup.Item style={{color: '#1976d2'}}>
                    Latitude: {this.state.data.latitude}
                  </ListGroup.Item>
                  <ListGroup.Item style={{color: '#1976d2'}}>
                    Longitude: {this.state.data.longitude}
                  </ListGroup.Item>
                  <ListGroup.Item style={{color: '#1976d2'}}>
                    Population: {this.state.data.population}
                  </ListGroup.Item>
                  <ListGroup.Item style={{color: '#1976d2'}}>
                    Density (per sq. mile): {this.state.data.density}
                  </ListGroup.Item>
                  <ListGroup.Item style={{color: '#1976d2'}}>
                    Time Zone: {this.state.data.timezone}
                  </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col>
                  <a style={{ cursor: 'pointer' }} href={`https://www.google.com/maps/place/${this.state.data.city}`}>
                    <img src={this.state.location_url} alt="Italian Trulli"/>
                  </a>
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
          </div>        )
      }
   }
}

export class AQI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.aqiQuery = this.aqiQuery.bind(this)
  }

  componentDidMount() {
    // get location -using axios because fetch was being a bitch when parsing json
    Axios.get(this.aqiQuery())
      .then(json => {this.setState({data:json.data})});
  };

  aqiQuery(){
    // return "https://ea25e98a-d3cf-4f1e-9275-6b2ae5c10121.mock.pstmn.io/aq/observation/latLong/current/?format=application/json&latitude=41.0802&longitude=-81.5219&distance=25&API_KEY=DB6A42AD-57B4-48E5-9B26-D3E645C62A54"
    return `https://cors-anywhere.herokuapp.com/http://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${this.props.latitude}&longitude=${this.props.longitude}&distance=25&API_KEY=DB6A42AD-57B4-48E5-9B26-D3E645C62A54`
  }

  render() {
      return (
        <Row>
          {this.state.data.map( measurement => (
            <Col>
              <Card>
                <CardHeader style={{color: '#1976d2'}}>
                  {measurement.ParameterName}<br/>
                <CardSubtitle>
                </CardSubtitle>
                </CardHeader>
                <CardBody>
                  <CardText style={{color: '#1976d2'}}>
                    Air Quality Index: {measurement.AQI} <br/>
                    Category Number: {measurement.Category.Number} <br/>
                    Category Classification: {measurement.Category.Name} <br/>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      );
    }

}
