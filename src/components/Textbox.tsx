import * as React from "react";
import { Input } from './Input'
import { FormControl, InputLabel, createStyles, makeStyles, Theme,InputBaseProps } from "@material-ui/core";


export interface ITextBoxProps extends InputBaseProps {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    }
  }),
);

export const Textbox: React.FC<ITextBoxProps> = (
  { id, name, onChange,onBlur,onFocus, value, placeholder, required = false, error = false }
  ) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.margin}>
      <InputLabel required={required}
        variant="filled" style={{ backgroundColor: '#FFF' }}
        error={error} htmlFor={'customized-textbox' + id}>{placeholder}</InputLabel>
      <Input
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        id={id}
        required={required}
        error={error}
      />
    </FormControl>
  )
}
