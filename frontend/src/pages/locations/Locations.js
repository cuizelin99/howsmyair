import React, { Component } from 'react';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText,
        CardHeader,  CardDeck, CardColumns, CardSubtitle, CardBody,
        Form,FormGroup, Label, Input, FormText } from 'reactstrap';
import {Col, Row, Pagination, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import {Locationcards,LocationTable} from './LocationItems';
const fetch = require("node-fetch");

/**
Sources:

Pagination sources:
https://github.com/react-bootstrap/pagination
https://codepen.io/joedazza/pen/BVXVej
DAMN CORS:
https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e
**/

const ENDPOINT = 'https://api.howsmyair.me/location';

const buildOrder  = (fieldname,direction) => {
    return `{%22field%22:%22${fieldname}%22,%22direction%22:%22${direction}%22}`
}

const buildFilter = (fieldname,operator,value) => {
    return `{%22name%22:%22${fieldname}%22,%22op%22:%22${operator}%22,%22val%22:%22${value}%22}`
}

const buildQuery = (model,page,filterObjs,orderObjs) => {
      return `https://api.howsmyair.me/${model}?page=${page}&q={%22filters%22:[${filterObjs}],%22order_by%22:[${orderObjs}]}`
}

export class Locations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations : null,
    }
  }

  componentDidMount(){
    this.setState({
      isloaded: true
    })
  }

  setLocations = (objects) => {
    this.setState({
      locations : objects,
    })
  }

  render(){
  // really hacky but it works for calling back without infinite looping
    return(
      <div>
        <LocationsController setObjects = {this.setLocations}>
          <Locationcards locations = {this.state.locations}/>
        </LocationsController>
      </div>
    );
  }
}

export class LocationsController extends Component {
    constructor(props){
    super(props);
    this.state = {
      data : {},
      num_results: null,
      objects:[],
      total_pages: null,
      states : [],
      page: 1,
      time_zones : [],
      current_state: "None",
      current_timezone : "None",
      current_population : "None",
      current_density : "None",
      sort_by : "city",
      display_sort : "City",
      order : "asc",
      display_order : "Ascending",
      isloaded : false
    };
  }

    componentDidMount() {
      console.log(this.getQuery())
      fetch(this.getQuery())
         .then(res => res.json())
         .then(data => {
          this.setState({
            data : data,
            num_results: data.num_results,
            objects: data.objects,
            page: data.page,
            total_pages: data.total_pages,
            isloaded : true,
            states : this.getUniques(data.objects,"state_name"),
            time_zones : this.getUniques(data.objects,"timezone")
          })
          if (this.props.setObjects != null){
            this.props.setObjects(data.objects)
          }
      })
    };

    getQuery(){
      let filterObjs = buildFilter(`${this.props.searchfield || 'city'}`,"ilike",`%25${this.props.searchstring || ''}%25`);
      let orderObjs = buildOrder("city","asc")

      if (this.state.current_state != "None") {
        filterObjs += ","+buildFilter("state_name","eq",this.state.current_state)
      }
      if (this.state.current_timezone != "None") {
        filterObjs += ","+buildFilter("timezone","eq",this.state.current_timezone)
      }

      switch(this.state.current_population){
        case "Small":
          filterObjs += ","+buildFilter("population","le",500000)
          break;
        case"Medium":
          filterObjs += ","+buildFilter("population","ge",500000)
          filterObjs += ","+buildFilter("population","lt",1000000)
          break;
        case"Large":
          filterObjs += ","+buildFilter("population","ge",1000000)
        default:
          break;

      }

      switch(this.state.current_density){
        case "Sparse":
          filterObjs += ","+buildFilter("density","le",1000)
          break;
        case"Medium":
          filterObjs += ","+buildFilter("density","ge",1000)
          filterObjs += ","+buildFilter("density","lt",2000)
          break;
        case"Dense":
          filterObjs += ","+buildFilter("density","ge",2000)
        default:
          break;
      }
      orderObjs = buildOrder(this.state.sort_by,this.state.order)

      return buildQuery("location",this.state.page,filterObjs,orderObjs);
    }

    getUniques(objArray,key) {
      const uniqueVals = [];
      objArray.map( obj => {
          if (uniqueVals.indexOf(obj[key]) === -1) {
              uniqueVals.push(obj[key])
          };
      });
      return(uniqueVals);
    }
    render(){
      if (this.state.isloaded){
      let span = 4
      let page = this.state.page
      let l = page - (span / 2)
      let r = page + (span / 2)
      let range = []
      /*If there aren't enough pages to have dynamically changing page values*/
      if(this.state.total_pages < span) {
        range = [...Array((this.state.total_pages + 1) - 1).keys()].map(i => i +1 )
      } else if (page + span > this.state.total_pages) {
        /*At the right bound*/
        range = [...Array((this.state.total_pages) - (this.state.total_pages - span)).keys()].map(i => (this.state.total_pages - span) + i + 1)
      } else if (page - span < 0) {
        /*At the left bound*/
        range = [...Array((span + 1) - 1).keys()].map(i => i + 1)
      } else {
        /*At somewhere in between*/
        range = [...Array((r + 1) - l-1).keys()].map(i => i + l )
      }
      if(this.state.total_pages == 0){
        this.state.page = 0;
      }
      return(
        <div>
          <br/>
            <Row className="justify-content-md-center">
                <h1 style={{color: '#1976d2'}}>{this.state.num_results} Locations</h1>
            </Row>
            <Jumbotron>
            <Row className="justify-content-md-center">

              <Col md="auto">
                <h3 style={{color: '#1976d2'}}>Filters</h3>
              </Col>
              <Col md="auto">
                <center>
                  <DropdownButton id="dropdown-basic-button" title="States">
                      <Dropdown.Item onClick={() => {this.setState({current_state : "None", page : 1, isloaded : false});}}>
                        None
                      </Dropdown.Item>
                      {this.state.states.map( st => (
                        <Dropdown.Item onClick={() => {
                          this.setState({
                            current_state : st,
                            page : 1,
                            isloaded : false
                          });
                        }}>
                        {st}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                  <h6 style={{color: '#1976d2'}}>{this.state.current_state}</h6>
                </center>
              </Col>
              <Col md="auto">
                <center>
                  <DropdownButton id="dropdown-basic-button" title="Time Zone">
                    <Dropdown.Item onClick={() => {this.setState({current_timezone : "None", page : 1,isloaded : false});}}>
                      None
                    </Dropdown.Item>
                      {this.state.time_zones.map( tz => (
                        <Dropdown.Item onClick={() => {
                            this.setState({
                              current_timezone : tz,
                              page : 1,
                              isloaded : false
                            });
                        }}>
                        {tz}
                    </Dropdown.Item>
                  ))}
                  </DropdownButton>
                  <h6 style={{color: '#1976d2'}}>{this.state.current_timezone}</h6>
                </center>
              </Col>
              <Col md="auto">
                <center>
                  <DropdownButton id="dropdown-basic-button" title="Population">
                    <Dropdown.Item onClick={() => {this.setState({ current_population : "None", page : 1, isloaded : false});}}>
                      None
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ current_population : "Small", page : 1, isloaded : false});}}>
                      Small
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ current_population : "Medium", page : 1, isloaded : false});}}>
                      Medium
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ current_population : "Large", page : 1, isloaded : false});}}>
                      Large
                    </Dropdown.Item>
                  </DropdownButton>
                <h6 style={{color: '#1976d2'}}><center>{this.state.current_population}</center></h6>
                </center>
              </Col>
              <Col md="auto">
                <center>
                  <DropdownButton id="dropdown-basic-button" title="Density">
                    <Dropdown.Item onClick={() => {this.setState({ current_density : "None", page : 1, isloaded : false});}}>
                      None
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ current_density : "Sparse", page : 1, isloaded : false});}}>
                      Sparse
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ current_density : "Medium", page : 1, isloaded : false});}}>
                      Medium
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ current_density : "Dense", page : 1, isloaded : false});}}>
                      Dense
                    </Dropdown.Item>
                  </DropdownButton>
                  <h6 style={{color: '#1976d2'}}><center>{this.state.current_density}</center></h6>
                </center>
              </Col>
                <h3 style={{color: '#1976d2'}}><center>Sort By</center></h3>
              <Col md="auto">
                  <DropdownButton id="dropdown-basic-button" title={this.state.display_sort}>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "city", display_sort : "City", page : 1, isloaded : false});}}>
                      City
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "county_name", display_sort : "County", page : 1, isloaded : false});}}>
                      County
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "state_name", display_sort : "State", page : 1, isloaded : false});}}>
                      State
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "timezone", display_sort : "Time Zone", page : 1, isloaded : false});}}>
                      Time Zone
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "latitude", display_sort : "Latitude", page : 1, isloaded : false});}}>
                      Latitude
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "longitude", display_sort : "Longitude", page : 1, isloaded : false});}}>
                      Longitude
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "population", display_sort : "Population", page : 1, isloaded : false});}}>
                      Population
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "density", display_sort : "Density", page : 1, isloaded : false});}}>
                      Density
                    </Dropdown.Item>
                  </DropdownButton>
              </Col>
              <Col md="auto">
                  <DropdownButton id="dropdown-basic-button" title = {this.state.display_order}>
                    <Dropdown.Item onClick={() => {this.setState({ order : "asc", display_order : "Ascending", page : 1, isloaded : false});}}>
                      Ascending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ order : "desc", display_order : "Descending", page : 1, isloaded : false});}}>
                      Descending
                    </Dropdown.Item>
                  </DropdownButton>
              </Col>

            </Row>
            </Jumbotron>
          <br/>
          <Container>
            <center><h4 style={{color: '#1976d2'}}>Page {this.state.page}/{this.state.total_pages}</h4></center>
            <Row className="justify-content-md-center">
              <Pagination>
                {/*First Page*/}
                <Pagination.First
                  onClick={e => this.setState({ page : 1, isloaded : false})}
                />

                {/*Previous Page*/}
                <Pagination.Prev
                  disabled={this.state.page <= 1}
                  onClick={e => this.setState({ page : this.state.page -1 , isloaded : false})}
                />

                {/*Eveything in between - see block before return statement*/}
                {range.map(page => (
                  <Pagination.Item
                    active={page === this.state.page}
                    onClick={e => this.setState({ page : page , isloaded : false})}
                  >
                    {page}
                  </Pagination.Item>
                ))}

                {/*Next Page*/}
                <Pagination.Next
                  disabled={this.state.page >= this.state.total_pages}
                  onClick={e => this.setState({ page : this.state.page +1 , isloaded : false})}
                />

                {/*Last Page*/}
                <Pagination.Last
                  onClick={e => this.setState({ page : this.state.total_pages, isloaded : false})}
                />
              </Pagination>
            </Row>
           </Container>
              {this.props.children}
        </div>
      );
    } else {
      this.componentDidMount();
      return (
        <div>
         <center><img src = "https://i.makeagif.com/media/9-30-2017/bhAyTs.gif"/></center>
        </div>
      );
   }
  }
}
