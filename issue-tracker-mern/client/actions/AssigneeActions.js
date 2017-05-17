import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function addAssignees(assignees){
    return{
        type:types.ADD_ASSIGNEES,
        assignees
    }
}

export function fetchAssignees() {
    console.log('FETCH ASSIGNEE ACTION');
    return (dispatch) => {
        return callApi('(:projectCode)').then(res => {
            dispatch(addAssignees(res.assignees));
        });
    };
}