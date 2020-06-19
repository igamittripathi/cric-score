import { put, take, takeEvery, all, delay, call } from 'redux-saga/effects';
import { saveTeamDetails } from '../services';
import { PostSaveTeam } from '../actions';

function* saveTeamsData(action: any) {
  const { payload } = action;
  const res = yield call(saveTeamDetails, payload)
  if (res) {
    yield put(PostSaveTeam({ ...action.payload, ...res }))
  }
  console.log(res);
}

function* saveTeams() {
  yield takeEvery("SAVE_TEAMS_INIT", saveTeamsData)
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([
    saveTeams()
  ])
}
