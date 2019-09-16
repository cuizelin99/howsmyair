
import React, { Component } from 'react';
import logo from './../logo.svg';

import BubbleChart from '@weknow/react-bubble-chart-d3';

import './../App.css';

class Bills extends Component {
  render() {
    return (
      <div className="App">
        <h3 className="App-intro">The Number of Bills Related to a Politician</h3>
        <br />
        <BubbleChart
          width={800}
          height={800}
          fontFamily="Arial"
          data={[
            { label: 'Rob Bishop', value: 1 },
            { label: 'John Barrasso', value: 2 },
            { label: 'Suzanne Bonamici', value: 2 },
            { label: 'Donald Beyer', value: 1 },
            { label: 'Maria Cantwell', value: 1 },
            { label: 'Lois Capps', value: 4 },
            { label: 'Shelley Capito', value: 2 },
            { label: 'Kathy Castor', value: 1 },
            { label: 'Gerald Connolly', value: 1 },
            { label: 'Matt Cartwright', value: 2 },
            { label: 'Diana DeGette', value: 1 },
            { label: 'Richard Durbin', value: 2 },
            { label: 'John Delaney', value: 2 },
            { label: 'Debbie Dingell', value: 1 },
            { label: 'Adriano Espaillat', value: 2 },
            { label: 'Al Franken', value: 1 },
            { label: 'Chris Gibson', value: 1 },
            { label: 'Paul Gosar', value: 2 },
            { label: 'Matt Gaetz', value: 1 },
            { label: 'Chuck Hagel', value: 2 },
            { label: 'Michael Honda', value: 3 },
            { label: 'Joseph Lieberman', value: 2 },
            { label: 'Barbara Lee', value: 4 },
            { label: 'Dennis Kucinich', value: 2 },
            { label: 'Stephan Lynch', value: 1 },
            { label: 'Daniel Lipinski', value: 2 },
            { label: 'Edward Markey', value: 3 },
            { label: 'John McCain', value: 2 },
            { label: 'Mitch McConnell', value: 1 },
            { label: 'Christopher Murphy', value: 2 },
            { label: 'Bill Nelson', value: 1 },
            { label: 'Grace Napolitano', value: 2 },
            { label: 'Frank Pallone', value: 2 },
            { label: 'Scott Peters', value: 3 },
            { label: 'Gary Palmer', value: 2 },
            { label: 'Matt Salmon', value: 1 },
            { label: 'Jackie Speier', value: 1 },
            { label: 'Steve Southerland', value: 1 },
            { label: 'Tom Udall', value: 2 },
            { label: 'Chris Van Hollen', value: 3 },
            { label: 'Henry Waxman', value: 1 },
            { label: 'Sheldon Whitehouse', value: 7 },
          ]}
        />
      </div>
    );
  }
}

export default Bills;
