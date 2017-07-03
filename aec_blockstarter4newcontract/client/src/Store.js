import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import { combineReducers } from 'redux';
import UserReducer from './Reducers/UserReducer';
import ProjectsReducer from './Reducers/ProjectsReducer';

const combreducers = combineReducers({
	userReducer: UserReducer,
  projectsReducer: ProjectsReducer
});

let middleware = composeWithDevTools(
	applyMiddleware(promise(), thunk, createLogger())
);

export default createStore(combreducers, middleware);
