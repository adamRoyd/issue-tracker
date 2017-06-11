import React from 'react';
import PropTypes from 'prop-types';

function IssueDescription ({issue}){
    return(
        <div id="issueDescription"> 
            <div className="col-sm-7 no-gutter">
                <p>{issue.description}</p>
            </div>
            <table id="issueStats" className="col-sm-4 no-gutter">
                <tr>
                    <td>Id</td>
                    <td>{issue.id}</td>
                </tr>
                <tr>
                    <td>Screen</td>
                    <td>{issue.sco + "_" + issue.screen}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>{issue.location}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{issue.category}</td>
                </tr>
                <tr>
                    <td>Browser</td>
                    <td>{issue.browser}</td>
                </tr>
            </table>
        </div>
    );
}

IssueDescription.propTypes = {
    issue : PropTypes.object.isRequired
};


export default IssueDescription;