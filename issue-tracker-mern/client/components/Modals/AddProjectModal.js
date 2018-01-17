import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import { closeModal } from '../../actions/ModalActions';
import { Link, browserHistory } from 'react-router';
import { addProjectRequest } from '../../actions/ProjectActions';
import { getMessage } from '../../reducers/MessageReducer';
import TextInput from '../Common/TextInput';
import Spinner from '../Common/Spinner';


class AddProjectModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors : "",
            project: "",
            message: "",
            success: false
        };
        this.updateProjectState = this.updateProjectState.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.close = this.close.bind(this);
    }
    updateProjectState(event){
        const field = event.target.name;
        let project = this.state.project;
        project = event.target.value;
        return this.setState({
            project : project,
            errors: ""
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newProject = this.state.project;
        const errors = this.validate(newProject);
        if(errors == ""){
            this.props.dispatch(addProjectRequest(newProject));
            return this.setState({
                project: ""
            })
        }   else{
            return this.setState({
                errors: errors
            })
        }
    }
    validate(project){
        let errors = ""
        if(project == "" || project.length < 4){
            errors = "Please enter a valid project code"
        }
        return errors
    }
    close() {
        this.props.dispatch(closeModal());
    }
    render(){
        return(
            <div className="nav-div">
                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid">
                            <TextInput
                                name="project"
                                label="Project code"
                                placeholder="Enter a project code"
                                value={this.state.project}
                                onChange={this.updateProjectState} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Spinner visible={this.props.message.isFetching}/>
                        <div className="infomessage error">{this.state.errors}</div>
                        <div className={this.props.message.success ? "infomessage success" : "infomessage error"}>{this.props.message.text}</div>
                        <button className="btn" onClick={this.close}>Close</button>
                        <button className="btn" disabled={this.state.project.length === 0} onClick={this.handleSubmit}>Create Project</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

AddProjectModal.propTypes = {
    buttonName : PropTypes.string,
    params : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        showModal: state.modal == 'addproject',
        message: getMessage(state)
    };
}

export default connect(mapStateToProps)(AddProjectModal);
