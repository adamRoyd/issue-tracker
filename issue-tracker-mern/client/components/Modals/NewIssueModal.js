import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {addIssueRequest} from '../../actions/IssueActions';
import { getAssignees } from '../../reducers/AssigneeReducer';
import NewIssueForm from '../Issue/NewIssueForm';

class NewIssueModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            issue : Object.assign({},this.props.issue),
            errors : {}
        };
        this.updateIssueState = this.updateIssueState.bind(this);
        this.saveIssue = this.saveIssue.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
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
        const errors = this.validate(this.state.issue);
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            this.props.dispatch(addIssueRequest(this.state.issue,this.props.issues,this.props.params.projectCode));
            return this.setState({ showModal: false });           
        }   else{
            return this.setState({ errors: errors});
        }
    }
    validate(issue){
        const errors = {'sss': 'sss'}
        
        Object.keys(issue).forEach(key => {
            console.log(key,issue[key]);
        });
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
                            {...this.props}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                        <button className="btn" onClick={this.saveIssue}>Save</button>
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
