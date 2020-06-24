import { ITeams } from "../interfaces"

export function GetTeams(){
    return {
        type: "GET_TEAMS"
    }
}

export function SaveTeams(payload: ITeams): { type: string, payload: ITeams } {
    return {
        type: "SAVE_TEAMS_INIT",
        payload
    }
}

export function UpdateTeams(payload: ITeams): { type: string, payload: ITeams } {
    return {
        type: "UPDATE_TEAMS_INIT",
        payload
    }
}


export const PostSaveTeam = (payload: any): { type: string, payload: any } => {
    return {
        type: "SAVE_TEAM_SUCCESS",
        payload
    }
}


