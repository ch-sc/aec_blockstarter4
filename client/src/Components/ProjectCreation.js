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
    // this.updateFundingStart = this.updateFundingStart.bind(this);
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

    // this.setState({ fundingStart: initDate });
    this.setState({ fundingEnd: initDate });
  }

  doCreateProject() {
    const proj = {
      title: this.state.title,
      description: this.state.description,
      fundingGoal: this.state.fundingGoal,
      // fundingStart: this.state.fundingStart,
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

  // updateFundingStart(e) {
  //   this.setState({ fundingStart: e.target.value });
  // }

  updateFundingEnd(e) {
    this.setState({ fundingEnd: e.target.value });
  }

  render() {
    return (
      <div>
      <form className="form-vertical">
  <fieldset>
   <form onSubmit={this.doCreateProject} className="form-vertical">
      <fieldset>
      <div>
        <label className="col-lg-2 control-label">
         Title: 
          <input
          type="text" 
          className="form-control"
           aria-describedby="Title"
           placeholder="Title"
            type="text"
            value={this.state.title}
            onChange={this.updateProjectTitle}
          /> 
        </label>
        <br /> <br />
        <label> 
          Description:
          <input
            type="text"
            className="form-control"
           aria-describedby="Description" 
           placeholder="Description"
            value={this.state.description}
            onChange={this.updateProjectDescription}
          />
        </label>
        <br /> <br />
        <label className="col-lg-2 control-label">
          Funding goal:
          <input
            type="number"
            className="form-control"
           aria-describedby="fundingGoal" 
           placeholder="fundingGoal"
           id="inputdefault"
            value={this.state.fundingGoal}
            onChange={this.updateFundingGoal}
          />
        </label>

        {/*<label>
          Funding start:
          <input
            type="date"
            value={this.state.fundingStart}
            onChange={this.updateFundingStart}
          />
        </label>*/}
        <br /> <br />
        <label>
          Funding deadline:
          <input
            type="date"
            className="form-control"
           aria-describedby="Date" 
           placeholder="Date"
            value={this.state.fundingEnd}
            onChange={this.updateFundingEnd}
          />
        </label>
        <input type="submit" value="Submit"/>
          </div>
          </fieldset>
      </form>
  </fieldset>
</form>
</div>
    );
  }
}
