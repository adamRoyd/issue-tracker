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

export const getPots = (area,issueClass) => {
  const arr = [];
  let obj = status.filter(f => f.area == area);
  if(area == 'internal'){
    if(issueClass == 'internal'){
      obj = obj.filter(f => f.name != 'Returned');
    } else{
      obj = obj.filter(f => f.name != 'Closed');
    }
  }
  Object.keys(obj).forEach( key => {
    arr.push(obj[key].name);
  })
  return arr;
}

export default IssueFilterReducer;