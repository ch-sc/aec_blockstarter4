import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import UserList from './Components/login';
import Dashboard from './Dashboard';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Blockstarter 4.0</h2>
        </div>
        <Router>
          <Switch>
          < div className="no-border">
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <div className="h2">
            <Route path="/login" component={UserList} />
            </div>
            <Route path="/dashboard" component={Dashboard} />
            </div>
          </Switch>
        </Router>
        {/*<p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/
      }
      </div>
    );
  }
}

export default App;
