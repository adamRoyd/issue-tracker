import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function setIssueFilter(issueFilter){
    return{
        type: types.SET_ISSUE_FILTER,
        issueFilter
    };
}

export function addIssues(issues) {
  return {
    type: types.ADD_ISSUES,
    issues,
  };
}

export function fetchIssues(projectCode) {
  return (dispatch) => {
    return callApi(`${projectCode}/issues/(:filter)`).then(res => {
      dispatch(addIssues(res.issues));
    });
  };
}

export function addIssue(issue) {
  console.log('ADD ISSUE');
  return {
    type: types.ADD_ISSUE,
    issue,
  };
}

export function addIssueRequest(issue,issues,projectCode) {
  console.log('ADD ISSUE REQUEST ACTION');

  return (dispatch) => {
    return callApi(`(:projectCode)/issues/(:filter)`,'post', {
      issue: {
        project: "abc123",
        id: 9,//parseInt(issues[issues.length - 1]).id + 1,
        location: issue.location,
        sco: issue.sco,
        screen: issue.screen,
        category: issue.category,
        assigned: "to do assigned",
        description: issue.description,
        summary: issue.summary
      },
    }).then(res => dispatch(addIssue(res.issue)));
  };
}