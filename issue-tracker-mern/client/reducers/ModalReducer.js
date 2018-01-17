import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ModalReducer = (state = initialState.modal, action) =>{
  switch (action.type) {
    case types.OPEN_MODAL:
        console.log("open modal", action.modal);
        return action.modal
    case types.CLOSE_MODAL:
        return ""
    case types.FETCH_ADD_USER:
        return "adduser"
    case types.ADD_USER_SUCCESS:
        return "adduser"
    case types.ADD_USER_FAILURE:
        return "adduser"
    case types.REQUEST_PROJECT:
        return "addproject"
    case types.ADD_PROJECT_FAILURE:
        return "addproject"
    case types.ADD_PROJECT_SUCCESS:
        return "addproject"
    case types.UPLOAD_FILE_SUCCESS:
        return "newIssue"
    default:
        console.log(action.type);
        return initialState.modal;     
  }
}

export default ModalReducer;