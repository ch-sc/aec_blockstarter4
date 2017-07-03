import React, { Component } from 'react';
import { requestProjects } from '../Actions/Actions';
import BackingFormular from './BackingFormular';

import { connect } from 'react-redux';

@connect(
  store => {
    return {
      projects: store.projectsReducer.allProjects,
      isLoading: store.projectsReducer.isLoadingProjects
    };
  },
  {
    requestProjects
  }
)

export default class InvestInProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {investmentvalue: '',projid:'' };
  }

//give you investmentvalue and projectid(projectid of  invested project)
  handleSubmit(event) {

    if (this.refs.invest !== '')
      event.preventDefault();

    return this.setState({ investmentvalue: this.refs.invest.value, projid:this.refs.projid.value });
  }

  componentWillMount() {
    this.props.requestProjects();
  }

//<Actions investmentvalue={this.state.investmentvalue} projid={this.state.projid}/>

  render() {

    return (
      <div>
        AddInvestmentInProject:

        {
          this.props.projects.map(proj =>
            <div>
              <table>
                <tr>
                  <td>{proj.id} </td>
                  <td>{proj.title} </td>
                  <td>
                    <div>
                      <form onSubmit={this.handleSubmit}>
                        <input type="text" ref="invest" value={proj.invest}/>
                        <input type="text" ref="projid" value={proj.id} style="display: none"/>
                        <input type="submit" value="Submit" />
                      </form>
                    </div>
                  </td>
                </tr>
              </table>
              <table>
                <tr>
                  <td> textvalue(Investment):{this.state.investmentvalue}</td>
                </tr>
                </table>
            </div>
          )}
      </div>
    );
  }
}
