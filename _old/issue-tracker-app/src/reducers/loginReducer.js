import initialState from './initialState';
import * as types from '../actions/actionTypes';

const loginReducer = (state = initialState.user, action) => {
    switch(action.type){
        case types.SET_USER:
            return action.userName;
        default:
            return state;   
    }
};

export default loginReducer;