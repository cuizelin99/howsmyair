import React, { Component } from 'react';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText,
        CardHeader,  CardDeck, CardColumns, CardSubtitle, CardBody,
        Form,FormGroup, Label, Input, FormText } from 'reactstrap';
import {Col, Row, Pagination, DropdownButton, Dropdown} from 'react-bootstrap';
import {Pollutantcards} from './PollutantItems'
const fetch = require("node-fetch");

/*
Sources:

Pagination sources:
https://github.com/react-bootstrap/pagination
https://www.npmjs.com/package/react-ultimate-pagination
https://codepen.io/joedazza/pen/BVXVej
*/

const ENDPOINT = 'https://api.howsmyair.me/pollutants';

const buildOrder  = (fieldname,direction) => {
    return `{%22field%22:%22${fieldname}%22,%22direction%22:%22${direction}%22}`
}

const buildFilter = (fieldname,operator,value) => {
    return `{%22name%22:%22${fieldname}%22,%22op%22:%22${operator}%22,%22val%22:%22${value}%22}`
}

const buildQuery = (model,page,filterObjs,orderObjs) => {
      return `https://api.howsmyair.me/${model}?page=${page}&q={%22filters%22:[${filterObjs}],%22order_by%22:[${orderObjs}]}`
}

export class Pollutants extends Component {
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
    return(
      <div>
        <PollutantsController setObjects = {this.setPollutants}>
          <Pollutantcards pollutants = {this.state.pollutants}/>
        </PollutantsController>
      </div>
    );      
  }
}

export class PollutantsController extends Component {

  constructor(props){
    super(props);
    this.state = {
      data : {},
      num_results: null,
      objects:[],
      page: null,
      total_pages: null,
      states : [],
      time_zones : [],
      inhalation_cancer_potency : "None",
      inhalation_cancer_potency_source : "None",
      inhalation_cancer_potency_units : "None",
      inhalation_reference_concentration : "None",
      inhalation_reference_concentration_source : "None",
      inhalation_reference_concentration_units : "None",
      national_ambient_air_quality_std : "None",
      national_ambient_air_quality_std_source : "None",
      national_ambient_air_quality_std_units : "None",
      cancer_potency_sources : [],
      cancer_potency_units : [],
      reference_concentration_source : [],
      reference_concentration_units : [],
      ambient_air_quality_std_source : [],
      ambient_air_quality_std_units : [],
      sort_by : "chemical_name",
      display_sort : "Chemical Name",
      order : "asc",
      display_order : "Ascending",
      page: 1,
      isloaded : false,
    };
  }

    componentDidMount() {
      fetch(this.getQuery())
         .then(res => res.json())
         .then(data => {
          this.setState({
            data : data,
            num_results: data.num_results,
            objects: data.objects,
            page: data.page,
            total_pages: data.total_pages,
            cancer_potency_sources : this.getUniques(data.objects,"inhalation_cancer_potency_source"),
            cancer_potency_units : this.getUniques(data.objects,"inhalation_cancer_potency_units"),
            reference_concentration_source : this.getUniques(data.objects,"inhalation_reference_concentration_source"),
            reference_concentration_units : this.getUniques(data.objects,"inhalation_reference_concentration_units"),
            ambient_air_quality_std_source : this.getUniques(data.objects,"national_ambient_air_quality_std_source"),
            ambient_air_quality_std_units : this.getUniques(data.objects,"national_ambient_air_quality_std_units"),
            isloaded : true,
          })
        if (this.props.setObjects != null){
          this.props.setObjects(data.objects)
        }
      })
    };

   getUniques(objArray, key) {
      const uniqueVals = [];
      objArray.map( obj => {
          if (uniqueVals.indexOf(obj[key]) === -1) {
              uniqueVals.push(obj[key])
          };
      });
      return(uniqueVals);
   }

    getQuery() {

      let filterObjs = buildFilter("chemical_name","like",`%25${this.props.searchstring || ''}%25`);
      let orderObjs = buildOrder("chemical_name","asc")

      if (this.state.inhalation_cancer_potency_source != "None") {
        filterObjs += ","+buildFilter("inhalation_cancer_potency_source","eq",this.state.inhalation_cancer_potency_source)
      }
      if (this.state.inhalation_cancer_potency_units != "None") {
        filterObjs += ","+buildFilter("inhalation_cancer_potency_units","eq",this.state.inhalation_cancer_potency_units)
      }
      if (this.state.inhalation_reference_concentration_source != "None") {
        filterObjs += ","+buildFilter("inhalation_reference_concentration_source","eq",this.state.inhalation_reference_concentration_source)
      }
      if (this.state.inhalation_reference_concentration_units != "None") {
        filterObjs += ","+buildFilter("inhalation_reference_concentration_units","eq",this.state.inhalation_reference_concentration_units)
      }
      if (this.state.national_ambient_air_quality_std_source != "None") {
        filterObjs += ","+buildFilter("national_ambient_air_quality_std_source","eq",this.state.national_ambient_air_quality_std_source)
      }
      if (this.state.national_ambient_air_quality_std_units != "None") {
        filterObjs += ","+buildFilter("national_ambient_air_quality_std_units","eq",this.state.national_ambient_air_quality_std_units)
      }

      orderObjs = buildOrder(this.state.sort_by,this.state.order)

      return buildQuery("pollutants",this.state.page,filterObjs,orderObjs);
    }
    render(){
      if (this.state.isloaded){
      let span = 4
      let page = this.state.page
      let l = page - (span / 2)
      let r = page + (span / 2)
      let range = []
      /*If there aren't enough pages to have dynamically changing page values*/
      if (this.state.total_pages < span) {
        range = [...Array((this.state.total_pages + 1) - 1).keys()].map(i => i + 1)
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
                <h1 style={{color: '#1976d2'}}>{this.state.num_results} Chemical Pollutants</h1>
            </Row>
            <Jumbotron>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <h3 style={{color: '#1976d2'}}>Filters</h3>
              </Col>
              <Col md="auto">
                <center>
                  <DropdownButton id="dropdown-basic-button" title="Potency Source">
                      <Dropdown.Item onClick={() => {this.setState({inhalation_cancer_potency_source : "None", page : 1 ,isloaded : false});}}>
                        None
                      </Dropdown.Item>
                      {this.state.cancer_potency_sources.map( src => (
                        <Dropdown.Item onClick={() => {
                          this.setState({
                            inhalation_cancer_potency_source : src,
                            page : 1,
                            isloaded : false
                          });
                        }}>
                        {src}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                  <h5 style={{color: '#1976d2'}}><center>{this.state.inhalation_cancer_potency_source}</center></h5>
                  </center>
                </Col>
                <Col md="auto">
                 <center>
                  <DropdownButton id="dropdown-basic-button" title="Potency Units">
                      <Dropdown.Item onClick={() => {this.setState({inhalation_cancer_potency_units : "None", page : 1,isloaded : false});}}>
                        None
                      </Dropdown.Item>
                      {this.state.cancer_potency_units.map( unit => (
                        <Dropdown.Item onClick={() => {
                          this.setState({
                            inhalation_cancer_potency_units : unit,
                            page : 1,
                            isloaded : false
                          });
                        }}>
                        {unit}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                  <h5 style={{color: '#1976d2'}}><center>{this.state.inhalation_cancer_potency_units}</center></h5>
                  </center>
                </Col>
                <Col md="auto">
                 <center>
                  <DropdownButton id="dropdown-basic-button" title="Concentration Source">
                      <Dropdown.Item onClick={() => {this.setState({inhalation_reference_concentration_source : "None", page : 1,isloaded : false});}}>
                        None
                      </Dropdown.Item>
                      {this.state.reference_concentration_source.map( unit => (
                        <Dropdown.Item onClick={() => {
                          this.setState({
                            inhalation_reference_concentration_source : unit,
                            page : 1,
                            isloaded : false
                          });
                        }}>
                        {unit}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                  <h5 style={{color: '#1976d2'}}><center>{this.state.inhalation_reference_concentration_source}</center></h5>
                  </center>
                </Col>
                <Col md="auto">
                 <center>
                  <DropdownButton id="dropdown-basic-button" title="Concentration Units">
                      <Dropdown.Item onClick={() => {this.setState({inhalation_reference_concentration_units : "None", page : 1,isloaded : false});}}>
                        None
                      </Dropdown.Item>
                      {this.state.reference_concentration_units.map( unit => (
                        <Dropdown.Item onClick={() => {
                          this.setState({
                            inhalation_reference_concentration_units : unit,
                            page : 1,
                            isloaded : false
                          });
                        }}>
                        {unit}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                  <h5 style={{color: '#1976d2'}}><center>{this.state.inhalation_reference_concentration_units}</center></h5>
                  </center>
                </Col>
                <Col md="auto">
                 <center>
                  <DropdownButton id="dropdown-basic-button" title="Air Quality Source">
                      <Dropdown.Item onClick={() => {this.setState({national_ambient_air_quality_std_source : "None", page : 1,isloaded : false});}}>
                        None
                      </Dropdown.Item>
                      {this.state.ambient_air_quality_std_source.map( unit => (
                        <Dropdown.Item onClick={() => {
                          this.setState({
                            national_ambient_air_quality_std_source : unit,
                            page : 1,
                            isloaded : false
                          });
                        }}>
                        {unit}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                  <h5 style={{color: '#1976d2'}}><center>{this.state.national_ambient_air_quality_std_source}</center></h5>
                  </center>
                </Col>
                <Col md="auto">
                 <center>
                  <DropdownButton id="dropdown-basic-button" title="Air Quality Units">
                      <Dropdown.Item onClick={() => {this.setState({national_ambient_air_quality_std_units : "None", page : 1,isloaded : false});}}>
                        None
                      </Dropdown.Item>
                      {this.state.ambient_air_quality_std_units.map( unit => (
                        <Dropdown.Item onClick={() => {
                          this.setState({
                            national_ambient_air_quality_std_units : unit,
                            page : 1,
                            isloaded : false
                          });
                        }}>
                        {unit}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                  <h5 style={{color: '#1976d2'}}><center>{this.state.national_ambient_air_quality_std_units}</center></h5>
                  </center>
                </Col>
               </Row>
               <Row className="justify-content-md-center">
              <h3 style={{color: '#1976d2'}}><center>Sort By</center></h3>
              <Col md="auto">
                  <DropdownButton id="dropdown-basic-button" title={this.state.display_sort}>
                   <Dropdown.Item onClick={() => {this.setState({ sort_by : "chemical_name", display_sort : "Chemical Name", isloaded : false});}}>
                      Chemical Name
                   </Dropdown.Item>
                   <Dropdown.Item onClick={() => {this.setState({ sort_by : "inhalation_cancer_potency", display_sort : "Potency", isloaded : false});}}>
                      Potency
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "inhalation_reference_concentration", display_sort : "Concentration", isloaded : false});}}>
                      Concentration
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ sort_by : "national_ambient_air_quality_std", display_sort : "Standard", isloaded : false});}}>
                      Standard
                    </Dropdown.Item>
                  </DropdownButton>
              </Col>
              <Col md="auto">
                  <DropdownButton id="dropdown-basic-button" title = {this.state.display_order}>
                    <Dropdown.Item onClick={() => {this.setState({ order : "asc", display_order : "Ascending", isloaded : false});}}>
                      Ascending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setState({ order : "desc", display_order : "Descending", isloaded : false});}}>
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

export function setUnknownAttributes(attribute) {
  if (attribute) {
     return attribute;
  } else {
     return "Unknown";
  }
}


