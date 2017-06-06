import * as types from '../actions/actionTypes';
import initialState from './initialState';

const UserReducer = (state = initialState.user, action) =>{
  switch (action.type) {
    case types.LOGIN_SUCCESS:
        console.log('LOGIN SUCCESS REDUCER');
        console.log(action.user);
        return action.user;
    case types.LOGIN_FAIL:
        return state;
    default:
        return state;
  }
}

/* Selectors */
export const getUser = state => state.user;

export default UserReducer;