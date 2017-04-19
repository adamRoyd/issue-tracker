import React from 'react';
import 'babel-polyfill';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//components
import App from './containers/App';
import Main from './components/Main';
import IssueList from './components/IssueList';
import IssueManager from './components/IssueManager';
import IssuePage from './components/IssuePage';

//actions
import {loadIssues} from './actions/actionCreators';
import {loadComments} from './actions/actionCreators';

const store = configureStore();
store.dispatch(loadIssues());
store.dispatch(loadComments());


const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route component={IssuePage}>
          <Route path="issue" component={IssueList}/>
          <Route path="issue/:id" component={IssueManager}/>
        </Route>
      </Route>
      
    </Router>
  </Provider>
);

render(
  router,
  document.getElementById('root')
);