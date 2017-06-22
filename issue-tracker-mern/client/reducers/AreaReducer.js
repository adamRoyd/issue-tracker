import * as types from '../actions/actionTypes';
import initialState from './initialState';

const AreaReducer = (state = initialState.area, action) => {
  switch (action.type) {
    case types.TOGGLE_AREA:
      return (state == 'internal') ? 'client' : 'internal';
    default:
      return state;
  }
};

export const getStatus = (state, status) => {
    return status.filter((pot) => pot.area == state.area);
};

export const getArea = state => state.area;

export default AreaReducer;