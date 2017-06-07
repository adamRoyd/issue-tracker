import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import Browser from 'detect-browser';
import { addIssueRequest, uploadFileRequest } from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import NewIssueForm from '../Issue/NewIssueForm';

class NewIssueModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            issue : {
                location: null,
                sco: null,
                screen: null,
                category: null,
                assigned: null,
                description: null,
                browser: Browser.name + ' ' + Browser.version
            },
            errors : {},
            files: []
        };
        this.updateIssueState = this.updateIssueState.bind(this);
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
    saveIssue(event){
        event.preventDefault();
        const errors = this.validate(this.state.issue);
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            this.props.dispatch(addIssueRequest(this.state.issue,this.state.files,this.props.issues,this.props.params.projectCode));
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
            <div className="nav-div">
                <button 
                className="btn"
                onClick={this.open}
                >
                {this.props.buttonName}
                </button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Issue for {this.props.user} {this.props.params.projectCode.toUpperCase()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewIssueForm 
                            issue={this.state.issue}
                            errors={this.state.errors}
                            onChange={this.updateIssueState}
                            onSave={this.saveIssue}
                            assignees={this.props.assignees}
                            locations={this.props.locations}
                            categories={this.props.categories}
                            onDrop={this.onDrop}
                            files={this.state.files}
                            {...this.props}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                        <button className="btn" onClick={this.saveIssue}>Create issue</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

NewIssueModal.propTypes = {
    issue : PropTypes.object,
    user : PropTypes.string.isRequired,
    assignees : PropTypes.array.isRequired,
    locations : PropTypes.array.isRequired,
    buttonName : PropTypes.string,
    params : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        assignees: getAssignees(state)
    };
}

export default connect(mapStateToProps)(NewIssueModal);
