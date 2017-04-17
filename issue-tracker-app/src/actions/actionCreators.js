
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
    }
}
