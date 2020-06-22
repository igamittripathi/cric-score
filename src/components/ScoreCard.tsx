import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { BowlResultType } from '../constants';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

interface IScoreCard {
    teamName: string;
    run?: number;
    wicket?: number;
    over?: number | string;
    bowlerName?: string;
    overBowlResults?: Array<BowlResultType>;
    netRunRate?: number | string;
    isAvgRunRateDisplay: boolean
}

export const ScoreCard: React.FC<IScoreCard> = (
    { teamName, run = 0, over = 0, wicket = 0, bowlerName = '', overBowlResults = [], netRunRate = 0, isAvgRunRateDisplay }) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                    {teamName}
                </Typography>
                <Typography variant="h4" component="h2">
                    Score : {`${run}/${wicket}`}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Over: {over}
                </Typography>{isAvgRunRateDisplay ? <Typography variant="body2" component="p">
                    Net RR: {netRunRate}
                </Typography> : ''}
                <Typography variant="body2" component="p">
                    Bowler: {bowlerName}
                    <br />
                    {overBowlResults.map((item: BowlResultType, idx: number) => <Chip key={idx} label={item} variant="outlined" />)}
                </Typography>
            </CardContent>
        </Card>
    );
}