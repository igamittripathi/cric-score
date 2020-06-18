export type playerType = 'batsman' | 'bowler' | '';

export interface IPlayer {
    name: string;
    type: playerType;
    teamId:string;
}
