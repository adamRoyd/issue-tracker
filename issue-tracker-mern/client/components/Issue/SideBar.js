import React from 'react';
import PropTypes from 'prop-types';
import FilterLink from '../common/FilterLink';
import status from '../../constants/status';

class SideBar extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                {status.map((value,i) => <FilterLink projectCode={this.props.projectCode} key={i} value={value}/>)}
            </div>
        );
    }
}

SideBar.propTypes = {
    status : PropTypes.array.isRequired,
    projectCode : PropTypes.string.isRequired
};

export default SideBar;