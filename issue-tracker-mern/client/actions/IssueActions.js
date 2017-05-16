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

export function fetchIssues() {
  return (dispatch) => {
    return callApi('(:projectCode)/issues').then(res => {
      dispatch(addIssues(res.issues));
    });
  };
}