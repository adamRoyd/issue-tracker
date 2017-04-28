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
import ProjectPicker from './components/ProjectPicker';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="abc123" component={App}>
        <Route component={IssuePage}> 
          <Route path=":filter" component={IssueList}/>
          <Route path=":filter/:id" component={IssueManager}/>
          <Route path="new" component={NewIssueForm}/>
        </Route>
      </Route>
      <Route path="/selectproject" component={ProjectPicker}/>
    </Router>
  </Provider>
);

Root.propTypes = {
  store : PropTypes.object.isRequired
};

export default Root;