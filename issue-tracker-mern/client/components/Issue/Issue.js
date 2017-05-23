import React from 'react';
import PropTypes from 'prop-types';

function Issue ({onClick, issue, checkBoxClick}){
        return(
            <tr className={issue.active ? 'issueRowActive' : 'issueRow'}>
                <td><div><input type="checkbox" onClick={() => checkBoxClick()}/></div></td>
                <td onClick={() => onClick()}>{issue.id}</td>
                <td onClick={() => onClick()}><div>{issue.sco + "_" + issue.screen}</div></td>
                <td onClick={() => onClick()}><div>{issue.location}</div></td>
                <td onClick={() => onClick()}><div>{issue.category}</div></td>
                <td onClick={() => onClick()}><div>{issue.description}</div></td>
                <td onClick={() => onClick()}><div>{issue.assigned}</div></td>
            </tr>
        );
    }

Issue.propTypes = {
    onClick : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired
};

export default Issue;