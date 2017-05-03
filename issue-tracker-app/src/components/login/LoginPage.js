import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser} from '../../actions/loginActions';
import { Link, browserHistory } from 'react-router';

class LoginPage extends React.Component{

    handleSubmit(e){
        e.preventDefault();
        const userName = this.refs.userName.value;
        const passWord = this.refs.password.value;
        this.props.setUser(userName);
        browserHistory.push(`/selectproject`);
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
    setUser : PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{

    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setUser}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);