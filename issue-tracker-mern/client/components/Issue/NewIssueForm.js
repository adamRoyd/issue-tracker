import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Common/TextInput';
import TextAreaInput from '../Common/TextAreaInput';
import SelectInput from '../Common/SelectInput';
import DropZone from '../Common/DropZone';
import TextEditor from '../Common/TextEditor';
import TextStatic from '../Common/TextStatic';

const NewIssueForm = ({issue,onChange,loading,errors,assignees,locations,categories,onDrop,files,attachments,onCommentChange}) => {
    return(
        <form> 
            <TextStatic
                name="username"
                label="Username"
                value='adam.boothroyd@brightwave.co.uk'/>
            <SelectInput
                name="location"
                label="Location"
                value={issue.location}
                defaultOption= "Select a location"
                options={locations}
                onChange={onChange} 
                error={errors.location}/>
            <SelectInput
                name="sco"
                label="Topic ID"
                value={issue.sco}
                defaultOption= "Select a Sco ID"
                options={[...Array(1000).keys()]}
                onChange={onChange} 
                error={errors.sco}/>
            <SelectInput
                name="screen"
                label="Page ID"
                value={issue.screen}
                defaultOption= "Select a Screen ID"
                options={[...Array(1000).keys()]}
                onChange={onChange} 
                error={errors.screen}/>
            <SelectInput
                name="category"
                label="Category"
                value={issue.category}
                defaultOption= "Select a category"
                options={categories}
                onChange={onChange} 
                error={errors.category}/>
            <SelectInput
                name="type"
                label="Change / Error"
                value={issue.type}
                options={["Not sure","Change request","Error"]}
                onChange={onChange} 
                error={errors.type}/>
            <SelectInput
                name="assigned"
                label="Assigned to"
                value={issue.assigned}
                defaultOption= "Unassigned"
                options={assignees}
                onChange={onChange} 
                error={errors.assigned}/>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label" htmlFor="description">Description</label>
                <div className="col-sm-9 field">
                    <TextEditor
                        name="description"
                        placeholder="Enter a description..."
                        onCommentChange={onCommentChange}
                        value={issue.description}
                        />
                </div>
            </div>
            <DropZone
                name="attachment"
                label="Attachment"
                onDrop={onDrop}
                files={files}
                attachments={attachments}/>
        </form>
    );
};

NewIssueForm.propTypes = {
    issue : PropTypes.object.isRequired,
    onChange : PropTypes.func.isRequired,
    loading : React.PropTypes.bool,
    errors : PropTypes.object,
    assignees : PropTypes.array.isRequired,
    locations : PropTypes.array.isRequired,
    categories : PropTypes.array.isRequired
};

export default NewIssueForm;