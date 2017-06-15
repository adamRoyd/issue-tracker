import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';
import TextAreaInput from '../Common/TextAreaInput';
import TextEditor from '../Common/TextEditor';


const CommentForm = ({comment,errors,onCommentChange}) => {
    return(
        <div className="commentBox">
            <TextEditor
                onCommentChange={onCommentChange}
                placeholder="Enter a comment..."
                value={comment.text}
                />
        </div>
    );
};

CommentForm.propTypes = {
    comment : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
    onCommentChange : PropTypes.func.isRequired
};

export default CommentForm;