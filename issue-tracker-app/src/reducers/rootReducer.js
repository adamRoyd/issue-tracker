import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import projects from './projectReducer';
import issues from './issueReducer';
import comments from './commentReducer';
import status from './statusReducer';
import filter from './issueFilter';
import assignees from './assigneesReducer';
import headers from './headerReducer';
import user from './loginReducer';
import locations from './locationReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers(
    {projects,issues,user,comments, status, assignees, filter, headers, categories, locations,routing: routerReducer}
);



export default rootReducer;