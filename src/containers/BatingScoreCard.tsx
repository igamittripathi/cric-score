import * as React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, makeStyles, TableCell } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IPlayer, ITeam } from '../interfaces';
import { GetTeams } from '../actions';
import { BatingDetail } from '../components';
const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});


export const BatingScoreCard: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const teamDetails = useSelector((state: any) => state.teams);

    const [team_a, setTeamA] = React.useState<ITeam>();
    const [team_b, setTeamB] = React.useState<ITeam>();

    React.useEffect(() => {
        dispatch(GetTeams());
    }, []);

    const setStrikeRate = (playres: IPlayer[]): IPlayer[] => {
        playres.forEach((p: IPlayer, idx) => {
            playres[idx].strikeRate = strikeRate(p.totalRun, p.bowlPlayed)
        })
        return playres;
    }

    React.useEffect(() => {
        if (Object.keys(teamDetails).length) {
            teamDetails.team_a.playres = setStrikeRate(teamDetails.team_a.playres)
            teamDetails.team_b.playres = setStrikeRate(teamDetails.team_b.playres)
            setTeamA(teamDetails.team_a)
            setTeamB(teamDetails.team_b)
        }
    }, [teamDetails]);


    const strikeRate = (run: number = 0, bowl: number = 0): number | string => {
        const str = ((run / bowl) * 100)
        return (str > -1 ? str : 0).toFixed(2);
    }


    return (
        <TableContainer component={Paper}>
            {team_a ? <BatingDetail {...team_a} /> : 'Please Wait team details loading...'}
            {team_b ? <BatingDetail {...team_b} /> : 'Please Wait team details loading...'}
        </TableContainer>
    )
}
