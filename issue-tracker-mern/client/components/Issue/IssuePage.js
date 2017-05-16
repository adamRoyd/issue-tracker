import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import IssueList from './IssueList';
import SideBar from './SideBar';
import NavBar from '../Common/NavBar';
import IssueManager from '../Issue/IssueManager';

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
        <div id="issuePage" className="container-fluid">
          <NavBar {...this.props}/>
          <div className="row">
            <div id="sideBar">
                <SideBar projectCode={this.props.params.projectCode} {...this.props}/>
            </div>
            <div id="issuelist" className="col-sm-5">
                <IssueList {...this.props}/>
            </div>
            <div id="issueManager" className="col-sm-6">
                <IssueManager {...this.props}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
IssuePage.need = [() => { return fetchIssues(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    issues: getIssues(state)
  };
}

IssuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired
};

IssuePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(IssuePage);
