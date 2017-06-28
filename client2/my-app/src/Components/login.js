import React, { Component } from 'react';
import UserEntry from './userSelectionEntry';
import { get } from 'axios';
import { connect } from "react-redux";
import { requestUsers } from '../Actions/Actions';

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
            <div>
                Select a User:
                {!users && <p>No users available! :(</p>}
                {users && users.map(user => <UserEntry key={user.id} item={user} />)}
            </div>
        );
    }
}
