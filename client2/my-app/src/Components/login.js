import React, { Component } from 'react';
import UserEntry from './userSelectionEntry';
import { get } from 'axios';
import { connect } from "react-redux";
import { requestUsers } from '../Actions/UserActions';

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
                Users:
                {!users && <p>ES gibt ja gar keine user</p>}
                {users && users.map(user => <UserEntry key={user.id} item={user} />)}
            </div>
        );
    }
}