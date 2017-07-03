import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';

export default class UserEntry extends React.Component {
  render(){
    return(
      <div>
        <Link to='/dashboard/projects'>show all Projects</Link>
        <br/>
        <Link to='/dashboard/projects/my'>show my Projects</Link>
        <br/>
        <Link to='/dashboard/projects/backed'>Backed Projects</Link>
      </div>
    );
  }
}
