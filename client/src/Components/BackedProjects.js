import React, { Component } from 'react';
import { requestBackedProjects } from '../Actions/Actions';

import { connect } from 'react-redux';

@connect(
  store => {
    return {
      loggedInUser: store.userReducer.loggedIn,
      projects: store.projectsReducer.backedProjects,
      isLoading: store.projectsReducer.isLoadingBackedProjects
    };
  },
  {
    requestBackedProjects
  }
)

export default class BackedProjects extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestBackedProjects(this.props.loggedInUser);
  }

  render() {
    console.log('My backed projects: ', this.props.projects);

    return (
      <div>
        <h2>My Projects:</h2>
        {this.props.projects &&
          this.props.projects.map(proj =>
            <div key={proj.address}>
              {proj.title}
            </div>
          )}
      </div>
    );
  }
}
