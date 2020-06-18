import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl, createStyles, makeStyles, Theme } from '@material-ui/core';
import {Input} from "./Input";
import { useStyles } from './Textbox'

interface IDropdown {
  onChange?:  ((event: React.ChangeEvent<{ value: unknown }>) => void) | undefined;
  value?: string | number;
  id?: string;
  labelId?: string;
  options?: Array<string | number>
}

export const Dropdwon = ({ onChange, value, id, labelId, options=[] }: IDropdown) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.margin}>
      <InputLabel htmlFor={'select' + id}>Type</InputLabel>
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
  )
}

