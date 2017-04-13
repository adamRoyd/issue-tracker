import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//import the root reducer
import rootReducer from './reducers/rootReducer';

import comments from './data/comments';
import issues from './data/issues';
import status from './data/status';
import users from './data/users';

//create an object for the default data
const defaultState={
    issues,
    comments,
    status,
    users
};

//enhance the store in order to use redux dev tools
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer,defaultState,enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;