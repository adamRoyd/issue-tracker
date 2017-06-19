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
        console.log(this.state.issue);
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
            this.props.dispatch(addIssueRequest(this.state.issue,this.props.attachments,this.props.issues,this.props.params.projectCode));
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
        // if(issue.location == null){
        //     errors = {
        //         location : 'Select a location'
        //     }
        // }
        return errors
    }
    render(){
        return(
            <div className="col-sm-8 col-sm-offset-2">
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
                    {...this.props}/>
                <div className="right-align">
                    <button className="btn" onClick={this.close}>Close</button>
                    <button className="btn" onClick={this.saveIssue}>Create issue</button>
                </div>
            </div>
        );
    }
}

NewIssuePage.propTypes = {
    issue : PropTypes.object,
    username : PropTypes.string.isRequired,
    assignees : PropTypes.array.isRequired,
    locations : PropTypes.array.isRequired,
    params : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        assignees: getAssignees(state),
        attachments: getAttachments(state),
        categories,
        locations,
        status
    };
}

export default connect(mapStateToProps)(NewIssuePage);