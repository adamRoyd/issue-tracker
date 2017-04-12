import React from 'react';
import Issue from './Issue';
import IssueManager from './IssueManager'

class IssueList extends React.Component{
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
                </tr>
                </thead>
                <tbody>
                    {/*Use the spread operator to pass down all the props. Key can't be used in props*/}
                    {this.props.issues.map((issue, i) => <Issue {...this.props} key={i} issue={issue} status={status}/>)}
                </tbody>
                </table>
            </div>
        );
    }
}

export default IssueList;