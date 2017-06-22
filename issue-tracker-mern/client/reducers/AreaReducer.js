import * as types from '../actions/actionTypes';
import initialState from './initialState';

const AreaReducer = (state = initialState.area, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const getStatus = (state, status) => {
    return status.filter((pot) => pot.area == state.area);
};

export default AreaReducer;