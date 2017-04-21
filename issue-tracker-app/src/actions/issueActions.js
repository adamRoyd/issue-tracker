import * as types from './actionTypes';
import issueApi from '../api/mockIssueApi';


export function setIssueFilter(filter){
    return{
        type: types.SET_ISSUE_FILTER,
        filter
    };
}

export function changeStatus(status){
    return{
        type: types.CHANGE_ISSUE_STATUS,
        status
    };
}

export function loadIssuesSuccess(issues){
    return {type: types.LOAD_ISSUES_SUCCESS,issues};
}

export function loadIssues(){
    return function(dispatch){
        return issueApi.getAllIssues().then(issues =>{
            dispatch(loadIssuesSuccess(issues));
        }).catch(error =>{
            throw(error);
        });
    };
}