import React from 'react';
import PropTypes from 'prop-types';

function Issue ({onClick, issue}){
        return(
            <tr onClick={() => onClick()} className={issue.active ? 'issueRowActive' : 'issueRow'}>
                <td><input type="checkbox"/></td>
                <td>{issue.id}</td>
                <td>{issue.screen}</td>
                <td>{issue.location}</td>
                <td>{issue.category}</td>
                <td><div className="summary">{issue.summary}</div></td>
                <td><div className="assigned">{issue.assigned}</div></td>
            </tr>
        );
    }

Issue.propTypes = {
    onClick : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired
};

export default Issue;