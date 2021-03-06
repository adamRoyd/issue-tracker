import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';

// Import Components
import IssueTable from '../IssueTable/IssueTable';
import IssuePots from '../Sidebar/IssuePots';
import EditIssuePage from '../Issue/EditIssuePage';
import NewIssuePage from '../Issue/NewIssuePage';
import Spinner from '../Common/Spinner';
// Import constants
import categories from '../../constants/categories';
import locations from '../../constants/locations';
import status from '../../constants/status';
// Import Actions
import { fetchIssues, setIssueFilter } from '../../actions/IssueActions';
import { fetchAssignees } from '../../actions/AssigneeActions';
import { fetchProjects } from '../../actions/ProjectActions';
import { fetchComments } from '../../actions/CommentActions';
// Import Selectors
import { getIssues } from '../../reducers/IssueReducer';
import { getBatchIssues } from '../../reducers/IssueReducer';
import { getUser } from '../../reducers/UserReducer';
import { getProjects } from '../../reducers/ProjectReducer';
import { getStatus, getArea } from '../../reducers/AreaReducer';
import { getMessage } from '../../reducers/MessageReducer';

class IssuePage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchIssues(this.props.params.projectCode));
        this.props.dispatch(setIssueFilter(this.props.params.filter));
        this.props.dispatch(fetchAssignees());
        this.props.dispatch(fetchProjects());
        if (this.props.params.id) this.props.dispatch(fetchComments(this.props.params.projectCode, this.props.params.id));
    }
    render() {
        const containerStyle = this.props.params.area == 'new' ? 'hidden' : '';
        return (
            <div>
                {(this.props.isFetching) ?
                    <Spinner visible={this.props.isFetching} />
                    :
                    <div>
                        <NewIssuePage {...this.props} />
                        <IssuePots projectCode={this.props.params.projectCode} {...this.props} />
                        <SplitPane className={containerStyle} split="vertical" defaultSize="800px" minSize="100px" primary="first">
                            <IssueTable {...this.props} />
                            {this.props.params.id &&
                                <EditIssuePage {...this.props} />
                            }
                        </SplitPane>
                    </div>
                }
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        issues: getIssues(state),
        status: getStatus(state, status),
        locations,
        categories,
        batchIssues: getBatchIssues(state),
        username: getUser(state).username,
        usertype: getUser(state).usertype,
        projects: getProjects(state),
        area: getArea(state),
        isFetching: getMessage(state).isFetching,
    };
}

IssuePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    issues: PropTypes.array.isRequired,
};

IssuePage.contextTypes = {
    router: React.PropTypes.object,
};

export default connect(mapStateToProps)(IssuePage);
