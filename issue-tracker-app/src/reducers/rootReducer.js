import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import issues from './issueReducer';
import comments from './commentReducer';
import status from './statusReducer';

const rootReducer = combineReducers(
    {issues, comments, status, routing: routerReducer}
    );



export default rootReducer;