import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function addProjects(projects){
    return{
        type:types.ADD_PROJECTS,
        projects
    }
}

export function fetchProjects() {
    return (dispatch) => {
        return callApi('selectproject').then(res => {
            dispatch(addProjects(res.projects));
        });
    };
}