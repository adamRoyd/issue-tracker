import React from 'react';
import PropTypes from 'prop-types';
import FriendlyDate from '../Common/FriendlyDate';

class Comment extends React.Component {

    render() {
        //date formatting
        const { comment } = this.props;
        const d = new Date(comment.time);
        const day = checkZero(d.getDay());
        const month = checkZero(d.getMonth() + 1);
        const year = d.getFullYear();
        const hour = checkZero(d.getHours());
        const minutes = checkZero(d.getMinutes());
        const dateText = day + "/" + month + "/" + year + " " + hour + ":" + minutes;

        function checkZero(data) {
            if (data < 10) {
                data = "0" + data;
            }
            return data;
        }

        return (
            <div className='comment-container'>
                <div className='comment-stats'>
                    <div>
                        <strong>{comment.user}</strong>
                    </div>
                    <div style={{'marginRight' : '5px'}}>
                        <strong>{comment.status} | <FriendlyDate date={comment.time} /></strong>
                    </div>
                </div>
                <div className='comment-description' style={{'marginTop' : '5px'}}>
                    <div dangerouslySetInnerHTML={{ __html: comment.text }} />
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;