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
      <div>
        <div className="panel panel-primary">
              <div className="panel-heading">
               <h3 className="panel-title">Refund</h3>
              </div>
          <div className="panel-body">  
            <div key={this.props.project.address}>{this.props.project.title} - {this.props.project.fundingAmount} / {this.props.project.fundingGoal}</div>        
            <div  onClick={this.doDeleteProject}>delete / refund backers</div>
          </div>
        </div>
      </div>
    )
  }
}

