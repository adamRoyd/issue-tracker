import React from 'react';
import ReactDOM from 'react-dom';

class CustomMenu extends React.Component {
  render() {
    return (
      <div className="dropdown-menu" style={{ padding: '' }}>
        <input
          type="text"
          placeholder="Type to filter..."
          onChange={this.props.searchProjects}
        />
        <ul className="list-unstyled">
          {this.props.visibleprojects.map((project, i) =>
            <li key={i}>{project}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default CustomMenu;