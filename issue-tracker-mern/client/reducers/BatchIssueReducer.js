import * as types from '../actions/actionTypes';
import initialState from './initialState';

const BatchIssueReducer = (state = initialState.batchIssues, action) =>{
  switch (action.type) {
    case types.ADD_ISSUE_TO_BATCH:
        return [
            ...state,
            action.id
        ]
    case types.REMOVE_ISSUE_FROM_BATCH:
        return state.filter(item => item !== action.id);
    default:
      return state;
  }
}

/* Selectors */
export const getBatchIssues = state => state.batchIssues;

export default BatchIssueReducer;