import initialState from './initialState';
import * as types from '../actions/actionTypes';

const assigneesReducer = (state = initialState.assignees, action) => {
    switch(action.type){
        case types.LOAD_ASSIGNEES_SUCCESS:
            return action.assignees;
        default:
            return state;
    }
};

export default assigneesReducer;