/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

import app from './AppReducer';
import posts from './PostReducer';
import intl from './IntlReducer';
import issues from './IssueReducer';
import projects from './ProjectReducer';
import comments from './CommentReducer';
import issueFilter from './IssueFilterReducer';

export default combineReducers({
  app,
  posts,
  intl,
  projects,
  issues,
  comments,
  issueFilter
});
