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

export const getPots = area => {
  const arr = [];
  const obj = status.filter(f => f.area == area);
  Object.keys(obj).forEach( key => {
    arr.push(obj[key].name);
  })
  return arr;
}

// export const getPots = (area, issues, params) => {
//   const issue = issues.filter((i => i.id == params.id));
//   const arr = [];
//   const obj = status.filter(f => f.area == area);
//   Object.keys(obj).forEach( key => {
//     arr.push(obj[key].name);
//   })
//   if(area == 'internal' && issue[0].class == 'client'){
//     return arr.filter(i => i != 'Closed')
//   } else{
//     return arr;
//   }
// }

export default IssueFilterReducer;