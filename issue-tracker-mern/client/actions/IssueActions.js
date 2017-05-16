import callApi from '../util/apiCaller';

// Export Constants
export const ADD_ISSUES = 'ADD_ISSUES';
export const SET_ISSUE_FILTER = 'SET_ISSUE_FILTER';

export function setIssueFilter(filter){
    return{
        type: types.SET_ISSUE_FILTER,
        filter
    };
}

export function addIssues(issues) {
  return {
    type: ADD_ISSUES,
    issues,
  };
}

export function fetchIssues() {
  return (dispatch) => {
    return callApi('issues').then(res => {
      dispatch(addIssues(res.issues));
    });
  };
}