import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ModalReducer = (state = initialState.modal, action) => {
    switch (action.type) {
        case types.OPEN_MODAL:
            return action.modal;
        case types.CLOSE_MODAL:
            return '';
        case types.REQUEST_PROJECT:
            return 'addproject';
        case types.FETCH_ADD_USER:
        case types.ADD_USER_SUCCESS:
        case types.ADD_USER_FAILURE:
        case types.ADD_PROJECT_FAILURE:
        case types.ADD_PROJECT_SUCCESS:
            return 'addproject';
        case types.RESET_PASSWORD_FAIL:
        case types.RESET_PASSWORD_SUCCESS:
            return 'forgotpassword';
        case types.UPLOAD_FILE_SUCCESS:
            return 'newIssue';
        default:
            return initialState.modal;
    }
};

export default ModalReducer;
