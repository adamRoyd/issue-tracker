import React from 'react';
import PropTypes from 'prop-types';
import FilterLink from '../../containers/FilterLink';

class SideBar extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                {this.props.status.map((value,i) => <FilterLink projectCode={this.props.projectCode} key={i} value={value}/>)}
            </div>
        );
    }
}

SideBar.propTypes = {
    status : PropTypes.array.isRequired,
    projectCode : PropTypes.string.isRequired
};

export default SideBar;