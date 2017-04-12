import React from 'react';

class Comment extends React.Component{

    render(){
        const {comment} = this.props;
        return(
            <div className="comment">
                <div className="commentHeading">
                    <p>{comment.user}<span className="right"><span className="pot">{comment.movement}</span>&nbsp;&nbsp;&nbsp;23/12/2016 6:34pm</span></p>
                </div>
                <p>{comment.text}</p>
            </div>
        );
    }
}

export default Comment;