import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setIssueFilter } from '../../actions/IssueActions';
import { getVisibleIssues } from '../../reducers/IssueReducer';
import Link from './Link';

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.issueFilter,
        issues: state.issues,
        numberOfIssues: getVisibleIssues(state.issues, ownProps.filter, state.area).length,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            browserHistory.push(`/${ownProps.projectCode}/${ownProps.area}/${ownProps.filter}`);
            dispatch(setIssueFilter(ownProps.filter));
        },
    };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);


export default FilterLink;
