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
            username: 'username',
            password: 'password',
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
    console.log('LOGIN USER REQUEST');
    return (dispatch) => {
        return callApi(`login`,'post', {
            username: 'username',
            password: 'password'
        }).then(res => dispatch(loginUser(res.user)));
  };
}