import * as types from '../actions/actionTypes';
import initialState from './initialState';

const AttachmentReducer = (state = initialState.attachments, action) => {
  switch (action.type) {
    case types.UPLOAD_FILE_SUCCESS:
        console.log('UPLOAD FILE SUCCESS REDUCER');
        console.log(action.filename);
        return [...state, action.filename];
    case types.ADD_ISSUE:
        return []
    default:
        return state;
  }
};

export const getAttachments = state => state.attachments;

export default AttachmentReducer;