import * as types from '../actions/actionTypes';
import initialState from './initialState';

const UserRestrictionReducer = (state = initialState.userRestriction, action) =>{
  switch (action.type) {
    default:
      return state;     
  }
}

/* Selectors */
export default UserRestrictionReducer;