import { combineReducers } from 'redux';
import {TeamReducers } from './TeamReducres'

export const rootReducer =  combineReducers({
    teams:TeamReducers,
})
export type RootState = ReturnType<typeof rootReducer>;