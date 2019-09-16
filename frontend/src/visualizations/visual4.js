/*
Inpired by: https://gitlab.com/siweimao/connect-with-nature/tree/master/frontend/Components
*/

import React, {Component} from 'react';
import * as d3 from "d3";
import uStates from './uStates';
import './StatesMap.css';

import axios from "axios";

class Visual4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      illnessStateDict: {
        AL: 0,
        AK: 0,
        AZ: 0,
        AR: 0,
        CA: 0,
        CO: 0,
        CT: 0,
        DE: 0,
        FL: 0,
        GA: 0,
        HI: 0,
        ID: 0,
        IL: 0,
        IN: 0,
        IA: 0,
        KS: 0,
        KY: 0,
        LA: 0,
        ME: 0,
        MD: 0,
        MA: 0,
        MI: 0,
        MN: 0,
        MS: 0,
        MO: 0,
        MT: 0,
        NE: 0,
        NV: 0,
        NH: 0,
        NJ: 0,
        NM: 0,
        NY: 0,
        NC: 0,
        ND: 0,
        OH: 0,
        OK: 0,
        OR: 0,
        PA: 0,
        RI: 0,
        SC: 0,
        SD: 0,
        TN: 0,
        TX: 0,
        UT: 0,
        VT: 0,
        VA: 0,
        VI: 0,
        WA: 0,
        WV: 0,
        WI: 0,
        WY: 0
      },

      loaded: false
    };
  }


    componentDidMount() {
      axios
        .all([
          axios.get("https://api.engageclimatechange.world/bills"),
        ])
        .then(
          axios.spread((locationData) => {
             locationData.data.objects.forEach(bill => {
                   this.state.illnessStateDict[bill.state] = this.state.illnessStateDict[bill.state] + 1;


              });
            this.setState({
              loaded: true
            });
          })
        );
    }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { illnessStateDict, pollutantStateDict, loaded } = this.state;

    const { billStateDict, efpollutantStateDict, progStateDict } = this.state;
    var data = [];
    if (illnessStateDict != null) {
      let temp = this.state.illnessStateDict;
      for (const [key, value] of Object.entries(temp)) {
        var tempDict = {};
        tempDict["label"] = key;
        tempDict["value"] = value;
        data.push(tempDict);
      }
    }
    var dataEF = [];
    if (efpollutantStateDict != null) {
      let temp = efpollutantStateDict;
      for (const [key, value] of Object.entries(temp)) {
        let tempDict = {};
        tempDict["label"] = key;
        tempDict["value"] = value;
        dataEF.push(tempDict);
      }
    }
    var pollData = [];
    if (pollutantStateDict != null) {
      let temp = this.state.pollutantStateDict;
      for (const [key, value] of Object.entries(temp)) {
        let tempDict = {};
        tempDict["label"] = key;
        tempDict["value"] = value;
        pollData.push(tempDict);
      }
    }
    if (loaded) {
      return (
        <div>
          <StateMap
            illnessData={illnessStateDict}
            first="Bills:"
          />
        </div>
      );
    }
    if (!loaded) {
      return (
        <div>
         Loading
        </div>
      );
    }
  }
}

export default Visual4;

class StateMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      isLoaded: false,
      illnessStateDict: props.illnessData,
      pollutantStateDict: props.pollutantData,
      first: props.first,
      second: props.second,
    };
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.setState({
        isLoaded: true,
      });
  }

  drawChart() {
    const { illnessStateDict, first } = this.state;
    function tooltipHtml(n, d){ /* function to create html content string in tooltip div. */
      return "<h4>"+n+"</h4><table>"+
        "<tr><td>" + (first) + "</td><td>"+(d.bills)+"</td></tr>"+
        "</table>";
    }
    var sampleData ={};
    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
    "WI", "MO", "AR", "OK", "KS", "LA", "VA"]
      .forEach(function(d){
        var ill = illnessStateDict[d];


        sampleData[d]={bills: ill,
                       color:d3.interpolate("#ebffe8", "#3dff08")((ill ) / 5)};
      });

    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");
  }

  render() {
    if(this.state.isLoaded){
      this.drawChart();
    }
    return (
      <div className="container">
        <div id="tooltip"></div>
        <svg width="960" height="600" id="statesvg"></svg>
      </div>
    );

  }
}
