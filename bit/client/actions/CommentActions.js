import * as types from './actionTypes';
import callApi from '../util/apiCaller';

export function addComment(comment) {
    return {
        type: types.ADD_COMMENT,
        comment,
    };
}

export function addCommentRequest(comment, status, params) {
    return (dispatch) => {
        return callApi('addComment', 'post', {
            comment: {
                project: params.projectCode,
                issueId: params.id,
                text: comment.text,
                user: comment.user,
                status,
                time: new Date(),
            },
        }).then(res => dispatch(addComment(res.comment)));
    };
}

export function addComments(comments) {
    console.log("add comments being called");
    return {
        type: types.ADD_COMMENTS,
        comments,
    };
}

export function fetchingComments() {
    return {
        type: types.GLOBAL_FETCHING,
    };
}

export function fetchComments(projectCode, id) {
    return (dispatch) => {
        return callApi(`${projectCode}/(:area)/(:filter)/${id}`).then(res => {
            dispatch(addComments(res.comments));
        });
    };
}
