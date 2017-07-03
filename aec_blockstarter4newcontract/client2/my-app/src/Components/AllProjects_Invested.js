import React, { Component } from 'react';
import { requestProjects, requestProjects_Invested } from '../Actions/Actions';
//import BackingFormular from './BackingFormular';

import { connect } from 'react-redux';

@connect(
    store => {
        return {

            projects_invested: store.projectsReducer.Projects_Invested,
            isLoading: store.projectsReducer.isLoadingProjects_Invested
        };
    },
    {
        requestProjects_Invested
    }
)

export default class AllProjects_Invested extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idvalue: '' };
    }

    //give you id of backer
    handleSubmit(event) {

        if (this.refs.id !== '')
            event.preventDefault();

        return this.setState({ idvalue: this.refs.id.value });
    }


    componentWillMount() {
        this.props.requestProjects_Invested();
    }


//<Actions idvalue={this.state.idvalue} />

    render() {


        return (

            <div>
                textvalue:
               {this.state.idvalue}

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Input Backer's Id:
                        <input type="text" ref="id" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div>

                    Projects_Invested:
                    {this.props.projects_invested.map(projects =>
                        <table>
                            <tr>
                                <td>{projects.id} </td>
                                <td>{projects.title} </td>
                                <td>{proj.invest}</td>
                            </tr>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}
