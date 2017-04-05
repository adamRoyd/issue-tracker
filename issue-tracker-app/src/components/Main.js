import React from 'react';
import { Link } from 'react-router';

class Main extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <h1>
                    <Link to="/">IT</Link>
                </h1>
                {/*
                This ensures that all of the first children get the props from dispatch as well! 
                You need to pass down the props to deeper children.
                */}
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

export default Main;