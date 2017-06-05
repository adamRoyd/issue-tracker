import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function saveUser(user){
    return{
        type: types.SAVE_USER,
        user
    }
}

export function saveUserRequest(username,password) {
    return (dispatch) => {
        return callApi(`signup`,'post', {
            username,
            password,
            isClient: false
        }).then(res => dispatch(saveUser(res.user)));
  };
}

export function loginUser(user){
    console.log('LOGIN USER ACTION');
    console.log(user);
    return{
        type: types.LOGIN_USER,
        user
    }
}

export function loginUserRequest(username,password) {
    return (dispatch) => {
        return callApi(`login`,'post', {
            username,
            password
        }).then(res => dispatch(loginUser(res)));
  };
}