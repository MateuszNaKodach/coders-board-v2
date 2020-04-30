import { all } from 'redux-saga/effects';
import { counterSagaWatcher } from './counter';

export function* rootSaga() {
  yield all([counterSagaWatcher()]);
}
