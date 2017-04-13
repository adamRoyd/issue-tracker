import React, { PropTypes } from 'react';

function Issue ({onClick, issue}){
        return(
            <tr onClick={() => onClick()} className={issue.active ? 'issueRowActive' : 'issueRow'}>
                <td><div><input type="checkbox"/></div></td>
                <td><div>{issue.id}</div></td>
                <td><div>{issue.screen}</div></td>
                <td><div>{issue.category}</div></td>
                <td><div className="description">{issue.description}</div></td>
                <td><div>{issue.status}</div></td>
                
            </tr>
        );
    }

Issue.propTypes = {
    onClick : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired,
    active : PropTypes.bool.isRequired
};

export default Issue;