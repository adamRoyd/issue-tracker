import headers from '../constants/headers';

export default({ 
    projects: [],
    comments: [],
    assignees: [],
    issues: [],
    headers : headers,
    issueFilter: "all",
    user: {
        isFetching: false,
        username: ""
    },
    attachments: [],
    area: "internal",
    modal: "",
    message: {
        success: true,
        text: "",
        isFetching: false
    }
});