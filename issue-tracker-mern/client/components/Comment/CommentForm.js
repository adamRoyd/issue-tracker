import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';
import TextAreaInput from '../Common/TextAreaInput';
import TextEditor from '../Common/TextEditor';


const CommentForm = ({comment,errors,onCommentChange,issue,area,usertype,onChange,editorState}) => {
    return(
        <div className="commentBox">
            {((issue.status == 'Closed') || ((area == 'client') && (usertype != 'Client')))
            ?
            <p className="error"><br/><strong>{(area == 'client') ? 'This issue is in the client pot and cannot be edited.' : 'This issue is closed and cannot be edited.'}</strong></p>
            :
            <TextEditor
            errors={errors}
            onChange={onChange}
            editorState={editorState}
            onCommentChange={onCommentChange}
            placeholder="Enter a comment..."
            value={comment.text}
            />
            } 

        </div>
    );
};

CommentForm.propTypes = {
    comment : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
    onCommentChange : PropTypes.func.isRequired
};

export default CommentForm;