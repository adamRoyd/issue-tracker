import React from 'react';
import PropTypes from 'prop-types';

function Issue ({onClick, issue, checkBoxClick}){
        return(
            <tr className={issue.active ? 'issueRowActive' : 'issueRow'}>
                <td><input type="checkbox" onClick={() => checkBoxClick()}/></td>
                <td onClick={() => onClick()}>{issue.id}</td>
                <td onClick={() => onClick()}>{issue.sco + "_" + issue.screen}</td>
                <td onClick={() => onClick()}>{issue.location}</td>
                <td onClick={() => onClick()}>{issue.category}</td>
                <td onClick={() => onClick()}>{issue.description}</td>
                <td onClick={() => onClick()}>{issue.assigned}</td>
            </tr>
        );
    }

Issue.propTypes = {
    onClick : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired
};

export default Issue;