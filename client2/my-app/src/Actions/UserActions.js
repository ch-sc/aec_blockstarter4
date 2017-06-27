import axios from 'axios';
import { REQUEST_USERS, LOGIN_USER } from '../Constants';

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