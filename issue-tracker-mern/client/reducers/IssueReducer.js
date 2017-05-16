import { ADD_ISSUES } from '../actions/IssueActions';

// Initial State
const initialState = [];

const IssueReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case ADD_ISSUES:
      return action.issues;
  }
};

/* Selectors */

// Get all issues
export const getIssues = state => state.issues;

// Get issues by cuid
export const getIssue = (state, cuid) => state.issues.filter(issues => issues.id === id)[0];

// Export Reducer
export default IssueReducer;
