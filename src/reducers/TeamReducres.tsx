import { ITeams } from "../interfaces";

const initialStore:ITeams={
    team_a: {
        name: 'Team A',
        playres: [],
        id: Math.floor(Math.random() * 100),
        totalRun: 0,
        overs: [],
        isInningCompleted:false
    },
    team_b: {
        name: 'Team B',
        playres: [],
        id: Math.floor(Math.random() * 100),
        totalRun: 0,
        overs: [],
        isInningCompleted:false
    }
}

export const TeamReducers = (state: ITeams = initialStore, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SAVE_TEAM_INIT':
            return { ...state, ...action.payload };
            break;
        case 'UPDATE_TEAMS_INIT':
            return { ...state, ...action.payload };
            break;
        case 'SAVE_TEAM_SUCCESS':
            return { ...state, ...action.payload };
            break;
        default:
            return state;
            break;
    }
}