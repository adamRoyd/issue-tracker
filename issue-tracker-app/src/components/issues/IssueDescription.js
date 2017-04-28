import React, { PropTypes } from 'react';

function IssueDescription ({issue}){
    return(
        <div id="issueDescription" className="row">
            <div className="">
                <p>{issue.description}</p>
            </div>
        </div>
    );
}

IssueDescription.propTypes = {
    issue : PropTypes.object.isRequired
};


export default IssueDescription;