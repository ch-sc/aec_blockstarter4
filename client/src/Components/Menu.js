import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';
import '../index.css'
import {} from 'react-bootstrap'
export default class UserEntry extends React.Component {
  render(){
    return(
      <div className="btn-group btn-group-justified">
        <Link to='/dashboard/projects' className="btn btn-info">show all Projects</Link>
        <Link to='/dashboard/projects/my' className="btn btn-info">show my Projects</Link>
        <Link to='/dashboard/projects/backed' className="btn btn-info">Backed Projects</Link>
      </div>
    );
  }
}
