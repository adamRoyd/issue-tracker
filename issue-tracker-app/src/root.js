import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

//components
import App from './containers/App';
import Main from './components/Main';
import IssueList from './components/issues/IssueList';
import IssueManager from './components/issues/IssueManager';
import IssuePage from './components/IssuePage';
import NewIssueForm from './components/NewIssueForm';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:filter)" component={App}>
        <Route component={IssuePage}>
          <Route path="issue" component={IssueList}/>
          <Route path="issue/:id" component={IssueManager}/>
        </Route>
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store : PropTypes.object.isRequired
};

export default Root;