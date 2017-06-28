import React, { Component } from 'react';
import { requestOwnedProjects } from '../Actions/Actions';

import { connect } from "react-redux";

@connect(store => {
  return {
      loggedInUser: store.userReducer.loggedIn,
      ownedProjects: store.projectsReducer.ownedProjects
  }
},{
  requestOwnedProjects
})

export default class Projects extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestOwnedProjects(this.props.loggedInUser);
  }

    render() {
      console.log('projects: ', this.props.ownedProjects)

      return(
        <div>Projects:
          {this.props.ownedProjects && this.props.ownedProjects.map(proj => <div key={proj.id}>{proj.title}</div>)}          
        </div>
      )
    }
}
