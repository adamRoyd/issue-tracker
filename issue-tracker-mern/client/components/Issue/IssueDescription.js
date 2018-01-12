import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Attachment from '../common/Attachment';
import styles from './EditIssue.css';

const IssueDescription = ({issue}) => {
    return(
        <div>
            <div className={styles.issueDescription}>
                <div dangerouslySetInnerHTML={{__html: issue.description}}/>
            </div>
            <div className={styles.issueAttachments}>
                {(issue.attachments) 
                    ? issue.attachments.map((a,i) => {
                        return <Attachment key={i} number={i} path={a}/>})
                    : null
                }
            </div>
        </div>
    );
}

IssueDescription.propTypes = {
    issue : PropTypes.object.isRequired
};

export default IssueDescription;