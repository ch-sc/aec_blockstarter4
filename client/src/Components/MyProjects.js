import React, { Component } from 'react';
import { requestOwnedProjects } from '../Actions/Actions';
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
      <div>
        < br />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">My Projects</h3>  
          </div>  
          <div className="panel-body">  
            {this.props.projects &&
              this.props.projects.map(proj =><MyProjectEntry project={proj} key={proj.address}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}
