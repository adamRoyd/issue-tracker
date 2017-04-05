import React from 'react';
import Issue from './Issue';

class IssueList extends React.Component{
    render(){
        return(
            <div>
                <h3>Issue list</h3>
                <table className="table">
                <tr>
                    <th>Id</th>
                    <th>Screen</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
                <tbody>
                    {/*Use the spread operator to pass down all the props. Key can't be used in props*/}
                    {this.props.issues.map((issue, i) => <Issue {...this.props} key={i} i={i} issue={issue}/>)}
                </tbody>
                </table>
            </div>
        );
    }
}

export default IssueList;