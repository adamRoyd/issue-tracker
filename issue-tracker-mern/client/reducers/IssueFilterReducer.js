import * as types from '../actions/actionTypes';
import initialState from './initialState';
import status from '../constants/status';

const IssueFilterReducer = (state = initialState.issueFilter, action) => {
  switch (action.type) {
    case types.SET_ISSUE_FILTER:
      return action.issueFilter;
    default:
      return state;
  }
};

export const getFilter = state => state.issueFilter;

export const getPots = () => {
  const arr = []
  Object.keys(status).forEach( key =>{
    arr.push(status[key].name);
  })

  return arr;
}

export default IssueFilterReducer;