import * as types from '../actions/actionTypes';
import initialState from './initialState';

const AssigneeReducer = (state = initialState.assignees, action) => {
  switch (action.type) {
    case types.ADD_ASSIGNEES:
      return action.assignees;
    default:
      return state;
  }
};

export const getAssignees = state => state.assignees.map(function(o) {return o.assignee});

export default AssigneeReducer;