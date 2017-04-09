//increment
export function increment(index) {
    return {
        type: 'INCREMENT_LIKES',
        index
    };
}

//add comment
export function addComment(issueId,author,comment){
    return{
        type: 'ADD_COMMENT',
        issueId,
        author,
        comment
    };
}


//remove comment
export function removeComment(issueId,i){
    return{
        type:'REMOVE_COMMENT',
        i,
        issueId
    };
}

//filter issues
export const setIssueFilter = (filter) =>{
    console.log('SET ISSUE FILTER');
    return{
        type: 'SET_ISSUE_FILTER',
        filter
    };
};