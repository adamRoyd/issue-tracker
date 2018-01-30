import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Issue from './Issue';
//import headers from '../../constants/headers';
import { Link, browserHistory } from 'react-router';
import * as IssueActions from '../../actions/IssueActions';
import { fetchComments } from '../../actions/CommentActions';
import { getVisibleIssues } from '../../reducers/IssueReducer';
import { getFilter } from '../../reducers/IssueFilterReducer';
import { getHeaders } from '../../reducers/HeaderReducer';


class IssueTable extends React.Component {
    constructor(props){
        super(props)
        this.checkBoxClick = this.checkBoxClick.bind(this);
        this.headerClick = this.headerClick.bind(this);
        this.resolveFilterClass = this.resolveFilterClass.bind(this);
    }
    componentDidMount() {
        this.props.setIssueFilter(this.props.params.filter);
    }
    handleClick(i) {
        const selectedIssue = this.props.issues[i];
        this.props.dispatch(fetchComments(this.props.params.projectCode, selectedIssue.id));
        browserHistory.push(`/${selectedIssue.project}/${this.props.area}/${this.props.filter}/${selectedIssue.id}`);
        this.props.setActiveIssue(selectedIssue);
    }
    headerClick(event) {
        const name = event.target.id;
        console.log("header click", name);
        if (name != "")
            this.props.sortIssues(name);
    }
    checkBoxClick(i) {
        this.props.toggleCheckedIssue(this.props.issues[i]);
    }
    resolveFilterClass(filter){
        console.log("resolve filter class");
        return (filter == 0) ? 'glyphicon glyphicon-minus white' : ((filter == 1) ? "glyphicon glyphicon-menu-down" : "glyphicon glyphicon-menu-up")
    }
    render() {
        const headers = this.props.headers;
        console.log("Id Filter", headers[0].filter);
        return (
            <div className='issue-table container-fluid'>
                <div className='table-row header'>
                    <div className="column issue-select" />
                    <div className="flexwrapper attributes">
                        <div className="flexwrapper title-identifier-location-category-type">
                            <div className="flexwrapper title-identifier">
                                <div id="Id" onClick={this.headerClick} className="column id">
                                    {headers[0].name}
                                    <span className={this.resolveFilterClass(headers[0].filter)}/> 
                                </div>
                                <div id="Screen" onClick={this.headerClick} className="column screen">
                                    {headers[1].name}
                                    <span className={this.resolveFilterClass(headers[1].filter)}/> 
                                </div>
                                <div id="Project" onClick={this.headerClick} className="column project">Project</div>
                            </div>
                            <div className="flexwrapper location-category-type">
                                <div id="Location" onClick={this.headerClick} className="column location">Location</div>
                                <div id="Category" onClick={this.headerClick} className="column category">Category</div>
                                <div id="Type" onClick={this.headerClick} className="column type">Type</div>
                            </div>
                        </div>
                        <div className="flexwrapper description-assigned">
                            <div className="flexwrapper status-owner">
                                <div id="Description" onClick={this.headerClick} className="column description">Description</div>
                                <div id="Assigned" onClick={this.headerClick} className="column assigned">Assigned</div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.issues.map((issue, i) =>
                    <Issue
                        {...this.props}
                        key={i}
                        issue={issue}
                        onClick={() => this.handleClick(i)}
                        checkBoxClick={() => this.checkBoxClick(i)
                        } />)}
            </div>
        );
    }
}

IssueTable.propTypes = {
    issues: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    setActiveIssue: PropTypes.func.isRequired,
    sortIssues: PropTypes.func.isRequired,
    setIssueFilter: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        issues: getVisibleIssues(state.issues, state.issueFilter, state.area),
        headers: getHeaders(state),
        filter: state.issueFilter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(IssueActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueTable);