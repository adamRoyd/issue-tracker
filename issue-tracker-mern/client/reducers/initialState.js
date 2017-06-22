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
        isAuthenticated: false,
        username: "adam.boothroyd@brightwave.co.uk"
    },
    attachments: [],
    area: "internal"
});