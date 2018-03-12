import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { fetchProjects } from '../../actions/ProjectActions';
import { openModal } from '../../actions/ModalActions';
import { loginUser, checkUserToken, resetPasswordRequest } from '../../actions/UserActions';
import { getUser } from '../../reducers/UserReducer';
import { getMessage } from '../../reducers/MessageReducer';
import StandardButton from '../Common/StandardButton';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            retypePassword: '',
            errors: '',
            working: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleForgottenPassword = this.handleForgottenPassword.bind(this);
        this.checkMatchingPasswords = this.checkMatchingPasswords.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.setWorking = this.setWorking.bind(this);
        this.handleGoLogin = this.handleGoLogin.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(checkUserToken(this.props.params.token))
    }
    handleSubmit = (e) => {
        this.setWorking(true);
        const isValid = this.checkMatchingPasswords();
        if (isValid) {
            // reset the password   
            this.props.dispatch(resetPasswordRequest(this.state.newPassword, this.props.params.token))
            // redirect to the login page
        } else {
            this.setState({
                working: false,
                errors: 'Passwords do not match.',
            });
        }
    }
    handleGoLogin(){
        browserHistory.push(`/login`);
    }
    setWorking(isWorking) {
        this.setState({ working: isWorking });
    }
    handleForgottenPassword() {
        this.props.dispatch(openModal('forgotpassword'));
    }
    checkMatchingPasswords() {
        const isValid = this.state.newPassword == this.state.retypePassword;
        return isValid;
    }
    onTextChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    render() {
        console.log('reset password page message...', this.props.user);
        this.handleSubmit = this.handleSubmit.bind(this);
            return(
                <div className="landing-background">
                    {this.props.message.success === true ?
                        <div className="form-signin">
                            <h4>Reset password</h4>
                            <label htmlFor="new-password">New</label>
                            <input name="newPassword" type="password" className="form-control" onChange={this.onTextChange} value={this.state.newPassword} />
                            <label htmlFor="retype-password">Retype</label>
                            <input name="retypePassword" type="password" className="form-control" onChange={this.onTextChange} value={this.state.retypePassword} />
                            <StandardButton text="Reset" className="r-submit-button" isWorking={this.state.working} onClick={this.handleSubmit} />
                            <div className="error-container">
                                {this.state.errors}
                            </div>
                        </div>  
                        :
                        <div className="form-signin">
                            <h4>Reset password</h4>
                            <p className='error'><strong>Password reset is invalid or has expired. Please contact Brightwave for support.</strong></p>
                            <StandardButton text="Back to login" className="r-submit-button" onClick={this.handleGoLogin} />
                        </div>  
                }
                </div>
            );
    }
}

ResetPasswordPage.propTypes = {

};

function mapStateToProps(state) {
    return {
        user: getUser(state),
        message: getMessage(state),
    };
}


export default connect(mapStateToProps)(ResetPasswordPage);
