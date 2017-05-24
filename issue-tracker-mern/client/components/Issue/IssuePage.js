import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import IssueList from './IssueList';
import SideBar from './SideBar';
import NavBar from '../Common/NavBar';
import IssueManager from '../Issue/IssueManager';
//Import constants
import categories from '../../constants/categories';
import locations from '../../constants/locations';
import status from '../../constants/status';
// Import Actions
import { fetchIssues } from '../../actions/IssueActions';
import { fetchAssignees } from '../../actions/AssigneeActions';
// Import Selectors
import { getIssues } from '../../reducers/IssueReducer';
import { getBatchIssues } from '../../reducers/IssueReducer';


class IssuePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchIssues(this.props.params.projectCode));
    this.props.dispatch(fetchAssignees());
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
                {this.props.params.id ? 
                  <IssueManager {...this.props}/>
                  : 
                  null
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
IssuePage.need = [() => { return fetchIssues(this.props.params.projectCode); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    issues: getIssues(state),
    status: status,
    locations : locations,
    categories : categories,
    batchIssues: getBatchIssues(state)
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
