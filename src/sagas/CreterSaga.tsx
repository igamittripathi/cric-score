import { put,  all, call, takeLatest } from 'redux-saga/effects';
import { saveTeamDetails,setTeamDetails,getTeamDetails } from '../services';
import { SucessResponse } from '../actions';
import { ITeams } from '../interfaces';

export function* getTeamData() {
  const res = yield call(getTeamDetails)
  if (res) {
    yield put(SucessResponse({ ...res }))
  }
}

export function* getTeams(){
  yield takeLatest('GET_TEAMS',getTeamData)
} 


export function* saveTeamsData(action: {type:string,payload:ITeams}) {
  const { payload } = action;
  const res = yield call(saveTeamDetails, payload)
  if (res) {
    localStorage.setItem('id',res.name);
    yield put(SucessResponse({ ...action.payload, ...res }))
  }
}


export function* saveTeams() {
  yield takeLatest("SAVE_TEAMS_INIT", saveTeamsData)
}


export function* updateTeamsData(action: {type:string,payload:ITeams}) {
  const { payload } = action;
  const res = yield call(setTeamDetails, payload)
  if (res) {
    yield put(SucessResponse({ ...action.payload }))
  }
}

export function* updateTeams(){
  yield takeLatest('UPDATE_TEAMS_INIT',updateTeamsData)
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
