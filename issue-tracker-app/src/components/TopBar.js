import React, {PropTypes} from 'react';

class TopBar extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div id="topBar">
                {/*<button className="btn">New issue</button>*/}
            </div>
        );
    }
}

TopBar.propTypes = {
};

export default TopBar;