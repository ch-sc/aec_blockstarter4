import React, { Component } from 'react';
import { backProject } from '../Actions/Actions';
import '../index.css';
import { connect } from 'react-redux';

@connect(
  store => {
    return {
      loggedInUser: store.userReducer.loggedIn,
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

  doBackProject(e) {
    e.preventDefault()
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
      <div className="panel panel-info backable-project">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.project.title}</h3>
        </div>
        <div className="panel-body">  
        
          <div className="text-left pull-left">
            <b>Funding amount:</b> {this.props.project.fundingAmount}<br />
            <b>Funding goal:</b> {this.props.project.fundingGoal}
          </div>        
          
          <form className="form-horizontal pull-right" onSubmit={this.doBackProject}>
            <div className="form-group">
              <label className="col-sm-2 control-label">
                Amount:
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="number"
                  value={this.state.fundingAmount}
                  onChange={this.updateFundingAmount}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success pull-right">Fund the project</button>
          </form>
          
        </div>
      </div>
    );
  }
}
