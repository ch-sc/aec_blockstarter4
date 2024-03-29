import React, { Component } from 'react';
import { container } from 'react-bootstrap';
import UserList from './Components/login';
import Dashboard from './Dashboard';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';
import 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class App extends Component {

  render() {

    return (
      <div className="container">
        <div className="container-fluid bg-3 text-center">
          <div className="jumbotron">
            <h1>Blockstarter 4.0</h1>
          </div>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" component={UserList} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
