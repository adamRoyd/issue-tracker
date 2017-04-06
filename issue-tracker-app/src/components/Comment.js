import React from 'react';

class Comment extends React.Component{

    render(){
        const {comment} = this.props;
        return(
            <div id="comment">
                <p><strong>{comment.user}</strong></p>
                <p>{comment.text}</p>
            </div>
        );
    }
}

export default Comment;