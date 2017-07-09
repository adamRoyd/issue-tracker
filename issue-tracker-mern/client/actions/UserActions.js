import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function saveUser(user){
    return{
        type: types.SAVE_USER,
        user : user
    }
}

export function fetchUser() {
    return (dispatch) => {
        return callApi('user').then(res => {
            console.log(res.user);
            dispatch(saveUser(res.user));
        });
    };
}

export function addUserRequest(user) {
    return (dispatch) => {
        return callApi(`signup`,'post', {
            username : user.username,
            usertype: user.usertype,
            project: user.projects
        }).then(res => dispatch(addUserSuccess()));
  };
}

function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    creds
  }
}

function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    user: user
  }
}

function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    message
  }
}

export function logoutUser(){
  return {
    type: types.LOGOUT_USER
  }
}

export function loginUser(creds) {
    return (dispatch) => {
        dispatch(requestLogin(creds))
        return callApi(`login`,'post', {
            username : creds.username,
            password : creds.password
        }).then(res => {
          if(!res.user){
            dispatch(loginError(res))
          } else{
            dispatch(loginSuccess(res.user))
          }
        });
  };
}

export function logout() {
    return (dispatch) => {
        return callApi(`logout`,'post', {}).then(res => dispatch(logoutUser()));
  };
}