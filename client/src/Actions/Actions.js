import axios from 'axios';
import {
  API_ENDPOINT,
  REQUEST_USERS,
  LOGIN_USER,
  REQUEST_PROJECTS_ALL,
  REQUEST_PROJECTS_OWNED,
  REQUEST_PROJECTS_BACKED,
  REQUEST_BACK_PROJECTS,
  REQUEST_CREATE_PROJECTS,
  REQUEST_DELETE_PROJECTS
} from '../Constants';

export function requestUsers() {
  return {
    type: REQUEST_USERS,
    payload: axios.get(`${API_ENDPOINT}/users`)
  };
}

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user
  };
}

export function requestProjects() {
  console.log('requesting all projects');
  return {
    type: REQUEST_PROJECTS_ALL,
    payload: axios.get(`${API_ENDPOINT}/projects`)
  };
}

export function requestOwnedProjects(user) {
  console.log('Requesting projects of user ', user);
  return {
    type: REQUEST_PROJECTS_OWNED,
    payload: axios.get(`${API_ENDPOINT}/users/` + user + `/projects`)
  };
}

export function requestBackedProjects(user) {
  console.log('Requesting backed projects of user ', user);
  return {
    type: REQUEST_PROJECTS_BACKED,
    payload: axios.get('https://jsonplaceholder.typicode.com/posts/3/comments')
  };
}

export function backProject(user, project, amount) {
  console.log('Funding project with ', amount, 'Ether');
  return {
    type: REQUEST_BACK_PROJECTS,
    payload: axios.post(`${API_ENDPOINT}/funds`, {
      userAddr: user,
      projAddr: project,
      funding: amount
    })
  };
}

export function deleteProject(user, _project) {
  console.log('Deleting project ', _project.address, ' and refunding every backer.');

  return {
    type: REQUEST_DELETE_PROJECTS,
    data: {
      projectAddress: _project.address,
      payload: axios.delete(
        `${API_ENDPOINT}/users/` + user + `/project/` + _project.address
      )
    }
  };
}

export function createProject(user, project) {
  console.log(
    'Trying to create project ',
    project.title,
    ' with funding goal:',
    project.fundingGoal
  );
  return {
    type: REQUEST_CREATE_PROJECTS,
    payload: axios.post(`${API_ENDPOINT}/users/` + user + `/projects`, {
      title: project.title,
      description: project.description,
      fundingStart: project.fundingStart,
      fundingGoal: project.fundingGoal
    })
  };
}
