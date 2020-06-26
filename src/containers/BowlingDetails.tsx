import * as React from 'react';
import { makeStyles, createStyles, Theme, Divider, Card, CardContent, Typography, CircularProgress, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IPlayer, ITeam, IBowlerOver } from '../interfaces';
import { GetTeams } from '../actions';
import { BowlingDetail } from '../components';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        card: {
            minWidth: 275,
        },
        title: {

            fontSize: 14,
        },
    }),
);


export const BowlingDetails: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const teamDetails = useSelector((state: any) => state.teams);

    const [team_a, setTeamA] = React.useState<ITeam>();
    const [team_b, setTeamB] = React.useState<ITeam>();
    const [result, setResult] = React.useState<string>();

    React.useEffect(() => {
        dispatch(GetTeams());
    }, []);

    React.useEffect(() => {
        if (Object.keys(teamDetails).length) {
            teamDetails.team_a.playres = setStrikeRate(teamDetails.team_a.playres)
            teamDetails.team_b.playres = setStrikeRate(teamDetails.team_b.playres)
            let noBowls = teamDetails.team_a.noBowls, wideBowls = teamDetails.team_a.wideBowls;
            teamDetails.team_a.noBowls = teamDetails.team_b.noBowls;
            teamDetails.team_a.wideBowls = teamDetails.team_b.wideBowls;
            teamDetails.team_b.noBowls = noBowls;
            teamDetails.team_b.wideBowls=wideBowls;
            setTeamA(teamDetails.team_a)
            setTeamB(teamDetails.team_b)
        }
    }, [teamDetails]);

    const setStrikeRate = (playres: IPlayer[]): IPlayer[] => {
        playres = playres.filter((p: IPlayer) => p.overs)
        playres.forEach((p: IPlayer, idx: number) => {
            playres[idx].totalRun = 0;
            let run:number=0,wicket:number=0, noBowls:number=0, wideBowls:number=0;
            p.overs.forEach((o: IBowlerOver) => {
                    run += (o.totalRun || 0);
                    wicket +=(o.wicketFall||0);
                    noBowls +=(o.noBowls||0)
                    wideBowls +=(o.wideBowls||0)
            });
            playres[idx] = {...playres[idx],totalRun:run,wickets:wicket,economy:run/(p.overs.length),noBowls,wideBowls}
        })
        return playres;
    }

    const nextScreen = () => {
        history.push('/')
    }

    if (!team_a) {
        return <div className={classes.root}><CircularProgress /></div>
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={nextScreen}>New Match</Button>
            <BowlingDetail {...team_a!} />
            <Divider />
            <BowlingDetail {...team_b!} />
        </div>
    )
}
