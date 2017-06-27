import React, { Component } from 'react';
import { loginUser } from '../Actions/UserActions';

export default class Projects extends React.Component {

  constructor(props) {
    super(props);

    this.loadProjects.bind(this.props.route.user);
  }

  loadProjects(user){
    // load user's projects...
  }

    render() {
      return(
        <div>Projects:
          {/*show all projects here*/}
        </div>
      )
    }

}
