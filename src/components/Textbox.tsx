import React from "react";
import Input from './Input'
import { FormControl, InputLabel, createStyles, makeStyles, Theme } from "@material-ui/core";


export interface ITextbox {
    id?: string;
    name?: string;
    value?: string;
    onChange?: (event: any) => void;
    placeholder?: string;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const Textbox = ({ id, name, onChange, value,placeholder }: ITextbox) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.margin}>
            <InputLabel htmlFor={'customized-textbox'+id}>{placeholder}</InputLabel>
            <Input
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                id={id}
            />
        </FormControl>
    )
}


export default Textbox;