import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import errorReducer from './error/error.reducer';

export default combineReducers({
  user: userReducer,
  error: errorReducer,
});
