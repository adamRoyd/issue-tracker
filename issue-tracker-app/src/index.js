import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//components
import App from './containers/App';
import Main from './components/Main';
import IssueList from './components/IssueList';
import IssueManager from './components/IssueManager';
import SideBar from './components/SideBar';

//react router deps
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//import store. store is the default export, history is the named export. therefore put it in brackets
import store, {history} from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route component={SideBar}>
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