import React from 'react';
import PropTypes from 'prop-types';

function Issue ({onClick, issue}){
        return(
            <tr onClick={() => onClick()} className={issue.active ? 'issueRowActive' : 'issueRow'}>
                <td><div><input type="checkbox"/></div></td>
                <td><div>{issue.id}</div></td>
                <td><div>{issue.sco + "_" + issue.screen}</div></td>
                <td><div>{issue.location}</div></td>
                <td><div>{issue.category}</div></td>
                <td><div>{issue.description}</div></td>
                <td><div>{issue.assigned}</div></td>
            </tr>
        );
    }

Issue.propTypes = {
    onClick : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired
};

export default Issue;