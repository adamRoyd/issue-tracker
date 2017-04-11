function postComments(state = [], action) {
  switch(action.type){
    case 'ADD_COMMENT':
      // return the new state with the new comment
      return [...state,{
        user: action.author,
        text: action.comment
      }];
    default:
      return state;
  }
}

function commentReducer(state = [], action) {
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

export default commentReducer;