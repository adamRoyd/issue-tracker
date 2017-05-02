import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setIssueFilter } from '../actions/issueActions';
import Link from '../components/common/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.value === state.filter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      browserHistory.push(`/${ownProps.projectCode}/issue/${ownProps.value}/`);
      dispatch(setIssueFilter(ownProps.value));
    }
  };
};

const FilterLink = connect(mapStateToProps,mapDispatchToProps)(Link);


export default FilterLink;