import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import issues from './issueReducer';
import comments from './commentReducer';

const rootReducer = combineReducers(
    {issues, comments, routing: routerReducer}
    );



export default rootReducer;