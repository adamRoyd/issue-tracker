//taking a slice of the state (filter : show all) and reassigning the value.
//filter is defined in the action!
import * as types from '../actions/actionTypes';

const issueFilter = (state = 'All', action) => {
  switch (action.type) {
    case types.SET_ISSUE_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default issueFilter;