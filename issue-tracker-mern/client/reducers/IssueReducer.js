// Initial State
const initialState = { data: [] };

const IssueReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/* Selectors */

// Get all issues
export const getIssues = state => state.issues.data;

// Get issues by cuid
export const getIssue = (state, cuid) => state.issues.data.filter(issues => issues.id === id)[0];

// Export Reducer
export default IssueReducer;
