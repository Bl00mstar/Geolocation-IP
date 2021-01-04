import * as api from './user.helpers';
import * as error from '../error/error.actions';
import * as user from './user.actions';
import userTypes from './user.types';
import { put, takeEvery } from 'redux-saga/effects';

export function* watchHomeLoading() {
  yield takeEvery(userTypes.DATA_LOADING, fetchClientData);
}

function* fetchClientData() {
  yield put(error.clearError());
  try {
    const response = yield api.handleRequest('POST', '/api/current_ip', {
      type: 'custom',
    });
    if (response.status === 200) {
    } else if (response.status === 211) {
      yield put(error.setError(response.data.msg));
      yield put(user.requestDataError());
    } else {
      console.log(response);
    }
  } catch (err) {
    if (err.status === 404) {
      yield put(error.setError('Cannot connect to API server'));
      yield put(user.requestDataError());
    } else {
      console.log(err);
    }
  }
}
