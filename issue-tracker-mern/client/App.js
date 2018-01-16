/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

// Import Routes
import routes from './routes';

// Stylesheets
require('./main.css');
require('./styles/Draft.css');
require('./styles/Richeditor.css');


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
  store: React.PropTypes.object.isRequired
};
