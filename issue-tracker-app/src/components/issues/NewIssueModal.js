import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import NewIssueForm from './NewIssueForm';

class NewIssueModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            issue : {},
            errors : {}
        };
        this.updateIssueState = this.updateIssueState.bind(this);
        this.saveIssue = this.saveIssue.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);       
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    updateIssueState(event){
        const field = event.target.name;
        let issue = this.state.issue;
        issue[field] = event.target.value;
        return this.setState({issue : issue});
    }
    saveIssue(event){
        event.preventDefault();
        //this.props.actions.saveCourse(this.state.course);
        return this.setState({ showModal: false });
    }
    render(){
        return(
            <div className="nav-div">
                <button 
                className="btn"
                onClick={this.open}
                >
                New Issue
                </button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewIssueForm 
                        issue={this.state.issue}
                        errors={this.state.errors}
                        onChange={this.updateIssueState}
                        onSave={this.saveIssue}
                        assignees={this.props.users}
                        {...this.props}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default NewIssueModal;