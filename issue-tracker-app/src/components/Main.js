import React from 'react';
import NavBar from './NavBar';

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

export default Main;