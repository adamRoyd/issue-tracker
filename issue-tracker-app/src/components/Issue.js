import React from 'react';
import {Link} from 'react-router';

class Issue extends React.Component{
    rowSelect(){
        console.log('CHANGE SELECTED CLASS');
    }
    render(){
        this.rowSelect = this.rowSelect.bind(this);
        const { issue } = this.props;
        return(
            <tr onClick={this.rowSelect}>
                <td><Link to={`/issue/${issue.id}`} activeClassName="active">{issue.id}</Link></td>
                <td>{issue.screen}</td>
                <td>{issue.category}</td>
                <td>{issue.description}</td>
                <td>{issue.status}</td>
            </tr>
        );
    }
}

export default Issue;