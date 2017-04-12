import React, { PropTypes } from 'react';
import Issue from './Issue';
import Comments from './Comments';
import CommentForm from './CommentForm';

class IssueManager extends React.Component{
    render(){

            //get index of the issue
            const i = this.props.issues.findIndex((issue) => issue.id === this.props.params.id);
            //get the issue
            const issue = this.props.issues[i];
            //get the issue Comments
            const issueComments = this.props.comments[this.props.params.id] || []; //empty array ensures that it loads when there are no comments
        return(
            <div>
                <div id="issueDescription">
                    <p><b>Description</b></p>
                    <p>{issue.description}</p>
                </div>
                <CommentForm {...this.props}/>
                <Comments issueComments={issueComments}/>
            </div>
        );
    }
}

IssueManager.propTypes = {
    issues : PropTypes.object.isRequired,
    params : PropTypes.object.isRequired,
    comments : PropTypes.object.isRequired
};

export default IssueManager;