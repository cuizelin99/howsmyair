import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Jumbotron,
  Table,
  Container
  } from 'reactstrap';
import DavidB from './../assets/davidb.png'
import JamisonM from './../assets/jamisonPhoto.png'
import JasonL from './../assets/jason_headshot.jpg'
import JasonS from './../assets/jasons.png'
import KevinH from './../assets/kevinPhoto.jpeg'
import PeterC from './../assets/selfie.jpg'


export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	Bommersbach_commits: 0,
        	Bommersbach_issues: 0,
        	Miles_commits: 0,
        	Miles_issues: 0,
        	Lihuang_commits: 0,
        	Lihuang_issues: 0,
        	Sim_commits: 0,
        	Sim_issues: 0,
        	Hsiang_commits: 0,
        	Hsiang_issues: 0,
        	Cui_commits: 0,
        	Cui_issues: 0,
        	Total_commits: 0,
        	Total_issues: 0,
        };
    }

    componentDidMount() {
        this.getAllCommits(1);
        this.getAllIssues(1);
    }

    async getAllCommits(page_num) {
      	fetch("https://gitlab.com/api/v4/projects/12998780/repository/commits?all=true&per_page=100&page=" + page_num)
    		.then(res => res.json())
    		.then(
    			(result) => {
    				if(Object.entries(result).length !== 0) {
    					result.forEach(commit => {
    						this.state.Total_commits += 1;
                     switch(commit.committer_name) {
                        case 'David Bommersbach':
                           this.state.Bommersbach_commits += 1;
                           break;
                        case 'Jamison Miles':
                           this.state.Miles_commits += 1;
                           break;
                        case 'jamisonm':
                           this.state.Miles_commits += 1;
                           break;
                        case 'John Galt':
                           // Error with commit name for some reason
                           this.state.Miles_commits += 1;
                           break;
                        case 'Jason Lihuang':
                           this.state.Lihuang_commits += 1;
                           break;
                        case 'Jason Sim' :
                           this.state.Sim_commits += 1;
                           break;
                        case 'simjason' :
                           // Jason's alt user name
                           this.state.Sim_commits += 1;
                           break;
                        case 'jason.y.sim' :
                           // Jason's other alt user name
                           this.state.Sim_commits += 1;
                           break;
                        case 'Kevin Hsiang':
                           this.state.Hsiang_commits += 1;
                           break;
                        case 'Zelin Cui':
                           this.state.Cui_commits += 1;
                           break;
                        case 'cuizelin99':
                           // Zelin's alt user name
                           this.state.Cui_commits += 1;
                           break;
                     }
                     // if(commit.author_email == 'jamisonm'){
                     //   this.state.Miles_commits+=1;
                     // }
    					});
                        this.forceUpdate();
                        return this.getAllCommits(page_num + 1);
    				}
    			})
    }

   async getAllIssues(page_num) {
    	fetch("https://gitlab.com/api/v4/projects/12998780/issues?all=true&per_page=100&page=" + page_num)
    		.then(res => res.json())
    		.then(
    			(result) => {
    				if(Object.entries(result).length !== 0) {
    					result.forEach(issue => {
    						this.state.Total_issues += 1;
                     switch(issue.author.name) {
                        case 'David Bommersbach':
                           this.state.Bommersbach_issues += 1;
                           break;
                        case 'Jamison Miles':
                           this.state.Miles_issues += 1;
                           break;
                        case 'Jason Lihuang':
                           this.state.Lihuang_issues += 1;
                           break;
                        case 'Jason Sim' :
                           this.state.Sim_issues += 1;
                           break;
                        case 'simjason' :
                           this.state.Sim_issues += 1;
                           break;
                        case 'jason.y.sim' :
                           // Jason's other alt user name
                           this.state.issues += 1;
                           break;
                        case 'Kevin Hsiang':
                           this.state.Hsiang_issues += 1;
                           break;
                        case 'Zelin Cui':
                           this.state.Cui_issues += 1;
                           break;
                        case 'cuizelin99':
                           // Zelin's alt user name
                           this.state.Cui_issues += 1;
                           break;

                     }
    					});
                        this.forceUpdate();
                        return this.getAllIssues(page_num + 1);
    				}
    			})
    }

    render() {
	    return (
	      <div>
            <Jumbotron fluid>
            <Container>
                <h1 className="display-3">About</h1>
                <div>
                The purpose of this site is to inform people about how air quality can affect health. We hope that the general public can
                find out the quality for a location on a given day, related health risks, as well as an overview of air quality over a larger geographic span.
                By integrating this disparate data, people can use this information before traveling and prepare for adverse air conditions.
                </div>
                <br/>
            </Container>
            </Jumbotron>
	        <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Picture</th>
                        <th>Biography</th>
                        <th>Major Responsibilities</th>
                        <th>Commits</th>
                        <th>Issues</th>
                        <th>Unit Tests</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>David Bommersbach</td>
                        <td><img src={DavidB} alt="Photo" height="100" /></td>
                        <td>I work at a startup</td>
                        <td>Front-end Development, Acceptance Tests (Selenium).</td>
                        <td>{ this.state.Bommersbach_commits }</td>
                        <td>{ this.state.Bommersbach_issues }</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Jamison Miles</td>
                        <td><img src={JamisonM} alt="Photo" height="100" /></td>
                        <td>Senior at the University of Texas at Austin. I like to code
                        and have most of my experience in embedded systems.</td>
                        <td>Postman API Design, Front-end Development, Refine and implement the RESTful API using Postman.</td>
                        <td>{ this.state.Miles_commits }</td>
                        <td>{ this.state.Miles_issues }</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Jason Lihuang</td>
                        <td><img src={JasonL} alt="Photo" height="100" /></td>
                        <td>I'm a computer science junior who also copy edits at The Daily Texan. I like taking photos and almond croissants</td>
                        <td>Front-end Development.</td>
                        <td>{ this.state.Lihuang_commits }</td>
                        <td>{ this.state.Lihuang_issues }</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Jason Sim</td>
                        <td><img src={JasonS} alt="Photo" height="100" /></td>
                        <td>I am a computer science major who lives in Austin</td>
                        <td>AWS, Front-end Development, Back-end & Front-end development, API.</td>
                        <td>{ this.state.Sim_commits }</td>
                        <td>{ this.state.Sim_issues }</td>
                        <td>66</td>
                    </tr>
                    <tr>
                        <td>Kevin Hsiang</td>
                        <td><img src={KevinH} alt="Photo"  height="100" /></td>
                        <td>A UT Student who really needs more sleep.</td>
                        <td>About Page and Slack Integration, Back-end development.</td>
                        <td>{ this.state.Hsiang_commits }</td>
                        <td>{ this.state.Hsiang_issues }</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Peter Cui</td>
                        <td><img src={PeterC} alt="Photo" height="100" /></td>
                        <td>Sophomore CS student at the University of Texas at Austin. Trying to be an interesting person.</td>
                        <td>User stories, technical report, unit tests, technical report.</td>
                        <td>{ this.state.Cui_commits }</td>
                        <td>{ this.state.Cui_issues }</td>
                        <td>23</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total:</td>
                        <td>{ this.state.Total_commits }</td>
                        <td>{ this.state.Total_issues } (Including User Stories)</td>
                        <td>110</td>
                    </tr>
                </tbody>
            </Table>

            <Container>
            <b>
            <p><h5><a href="https://gitlab.com/jamisonm/cs373-airpollution">Our GitLab Repo</a></h5></p>
            <p><h5><a href="https://documenter.getpostman.com/view/8053610/SVSDQXCC?version=latest">Our Restful API</a></h5></p>
            </b>

            <p>Data Sources:<ul>
            <li>http://geodb-cities-api.wirefreethought.com/</li>
				<li>https://cloud.google.com/maps-platform</li>
				<li>hhttps://pubchem.ncbi.nlm.nih.gov/</li>
				<li>https://open.cdc.gov/apis.html</li>

			</ul></p>

           	<p>Tools Used:
           	<ul>
           		<li>Amazon Web Services: Used to host the website.</li>
           		<li>Namecheap: Used to find a "pretty" domain name for free.</li>
           		<li>React: Used to develop the website front end.</li>
           		<li>Postman: Used to design an API.</li>
           	</ul></p>
         </Container>
	      </div>
	    );
	}
}
