import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ProjectReducer = (state = initialState.projects, action) =>{
  switch (action.type) {
    default:
      return state;
    case types.ADD_PROJECTS:
      return action.projects;
  }
}

/* Selectors */
export const getProjects = state => state.projects;

export default ProjectReducer;