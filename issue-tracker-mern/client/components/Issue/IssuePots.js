import React from 'react';
import PropTypes from 'prop-types';
import FilterLink from '../Common/FilterLink';

class IssuePots extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                {this.props.status.map((pot,i) => <FilterLink projectCode={this.props.projectCode} key={i} name={pot.name} filter={pot.filter}/>)}
            </div>
        );
    }
}

IssuePots.propTypes = {
    status : PropTypes.array.isRequired,
    projectCode : PropTypes.string.isRequired
};

export default IssuePots;