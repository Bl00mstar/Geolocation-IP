import { all } from 'redux-saga/effects';
import { watchHomeLoading } from './user/user.sagas';

export default function* rootSaga() {
  yield all([watchHomeLoading()]);
}
