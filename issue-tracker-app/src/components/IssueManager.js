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
        console.log('param id = ' + i);
        console.log('issue =' + issue);
        console.log(issueComments);
        return(
            <div>
                {issue == null} ?
                <p>No issue selected</p>
                :
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
        );
    }
}

IssueManager.propTypes = {
    issues : PropTypes.object.isRequired,
    params : PropTypes.object.isRequired,
    comments : PropTypes.object.isRequired
};

export default IssueManager;