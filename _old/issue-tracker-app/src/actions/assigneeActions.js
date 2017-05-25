import * as types from './actionTypes';
import assigneeApi from '../api/mockAssigneeApi';

//load assignees
export function loadAssigneesSuccess(assignees){
    return {type: types.LOAD_ASSIGNEES_SUCCESS,assignees};
}

export function loadAssignees(){
    return function(dispatch){
        return assigneeApi.getAllAssignees().then(assignees =>{
            dispatch(loadAssigneesSuccess(assignees));
        }).catch(error =>{
            throw(error);
        });
    };
}