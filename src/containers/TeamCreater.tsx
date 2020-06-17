import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { Textbox, Player } from '../components';
import { PlayerTypes } from '../constants'
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';

type playertype = 'batsman' | 'bowler' | '';

interface IPlayer {
    name: string;
    type: playertype;
}

interface ITeam {
    name: string;
    playres: IPlayer[];
}

const TeamCreater: FC = () => {
    const [teams, setTeams] = useState<ITeam>({
        name: '',
        playres: []
    })

    useEffect(() => {
        const players: IPlayer[] = [];
        for (let i = 0; i < 11; i++) {
            players.push({ name: '', type: '' })
        }
        setTeams({ ...{ name: '', playres: [...players] } })
    }, [])

    const teamNameHandler = (e: any) => {
        setTeams({ ...{ name: e.target.value, playres: [...teams.playres] } })
        console.log(teams);
    }

    const nameChange = (e: any, idx: number) => {
       const playres = teams.playres;
       playres[idx].name = e.target.value;
       setTeams({ ...{ name: teams.name, playres: [...playres] } })
       console.log(teams);
    }

    const playerTypeChange = (e: any, idx: number) => {
        const playres = teams.playres;
       playres[idx].type = e.target.value;
       setTeams({ ...{ name: teams.name, playres: [...playres] } })
       console.log(teams);
    }

    return (<div>
        <Textbox onChange={teamNameHandler} value={teams.name} placeholder="Team Name" />
        {teams.playres.map((item, idx) => {
            return (<div key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {idx + 1} <Player options={PlayerTypes}
                    nameChange={(e: any) => {nameChange(e, idx)}}
                    playerTypeChange={(e: any) => {playerTypeChange(e, idx)}}
                    type={item.type} />
            </div>)
        })}

    </div>)
}

export default TeamCreater;