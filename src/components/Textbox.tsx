import React from "react";
import TextField from '@material-ui/core/TextField';


export interface ITextbox {
    id?: string;
    name?: string;
    label?: string;
    value?: string;
    onChange?: (event: any) => void;
}


const Textbox = ({ id, name, label, onChange, value }: ITextbox) => (<TextField
    label={label}
    name={name} 
    onChange={onChange} 
    value={value}
    
    />)


export default Textbox;