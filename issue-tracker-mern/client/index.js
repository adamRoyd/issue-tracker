/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

//Stylesheets
import './styles/Comments.css';
import './styles/Common.css';
import './styles/Draft.css';
import './styles/EditIssue.css';
import './styles/IssueForm.css';
import './styles/IssueTable.css';
import './styles/login.css';
import './styles/Nav.css';
import './styles/Richeditor.css';
import './styles/Sidebar.css';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';


render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp
    );
  });
}
