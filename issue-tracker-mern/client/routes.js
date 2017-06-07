/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, IndexRedirect, onEnter, Redirect } from 'react-router';
import App from './components/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./components/Login/LoginPage');
  require('./components/Login/SelectProjectPage');
  require('./components/Issue/IssuePage');
  require('./components/Login/RegistrationPage');
}

function authCheck(){
  var isNode = typeof module !== 'undefined';
  if(!isNode){
    const token = localStorage.getItem('id_token');
    console.log(token);
  }


}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App} onEnter={authCheck()}>
    <IndexRedirect to="/login"/>
    <Route
      path="/login"
      onEnter={authCheck()}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Login/LoginPage').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Login/RegistrationPage').default);
        });
      }}
    />    
    <Route
      path="/selectproject"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Login/SelectProjectPage').default);
        });
      }}
    />
    <Route
      path="/(:projectCode)/issues/(:filter)"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Issue/IssuePage').default);
        });
      }}
    />
    <Route
      path="/(:projectCode)/issues/(:filter)/(:id)"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Issue/IssuePage').default);
        });
      }}
    />
  </Route>
);
