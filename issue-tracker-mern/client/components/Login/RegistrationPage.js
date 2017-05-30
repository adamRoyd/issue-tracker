import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setUser} from '../../actions/loginActions';
import { saveUserRequest } from '../../actions/userActions';
import { Link, browserHistory } from 'react-router';

class RegistrationPage extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const username = this.refs.userName.value;
        const password = this.refs.password.value;
        const user = {username,password}
        this.props.dispatch(saveUserRequest(user));
        browserHistory.push(`/login`);
    }
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        return(
            <div className="wrapper">
                <div className="form-signin">
                    <h4>Register</h4>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control" ref="userName" placeholder="Email Address" required="" autoFocus="" />
                        <input type="password" className="form-control" ref="password" placeholder="Password" required=""/>
                        <p>[TO DO IS CLIENT]</p>
                        <button className="btn login-button" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }  
}

RegistrationPage.propTypes = {

};

function mapStateToProps(state){
    return{

    };
}

export default connect(mapStateToProps)(RegistrationPage);