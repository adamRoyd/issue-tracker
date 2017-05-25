import * as types from './actionTypes';
import projectApi from '../api/mockProjectApi';


export function loadProjectsSuccess(projects){
    return {type: types.LOAD_PROJECTS_SUCCESS,projects};
}

export function loadProjects(){
    return function(dispatch){
        return projectApi.getAllProjects().then(projects =>{
            dispatch(loadProjectsSuccess(projects));
        }).catch(error =>{
            throw(error);
        });
    };
}
