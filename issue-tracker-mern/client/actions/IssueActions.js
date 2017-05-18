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
  return {
    type: types.ADD_ISSUE,
    issue,
  };
}

export function addIssueRequest(issue,issues,projectCode) {
  return (dispatch) => {
    console.log(projectCode);
    return callApi(`(:projectCode)/issues/(:filter)`,'post', {
      issue: {
        project: projectCode,
        id: parseInt(issues[issues.length - 1].id) + 1,
        sco: issue.sco,
        screen: issue.screen,
        location: issue.location,
        summary: issue.summary,
        category: issue.category,
        description: issue.description,        
        status: "New",
        assigned: "to do assigned",
        dateAdded : new Date()
      },
    }).then(res => dispatch(addIssue(res.issue)));
  };
}