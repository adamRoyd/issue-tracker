import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ProjectReducer = (state = initialState.projects, action) =>{
  switch (action.type) {
    case types.ADD_PROJECTS:
      return action.projects;
    default:
      return state;     
  }
}

/* Selectors */
export const getProjects = state => state.projects;

export default ProjectReducer;