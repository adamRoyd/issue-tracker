import React, { PropTypes } from 'react';
import Issue from './Issue';
import Comments from './comments/Comments';
import CommentForm from './comments/CommentForm';
import IssueDescription from './issues/IssueDescription';

class IssueManager extends React.Component{
    render(){
        const i = this.props.issues.findIndex((issue) => issue.id === this.props.params.id);
        const issue = this.props.issues[i];
        const issueComments = this.props.comments[this.props.params.id] || []; //empty array when there are no comments
        return(
            <div>
                {issue == undefined ? 
                    (
                    <p>No issue selected</p>
                    )
                :
                    (
                    <div>
                        <IssueDescription issue={issue}/>
                        <CommentForm {...this.props} issue={issue}/>
                        <Comments issueComments={issueComments}/>
                    </div>
                    )
                }
            </div>
        );
    }
}

IssueManager.propTypes = {
    issues : PropTypes.array.isRequired,
    params : PropTypes.object.isRequired,
    comments : PropTypes.array.isRequired
};

export default IssueManager;