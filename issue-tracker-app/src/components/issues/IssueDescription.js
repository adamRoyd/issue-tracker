import React, { PropTypes } from 'react';

function IssueDescription ({issue}){
    return(
        <div id="issueDescription" className="row">
            <div className="col-sm-8">
                <p>{issue.description}</p>
            </div>
            <div className="col-sm-4">
                {/*<img src="https://placekitten.com/300/140"/>*/}
            </div>
            
        </div>
    );
}

IssueDescription.propTypes = {
    issue : PropTypes.object.isRequired
};


export default IssueDescription;