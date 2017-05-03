import React from 'react';
import PropTypes from 'prop-types';
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
    issueComments : PropTypes.array.isRequired
};

export default Comments;