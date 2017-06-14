import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';
import TextAreaInput from '../Common/TextAreaInput';
import TextEditor from '../Common/TextEditor';


const CommentForm = ({comment,errors,onCommentChange}) => {
    return(
        <form className="form-horizontal">
            <div className="row displayTable">
                <div className="col-sm-12">
                    <TextEditor
                        onCommentChange={onCommentChange}
                        value={comment.text}/>
                </div>
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