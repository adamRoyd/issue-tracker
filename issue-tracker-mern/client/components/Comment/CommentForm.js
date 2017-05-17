import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';
import TextAreaInput from '../Common/TextAreaInput';

const CommentForm = ({comment,issue,errors,handleSubmit,assignees,onCommentChange,onIssueChange,status,displayAdvancedOptions,locations,categories}) => {
    return(
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="row displayTable">
                <div className="col-sm-7">
                    <h4>Add Comment</h4>
                </div>
                <div className="col-sm-5">
                    <h4>Issue Settings</h4>
                </div>
            </div>
            <div className="row displayTable">
            <TextAreaInput
                name="commentText"
                label=""
                value={comment.commentText}
                placeholder="Enter a comment"
                onChange={onCommentChange}
                error=""
                wrapperClass="col-sm-7 tableCell"/>
            <div className="col-sm-5 tableCell">
                <SelectInput
                    name="assigned"
                    label="Assigned"
                    value={issue.assigned}
                    options={assignees}
                    onChange={onIssueChange} 
                    error={errors.assigned}/>
                <SelectInput
                    name="status"
                    label="Status"
                    value={issue.status}
                    options={status}
                    onChange={onIssueChange} 
                    error={errors.status}/>
                {(displayAdvancedOptions)
                ? 
                    <div>
                    <SelectInput
                        name="location"
                        label="Location"
                        value={issue.location}
                        defaultOption= "Select a location"
                        options={locations}
                        onChange={onIssueChange} 
                        error={errors.location}/>
                    <SelectInput
                        name="sco"
                        label="Sco ID"
                        value={issue.sco}
                        defaultOption= "Select a Sco ID"
                        options={[...Array(50).keys()]}
                        onChange={onIssueChange} 
                        error={errors.sco}/>
                    <SelectInput
                        name="screen"
                        label="Screen ID"
                        value={issue.screen}
                        defaultOption= "Select a Screen ID"
                        options={[...Array(1000).keys()]}
                        onChange={onIssueChange} 
                        error={errors.screen}/>
                    <SelectInput
                        name="category"
                        label="Category"
                        value={issue.category}
                        defaultOption= "Select a category"
                        options={categories}
                        onChange={onIssueChange} 
                        error={errors.category}/>
                    </div>
                : 
                    <span/>
                }
            </div>
            </div>
        </form>
    );
};

CommentForm.propTypes = {
    comment : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
    handleSubmit : PropTypes.func.isRequired,
    onCommentChange : PropTypes.func.isRequired,
    onIssueChange : PropTypes.func.isRequired,
    issue : PropTypes.object.isRequired,
    assignees : PropTypes.array.isRequired,
    status : PropTypes.array.isRequired,
    displayAdvancedOptions : PropTypes.bool.isRequired
};



export default CommentForm;