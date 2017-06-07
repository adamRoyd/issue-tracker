import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { fetchProjects } from '../../actions/ProjectActions';
import { loginUser } from '../../actions/UserActions';
import { getUser } from '../../reducers/UserReducer';

class LoginPage extends React.Component{
    componentWillMount(){
        const l = localStorage.getItem('id_token')
    }
    componentWillUpdate(nextProps,nextState){
        if(nextProps.user.isAuthenticated){
            browserHistory.push('/selectproject');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const creds = {
            username : this.refs.userName.value,
            password : this.refs.password.value
        }
        this.props.dispatch(fetchProjects());
        this.props.dispatch(loginUser(creds))
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
                        {(this.props.user.errorMessage)
                            ? <p style={{color:'red'}}>{this.props.user.errorMessage.message}</p>
                            : <p></p>
                        }
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
        user: getUser(state)
    };
}


export default connect(mapStateToProps)(LoginPage);