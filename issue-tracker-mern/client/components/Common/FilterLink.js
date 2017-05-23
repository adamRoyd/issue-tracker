import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setIssueFilter } from '../../actions/IssueActions';
import Link from './Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.value === state.issueFilter,
    issues: state.issues
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      browserHistory.push(`/${ownProps.projectCode}/issues/${ownProps.value.toLowerCase().replace(/ /g,'')}/`);
      dispatch(setIssueFilter(ownProps.value));
    }
  };
};

const FilterLink = connect(mapStateToProps,mapDispatchToProps)(Link);


export default FilterLink;