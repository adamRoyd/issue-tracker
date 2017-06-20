import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Attachment from '../common/Attachment';
//import img from '../../../test.png'

const IssueDescription = ({issue}) => {
    return(
        <div>
            <div id="issueDescription">
                <div dangerouslySetInnerHTML={{__html: issue.description}}/>
            </div>
            <div id="issueAttachments">
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