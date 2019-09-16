import React from 'react';
import ReactDOM from 'react-dom';
import Locations from './pages/locations/Locations'
import Illnesses from './pages/illnesses/Illnesses'
import Pollutants from './pages/pollutants/Pollutants'
import Home from './App';
import NavBar from './NavBar';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

ReactDOM.render(<NavBar />, document.getElementById('navigation'));

// https://codeburst.io/getting-started-with-react-router-5c978f70df91
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
