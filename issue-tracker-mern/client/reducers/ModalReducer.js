import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ModalReducer = (state = initialState.modal, action) =>{
  switch (action.type) {
    case types.OPEN_MODAL:
        return action.modal
    case types.CLOSE_MODAL:
        return ""
    default:
        return initialState.modal;     
  }
}

export default ModalReducer;