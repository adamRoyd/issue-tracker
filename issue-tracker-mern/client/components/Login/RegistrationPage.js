import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { saveUserRequest } from '../../actions/UserActions';
import { Link, browserHistory } from 'react-router';
import SelectInput from '../Common/SelectInput';
import TextInput from '../Common/TextInput';

class RegistrationPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors : {},
            user: {
                username: "",
                password: "",
                usertype: ""
            }
        };
        this.updateUserState = this.updateUserState.bind(this);
        //this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    updateUserState(event){
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        return this.setState({user : user});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(saveUserRequest(this.state.user));
        return this.setState({
            user: {
                username: "",
                password: "",
                usertype: ""
            }
        })
    }
    render(){
        return(
            <div className="wrapper">
                <div className="form-signin">
                    <h4>Add a new user</h4>
                    <form onSubmit={this.handleSubmit}>
                        <TextInput
                            name="username"
                            label="Username"
                            value={this.state.user.username}
                            onChange={this.updateUserState} 
                            error={this.state.errors.username}/>
                        <TextInput
                            name="password"
                            label="Password"
                            value={this.state.user.password}
                            onChange={this.updateUserState} 
                            error={this.state.errors.password}/>
                        <SelectInput
                            name="usertype"
                            label="User Type"
                            value={this.state.user.usertype}
                            options={["Internal","Client","Admin"]}
                            onChange={this.updateUserState} 
                            error={this.state.errors.usertype}/>
                        <button className="btn login-button" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }  
}

export default connect()(RegistrationPage);