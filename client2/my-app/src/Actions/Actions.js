import axios from 'axios';
import { REQUEST_USERS, LOGIN_USER, REQUEST_PROJECTS_ALL, REQUEST_PROJECTS_OWNED, REQUEST_PROJECTS_BACKED } from '../Constants';

export function requestUsers() {
    return {
        type: REQUEST_USERS,
        payload: axios.get('https://jsonplaceholder.typicode.com/users')
    };
}

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        user
    }
}

export function requestProjects() {
    return {
        type: REQUEST_PROJECTS_ALL,
        payload: axios.get('https://jsonplaceholder.typicode.com/posts')
    };
}

export function requestOwnedProjects() {
    return {
        type: REQUEST_PROJECTS_OWNED,
        payload: axios.get('https://jsonplaceholder.typicode.com/posts')
    };
}

export function requestBackedProjects() {
    return {
        type: REQUEST_PROJECTS_BACKED,
        payload: axios.get('https://jsonplaceholder.typicode.com/posts/2/comments')
    };
}
