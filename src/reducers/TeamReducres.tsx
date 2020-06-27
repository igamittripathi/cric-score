import { ITeams } from "../interfaces";
import { initialState } from "../constants";
import { UPDATE_TEAMS_INIT, SAVE_TEAM_SUCCESS, SAVE_TEAMS_INIT } from '../constants'

interface IinitialState {
    teams: ITeams;
    isLoading: boolean
}

export const TeamReducers = (state: ITeams = initialState, action: { type: string, payload?: any }) => {
    switch (action.type) {
        case SAVE_TEAMS_INIT:
            state = { ...state, ...action.payload };
            break;
        case UPDATE_TEAMS_INIT:
            state = { ...state, ...action.payload };
            break;
        case SAVE_TEAM_SUCCESS:
            state = { ...state, ...action.payload };
            break;
        default:
            break;
    }
    return state;
}