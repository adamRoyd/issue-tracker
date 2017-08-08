import * as types from '../actions/actionTypes';
import initialState from './initialState';

const MessageReducer = (state = initialState.message, action) =>{
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({},state,{
          isFetching: true,
          text: ""
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({},state,{
          isFetching: false
      });
    case types.LOGIN_FAILURE:
      return Object.assign({},state,{
          isFetching: false
      });
    case types.REQUEST_PROJECT:
      return Object.assign({},state,{
          isFetching: true,
          text: ""
      });
    case types.ADD_PROJECT_SUCCESS:
      return Object.assign({},state,{
          text: action.message,
          success: true,
          isFetching: false
      });  
    case types.ADD_PROJECT_FAILURE:
      return Object.assign({},state,{
          text: action.message,
          success: false,
          isFetching: false
      }); 
    case types.FETCH_ADD_USER:
      return Object.assign({},state,{
          isFetching: true,
          text: ""
      });
    case types.ADD_USER_SUCCESS:
      return Object.assign({},state,{
          text: action.message,
          success: true,
          isFetching: false
      });  
    case types.ADD_USER_FAILURE:
      return Object.assign({},state,{
          text: action.message,
          success: false,
          isFetching: false
      });
    case types.GLOBAL_FETCHING:
      return Object.assign({},state,{
          isFetching: true
      });
    case types.ADD_ISSUES:
      return Object.assign({},state,{
          isFetching: false
      });
    case types.ADD_COMMENTS:
      return Object.assign({},state,{
          isFetching: false
      });
    default:
      return Object.assign({},state,{
          text: ""
      });     
  }
}

export const getMessage = state => state.message;

export default MessageReducer;