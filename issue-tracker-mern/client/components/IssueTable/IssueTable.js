import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Issue from './Issue';
import Header from './Header';
import { Link, browserHistory } from 'react-router';
import * as IssueActions from '../../actions/IssueActions';
import { fetchComments } from '../../actions/CommentActions';
import { getVisibleIssues } from '../../reducers/IssueReducer';
import { getFilter } from '../../reducers/IssueFilterReducer';
import { getHeaders } from '../../reducers/HeaderReducer';


class IssueTable extends React.Component{
    componentDidMount(){  
        this.props.setIssueFilter(this.props.params.filter);
    }
    handleClick(i){
        const selectedIssue = this.props.issues[i];
        this.props.dispatch(fetchComments(this.props.params.projectCode,selectedIssue.id));
        browserHistory.push(`/${selectedIssue.project}/${this.props.area}/${this.props.filter}/${selectedIssue.id}`);
        this.props.setActiveIssue(selectedIssue);
    }
    headerClick(event){
        const name = event.target.id;
        if(name != "")
        this.props.sortIssues(header);
    }
    checkBoxClick(i){
        this.props.toggleCheckedIssue(this.props.issues[i]);
    }
    render(){
        return(
            <div className='issue-table container-fluid'>
                <div className='table-row header'>
                    <div className="column issue-select"/>
                    <div className="flexwrapper attributes">
                        <div className="flexwrapper title-identifier-location-category-type">
                            <div className="flexwrapper title-identifier">
                                <div id="Id" value="Id" onClick={this.headerClick} className="column id">Id</div>
                                <div id="Screen" className="column screen">Screen</div>
                                <div id="Project" className="column project">Project</div>
                            </div>
                            <div className="flexwrapper location-category-type">
                                <div id="Location" className="column location">Location</div>
                                <div id="Category" className="column category">Category</div>
                                <div id="Type" className="column type">Type</div>
                            </div>
                        </div>
                        <div className="flexwrapper description-assigned">
                            <div className="flexwrapper status-owner">
                                <div id="Description" className="column description">Description</div>
                                <div id="Assigned" className="column assigned">Assigned</div>
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
                        }/>)}
        </div>
        );
    }
}

IssueTable.propTypes = {
    issues : PropTypes.array.isRequired,
    filter : PropTypes.string.isRequired,
    setActiveIssue : PropTypes.func.isRequired,
    sortIssues : PropTypes.func.isRequired,
    setIssueFilter : PropTypes.func.isRequired,
    params : PropTypes.object.isRequired,
    headers : PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        issues: getVisibleIssues(state.issues,state.issueFilter,state.area),
        headers : getHeaders(state),
        filter: state.issueFilter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(IssueActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueTable);