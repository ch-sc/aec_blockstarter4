import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';




class Backers_Invested extends Component {
 
 
 /*getInitialState() {
    return {data: []};
  }
 */
   constructor() {
    super();
    this.state = {
      todos: []
    }
    
  } 

/*
 constructor(props) {
    super(props);
    this.state = { empleados: [] }
  }

  componentWillMount() {
    fetch('http://taller-angular.carlosazaustre.es/empleados')
      .then((response) => {
        return response.json()
      })
      .then((empleados) => {
        this.setState({ empleados: empleados })
      })
  }
*/




 getTodos() {
    $.ajax({
      type:'GET',
      url: 'https://jsonplaceholder.typicode.com/todos',
      datatype: 'json',
      cache: 'fale',

      success: function (data) {
        this.setstate({ todos: data })
      }.bind(this),

      err: function (xhr, status, err) {
        console.log(err);

      }

    }

    )

  }

//<td> {this.state.data}</td> 
// <td>{this.state.empleados}</td>

componentWillMount()  {
    this.getTodos();
     //setInterval(this.getTodos.bind(this), this.props.pollInterval);
   }

componentDidMount () {
    this.getTodos();
      // setInterval(this.getTodos.bind(this), this.props.pollInterval);
   }


  render() {
    return (

      <div className="App">
        <table>
           <tr>
             <td> {this.getTodos.bind(this)}</td>
             <td> {this.state.data}</td> 
            
           </tr>
        </table>
         
  
      </div>

    );
  }
}

export default Backers_Invested;
