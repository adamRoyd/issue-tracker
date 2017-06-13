import * as types from '../actions/actionTypes';
import initialState from './initialState';

const AttachmentReducer = (state = initialState.attachments, action) => {
  switch (action.type) {
    case types.UPLOAD_FILE_SUCCESS:
        return [...state, action.file];
    default:
        return state;
  }
};

export const getAttachments = state => state.attachments;

export default AttachmentReducer;