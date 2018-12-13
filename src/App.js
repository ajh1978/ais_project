import React, { Component } from 'react';
import './App.scss';
import Home from './Home';
import VesselLocation from './VesselLocation';
import Warnings from './Warnings';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
      <div className="App">

        <Route exact path='/' component={Home} />

        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/vessellocation'>Nearest vessels</Link></li>
          <li><Link to='/warnings'>Nautical warnings</Link></li>
        </ul>

        <footer>
          <p>Lähde http://meri-test.digitraffic.fi</p>
        </footer>

        <hr />

        <Route path='/vessellocation' component={VesselLocation} />
        <Route path='/warnings' component={Warnings} />
      </div>
      </Switch>
    );
  }
}

export default App;
