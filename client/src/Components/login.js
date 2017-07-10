import React, { Component } from 'react';
import UserEntry from './userSelectionEntry';
import { get } from 'axios';
import { connect } from "react-redux";
import { requestUsers } from '../Actions/Actions';
import '../index.css';
import { container } from 'react-bootstrap';
@connect(store => {
    return {
        loading: store.userReducer.loading,
        users: store.userReducer.data,
    };
}, {
        requestUser: requestUsers
    })

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.requestUser();
    }

    render() {
        let { users } = this.props;
        return (
            <div className="container">
                    <h3>Select a User:</h3>
                 
                {!users && <p>No users available! :(</p>}
                
                { users && users.map(
                    user => 
                    <UserEntry 
                    key={user} 
                    item={user} 
                    />)
                } 
               
                
            </div>
        );
    }
}