import axios from 'axios';
import { API_ENDPOINT, REQUEST_USERS, LOGIN_USER, REQUEST_PROJECTS_ALL, REQUEST_PROJECTS_OWNED, REQUEST_PROJECTS_BACKED } from '../Constants';

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
    }
}

export function requestProjects() {
    console.log('requesting all projects')
    return {
        type: REQUEST_PROJECTS_ALL,
        payload: axios.get('https://jsonplaceholder.typicode.com/posts')
    };
}

export function requestOwnedProjects(user) {
    console.log('Requesting ', user.name, '\'s projects...')
    return {
        type: REQUEST_PROJECTS_OWNED,
        payload: axios.get('https://jsonplaceholder.typicode.com/posts/2/comments')
    };
}

export function requestBackedProjects(user) {
    console.log('Requesting ', user.name, '\'s backed projects...')
    return {
        type: REQUEST_PROJECTS_BACKED,
        payload: axios.get('https://jsonplaceholder.typicode.com/posts/3/comments')
    };
}
