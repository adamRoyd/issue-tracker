import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

class CustomMenu extends React.Component {
  handleClick(value){
    const projectCode = value.toLowerCase();
    this.props.toggleDropdown();
    browserHistory.push(`/${projectCode}/issue/All/`);
    //TO DO load issues
  }
  render() {
    this.handleClick = this.handleClick.bind(this);
    return (
      <div className="dropdown-menu">
        <input
          type="text"
          placeholder="Find a project..."
          onChange={this.props.searchProjects}
        />
        <div className="project-list">
          <ul className="list-group">
            {this.props.listValues.map((value, i) =>
              <button type="button" className="list-group-item" key={i} onClick={() => this.handleClick(value)}>{value}</button>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

CustomMenu.propTypes = {
  searchProjects : PropTypes.func.isRequired,
  listValues : PropTypes.array.isRequired,
  toggleDropdown : PropTypes.func.isRequired
};

export default CustomMenu;