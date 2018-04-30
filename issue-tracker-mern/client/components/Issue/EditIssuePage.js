import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getComments } from '../../reducers/CommentReducer';
import { getIssue } from '../../reducers/IssueReducer';
import { fetchComments } from '../../actions/CommentActions';
import { openModal } from '../../actions/ModalActions';
import Issue from '../IssueTable/Issue';
import Comments from '../Comment/Comments';
import IssueManager from '../Issue/IssueManager';
import SplitPane from 'react-split-pane';

class EditIssuePage extends React.Component {
    constructor(props) {
        super(props);
        this.expandComments = this.expandComments.bind(this);
    }
    expandComments() {
        this.props.dispatch(openModal('comments'));
    }
    render() {
        const i = this.props.issues.findIndex((issue) => issue.id == this.props.params.id);
        const issue = this.props.issues[i];
        const issueComments = this.props.comments;
        return (
            this.props.issue ?
            <SplitPane split="horizontal" defaultSize="400px" primary="first">
                <IssueManager {...this.props} issue={issue} />
                <div className="comments-container">
                    <div className="comments-header">
                        <h4>Comments</h4>
                    </div>
                    <Comments issueComments={issueComments} issue={issue} />
                </div>
            </SplitPane>
            :
            <span/>
        );
    }
}

EditIssuePage.propTypes = {
    issues: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        issue: getIssue(state.issues, ownProps.params.id),
        issues: state.issues,
        comments: getComments(state),
    };
}

export default connect(mapStateToProps)(EditIssuePage);
