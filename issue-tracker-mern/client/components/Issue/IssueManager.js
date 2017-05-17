import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getComments } from '../../reducers/CommentReducer';
import { fetchComments } from '../../actions/CommentActions';
import Issue from './Issue';
import Comments from '../Comment/Comments';
import CommentManager from '../Comment/CommentManager';
import IssueDescription from './IssueDescription';

class IssueManager extends React.Component{
    componentDidMount() {
        this.props.dispatch(fetchComments(this.props.params.id));
    }
    render(){
        const i = this.props.issues.findIndex((issue) => issue.id == this.props.params.id);
        const issue = this.props.issues[i];
        const issueComments = this.props.comments;
        return(
            <div>
                <div>
                    <h4>Issue description</h4>
                    <IssueDescription issue={issue}/>
                    <CommentManager {...this.props} issue={issue}/>
                    <Comments issueComments={issueComments}/>
                </div>
            </div>
        );
    }
}

IssueManager.need = [() => { return fetchComments(this.props.params.id); }];

IssueManager.propTypes = {
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

export default connect(mapStateToProps)(IssueManager);