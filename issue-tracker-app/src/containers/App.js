import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from '../components/Main';

const getVisibleIssues = (issues, filter) => {
    switch(filter){
        case 'SHOW_ALL':
            return issues;
        case 'New':
            return issues.filter(t => t.status == 'New');
        case 'On Hold':
            return issues.filter(t => t.status == 'On Hold');
        case 'Ready To Fix':
            return issues.filter(t => t.status == 'Ready To Fix');
        case 'Fixed':
            return issues.filter(t => t.status == 'Fixed');
        case 'Returned':
            return issues.filter(t => t.status == 'Returned');
        case 'Closed':
            return issues.filter(t => t.status == 'Closed');
        case 'Rejected':
            return issues.filter(t => t.status == 'Rejected');        
        default:
            return issues;
    }
};

function mapStateToProps(state){
    return{
        issues: getVisibleIssues(state.issues,state.filter),
        comments: state.comments,
        status : state.status,
        filter : state.filter,
        users : state.users
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps,mapDispatchToProps)(Main);

export default App;