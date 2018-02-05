import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Common/TextInput';
import SelectInput from '../Common/SelectInput';
import DropZone from '../Common/DropZone';
import TextEditor from '../Common/TextEditor';
import TextStatic from '../Common/TextStatic';

const NewIssueForm = ({ issue, onChange, loading, errors, assignees, locations, categories, onDrop, files, attachments, onCommentChange, params, username }) => {
    const screenValue = params.area === 'new' ? params.filter : issue.screen;
    return (
        <div>
            <TextStatic
                name="username"
                label="Username"
                value={username} />
            <SelectInput
                name="location"
                label="Location"
                value={issue.location}
                defaultOption="Select a location"
                options={locations}
                onChange={onChange}
                error={errors.location} />
            <TextInput
                name="screen"
                label="Screen"
                placeholder="Enter a screen"
                value={screenValue}
                onChange={onChange}
                error={errors.screen} />
            <SelectInput
                name="category"
                label="Category"
                value={issue.category}
                defaultOption="Select a Category"
                options={categories}
                onChange={onChange}
                error={errors.category} />
            <SelectInput
                name="type"
                label="Change / Error"
                value={issue.type}
                options={["Not sure", "Change request", "Error"]}
                onChange={onChange}
                error={errors.type} />
            <SelectInput
                name="assigned"
                label="Assigned to"
                value={issue.assigned}
                defaultOption="Unassigned"
                options={assignees}
                onChange={onChange}
                error={errors.assigned} />
            <div className="form-flex">
                <label className="form-label" htmlFor="description">Description</label>
                <div style={{ height: '160px', width: '100%' }}>
                    <TextEditor
                        name="description"
                        placeholder="Enter a description..."
                        onCommentChange={onCommentChange}
                        value={issue.description}
                        error={errors.description}
                    />
                </div>
            </div>
            <DropZone
                name="attachment"
                label="Attachment"
                onDrop={onDrop}
                files={files}
                attachments={attachments} />
        </div>
    );
};

export default NewIssueForm;