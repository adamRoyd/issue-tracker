import * as types from './actionTypes';
import commentApi from '../api/mockCommentApi';
import userApi from '../api/mockUserApi';

//add comment
export function addComment(issueId,author,comment,time){
    return{
        type: types.ADD_COMMENT,
        issueId,
        author,
        comment,
        time
    };
}

//load comments
export function loadCommentsSuccess(comments){
    return {type: types.LOAD_COMMENTS_SUCCESS,comments};
}

export function loadComments(){
    return function(dispatch){
        return commentApi.getAllComments().then(comments =>{
            dispatch(loadCommentsSuccess(comments));
        }).catch(error =>{
            throw(error);
        });
    };
}

//load users
export function loadUsersSuccess(users){
    return {type: types.LOAD_USERS_SUCCESS,users};
}

export function loadUsers(){
    return function(dispatch){
        return userApi.getAllUsers().then(users =>{
            dispatch(loadUsersSuccess(users));
        }).catch(error =>{
            throw(error);
        });
    };
}