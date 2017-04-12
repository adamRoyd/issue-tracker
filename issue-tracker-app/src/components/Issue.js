import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

class Issue extends React.Component{
    rowSelect(){
        browserHistory.push(`/issue/${this.props.issue.id}`);
        
    }
    render(){
        this.rowSelect = this.rowSelect.bind(this);
        const { issue } = this.props;
        return(
            <tr onClick={this.rowSelect} className="issueRow">
                <td><div><input type="checkbox"/></div></td>
                <td><div>{issue.id}</div></td>
                <td><div>{issue.screen}</div></td>
                <td><div>{issue.category}</div></td>
                <td><div className="description">{issue.description}</div></td>
                <td><div>{issue.status}</div></td>
            </tr>
        );
    }
}

Issue.propTypes = {
    issue : PropTypes.object.isRequired
};

export default Issue;