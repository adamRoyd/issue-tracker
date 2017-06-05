import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { loginUserRequest } from '../../actions/UserActions';
import { Link, browserHistory } from 'react-router';

class LoginPage extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const username = this.refs.userName.value;
        const password = this.refs.password.value;
        this.props.dispatch(loginUserRequest(username,password))
    }
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        return(
            <div className="wrapper">
                <div className="form-signin">
                    <h4>Log in</h4>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control" ref="userName" placeholder="Email Address" required="" autoFocus="" />
                        <input type="password" className="form-control" ref="password" placeholder="Password" required=""/>
                        <button className="btn login-button" type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    }  
}

LoginPage.propTypes = {

};

function mapStateToProps(state){
    return{

    };
}


export default connect(mapStateToProps)(LoginPage);