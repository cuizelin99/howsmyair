import React, { Component } from 'react';
import { Jumbotron, Container, Card, Button, CardImg, CardTitle, CardText,
        CardHeader,  CardDeck, CardColumns, CardSubtitle, CardBody,
        Form,FormGroup, Label, Input, FormText } from 'reactstrap';
import { Col, Row, Pagination, DropdownButton, Dropdown } from 'react-bootstrap';
import {Illnesscards} from './IllnessItems'
const fetch = require("node-fetch");

/*
Sources:

Pagination sources:
https://github.com/react-bootstrap/pagination
https://www.npmjs.com/package/react-ultimate-pagination
https://codepen.io/joedazza/pen/BVXVej
*/

const ENDPOINT = 'https://api.howsmyair.me/illness';

const buildOrder = (fieldname,direction) => {
   return `{%22field%22:%22${fieldname}%22,%22direction%22:%22${direction}%22}`
}

const buildFilter = (fieldname,operator,value) => {
   return `{%22name%22:%22${fieldname}%22,%22op%22:%22${operator}%22,%22val%22:%22${value}%22}`
}

const buildQuery = (model,page,filterObjs,orderObjs) => {
   return `https://api.howsmyair.me/${model}?page=${page}&q={%22filters%22:[${filterObjs}],%22order_by%22:[${orderObjs}]}`
}

export class Illnesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      illnesses : null,
    }
  }

  componentDidMount(){
    this.setState({
      isloaded: true
    })
  }

  setIllnesses = (objects) => {
    this.setState({
      illnesses : objects,
    })
  }

  render(){
    // really hacky but it works for calling back without infinite looping
    return(
      <div>
        <IllnessesController setObjects = {this.setIllnesses}>
          <Illnesscards illnesses = {this.state.illnesses}/>
        </IllnessesController>
      </div>
    );      
  }
}

export class IllnessesController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {},
      num_results: null,
      objects:[],
      page: 1,
      total_pages: null,
      states : [],
      time_zones : [],
      current_contagious: "None",
      current_lethality : "None",
      current_treatable : "None",
      sort_by : "illness_name",
      display_sort : "Illness",
      order : "asc",
      display_order : "Ascending",
      isloaded : false,
    };
    this.getQuery = this.getQuery.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
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
        })
        if (this.props.setObjects != null){
          this.props.setObjects(data.objects)
        }        
     })
  };

    getQuery() {
      let filterObjs = buildFilter(`${this.props.searchfield || 'illness_name'}`,"ilike",`%25${this.props.searchstring || ''}%25`);
      let orderObjs = buildOrder("illness_name","asc")

      if (this.state.current_contagious != "None") {
        filterObjs += "," + buildFilter("illness_contagious","eq",this.state.current_contagious)
      }
      if (this.state.current_lethality != "None") {
        filterObjs += "," + buildFilter("illness_lethality","eq",this.state.current_lethality)
      }
      if (this.state.current_treatable != "None") {
        filterObjs += "," + buildFilter("illness_treatable","eq",this.state.current_treatable)
      }

      orderObjs = buildOrder(this.state.sort_by, this.state.order)

      return buildQuery("illness", this.state.page, filterObjs,orderObjs);
    }

    render() {
      if (this.state.isloaded) {
         let span = 4
         let page = this.state.page
         let l = page - (span / 2)
         let r = page + (span / 2)
         let range = []
         /* If there aren't enough pages to have dynamically changing page values */
         if (this.state.total_pages < span) {
           range = [...Array((this.state.total_pages + 1) - 1).keys()].map(i => i + 1)
         } else if (page + span > this.state.total_pages) {
           /* At the right bound */
           range = [...Array((this.state.total_pages) - (this.state.total_pages - span)).keys()].map(i => (this.state.total_pages - span) + i + 1)
         } else if (page - span < 0) {
           /* At the left bound */
           range = [...Array((span + 1) - 1).keys()].map(i => i + 1)
         } else {
           /* At somewhere in between */
           range = [...Array((r + 1) - l-1).keys()].map(i => i + l)
         }
        if(this.state.total_pages == 0){
          this.state.page = 0;
        }         
         return(
           <div>
             <br/>
               <Row className="justify-content-md-center">
                   <h1 style={{color: '#1976d2'}}>{this.state.num_results} Illnesses</h1>
               </Row>
               <Jumbotron>
               <Row className="justify-content-md-center">
                 <Col md="auto">
                   <h3 style={{color: '#1976d2'}}>Filters</h3>
                 </Col>
                 <Col md="auto">
                   <center>
                     <DropdownButton id="dropdown-basic-button" title="Contagious">
                       <Dropdown.Item onClick={() => {this.setState({ current_contagious : "None", page : 1, isloaded : false });}}>
                         None
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ current_contagious : "yes", page : 1, isloaded : false });}}>
                         Contagious
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ current_contagious : "no", page : 1, isloaded : false });}}>
                         Non-contagious
                       </Dropdown.Item>
                     </DropdownButton>
                     <h5 style={{ color: '#1976d2' }}>{ this.state.current_contagious }</h5>
                   </center>
                 </Col>
                 <Col md="auto">
                   <center>
                     <DropdownButton id="dropdown-basic-button" title="Lethal">
                       <Dropdown.Item onClick={() => {this.setState({ current_lethality : "None", page : 1, isloaded : false });}}>
                         None
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ current_lethality : "lethal", page : 1, isloaded : false });}}>
                         Lethal
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ current_lethality : "non-lethal", page : 1, isloaded : false });}}>
                         Non-lethal
                       </Dropdown.Item>
                     </DropdownButton>
                     <h5 style={{color: '#1976d2'}}>{this.state.current_lethality}</h5>
                   </center>
                 </Col>
                 <Col md="auto">
                   <center>
                     <DropdownButton id="dropdown-basic-button" title="Treatable">
                       <Dropdown.Item onClick={() => {this.setState({ current_treatable : "None", page : 1, isloaded : false});}}>
                         None
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ current_treatable : "yes", page : 1, isloaded : false});}}>
                         Treatable
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ current_treatable : "no", page : 1, isloaded : false});}}>
                         Non-treatable
                       </Dropdown.Item>
                     </DropdownButton>
                     <h5 style={{color: '#1976d2'}}>{this.state.current_treatable}</h5>
                   </center>
                 </Col>
                 <h3 style={{color: '#1976d2'}}><center>Sort By</center></h3>
                 <Col md="auto">
                     <DropdownButton id="dropdown-basic-button" title={this.state.display_sort}>
                       <Dropdown.Item onClick={() => {this.setState({ sort_by : "illness_name", display_sort : "Illness", page : 1, isloaded : false});}}>
                         Illness
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ sort_by : "illness_lethality", display_sort : "Lethality", page : 1, isloaded : false});}}>
                         Lethality
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ sort_by : "illness_contagious", display_sort : "Contagious", page : 1, isloaded : false});}}>
                         Contagious
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => {this.setState({ sort_by : "illness_treatable", display_sort : "Treatable", page : 1, isloaded : false});}}>
                         Treatable
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
                     disabled={this.state.page <= 0}
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
