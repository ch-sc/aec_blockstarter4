import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './Components/login';
import SecuredLayer from './SecuredLayer';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Blockstarter 4.0</h2>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/blockstarter" />
            </Route>
            
            <Route path="/login" component={UserList} />
            <Route path="/blockstarter" component={SecuredLayer} />
          </Switch>
        </Router>
        {/*<p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
      </div>
    );
  }
}

export default App;
