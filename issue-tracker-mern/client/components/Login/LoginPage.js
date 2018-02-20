import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { fetchProjects } from '../../actions/ProjectActions';
import { openModal } from '../../actions/ModalActions'
import { loginUser } from '../../actions/UserActions';
import { getUser } from '../../reducers/UserReducer';
import { getMessage } from '../../reducers/MessageReducer';
import ForgotPasswordModal from '../Modals/ForgotPasswordModal';
import Spinner from '../Common/Spinner';
import logonimage from '../../assets/BIT_logon.png';
import StandardButton from '../Common/StandardButton';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            working : false,
            errors : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleForgottenPassword = this.handleForgottenPassword.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setWorking = this.setWorking.bind(this);
    }
    handleSubmit(){
        this.setWorking(true);
        const creds = {
            username: this.state.username,
            password: this.state.password
        }
        console.log('creds', creds);
        //todo do we need to call fetch projects here
        this.props.dispatch(fetchProjects());
        this.props.dispatch(loginUser(creds))
            .then(() => {
                this.setWorking(false);
                if(this.props.user.username){
                    browserHistory.push('/selectproject');
                }   else{
                    this.setState({
                        errors: this.props.user.errorMessage.message
                    })
                }
            })
    }
    handleForgottenPassword() {
        this.props.dispatch(openModal('forgotpassword'));
    }
    onTextChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    setWorking(isWorking) {
        this.setState({ working: isWorking });
    }
    handleKeyPress(event) {
        if (event.key === 'Enter'){
            event.preventDefault();
            this.handleSubmit();
        }
    }
    render() {
        if (this.props.user.username) {
            browserHistory.push('/selectproject');
        }
        return (
            <div className='wrapper'>
                <div className='formSignin'>
                    <h4>Log in</h4>
                    <input name='username' type='text' className='form-control' placeholder='Email Address' onChange={this.onTextChange} onKeyPress={this.handleKeyPress} autoFocus={true} />
                    <input name='password' type='password' className='form-control' placeholder='Password' onChange={this.onTextChange} onKeyPress={this.handleKeyPress} />
                    <StandardButton text='Login' className='r-submit-button' isWorking={this.state.working} onClick={this.handleSubmit}/>
                    <a onClick={this.handleForgottenPassword}>Forgotten your password?</a>
                    <div className='error-container'>
                        {this.state.errors}
                    </div>
                </div>
                <ForgotPasswordModal />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: getUser(state),
        message: getMessage(state)
    };
}


export default connect(mapStateToProps)(LoginPage);