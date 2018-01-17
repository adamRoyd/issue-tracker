import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getComments } from '../../reducers/CommentReducer';
import { fetchComments } from '../../actions/CommentActions';
import { openModal } from '../../actions/ModalActions'
import Issue from '../IssueTable/Issue';
import Comments from '../Comment/Comments';
import IssueManager from '../Issue/IssueManager';
import CommentModal from '../Modals/CommentModal';

class EditIssuePage extends React.Component{
    constructor(props){
        super(props);
        this.expandComments = this.expandComments.bind(this);
    }
    expandComments(){
        this.props.dispatch(openModal('comments'));
    }
    componentDidMount() {
        this.props.dispatch(fetchComments(this.props.params.projectCode,this.props.params.id));
    }
    render(){
        const i = this.props.issues.findIndex((issue) => issue.id == this.props.params.id);
        const issue = this.props.issues[i];
        const issueComments = this.props.comments;
        return(
            <div className='editIssuePage'>
                <IssueManager {...this.props} issue={issue}/>
                <div className='commentsHeader'>
                    <h4>Comments <i className='fa fa-expand expandIcon' title='Expand comments' onClick={this.expandComments}/></h4>
                    
                </div>
                <Comments issueComments={ issueComments } issue={ issue }/>
                <CommentModal issueComments={ issueComments } issue={ issue }/>
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