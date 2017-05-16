import * as types from './actionTypes';

export function setUser(userName){
    return {
        type: types.SET_USER,
        userName
    };
}

