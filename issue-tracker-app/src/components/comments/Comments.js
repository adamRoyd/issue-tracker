import React, { PropTypes } from 'react';
import Comment from './Comment';

class Comments extends React.Component{

    render(){
        return(
            <div id="commentsBox">
                {this.props.issueComments.map((comment,i) =>
                    <Comment key={i} comment={comment}/>
                ).reverse()}
            </div>
        );
    }
}

Comments.propTypes = {
    issueComments : PropTypes.object.isRequired
};

export default Comments;