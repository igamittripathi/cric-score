import * as React from 'react';
import { Textbox } from './Textbox';
import { Player } from './Player';
import { ITeam, IPlayer } from '../interfaces';

interface ITeamProps {
    onTeamNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, team: ITeam) => void;
    onNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, idx: number, team: ITeam) => void;
    onPlayerTypeChangeHandler: (e: React.ChangeEvent<{ value: unknown }>, idx: number, team: ITeam) => void;
    onNameFocus?: (event: React.FocusEvent<HTMLInputElement>,idx: number, team: ITeam) => void;
    onNameBlur?: (event: React.FocusEvent<HTMLInputElement>,idx: number, team: ITeam) => void;
    team: ITeam;
    playerTypes: Array<string | number>;
}

export const Team:React.FC<ITeamProps> = (
    { onTeamNameChangeHandler, onNameChangeHandler, onPlayerTypeChangeHandler,onNameBlur,onNameFocus, team, playerTypes }) => {
    
    return (
        <div>
            <Textbox onChange={(e:React.ChangeEvent<HTMLInputElement>) => onTeamNameChangeHandler(e, team)} 
            value={team.name} 
            placeholder="Team Name" required={true} error={!(team.name.length > 0)}/>
            {team.playres.map((p: IPlayer, idx: number) => {
                return (<div key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {idx + 1} <Player options={playerTypes}
                        onNameChange={(e: React.ChangeEvent<HTMLInputElement>) => { onNameChangeHandler(e, idx, team) }}
                        name={p.name}
                        onPlayerTypeChange={(e?:React.ChangeEvent<{value: unknown;}>) => { onPlayerTypeChangeHandler(e!, idx, team) }}
                        type={p.type}
                        isNameError={p.isError}
                        isNameReqired={p.isRequired}
                        onNameBlur={(e:React.FocusEvent<HTMLInputElement>)=>{if(onNameBlur) onNameBlur(e,idx,team)}} 
                        onNameFocus={(e:React.FocusEvent<HTMLInputElement>)=>{if(onNameFocus )onNameFocus(e,idx,team)}}
                        />
                </div>)
            })}
        </div>
    )
}
