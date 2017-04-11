import React from 'react';
import FilterLink from '../containers/FilterLink';

class SideBar extends React.Component{
    render(){
        return(
            <div>
                <h3>Nav</h3>
                {this.props.status.map((value,i) => <FilterLink key={i} value={value}/>)}
                
            </div>
        );
    }
}

            // <a href="#" id="SHOW_ALL" ref="all" onClick={this.filterPots}>All</a>
            // <a href="#" id="SHOW_NEW" ref="new" onClick={this.filterPots}>New</a>


export default SideBar;