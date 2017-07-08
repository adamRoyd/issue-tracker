import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../reducers/UserReducer';
//Import constants
import categories from '../../constants/categories';
import locations from '../../constants/locations';
// Import Components
import Helmet from 'react-helmet';
import DevTools from './DevTools';
import NavBar from '../Common/NavBar';
import NavBarPhone from '../Common/NavBarPhone'
import { fetchUser } from '../../actions/UserActions';
//Import Selectors
import { getBatchIssues } from '../../reducers/IssueReducer';
import { getArea } from '../../reducers/AreaReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.props.dispatch(fetchUser());
    console.log('MOUNTING!');
    this.setState({isMounted: true}); // eslint-disable-line
  }


  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        <NavBar {...this.props}/>
        <NavBarPhone {...this.props}/>
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

function mapStateToProps(state) {
  return {
    username : getUser(state).username,
    locations : locations,
    categories : categories,
    batchIssues: getBatchIssues(state),
    area: getArea(state)
  };
}

export default connect(mapStateToProps)(App);
