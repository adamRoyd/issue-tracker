import React from 'react';
import PropTypes from 'prop-types';

function IssueDescription ({issue}){
    return(
        <div id="descriptionHolder"> 
            <div id="issueDescription" className="row">
                <p>{issue.description}</p>
                <a>{issue.image}</a>

            </div>
        </div>
    );
}

IssueDescription.propTypes = {
    issue : PropTypes.object.isRequired
};


export default IssueDescription;