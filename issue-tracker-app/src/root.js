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
import LoginPage from './components/Login/LoginPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={LoginPage}/>
        <Route path="/selectproject" component={ProjectPicker}/>  
        <Route path="(:projectCode)" component={IssuePage}>         
          <Route path="issue/:filter" component={IssueList}/>
          <Route path="issue/:filter/:id" component={IssueManager}/>
        </Route>
        <Route path="(:projectCode)/newissue" component={NewIssueForm}/> 
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store : PropTypes.object.isRequired
};

export default Root;