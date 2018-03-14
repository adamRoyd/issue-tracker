/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, IndexRedirect, onEnter, Redirect, browserHistory, match, RouterContext } from 'react-router';
import App from './components/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/(:area)/2182 and
  https://github.com/gaearon/react-hot-loader/(:area)/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
    // Require async routes only in development for react-hot-reloader to work.
    require('./components/Login/LoginPage');
    require('./components/Login/SelectProjectPage');
    require('./components/Issue/IssuePage');
    require('./components/Login/RegistrationPage');
    require('./components/Issue/NewIssuePage');
    require('./components/Login/AddProjectPage');
    require('./components/Login/ResetPasswordPage');
    require('./components/Login/NewUserPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route
            path="/login"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Login/LoginPage').default);
                });
            }}
        />
        <Route
            path="/reset/(:token)"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Login/ResetPasswordPage').default);
                });
            }}
        />
        <Route
            path="/newuser/(:token)"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Login/NewUserPage').default);
                });
            }}
        />
        <Route
            path="/adduser"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Login/RegistrationPage').default);
                });
            }}
        />
        <Route
            path="/createproject"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Login/AddProjectPage').default);
                });
            }}
        />
        <Route
            path="/myissues"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Issue/IssuePage').default);
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
            path="/(:projectCode)/new/"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Issue/NewIssuePage').default);
                });
            }}
        />
        <Route
            path="/(:projectCode)/new/(:topic)/(:page)"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Issue/NewIssuePage').default);
                });
            }}
        />
        <Route
            path="/(:projectCode)/(:area)/(:filter)"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Issue/IssuePage').default);
                });
            }}
        />
        <Route
            path="/(:projectCode)/(:area)/(:filter)/(:id)"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./components/Issue/IssuePage').default);
                });
            }}
        />
    </Route>
);
