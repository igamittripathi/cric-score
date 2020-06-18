import { put, take, takeEvery, all, delay, call } from 'redux-saga/effects';
import { saveTeamDetails } from '../services';


function* saveTeamsData(action: any) {
  debugger
  const { payload } = action;
  yield call(saveTeamDetails,payload)
}

function* saveTeams() {
  debugger
  yield takeEvery("SAVE_TEAMS", saveTeamsData)
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
  debugger
  yield all([
    saveTeams()
  ])
}
