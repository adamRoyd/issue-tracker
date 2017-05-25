import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as assigneeActions from '../actions/assigneeActions';
import Main from '../components/Main';

function mapStateToProps(state){
    return{
        comments: state.comments,
        status : state.status,
        filter : state.filter,
        assignees : state.assignees,
        headers : state.headers,
        user : state.user,
        locations : state.locations,
        projects : state.projects,
        categories : state.categories
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(assigneeActions, dispatch);
}

const App = connect(mapStateToProps,mapDispatchToProps)(Main);

export default App;