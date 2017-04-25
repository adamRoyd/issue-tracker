import initialState from './initialState';
import * as types from '../actions/actionTypes';

const issueReducer = (state = initialState.issues, action) => {

    switch(action.type){
        case types.LOAD_ISSUES_SUCCESS:
            return action.issues;
        case types.SAVE_ISSUE_SUCCESS:
            return state;
        default:
            return state;   
    }
};

export default issueReducer;