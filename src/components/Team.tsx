import * as React from 'react';
import { Textbox } from './Textbox';
import { Player } from './Player';
import { ITeam, IPlayer } from '../interfaces';

interface ITeamProps {
    onTeamNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, team: ITeam) => void;
    onNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, idx: number, team: ITeam) => void;
    onPlayerTypeChangeHandler: (e: React.ChangeEvent<{ value: unknown }>, idx: number, team: ITeam) => void;
    team: ITeam;
    playerTypes: Array<string | number>;
}

export const Team = ({ onTeamNameChangeHandler, onNameChangeHandler, onPlayerTypeChangeHandler, team, playerTypes }: ITeamProps) => {
    return (
        <div>
            <Textbox onChange={(e) => onTeamNameChangeHandler(e, team)} value={team.name} placeholder="Team Name" />
            {team.playres.map((item: IPlayer, idx: number) => {
                return (<div key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {idx + 1} <Player options={playerTypes}
                        onNameChange={(e: any) => { onNameChangeHandler(e, idx, team) }}
                        name={item.name}
                        onPlayerTypeChange={(e: any) => { onPlayerTypeChangeHandler(e, idx, team) }}
                        type={item.type} />
                </div>)
            })}
        </div>
    )
}
