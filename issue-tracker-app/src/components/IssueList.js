import React, {PropTypes} from 'react';
import Issue from './Issue';
import IssueManager from './IssueManager';
import { Link, browserHistory } from 'react-router';

class IssueList extends React.Component{
    handleClick(i){
        const selectedIssue = this.props.issues[i];
        browserHistory.push(`/issue/${selectedIssue.id}`);
        this.props.issues.map((issue) => issue.active = false);
        selectedIssue.active = true;
    }
    render(){
        return(
            <div>
                <h3>Issue list</h3>
                <table className="issueTable table table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Screen</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Assigned</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.issues.map((issue, i) => <Issue {...this.props} key={i} issue={issue} status={status} onClick={() => this.handleClick(i)}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

IssueList.propTypes = {
    issues : PropTypes.object.isRequired
};

export default IssueList;