import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import issues from './issueReducer';
import comments from './commentReducer';
import status from './statusReducer';
import filter from './issueFilter';

const rootReducer = combineReducers(
    {issues, comments, status, filter, routing: routerReducer}
    );



export default rootReducer;