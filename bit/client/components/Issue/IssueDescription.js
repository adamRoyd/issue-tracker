import React, { Component } from 'react';
import PropTypes from 'prop-types';

const IssueDescription = ({ issue }) => {
    return (
        <div className="issue-description">
            <div dangerouslySetInnerHTML={{ __html: issue.description }} />
        </div>
    );
};

IssueDescription.propTypes = {
    issue: PropTypes.object.isRequired,
};

export default IssueDescription;
