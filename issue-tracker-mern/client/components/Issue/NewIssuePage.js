import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import Browser from 'detect-browser';
import categories from '../../constants/categories';
import locations from '../../constants/locations';
import status from '../../constants/status';
import { addIssueRequest, uploadFileRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import { getAttachments } from '../../reducers/AttachmentReducer';
import { getIssues } from '../../reducers/IssueReducer';
import { getArea } from '../../reducers/AreaReducer';
import { getUser } from '../../reducers/UserReducer';
import NewIssueForm from '../Issue/NewIssueForm';

class NewIssuePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            issue : {
                location: "",
                sco: "",
                screen: "",
                category: "",
                assigned: "",
                description: "",
                browser: Browser.name + ' ' + Browser.version
            },
            errors : {},
            files: []
        };
        this.updateIssueState = this.updateIssueState.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.saveIssue = this.saveIssue.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    close() {
        this.setState({ showModal: false, issue:{}, errors: {} });
    }
    open() {
        this.setState({ showModal: true });
    }
    updateIssueState(event){
        const field = event.target.name;
        const errors = this.validate(this.state.issue);
        let issue = this.state.issue;
        issue[field] = event.target.value;
        return this.setState({issue : issue, errors: errors});
    }
    onCommentChange(html){
        let issue = this.state.issue;
        issue['description'] = html;
        return this.setState({issue : issue});
    }
    saveIssue(event){
        event.preventDefault();
        const errors = this.validate(this.state.issue);
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            this.props.dispatch(
                addIssueRequest(
                    this.state.issue,
                    this.props.attachments,
                    this.props.issues,
                    this.props.params.projectCode,
                    this.props.username
                )
            );
            return this.setState({ showModal: false });           
        }   else{
            return this.setState({ errors: errors});
        }
    }
    onDrop(files){
        this.setState({
            files
        });
        this.props.dispatch(uploadFileRequest(files))
    }
    validate(issue){
        let errors = {}
        Object.keys(issue).forEach(item =>{
            if(issue[item] == null){
                errors = {
                   item : 'BLAAAAAH'
               }
            }
        })

        return errors
    }
    render(){
        return(
            <div id="newIssuePage" className={(this.props.phoneView) ? "container visible-phone" : "container"}>
                <h3>New issue for {this.props.params.projectCode}</h3>
                <NewIssueForm 
                    issue={this.state.issue}
                    errors={this.state.errors}
                    onChange={this.updateIssueState}
                    onCommentChange={this.onCommentChange}
                    assignees={this.props.assignees}
                    locations={this.props.locations}
                    categories={this.props.categories}
                    onDrop={this.onDrop}
                    files={this.state.files}
                    params={this.props.params}
                    {...this.props}/>
                <div className="right-align">
                    <button className="btn" onClick={this.close}>Close</button>
                    <button className="btn" onClick={this.saveIssue}>Create User</button>
                </div>
            </div>
        );
    }
}

NewIssuePage.propTypes = {
    issue : PropTypes.object,
    assignees : PropTypes.array.isRequired,
    locations : PropTypes.array.isRequired,
    params : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        assignees: getAssignees(state),
        attachments: getAttachments(state),
        area: getArea(state),
        username: getUser(state).username,
        categories,
        locations,
        status
    };
}

export default connect(mapStateToProps)(NewIssuePage);
