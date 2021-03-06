import * as types from './actionTypes';
import callApi from '../util/apiCaller';
import callApiUpload from '../util/apiUpload';

export function setIssueFilter(issueFilter) {
    return {
        type: types.SET_ISSUE_FILTER,
        issueFilter,
    };
}

export function setActiveIssue(issue, index) {
    return {
        type: types.SET_ACTIVE_ISSUE,
        issue,
    };
}

export function toggleCheckedIssue(issue) {
    return {
        type: types.TOGGLE_CHECKED_ISSUE,
        issue,
    };
}

export function addIssues(issues) {
    return {
        type: types.ADD_ISSUES,
        issues,
    };
}

export function fetchingIssues() {
    return {
        type: types.GLOBAL_FETCHING,
    };
}

export function fetchIssues(projectCode) {
    return (dispatch) => {
        dispatch(fetchingIssues());
        return callApi(`${projectCode}/(:area)/(:filter)`).then(res => {
            dispatch(addIssues(res.issues));
        });
    };
}

export function fetchIssuesByUser(username) {
    return (dispatch) => {
        dispatch(fetchingIssues());
        return callApi(`issuesByUser/${username}`).then(res => {
            dispatch(addIssues(res.issues));
        });
    };
}

export function addIssueRequest(issue, attachments, issues, projectCode, area, username) {
    return (dispatch) => {
        return callApi('addIssue', 'post', {
            issue: {
                project: projectCode,
                screen: issue.screen,
                loggedBy: username,
                location: issue.location,
                category: issue.category,
                description: issue.description,
                status: 'New',
                area,
                class: area,
                assigned: issue.assigned,
                type: issue.type,
                browser: issue.browser,
                attachments,
                dateAdded: new Date(),
            },
        }).then(res => {
            if(res.err){
                dispatch(addIssueFailure())
            }   else{
                dispatch(addIssueSuccess(res.issue))
            }
        });
    };
}

export function addIssueSuccess(issue) {
    return {
        type: types.ADD_ISSUE_SUCCESS,
        issue,
        message: 'Issue created. Fill in the form again to create another.'
    };
}

export function addIssueFailure() {
    return{ 
        type: types.ADD_ISSUE_FAILURE,
        message: 'An error prevented the issue from being saved. Please try again, or contact Brightwave for assistance.'
    }
}

export function saveIssue(issue) {
    return {
        type: types.SAVE_ISSUE,
        issue,
    };
}

export function saveIssueRequest(issue, area) {
    if (issue.status != 'New' && area == 'internal') {
        issue.area = 'internal';
    }
    if (issue.status != 'Returned' && area == 'client') {
        issue.area = 'client';
    }
    return (dispatch) => {
        return callApi('saveIssue', 'put', {
            issue: {
                project: issue.project,
                id: issue.id,
                screen: issue.screen,
                type: issue.type,
                browser: issue.browser,
                location: issue.location,
                category: issue.category,
                description: issue.description,
                status: issue.status,
                assigned: issue.assigned,
                area: issue.area,
            },
        }).then(res => {dispatch(saveIssue(res.issue))});
    };
}


export function sortIssues(header) {
    return {
        type: types.SORT_ISSUES,
        header: header[0],
    };
}

export function addIssueToBatch(id) {
    return {
        type: types.ADD_ISSUE_TO_BATCH,
        id,
    };
}

export function batchIssueRequest(issues, batchOptions, projectCode) {
    return (dispatch) => {
        return callApi('batchIssues', 'post', {
            issues,
            options: batchOptions,
            projectCode,
        }).then(res => dispatch(batchIssues(res.issues)));
    };
}

export function batchIssues(issues) {
    return {
        type: types.BATCH_ISSUES,
        issues,
    };
}

export function uploadFileRequest(files) {
    const file = files[0];
    return (dispatch) => {
        return callApiUpload('upload', 'post', file).then(res => dispatch(uploadFileSuccess(res)));
    };
}

export function uploadFileSuccess(file) {
    const filename = file.filename;
    return {
        type: types.UPLOAD_FILE_SUCCESS,
        filename,
    };
}
