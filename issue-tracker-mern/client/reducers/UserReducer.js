import * as types from '../actions/actionTypes';
import initialState from './initialState';

const UserReducer = (state = initialState.user, action) =>{
  switch (action.type) {
    case types.LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            username: action.username,
            errorMessage: ''
        })
    case types.LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            errorMessage: action.message
        })
    default:
        return state;
  }
}

/* Selectors */
export const getUser = state => 'adam.boothroyd@brightwavegroup.com';

export default UserReducer;