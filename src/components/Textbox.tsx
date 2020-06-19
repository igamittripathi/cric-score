import * as React from "react";
import {Input} from './Input'
import { FormControl, InputLabel, createStyles, makeStyles, Theme } from "@material-ui/core";


export interface ITextbox {
    id?: string;
    name?: string;
    value?: string;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    placeholder?: string;
    required?:boolean;
    error?:boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export const Textbox = ({ id, name, onChange, value,placeholder,required=false,error=false }: ITextbox) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.margin}>
            <InputLabel required={required}
                error={error} htmlFor={'customized-textbox'+id}>{placeholder}</InputLabel>
            <Input
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                id={id}
                required={required}
                error={error}
            />
        </FormControl>
    )
}
