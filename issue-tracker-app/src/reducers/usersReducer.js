import initialState from './initialState';

const usersReducer = (state = initialState.users, action) => {
    switch(action.type){
        case 'LOAD_USERS_SUCCESS':
            return action.users;
        default:
            return state;
    }
};

export default usersReducer;