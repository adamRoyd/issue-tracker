import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from '../components/Main';

const getVisibleIssues = (issues, filter) => {
    switch(filter){
        case 'SHOW_ALL':
            return issues;
        case 'SHOW_NEW':
            return issues.filter(t => t.status == 'new');
    }
};

function mapStateToProps(state){
    return{
        issues: getVisibleIssues(state.issues,state.filter),
        comments: state.comments,
        status : state.status,
        filter : state.filter
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps,mapDispatchToProps)(Main);

export default App;