import React, { getInitialState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Common/TextInput';
import validator from 'validator';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../../actions/ModalActions';
import { forgotPasswordRequest } from '../../actions/UserActions';
import { getMessage } from '../../reducers/MessageReducer';
import Spinner from '../Common/Spinner';

class ForgotPasswordModal extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.updateEmailState = this.updateEmailState.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            errors: '',
            working: false,
        };
    }

    close() {
        this.setState({
            email: '',
            errors: '',
            working: false
        })
        this.props.dispatch(closeModal());
    }

    setWorking(isWorking) {
        console.log('set working', isWorking);
        working: isWorking;
    }

    updateEmailState(event) {
        const email = event.target.value;
        return this.setState({
            email,
        });
    }

    handleSubmit() {
        this.setWorking(true);
        const email = this.state.email;
        const isValid = this.validate(email);
        console.log("valid", isValid);
        if (isValid) {
            this.props.dispatch(forgotPasswordRequest(this.state.email))
                .then(() => {
                    console.log("message?", this.props.message.text);
                    this.setState({
                        errors: this.props.message.text
                    })
                }
                )
        } else {
            this.setState({
                errors: 'Please enter a valid email address'
            })
        }
    }

    validate(email) {
        const isValid = email !== '' && validator.isEmail(email);
        return isValid;
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgotten Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ marginBottom: '20px' }}>If you've forgotten your password you can reset it here. Enter your email address below.</div>
                        <TextInput
                            name='Email'
                            label='Email address'
                            placeholder='Enter your email address'
                            value={this.state.email}
                            onChange={this.updateEmailState}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Spinner visible={this.state.working} />
                        <div className={this.props.message.success ? 'infomessage success' : 'infomessage error'}>{this.state.errors}</div>
                        <button className='btn' onClick={this.close}>Close</button>
                        <button className='btn' onClick={this.handleSubmit}>Submit</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

ForgotPasswordModal.propTypes = {
    buttonName: PropTypes.string,
    params: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    return {
        showModal: state.modal == 'forgotpassword',
        message: getMessage(state),
    };
}

export default connect(mapStateToProps)(ForgotPasswordModal);
