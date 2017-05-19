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

export function saveIssue(issue){
  console.log('SAVE ISSUE ACTION');
  console.log(issue);
  return {
    type: types.SAVE_ISSUE,
    issue
  };  
}

export function saveIssueRequest(issue) {
  console.log('SAVE ISSUE REQUEST');
  return (dispatch) => {
    return callApi(`(:projectCode)/issues/(:filter)/(:id)`,'put', {
      issue: {
        id: 1
      },
    }).then(res => dispatch(saveIssue(res.issue)));
  };
}


export function sortIssues(index,header){
    console.log('SORT ISSUES ACTION');
    return{
        type: types.SORT_ISSUES,
        index,
        header
    };
}