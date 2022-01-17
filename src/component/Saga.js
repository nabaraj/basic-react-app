function fetchCall() {}

function* asyncevent() {
  let response = yield put('SUBMITACTION');
}
export function* watcherMethod() {
  yield takeLatest('ACTION_TYPE', asyncevent);
}
