/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

import issues from './IssueReducer';
import projects from './ProjectReducer';
import comments from './CommentReducer';
import assignees from './AssigneeReducer';
import issueFilter from './IssueFilterReducer';
import headers from './HeaderReducer';
import user from './UserReducer';
import attachments from './AttachmentReducer';

export default combineReducers({
  projects,
  issues,
  comments,
  assignees,
  issueFilter,
  headers,
  user,
  attachments
});
