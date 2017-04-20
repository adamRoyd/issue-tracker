import React, {PropTypes} from 'react';
import FilterLink from '../containers/FilterLink';

class SideBar extends React.Component{
    render(){
        return(
            <div>
                {this.props.status.map((value,i) => <FilterLink key={i} value={value}/>)}
                
            </div>
        );
    }
}

SideBar.propTypes = {
    status : PropTypes.array.isRequired
};

export default SideBar;