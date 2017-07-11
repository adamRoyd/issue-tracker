import * as types from '../actions/actionTypes';
import initialState from './initialState';

const MessageReducer = (state = initialState.message, action) =>{
  switch (action.type) {
    case types.ADD_PROJECT_SUCCESS:
      return Object.assign({},state,{
          text: action.message,
          success: true
      });  
    case types.ADD_PROJECT_FAILURE:
      return Object.assign({},state,{
          text: action.message,
          success: false
      });  
    default:
      return Object.assign({},state,{
          text: ""
      });     
  }
}

export const getMessage = state => state.message;

export default MessageReducer;