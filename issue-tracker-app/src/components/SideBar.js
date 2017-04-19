import React, {PropTypes} from 'react';
import FilterLink from '../containers/FilterLink';
import TrophyImage from '../assets/trophyImage';

class SideBar extends React.Component{
    render(){
        return(
            <div>
                <TrophyImage height="50" width="50" imageCssClass="trophy"/>
                <h3>Nav</h3>
                {this.props.status.map((value,i) => <FilterLink key={i} value={value}/>)}
                
            </div>
        );
    }
}

SideBar.propTypes = {
    status : PropTypes.array.isRequired
};

export default SideBar;