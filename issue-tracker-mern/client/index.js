/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';
var ElementQueries = require('css-element-queries/src/ElementQueries');

// attaches to DOMLoadContent and does anything for you
ElementQueries.listen();

// or if you want to trigger it yourself:
// 'init' parses all available CSS and attach ResizeSensor to those elements which
// have rules attached (make sure this is called after 'load' event, because
// CSS files are not ready when domReady is fired.
//ElementQueries.init();

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
