import React from 'react';
import PropTypes from 'prop-types';

class Comment extends React.Component{
    render(){
        const {comment} = this.props;
        return(
            <div className="comment">
                <div className="row">
                    <div className="col-sm-10">
                        <p><strong>{comment.user}</strong></p>
                        <p>{comment.text}</p>
                    </div>
                    <div className="col-sm-2">
                        <p>{comment.movement} {comment.time}</p>
                        <p>Link to attachment</p>
                    </div>   
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    comment : PropTypes.object.isRequired
};

export default Comment;