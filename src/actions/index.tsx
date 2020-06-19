export function SaveTeams(payload: any):any {
    return {
        type: "SAVE_TEAMS_INIT",
        payload
    }
}


export const PostSaveTeam = (payload:any)=>{
    return{
        type:"SAVE_TEAM_SUCCESS",
        payload
    }
}