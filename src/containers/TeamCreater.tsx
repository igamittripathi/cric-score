import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { Team } from '../components';
import { PlayerTypes } from '../constants'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ITeam, ITeams, IPlayer, playerType } from '../interfaces';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SaveTeams } from '../actions';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1)
            },
        },
    }),
);

export const TeamCreater: FC = () => {
    const classes = useStyles();
    let history = useHistory();
    const [teams, setTeams] = useState<ITeams>({
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
    })

    const team = useSelector((state: any) => state.teams)
    const dispatch = useDispatch();

    useEffect(() => {
        const { team_a, team_b } = { ...teams };
        for (let i = 0; i < 11; i++) {
            let _type: playerType = 'batsman';
            if (i > 5) {
                _type = 'bowler'
            }
            const playersDefaultProps = {
                type: _type, batingOrder: i, overs: [],
                hasStrike:false
            }
            const team_a_player: IPlayer = { name: 'A' + (i + 1), teamId: 'TeamA', ...playersDefaultProps }
            const team_b_player: IPlayer = { name: 'B' + (i + 1), teamId: 'TeamB', ...playersDefaultProps }
            team_a.playres.push({ ...team_a_player })
            team_b.playres.push({ ...team_b_player });
        }
        setTeams({ team_a, team_b })
    }, [])

    const onTeamNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, _team: ITeam) => {
        const { team_a, team_b } = { ...teams };
        if (team_a.id === _team.id) {
            team_a.name = e.target.value;
        } else {
            team_b.name = e.target.value;
        }
        setTeams({ team_a, team_b })
    }

    const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, idx: number, _team: ITeam) => {
        const { team_a, team_b } = { ...teams };
        let playres = [], _teams;
        if (team_a.id === _team.id) {
            playres = team_a.playres;
            playres[idx].name = e.target.value;
            _teams = { team_b, team_a: { ..._team, playres } };
        } else {
            playres = team_b.playres;
            playres[idx].name = e.target.value;
            _teams = { team_a, team_b: { ..._team, playres } };
        }
        setTeams({ ..._teams })
    }

    const onPlayerTypeChangeHandler = (e: React.ChangeEvent<{ value: unknown }>, idx: number, _team: ITeam) => {
        const { team_a, team_b } = { ...teams };
        let playres: IPlayer[] = [], _teams;
        if (team_a.id === _team.id) {
            playres = team_a.playres;
            playres[idx].type = e.target.value as playerType;
            _teams = { team_b, team_a: { ..._team, playres } };
        } else {
            playres = team_b.playres;
            playres[idx].type = e.target.value as playerType;
            _teams = { team_a, team_b: { ..._team, playres } };
        }
        setTeams({ ..._teams })
    }

    const onSubmit = (e: any) => {
        e?.preventDefault();
        dispatch(SaveTeams(teams));
        history.push('/matchstart')
    }

    return (
        <form onSubmit={onSubmit} className={classes.root} noValidate autoComplete="off">
            <h1>Create Team</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Team onTeamNameChangeHandler={onTeamNameChangeHandler}
                        onNameChangeHandler={onNameChangeHandler}
                        onPlayerTypeChangeHandler={onPlayerTypeChangeHandler}
                        team={teams.team_a}
                        playerTypes={PlayerTypes} />
                </div>
                <div style={{ borderRight: '1px solid #eee' }}></div>
                <div style={{ marginLeft: '50px' }}>
                    <Team onTeamNameChangeHandler={onTeamNameChangeHandler}
                        onNameChangeHandler={onNameChangeHandler}
                        onPlayerTypeChangeHandler={onPlayerTypeChangeHandler}
                        team={teams.team_b}
                        playerTypes={PlayerTypes} />
                </div>
            </div>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>)
}