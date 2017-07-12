import React, { Component } from 'react';
import { deleteProject } from '../Actions/Actions';

import { connect } from 'react-redux';

@connect(
  store => {
    return {
      loggedInUser: store.userReducer.loggedIn
    };
  },
  {
    deleteProject
  }
)
export default class MyProjectEntry extends React.Component {
  constructor(props) {
    super(props);

    this.doDeleteProject = this.doDeleteProject.bind(this);
  }

  componentWillMount() {
    this.setState({ project: this.props.project });
  }

  doDeleteProject() {
    this.props.deleteProject(this.props.loggedInUser, this.props.project);
  }

  render(){
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.project.title}</h3>
        </div>
        <div className="panel-body">  
          <div className="text-left pull-left">
            <b>Funding amount:</b> {this.props.project.fundingAmount}<br />
            <b>Funding goal:</b> {this.props.project.fundingGoal}
          </div>        
          <button type="button" className="btn btn-danger pull-right" onClick={this.doDeleteProject}>delete / refund backers</button>
        </div>
      </div>
    )
  }
}
