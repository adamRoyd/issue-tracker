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

export function saveIssueSuccess(issues){
    return {type: types.SAVE_ISSUE_SUCCESS};
}

export function saveIssue(id,status){
    return function(dispatch){
        return issueApi.saveIssue(id,status).then(issues =>{
            dispatch(saveIssueSuccess(issues));
        }).catch(error =>{
            throw(error);
        });
    };    
}