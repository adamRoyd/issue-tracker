import initialState from './initialState';
import * as types from '../actions/actionTypes';

function postComments(state = [], action) {
  switch(action.type){
    case types.ADD_COMMENT:
      // return the new state with the new comment
      return [...state,{
        user: action.author,
        text: action.comment,
        time: action.time
      }];
    default:
      return state;
  }
}

export default function commentReducer(state = initialState.comments, action) {
  switch(action.type){
    case ('LOAD_COMMENTS_SUCCESS'):
      return action.comments;
  }
  if(typeof action.issueId !== 'undefined') {
    return {
      // take the current state
      ...state,
      // overwrite this post with a new one
      [action.issueId]: postComments(state[action.issueId], action)
    };
  }
  return state;
}

