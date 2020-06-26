import { BowlResultType } from '../constants';
export type playerType = 'batsman' | 'bowler' | '';
export type status = 'Out'|'Not Out';

export interface IBowlerOver {
    overNumber:number;
    noBowls?:number;
    wideBowls?:number;
    totalRun?:number;
    boundryFour?:number;
    boundrySix?:number;
    wicketFall?:number;
    bowlResult?:BowlResultType[],
}

export interface IOver extends IBowlerOver {
    bowlerName:string;
}

export interface IPlayer {
    name: string;
    isRequired:boolean;
    isError:boolean;
    type: playerType;
    teamId:string;
    totalRun?:number;
    numberOfWickets?:number;
    boundryFour?:number;
    boundrySix?:number;
    status?: status;
    bowlPlayed?:number;
    batingOrder?:number; 
    hasStrike?:boolean; 
    overs:IBowlerOver[];
    wickets?:number;
    strikeRate?:number|string;
    economy?:number|string;
    noBowls?:number;
    wideBowls?:number;
}
