import React, { PropTypes } from 'react';
import Issue from './Issue';
import Comments from './Comments';
import CommentForm from './CommentForm';

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
                        <div id="issueDescription" className="row">
                            <div className="col-sm-7">
                                <p><b>Description</b></p>
                                <p>{issue.description}</p>
                            </div>
                            <div className="col-sm-5">
                                <img src="https://placekitten.com/300/140"/>
                            </div>
                        </div>
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
    issues : PropTypes.object.isRequired,
    params : PropTypes.object.isRequired,
    comments : PropTypes.object.isRequired
};

export default IssueManager;