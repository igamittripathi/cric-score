import { IPlayer } from './IPlayer';

export interface ITeam {
    name: string;
    playres: IPlayer[];
    id:string|number
}

export interface ITeams {
    team_a:ITeam,
    team_b:ITeam
}

