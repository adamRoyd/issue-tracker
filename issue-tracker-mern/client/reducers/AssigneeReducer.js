import * as types from '../actions/actionTypes';
import initialState from './initialState';

const AssigneeReducer = (state = initialState.assignees, action) => {
  switch (action.type) {
    case types.ADD_ASSIGNEES:
      const arry = [];
      Object.keys(action.assignees).forEach(key =>{
        arry.push(action.assignees[key].username);
      })
      return arry;
    default:
      return state;
  }
};

export const getAssignees = state => state.assignees;

export default AssigneeReducer;