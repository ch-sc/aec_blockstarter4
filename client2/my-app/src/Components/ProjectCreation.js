import React, { Component } from 'react';
import { backProject } from '../Actions/Actions';

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
    backProject
  }
)
export default class ProjectCreationFormular extends React.Component {
  constructor(props) {
    super(props);

    this.doCreateProject = this.doCreateProject.bind(this);
  }

  componentWillMount() {
    this.setState({ projectAddress: this.props.project });
  }

  doCreateProject() {

  }


  render() {
    return (
      <form onSubmit={this.doCreateProject}>        
      </form>
    );
  }
}
