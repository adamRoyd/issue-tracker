import initialState from './initialState';
import * as types from '../actions/actionTypes';

function postComments(state = initialState.comments, action) {
  switch(action.type){
    case types.ADD_COMMENT:
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
      ...state,
      [action.issueId]: postComments(state[action.issueId], action)
    };
  }
  return state;
}

