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
        <br />
        <div className="panel panel-default" >
          <div className="panel-heading">
            <h3 className="panel-title">Projects:</h3>
          </div>
          <div className="panel-body">
            {!this.props.projects && <p>No projects available yet! :(</p>}
            {this.props.projects &&
              this.props.projects.map(proj =>
              <BackableProject project={proj} key={proj.address}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}
