import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function addProjects(projects) {
    return {
        type: types.ADD_PROJECTS,
        projects,
    };
}

export function fetchProjects() {
    return (dispatch) => {
        return callApi('selectproject').then(res => {
            dispatch(addProjects(res.projects));
        });
    };
}

export function addProjectRequest(project) {
    return (dispatch) => {
        dispatch(requestProject());
        return callApi('addproject', 'post', {
            project,
        }).then(res => {
            if (!res.project) {
                dispatch(addProjectFailure(res.message));
            } else {
                dispatch(addProjectSuccess(res.message));
            }
        });
    };
}

export function requestProject() {
    return {
        type: types.REQUEST_PROJECT,
    };
}

export function addProjectSuccess(message) {
    return {
        type: types.ADD_PROJECT_SUCCESS,
        message,
    };
}

export function addProjectFailure(message) {
    return {
        type: types.ADD_PROJECT_FAILURE,
        message,
    };
}
