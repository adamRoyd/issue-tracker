import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import issues from './issueReducer';
import comments from './commentReducer';
import status from './statusReducer';
import filter from './issueFilter';
import users from './usersReducer';
import headers from './headerReducer';

const rootReducer = combineReducers(
    {issues, comments, status, users, filter, headers, routing: routerReducer}
);



export default rootReducer;