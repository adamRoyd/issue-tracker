import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';
import TextAreaInput from '../Common/TextAreaInput';

const CommentForm = ({comment,errors,onCommentChange}) => {
    return(
        <form className="form-horizontal">
            <div className="row">
                <div className="col-sm-12">
                    <h4>Add Comment</h4>
                </div>
            </div>
            <div className="row displayTable">
            <TextAreaInput
                name="text"
                value={comment.text}
                placeholder="Enter a comment"
                onChange={onCommentChange}
                error=""
                wrapperClass="col-sm-7 tableCell"
                width="col-sm-12"
                textAreaClass="form-control comment-box"/>
            </div>
        </form>
    );
};

CommentForm.propTypes = {
    comment : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
    onCommentChange : PropTypes.func.isRequired
};

export default CommentForm;