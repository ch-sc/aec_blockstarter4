import { REQUEST_USERS, LOGIN_USER } from './Constants';

export default function UserReducer(
	state = {
		loading: false,
		data: undefined,
		isLoggedIn: false,
		loggedIn: undefined,
		error: undefined
	},
	action
) {
	switch (action.type) {
		case REQUEST_USERS + '_PENDING': {
			return { ...state, loading: true };
		}

		case REQUEST_USERS + '_FULFILLED': {
			return { ...state, loading: false, data: action.payload.data };
		}

		case REQUEST_USERS + '_REJECTED': {
			return { ...state, loading: false, error: action.payload };
		}

		case LOGIN_USER: {
			return { ...state, isLoggedIn: action.user !== undefined, loggedIn: action.user }
		}
	}

	return state;
}
