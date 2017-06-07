import headers from '../constants/headers';

export default({ 
    projects: [],
    comments: [],
    assignees: [],
    issues: [],
    headers : headers,
    issueFilter: "All",
    user: {
        isFetching: false,
        isAuthenticated: false,
        username: ""
    }
});