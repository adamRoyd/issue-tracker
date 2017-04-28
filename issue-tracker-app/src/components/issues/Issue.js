import React, { PropTypes } from 'react';

function Issue ({onClick, issue}){
        return(
            <tr onClick={() => onClick()} className={issue.active ? 'issueRowActive' : 'issueRow'}>
                <td><input type="checkbox"/></td>
                <td>{issue.id}</td>
                <td>{issue.screen}</td>
                <td>{issue.category}</td>
                <td><div className="description">{issue.description}</div></td>
                <td><div className="assigned">{issue.assigned}</div></td>
            </tr>
        );
    }

Issue.propTypes = {
    onClick : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired,
    active : PropTypes.bool.isRequired
};

export default Issue;