import React from 'react';
import Issue from './Issue';
import IssueManager from './IssueManager';
import { Link, browserHistory } from 'react-router';

class IssueList extends React.Component{
    
    handleClick(i){
        const selectedIssue = this.props.issues[i]
        browserHistory.push(`/issue/${selectedIssue.id}`);
        //TO DO insert map function to set all actives to false
        selectedIssue.active = true;
    }

    render(){
        return(
            <div>
                <h3>Issue list</h3>
                <p>Active: {this.props.params.id}</p>
                <table className="issueTable table table-hover">
                <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Screen</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {/*Use the spread operator to pass down all the props. Key can't be used in props*/}
                    {this.props.issues.map((issue, i) => <Issue {...this.props} key={i} issue={issue} status={status} onClick={() => this.handleClick(i)}/>)}
                </tbody>
                </table>
            </div>
        );
    }
}

export default IssueList;