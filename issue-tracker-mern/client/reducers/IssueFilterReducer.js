import * as types from '../actions/actionTypes';
import initialState from './initialState';


const IssueFilterReducer = (state = initialState.issueFilter, action) => {
  switch (action.type) {
    case types.SET_ISSUE_FILTER:
      return action.issueFilter;
    default:
      return state;
  }
};

export const getFilter = state => state.issueFilter;

export default IssueFilterReducer;