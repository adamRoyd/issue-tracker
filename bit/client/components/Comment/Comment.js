import React from 'react';
import PropTypes from 'prop-types';
import FriendlyDate from '../Common/FriendlyDate';

class Comment extends React.Component {

    render() {
        const { comment } = this.props;

        return (
            <div className="comment-container">
                <div className="comment-stats">
                    <div>
                        <strong>{comment.user}</strong>
                    </div>
                    <div style={{ 'marginRight': '5px' }}>
                        <strong>{comment.status} | <FriendlyDate date={comment.time} /></strong>
                    </div>
                </div>
                <div className="comment-description" style={{ 'marginTop': '5px' }}>
                    <div dangerouslySetInnerHTML={{ __html: comment.text }} />
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default Comment;
