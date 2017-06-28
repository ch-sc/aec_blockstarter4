import React, { Component } from 'react';
import { loginUser } from '../Actions/Actions';
import { connect } from "react-redux";
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';

@connect(store => {
    return {};
})
export default class UserEntry extends React.Component {
    constructor(props) {
        super(props);

        //this.selectUser = this.selectUser.bind(this);
    }

    selectUser(pUser) {
        console.log('user', pUser);
        if (pUser) {
            this.props.dispatch(loginUser(pUser));
        }
    }

    render() {
        return (
            <div>
              {/*1st parameter of the bind function is the react event object*/}
              <Link to="/dashboard" onClick={this.selectUser.bind(this, this.props.item)}>{this.props.item.name}</Link>
                {/*<div onClick={this.selectUser.bind(this, this.props.item)}>{this.props.item.name}</div>*/}
                
                {/*<button onClick={this.selectUser.bind(this, this.props.item)}>select</button>*/}
            </div>

        );
    }
}
