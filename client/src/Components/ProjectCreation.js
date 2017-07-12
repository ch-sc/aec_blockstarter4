import React, { Component } from 'react';
import { createProject } from '../Actions/Actions';
import {form, label, button, input } from 'react-bootstrap';
import '../index.css';
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
    createProject
  }
)
export default class ProjectCreationFormular extends React.Component {
  constructor(props) {
    super(props);

    this.doCreateProject = this.doCreateProject.bind(this);
    this.updateProjectTitle = this.updateProjectTitle.bind(this);
    this.updateProjectDescription = this.updateProjectDescription.bind(this);
    this.updateFundingGoal = this.updateFundingGoal.bind(this);
    this.updateFundingEnd = this.updateFundingEnd.bind(this);
  }

  currentDate() {
    return new Date()
      .toLocaleString('en-GB')
      .split(' ')[0]
      .split('/')
      .reverse()
      .join('-')
      .replace(',', '');
  }

  componentWillMount() {
    const initDate = this.currentDate();
    this.setState({ projectAddress: this.props.project });
    this.setState({ title: '' });
    this.setState({ description: '' });
    this.setState({ fundingGoal: 0 });
    this.setState({ fundingEnd: initDate });
  }

  doCreateProject() {
    const proj = {
      title: this.state.title,
      description: this.state.description,
      fundingGoal: this.state.fundingGoal,
      fundingEnd: this.state.fundingEnd
    };
    this.props.createProject(this.props.loggedInUser, proj);
  }

  updateProjectTitle(e) {
    this.setState({ title: e.target.value });
  }
  updateProjectDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateFundingGoal(e) {
    this.setState({ fundingGoal: e.target.value });
  }

  updateFundingEnd(e) {
    this.setState({ fundingEnd: e.target.value });
  }

  render() {
    return (
      <div className="text-left">
        <h2>Add a project</h2>
        <form onSubmit={this.doCreateProject} className="form-horizontal">
          
          <div className="form-group">
            <label className="col-sm-2 control-label">
             Title:  
            </label>
            <div className="col-sm-10">
              <input
                type="text" 
                className="form-control"
                aria-describedby="Title"
                placeholder="Title"
                type="text"
                value={this.state.title}
                onChange={this.updateProjectTitle}
                />
            </div>
          </div>
            
          <div className="form-group">  
            <label className="col-sm-2 control-label">
              Description:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                aria-describedby="Description" 
                placeholder="Description"
                value={this.state.description}
                onChange={this.updateProjectDescription}
                />
            </div>
          </div>
            
          <div className="form-group">  
            <label className="col-sm-2 control-label">
              Funding goal:
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                aria-describedby="fundingGoal" 
                placeholder="fundingGoal"
                id="inputdefault"
                value={this.state.fundingGoal}
                onChange={this.updateFundingGoal}
                />
            </div>
          </div>
            
          <div className="form-group">  
            <label className="col-sm-2 control-label">
              Funding deadline:
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                aria-describedby="Date" 
                placeholder="Date"
                value={this.state.fundingEnd}
                onChange={this.updateFundingEnd}
                />
            </div>
          </div>              
            
          <button type="submit" className="btn btn-success">Create new Project</button>
            
        </form>
      </div>
    );
  }
}
