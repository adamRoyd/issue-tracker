import React from 'react';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';
import SelectInput from '../common/SelectInput';
import TextAreaInput from '../common/TextAreaInput';

const CommentForm = ({comment,issue,errors,handleSubmit,users,onCommentChange,onIssueChange,status,onOpenClick}) => {
    return(
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <TextAreaInput
                name="commentText"
                label="Comment"
                value={comment.commentText}
                placeholder="Enter a comment"
                onChange={onCommentChange}
                error=""
                wrapperClass="col-sm-8"/>
            <div className="col-sm-4">
                <SelectInput
                    name="assigned"
                    label="Assigned"
                    value={issue.assigned}
                    options={users}
                    onChange={onIssueChange} 
                    error={errors.assigned}/>
                <SelectInput
                    name="status"
                    label="Status"
                    value={issue.status}
                    options={status}
                    onChange={onIssueChange} 
                    error={errors.status}/>
            </div>
        </form>
    );
};

CommentForm.propTypes = {
    params : PropTypes.object.isRequired,
    addComment : PropTypes.func.isRequired,
    status : PropTypes.array.isRequired,
    issue : PropTypes.object.isRequired,
    changeStatus : PropTypes.func.isRequired,
    users : PropTypes.array.isRequired,
    saveIssue : PropTypes.func.isRequired,
    user : PropTypes.string.isRequired
};



export default CommentForm;