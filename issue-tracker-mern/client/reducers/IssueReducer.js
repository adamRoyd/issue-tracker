import * as types from '../actions/actionTypes';
import initialState from './initialState';

const IssueReducer = (state = initialState.issues, action) => {
  switch (action.type) {
    case types.ADD_ISSUES:
        return action.issues;
    case types.ADD_ISSUE:
        return [...state, action.issue]
    case types.SAVE_ISSUE:
        const existingIssueIndex = state.findIndex(a => a.id == action.issue.id)
        return [...state.map((issue,index) => {
                if(index == existingIssueIndex){
                    return Object.assign({},action.issue)
                }   else{
                    return issue
                }
            })
        ];
    case types.SET_ACTIVE_ISSUE:
        return [
            ...state.map((issue) => {
                if(issue.id == action.issue.id){
                    return Object.assign({},issue,{
                        active : true
                    });
                } else{
                    return Object.assign({},issue,{
                        active : false
                    });
                }
            })
        ];
    case types.TOGGLE_CHECKED_ISSUE:
        return [
            ...state.map((issue) =>{
                if(issue == action.issue){
                    return Object.assign({}, issue, {
                        checked: !issue.checked
                    });
                } else{
                    return issue
                }
            })
        ]
    case types.SORT_ISSUES:
        if(action.header.filter == 0 || action.header.filter == 2){
            return [
                ...state.slice(0).sort(function(a,b) {
                    a = a[Object.keys(a)[action.index]];
                    b = b[Object.keys(b)[action.index]];
                    if(typeof a == 'number'){
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
                    if(typeof a == 'number'){
                        return parseFloat(b) - parseFloat(a);
                    }   else{
                        return (a < b) ? 1 : ((b < a) ? -1 : 0);
                    }
                })   
            ];
        }
    default:
        return state;
  }
};

/* Selectors */
export const getIssues = state => state.issues;

export const getBatchIssues = state => state.issues.filter((issue) => issue.checked == true);

export const getVisibleIssues = (issues, filter) => {
    switch(filter){
        case 'new':
            return issues.filter(t => t.status == 'New');
        case 'onhold':
            return issues.filter(t => t.status == 'On Hold');
        case 'readytofix':
            return issues.filter(t => t.status == 'Ready To Fix');
        case 'fixed':
            return issues.filter(t => t.status == 'Fixed');
        case 'returned':
            return issues.filter(t => t.status == 'Returned');
        case 'closed':
            return issues.filter(t => t.status == 'Closed');
        case 'rejected':
            return issues.filter(t => t.status == 'Rejected');        
        default:
            return issues;
    }
};

// Export Reducer
export default IssueReducer;
