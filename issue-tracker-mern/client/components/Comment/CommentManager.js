import React,{componentWillReceiveProps} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addCommentRequest } from '../../actions/CommentActions';
import { saveIssueRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
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
    componentWillReceiveProps(){
        return this.setState({issue : Object.assign({},this.props.issue)});
    }
    toggleAdvancedOptions() {
        return this.setState({toggleOptions : !this.state.toggleOptions});
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.dispatch(addCommentRequest(this.state.comment,this.props.params));
        this.props.dispatch(saveIssueRequest(this.state.issue));
        return this.setState({
            comment : {text : ''},
            submitDisabled : true
        });
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
    params : PropTypes.object.isRequired,
    addCommentRequest : PropTypes.func.isRequired,
    saveIssueRequest : PropTypes.func.isRequired,
    user : PropTypes.string.isRequired,
    locations : PropTypes.array.isRequired,
    categories : PropTypes.array.isRequired
};

function mapStateToProps(state){
    return{
        assignees: getAssignees(state)
    };
}

export default connect(mapStateToProps)(CommentManager);
