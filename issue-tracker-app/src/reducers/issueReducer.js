import initialState from './initialState';
import * as types from '../actions/actionTypes';

const issueReducer = (state = initialState.issues, action) => {

    switch(action.type){
        case types.LOAD_ISSUES_SUCCESS:
            return action.issues;
        default:
            return state;   
    }
};

export default issueReducer;