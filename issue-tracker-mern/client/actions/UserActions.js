import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function saveUser(username){
    return{
        type: types.SAVE_USER,
        username
    }
}

export function fetchUser() {
    console.log('FETCH USER ACTION');
    return (dispatch) => {
        return callApi('user').then(res => {
            dispatch(saveUser(res.username));
        });
    };
}

export function saveUserRequest(user) {
    return (dispatch) => {
        return callApi(`signup`,'post', {
            username : user.username,
            password : user.password,
            usertype: user.usertype
        }).then(res => dispatch(saveUser(res.user)));
  };
}

function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
    username: user.username
  }
}

function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {
    return (dispatch) => {
        dispatch(requestLogin(creds))
        return callApi(`login`,'post', {
            username : creds.username,
            password : creds.password
        }).then(res => {
          if(!res.username){
            dispatch(loginError(res))
          } else{
            localStorage.setItem('id_token', res.id_token)
            dispatch(receiveLogin(res))
          }
        });
  };
}

export function logout() {
    return (dispatch) => {
        return callApi(`logout`,'post', {}).then(res => dispatch(logoutUser()));
  };
}