/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './AppReducer';
import posts from './PostReducer';
import intl from './IntlReducer';
import issues from './IssueReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  issues
});
