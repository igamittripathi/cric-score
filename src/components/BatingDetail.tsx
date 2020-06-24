import * as React from 'react';
import { ITeam, IPlayer } from '../interfaces';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const BatingDetail: React.FC<ITeam> = React.memo<ITeam>(({ playres,name }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Batsman</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">R</TableCell>
                        <TableCell align="right">4s</TableCell>
                        <TableCell align="right">6s</TableCell>
                        <TableCell align="right">B</TableCell>
                        <TableCell align="right">SR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playres.map((p: IPlayer) => (
                        <TableRow >
                            <TableCell>  {p.name} </TableCell>
                            <TableCell align="right">{p.status || 'Bating not found'}</TableCell>
                            <TableCell align="right">{p.totalRun || 0}</TableCell>
                            <TableCell align="right">{p.boundryFour || 0}</TableCell>
                            <TableCell align="right">{p.boundrySix || 0}</TableCell>
                            <TableCell align="right">{p.bowlPlayed || 0}</TableCell>
                            <TableCell align="right">{p.strikeRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
})