import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as issueActions from '../../actions/issueActions';
import Issue from './Issue';
import Comments from '../comments/Comments';
import CommentForm from '../comments/CommentForm';
import IssueDescription from './IssueDescription';

class IssueManager extends React.Component{

    render(){
        const i = this.props.issues.findIndex((issue) => issue.id === this.props.params.id);
        const issue = this.props.issues[i];
        const issueComments = this.props.comments[this.props.params.id] || []; //empty array when there are no comments
        return(
            <div>
                {issue == undefined ? 
                    (
                    <p></p>
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

function mapStateToProps(state, ownProps) {
    return {
        issues: state.issues
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(issueActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueManager);