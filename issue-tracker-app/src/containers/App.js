import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from '../components/Main';

function mapStateToProps(state){
    return{
        comments: state.comments,
        status : state.status,
        filter : state.filter,
        users : state.users,
        headers : state.headers,
        user : state.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps,mapDispatchToProps)(Main);

export default App;