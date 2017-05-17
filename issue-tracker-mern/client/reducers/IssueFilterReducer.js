import * as types from '../actions/actionTypes';

const IssueFilterReducer = (state = 'all', action) => {
  switch (action.type) {
    case types.SET_ISSUE_FILTER:
      return action.issueFilter;
    default:
      return state;
  }
};

export const getFilter = state => state.issueFilter;

export default IssueFilterReducer;