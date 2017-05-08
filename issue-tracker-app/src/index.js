import React from 'react';
import 'babel-polyfill';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import './styles/styles.css';
import './styles/loginPage.css';
import './styles/issueTable.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//actions
import {loadAssignees} from './actions/assigneeActions';
import {loadComments} from './actions/commentActions';
import {loadProjects} from './actions/projectActions';
import {loadIssues} from './actions/issueActions';

const store = configureStore();
store.dispatch(loadComments());
store.dispatch(loadAssignees());
store.dispatch(loadProjects());

//rooter
import Root from './root';

render(
  <Root store={store}/>,
  document.getElementById('root')
);