import React, { Component } from 'react';
import { requestProjects } from '../Actions/Actions';
import BackableProject from './BackableProject';

import { connect } from 'react-redux';

@connect(
  store => {
    return {
      loggedInUser: store.userReducer.loggedIn,
      projects: store.projectsReducer.allProjects,
      isLoading: store.projectsReducer.isLoadingProjects
    };
  },
  {
    requestProjects
  }
)

export default class AllProjects extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestProjects(this.props.loggedInUser);
  }

  render() {
    console.log('projects: ', this.props.ownedProjects);

    return (
      <div>
        <h2>Projects:</h2>
        {!this.props.projects && <p>No projects available yet! :(</p>}
        {this.props.projects &&
          this.props.projects.map(proj =>
            <div key={proj.address}>
              <BackableProject project={proj}/>
            </div>
          )}
      </div>
    );
  }
}
