import React from 'react';
import Comment from './Comment';

class Comments extends React.Component{

    render(){
        return(
            <div>
                {this.props.issueComments.map((comment,i) =>
                    <Comment key={i} comment={comment}/>
                )}
            </div>
        );
    }
}

export default Comments;