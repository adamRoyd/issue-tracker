import * as types from '../actions/actionTypes';
import initialState from './initialState';

const UserReducer = (state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) =>{
  switch (action.type) {
    case types.LOGIN_SUCCESS:
        console.log('LOGIN SUCCESS REDUCER');
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            errorMessage: ''
        })
    case types.LOGIN_FAIL:
        return state;
    default:
        console.log('FIRED');
        console.log(state);
        return state;
  }
}

/* Selectors */
export const getUser = state => state.user;

export default UserReducer;