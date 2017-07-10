import React, { Component } from 'react';
import { requestOwnedProjects } from '../Actions/Actions';
import ProjectCreation from './ProjectCreation';
import MyProjectEntry from './MyProjectEntry';

import { connect } from 'react-redux';

@connect(
  store => {
    return {
      loggedInUser: store.userReducer.loggedIn,
      projects: store.projectsReducer.ownedProjects,
      isLoading: store.projectsReducer.isLoadingOwnedProjects
    };
  },
  {
    requestOwnedProjects
  }
)
export default class MyProjects extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestOwnedProjects(this.props.loggedInUser);
  }

  render() {
    console.log('My personal projects: ', this.props.projects);

    return (
      <div className="container">
        <h2>My Projects:</h2>        
        {this.props.projects &&
          this.props.projects.map(proj =>
          <MyProjectEntry project={proj} key={proj.address}/> 
          
          )}
          {/*<div key={proj.address}>{proj.title}</div>*/}
        
        <h2>Create new Project:</h2>
        <ProjectCreation />

      </div>
    );
  }
}
