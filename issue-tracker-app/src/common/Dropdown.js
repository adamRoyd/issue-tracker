import React from 'react';

class Dropdown extends React.Component{

    render(){
        return(
            <select className="form-control">
                {this.props.options.map((option, i) =>
                    <option key={i} value={option}>{option}</option>
                )}
            </select>
        );
    }
}

export default Dropdown;