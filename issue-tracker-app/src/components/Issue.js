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
            <tr onClick={this.rowSelect} activeClassName="active">
                <td><input type="checkbox"/></td>
                <td>{issue.id}</td>
                <td>{issue.screen}</td>
                <td>{issue.category}</td>
                <td>{issue.description}</td>
                <td>{issue.status}</td>
            </tr>
        );
    }
}

Issue.propTypes = {
    issue : PropTypes.object.isRequired
};

export default Issue;