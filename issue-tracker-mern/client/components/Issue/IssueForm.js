import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';
import TextAreaInput from '../Common/TextAreaInput';
import TextStatic from '../Common/TextStatic';

const IssueForm = ({issue,errors,assignees,onIssueChange,status,displayAdvancedOptions,locations,categories}) => {
    return(
        <div id="issueForm">
            <h4>Issue Settings</h4>
            <TextStatic
                label="Date"
                value="TO DO"/>  
            <TextStatic
                label="Type"
                value={issue.type}/>     
            <TextStatic
                label="Browser"
                value={issue.browser}/>                
            <SelectInput
                name="location"
                label="Location"
                value={issue.location}
                defaultOption= "Select a location"
                options={locations}
                onChange={onIssueChange} 
                error={errors.location}
                isStatic={displayAdvancedOptions}/>
            <SelectInput
                name="sco"
                label="Sco"
                value={issue.sco}
                defaultOption= "Select a Sco ID"
                options={[...Array(50).keys()]}
                onChange={onIssueChange} 
                error={errors.sco}
                isStatic={displayAdvancedOptions}/>
            <SelectInput
                name="screen"
                label="Screen"
                value={issue.screen}
                defaultOption= "Select a Screen ID"
                options={[...Array(1000).keys()]}
                onChange={onIssueChange} 
                error={errors.screen}
                isStatic={displayAdvancedOptions}/>
            <SelectInput
                name="category"
                label="Category"
                value={issue.category}
                defaultOption= "Select a category"
                options={categories}
                onChange={onIssueChange} 
                error={errors.category}
                isStatic={displayAdvancedOptions}/>
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
                error={errors.status}/>
        </div>
    );
};

IssueForm.propTypes = {
    comment : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
    handleSubmit : PropTypes.func.isRequired,
    onCommentChange : PropTypes.func.isRequired,
    onIssueChange : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired,
    assignees : PropTypes.array.isRequired,
    status : PropTypes.array.isRequired,
    displayAdvancedOptions : PropTypes.bool
};



export default IssueForm;