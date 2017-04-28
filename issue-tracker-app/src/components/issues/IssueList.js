import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Issue from './Issue';
import Header from './Header';
import IssueManager from './IssueManager';
import { Link, browserHistory } from 'react-router';
import * as issueActions from '../../actions/issueActions';

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
    handleClick(i){
        const selectedIssue = this.props.issues[i];
        browserHistory.push(`/abc123/${this.props.filter}/${selectedIssue.id}`);
        this.props.setActiveIssue(selectedIssue,i);
    }
    headerClick(i){
        if(i != 0)
        this.props.sortIssue(i - 1,this.props.headers[i]);
    }
    render(){
        return(
            <div>
                <table className="issueTable table table-hover">
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
    headers : PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        issues: getVisibleIssues(state.issues,state.filter)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(issueActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);