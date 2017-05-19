import * as types from '../actions/actionTypes';
import initialState from './initialState';

const IssueReducer = (state = initialState.issues, action) => {
  switch (action.type) {
    case types.ADD_ISSUES:
        return action.issues;
    case types.ADD_ISSUE:
        return [...state, action.issue]
    case types.SAVE_ISSUE:
        console.log('SAVE ISSUE REDUCER');
        const existingIssueIndex = state.findIndex(a => a.id == action.issue.id)
        console.log(existingIssueIndex);
        return state.splice(existingIssueIndex,1,action.issue);
    case types.SORT_ISSUES:
        if(action.header.filter == 0 || action.header.filter == 2){
            return [
                ...state.slice(0).sort(function(a,b) {
                    a = a[Object.keys(a)[action.index]];
                    b = b[Object.keys(b)[action.index]];
                    if(parseFloat(a)){
                        return parseFloat(a) - parseFloat(b);
                    }   else{
                        return (a > b) ? 1 : ((b > a) ? -1 : 0);
                    }
                })   
            ];
        }   else{
            return [
                ...state.slice(0).sort(function(a,b) {
                    a = a[Object.keys(a)[action.index]];
                    b = b[Object.keys(b)[action.index]];
                    if(parseFloat(a)){
                        return parseFloat(b) - parseFloat(a);
                    }   else{
                        return (a < b) ? 1 : ((b < a) ? -1 : 0);
                    }
                })   
            ];
        }
    default:
      return state;
  }
};

/* Selectors */

// Get all issues
export const getIssues = state => state.issues;

// Get issues by cuid
export const getIssue = (state, id) => state.issues.filter(issues => issues.id === id)[0];

// Export Reducer
export default IssueReducer;
