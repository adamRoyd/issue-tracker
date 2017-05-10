import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as commentActions from '../../actions/commentActions';
import CommentForm from './CommentForm';

class CommentManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors : {},
            comment : {},
            issue : Object.assign({},this.props.issue),
            toggleOptions : false,
            submitDisabled : true
        };
        this.toggleAdvancedOptions = this.toggleAdvancedOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDateTime = this.getDateTime.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onIssueChange = this.onIssueChange.bind(this);
    }
    toggleAdvancedOptions() {
        return this.setState({toggleOptions : !this.state.toggleOptions});
    }
    handleSubmit(e){
        e.preventDefault();
        const {id} = this.props.params;
        const commentText = this.state.comment.commentText;
        const time = this.getDateTime(); 
        this.props.addComment(id,this.props.user,commentText,time);
        this.props.saveIssue(this.state.issue);
        e.target.reset();
        return this.setState({
            comment : {}
        });
        //this.refs.commentForm.reset();
    }
    getDateTime(){
        const d = new Date();
        const curr_date = d.getDate();
        const curr_month = d.getMonth();
        const curr_year = d.getFullYear();
        return (curr_date + "-" + curr_month + "-" + curr_year);
    }
    onCommentChange(event){
        const field = event.target.name;
        let comment = this.state.comment;
        comment[field] = event.target.value;
        return this.setState({
            comment : comment,
            submitDisabled : false
        });
    }
    onIssueChange(event){
        const field = event.target.name;
        let issue = this.state.issue;
        issue[field] = event.target.value;
        return this.setState({issue : issue});
    }
    render(){
        return(
            <div>
                <CommentForm
                    issue={this.state.issue}
                    comment={this.state.comment}
                    errors={this.state.errors}
                    handleSubmit={this.handleSubmit}
                    assignees={this.props.assignees}
                    onCommentChange={this.onCommentChange}
                    onIssueChange={this.onIssueChange}
                    status={this.props.status}
                    displayAdvancedOptions={this.state.toggleOptions}
                    locations={this.props.locations}
                    categories={this.props.categories}
                    />
                <button id="submitComment" onClick={this.handleSubmit} className="btn" disabled={this.state.submitDisabled}>Submit</button>  
                <button id="attach" className="btn">Add attachment</button>
                <button id="advancedOptions" className="btn" onClick={this.toggleAdvancedOptions}>Toggle advanced options</button>
            </div>
        );
    }
}

CommentManager.propTypes = {
    issue : PropTypes.object.isRequired,
    assignees : PropTypes.array.isRequired,
    status : PropTypes.array.isRequired,
    params : PropTypes.array.isRequired,
    addComment : PropTypes.func.isRequired,
    saveIssue : PropTypes.func.isRequired,
    user : PropTypes.string.isRequired
};

function mapStateToProps(state){
    return{

    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(commentActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentManager);
