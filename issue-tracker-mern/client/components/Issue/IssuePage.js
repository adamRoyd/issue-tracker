import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components


// Import Actions
import { fetchIssues } from '../../actions/IssueActions';

// Import Selectors
import { getIssues } from '../../reducers/IssueReducer';


class IssuePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchIssues());
  }

  render() {
    return (
      <div>
        <h1>Issue page</h1>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
IssuePage.need = [() => { return fetchIssues(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    issues: getIssues(state),
  };
}

IssuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

IssuePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(IssuePage);
