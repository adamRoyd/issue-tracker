import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Issue from './Issue';
import Header from './Header';
import { Link, browserHistory } from 'react-router';
import * as IssueActions from '../../actions/IssueActions';
import headers from '../../constants/headers';

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

class IssueList extends React.Component{
    componentDidMount(){
        //this.props.loadIssues();        
        //this.props.setIssueFilter(this.props.params.filter);
        //TO DO setActiveIssue does not work as the state has not recieved the issues in time
        //this.props.setActiveIssue(this.props.params.id);
    }
    handleClick(i){
        const selectedIssue = this.props.issues[i];
        browserHistory.push(`/${this.props.params.projectCode}/issue/${this.props.filter}/${selectedIssue.id}`);
        //this.props.setActiveIssue(selectedIssue,i);
    }
    headerClick(i){
        // if(i != 0)
        // this.props.sortIssue(i - 1,this.props.headers[i]);
    }
    render(){
        return(
            <div>
                <table className={"issueTable table table-fixed table-hover"}>
                    <thead>
                    <tr>
                        {this.props.headers.map((header,i) => <Header key={i} header={header} onClick={() => this.headerClick(i)}/>)}
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.issues.map((issue, i) => <Issue {...this.props} key={i} issue={issue} onClick={() => this.handleClick(i)}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

IssueList.propTypes = {
    issues : PropTypes.array.isRequired,
    filter : PropTypes.string.isRequired,
    setActiveIssue : PropTypes.func.isRequired,
    sortIssue : PropTypes.func.isRequired,
    loadIssues : PropTypes.func.isRequired,
    setIssueFilter : PropTypes.func.isRequired,
    params : PropTypes.object.isRequired,
    headers : PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        issues: getVisibleIssues(state.issues,state.filter),
        headers
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(IssueActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);