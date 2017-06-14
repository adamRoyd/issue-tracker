import React,{componentWillReceiveProps} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { addCommentRequest } from '../../actions/CommentActions';
import { saveIssueRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { getPots } from '../../reducers/IssueFilterReducer';
import CommentForm from '../Comment/CommentForm';
import IssueDescription from './IssueDescription';
import IssueForm from '../Issue/IssueForm';

class IssueManager extends React.Component{
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
        //browserHistory.push(`/${this.props.params.projectCode}/issues/${this.props.params.filter}/`);
        return this.setState({
            comment : {text : ''},
            submitDisabled : true
        });
    }
    onCommentChange(html){
        let comment = this.state.comment;
        return this.setState({
            comment : {
                user: this.props.username,
                text: html
            },
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
                <div className="row displayTable">
                    <div className="col-sm-8">
                        <h4>Issue Description</h4>
                    </div>                 
                </div>
                <div className="row displayTable">
                    <div className="col-sm-8">
                        <IssueDescription issue={this.state.issue}/>
                        <CommentForm
                            issue={this.state.issue}
                            comment={this.state.comment}
                            errors={this.state.errors}
                            handleSubmit={this.handleSubmit}
                            assignees={this.props.assignees}
                            onCommentChange={this.onCommentChange}
                            onIssueChange={this.onIssueChange}
                            status={this.props.pots}
                            displayAdvancedOptions={this.state.toggleOptions}
                            locations={this.props.locations}
                            categories={this.props.categories}
                            />
                    </div>
                    <IssueForm
                        issue={this.state.issue}
                        comment={this.state.comment}
                        errors={this.state.errors}
                        handleSubmit={this.handleSubmit}
                        assignees={this.props.assignees}
                        onCommentChange={this.onCommentChange}
                        onIssueChange={this.onIssueChange}
                        status={this.props.pots}
                        displayAdvancedOptions={this.state.toggleOptions}
                        locations={this.props.locations}
                        categories={this.props.categories}
                        />                        
                </div>
               

                <button id="submitComment" onClick={this.handleSubmit} className="btn" disabled={this.state.submitDisabled}>Submit</button>  
                <button id="attach" className="btn">Add attachment</button>
                <button id="advancedOptions" className="btn" onClick={this.toggleAdvancedOptions}>Toggle advanced options</button>
            </div>
        );
    }
}

IssueManager.propTypes = {
    issue : PropTypes.object.isRequired,
    assignees : PropTypes.array.isRequired,
    status : PropTypes.array.isRequired,
    params : PropTypes.object.isRequired,
    locations : PropTypes.array.isRequired,
    categories : PropTypes.array.isRequired
};

function mapStateToProps(state){
    return{
        assignees: getAssignees(state),
        pots: getPots()
    };
}

export default connect(mapStateToProps)(IssueManager);
