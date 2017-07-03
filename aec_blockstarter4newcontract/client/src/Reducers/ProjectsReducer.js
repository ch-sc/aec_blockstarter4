import {
  REQUEST_PROJECTS_ALL,
  REQUEST_PROJECTS_OWNED,
  REQUEST_PROJECTS_BACKED,
  REQUEST_Projects_Invested,
  REQUEST_DELETE_PROJECTS
} from '../Constants';

export default function ProjectsReducer(
  state = {

    isLoadingProjects_Invested: false,
    Projects_Invested: undefined,

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

    // state chages for general Projects_Invested
    case REQUEST_Projects_Invested + '_PENDING': {
      return { ...state, isLoadingProjects_Invested: true };
    }

    case REQUEST_Projects_Invested + '_FULFILLED': {
      return { ...state, isLoadingProjects_Invested: false, Projects_Invested: action.payload.data };
    }

    case REQUEST_Projects_Invested + '_REJECTED': {
      return { ...state, isLoadingProjects_Invested: false, error: action.payload };
    }

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

    case REQUEST_DELETE_PROJECTS: {
      return {
        ...state,
        isLoadingOwnedProjects: false,
        ownedProjects: state.ownedProjects.filter(x => x.address !== action.data.projectAddress)
      }
    }
  }

  return state;
}
