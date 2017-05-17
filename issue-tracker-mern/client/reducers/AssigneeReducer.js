import * as types from '../actions/actionTypes';

const initialState = [];

const AssigneeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ASSIGNEES:
      return action.assignees;
    default:
      return state;
  }
};

export const getAssignees = state => state.assignees;

export default AssigneeReducer;