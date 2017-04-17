import React from 'react';

class Comment extends React.Component{

    render(){
        const {comment} = this.props;
        return(
            <div className="comment">
                <div className="row">
                    <div className="col-sm-10">
                        <p>{comment.user}</p>
                        <p>{comment.text}</p>
                    </div>
                    <div className="col-sm-2">
                        <p>{comment.movement} 6:34pm</p>
                        <p>Link to attachment</p>
                    </div>
                   
                </div>
                
            </div>
        );
    }
}

export default Comment;