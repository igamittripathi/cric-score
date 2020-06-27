import { ITeams } from "../interfaces";
import { GET_TEAMS, SAVE_TEAMS_INIT, UPDATE_TEAMS_INIT, SAVE_TEAM_SUCCESS } from '../constants'

export function GetTeams() {
    return {
        type: GET_TEAMS
    }
}

export function SaveTeams(payload: ITeams): { type: string, payload: ITeams } {
    return {
        type: SAVE_TEAMS_INIT,
        payload
    }
}

export function UpdateTeams(payload: ITeams): { type: string, payload: ITeams } {
    return {
        type: UPDATE_TEAMS_INIT,
        payload
    }
}


export const SucessResponse = (payload: any): { type: string, payload: any } => {
    return {
        type: SAVE_TEAM_SUCCESS,
        payload
    }
}
