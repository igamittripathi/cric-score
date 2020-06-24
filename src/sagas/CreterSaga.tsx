import { put, take, takeEvery, all, delay, call } from 'redux-saga/effects';
import { saveTeamDetails,setTeamDetails,getTeamDetails } from '../services';
import { PostSaveTeam } from '../actions';

function* getTeamData() {
  const res = yield call(getTeamDetails)
  if (res) {
    yield put(PostSaveTeam({ ...res }))
  }
}

function* getTeams(){
  yield takeEvery('GET_TEAMS',getTeamData)
} 


function* saveTeamsData(action: any) {
  const { payload } = action;
  const res = yield call(saveTeamDetails, payload)
  if (res) {
    localStorage.setItem('id',res.name);
    yield put(PostSaveTeam({ ...action.payload, ...res }))
  }
}


function* saveTeams() {
  yield takeEvery("SAVE_TEAMS_INIT", saveTeamsData)
}


function* updateTeamsData(action: any) {
  const { payload } = action;
  const res = yield call(setTeamDetails, payload)
  if (res) {
    yield put(PostSaveTeam({ ...action.payload, ...res }))
  }
}

function* updateTeams(){
  yield takeEvery('UPDATE_TEAMS_INIT',updateTeamsData)
} 

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([
    getTeams(),
    saveTeams(),
    updateTeams()
  ])
}
