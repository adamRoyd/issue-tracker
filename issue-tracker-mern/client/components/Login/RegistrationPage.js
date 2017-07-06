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
            },
            message: "",
            success: false
        };
        this.updateUserState = this.updateUserState.bind(this);
        this.validate = this.validate.bind(this);
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
        const newUser = this.state.user;
        const errors = this.validate(newUser);
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            this.props.dispatch(saveUserRequest(newUser));
            return this.setState({
                message: `New ${newUser.usertype} user ${newUser.username} created. They will recieve an email shortly.`,
                user: {
                    username: "",
                    password: "",
                    usertype: ""
                },
                success: true
            })
        }   else{
            return this.setState({
                message: `There was a problem with the form. Please ensure you have entered a valid email address and password.`,
                success:false
            })
        }
    }
   validate(user){
        let errors = {}
        if(user.username == ""){
            errors = Object.assign({},errors,{
                username: 'Error'
            })
        }
        if(user.password == ""){
            errors = Object.assign({},errors,{
                password: 'Error'
            })
        }
        return errors
    }
    render(){
        return(
            <div className="col-sm-8 col-sm-offset-2">
                    <h4>Add a new user</h4>
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
                <div className={this.state.success ? "infomessage success" : "infomessage error"}>{this.state.message}</div>
                <div className="right-align">
                    <button className="btn" onClick={this.handleSubmit}>Create User</button>
                </div>
            </div>
        );
    }  
}

export default connect()(RegistrationPage);