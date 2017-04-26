import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Issue from './Issue';
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
        browserHistory.push(`/${this.props.filter}/issue/${selectedIssue.id}`);
        //this.props.issues.map((issue) => issue.active = false);
        //TO DO change this without mutating state!
        //selectedIssue.active = true;
        this.props.setActiveIssue(selectedIssue,i);
    }
    render(){
        return(
            <div>
                <h3>{this.props.filter}</h3>
                <table className="issueTable table table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Screen</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Assigned</th>
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
    setActiveIssue : PropTypes.func.isRequired
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