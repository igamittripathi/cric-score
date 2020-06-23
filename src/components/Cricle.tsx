import React from 'react';
import { makeStyles, createStyles, Theme, useTheme, styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

interface IResultProps {
    result?: number | string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1)
            },
        },
        large: {
            width: theme.spacing(40),
            height: theme.spacing(40),
            fontSize: '125px'
        },
    }),
);

export const Cricle: React.FC<IResultProps> = React.memo<IResultProps>(({ result = 0}) => {
    const classes = useStyles(result);

    return (
        <div className={classes.root}>
            <Avatar className={classes.large}>{result}</Avatar>
        </div>
    );
})

