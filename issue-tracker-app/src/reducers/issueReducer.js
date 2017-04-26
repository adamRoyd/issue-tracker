import initialState from './initialState';
import * as types from '../actions/actionTypes';

const issueReducer = (state = initialState.issues, action) => {

    switch(action.type){
        case types.LOAD_ISSUES_SUCCESS:
            return action.issues;
        case types.SAVE_ISSUE_SUCCESS:
            return action.issues;
        case types.SET_ACTIVE_ISSUE:
            return [
                ...state.map((issue,index) => {
                    if(index == action.index){
                        return Object.assign({},action.issue,{
                            active : true
                        });
                    } else{
                        return Object.assign({},issue,{
                            active : false
                        });
                    }
                })
            ];
        default:
            return state;   
    }
};

export default issueReducer;