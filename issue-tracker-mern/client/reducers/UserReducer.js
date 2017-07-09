import * as types from '../actions/actionTypes';
import initialState from './initialState';

const UserReducer = (state = initialState.user, action) =>{
  switch (action.type) {
    case types.LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            username: action.user.username,
            usertype: action.user.usertype,
            userproject: action.user.project,
            errorMessage: ''
        })
    case types.LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.message
        })
    case types.SAVE_USER:
        console.log('SAVE USER REDUCER');
        return Object.assign({}, state, {
            username: action.user.username,
            usertype: action.user.usertype,
            userproject: action.user.project,
        })
    case types.LOGOUT_USER:
        return Object.assign({}, state, {
            username: null
        })
    default:
        return state;
  }
}

/* Selectors */
export const getUser = state => state.user;

export default UserReducer;