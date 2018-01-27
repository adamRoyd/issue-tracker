import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Comments extends React.Component {
    render() {
        //sort comments by date added
        const comments = this.props.issueComments.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
        })
        return (
            <div className='comments-box'>
                {comments.map((comment, i) =>
                    <Comment
                        key={i}
                        comment={comment}
                        issue={this.props.issue} />
                )}
            </div>
        );
    }
}

Comments.propTypes = {
    issueComments: PropTypes.array.isRequired
};

export default Comments;