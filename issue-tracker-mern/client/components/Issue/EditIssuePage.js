import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getComments } from '../../reducers/CommentReducer';
import { fetchComments } from '../../actions/CommentActions';
import Issue from './Issue';
import Comments from '../Comment/Comments';
import IssueManager from '../Issue/IssueManager';

class EditIssuePage extends React.Component{
    componentDidMount() {
        this.props.dispatch(fetchComments(this.props.params.projectCode,this.props.params.id));
    }
    render(){
        const i = this.props.issues.findIndex((issue) => issue.id == this.props.params.id);
        const issue = this.props.issues[i];
        const issueComments = this.props.comments;
        return(
            <div id="EditIssuePage">
                <IssueManager {...this.props} issue={issue}/>
                <div id="commentsHeader"><h4>Comments</h4></div>
                <Comments issueComments={issueComments} issue={issue}/>
            </div>
        );
    }
}

EditIssuePage.propTypes = {
    issues : PropTypes.array.isRequired,
    params : PropTypes.object.isRequired,
    comments : PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        issues: state.issues,
        comments : getComments(state)
    };
}

export default connect(mapStateToProps)(EditIssuePage);