import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//import the root reducer
import rootReducer from './reducers/rootReducer';


import comments from './data/comments';
import issues from './data/issues';

//create an object for the default data
const defaultState={
    issues,
    comments
};


const store = createStore(rootReducer,defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;