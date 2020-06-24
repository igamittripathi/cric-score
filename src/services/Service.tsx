import { ITeams } from "../interfaces";

const url:string=`https://cric-score-ad64d.firebaseio.com/`;

export const getTeamDetails = () => {
    const id = localStorage.getItem('id')
    return fetch(`${url}teams/${id}/.json`)
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch(ex => {
            console.log(ex)
        })
}

export const setTeamDetails = (payload: ITeams) => {
    const id = localStorage.getItem('id')
    if (id) {
        return fetch(`${url}teams/${id}/.json`, {
            method: 'PATCH',
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                return res;
            })
            .catch(ex => {
                console.log(ex)
            })
    }
}

export const saveTeamDetails = (payload: ITeams): Promise<{ name: string }> => {
    return fetch(`${url}/teams.json`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .catch(ex => {
            console.log(ex)
        })
}
