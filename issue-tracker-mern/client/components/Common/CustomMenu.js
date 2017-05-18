import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

class CustomMenu extends React.Component {
  render() {
    return (
      <div className="dropdown-menu">
        <input
          type="text"
          placeholder="Find a project..."
          onChange={this.props.searchProjects}
        />
        <div className="project-list">
          <ul className="list-group">
            {this.props.listValues.map((object, i) =>
              <button type="button" className="list-group-item" key={i} onClick={() => this.props.handleClick(object.projectCode)}>{object.projectCode}</button>
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