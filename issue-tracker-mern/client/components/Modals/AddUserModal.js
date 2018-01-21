import React,{getInitialState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import validator from 'validator';
import { closeModal } from '../../actions/ModalActions';
import ProjectPicker from '../Common/ProjectPicker';
import { addUserRequest } from '../../actions/UserActions';
import { Link, browserHistory } from 'react-router';
import SelectInput from '../Common/SelectInput';
import TextInput from '../Common/TextInput';
import { fetchProjects } from '../../actions/ProjectActions';
import { getProjects } from '../../reducers/ProjectReducer';
import { getMessage } from '../../reducers/MessageReducer';
import Spinner from '../Common/Spinner';

class AddUserModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors : "",
            user: {
                username: "",
                usertype: "Internal"
            },
            success: false
        };
        this.updateUserState = this.updateUserState.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.close = this.close.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchProjects());
    }
    updateUserState(event){
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        return this.setState({
            user : user,
            errors: ""
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = this.state.user;
        const errors = this.validate(newUser);
        if(errors == ""){
            this.props.dispatch(addUserRequest(newUser));
            return this.setState({
                user: {
                    username: "",
                    usertype: ""
                },
                success: true
            })
        }   else{
            return this.setState({
                success:false,
                errors: errors
            })
        }
    }
    validate(user){
        let errors = ""
        if(user.username == "" || !validator.isEmail(user.username)){
            errors = "Please enter a valid email address"
        }
        return errors
    }
    close() {
        this.props.dispatch(closeModal());
    }
    render(){
        return(
            <div>
                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container-fluid'>
                            <TextInput
                                name="username"
                                label="Username (email)"
                                placeholder="Select a username"
                                value={this.state.user.username}
                                onChange={this.updateUserState} 
                                error={this.state.errors.username}/>
                            <SelectInput
                                name="usertype"
                                label="User Type"
                                value={this.state.user.usertype}
                                options={["Internal","Client","Admin"]}
                                onChange={this.updateUserState} 
                                error={this.state.errors.usertype}/>
                            {(this.state.user.usertype == "Client") &&
                                <SelectInput
                                    name="projects"
                                    label="Restrict client to project"
                                    value={this.state.user.projects}
                                    options={this.props.projects}
                                    onChange={this.updateUserState} 
                                    error={this.state.errors.usertype}/>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Spinner visible={this.props.message.isFetching}/>
                        <div className="infomessage error">{this.state.errors}</div>
                        <div className={this.props.message.success ? "infomessage success" : "infomessage error"}>{this.props.message.text}</div>
                        <button className="btn" onClick={this.close}>Close</button>
                        <button className="btn" onClick={this.handleSubmit}>Create User</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

AddUserModal.propTypes = {
    buttonName : PropTypes.string,
    params : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        showModal: state.modal == 'adduser',
        projects : getProjects(state),
        message: getMessage(state)
    };
}

export default connect(mapStateToProps)(AddUserModal);
