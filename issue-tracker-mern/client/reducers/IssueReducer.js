import * as types from '../actions/actionTypes';

// Initial State
const initialState = [];

const IssueReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ISSUES:
      return action.issues;
    default:
      return state;
  }
};

/* Selectors */

// Get all issues
export const getIssues = state => state.issues;

// Get issues by cuid
export const getIssue = (state, cuid) => state.issues.filter(issues => issues.id === id)[0];

// Export Reducer
export default IssueReducer;
