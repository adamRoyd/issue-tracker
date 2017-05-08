import React from 'react';
import PropTypes from 'prop-types';

class Comment extends React.Component{
    render(){
        const {comment} = this.props;
        return(
            <div className="comment">
                <div className="row">
                    <div className="col-sm-8">
                        <p><strong>{comment.user}</strong></p>
                    </div>
                    <div className="col-sm-4">
                        <p>{comment.time}</p>
                    </div>   
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <p>{comment.text}</p>
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