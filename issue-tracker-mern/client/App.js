/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

// Import Routes
import routes from './routes';

// Stylesheets
require('./styles/Comments.css');
require('./styles/Common.css');
require('./styles/Draft.css');
require('./styles/EditIssue.css');
require('./styles/IssueForm.css');
require('./styles/IssueTable.css');
require('./styles/login.css');
require('./styles/Nav.css');
require('./styles/Richeditor.css');
require('./styles/Sidebar.css');
require('./styles/styles.css');

export default function App(props) {
    return (
        <Provider store={props.store}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </Provider>
    );
}

App.propTypes = {
    store: React.PropTypes.object.isRequired,
};
