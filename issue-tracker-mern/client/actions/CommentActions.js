import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function addComment(comment) {
  return {
    type: types.ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment,status,params) {
  return (dispatch) => {
    return callApi(`(:projectCode)/issues/(:filter)/(:id)`,'post', {
      comment: {
        project: params.projectCode,
        issueId: params.id,
        text: comment.text,
        user: "adam.boothroyd@brightwavegroup.com",
        status: status,
        time: new Date()
      },
    }).then(res => dispatch(addComment(res.comment)));
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
