import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function setIssueFilter(issueFilter){
    return{
        type: types.SET_ISSUE_FILTER,
        issueFilter
    };
}

export function setActiveIssue(issue,index){
    return{
        type: types.SET_ACTIVE_ISSUE,
        issue
    };
}

export function toggleCheckedIssue(issue){
  return{
    type: types.TOGGLE_CHECKED_ISSUE,
    issue
  }
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

export function addIssueRequest(issue,files,issues,projectCode) {
  console.log('ADD ISSUE REQUEST');
  let data = new FormData();
  data.append(files,document);
  console.log(data);
  return (dispatch) => {
    return callApi(`(:projectCode)/issues/(:filter)`,'post', {
      issue: {
        project: projectCode,
        id: parseInt(issues[issues.length - 1].id) + 1,
        sco: issue.sco,
        screen: issue.screen,
        location: issue.location,
        category: issue.category,
        description: issue.description,        
        status: "New",
        assigned: issue.assigned,
        browser: issue.browser,
        dateAdded : new Date()
      },
      file : files
    }).then(res => dispatch(addIssue(res.issue)));
  };
}

export function saveIssue(issue){
  return {
    type: types.SAVE_ISSUE,
    issue
  };  
}

export function saveIssueRequest(issue) {
  return (dispatch) => {
    return callApi(`(:projectCode)/issues/(:filter)/(:id)`,'put', {
      issue: {
        project: issue.project,
        id: issue.id,
        sco: issue.sco,
        screen: issue.screen,
        location: issue.location,
        category: issue.category,
        description: issue.description,
        status: issue.status,
        assigned: issue.assigned
      },
    }).then(res => dispatch(saveIssue(res.issue)));
  };
}


export function sortIssues(index,header){
    return{
        type: types.SORT_ISSUES,
        index,
        header
    };
}

export function addIssueToBatch(id){
  return{
    type: types.ADD_ISSUE_TO_BATCH,
    id
  }
}

export function batchIssueRequest(batchIssues, batchOptions){
  console.log('BATCH ISSUES REQUEST');
  return (dispatch) => {
      return callApi(`(:projectCode)/issues/(:filter)/`,'put', {
        issues: batchIssues,
        options: batchOptions
      }).then(res => dispatch(batchIssues(res.issues)));
    };
}

export function batchIssues(issues){
  console.log('BATCH ISSUES SUCCESS');
  return{
    type: types.BATCH_ISSUES,
    issues
  }
}