import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/UserReducer';

// Import Style
//import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './DevTools';

// Import Actions

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    username : getUser(state).username,
    isAuthenticated: getUser(state).isAuthenticated
  };
}

export default connect(mapStateToProps)(App);
