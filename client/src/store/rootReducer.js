import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import errorReducer from './error/error.reducer';
import historyReducer from './history/history.reducer';

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  history: historyReducer,
});
