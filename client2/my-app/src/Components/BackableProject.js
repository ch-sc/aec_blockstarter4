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

export default class BackableProject extends React.Component {
  constructor(props) {
    super(props);

    this.doBackProject = this.doBackProject.bind(this);
    this.updateFundingAmount = this.updateFundingAmount.bind(this);
  }

  componentWillMount() {
    this.setState({ fundingAmount: 0 });
    this.setState({ project: this.props.project });
  }

  doBackProject() {
    if (this.state.fundingAmount > 0) {
      this.props.backProject(
        this.props.loggedInUser,
        this.props.project.address,
        this.state.fundingAmount
      );

      this.props.project.fundingAmount =
        this.props.project.fundingAmount + Number(this.state.fundingAmount);
      console.log('new funding amount ', this.props.project.fundingAmount);
      this.setState({ fundingAmount: '0' });
    }
  }

  updateFundingAmount(e) {
    this.setState({ fundingAmount: e.target.value });
  }

  render() {
    return (
      <div>
        {this.props.project.title} - {this.props.project.fundingAmount} / {this.props.project.fundingGoal}
        <form onSubmit={this.doBackProject}>
          <label>
            funding amount:
            <input
              type="number"
              value={this.state.fundingAmount}
              onChange={this.updateFundingAmount}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
