import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';
import '../index.css'
import {} from 'react-bootstrap'
export default class UserEntry extends React.Component {
  render(){
    return(
      <div className="container">
        <div className="btn-group btn-group-justified">
        <Link to='/dashboard/projects' className="btn btn-primary">show all Projects</Link>
        <Link to='/dashboard/projects/my' className="btn btn-primary">show my Projects</Link>
        <Link to='/dashboard/projects/backed' className="btn btn-primary">Backed Projects</Link>
        </div>
      </div>
    );
  }
}
