import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function saveUser(user){
    console.log('SAVE USER ACTION');
    console.log(user);
    return{
        type:types.SAVE_USER,
        user
    }
}

export function saveUserRequest(username,password) {
    console.log('SAVE USER REQUEST');
    return (dispatch) => {
        return callApi(`signup`,'post', {
            username: 'username',
            password: 'password',
            email: 'email',
            firstName: 'firstName',
            lastName: 'lastName'
        }).then(res => dispatch(saveUser(res.user)));
  };
}