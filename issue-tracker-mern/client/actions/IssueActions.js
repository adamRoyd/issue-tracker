import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function setIssueFilter(filter){
    return{
        type: types.SET_ISSUE_FILTER,
        filter
    };
}

export function addIssues(issues) {
  return {
    type: types.ADD_ISSUES,
    issues,
  };
}

export function addIssue(issue) {
  return {
    type: types.ADD_ISSUE,
    post,
  };
}

export function fetchIssues() {
  return (dispatch) => {
    return callApi('(:projectCode)/issues').then(res => {
      dispatch(addIssues(res.issues));
    });
  };
}

export function fetchIssue(id) {
  return (dispatch) => {
    return callApi(`(:projectCode)/issues/${id}`).then(res => dispatch(addPost(res.post)));
  };
}