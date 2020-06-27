import { put, takeLatest } from 'redux-saga/effects';
import {
    updateTeams, updateTeamsData, saveTeams, saveTeamsData,
    getTeams, getTeamData
} from './CreterSaga';
import { SucessResponse } from '../actions';
import { initialState } from '../constants';


describe('SAGAS', () => {

    test('should dispatch action "UPDATE_TEAMS_INIT" ', () => {
        const generator = updateTeams();
        expect(generator.next().value)
            .toEqual(takeLatest('UPDATE_TEAMS_INIT', updateTeamsData));
        expect(generator.next().done).toBeTruthy();
    });

    test('should dispatch action "UPDATE_TEAMS_INIT" with result from API', () => {
        const mockResponse = {type:'UPDATE_TEAMS_INIT',payload:initialState};
        const generator = updateTeamsData(mockResponse);
        generator.next();
        expect(generator.next(mockResponse).value)
            .toMatchObject(put(SucessResponse(mockResponse.payload)))
        expect(generator.next().done).toBeTruthy();
    })

    test('should dispatch action "GET_TEAMS" ', () => {
        const generator = getTeams();
        expect(generator.next().value)
            .toEqual(takeLatest('GET_TEAMS', getTeamData));
        expect(generator.next().done).toBeTruthy();
    });

    test('should dispatch action "GET_TEAMS" with result from fetch API', () => {
        const mockResponse = initialState;
        const generator = getTeamData();
        generator.next();
        expect(generator.next(mockResponse).value)
            .toEqual(put(SucessResponse(mockResponse)))
        expect(generator.next().done).toBeTruthy();
    })

    test('should dispatch action "SAVE_TEAMS_INIT" ', () => {
        const generator = saveTeams();
        expect(generator.next().value)
            .toEqual(takeLatest('SAVE_TEAMS_INIT', saveTeamsData));
        expect(generator.next().done).toBeTruthy();
    });

    test('should dispatch action "SAVE_TEAMS_INIT" with result from API', () => {
        const mockResponse = {type:'SAVE_TEAMS_INIT',payload:initialState};
        const generator = saveTeamsData(mockResponse);
        generator.next();
        expect(generator.next(mockResponse).value)
            .toMatchObject(put(SucessResponse(mockResponse.payload)))
        expect(generator.next().done).toBeTruthy();
    })
})
