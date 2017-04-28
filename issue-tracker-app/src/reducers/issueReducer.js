import initialState from './initialState';
import * as types from '../actions/actionTypes';

const issueReducer = (state = initialState.issues, action) => {

    switch(action.type){
        case types.LOAD_ISSUES_SUCCESS:
            return action.issues;
        case types.SORT_ISSUES:
            if(action.header.filter == 0 || action.header.filter == 2){
                return [
                    ...state.slice(0).sort(function(a,b) {
                        a = a[Object.keys(a)[action.index]];
                        b = b[Object.keys(b)[action.index]];
                        if(parseFloat(a)){
                            return parseFloat(a) - parseFloat(b);
                        }   else{
                            return (a > b) ? 1 : ((b > a) ? -1 : 0);
                        }
                    })   
                ];
            }   else{
                return [
                    ...state.slice(0).sort(function(a,b) {
                        a = a[Object.keys(a)[action.index]];
                        b = b[Object.keys(b)[action.index]];
                        if(parseFloat(a)){
                            return parseFloat(b) - parseFloat(a);
                        }   else{
                            return (a < b) ? 1 : ((b < a) ? -1 : 0);
                        }
                    })   
                ];
            }
        
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