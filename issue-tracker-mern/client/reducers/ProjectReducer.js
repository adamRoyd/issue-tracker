import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ProjectReducer = (state = initialState.projects, action) => {
    switch (action.type) {
        case types.ADD_PROJECTS:
            const projectsArray = [];
            Object.keys(action.projects).forEach(key => {
                projectsArray.push(action.projects[key].projectCode);
            });
            return projectsArray;
        default:
            return state;
    }
};

export const getProjects = state => state.projects;

export default ProjectReducer;
