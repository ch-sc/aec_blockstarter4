import {
  REQUEST_PROJECTS_ALL,
  REQUEST_PROJECTS_OWNED,
  REQUEST_PROJECTS_BACKED
} from '../Constants';

export default function ProjectsReducer(
  state = {
    isLoadingProjects: false,
    isLoadingOwnedProjects: false,
    isLoadingBackedProjects: false,

    allProjects: undefined,
    ownedProjects: undefined,
    backedProjects: undefined,

    error: undefined
  },
  action
) {
  switch (action.type) {
    // state chages for general projects
    case REQUEST_PROJECTS_ALL + '_PENDING': {
      return { ...state, isLoadingProjects: true };
    }

    case REQUEST_PROJECTS_ALL + '_FULFILLED': {
      return {
        ...state,
        isLoadingProjects: false,
        allProjects: action.payload.data
      };
    }

    case REQUEST_PROJECTS_ALL + '_REJECTED': {
      return { ...state, isLoadingProjects: false, error: action.payload };
    }

    // state chages for created projects
    case REQUEST_PROJECTS_OWNED + '_PENDING': {
      return { ...state, isLoadingOwnedProjects: true };
    }

    case REQUEST_PROJECTS_OWNED + '_FULFILLED': {
      return {
        ...state,
        isLoadingOwnedProjects: false,
        ownedProjects: action.payload.data
      };
    }

    case REQUEST_PROJECTS_OWNED + '_REJECTED': {
      return { ...state, isLoadingOwnedProjects: false, error: action.payload };
    }

    // state chages for backed projects
    case REQUEST_PROJECTS_BACKED + '_PENDING': {
      return { ...state, isLoadingBackedProjects: true };
    }

    case REQUEST_PROJECTS_BACKED + '_FULFILLED': {
      return {
        ...state,
        isLoadingBackedProjects: false,
        backedProjects: action.payload.data
      };
    }

    case REQUEST_PROJECTS_BACKED + '_REJECTED': {
      return {
        ...state,
        isLoadingBackedProjects: false,
        error: action.payload
      };
    }
  }

  return state;
}
