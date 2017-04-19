import issueApi from '../api/mockIssueApi';
import commentApi from '../api/mockCommentApi';

//add comment
export function addComment(issueId,author,comment){
    return{
        type: 'ADD_COMMENT',
        issueId,
        author,
        comment
    };
}
//filter issues
export function setIssueFilter(filter){
    return{
        type: 'SET_ISSUE_FILTER',
        filter
    };
}
//change status
export function changeStatus(status){
    return{
        type: 'CHANGE_ISSUE_STATUS',
        status
    };
}
//load issues
export function loadIssuesSuccess(issues){
    return {type: 'LOAD_ISSUES_SUCCESS',issues};
}

export function loadIssues(){
    return function(dispatch){
        return issueApi.getAllIssues().then(issues =>{
            dispatch(loadIssuesSuccess(issues));
        }).catch(error =>{
            throw(error);
        });
    };
}

//load comments
export function loadCommentsSuccess(comments){
    return {type: 'LOAD_COMMENTS_SUCCESS',comments};
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