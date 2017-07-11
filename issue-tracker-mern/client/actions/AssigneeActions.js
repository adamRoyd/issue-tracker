import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function addAssignees(assignees){
    return{
        type:types.ADD_ASSIGNEES,
        assignees
    }
}

export function fetchAssignees() {
    return (dispatch) => {
        return callApi('assignees').then(res => {
            dispatch(addAssignees(res.assignees));
        });
    };
}