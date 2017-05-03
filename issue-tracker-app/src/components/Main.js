import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './common/NavBar';

class Main extends React.Component{
    render(){
        return(
            <div>
                <NavBar {...this.props}/>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

Main.propTypes = {
    children : PropTypes.object.isRequired
};

export default Main;