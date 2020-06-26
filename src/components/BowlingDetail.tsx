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
import SportsHandballIcon from '@material-ui/icons/SportsHandball';

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

export const BowlingDetail: React.FC<ITeam> = React.memo<ITeam>(({ playres, name, totalRun = 0, overs, noBowls = 0, wideBowls = 0, wicketFall }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <h3> {name} </h3>
            <p>Extra {noBowls + wideBowls}  NB:{noBowls} WD:{wideBowls}</p>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell className={classes.headerCell}>Bowling<SportsHandballIcon /> </TableCell>
                        <TableCell className={classes.headerCell} align="right">O</TableCell>
                        <TableCell className={classes.headerCell} align="right">R</TableCell>
                        <TableCell className={classes.headerCell} align="right">Wt</TableCell>
                        <TableCell className={classes.headerCell} align="right">NB</TableCell>
                        <TableCell className={classes.headerCell} align="right">WB</TableCell>
                        <TableCell className={classes.headerCell} align="right">Economy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playres.map((p: IPlayer, idx: number) => (
                        <TableRow key={`row-${idx}`}>
                            <TableCell>  {p.name} </TableCell>
                            <TableCell align="right">{p.overs.length}.0</TableCell>
                            <TableCell align="right">{p.totalRun}</TableCell>
                            <TableCell align="right">{p.wickets}</TableCell>
                            <TableCell align="right">{p.noBowls || 0}</TableCell>
                            <TableCell align="right">{p.wideBowls || 0}</TableCell>
                            <TableCell align="right">{p.economy}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
})
