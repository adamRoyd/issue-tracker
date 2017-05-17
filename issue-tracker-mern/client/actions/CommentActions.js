import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function addComment(comment) {
  return {
    type: types.ADD_COMMENT,
    comment,
  };
}

export function addComments(comments) {
    return {
        type : types.ADD_COMMENTS,
        comments
    };
}

export function fetchComments(projectCode,id) {
  return (dispatch) => {
    return callApi(`${projectCode}/issues/(:filter)/${id}`).then(res => {
      dispatch(addComments(res.comments));
    });
  };
}
