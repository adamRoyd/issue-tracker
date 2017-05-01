import React from 'react';
import 'babel-polyfill';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import './styles/styles.css';
import './styles/loginPage.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//actions
import {loadComments, loadUsers} from './actions/actionCreators';
import {loadProjects} from './actions/projectActions';
import {loadIssues} from './actions/issueActions';

const store = configureStore();
//store.dispatch(loadIssues());
store.dispatch(loadComments());
store.dispatch(loadUsers());
store.dispatch(loadProjects());

//rooter
import Root from './root';

render(
  <Root store={store}/>,
  document.getElementById('root')
);