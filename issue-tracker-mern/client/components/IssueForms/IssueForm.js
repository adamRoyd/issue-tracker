import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';
import TextInput from '../Common/TextInput';
import TextStatic from '../Common/TextStatic';
import FriendlyDate from '../Common/FriendlyDate';

const IssueForm = ({ issue, errors, assignees, onIssueChange, status, displayAdvancedOptions, locations, categories }) => {
    return (
        <div className='issue-form'>
            <h4>Issue Settings</h4>
            <TextStatic
                label="Date"
                value={<FriendlyDate date={issue.dateAdded} />} />
            <TextStatic
                label="Logged by"
                value={issue.loggedBy} />
            <TextStatic
                label="Type"
                value={issue.type} />
            <TextInput
                name="browser"
                label="Browser"
                placeholder="Select a browser"
                value={issue.browser}
                onChange={onIssueChange}
                error={errors.browser}
                isStatic={displayAdvancedOptions} />
            <SelectInput
                name="location"
                label="Location"
                value={issue.location}
                defaultOption="Select a location"
                options={locations}
                onChange={onIssueChange}
                error={errors.location}
                isStatic={displayAdvancedOptions} />
            <TextInput
                name="screen"
                label="Screen"
                placeholder="Enter a screen"
                value={issue.screen}
                onChange={onIssueChange}
                error={errors.screen}
                isStatic={displayAdvancedOptions} />
            <SelectInput
                name="category"
                label="Category"
                value={issue.category}
                defaultOption="Select a category"
                options={categories}
                onChange={onIssueChange}
                error={errors.category}
                isStatic={displayAdvancedOptions} />
            <SelectInput
                name="assigned"
                label="Assigned"
                value={issue.assigned}
                options={assignees}
                onChange={onIssueChange}
                error={errors.assigned}
            />
            <SelectInput
                name="status"
                label="Status"
                value={issue.status}
                options={status}
                onChange={onIssueChange}
                error={errors.status} />
        </div>
    );
};

IssueForm.propTypes = {
    comment: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCommentChange: PropTypes.func.isRequired,
    onIssueChange: PropTypes.func.isRequired,
    issue: PropTypes.object.isRequired,
    assignees: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
    displayAdvancedOptions: PropTypes.bool
};



export default IssueForm;