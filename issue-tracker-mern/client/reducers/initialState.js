import headers from '../constants/headers';

export default ({
    projects: [],
    comments: [],
    assignees: [],
    issues: [],
    headers,
    issueFilter: 'all',
    user: {
        isFetching: false,
        username: '',
    },
    attachments: [],
    area: 'internal',
    modal: '',
    message: {
        success: false,
        text: '',
        isFetching: false,
    },
});
