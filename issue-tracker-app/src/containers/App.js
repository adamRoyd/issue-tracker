import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../actions/userActions';
import Main from '../components/Main';

function mapStateToProps(state){
    return{
        comments: state.comments,
        status : state.status,
        filter : state.filter,
        users : state.users,
        headers : state.headers,
        user : state.user,
        locations : state.locations,
        projects : state.projects,
        categories : state.categories
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(userActions, dispatch);
}

const App = connect(mapStateToProps,mapDispatchToProps)(Main);

export default App;