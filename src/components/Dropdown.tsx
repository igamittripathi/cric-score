import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl, createStyles, makeStyles, Theme } from '@material-ui/core';
import Input from "./Input";

interface IDropdown {
    onChange?: (event: any) => void;
    value?: string | number;
    id?: string;
    labelId?: string;
    options: Array<string | number>
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);


const Dropdwon = ({ onChange, value, id, labelId, options }: IDropdown) => {
    const classes = useStyles();
    return(
        <FormControl className={classes.margin}>
        <InputLabel htmlFor={'customized-select'+id}>Type</InputLabel>
        <Select
            labelId={labelId}
            id={id}
            value={value}
            onChange={onChange}
            input={<Input />}
        >
            {options.map((item: string | number, idx: number) => <MenuItem key={idx} value={item}>{item}</MenuItem>)}

        </Select>
        </FormControl>
)}

export default Dropdwon;
