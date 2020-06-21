import { IPlayer, IOver } from './IPlayer';
import { BowlResultType } from '../constants';

export interface ITeam {
    name: string;
    playres: IPlayer[];
    id:string|number;
    totalRun?:number;
    boundryFour?:number;
    boundrySix?:number;
    wicketFall?:number;
    overs?: IOver[],
    noBowls?:number;
    wideBowls?:number;
    extraRun?:number;
}

export interface ITeams {
    team_a:ITeam,
    team_b:ITeam,
    batingTeam?:string;
    bowlingTeam?:string;
}
