import React, { Component } from 'react';
import { loginUser } from '../Actions/UserActions';
import { connect } from "react-redux";

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
                <div>{this.props.item.name}</div>
                {/*1st parameter of the bind function is the react event object*/}
                <button onClick={this.selectUser.bind(this, this.props.item)}>select</button>
            </div>

        );
    }
}