import initialState from './initialState';

const issueReducer = (state = initialState.issues, action) => {

    switch(action.type){
        case 'LOAD_ISSUES_SUCCESS':
            return action.issues;
        default:
            return state;   
    }
};

export default issueReducer;