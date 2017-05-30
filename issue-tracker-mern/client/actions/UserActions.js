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

export function saveUserRequest(user) {
    console.log('SAVE USER REQUEST');
    return (dispatch) => {
        return callApi('signup','post', {
        user: {
            username: 'username',
            password: 'password',
            email: 'email',
            firstName: 'firstName',
            lastName: 'lastName'
        },
        }).then(res => dispatch(saveUser(res.user)));
  };
}