
import React, { Component } from 'react';
import logo from './../logo.svg';

import BubbleChart from '@weknow/react-bubble-chart-d3';

import './../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <br />
        <BubbleChart
          width={800}
          height={800}
          fontFamily="Arial"
          data={[
            { label: 'N-Hexane', value: 7000 },
            { label: 'propylene', value: 3000 },
            { label: 'Dioxane', value: 3000 },
            { label: 'Gasoline Vapors', value: 2100 },
            { label: 'Ethylbenzene', value: 2000 },
            { label: 'Styrene', value: 900 },
            { label: 'Dichlorobenzene', value: 800 },
            { label: 'EGME', value: 700 },
            { label: 'Xylene', value: 700 },
            { label: 'Ethylene Glycol', value: 400 },
            { label: 'Dichloroetha', value: 400 },
            { label: 'Toluene', value: 300 },
            { label: 'Vinyl Acetate', value: 200 },
            { label: 'M-Xylene', value: 200 },
            { label: 'Phenol', value: 200 },
            { label: 'P-Xylene', value: 200 },
            { label: 'Triethylamine', value: 200 },
            { label: 'Ozone', value: 180 },
            { label: 'EGMEA', value: 90 },
            { label: 'Tetrachloroe Thylene', value: 35 },
            { label: 'Hydrobromide Acid', value: 24 },
            { label: 'Mineral Fibers', value: 24 },
            { label: 'Sodium Selenate', value: 20 },
            { label: 'Butadiene', value: 20 },
            { label: 'Sodium Selenite', value: 20 },
            { label: 'Nitrogen Dioxide', value: 20 },
            { label: 'Butylene Oxide', value: 20 },
            { label: 'Benzyl Chloride', value: 12 },
            { label: 'Cresol', value: 4 },
            { label: 'Epichlorohydrin', value: 3 },
            { label: 'Methyl Isobutyl Ketone', value: 3}
          ]}
        />
      </div>
    );
  }
}

export default App;
