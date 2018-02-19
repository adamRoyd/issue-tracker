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
            dispatch(saveUser(res.user));
        });
    };
}

export function addUserRequest(user) {
    return (dispatch) => {
        dispatch(fetchingAddUser());
        return callApi(`signup`,'post', {
            username : user.username,
            usertype: user.usertype,
            project: user.projects
        }).then(res => {
          if(res.error){
            dispatch(addUserFailure(res.message))
          } else {
            dispatch(addUserSuccess(res.message))
          }
        });
  };
}

export function forgotPasswordRequest(email) {
  return (dispatch) => {
    return callApi(`forgotpassword`,'post', {
        email : email
    }).then(res => {
      if(res.error){
        console.log("error");
      } else {
        console.log("success");
      }
    });
  };
}

export function fetchingAddUser(){
    return{
        type: types.FETCH_ADD_USER
    }
}

export function addUserSuccess(message){
  return {
    type: types.ADD_USER_SUCCESS,
    message
  }
}

export function addUserFailure(message){
  return {
    type: types.ADD_USER_FAILURE,
    message
  }
}

function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    creds
  }
}

function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user: user
  }
}

function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
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