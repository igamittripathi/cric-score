import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { Team } from '../components';
import { PlayerTypes, playresIndia, playresEngland } from '../constants'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Button, CircularProgress } from '@material-ui/core';
import { ITeam, ITeams, IPlayer, playerType } from '../interfaces';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SaveTeams } from '../actions';
import { useHistory } from "react-router-dom";
import { selectTeams } from '../selectors';

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
    const history = useHistory();
    const [teams, setTeams] = useState<ITeams>()
    const [isFormValid, setFormValid] = useState<boolean>(true);
    const teamDetails = useSelector(selectTeams, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        const { team_a, team_b } = JSON.parse(JSON.stringify(teamDetails)) as ITeams;
        for (let i = 0; i < 11; i++) {
            let _type: playerType = 'batsman';
            if (i > 5) {
                _type = 'bowler'
            }
            const playersDefaultProps = {
                type: _type,
                batingOrder: i,
                overs: [],
                hasStrike: false,
                isError: false,
                isRequired: true
            }
            const team_a_player: IPlayer = { name: playresIndia[i], teamId: 'TeamA', ...playersDefaultProps }
            const team_b_player: IPlayer = { name: playresEngland[i], teamId: 'TeamB', ...playersDefaultProps }
            team_a.playres.push({ ...team_a_player })
            team_b.playres.push({ ...team_b_player });
        }
        setTeams({ team_a, team_b })
    }, [teamDetails])

    const onTeamNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, _team: ITeam) => {
        const { team_a, team_b } = { ...teams };
        if (team_a!.id === _team.id) {
            team_a!.name = e.target.value;
        } else {
            team_b!.name = e.target.value;
        }
        setTeams({ team_a: team_a!, team_b: team_b! })
    }

    const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, idx: number, _team: ITeam) => {
        let { team_a, team_b } = { ...teams };
        debugger
        _team.playres[idx] = { ..._team.playres[idx], name: e.target.value, isError: !(e.target.value.length > 0) };
        if (_team.id === team_a!.id) {
            team_a = _team;
        }
        else {
            team_b = _team;
        }
        setTeams({team_a: validate(team_a!), team_b: validate(team_b!) })
    }

    const onPlayerTypeChangeHandler = (e: React.ChangeEvent<{ value: unknown }>, idx: number, _team: ITeam) => {
        let { team_a, team_b } = { ...teams };
        _team.playres[idx] = { ..._team.playres[idx], type: e.target.value as playerType };
        if (_team.id === team_a!.id) {
            team_a = _team;
        }
        else {
            team_b = _team;
        }
        setTeams({ team_a: validate(team_a!), team_b: validate(team_b!) })
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>, idx: number, _team: ITeam) => {
        let { team_a, team_b } = { ...teams };
        _team.playres[idx] = { ..._team.playres[idx], isError: !(e.target.value.length > 0) };
        if (_team.id === team_a!.id) {
            team_a = _team;
        }
        else {
            team_b = _team;
        }

        setTeams({ team_a: team_a!, team_b: team_b! })
    }

    const validate = (team: ITeam): ITeam => {
        let isValid = true;
        for (let i = 0; i < team.playres.length; i++) {
            if (team.playres[i].name.length === 0) {
                team.playres[i].isError = true;
                isValid = false;
                let { team_a, team_b } = { ...teams };
                if (team.id === team_a!.id) {
                    team_a = team;
                }
                else {
                    team_b = team;
                }
                break;
            }
        }
        if (isValid)
            isValid = (team.name.length > 0)
        setFormValid(isValid);
        return team;
    }

    const onSubmit = (e: any) => {
        e?.preventDefault();
        if (isFormValid) {
            dispatch(SaveTeams(teams!));
            history.push('/matchstart')
        }
    }

    if (!teams) {
        return (<CircularProgress />)
    }

    return (
        <form onSubmit={onSubmit} className={classes.root} noValidate autoComplete="off">
            <h1>Create Team</h1>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Team onTeamNameChangeHandler={onTeamNameChangeHandler}
                        onNameChangeHandler={onNameChangeHandler}
                        onPlayerTypeChangeHandler={onPlayerTypeChangeHandler}
                        onNameBlur={onBlur}
                        team={teams!.team_a}
                        playerTypes={PlayerTypes} />
                </div>
                <span style={{ borderRight: '1px solid #eee' }}></span>
                <div style={{ marginLeft: '50px' }}>
                    <Team onTeamNameChangeHandler={onTeamNameChangeHandler}
                        onNameChangeHandler={onNameChangeHandler}
                        onPlayerTypeChangeHandler={onPlayerTypeChangeHandler}
                        team={teams!.team_b}
                        onNameBlur={onBlur}
                        playerTypes={PlayerTypes} />
                </div>
            </div>
            <Button disabled={!isFormValid} onClick={onSubmit} variant="contained" color="primary" id="submit">
                Start Match
            </Button>
        </form>)
}