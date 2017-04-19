import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setIssueFilter } from '../actions/actionCreators';
import Link from '../components/Link';


const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.filter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      browserHistory.push(`/${ownProps.value}/issue/`);
      dispatch(setIssueFilter(ownProps.value));
    }
  };
};

const FilterLink = connect(mapStateToProps,mapDispatchToProps)(Link);


export default FilterLink;