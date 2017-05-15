import callApi from '../util/apiCaller';

// Export Constants
export const ADD_ISSUES = 'ADD_ISSUES';

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