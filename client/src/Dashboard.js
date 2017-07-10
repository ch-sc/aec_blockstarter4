import React, { Component } from 'react';
import AllProjects from './Components/AllProjects';
import MyProjects from './Components/MyProjects';
import BackedProjects from './Components/BackedProjects';
import  './index.css';
// import BackedProjects from './Components/BackedProjects';
import { connect } from "react-redux";
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';
import Menu from './Components/Menu';

@connect(store => {
    return {
      isLoggedIn: store.userReducer.isLoggedIn,
      loggedInUser: store.userReducer.loggedIn
    };
})

export default class Dashboard extends React.Component {
  constructor(props) {
      super(props);
  }

  checkLoggedIn() {
    this.props.requestUser();
  }

  render() {
    let { isLoggedIn } = this.props;
    let { loggedInUser } = this.props;

    if (!isLoggedIn) {
    <div>
      return <Redirect to="/login"/> </div>
    }
    
    return (
        <div>
          <Menu/>
          <Switch>
            <Route exact path="/dashboard">
            </Route>
            <Route exact path='/dashboard/projects' component={AllProjects}/>
            <Route exact path="/dashboard/projects/my" component={MyProjects}/>
            <Route exact path="/dashboard/projects/backed" component={BackedProjects}/>
          </Switch>
        </div>
    );
  }
}
