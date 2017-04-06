import React from 'react';
import {Link} from 'react-router';

class Issue extends React.Component{
    render(){
        const { issue } = this.props;
        return(
            <tr>
                <td><Link to={issue.id} activeClassName="active">{issue.id}</Link></td>
                <td>{issue.screen}</td>
                <td>{issue.category}</td>
                <td>{issue.description}</td>
                <td>{issue.status}</td>
            </tr>
        );
    }
}

export default Issue;