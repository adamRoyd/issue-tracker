import * as types from '../actions/actionTypes';

const initialState = [];

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_COMMENT:
      return [action.comment, ...state]
    case types.ADD_COMMENTS:
      return action.comments;
    default:
      return state;
  }
};

export const getComments = state => state.comments;

export default CommentReducer;