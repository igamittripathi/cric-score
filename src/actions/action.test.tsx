import * as actions from '.';
import { ITeams } from '../interfaces';
import { GET_TEAMS, SAVE_TEAMS_INIT, UPDATE_TEAMS_INIT, SAVE_TEAM_SUCCESS } from '../constants'



describe('ACTIONS', () => {
    const payload: ITeams  = {
        team_a: {
            name: 'India',
            playres: [],
            id: Math.floor(Math.random() * 100),
            totalRun: 0,
            overs: [],
            isInningCompleted: false
        },
        team_b: {
            name: 'England',
            playres: [],
            id: Math.floor(Math.random() * 100),
            totalRun: 0,
            overs: [],
            isInningCompleted: false
        } 
    }
    test('should create an action with GET_TEAMS type', () => {
        const expectedAction = {
            type: GET_TEAMS
        }
        expect(actions.GetTeams()).toEqual(expectedAction)
    });

    test('should create an action with SAVE_TEAMS_INIT type', () => {
        const expectedAction = {
            type: SAVE_TEAMS_INIT,
            payload
        }
        expect(actions.SaveTeams(payload)).toEqual(expectedAction)
    })

    test('should create an action with UPDATE_TEAMS_INIT type', () => {
        const expectedAction = {
            type: UPDATE_TEAMS_INIT,
            payload
        }
        expect(actions.UpdateTeams(payload)).toEqual(expectedAction)
    })

    test('should create an action with SAVE_TEAM_SUCCESS type', () => {
        const expectedAction = {
            type: SAVE_TEAM_SUCCESS,
            payload
        }
        expect(actions.SucessResponse(payload)).toEqual(expectedAction)
    })
})