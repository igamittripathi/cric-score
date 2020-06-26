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
import SportsCricketSharpIcon from '@material-ui/icons/SportsCricketSharp';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        backgroundColor: '#000'
    },
    headerCell: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});

export const BatingDetail: React.FC<ITeam> = React.memo<ITeam>(({ playres, name, totalRun = 0, overs, noBowls = 0, wideBowls = 0, wicketFall }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <p> {name} <strong>{totalRun}/{wicketFall}  ({overs.length} ov)</strong> R/R {(totalRun / overs.length).toFixed(2)} </p>
            <p>Extra {noBowls + wideBowls}  NB:{noBowls} WD:{wideBowls}</p>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell className={classes.headerCell}>Batsman<SportsCricketSharpIcon /> </TableCell>
                        <TableCell className={classes.headerCell} align="right">Status</TableCell>
                        <TableCell className={classes.headerCell} align="right">R</TableCell>
                        <TableCell className={classes.headerCell} align="right">4s</TableCell>
                        <TableCell className={classes.headerCell} align="right">6s</TableCell>
                        <TableCell className={classes.headerCell} align="right">B</TableCell>
                        <TableCell className={classes.headerCell} align="right">SR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playres.map((p: IPlayer,idx:number) => (
                        <TableRow key={`row-${idx}`}>
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