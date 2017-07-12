import React, { Component } from 'react';
import { loginUser } from '../Actions/Actions';
import { connect } from "react-redux";
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';
import { container, Button } from 'react-bootstrap'
@connect(store => {
    return {};
})

export default class UserEntry extends React.Component {
  
    constructor(props) {
        super(props);
    }

    selectUser(pUser) {
        console.log('user', pUser);
        if (pUser) {
          this.props.dispatch(loginUser(pUser))
        }
    }

    render() {
        return (
            <div className="container">
              <br />
                 <div className="btn-group-vertical">
                 <Link to="/dashboard" className="btn btn-default" onClick={this.selectUser.bind(this, this.props.item)}>{this.props.item}</Link>
                </div>
            </div>

        );
    }
}
