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
export default class BackingFormular extends React.Component {
  constructor(props) {
    super(props);

    this.doBackProject = this.doBackProject.bind(this);
    this.updateFundingAmount = this.updateFundingAmount.bind(this);
  }

  componentWillMount() {
    this.setState({ fundingAmount: '0' });
    this.setState({ projectAddress: this.props.project });
  }

  doBackProject() {
    if (this.state.fundingAmount > 0) {
        this.props.backProject(
          this.props.loggedInUser,
          this.props.projectAddress,
          this.state.fundingAmount
        )
      
    }
  }

  updateFundingAmount(e) {
    this.setState({ fundingAmount: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.doBackProject}>
        <label>
          funding amount:
          <input
            type="number"
            value={this.state.fundingAmount}
            onChange={this.updateFundingAmount}
          />
          {/*name="funding-amount"*/}
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
