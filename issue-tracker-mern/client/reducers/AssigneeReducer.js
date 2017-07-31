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

export const getAssignees = state => {
  const area = state.area;
  if(area == 'internal') {
      let filteredUsers =  state.assignees.filter((a) => 
        a.usertype == 'Admin' || a.usertype == 'Internal'
      )
      return filteredUsers.map((u) => {
        return u.username
      })
  } else{
      let filteredUsers =  state.assignees.filter((a) => 
        a.usertype == 'Client'
      )
      return filteredUsers.map((u) => {
        return u.username
      })
  };
}

export default AssigneeReducer;