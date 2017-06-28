import React, { Component } from 'react';
import Projects from './Components/Projects';
import { connect } from "react-redux";
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';

@connect(store => {
    return {
      isLoggedIn: store.userReducer.isLoggedIn,
      loggedInUser: store.userReducer.loggedIn
    };
})

export default class SecuredLayer extends React.Component {
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
      return <Redirect to="/login"/>
    }
    
    // ToDo: pass 'loggedInUser' to sub components
    return (
        <Route path="/blockstarter" component={Projects}/>
    );
  }
}
