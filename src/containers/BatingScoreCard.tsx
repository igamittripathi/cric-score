import * as React from 'react';
import { makeStyles, createStyles, Theme, Card, CardContent, Typography, CircularProgress, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IPlayer, ITeam } from '../interfaces';
import { GetTeams } from '../actions';
import { BatingDetail } from '../components';
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
        split: {
            height: '100%',
            width: '50%',
            position: 'fixed',
            zIndex: 1,
            top: 0,
            paddingTop: 20,
        },
        left: {
            left: 0,
        },
        right: {
            right: 0,
        }
    }),
);


export const BatingScoreCard: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const teamDetails = useSelector((state: any) => state.teams);

    const [team_a, setTeamA] = React.useState<ITeam>();
    const [team_b, setTeamB] = React.useState<ITeam>();
    const [result, setResult] = React.useState<string>();

    React.useEffect(() => {
        dispatch(GetTeams());
    }, []);

    const setStrikeRate = (playres: IPlayer[]): IPlayer[] => {
        playres = playres.filter((p: IPlayer) => p.bowlPlayed)
        playres.forEach((p: IPlayer, idx) => {
            playres[idx].strikeRate = strikeRate(p.totalRun, p.bowlPlayed)
        })
        return playres;
    }

    React.useEffect(() => {
        if (Object.keys(teamDetails).length) {
            teamDetails.team_a.playres = setStrikeRate(teamDetails.team_a.playres)
            teamDetails.team_b.playres = setStrikeRate(teamDetails.team_b.playres)
            setResult(calculateResult(teamDetails.team_a, teamDetails.team_b));
            setTeamA(teamDetails.team_a)
            setTeamB(teamDetails.team_b)
        }
    }, [teamDetails]);


    const strikeRate = (run: number = 0, bowl: number = 0): number | string => {
        const str = ((run / bowl) * 100)
        return (str > -1 ? str : 0).toFixed(2);
    }

    const calculateResult = (teamA: ITeam, teamB: ITeam): string => {
        const runA = (teamA.totalRun || 0);
        const runB = (teamB.totalRun || 0)
        if (runA > runB) {
            return `${teamA.name} beat ${teamB.name} by ${runA - runB} runs`;
        }
        if (runA < runB) {
            return `${teamB.name} beat ${teamA.name} by ${10 - (teamB.wicketFall || 0)} wickets`;
        }
        return 'Match tie'
    }
    const nextScreen = () => {
        history.push('/bowing')
    }

    if (!team_a) {
        return <div className={classes.root}><CircularProgress /></div>
    }

    return (
        <div>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {result}
                    </Typography>
                </CardContent>
            </Card>
            <div className={`${classes.split},${classes.left}`}>
                <BatingDetail {...team_a!} />
            </div>
            <div className={`${classes.split},${classes.right}`}>
                <BatingDetail {...team_b!} />
            </div>
            <Button variant="contained" color="primary" onClick={nextScreen}>Bowling Details</Button>

        </div>
    )
}
