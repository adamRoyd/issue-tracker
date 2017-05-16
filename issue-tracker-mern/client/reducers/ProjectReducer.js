import * as types from '../actions/actionTypes';

const initialState = {};

const ProjectReducer = (state = initialState, action) =>{
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