import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ModalReducer = (state = initialState.modal, action) =>{
  switch (action.type) {
    case types.OPEN_MODAL:
        return action.modal
    case types.CLOSE_MODAL:
        return ""
    case types.ADD_USER_SUCCESS:
        return "adduser"
    case types.ADD_USER_FAILURE:
        return "adduser"
    case types.ADD_PROJECT_FAILURE:
        return "addproject"
    case types.ADD_PROJECT_SUCCESS:
        return "addproject"
    default:
        return initialState.modal;     
  }
}

export default ModalReducer;