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
import styles from './IssueTable.css'


class IssueList extends React.Component{
    componentDidMount(){  
        this.props.setIssueFilter(this.props.params.filter);
    }
    handleClick(i){
        const selectedIssue = this.props.issues[i];
        this.props.dispatch(fetchComments(this.props.params.projectCode,selectedIssue.id));
        browserHistory.push(`/${this.props.params.projectCode}/${this.props.area}/${this.props.filter}/${selectedIssue.id}`);
        this.props.setActiveIssue(selectedIssue);
    }
    headerClick(header){
        if(header.name != "")
        this.props.sortIssues(header);
    }
    checkBoxClick(i){
        this.props.toggleCheckedIssue(this.props.issues[i]);
    }
    render(){
        return(
            <div className={styles.issuelist}>
                 <table className={styles.issueTable}> {/*className={"issueTable table table-fixed table-hover"} */}
                    <thead>
                    <tr>
                        {this.props.headers.map((header,i) => <Header key={i} header={header} onClick={() => this.headerClick(header)}/>)}
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.issues.map((issue, i) => 
                            <Issue 
                                {...this.props} 
                                key={i} 
                                issue={issue} 
                                onClick={() => this.handleClick(i)} 
                                checkBoxClick={() => this.checkBoxClick(i)
                                }/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

IssueList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);