import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Projects from  './Components/Projects';
import UserList from './Components/login';
import SecuredLayer from './SecuredLayer';
import Todos from './Components/Todos';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';

class App extends Component {
comstructor()
{
  super();
  this.state={
    todos:[],
    userid:undefined
  }
}
getTodos(userid)
{
$.ajax({
  url:'https://jsonplaceholder.typicode.com/todos',
  dataType:'json',
  cache:false,
  success: function(data){this.setState({todos:data},function(){console.log(this.state);});}.bind(this),
  error:function(xhr,status,err){
    console.log(err);
  }

});
}
componentWillMount(){
  this.getTodos();
}
componentDidMount()
{
this.getTodos();

}

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Blockstarter 4.0</h2>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/blockstarter" />
            </Route>
            
            <Route path="/login" component={UserList} />
            <Route path="/blockstarter" component={SecuredLayer} />
          </Switch>
        </Router>
        {/*<p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <hr />
        <Todos todos={this.state.todos}/>

      </div>
    );
  }
}


export default App;
