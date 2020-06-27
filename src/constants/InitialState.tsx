import { ITeams } from "../interfaces";

export const initialState: ITeams  = {
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
